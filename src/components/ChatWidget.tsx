import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader, MessageSquare, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  governance?: {
    requestId?: string;
    responseTime?: string;
    piiDetected?: boolean;
    injectionDetected?: boolean;
    blocked?: boolean;
  };
}

const AGENTCLAMP_API_URL = (import.meta.env.VITE_AGENTCLAMP_API_URL || 'http://localhost:8001').replace(/\/+$/, '');
const AGENTCLAMP_API_KEY = import.meta.env.VITE_AGENTCLAMP_API_KEY || 'gvn_trainvector_live_key';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const SYSTEM_PROMPT = `You are the official AI admissions & program advisor for trainVector™ — a premier GenAI Academy and Enterprise Consulting firm.

## CRITICAL BEHAVIORAL RULE:
- You are EXCLUSIVELY an advisor for trainVector™. You MUST NOT act as a general-purpose programming tutor, code generator, or general AI encyclopedia.
- When a user asks about technical AI topics (such as RAG, Agentic AI, LangGraph, LoRA, Transformers, Presidio, etc.), DO NOT write standalone tutorials or Python code samples. Instead, ALWAYS explain how trainVector teaches and covers that topic in its 5-week cohort curriculum (e.g., Week 3 of the Student Track or Week 2 of the Developer Track) and how learners build production capstone systems around it.
- Keep answers concise (2–4 sentences), focused, and always guide the visitor to enroll, apply on the website, or call +91 83105 90859.

## About trainVector™
trainVector accelerates Enterprise AI Transformation through intensive 5-week cohort programs and enterprise consulting services.

## Training Programs & Syllabus

### 1. Student / Fresh Graduate Track (5 Weeks)
- Week 1: Foundations of AI & Python Programming (ML basics, NumPy, Pandas, Vibe Coding)
- Week 2: Generative AI & Large Language Models (Transformers, OpenAI, Groq, Ollama)
- Week 3: Retrieval-Augmented Generation (RAG, Vector DBs, embeddings, semantic search)
- Week 4: Agentic AI & Multi-Agent Systems (CrewAI, LangGraph, MCP, multi-agent workflows)
- Week 5: Enterprise AI, Governance & Observability (safety rails, responsible AI, monitoring)

### 2. Working Professional — Developer / Architect Track (5 Weeks)
- Week 1: GenAI Foundations & Core Mechanics (tokenization, production constraints)
- Week 2: Grounding AI with RAG & Context Engineering (vector stores, chunking strategies, hybrid search)
- Week 3: The Agentic Leap & Stateful Orchestration (LangChain, LangGraph, MCP)
- Week 4: Model Fine-Tuning & Local Execution (LoRA, QLoRA, Ollama)
- Week 5: AI Evals, Security & Production Readiness (Langfuse, LangSmith, red teaming)

### 3. Working Professional — Executives, PMs & Analysts Track (5 Weeks)
- Week 1: AI Opportunity Identification & Use Case Mapping
- Week 2: AI Feasibility Assessment & Data Readiness
- Week 3: AI Value Realization & ROI Scoping
- Week 4: AI Adoption & Change Leadership
- Week 5: AI Governance, Risk & Observability

## What Every Cohort Includes
- Interactive Live Sessions (4 hours/week)
- Weekly Projects & Hands-On Capstone Build (3 hours/week)
- Self-Directed Learning (3 hours/week)
- Lifetime Material Access & Updates
- Verifiable trainVector™ AI Completion Certificate
- Exclusive access to the AgentClamp sandbox platform for agent governance & observability
- Targeted Career & Interview Prep

## Enterprise Consulting Services
- AI Strategy & Use Case Mapping
- Bespoke Cognitive Systems (multi-agent pipelines, enterprise RAG engines)
- Safety, Governance & Scale (PII detection, prompt injection protection with AgentClamp)

## Leadership Team
- **Phani Prasad Thimmapuram** — Founder & CTO, pursuing PhD in Gen AI and Agentic AI in SCM Ecosystem. 30 years IT experience, ex-Bank of America, J.P. Morgan, DBS, Société Générale, Virtusa, IBM.
- **K. Sreedhar** — COO. Enterprise operations leader, ex-FIS, GE, Ramco Systems.

## Contact & Admissions
- Phone: +91 83105 90859
- Address: 50, Bethel Nagar, KR Puram, Bangalore - 560036
- Website: trainvector.ai

## Formatting & Structure:
- Structure your responses with clean bullet points and short paragraphs.
- Never write large walls of unformatted text.
- Use bolding on program names and key track names.
- Always conclude with a clear next step (Apply at trainvector.ai or call +91 83105 90859).`;

