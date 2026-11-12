import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Briefcase, CheckCircle2,
  Target, Award, ShieldCheck, Sparkles, Cpu, Layers, Terminal,
  Activity, TrendingUp, Scale, ArrowRight, X, Clock, FileText,
  Search, Users, BookOpen, ChevronRight, Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACADEMY_TRACKS, DELIVERY_FORMATS } from '../data/tracksData';

interface Workshop {
  id: string;
  badge: string;
  title: string;
  description: string;
  photos: { src: string; alt: string; caption: string }[];
  certificate?: { src: string; alt: string; caption: string };
}

const WORKSHOPS: Workshop[] = [
  {
    id: 'manufacturing-genai',
    badge: 'Enterprise Workshop · Manufacturing',
    title: 'Gen AI, Agentic AI & AI Governance: Hands-On for Manufacturing Teams',
    description:
      'An immersive, hands-on enterprise workshop that took a manufacturing organisation\'s teams from Generative AI and Prompt Engineering to building Agentic AI workflows, with AI Governance and Observability built in from day one. Participants left with working skills and the discipline to deploy AI with control, not just speed.',
    photos: [
      { src: '/images/training/manufacturing-genai-workshop-1.jpg', alt: 'Hands-on Gen AI and Agentic AI workshop for a manufacturing company with participants and laptops', caption: 'A full room, laptops open: hands-on learning, not just slides' },
      { src: '/images/training/manufacturing-genai-workshop-2.jpg', alt: 'Trainer presenting end-to-end enterprise AI architecture and lifecycle control', caption: 'End-to-end enterprise architecture: deploy, execute, monitor, evaluate, update' },
      { src: '/images/training/manufacturing-genai-workshop-3.jpg', alt: 'Trainer presenting the pre-deployment AI risk funnel', caption: 'The pre-deployment risk funnel: identify, analyse, evaluate, mitigate' },
    ],
  },
  {
    id: 'raichur-advocates',
    badge: 'Professional Workshop · Legal',
    title: 'AI Workshop for Lawyers & Advocates',
    description:
      'Organised by the Raichur Advocates\' Association. Practical, ready-to-use AI for legal research, drafting and productivity, grounded in Responsible AI, Data Privacy, Professional Ethics and AI Governance, so AI is adopted safely and responsibly in legal practice.',
    photos: [
      { src: '/images/training/raichur-advocates-ai-workshop-1.jpg', alt: 'Raichur Advocates\' Association AI Workshop inauguration on stage with guests', caption: 'Inauguration with the district judiciary and Bar leadership' },
      { src: '/images/training/raichur-advocates-ai-workshop-2.jpg', alt: 'Trainer presenting the AI tool ecosystem for lawyers in India', caption: 'The AI tool ecosystem for lawyers in India' },
      { src: '/images/training/raichur-advocates-ai-workshop-3.jpg', alt: 'Trainer presenting professional non-negotiables for AI use in legal practice', caption: 'Professional non-negotiables: responsible AI in legal practice' },
    ],
  },
  {
    id: 'law-teachers-india-fdp',
    badge: 'National Programme · Academia',
    title: 'Use of AI in Teaching & Research: National Level Faculty Development Programme',
    description:
      'Invited as a Resource Person for a One Week Online National Level Capacity Building Programme / Faculty Development Programme organised by Law Teachers India (November 2–8, 2026). Equipping faculty and researchers across the country to use AI confidently and responsibly in teaching, research and academic practice.',
    photos: [],
    certificate: {
      src: '/images/training/law-teachers-india-certificate.jpg',
      alt: 'Certificate of Appreciation from Law Teachers India for serving as Resource Person in the National Level FDP on Use of AI in Teaching and Research',
      caption: 'Certificate of Appreciation from Law Teachers India',
    },
  },
];

interface PersonaConfig {
  id: string;
  label: string;
  icon: string;
  badge: string;
  headline: string;
  description: string;
  trackIds: string[];
}

interface TrackTheme {
  archetype: string;
  archetypeIcon: string;
  accentColor: string;
  bgGlow: string;
  focusHighlight: string;
}

