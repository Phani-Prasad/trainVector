import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Cpu, Briefcase, GraduationCap, Layers, Sparkles } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  cat: 'products' | 'consulting' | 'academy';
  badge: string;
}

const FAQS: FaqItem[] = [
  /* ── 1. AI PRODUCTS ── */
  {
    cat: 'products',
    badge: 'AI Products',
    q: 'What is AgentClamp™?',
    a: 'AgentClamp™ is our enterprise AI governance platform. It provides real-time prompt shields, automated PII masking, and safety guardrails for production LLM applications.'
  },
  {
    cat: 'products',
    badge: 'AI Products',
    q: 'What is BrainBuddy™?',
    a: 'BrainBuddy™ is an adaptive AI tutor for schools that guides students through their curriculum step-by-step using interactive Socratic inquiry.'
  },
  {
    cat: 'products',
    badge: 'AI Products',
    q: 'What is KREOMAX™?',
    a: 'KREOMAX™ is an interactive AI creative platform for students (ages 12+) and schools to build stories, games, and AI apps in a safe sandbox.'
  },
  {
    cat: 'products',
    badge: 'AI Products',
    q: 'Can we request a product demo or proof-of-concept?',
    a: 'Yes. You can request a live walkthrough or a tailored pilot for any of our platforms via our contact form.'
  },
  {
    cat: 'products',
    badge: 'AI Products',
    q: 'Where can your AI products be deployed?',
    a: 'We support cloud SaaS, private cloud (VPC), and on-premises environments to meet enterprise security and data requirements.'
  },

  /* ── 2. ENTERPRISE CONSULTING ── */
  {
    cat: 'consulting',
    badge: 'Enterprise Consulting',
    q: 'What consulting services do you offer?',
    a: 'We help organizations architect and ship production AI systems, including multi-agent workflows, enterprise RAG, and AI governance frameworks.'
  },
  {
    cat: 'consulting',
    badge: 'Enterprise Consulting',
    q: 'How do you protect enterprise data privacy?',
    a: 'We use zero-retention topologies and private vector databases. Your company data is never used to train public models.'
  },
  {
    cat: 'consulting',
    badge: 'Enterprise Consulting',
    q: 'How long does a typical engagement last?',
    a: 'Engagements typically range from 2-week architectural assessments to 8–12 week production system builds.'
  },
  {
    cat: 'consulting',
    badge: 'Enterprise Consulting',
    q: 'Can you help us move AI prototypes into production?',
    a: 'Yes. We specialize in transforming experimental AI prototypes into reliable, secure, and cost-effective production systems.'
  },

  /* ── 3. APPLIED AI ACADEMY & TRAINING ── */
  {
    cat: 'academy',
    badge: 'Applied AI Academy',
    q: 'Which training track should I choose?',
    a: 'Choose by role: Builder Track (Engineers & Architects), Product Track (PMs & Analysts), Delivery Track (Agile & Scrum Leads), or Strategy Track (Leaders & CXOs).'
  },
  {
    cat: 'academy',
    badge: 'Applied AI Academy',
    q: 'Do you offer corporate team training?',
    a: 'Yes. We offer custom corporate training programs customized to your team\'s technology stack and business goals.'
  },
  {
    cat: 'academy',
    badge: 'Applied AI Academy',
    q: 'What is the weekly time commitment?',
    a: 'We recommend 15–20 hours per week over the 5-week cohort, covering live builder workshops and hands-on projects.'
  },
  {
    cat: 'academy',
    badge: 'Applied AI Academy',
    q: 'Do I receive a certificate upon completion?',
    a: 'Yes. Successfully completing your track and capstone project earns you a trainVector™ AI Mastery Certificate.'
  },
];

const TABS = [
  { id: 'all', label: 'All FAQs', icon: Layers, count: FAQS.length },
  { id: 'products', label: 'AI Products', icon: Cpu, count: FAQS.filter(f => f.cat === 'products').length },
  { id: 'consulting', label: 'Enterprise Consulting', icon: Briefcase, count: FAQS.filter(f => f.cat === 'consulting').length },
  { id: 'academy', label: 'Applied AI Academy', icon: GraduationCap, count: FAQS.filter(f => f.cat === 'academy').length },
];

const FaqPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = activeTab === 'all'
    ? FAQS
    : FAQS.filter(f => f.cat === activeTab);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION: Light Institutional FAQ Header                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        padding: '95px 5% 32px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        textAlign: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid #e2e8f0',
      }}>
        {/* Telemetry Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
              fontWeight: 900,
              lineHeight: 1.25,
              color: '#0f172a',
              marginBottom: '28px',
              letterSpacing: '-0.02em',
              fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
            }}>
              Frequently Asked Questions
            </h1>

            {/* Category Filter Pills */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: '12px',
            }}>
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setOpenFaq(null);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isSelected ? '1px solid #f97316' : '1px solid #e2e8f0',
                      background: isSelected ? '#fff7ed' : '#ffffff',
                      color: isSelected ? '#ea580c' : '#475569',
                      boxShadow: isSelected ? '0 2px 8px rgba(249, 115, 22, 0.15)' : '0 1px 3px rgba(15, 23, 42, 0.04)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={16} color={isSelected ? '#ea580c' : '#64748b'} />
                    {tab.label}
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: '6px',
                      background: isSelected ? '#ffedd5' : '#f1f5f9',
                      color: isSelected ? '#c2410c' : '#64748b',
                    }}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. ACCORDION FAQ SECTION (Clean Light Theme)                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5% 50px',
        background: '#f8fafc',
      }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          {filteredFaqs.map((item, i) => (
            <motion.div
              key={`${activeTab}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              style={{ marginBottom: '14px' }}
            >
              <div
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  padding: '20px 24px',
                  background: '#ffffff',
                  border: openFaq === i ? '1px solid #f97316' : '1px solid #e2e8f0',
                  borderRadius: openFaq === i ? '14px 14px 0 0' : '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.25s ease',
                  boxShadow: openFaq === i ? '0 8px 24px -2px rgba(249,115,22,0.12)' : '0 2px 8px rgba(15, 23, 42, 0.04)'
                }}
              >
                <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a', paddingRight: '16px' }}>
                  {item.q}
                </span>
                <ChevronRight
                  size={18}
                  style={{
                    color: '#ea580c',
                    transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    flexShrink: 0
                  }}
                />
              </div>

              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '20px 24px',
                      background: '#ffffff',
                      border: '1px solid #f97316',
                      borderTop: 'none',
                      borderRadius: '0 0 14px 14px',
                      color: '#334155',
                      lineHeight: 1.7,
                      fontSize: '0.92rem'
                    }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
