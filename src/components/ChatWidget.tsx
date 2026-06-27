import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader, MessageSquare, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const SYSTEM_PROMPT = `You are an AI assistant for trainVector™ — a premier GenAI Academy and Enterprise Consulting firm.

Your role is to help website visitors learn about trainVector's offerings and guide them towards enrolling or requesting a consultation.

## About trainVector™
trainVector is an advanced AI Academy offering intensive 5-week cohort programs and enterprise consulting services.

## Training Programs

### Student / Fresh Graduate Track (5 Weeks)
- Week 1: Foundations of AI & Python Programming (ML basics, NumPy, Pandas, Vibe Coding)
- Week 2: Generative AI & Large Language Models (Transformers, OpenAI, Groq, Ollama)
- Week 3: Retrieval-Augmented Generation (RAG, Vector DBs, embeddings, semantic search)
- Week 4: Agentic AI & Multi-Agent Systems (CrewAI, LangGraph, MCP, multi-agent workflows)
- Week 5: Enterprise AI, Governance & Observability (safety rails, responsible AI, monitoring)

### Working Professional Tracks (5 Weeks)

**Developer / Architect (Enterprise Engineering):**
- Week 1: GenAI Foundations & Core Mechanics (tokenization, production constraints)
- Week 2: Grounding AI with RAG & Context Engineering
- Week 3: The Agentic Leap & Stateful Orchestration (LangChain, LangGraph, MCP)
- Week 4: Model Fine-Tuning & Local Execution (LoRA, QLoRA, Ollama)
- Week 5: AI Evals, Security & Production Readiness (Langfuse, LangSmith, red teaming)

**Executives, PMs & Analysts (Enterprise AI Strategy & Adoption):**
- Week 1: AI Opportunity Identification & Use Case Mapping
- Week 2: AI Feasibility Assessment & Data Readiness
- Week 3: AI Value Realization & ROI Scoping
- Week 4: AI Adoption & Change Leadership
- Week 5: AI Governance, Risk & Observability

## What's Included
- Interactive Live Sessions (4 hours/week)
- Weekly Projects & Capstone Build (3 hours/week)
- Self-Directed Learning (3 hours/week)
- Lifetime Material Access & Updates
- Verifiable trainVector™ AI Completion Certificate
- Targeted Career & Interview Prep

## AgentClamp Platform
Students get exclusive access to the AgentClamp sandbox for deploying complex multi-agent systems with deep observability, integrated knowledge (RAG), and real-time analytics.

## Enterprise Consulting Services
- AI Strategy & Use Case Mapping
- Bespoke Cognitive Systems (multi-agent pipelines, RAG engines)
- Safety, Governance & Scale (PII detection, prompt injection protection)

## Team
- **Phani Prasad Thimmapuram** — Founder & CTO, pursuing PhD in Gen AI and Agentic AI in SCM Eco system. 30 years IT experience, ex-Bank of America, J.P. Morgan, DBS, Société Générale, Virtusa, IBM.
- **K. Sreedhar** — COO. Enterprise operations leader, ex-FIS, GE, Ramco Systems.

## Contact
- Phone: +91 83105 90859
- Address: 50, Bethel Nagar, KR Puram, Bangalore - 560036
- LinkedIn: linkedin.com/company/trainvector
- Instagram: instagram.com/trainvector9
- Twitter/X: x.com/TrainVector9

## Guidelines
- Be warm, professional, and encouraging.
- Keep answers concise (2–4 sentences unless more detail is needed).
- Always guide users towards applying or booking a consultation.
- If asked about pricing, say: "Pricing is cohort-specific — apply now and our admissions team will share the full fee structure and any early-bird offers."
- If asked about the next cohort date, say: "Reach out to us directly at +91 83105 90859 or apply through the website and our team will share upcoming cohort dates."
- Never make up information not listed above.
- If a question is fully outside trainVector's scope, politely redirect to the website or contact number.`;

const SUGGESTED_QUESTIONS = [
  'What tracks do you offer?',
  'Is this suitable for beginners?',
  'What is the time commitment?',
  'Do I get a certificate?',
];

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
      if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
        // Dev mode / Key not set: show a helper response
        await new Promise((r) => setTimeout(r, 1000));
        setMessages([
          ...updatedMessages,
          {
            role: 'assistant',
            content:
              '⚙️ Groq API key is not configured. Please set the VITE_GROQ_API_KEY environment variable in your `.env` file to enable the chatbot.',
          },
        ]);
        return;
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Groq API response error:', errorText);
        throw new Error('Groq API error');
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
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

                  {/* Bubble */}
                  <div style={{
                    maxWidth: '80%',
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
                    {msg.content}
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
              padding: '6px',
              fontSize: '0.65rem',
              color: '#475569',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              background: 'rgba(0,0,0,0.15)',
              flexShrink: 0,
            }}>
              Powered by <span style={{ color: 'var(--primary)', fontWeight: 700 }}>trainVector AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