const getTrackTheme = (trackId: string): TrackTheme => {
  switch (trackId) {
    case 'ai-strategy':
      return {
        archetype: 'Executive & Strategy',
        archetypeIcon: '👔',
        accentColor: '#9333ea',
        bgGlow: 'rgba(147, 51, 234, 0.08)',
        focusHighlight: 'Enterprise ROI · Build-vs-Buy · Board Pitch Roadmaps'
      };
    case 'ai-governance':
      return {
        archetype: 'Security & Compliance',
        archetypeIcon: '🛡️',
        accentColor: '#9333ea',
        bgGlow: 'rgba(147, 51, 234, 0.08)',
        focusHighlight: 'AgentClamp™ Guardrails · PII Redaction · EU AI Act'
      };
    case 'ai-architecture':
      return {
        archetype: 'Systems Architecture',
        archetypeIcon: '⚡',
        accentColor: '#ea580c',
        bgGlow: 'rgba(234, 88, 12, 0.08)',
        focusHighlight: 'LangGraph Swarms · Hybrid RAG · LLM Gateways'
      };
    case 'ai-engineering':
      return {
        archetype: 'Full-Stack Engineering',
        archetypeIcon: '💻',
        accentColor: '#ea580c',
        bgGlow: 'rgba(234, 88, 12, 0.08)',
        focusHighlight: 'Production FastAPI · Async Agents · Vector Databases'
      };
    case 'ai-operations':
      return {
        archetype: 'LLMOps & Infra',
        archetypeIcon: '⚙️',
        accentColor: '#ea580c',
        bgGlow: 'rgba(234, 88, 12, 0.08)',
        focusHighlight: 'vLLM Serving · GPU Quantization · Token Semantic Caching'
      };
    case 'ai-agent-swarms':
      return {
        archetype: 'Autonomous Swarms',
        archetypeIcon: '🤖',
        accentColor: '#ea580c',
        bgGlow: 'rgba(234, 88, 12, 0.08)',
        focusHighlight: 'Supervisor Workflows · Persistent Memory · Tool Sandboxes'
      };
    case 'ai-legal':
      return {
        archetype: 'Legal & Practice Counsel',
        archetypeIcon: '⚖️',
        accentColor: '#0891b2',
        bgGlow: 'rgba(8, 145, 178, 0.08)',
        focusHighlight: 'Contract Redlining · Zero Hallucination · Data Privacy'
      };
    case 'ai-sales':
      return {
        archetype: 'Sales & RevOps',
        archetypeIcon: '📈',
        accentColor: '#0891b2',
        bgGlow: 'rgba(8, 145, 178, 0.08)',
        focusHighlight: 'Account Intelligence · Signal Scraping · Live Call AI'
      };
    case 'ai-marketing':
      return {
        archetype: 'Growth Marketing',
        archetypeIcon: '🎯',
        accentColor: '#0891b2',
        bgGlow: 'rgba(8, 145, 178, 0.08)',
        focusHighlight: 'Brand Voice Vaults · Multi-Modal Creative · Make & n8n'
      };
    case 'ai-faculty':
      return {
        archetype: 'Higher Ed & Faculty FDP',
        archetypeIcon: '🎓',
        accentColor: '#0284c7',
        bgGlow: 'rgba(2, 132, 199, 0.08)',
        focusHighlight: 'FDP Certification · Socratic Pedagogy · Rubric Automator'
      };
    case 'ai-campus-incubation':
      return {
        archetype: 'Campus AI CoE & Incubation',
        archetypeIcon: '🏛️',
        accentColor: '#0284c7',
        bgGlow: 'rgba(2, 132, 199, 0.08)',
        focusHighlight: 'Turnkey CoE Blueprint · Student Incubators · Industry MOUs'
      };
    case 'ai-students':
      return {
        archetype: 'Student Career Launchpad',
        archetypeIcon: '🚀',
        accentColor: '#16a34a',
        bgGlow: 'rgba(22, 163, 74, 0.08)',
        focusHighlight: 'Live Cloud Apps · GitHub Portfolio · Placement Accelerator'
      };
    default:
      return {
        archetype: 'Applied AI Program',
        archetypeIcon: '✨',
        accentColor: '#ea580c',
        bgGlow: 'rgba(234, 88, 12, 0.08)',
        focusHighlight: 'Hands-on Applied Practitioner Training'
      };
  }
};

const TRACK_GROUPS = [
  { category: 'tech', title: 'Enterprise & Technology Teams', subtitle: 'for leaders, architects and engineers building production AI' },
  { category: 'domain', title: 'Domain Professionals', subtitle: 'for legal, sales and marketing teams applying AI in their craft' },
  { category: 'academic', title: 'Academia & Students', subtitle: 'for faculty, institutions and early-career talent' },
] as const;

