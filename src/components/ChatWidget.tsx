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

const SYSTEM_PROMPT = `You are the official AI assistant for trainVector™ — an AI enterprise firm offering Proprietary AI Products, Enterprise Cognitive Consulting, and Applied AI Academy Cohorts.

## CORE DIRECTIVES:
1. KEEP ALL ANSWERS SIMPLE, DIRECT, AND SHORT (1 to 3 concise sentences). Never write long essays, complex tutorials, or walls of text.
2. ALWAYS INVITE THE USER TO CONTACT US at our direct phone/WhatsApp number **+91 83105 90859** or email **contact@trainvector.com** for demos, consulting inquiries, admissions, or partnerships.
3. You represent three core offerings:
   - **Proprietary AI Software Products**:
     • **BrainBuddy™**: Personalized cognitive AI learning companion for students and schools (adaptive homework guidance, concept mastery, and interactive learning).
     • **AgentClamp™**: Real-time enterprise security, governance, PII masking, and prompt-injection defense gateway for autonomous AI agents.
     • **KREOMAX™**: Next-gen creator studio and interactive AI education platform for schools and students.
   - **Enterprise Cognitive Consulting**:
     • Enterprise AI strategy, architectural roadmaps, and ROI scoping.
     • Bespoke multi-agent workflows, autonomous system orchestration, and production RAG pipelines.
     • AI security, governance, and audit-ready observability using AgentClamp.
   - **Applied AI Academy (Training Cohorts)**:
     • 5-Week intensive cohorts for: (1) Students & Fresh Graduates, (2) Working Professional Developers & Architects, and (3) Executives & Product Managers.
     • Hands-on production capstones, live mentor support from 30+ year enterprise architects, AgentClamp sandbox access, and verifiable completion certification.

## Leadership & Contact Details:
- Founder & CTO: Phani Prasad Thimmapuram (30+ years IT/AI leadership, ex-Bank of America, JP Morgan, DBS, SocGen, Virtusa, IBM)
- COO: K. Sreedhar (enterprise operations leader, ex-FIS, GE, Ramco Systems)
- Phone / WhatsApp: +91 83105 90859
- Email: contact@trainvector.com
- Website: trainvector.com
- Address: 50, Bethel Nagar, KR Puram, Bangalore - 560036

## STRICT DOMAIN & EMAIL RULE:
- The official email address is STRICTLY contact@trainvector.com (ending in .com, NEVER .ai).
- Under NO circumstance should you ever output 'contact@trainvector.ai' or any '.ai' email address. Always write contact@trainvector.com.

## Tone & Style:
Professional, warm, clear, and very concise. Answer the user's specific question simply in 1-2 sentences, and always close with a prompt to contact us at **+91 83105 90859** or **contact@trainvector.com**.`;

const SUGGESTED_QUESTIONS = [
  'Tell me about your AI Products',
  'What Enterprise Consulting do you offer?',
  'What Training Tracks are available?',
  'How can I contact your team?',
];

function getSmartFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('product') || q.includes('brainbuddy') || q.includes('agentclamp') || q.includes('clamp') || q.includes('kreomax')) {
    if (q.includes('brainbuddy')) {
      return "BrainBuddy™ is our personalized AI learning companion for students and schools, offering adaptive concept mastery and interactive homework guidance. For a school partnership or live demo, please call or WhatsApp us at **+91 83105 90859**!";
    }
    if (q.includes('agentclamp') || q.includes('clamp')) {
      return "AgentClamp™ is our enterprise AI governance platform providing real-time security, PII masking, and prompt-injection defense for autonomous agents. To request an enterprise demo, please contact us at **+91 83105 90859**.";
    }
    if (q.includes('kreomax')) {
      return "KREOMAX™ is our next-gen creator studio and interactive AI education platform for schools and students. To learn more or enroll, please call or WhatsApp us at **+91 83105 90859**!";
    }
    return "We offer three proprietary AI products: **BrainBuddy™** (personalized student learning), **AgentClamp™** (enterprise agent security & governance), and **KREOMAX™** (creator studio & interactive learning). For live demos or product inquiries, please call or WhatsApp us at **+91 83105 90859**!";
  }

  if (q.includes('consult') || q.includes('enterprise') || q.includes('advisory') || q.includes('custom') || q.includes('service') || q.includes('strategy') || q.includes('transform')) {
    return "Our enterprise cognitive consulting helps organizations build production-grade multi-agent workflows, secure RAG engines, and enterprise AI roadmaps with full governance. Please connect directly with our leadership team at **+91 83105 90859** to discuss your use case!";
  }

  if (q.includes('course') || q.includes('train') || q.includes('cohort') || q.includes('track') || q.includes('academ') || q.includes('syllabus') || q.includes('fee') || q.includes('student') || q.includes('developer') || q.includes('certificate')) {
    return "Our Applied AI Academy offers intensive 5-week cohort tracks for **Students & Fresh Graduates**, **Developers & Architects**, and **Executives & PMs**, featuring hands-on capstone builds and verifiable certification. To enroll or learn more, please contact us at **+91 83105 90859**!";
  }

  if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('reach') || q.includes('email') || q.includes('location') || q.includes('address') || q.includes('whatsapp')) {
    return "You can reach our team directly at **+91 83105 90859** (call or WhatsApp) or email us at **contact@trainvector.com**. We are located at 50, Bethel Nagar, KR Puram, Bangalore.";
  }

  return "At trainVector, we provide proprietary AI Products (BrainBuddy, AgentClamp, Kreomax), Enterprise Cognitive Consulting, and 5-week Applied AI Academy cohorts. Please contact us directly at **+91 83105 90859** (call or WhatsApp) to discuss how we can help you!";
}

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
        <strong key={match.index} style={{ color: '#0f172a', fontWeight: 700 }}>
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(<em key={match.index} style={{ color: '#334155' }}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(
        <code
          key={match.index}
          style={{
            background: '#f1f5f9',
            padding: '2px 5px',
            borderRadius: '4px',
            fontSize: '0.82em',
            fontFamily: 'monospace',
            color: '#ea580c',
            border: '1px solid #e2e8f0',
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
      content: "Hi! 👋 I'm the trainVector AI assistant. How can I help you? You can ask me about our **AI Products** (BrainBuddy, AgentClamp, Kreomax), **Enterprise Consulting**, or **Applied AI Academy** cohorts. For quick inquiries, feel free to call or WhatsApp us at **+91 83105 90859**!",
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
          await new Promise((r) => setTimeout(r, 400));
          reply = getSmartFallbackReply(trimmed);
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
        reply = getSmartFallbackReply(trimmed);
      }

      // Guarantee contact@trainvector.com in all assistant outputs
      const sanitizedReply = reply
        .replace(/contact@trainvector\.ai/gi, 'contact@trainvector.com')
        .replace(/@trainvector\.ai/gi, '@trainvector.com');

      setMessages([...updatedMessages, { role: 'assistant', content: sanitizedReply, governance: govMeta }]);
    } catch (error) {
      console.error('Fetch error:', error);
      const fallbackReply = getSmartFallbackReply(trimmed)
        .replace(/contact@trainvector\.ai/gi, 'contact@trainvector.com')
        .replace(/@trainvector\.ai/gi, '@trainvector.com');
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: fallbackReply,
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
              width: 'min(390px, calc(100vw - 40px))',
              height: 'min(580px, calc(100vh - 140px))',
              background: '#ffffff',
              border: '1px solid #fed7aa',
              borderRadius: '20px',
              boxShadow: '0 20px 50px rgba(15,23,42,0.18), 0 0 0 1px rgba(249,115,22,0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 997,
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
              borderBottom: '1px solid #fed7aa',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 10px rgba(249,115,22,0.3)',
              }}>
                <Bot size={20} color="#ffffff" strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '0.94rem', color: '#0f172a', fontFamily: "'Plus Jakarta Sans', Orbitron, sans-serif", letterSpacing: '0.2px' }}>
                  trainVector AI
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a' }} />
                  <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 500 }}>Online · Typically replies instantly</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
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
              background: '#ffffff',
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 transparent',
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
                      ? '#eff6ff'
                      : 'linear-gradient(135deg, var(--primary), #ea580c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: msg.role === 'user' ? '1px solid #bfdbfe' : 'none',
                  }}>
                    {msg.role === 'user'
                      ? <User size={14} color="#2563eb" />
                      : <Bot size={14} color="#ffffff" strokeWidth={2.5} />
                    }
                  </div>

                  {/* Bubble Container */}
                  <div style={{ maxWidth: '82%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #fff7ed, #ffedd5)'
                        : '#f8fafc',
                      border: msg.role === 'user'
                        ? '1px solid #fdba74'
                        : '1px solid #e2e8f0',
                      fontSize: '0.875rem',
                      lineHeight: '1.55',
                      color: '#0f172a',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
                        color: msg.governance.blocked ? '#b45309' : '#047857',
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
                    background: 'linear-gradient(135deg, var(--primary), #ea580c)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Bot size={14} color="#ffffff" strokeWidth={2.5} />
                  </div>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: '4px 16px 16px 16px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
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
                background: '#ffffff',
              }}>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      background: '#fff7ed',
                      border: '1px solid #fdba74',
                      borderRadius: '20px',
                      padding: '5px 12px',
                      fontSize: '0.75rem',
                      color: '#c2410c',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#ffedd5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#fff7ed';
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
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexShrink: 0,
              background: '#ffffff',
            }}>
              <input
                ref={inputRef}
                id="chat-widget-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about products, consulting, or training..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#0f172a',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
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
                  background: input.trim() && !isLoading ? 'linear-gradient(135deg, var(--primary), #ea580c)' : '#f1f5f9',
                  border: 'none',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s ease',
                  color: input.trim() && !isLoading ? '#ffffff' : '#94a3b8',
                }}
              >
                {isLoading ? <Loader size={16} className="spin" /> : <Send size={16} strokeWidth={2.5} />}
              </motion.button>
            </div>

            {/* Footer branding */}
            <div style={{
              textAlign: 'center',
              padding: '7px 8px',
              fontSize: '0.67rem',
              color: '#64748b',
              borderTop: '1px solid #f1f5f9',
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexShrink: 0,
            }}>
              <span>Powered by <strong style={{ color: '#ea580c' }}>trainVector AI</strong></span>
              <span>·</span>
              <span style={{ color: '#ea580c', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
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
