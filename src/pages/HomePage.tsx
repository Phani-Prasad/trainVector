import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Cpu, Briefcase, GraduationCap,
  Sparkles, ShieldCheck, ChevronRight, Award,
  Building2, HeartPulse, Factory, ShoppingCart, BookOpen, Code2,
  CheckCircle2, Layers, Bot, Database, Zap, ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

/* ─── 3 CORE PILLARS DATA ─────────────────────────────────────────────── */
const HERO_TABS = [
  {
    id: 'products',
    label: '01. AI Products',
    icon: Cpu,
    color: '#f97316',
    badge: 'ENTERPRISE & EDTECH',
    title: 'Shipped AI Platforms & Systems',
    desc: 'AgentClamp™ — Production-grade software spanning enterprise governance. BrainBuddy™ — An intelligent, curriculum-aware AI tutor that adapts to each student\'s learning pace. KREOMAX™ — Cognitive learning for students and schools.',
    points: [
      'Enterprise Governance: AgentClamp™ real-time prompt shields & PII redaction',
      'K–12 Education: BrainBuddy™ adaptive Socratic tutor for schools',
      'Youth Innovation: KREOMAX™ creative AI building for ages 12+',
    ],
    link: '/products',
    cta: 'Explore All Platforms',
  },
  {
    id: 'consulting',
    label: '02. Enterprise Consulting',
    icon: Briefcase,
    color: '#f97316',
    badge: 'SYSTEMS & GOVERNANCE',
    title: 'Architecture, Strategy & Governance',
    desc: 'We architect, govern, and deploy production multi-agent swarms, zero-trust prompt firewalls, and private enterprise RAG topologies.',
    points: [
      'Enterprise AI Governance, zero-trust prompt shields & policy enforcement',
      'Autonomous Multi-Agent Workflows (LangGraph, CrewAI) & LLM Gateways',
      'Enterprise Hybrid RAG on private data with zero hallucination',
    ],
    link: '/consulting',
    cta: 'Explore Consulting Scope',
  },
  {
    id: 'academy',
    label: '03. Capability Building',
    icon: GraduationCap,
    color: '#f97316',
    badge: '12 APPLIED TRACKS',
    title: 'Applied GenAI Academy & Upskilling',
    desc: 'Role-specific, practitioner-led AI tracks designed to turn software engineers, architects, legal counsel, and academic faculty into AI builders.',
    points: [
      '12 Role-Based Tracks for engineers, architects, CXOs, and universities',
      'Hands-on sandbox capstones with real production tooling',
      'Live executive masterclasses & customized enterprise workforce cohorts',
    ],
    link: '/academy',
    cta: 'Explore 12 Academy Tracks',
  },
];

/* ─── TARGET INDUSTRIES ───────────────────────────────────────────────── */
const INDUSTRIES = [
  {
    name: 'Banking & Financial Services',
    useCase: 'Autonomous Underwriting & Fraud Defense',
    icon: Building2,
    color: '#f97316',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    tag: 'Financial AI',
  },
  {
    name: 'Healthcare & Life Sciences',
    useCase: 'Clinical RAG & HIPAA-Shielded Synthesis',
    icon: HeartPulse,
    color: '#f97316',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tag: 'Clinical AI',
  },
  {
    name: 'Manufacturing & Supply Chain',
    useCase: 'Predictive Maintenance & Vision QA',
    icon: Factory,
    color: '#f97316',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tag: 'Industrial AI',
  },
  {
    name: 'Retail & E-Commerce',
    useCase: 'Personalized Recommendation Swarms',
    icon: ShoppingCart,
    color: '#f97316',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    tag: 'Commerce AI',
  },
  {
    name: 'Education & EdTech',
    useCase: 'BrainBuddy™ Adaptive Tutoring',
    icon: BookOpen,
    color: '#f97316',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    tag: 'Cognitive EdTech',
  },
  {
    name: 'Technology & Enterprise SaaS',
    useCase: 'Autonomous Code & Telemetry Copilots',
    icon: Code2,
    color: '#f97316',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    tag: 'Engineering AI',
  },
];