const PERSONAS: PersonaConfig[] = [
  {
    id: 'all',
    label: 'All Tracks',
    icon: '🌐',
    badge: 'Comprehensive Suite',
    headline: 'Explore All 12 Industry-Calibrated Specializations',
    description: 'Applied practitioner curricula engineered for deep-tech architects, CXOs, legal professionals, and academic institutions.',
    trackIds: []
  },
  {
    id: 'tech',
    label: 'Tech & Engineers',
    icon: '💻',
    badge: 'Deep Tech & Systems',
    headline: 'Hands-On Architecture, Model Hosting & Agent Swarms',
    description: 'For Software Engineers, Solutions Architects, and MLOps Leads building production multi-agent systems, hybrid RAG, and GPU-optimized pipelines.',
    trackIds: ['ai-architecture', 'ai-engineering', 'ai-operations', 'ai-agent-swarms']
  },
  {
    id: 'leadership',
    label: 'CXOs & Leadership',
    icon: '👔',
    badge: 'Executive & Strategy',
    headline: 'Enterprise Transformation, ROI & AI Governance',
    description: 'For CXOs, VPs, and Enterprise Strategy Leads structuring 3-year AI roadmaps, evaluating build-vs-buy economics, and enforcing compliance.',
    trackIds: ['ai-strategy', 'ai-governance']
  },
  {
    id: 'domain-legal',
    label: 'Lawyers & Domains',
    icon: '⚖️',
    badge: 'Professional Practice',
    headline: 'AI for Legal Counsel, Sales RevOps & Marketing',
    description: 'For Lawyers, In-House Counsel, Sales Leaders, and Growth Directors implementing zero-hallucination research, contract redlining, and autonomous workflows.',
    trackIds: ['ai-legal', 'ai-sales', 'ai-marketing']
  },
  {
    id: 'academic-faculty',
    label: 'Colleges & Academia',
    icon: '🎓',
    badge: 'Higher Ed, Faculty & Students',
    headline: 'Faculty FDP Sprints, Campus AI CoEs & Student Launchpads',
    description: 'For Deans, HODs, Professors, and Campus Students seeking accredited Faculty Development Programs (FDPs), turnkey incubator setups, and early-career AI accelerators.',
    trackIds: ['ai-faculty', 'ai-campus-incubation', 'ai-students']
  }
];

