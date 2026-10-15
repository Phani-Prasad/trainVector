import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Compass, Code, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ConsultingPage: React.FC = () => {
  const { handleApply } = useApp();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION: Enterprise Architecture & Strategy Header     */}
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
            {/* Kicker tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(249, 115, 22, 0.08)',
              border: '1px solid rgba(249, 115, 22, 0.25)',
              marginBottom: '18px',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ea580c' }} />
              <span style={{ color: '#ea580c', letterSpacing: '1.5px', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase' }}>
                Bespoke Enterprise Systems & Strategy
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)',
              fontWeight: 900,
              lineHeight: 1.25,
              color: '#0f172a',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
              fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
            }}>
              AI Architecture & Consulting Practice
            </h1>

            <p style={{
              color: '#475569',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '700px',
              margin: '0 auto 32px',
            }}>
              We help enterprises build, harden, and scale production-ready cognitive platforms — from initial data readiness mapping to custom multi-agent orchestration and compliance-ready deployment.
            </p>

            <button
              onClick={() => handleApply('consulting')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '10px',
                border: 'none',
                background: '#f97316',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(249,115,22,0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              Request AI Consultation <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. THREE CONSULTING PILLARS (Clean Light Grid)                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5%',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
              Practice Scope
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.3rem)', fontWeight: 900, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              Three Pillars of Our Enterprise AI Practice
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px' }}>
            {[
              {
                icon: <Compass size={22} color="#ffffff" />,
                title: 'AI Strategy & Use Case Mapping',
                desc: 'Analyze business processes, evaluate model options (open-source vs. proprietary), measure ROI expectations, and draft executable implementation roadmaps tailored to your operations.',
                bullets: ['Sourcing & Data Readiness Audits', 'Model Suitability Assessments', 'ROI & Cost Scoping Frameworks']
              },
              {
                icon: <Code size={22} color="#ffffff" />,
                title: 'Bespoke Cognitive Systems',
                desc: 'Architect and build production-grade agentic platforms, state-driven multi-agent workflows, and advanced context retrieval (RAG) engines grounded in your private enterprise knowledge.',
                bullets: ['Stateful Multi-Agent Pipelines', 'Advanced Chunking & Embedding', 'Custom Tooling & Model Integration']
              },
              {
                icon: <ShieldCheck size={22} color="#ffffff" />,
                title: 'Safety, Governance & Scale',
                desc: 'Hardening AI completions with strict policy filters, token cost tracing, and secure proxy integrations — including prompt injection protection and PII masking.',
                bullets: ['PII Detection & Anonymization', 'Prompt Injection Protection Shields', 'Cost, Latency & Quality Monitoring']
              }
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -8px rgba(15, 23, 42, 0.12)' }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '34px 28px',
                  boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Top Accent Line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#f97316' }} />

                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px',
                  background: '#f97316',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '18px',
                  boxShadow: '0 4px 12px rgba(249,115,22,0.35)'
                }}>
                  {p.icon}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '12px', color: '#0f172a' }}>
                  {p.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '22px', flex: 1 }}>
                  {p.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  {p.bullets.map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#334155' }}>
                      <CheckCircle2 size={15} color="#ea580c" style={{ flexShrink: 0 }} />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 4. ENGAGEMENT PROCESS (Light Delivery Lifecycle)              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5%',
        background: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
            Lifecycle & Delivery
          </span>
          <h2 style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.2rem)', fontWeight: 900, color: '#0f172a', marginBottom: '26px' }}>
            Our Engagement Process
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', textAlign: 'left' }}>
            {[
              { step: '01', title: 'Audit & Scope', desc: 'Determine feasibility, analyze your data infrastructure, and map out AI use cases with calculated ROI projections.' },
              { step: '02', title: 'Sandbox Prototyping', desc: 'Build functional proof-of-concepts inside our AgentClamp™ sandbox to test agent logic, tools, and RAG retrieval accuracy.' },
              { step: '03', title: 'Production Scaling', desc: 'Deploy self-hosted, telemetry-monitored agent systems complete with strict safety guardrails and prompt security.' },
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
                }}
              >
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ea580c', lineHeight: 1, marginBottom: '12px', fontFamily: 'monospace' }}>
                  {phase.step}
                </div>
                <h5 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  {phase.title}
                </h5>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.55 }}>
                  {phase.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '28px' }}>
            <button
              onClick={() => handleApply('consulting')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 36px',
                fontSize: '0.94rem',
                fontWeight: 800,
                borderRadius: '10px',
                border: 'none',
                background: '#f97316',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(249,115,22,0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              Request AI Consultation <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultingPage;