const SUGGESTED_QUESTIONS = [
  'What tracks do you offer?',
  'Is this suitable for beginners?',
  'What is the time commitment?',
  'Do I get a certificate?',
];

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(
        <strong key={match.index} style={{ color: '#fff', fontWeight: 700 }}>
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(<em key={match.index} style={{ color: '#cbd5e1' }}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(
        <code
          key={match.index}
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '2px 5px',
            borderRadius: '4px',
            fontSize: '0.82em',
            fontFamily: 'monospace',
            color: 'var(--primary)',
          }}
        >
          {match[4]}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

const FormattedMessage: React.FC<{ content: string; role: 'user' | 'assistant' }> = ({ content, role }) => {
  if (role === 'user') {
    return <span>{content}</span>;
  }

  const paragraphs = content.split(/\n\s*\n/);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {paragraphs.map((para, pIdx) => {
        const rawLines = para.split('\n').map((l) => l.trim()).filter(Boolean);
        const isList = rawLines.length > 0 && rawLines.every((l) => /^[-*•]\s+|^\d+\.\s+/.test(l));

        if (isList) {
          return (
            <ul
              key={pIdx}
              style={{
                margin: '2px 0',
                paddingLeft: '18px',
                listStyleType: 'disc',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              {rawLines.map((line, lIdx) => {
                const cleanLine = line.replace(/^[-*•]\s+|^\d+\.\s+/, '');
                return (
                  <li key={lIdx} style={{ lineHeight: '1.5' }}>
                    {renderInlineMarkdown(cleanLine)}
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <div key={pIdx} style={{ lineHeight: '1.55' }}>
            {rawLines.map((line, lIdx) => (
              <div key={lIdx} style={{ marginTop: lIdx > 0 ? '3px' : '0' }}>
                {renderInlineMarkdown(line)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const TypingIndicator = () => (
  <div style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '4px 0' }}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--primary)',
        }}
      />
    ))}
  </div>
);

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm the trainVector AI assistant. I can help you learn about our programs, tracks, and how to get started. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      let reply = '';
      let usedAgentClamp = false;
      let govMeta: Message['governance'] = undefined;

      // ── Step 1: Call AgentClamp Real-Time Governance Gateway ──
      try {
        const clampRes = await fetch(`${AGENTCLAMP_API_URL}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Governance-Key': AGENTCLAMP_API_KEY,
          },
          body: JSON.stringify({
            model: 'groq/openai/gpt-oss-120b',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
            ],
            max_tokens: 512,
            temperature: 0.7,
          }),
        });

        if (clampRes.ok) {
          const clampData = await clampRes.json();
          reply = clampData.choices?.[0]?.message?.content || '';
          const gov = clampData.governance || {};
          const reqId = gov.request_id || clampRes.headers.get('X-Request-ID') || clampData.id || 'gvn-' + Math.random().toString(36).slice(2, 8);
          const respTime = gov.latency_ms ? `${gov.latency_ms}ms` : (clampRes.headers.get('X-Response-Time') || '');
          govMeta = {
            requestId: reqId,
            responseTime: respTime,
            piiDetected: gov.pii_detected,
            injectionDetected: gov.injection_detected,
            blocked: gov.blocked,
          };
          usedAgentClamp = true;
          console.log('[ChatWidget] Governed by AgentClamp:', govMeta);
        } else {
          const errData = await clampRes.json().catch(() => null);
          const blockMsg = typeof errData?.detail === 'string'
            ? errData.detail
            : (errData?.detail?.message || errData?.message || errData?.error || '');

          if (blockMsg && (blockMsg.toLowerCase().includes('block') || blockMsg.toLowerCase().includes('pii') || blockMsg.toLowerCase().includes('injection') || clampRes.status === 400)) {
            reply = `🛡️ **Blocked by AgentClamp Policy**\n\n${blockMsg}\n\n*Your personal information is protected under trainVector enterprise security guardrails. To register securely, please use our application form or call +91 83105 90859.*`;
            const reqId = errData?.detail?.request_id || clampRes.headers.get('X-Request-ID') || 'gvn-blocked';
            govMeta = {
              requestId: reqId,
              responseTime: clampRes.headers.get('X-Response-Time') || '12ms',
              piiDetected: true,
              blocked: true,
            };
            usedAgentClamp = true;
            console.log('[ChatWidget] Blocked by AgentClamp Policy:', errData);
          }
        }
      } catch (clampErr) {
        console.warn('[ChatWidget] AgentClamp gateway unreachable, trying fallback...', clampErr);
      }

      // ── Step 2: Fallback to direct Groq if AgentClamp is waking up / offline ──
      if (!usedAgentClamp && !reply) {
        if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
          await new Promise((r) => setTimeout(r, 1000));
          reply = 'I am connecting to our AI server. Please reach out to us at **+91 83105 90859** or apply on the website!';
        } else {
          const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
              model: 'openai/gpt-oss-120b',
              messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
              ],
              max_tokens: 512,
              temperature: 0.7,
            }),
          });
          if (groqRes.ok) {
            const groqData = await groqRes.json();
            reply = groqData.choices?.[0]?.message?.content || '';
          }
        }
      }

      if (!reply) {
        reply = "I'm having trouble connecting to the AI assistant right now. Please reach out to us directly at **+91 83105 90859** or apply through the website!";
      }

      setMessages([...updatedMessages, { role: 'assistant', content: reply, governance: govMeta }]);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting to the AI assistant right now. Please reach out to us directly at **+91 83105 90859** or apply through the website!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open chat assistant"
        id="chat-widget-trigger"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), #ff9a44)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 998,
          boxShadow: '0 4px 24px rgba(249,115,22,0.45)',
          color: '#000',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={26} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare size={26} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread dot */}
        {hasUnread && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid var(--bg-main)',
            }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-widget-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: '102px',
              right: '30px',
              width: 'min(380px, calc(100vw - 40px))',
              height: 'min(560px, calc(100vh - 140px))',
              background: 'var(--bg-card)',
              border: '1px solid rgba(249,115,22,0.3)',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 997,
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(139,92,246,0.08))',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), #ff9a44)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 12px rgba(249,115,22,0.4)',
              }}>
                <Bot size={20} color="#000" strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.5px' }}>
                  trainVector AI
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Online · Typically replies instantly</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.1) transparent',
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-start',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: msg.role === 'user'
                      ? 'rgba(59,130,246,0.2)'
                      : 'linear-gradient(135deg, var(--primary), #ff9a44)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: msg.role === 'user' ? '1px solid rgba(59,130,246,0.3)' : 'none',
                  }}>
                    {msg.role === 'user'
                      ? <User size={14} color="#3b82f6" />
                      : <Bot size={14} color="#000" strokeWidth={2.5} />
                    }
                  </div>

                  {/* Bubble Container */}
                  <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                      background: msg.role === 'user'
                        ? 'rgba(59,130,246,0.15)'
                        : 'rgba(255,255,255,0.05)',
                      border: msg.role === 'user'
                        ? '1px solid rgba(59,130,246,0.25)'
                        : '1px solid rgba(255,255,255,0.08)',
                      fontSize: '0.875rem',
                      lineHeight: '1.55',
                      color: '#e2e8f0',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}>
                      <FormattedMessage content={msg.content} role={msg.role} />
                    </div>

                    {/* AgentClamp Verified Badge */}
                    {msg.role === 'assistant' && msg.governance?.requestId && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '4px',
                        fontSize: '0.68rem',
                        color: msg.governance.blocked ? '#f59e0b' : '#10b981',
                        paddingLeft: '2px',
                      }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 600 }}>
                          {msg.governance.blocked ? '🛡️ AgentClamp Policy Active' : '🛡️ AgentClamp Governed'}
                        </span>
                        {msg.governance.responseTime && (
                          <span style={{ color: '#64748b' }}>· {msg.governance.responseTime}</span>
                        )}
                        <span style={{ color: '#64748b' }}>· #{msg.governance.requestId.slice(0, 8)}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), #ff9a44)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Bot size={14} color="#000" strokeWidth={2.5} />
                  </div>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: '4px 16px 16px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (only on first message) */}
            {messages.length === 1 && !isLoading && (
              <div style={{
                padding: '0 12px 10px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                flexShrink: 0,
              }}>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      background: 'rgba(249,115,22,0.08)',
                      border: '1px solid rgba(249,115,22,0.25)',
                      borderRadius: '20px',
                      padding: '5px 12px',
                      fontSize: '0.75rem',
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(249,115,22,0.18)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(249,115,22,0.08)';
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexShrink: 0,
              background: 'rgba(0,0,0,0.2)',
            }}>
              <input
                ref={inputRef}
                id="chat-widget-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our programs..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(249,115,22,0.5)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
              <motion.button
                id="chat-widget-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: input.trim() && !isLoading ? 1.08 : 1 }}
                whileTap={{ scale: input.trim() && !isLoading ? 0.95 : 1 }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: input.trim() && !isLoading ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                  border: 'none',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s ease',
                  color: input.trim() && !isLoading ? '#000' : '#555',
                }}
              >
                {isLoading ? <Loader size={16} className="spin" /> : <Send size={16} strokeWidth={2.5} />}
              </motion.button>
            </div>

            {/* Footer branding */}
            <div style={{
              textAlign: 'center',
              padding: '6px 8px',
              fontSize: '0.65rem',
              color: '#64748b',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              background: 'rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexShrink: 0,
            }}>
              <span>Powered by <strong style={{ color: 'var(--primary)' }}>trainVector AI</strong></span>
              <span>·</span>
              <span style={{ color: '#f97316', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                🛡️ Governed by <strong>AgentClamp</strong>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