const AcademyPage: React.FC = () => {
  const { handleApply } = useApp();
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [selectedTrackForModal, setSelectedTrackForModal] = useState<typeof ACADEMY_TRACKS[0] | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Briefcase: <Briefcase size={20} />, Layers: <Layers size={20} />, Terminal: <Terminal size={20} />,
    Activity: <Activity size={20} />, ShieldCheck: <ShieldCheck size={20} />, TrendingUp: <TrendingUp size={20} />,
    Scale: <Scale size={20} />, Target: <Target size={20} />, GraduationCap: <GraduationCap size={20} />,
    Sparkles: <Sparkles size={20} />, Cpu: <Cpu size={20} />, Award: <Award size={20} />,
  };

  const activePersonaObj = useMemo(() => {
    return PERSONAS.find(p => p.id === selectedPersona) || PERSONAS[0];
  }, [selectedPersona]);

  const filteredTracks = useMemo(() => {
    return ACADEMY_TRACKS.filter(track => selectedPersona === 'all' || activePersonaObj.trackIds.includes(track.id));
  }, [selectedPersona, activePersonaObj]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      <style>{`.ac-track-card { transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease; } .ac-track-card:hover { border-color: #cbd5e1; box-shadow: 0 8px 24px -6px rgba(15,23,42,0.10); transform: translateY(-2px); } .ac-track-card:focus-visible { outline: 2px solid #ea580c; }`}</style>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION: Applied AI Capability Building                */}
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

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
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
                Applied Capability Building · Role-Tailored Curricula
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
              Applied GenAI Academy
            </h1>

            <p style={{
              color: '#475569',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '720px',
              margin: '0 auto 28px',
            }}>
              12 specialized practitioner tracks designed specifically for <strong>Tech Architects & Engineers</strong>, <strong>Enterprise CXOs</strong>, <strong>Lawyers & Domain Leaders</strong>, <strong>Colleges & Faculty</strong>, and <strong>Aspiring Talent</strong>.
            </p>

            {/* Quick Metrics Bar */}
            <div style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              padding: '10px 24px',
              borderRadius: '30px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 14px -2px rgba(15, 23, 42, 0.05)'
            }}>
              <span style={{ fontSize: '0.80rem', color: '#334155', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ea580c' }} />
                <strong>12</strong> Calibrated Tracks
              </span>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <span style={{ fontSize: '0.80rem', color: '#334155', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#0284c7' }} />
                <strong>4</strong> Flexible Formats
              </span>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <span style={{ fontSize: '0.80rem', color: '#334155', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a' }} />
                <strong>100%</strong> Applied Hands-On Sprints
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. INNOVATIVE PERSONA & TRACK COMMAND CENTER                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5%',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
              Tailored Role Exploration
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: 900, color: '#0f172a' }}>
              Choose Your Audience & Role Focus
            </h2>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.84rem', fontWeight: 700, color: '#64748b', marginBottom: '10px' }}>I am a…</div>

          {/* ── PERSONA SELECTOR BAR ── */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {PERSONAS.map(p => {
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '12px',
                    border: isSelected ? '1px solid #f97316' : '1px solid #e2e8f0',
                    background: isSelected
                      ? '#f97316'
                      : '#ffffff',
                    color: isSelected ? '#ffffff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isSelected ? '0 4px 16px rgba(249,115,22,0.35)' : '0 2px 6px rgba(15,23,42,0.04)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{p.icon}</span>
                  <span>{p.label}</span>
                  {p.trackIds.length > 0 && (
                    <span style={{
                      fontSize: '0.68rem',
                      padding: '2px 7px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(0,0,0,0.2)' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#64748b'
                    }}>
                      {p.trackIds.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── PERSONA CONTEXT (short intro for the selected audience) ── */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {activePersonaObj.headline}
            </h3>
          </div>

          {/* ── TRACKS, GROUPED BY AUDIENCE ── */}
          {TRACK_GROUPS.map((group) => {
            const groupTracks = filteredTracks.filter(t => t.category === group.category);
            if (groupTracks.length === 0) return null;
            return (
              <div key={group.category} style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 12px', paddingBottom: '10px', marginBottom: '18px', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {group.title}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    {groupTracks.length} {groupTracks.length === 1 ? 'track' : 'tracks'} · {group.subtitle}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '18px' }}>
                  {groupTracks.map((track) => (
                    <div
                      key={track.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedTrackForModal(track)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedTrackForModal(track); } }}
                      className="ac-track-card"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '22px 22px 18px',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        outlineOffset: '2px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div style={{
                          width: '42px', height: '42px', borderRadius: '10px', background: '#f1f5f9',
                          border: '1px solid #e2e8f0', color: '#0b1f3a',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {iconMap[track.iconName] || <Cpu size={20} />}
                        </div>
                        <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                          <Clock size={13} /> {track.weeks.length} weeks
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px', lineHeight: 1.3 }}>
                        {track.title}
                      </h4>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px', lineHeight: 1.4 }}>
                        For: <span style={{ color: '#334155', fontWeight: 600 }}>{track.roleBadge.replace(' | Powered by AgentClamp', '')}</span>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                        {track.shortDesc}
                      </p>
                      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', fontSize: '0.84rem', fontWeight: 800, color: '#ea580c', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        View syllabus <ArrowRight size={14} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* ── NOT SURE? ── */}
          <div style={{
            marginTop: '8px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px',
            padding: '24px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '16px',
          }}>
            <div style={{ flex: '1 1 320px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                Not sure which track fits you or your team?
              </div>
              <div style={{ fontSize: '0.88rem', color: '#475569' }}>
                Tell us your role and goals and we'll recommend the right track and format.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleApply('professional', 'Academy Track Guidance')}
                style={{ padding: '11px 22px', borderRadius: '8px', border: 'none', background: '#ea580c', color: '#ffffff', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Talk to us
              </button>
              <button
                onClick={() => handleApply('professional', 'Next Cohort Application')}
                style={{ padding: '11px 22px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Apply for next cohort
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3. CURRICULUM DETAIL MODAL (Light Clean Layout)                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedTrackForModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
            onClick={() => setSelectedTrackForModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '85vh',
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 24px 60px rgba(15, 23, 42, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Modal Top Line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: selectedTrackForModal.color }} />

              {/* Modal Header */}
              <div style={{ padding: '24px 28px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '0.66rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase',
                      color: '#ea580c', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)',
                      borderRadius: '20px', padding: '3px 10px'
                    }}>
                      {selectedTrackForModal.roleBadge}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                      <Clock size={12} color="#ea580c" /> {selectedTrackForModal.weeks.length} Weeks Practitioner Track
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    {selectedTrackForModal.title}
                  </h3>
                  <div style={{ fontSize: '0.80rem', color: '#475569', marginTop: '4px' }}>
                    <strong>Target Audience:</strong> {selectedTrackForModal.targetAudience}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTrackForModal(null)}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body (Scrollable Week Breakdown) */}
              <div style={{ padding: '20px 28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#ea580c' }}>
                  Week-By-Week Syllabus Breakdown
                </div>

                {selectedTrackForModal.weeks.map((w, wi) => (
                  <div
                    key={wi}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '14px 18px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.70rem', fontWeight: 900, color: '#ea580c', letterSpacing: '1px', fontFamily: 'monospace' }}>
                        {w.week}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic' }}>
                        {w.subtitle}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                      {w.title}
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: 0 }}>
                      {w.skills.map((sk, si) => (
                        <li key={si} style={{ fontSize: '0.80rem', color: '#334155', display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ color: '#ea580c', fontWeight: 800 }}>›</span>
                          <span>{sk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Modal Footer Actions */}
              <div style={{ padding: '16px 28px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#f8fafc' }}>
                <button
                  onClick={() => setSelectedTrackForModal(null)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const track = selectedTrackForModal;
                    setSelectedTrackForModal(null);
                    handleApply(track.category === 'academic' && track.id === 'ai-students' ? 'student' : track.category === 'academic' ? 'academic' : track.category === 'domain' ? 'domain' : 'professional', track.title);
                  }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#f97316',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Enroll in This Track <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 4. DELIVERY FORMATS                                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5%',
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
              Flexible Learning Formats
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
              Choose How You Learn
            </h2>
            <p style={{ color: '#475569', maxWidth: '580px', margin: '0 auto', fontSize: '0.94rem', lineHeight: 1.6 }}>
              Every track is available across 3 delivery formats — from live cohorts and 1:1 mentorship to institutional programs.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px' }}>
            {DELIVERY_FORMATS.map((fmt, i) => (
              <motion.div
                key={fmt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '18px',
                  padding: '28px 22px',
                  boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: fmt.color }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <span style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#ea580c', background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: '20px', padding: '3px 10px' }}>
                    {fmt.badge}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0f172a' }}>{fmt.duration}</div>
                    <div style={{ fontSize: '0.70rem', color: '#64748b' }}>{fmt.schedule}</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '6px', color: '#0f172a', lineHeight: 1.3 }}>
                  {fmt.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#ea580c', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {fmt.tagline}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', flex: 1, paddingLeft: 0 }}>
                  {fmt.features.map((f, fi) => (
                    <li key={fi} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.82rem', color: '#334155' }}>
                      <CheckCircle2 size={14} color="#ea580c" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleApply('professional', fmt.title)}
                  style={{
                    width: '100%', padding: '11px', borderRadius: '10px',
                    border: 'none', background: '#f97316', color: '#ffffff',
                    fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(249,115,22,0.35)', transition: 'all 0.3s ease'
                  }}
                >
                  {fmt.ctaText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 5. TRAINING IN ACTION                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '48px 5%', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
              Training in Action
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Real Rooms. Real Teams. Real Capability.
            </h2>
          </div>

          {WORKSHOPS.map((ws, wi) => (
            <div key={ws.id} style={{ marginBottom: wi < WORKSHOPS.length - 1 ? '48px' : 0 }}>
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#ea580c', background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: '20px', padding: '4px 12px', display: 'inline-block', marginBottom: '12px' }}>
                  {ws.badge}
                </span>
                <h3 style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>
                  {ws.title}
                </h3>
                <p style={{ color: '#475569', maxWidth: '760px', margin: '0 auto', fontSize: '0.94rem', lineHeight: 1.65 }}>
                  {ws.description}
                </p>
              </div>

              {ws.certificate && (
                <motion.figure
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{
                    margin: '0 auto', maxWidth: '380px', background: '#ffffff', border: '1px solid #e2e8f0',
                    borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)'
                  }}
                >
                  <img
                    src={ws.certificate.src}
                    alt={ws.certificate.alt}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  <figcaption style={{ padding: '12px 16px', fontSize: '0.82rem', fontWeight: 600, color: '#334155', textAlign: 'center' }}>
                    {ws.certificate.caption}
                  </figcaption>
                </motion.figure>
              )}

              {ws.photos.length > 0 && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {ws.photos.map((photo, i) => (
                  <motion.figure
                    key={photo.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      margin: 0, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px',
                      overflow: 'hidden', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)'
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }}
                    />
                    <figcaption style={{ padding: '12px 16px', fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      {photo.caption}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AcademyPage;