/* ─── HOMEPAGE ────────────────────────────────────────────────────────── */
/* ── Gradient headline keyframes injected once ── */
const GRADIENT_STYLE = `
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes shimmerSweep {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes tickerScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.tv-grad-text {
  background: linear-gradient(90deg, #f97316, #8b5cf6, #3b82f6, #f97316);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease infinite;
  display: inline;
}
.tv-shimmer-btn {
  position: relative;
  overflow: hidden;
}
.tv-shimmer-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
  background-size: 200% 100%;
  animation: shimmerSweep 2.2s linear infinite;
}
.tv-shimmer-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.45) !important; }
.tv-stat-card { transition: all 0.25s ease; }
.tv-stat-card:hover { border-color: #f97316 !important; box-shadow: 0 0 0 3px rgba(249,115,22,0.12), 0 8px 20px rgba(15,23,42,0.08) !important; transform: translateY(-2px); }
`;

const HomePage: React.FC = () => {
  const { handleApply } = useApp();
  const [activeTab, setActiveTab] = useState(0);

  const currentTab = HERO_TABS[activeTab];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', position: 'relative' }}>
      <style>{GRADIENT_STYLE}</style>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION: Clean Enterprise Light Theme                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        padding: '95px 5% 32px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        overflow: 'hidden',
        borderBottom: '1px solid #e2e8f0',
      }}>
        {/* Mesh Blob — orange, top-right */}
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '520px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(251,146,60,0.10) 40%, transparent 70%)', filter: 'blur(55px)', pointerEvents: 'none', zIndex: 0 }} />
        {/* Mesh Blob — blue, bottom-left */}
        <div style={{ position: 'absolute', bottom: '-60px', left: '-80px', width: '460px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
        {/* Mesh Blob — violet, center */}
        <div style={{ position: 'absolute', top: '40%', left: '40%', width: '500px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Crisp Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Main Hero Split Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
            {/* ── Left Column: Executive Narrative & Value Proposition ── */}
            <div>
              {/* Kicker tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <span style={{ width: '22px', height: '2px', background: '#f97316', display: 'inline-block' }} />
                <span style={{
                  color: '#c2410c',
                  background: '#fff7ed',
                  border: '1px solid #ffedd5',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  letterSpacing: '1px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>
                  Intelligence in Action
                </span>
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontSize: 'clamp(1.65rem, 2.6vw, 2.15rem)',
                fontWeight: 900,
                lineHeight: 1.25,
                color: '#0f172a',
                marginBottom: '18px',
                letterSpacing: '-0.025em',
                fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
              }}>
                We Build <span className="tv-grad-text">AI Products</span>, Architect <span className="tv-grad-text">Enterprise Systems</span> &amp; Capability Building.
              </h1>

              {/* Value Narrative (Clean & punchy) */}
              <p style={{
                color: '#475569',
                fontSize: '1.04rem',
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '560px',
              }}>
                We help enterprises move from exploratory AI experiments to resilient, scaled production. By combining proprietary AI software platforms, custom multi-agent architecture engineering, and role-specific workforce upskilling, trainVector™ delivers complete, end-to-end cognitive transformation.
              </p>

              {/* Primary Actions */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={() => handleApply('consulting')}
                  className="tv-shimmer-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 28px', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                    color: '#ffffff', fontWeight: 800, fontSize: '0.92rem', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
                    transition: 'all 0.25s ease',
                    zIndex: 1,
                  }}
                >
                  Schedule AI Advisory
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}>
                    <ArrowRight size={16} />
                  </motion.span>
                </button>
                <Link
                  to="/products"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 24px', borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a', fontWeight: 700, fontSize: '0.92rem',
                    textDecoration: 'none',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Explore Solutions
                </Link>
              </div>
            </div>

            {/* ── Right Column: Interactive Connected Vertical Stepper Deck (Light Card) ── */}
            <div>
              <div style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08)',
                padding: '22px 20px',
              }}>
                {/* Header inside card */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#ea580c' }}>
                      Applied AI Ecosystem
                    </span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                      Our Core Pillars
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                    0{activeTab + 1} / 0{HERO_TABS.length}
                  </span>
                </div>

                {/* Vertical Connected List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {HERO_TABS.map((tab, idx) => {
                    const isSelected = activeTab === idx;
                    const Icon = tab.icon;

                    return (
                      <motion.div
                        key={tab.id}
                        onClick={() => setActiveTab(idx)}
                        style={{
                          borderRadius: '12px',
                          border: isSelected ? '1px solid #fdba74' : '1px solid #f1f5f9',
                          background: isSelected ? '#fff7ed' : '#f8fafc',
                          padding: isSelected ? '14px 16px' : '11px 16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Selected Indicator Accent */}
                        {isSelected && (
                          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: '#f97316' }} />
                        )}

                        {/* Pillar Header Item */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: isSelected ? '34px' : '30px',
                              height: isSelected ? '34px' : '30px',
                              borderRadius: '8px',
                              background: isSelected ? '#f97316' : '#e2e8f0',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0,
                              boxShadow: isSelected ? '0 0 12px rgba(249,115,22,0.35)' : 'none',
                              transition: 'all 0.2s ease',
                            }}>
                              <Icon size={isSelected ? 16 : 15} color={isSelected ? '#ffffff' : '#475569'} />
                            </div>
                            <div>
                              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                                {tab.label}
                              </div>
                              {!isSelected && (
                                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '1px' }}>
                                  {tab.title}
                                </div>
                              )}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              fontSize: '0.6rem',
                              fontWeight: 800,
                              letterSpacing: '0.8px',
                              textTransform: 'uppercase',
                              color: isSelected ? '#c2410c' : '#64748b',
                              background: isSelected ? '#ffedd5' : '#e2e8f0',
                              padding: '2px 7px',
                              borderRadius: '5px',
                            }}>
                              {tab.badge}
                            </span>
                            <ChevronRight
                              size={15}
                              color={isSelected ? '#f97316' : '#94a3b8'}
                              style={{ transform: isSelected ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease' }}
                            />
                          </div>
                        </div>

                        {/* Streamlined Details when selected */}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.2 }}
                            style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #fed7aa' }}
                          >
                            {tab.id === 'products' ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '10px' }}>
                                {[
                                  { name: 'AgentClamp™', blurb: 'Production-grade software spanning enterprise governance.' },
                                  { name: 'BrainBuddy™', blurb: 'An intelligent, curriculum-aware AI tutor that adapts to each student\'s learning pace.' },
                                  { name: 'KREOMAX™', blurb: 'Cognitive learning for students and schools.' },
                                ].map((p) => (
                                  <div key={p.name} style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                                    <span style={{ fontWeight: 800, color: '#ea580c' }}>{p.name}</span>
                                    <span style={{ color: '#94a3b8', margin: '0 4px' }}>—</span>
                                    {p.blurb}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, marginBottom: '10px' }}>
                                {tab.desc}
                              </p>
                            )}

                            <Link
                              to={tab.link}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                color: '#ea580c',
                                textDecoration: 'none',
                              }}
                            >
                              {tab.cta} <ArrowUpRight size={13} />
                            </Link>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar (Clean White Telemetry Strip) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
          }}>
            {[
              { val: '30+',  suffix: ' Yrs',       lbl: 'Enterprise Leadership',      icon: '🏆', color: '#f97316' },
              { val: '3',    suffix: ' Platforms', lbl: 'Production AI Products',     icon: '🚀', color: '#8b5cf6' },
              { val: '12',   suffix: ' Tracks',    lbl: 'Applied AI Specializations', icon: '🎯', color: '#3b82f6' },
              { val: '99.8', suffix: '%',          lbl: 'Governance & Safety Guard',  icon: '🛡️', color: '#10b981' },
            ].map((stat, i) => (
              <div key={i} className="tv-stat-card" style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'default',
              }}>
                <div style={{ fontSize: '1.5rem', width: '38px', height: '38px', borderRadius: '9px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: stat.color, lineHeight: 1, fontFamily: 'monospace' }}>
                    {stat.val}<span style={{ fontSize: '0.8rem', color: '#64748b' }}>{stat.suffix}</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, lineHeight: 1.2, marginTop: '2px' }}>
                    {stat.lbl}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1.5 TRUSTED PARTNERS — Infinite Scroll Ticker                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '20px 0',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(90deg, #fff, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(-90deg, #fff, transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#94a3b8', textAlign: 'center', marginBottom: '14px' }}>
          Trusted By Leading Enterprises &amp; Academic Institutions
        </div>

        {/* Ticker track — duplicated for seamless loop */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '0', width: 'max-content', animation: 'tickerScroll 24s linear infinite' }}>
            {[...Array(2)].map((_, ri) => (
              <div key={ri} style={{ display: 'flex', gap: '0', alignItems: 'center' }}>
                {[
                  {
                    id: 'saveetha',
                    name: 'Saveetha University',
                    badge: 'Premier University',
                    logo: '/logos/saveetha-logo.png',
                    logoHeight: 38,
                    isDark: false,
                    hasOwnText: true,
                  },
                  {
                    id: 'ramco',
                    name: 'Ramco Group of Institutions',
                    badge: 'Technical Institutions',
                    logo: '/logos/ramco-logo.png',
                    logoHeight: 40,
                    isDark: false,
                    hasOwnText: false,
                  },
                  {
                    id: 'wiztekit',
                    name: 'WIZTEKIT',
                    badge: 'Enterprise Partner',
                    logo: '/logos/wiztekit-logo.png',
                    logoHeight: 24,
                    isDark: true,
                    hasOwnText: true,
                  },
                  {
                    id: 'saveetha-2',
                    name: 'Saveetha University',
                    badge: 'Premier University',
                    logo: '/logos/saveetha-logo.png',
                    logoHeight: 38,
                    isDark: false,
                    hasOwnText: true,
                  },
                  {
                    id: 'ramco-2',
                    name: 'Ramco Group of Institutions',
                    badge: 'Technical Institutions',
                    logo: '/logos/ramco-logo.png',
                    logoHeight: 40,
                    isDark: false,
                    hasOwnText: false,
                  },
                  {
                    id: 'wiztekit-2',
                    name: 'WIZTEKIT',
                    badge: 'Enterprise Partner',
                    logo: '/logos/wiztekit-logo.png',
                    logoHeight: 24,
                    isDark: true,
                    hasOwnText: true,
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '8px 36px',
                    borderRight: '1px solid #f1f5f9',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {item.isDark ? (
                      <div style={{
                        background: '#0c1017',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: '1px solid #1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08)',
                      }}>
                        <img
                          src={item.logo}
                          alt={item.name}
                          style={{ height: `${item.logoHeight}px`, width: 'auto', objectFit: 'contain', display: 'block' }}
                        />
                      </div>
                    ) : (
                      <img
                        src={item.logo}
                        alt={item.name}
                        style={{ height: `${item.logoHeight}px`, width: 'auto', objectFit: 'contain', display: 'block' }}
                      />
                    )}

                    {!item.hasOwnText ? (
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>{item.name}</div>
                        <div style={{
                          fontSize: '0.63rem',
                          color: '#ea580c',
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                          marginTop: '2px',
                        }}>
                          {item.badge}
                        </div>
                      </div>
                    ) : (
                      <span style={{
                        fontSize: '0.63rem',
                        color: '#ea580c',
                        fontWeight: 700,
                        letterSpacing: '0.6px',
                        textTransform: 'uppercase',
                        background: '#fff7ed',
                        padding: '3px 8px',
                        borderRadius: '5px',
                        border: '1px solid #ffedd5',
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. INNOVATIVE EXECUTION MODEL (Clean High-Contrast Cards)      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5%',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
              Execution Framework
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: 900, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              How We Deliver Enterprise AI Advantage
            </h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', maxWidth: '620px', margin: '10px auto 0', lineHeight: 1.6 }}>
              A proven, 3-stage lifecycle that turns cognitive strategy into production systems and internal workforce mastery.
            </p>
          </div>

          {/* 3-Stage Connected Pipeline Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '26px' }}>
            {[
              {
                step: 'STAGE 01',
                title: 'Architect & Strategize',
                tag: 'Strategic Blueprint',
                desc: 'We audit your enterprise data topology, design multi-agent orchestration graphs, and build RAG pipelines with clear unit economics.',
                highlights: [
                  'AI Feasibility & Security Guardrail Audits',
                  'Enterprise Hybrid RAG Architecture Design',
                  '3-Year ROI Modeling & Unit Economics',
                ],
                deliverable: 'Production Architecture Blueprint',
              },
              {
                step: 'STAGE 02',
                title: 'Govern, Deploy & Integrate',
                tag: 'Governance & Production',
                desc: 'Integrate enterprise AI governance, enforce zero-trust guardrails (real-time PII redaction, prompt firewalls), and deploy hardened multi-agent platforms directly into your private infrastructure.',
                highlights: [
                  'Enterprise AI Governance & Zero-Trust Guardrails',
                  'Autonomous Multi-Agent Swarms & Secure Gateways',
                  'Turnkey Integration with Enterprise AI Platforms',
                ],
                deliverable: 'Hardened Production AI Platform',
              },
              {
                step: 'STAGE 03',
                title: 'Build Internal Capability',
                tag: 'Workforce Mastery',
                desc: 'Transform your team Sales, developers, architects, BAs and leaders into self-sufficient AI builders across 12 specialized applied tracks.',
                highlights: [
                  '12 Role-Specific Practitioner Curriculum Tracks',
                  'Hands-On Sandbox Capstones with Real Tooling',
                  'Enterprise Center of Excellence (CoE) Blueprint',
                ],
                deliverable: 'Autonomous Internal AI Builders',
              },
            ].map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.12)' }}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid #e2e8f0',
                  padding: '32px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Top Accent Line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#f97316' }} />

                {/* Stage Indicator & Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '1.5px', color: '#ea580c', fontFamily: 'monospace' }}>
                    {stage.step}
                  </span>
                  <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#c2410c', background: '#fff7ed', border: '1px solid #fed7aa', padding: '4px 10px', borderRadius: '12px' }}>
                    {stage.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
                  {stage.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '22px' }}>
                  {stage.desc}
                </p>

                {/* Key Deliverable Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
                  {stage.highlights.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={15} color="#ea580c" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.83rem', color: '#1e293b', lineHeight: 1.45, fontWeight: 600 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Deliverable Badge */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Key Deliverable:
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a' }}>
                    {stage.deliverable}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3. INDUSTRIES WE TRANSFORM (Clean Light Backing & Cards)       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5%',
        background: '#f1f5f9',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Mesh Blob — indigo, top-right */}
        <div style={{ position: 'absolute', top: '-60px', right: '-80px', width: '500px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)', filter: 'blur(65px)', pointerEvents: 'none', zIndex: 0 }} />
        {/* Mesh Blob — orange, bottom-left */}
        <div style={{ position: 'absolute', bottom: '-50px', left: '-60px', width: '420px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 70%)', filter: 'blur(55px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
              Proven Impact · Sector Leadership
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: 900, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
              Industry-Specific AI Impact
            </h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', maxWidth: '620px', margin: '10px auto 0', lineHeight: 1.6 }}>
              Domain-tailored cognitive systems engineered for the strict regulatory, data security, and high-throughput demands of enterprise leaders.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.25)' }}
                  style={{
                    position: 'relative',
                    height: '230px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px',
                  }}
                >
                  {/* High-Resolution Photographic Background */}
                  <img
                    src={ind.image}
                    alt={ind.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.15) brightness(1.05) saturate(1.15)',
                      transition: 'transform 0.5s ease',
                      zIndex: 1,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Gradient Scrim for crisp readability */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(4, 9, 24, 0.94) 0%, rgba(4, 9, 24, 0.45) 45%, rgba(4, 9, 24, 0.10) 100%)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }} />

                  {/* Top Floating Badge */}
                  <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 3 }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#ffffff',
                      background: 'rgba(249, 115, 22, 0.92)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}>
                      {ind.tag}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div style={{ position: 'relative', zIndex: 3 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'rgba(255,255,255,0.20)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={17} color="#ffffff" />
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                        {ind.name}
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.92)', margin: 0, paddingLeft: '42px', fontWeight: 500, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
                      {ind.useCase}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 4. EXECUTIVE CTA BANNER (Clean High-Impact Light Framing)      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '40px 5% 36px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#fff7ed',
            border: '1px solid #fed7aa',
            padding: '6px 18px',
            borderRadius: '30px',
            marginBottom: '20px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316', display: 'inline-block' }} />
            <span style={{ color: '#c2410c', letterSpacing: '1.5px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
              Partner With trainVector™
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: 900, color: '#0f172a', marginBottom: '16px', lineHeight: 1.25, letterSpacing: '-0.02em', fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
            Ready to Accelerate Your AI Advantage?
          </h2>
          <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.65, marginBottom: '36px', maxWidth: '640px', margin: '0 auto 36px' }}>
            Connect with our team to discuss bespoke enterprise advisory, deploy production AI platforms, or upskill your engineering workforce.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleApply('consulting')}
              style={{
                padding: '14px 32px', borderRadius: '10px', border: 'none',
                background: '#f97316',
                color: '#fff', fontWeight: 800, fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(249,115,22,0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              Schedule AI Advisory <ArrowRight size={16} style={{ display: 'inline', marginLeft: '6px', verticalAlign: 'middle' }} />
            </button>
            <Link
              to="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 26px', borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a', fontWeight: 700, fontSize: '0.92rem',
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              Explore AI Products
            </Link>
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
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              Capability Building
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
