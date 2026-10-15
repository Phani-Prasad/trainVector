import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';
import agentclampPreview from '../assets/agentclamp_preview.png';

const ProductsPage: React.FC = () => {
  const { handleApply, setIsVideoModalOpen } = useApp();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION: Light Institutional Platform Header          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        padding: '95px 5% 32px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        textAlign: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid #e2e8f0',
      }}>
        {/* Ambient Radial Spotlight */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, rgba(79, 70, 229, 0.03) 50%, transparent 80%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }} />

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
                Proprietary Platforms · Shipped Software
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
              AI Products Built For The Real World
            </h1>

            <p style={{
              color: '#475569',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '680px',
              margin: '0 auto 32px',
            }}>
              From intelligent governance shields to adaptive learning systems, we build and ship proprietary AI software designed for real-world impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. PRODUCTS SHOWCASE SECTION (Modern Light Cards)             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5%',
        position: 'relative',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Products Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
            {[
              {
                icon: <BookOpen size={22} color="#ffffff" />,
                color: '#f97316',
                badge: 'K–12 Education',
                title: 'BrainBuddy™',
                tagline: 'Adaptive AI Tutor for Students & Schools',
                image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
                desc: 'An intelligent, curriculum-aware AI tutor that adapts to each student\'s learning pace. BrainBuddy provides Socratic guidance, instant concept explanations, automated quiz generation, and student mastery tracking.',
                ctaPrimary: 'Partner with Us',
                ctaFn: () => handleApply('brainbuddy', 'BrainBuddy™ School Partnership')
              },
              {
                icon: <ShieldCheck size={22} color="#ffffff" />,
                color: '#f97316',
                badge: 'Enterprise Platform',
                title: 'AgentClamp™',
                tagline: 'AI Governance & Prompt Shield Platform',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
                desc: 'Enterprise-grade guardrail engine that intercepts, evaluates, and enforces policy on every LLM completion in real-time. Prevents prompt injection attacks, redacts PII automatically, and creates zero-latency audit trails.',
                ctaPrimary: 'Request Enterprise Demo',
                ctaFn: () => handleApply('agentclamp', 'AgentClamp™ Enterprise Demo')
              },
              {
                icon: <Sparkles size={22} color="#ffffff" />,
                color: '#f97316',
                badge: 'Ages 12+ Platform',
                title: 'KREOMAX™',
                tagline: 'Creative AI Invention & Story Platform',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
                desc: 'A breakthrough creative AI building platform for young minds aged 12+. KREOMAX™ nurtures computational thinking, narrative building, visual design, and hands-on AI invention with supervised safety controls.',
                ctaPrimary: 'Enroll Student',
                ctaFn: () => handleApply('kreomax', 'KREOMAX™ Student Enrollment')
              },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -8px rgba(15, 23, 42, 0.12)' }}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
                }}
              >
                {/* Product Card Image Banner */}
                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 60%, transparent 100%)'
                  }} />

                  {/* Top Floating Badge */}
                  <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
                    <span style={{
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#ffffff',
                      background: '#ea580c',
                      borderRadius: '12px',
                      padding: '4px 10px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}>
                      {product.badge}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '20px',
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#f97316',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(249,115,22,0.4)'
                  }}>
                    {product.icon}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Title & Tagline */}
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '4px', color: '#0f172a' }}>
                    {product.title}
                  </h3>
                  <p style={{ color: '#ea580c', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px' }}>
                    {product.tagline}
                  </p>

                  {/* Description */}
                  <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '22px', flex: 1 }}>
                    {product.desc}
                  </p>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <button
                      onClick={product.ctaFn}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#f97316',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(249,115,22,0.3)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {product.ctaPrimary}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── AgentClamp Interactive Platform Feature Strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              marginTop: '28px',
              padding: '32px 30px',
              borderRadius: '20px',
              background: '#ffffff',
              border: '1px solid #fed7aa',
              boxShadow: '0 12px 36px -4px rgba(15, 23, 42, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ width: '16px', height: '2px', background: '#ea580c', display: 'inline-block' }} />
                <span style={{ color: '#ea580c', letterSpacing: '1.5px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  Platform Deep Dive
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '16px' }}>
                The <span style={{ color: '#ea580c' }}>AgentClamp™</span> Platform
              </h2>
              <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '24px' }}>
                Move from AI experimentation to bulletproof production. AgentClamp™ provides an enterprise-grade execution environment engineered to validate, monitor, and govern multi-agent workflows with real-time prompt shields and zero-latency telemetry.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { title: 'Multi-Agent Swarms', desc: 'Deploy LangGraph & CrewAI graphs.' },
                  { title: 'Deep Observability', desc: 'Trace reasoning steps & token latency.' },
                  { title: 'Integrated Hybrid RAG', desc: 'Vector DBs with zero hallucination.' },
                  { title: 'Real-Time Guardrails', desc: '15ms PII masking & prompt shields.' }
                ].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#ea580c" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#0f172a', marginBottom: '2px' }}>{feat.title}</div>
                      <div style={{ color: '#64748b', fontSize: '0.76rem', lineHeight: 1.4 }}>{feat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video preview with glow */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsVideoModalOpen(true)}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1.5px solid #fdba74',
                boxShadow: '0 16px 36px -6px rgba(15, 23, 42, 0.15)',
                cursor: 'pointer'
              }}
            >
              <img
                src={agentclampPreview}
                alt="AgentClamp Dashboard"
                draggable={false}
                style={{ width: '100%', height: '280px', objectFit: 'contain', display: 'block', background: '#0f172a', userSelect: 'none' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6), transparent 50%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: '58px', height: '58px', borderRadius: '50%',
                  background: '#f97316',
                  display: 'grid', placeItems: 'center',
                  boxShadow: '0 0 24px rgba(249,115,22,0.6)'
                }}>
                  <Play size={24} color="#ffffff" style={{ transform: 'translateX(2px)' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3. EXECUTIVE CTA SECTION (Light Executive Theme)              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '40px 5% 36px',
        position: 'relative',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Partner Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.25)',
            padding: '6px 18px',
            borderRadius: '30px',
            marginBottom: '20px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ea580c', display: 'inline-block' }} />
            <span style={{ color: '#ea580c', letterSpacing: '1.5px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
              Deploy trainVector™ Platforms
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', marginBottom: '16px', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            Ready to Accelerate Your AI Advantage?
          </h2>
          <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '36px', maxWidth: '640px', margin: '0 auto 36px' }}>
            Looking to deploy BrainBuddy™ across your school network, integrate AgentClamp™ into enterprise systems, or request a customized cognitive architecture demonstration?
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleApply('agentclamp', 'Product Enterprise Demo & Deployment')}
              style={{
                padding: '14px 32px', borderRadius: '10px', border: 'none',
                background: '#f97316',
                color: '#fff', fontWeight: 800, fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(249,115,22,0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              Request Platform Demo <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px', verticalAlign: 'middle' }} />
            </button>
            <Link
              to="/academy"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 26px', borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a', fontWeight: 700, fontSize: '0.92rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Explore Capability Academy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
