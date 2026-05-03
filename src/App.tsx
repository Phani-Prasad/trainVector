import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

import {
  Zap,
  Cpu,
  Layers,
  ArrowRight,
  ChevronRight,
  Linkedin,
  Twitter,
  BookOpen,
  Terminal,
  Compass,
  Briefcase,
  ClipboardList,
  Target,
  ShieldCheck,
  Globe,
  Award,
  GraduationCap,
  Laptop,
  MessageSquare,
  Code,
  X,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';

import logo from './assets/logo_wide.png';
import agentforgePreview from './assets/agentforge_preview.png';

const App = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    specialization: '',
    goals: '',
    experience: 'Intermediate (Practical Use)'
  });

  const roles = [
    {
      title: "Developers & Architects",
      icon: <Terminal size={24} color="var(--accent-blue)" />,
      skills: ["RAG Architecture & Retrieval Pipelines", "Model Fine-Tuning & Customization Strategies", "API Orchestration & AI Service Integration", "AI Observability, Evaluation & Guardrails"],
      color: "var(--accent-blue)"
    },
    {
      title: "Product Managers & Business Analysts",
      icon: <Compass size={24} color="var(--primary)" />,
      skills: ["AI-Driven User Insights & Analytics", "Product-Market Fit", "Prompt Engineering Strategy", "Strategic Prioritization"],
      color: "var(--primary)"
    },
    {
      title: "Project & Delivery Managers",
      icon: <ClipboardList size={24} color="#ffde00" />,
      skills: ["End-to-End AI Lifecycle Management", "Proactive Risk Management & Mitigation", "Strategic Resource Planning", "Vendor Strategy, Evaluation"],
      color: "#ffde00"
    },
    {
      title: "Executives & Leaders",
      icon: <Briefcase size={24} color="var(--secondary)" />,
      skills: ["Value Realization & AI-Driven ROI", "AI Governance & Responsible Oversight", "Enterprise Transformation & Change Leadership", "Ethical AI, Risk & Regulatory Compliance"],
      color: "var(--secondary)"
    }
  ];

  const foundationItems = [
    { label: "AI Unlocked: From ML to Deep Learning", icon: <Cpu size={18} /> },
    { label: "GenAI Deep Dive: LLMs & Prompting", icon: <Zap size={18} /> },
    { label: "Agentic AI: Systems & MCP Workflows", icon: <Layers size={18} /> },
    { label: "Responsible AI: Ethics & Safety", icon: <ShieldCheck size={18} /> }
  ];

  const handleApply = () => {
    setIsModalOpen(true);
    setStep(1);
    setIsSuccess(false);
    setFormError('');
    setFormData({ ...formData, specialization: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Firebase Firestore
      await addDoc(collection(db, 'leads'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        specialization: formData.specialization,
        goals: formData.goals,
        experience: formData.experience,
        submittedAt: serverTimestamp()
      });

      // 2. Send email notification via EmailJS
      await emailjs.send(
        'service_hntv8qm',
        'template_nnw0myj',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          specialization: formData.specialization,
          goals: formData.goals,
          experience: formData.experience,
        },
        'eNkzn7ZO6GbcTQ8wL'
      );

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission Error:", error);
      setIsSubmitting(false);
      alert("Submission failed. Please check your connection and try again.");
    }
  };


  return (
    <div className="min-h-screen">
      <div className="glow-orb" style={{ width: '400px', height: '400px', top: '10%', left: '5%', background: 'var(--primary)' }} />
      <div className="glow-orb" style={{ width: '500px', height: '500px', bottom: '10%', right: '5%', background: 'var(--secondary)', animationDelay: '-10s' }} />
      <div className="glow-orb" style={{ width: '300px', height: '300px', top: '40%', right: '20%', background: 'var(--accent-blue)', animationDelay: '-5s' }} />

      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        padding: '20px 5%',
        background: 'rgba(5, 6, 10, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={logo}
            alt="trainVector Logo"
            style={{
              height: 'var(--logo-height, 70px)',
              maxHeight: '12vw',
              minHeight: '40px',
              borderRadius: '6px',
              background: '#fff',
              padding: '6px'
            }}
          />
        </div>
        <div className="nav-links">
          <a href="#curriculum" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>CURRICULUM</a>
          <a href="#agentforge" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>AgentForge</a>
          <a href="#faq" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>FAQ</a>
          <button onClick={handleApply} className="glow-btn" style={{ fontSize: 'min(0.8rem, 3vw)', padding: '8px 20px' }}>Join Cohort</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '180px 5% 100px', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ color: 'var(--primary)', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            The Architecture of Intelligence
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginTop: '20px', lineHeight: 1.1 }}>
            BUILD YOUR <span style={{ color: 'var(--primary)', textShadow: '0 0 20px var(--primary-glow)' }}>AI FUTURE</span> <br />
            ON A SOLID FOUNDATION
          </h1>
          <p style={{ maxWidth: '1000px', margin: '30px auto', fontSize: '1.2rem', lineHeight: '1.7' }}>
            <span style={{ color: '#fff', fontWeight: 800, letterSpacing: '0.5px' }}>One common intelligence core. Four specialized professional paths.</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', margin: '0 15px' }}>|</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>trainVector Academy's structured blueprint for transforming your knowledge into a career-defining advantage.</span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '60px', position: 'relative' }}>
            {/* Pulsing Badge */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 0px rgba(255, 222, 0, 0)',
                  '0 0 20px rgba(255, 222, 0, 0.4)',
                  '0 0 0px rgba(255, 222, 0, 0)'
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                top: '-40px',
                left: 'calc(50% - 150px)',
                background: '#ffde00',
                color: '#000',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '1px',
                zIndex: 10,
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                pointerEvents: 'none'
              }}
            >
              FIRST 10 SEATS FREE
            </motion.div>

            <button onClick={handleApply} className="glow-btn">Apply Now <ArrowRight size={18} style={{ marginLeft: '10px' }} /></button>
            <button
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-card"
              style={{ padding: '12px 30px', fontWeight: 600 }}
            >
              Explore Curriculum
            </button>
          </div>
        </motion.div>
      </section>

      {/* Program Structure / Timeline */}
      <section style={{ padding: '40px 5%', background: 'rgba(255,255,255,0.02)', borderY: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '12px', background: 'var(--primary)15', color: 'var(--primary)', borderRadius: '12px' }}>
              <Compass size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Duration</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>4-Week Intensive</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '12px', background: 'var(--accent-blue)15', color: 'var(--accent-blue)', borderRadius: '12px' }}>
              <Layers size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Phase 1 (Week 1-2)</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>AI Core Foundation</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '12px', background: 'var(--secondary)15', color: 'var(--secondary)', borderRadius: '12px' }}>
              <Target size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Phase 2 (Week 3-4)</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Role-Based Mastery</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '12px', background: '#ffde0015', color: '#ffde00', borderRadius: '12px' }}>
              <Zap size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Commitment</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, margin: '4px 0' }}>Flexible (Approx. 3h/Day)</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>Self-paced modules + Scheduled live workshops</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 2+2 Mastery Roadmap */}
      <section style={{ padding: '60px 5%', background: 'rgba(255,255,255,0.01)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>THE <span style={{ color: 'var(--primary)' }}>MASTERY</span> ROADMAP</h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>From a unified core to specialized mastery in 4 weeks.</p>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <div className="glass-card" style={{ 
            padding: '60px 40px', 
            border: '1px solid rgba(249, 115, 22, 0.3)', 
            background: 'rgba(255,255,255,0.02)', 
            position: 'relative', 
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(249, 115, 22, 0.05)'
          }}>
            {/* Phase 1: The Core Foundation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', marginBottom: '80px' }}>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  background: 'rgba(249, 115, 22, 0.1)', 
                  color: 'var(--primary)', 
                  padding: '6px 16px', 
                  borderRadius: '30px', 
                  fontSize: '0.95rem', 
                  fontWeight: 900, 
                  border: '1px solid var(--primary)33',
                  letterSpacing: '1px'
                }}>
                  <Target size={12} /> PHASE 1: THE AI FOUNDATION MODULE
                </div>
              </div>

              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '40px'
              }}>
                {[
                  { week: "WEEK 01", title: "AI Core Foundation", desc: "Deep understanding of ML, DL and applications. Master LLM fundamentals and architecture.", color: "var(--primary)", icon: <Cpu size={20} /> },
                  { week: "WEEK 02", title: "Agentic Systems & Tools", desc: "Build autonomous workflows, integrate tools, and master RAG pipelines.", color: "var(--accent-blue)", icon: <Zap size={20} /> }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ 
                      display: 'flex', 
                      flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                      alignItems: 'center',
                      gap: '30px',
                      width: '100%'
                    }}
                    className="timeline-row"
                  >
                    <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                      <div style={{ color: item.color, fontWeight: 800, letterSpacing: '2px', fontSize: '0.7rem', marginBottom: '5px' }}>{item.week}</div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.title}</h3>
                      <p style={{ color: 'var(--text-dim)', lineHeight: 1.5, fontSize: '0.85rem' }}>{item.desc}</p>
                    </div>
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      background: 'var(--bg-card)', 
                      border: `2px solid ${item.color}`, 
                      borderRadius: '50%', 
                      display: 'grid', 
                      placeItems: 'center', 
                      zIndex: 2,
                      boxShadow: `0 0 15px ${item.color}22`,
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }} className="hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Separator Line */}
            <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, var(--border), transparent)', margin: '40px 0' }} />

            {/* Phase 2: Specialization */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(139, 92, 246, 0.1)', 
                color: 'var(--secondary)', 
                padding: '6px 16px', 
                borderRadius: '30px', 
                fontSize: '0.95rem', 
                fontWeight: 900, 
                border: '1px solid var(--secondary)33',
                letterSpacing: '1px',
                marginBottom: '40px'
              }}>
                <Compass size={12} /> PHASE 2: ROLE-BASED SPECIALIZATION
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }} className="revealed-grid">
                {roles.map((role, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ 
                      padding: '20px 15px', 
                      background: 'rgba(255,255,255,0.02)', 
                      border: `1px solid ${role.color}33`, 
                      borderRadius: '16px',
                      textAlign: 'center',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    whileHover={{ 
                      y: -5, 
                      borderColor: role.color, 
                      background: 'rgba(255,255,255,0.04)'
                    }}
                  >
                    <div style={{ color: role.color, marginBottom: '10px' }}>{role.icon}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '5px' }}>Weeks 3-4</div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>{role.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>Deep dive into {role.title.split(' & ')[0]} AI workflows.</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The AI Knowledge Temple (The House) */}
      <section id="curriculum" style={{ padding: '70px 5%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '80px', fontSize: '2.5rem' }}>The Knowledge <span style={{ color: 'var(--primary)' }}>Temple</span></h2>

        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          {/* 1. The Roof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              maxWidth: '1100px', 
              margin: '0 auto',
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
              padding: '15px 40px',
              borderRadius: '20px 20px 0 0',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 3,
              width: '100%'
            }}
          >
            <div className="data-beam" style={{ left: '10%', height: '200%', top: '-50%', animationDelay: '0.5s' }} />
            <div className="data-beam" style={{ right: '15%', height: '200%', top: '-50%', animationDelay: '1.2s', background: 'var(--secondary)' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <GraduationCap style={{ color: '#000' }} size={24} />
              <div className="font-orbitron" style={{ fontSize: '1.2rem', color: '#000', fontWeight: 900, letterSpacing: '1px' }}>
                trainVector Role based AI MASTERY
              </div>
            </div>
          </motion.div>

          {/* 2. The Pillars (Joined together) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '0', // NO GAP
            position: 'relative',
            zIndex: 2,
            borderLeft: '1px solid var(--border)',
            borderRight: '1px solid var(--border)',
            background: 'var(--bg-card)'
          }} className="temple-pillars-container">
            {/* Global Energy Particles (Flowing Up) */}
            <div className="energy-particle" style={{ bottom: '0', left: '10%', background: 'var(--primary)', animationDelay: '0s' }} />
            <div className="energy-particle" style={{ bottom: '0', left: '35%', background: 'var(--accent-blue)', animationDelay: '1s' }} />
            <div className="energy-particle" style={{ bottom: '0', left: '60%', background: 'var(--secondary)', animationDelay: '2s' }} />
            <div className="energy-particle" style={{ bottom: '0', left: '85%', background: '#ffde00', animationDelay: '1.5s' }} />
            
            <div className="energy-particle" style={{ bottom: '0', left: '22%', background: 'var(--primary)', animationDelay: '0.5s', opacity: 0.5 }} />
            <div className="energy-particle" style={{ bottom: '0', left: '47%', background: 'var(--accent-blue)', animationDelay: '1.5s', opacity: 0.5 }} />
            <div className="energy-particle" style={{ bottom: '0', left: '72%', background: 'var(--secondary)', animationDelay: '0.8s', opacity: 0.5 }} />
            <div className="energy-particle" style={{ bottom: '0', left: '95%', background: '#ffde00', animationDelay: '2.2s', opacity: 0.5 }} />
            
            {roles.map((role, i) => (
              <motion.div
                key={i}
                onClick={handleApply}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                  borderTop: '1px solid var(--border)',
                  padding: '40px 20px',
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                whileHover={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  scale: 1.01
                }}
              >
                <div className="data-beam" style={{ left: '0', background: role.color, animationDelay: `${i * 0.4}s`, opacity: 0.3 }} />
                
                <div style={{ marginBottom: '25px', color: role.color }}>
                  {role.icon}
                </div>
                <h4 style={{ color: role.color, fontSize: '0.85rem', marginBottom: '20px', letterSpacing: '1px', fontWeight: 800 }}>{role.title.toUpperCase()}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flexGrow: 1 }}>
                  {role.skills.map((skill, si) => (
                    <div key={si} style={{ fontSize: '0.8rem', color: 'var(--text-dim)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '5px' }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3. The Foundation (The Base) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              width: 'calc(100% + 40px)', // Slightly wider to look like a foundation base
              marginLeft: '-20px',
              background: 'var(--bg-card)',
              border: '2px solid var(--primary)',
              boxShadow: '0 0 40px var(--primary-glow)',
              borderRadius: '10px',
              padding: '50px 30px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
              marginTop: '-2px' // Overlap slightly to 'attach'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--primary)', color: '#000', padding: '5px 15px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '25px' }}>
              <Target size={14} /> The Shared Core
            </div>
            <h3 className="font-orbitron" style={{ fontSize: '1.6rem', color: 'var(--primary)', marginBottom: '30px' }}>THE AI FOUNDATION MODULE</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {foundationItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, textAlign: 'left' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Agentic Sandbox Section */}
      <section id="agentforge" style={{ padding: '30px 5%', background: 'rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="platform-grid">
            
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '2.5rem', marginBottom: '25px' }}>The trainVector's <br /><span style={{ color: 'var(--primary)' }}>Agent</span><span style={{ color: '#fff' }}>Forge</span> <span style={{ color: 'var(--primary)' }}>Platform</span></h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '30px' }}>
                Don't just learn about AI, deploy it. Every student gets exclusive access to our high-fidelity sandbox designed for testing complex multi-agent systems.
              </p>
              
              <div className="platform-features" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
                {[
                  { title: "Multi-Agent Orchestration", desc: "Build and deploy complex AI systems." },
                  { title: "Deep Observability", desc: "Track reasoning, tool-calls, and run history." },
                  { title: "Integrated Knowledge", desc: "Connect vector DBs and RAG pipelines." },
                  { title: "Real-time Analytics", desc: "Monitor success rates and token usage." }
                ].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ color: 'var(--primary)', marginTop: '3px' }}><CheckCircle2 size={16} /></div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>{feat.title}</div>
                      <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', lineHeight: 1.4 }}>{feat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Side: Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ 
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1.5px solid #f97316',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
              }}
            >
              <img 
                src={agentforgePreview} 
                alt="AgentForge Dashboard" 
                style={{ width: '100%', height: '350px', objectFit: 'contain', display: 'block' }} 
              />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(5,6,10,0.8), transparent 40%)',
                pointerEvents: 'none'
              }} />
              
              {/* Floating Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(10px)',
                padding: '8px 15px',
                borderRadius: '30px',
                fontSize: '0.7rem',
                fontWeight: 800,
                color: 'var(--primary)',
                border: '1px solid var(--primary)44',
                letterSpacing: '1px'
              }}>
                LIVE PLATFORM
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The trainVector Experience */}
      <section style={{ padding: '100px 5%', background: 'linear-gradient(to bottom, transparent, rgba(249, 115, 22, 0.02), transparent)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>HOW YOU <span style={{ color: 'var(--primary)' }}>LEARN</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            {
              title: "Self-Paced Mastery",
              desc: "Comprehensive learning paths designed to take you from beginner to advanced AI at your own speed.",
              icon: <Laptop size={32} />,
              color: "var(--accent-blue)"
            },
            {
              title: "Expert-Led Masterclasses",
              desc: "Live, instructor-guided sessions where you architect real-world AI projects and custom agentic workflows under expert mentorship.",
              icon: <Code size={32} />,
              color: "var(--primary)"
            },
            {
              title: "Executive AI Briefings",
              desc: "Strategic insights and cutting-edge trends directly from industry pioneers and global AI authorities.",
              icon: <MessageSquare size={32} />,
              color: "var(--secondary)"
            }
          ].map((mode, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card"
              style={{ padding: '40px', textAlign: 'center' }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                background: `${mode.color}15`,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 25px',
                color: mode.color,
                boxShadow: `0 0 20px ${mode.color}20`
              }}>
                {mode.icon}
              </div>
              <h3 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>{mode.title}</h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>{mode.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '100px 5%' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            FREQUENTLY ASKED <span style={{ color: 'var(--primary)' }}>QUESTIONS</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-dim)', marginBottom: '60px' }}>
            Everything you need to know before joining the next cohort.
          </p>

          {[
            { q: "Is this program suitable for beginners?", a: "Yes! The program starts with a 2-week 'Shared AI Foundation' module that brings everyone up to speed — regardless of your background. From there, you branch into your role-specific track for another 2 weeks. You only need curiosity and a growth mindset." },
            { q: "How much time do I need to commit per week?", a: "This is a 4-week high-intensity program. We recommend a commitment of 15-20 hours per week. This includes interactive modules, live builder workshops, and hands-on project work." },
            { q: "Which track should I choose?", a: "Choose based on your current role: Builder Track (Developers & Architects), Product Track (Product Managers & BAs), Delivery Track (Program Managers and Scrum Masters), or Strategy Track (Executives & Leaders). Not sure? Apply and we'll guide you." },
            { q: "Do I get a certificate at the end?", a: "Yes! Upon successful completion of your track, you receive a trainVector AI Mastery Certificate. You also get access to exclusive alumni community and resources." },
            { q: "Is the content updated regularly?", a: "Absolutely. AI is advancing at an unprecedented pace and so does our curriculum, updated every cohort with the latest tools, models, and emerging trends." },
            { q: "What is the investment/cost?", a: "Pricing is based on your selected track and cohort. Apply now and our admissions team will share the full fee structure and any early-bird offers available for the upcoming cohort." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{ marginBottom: '12px' }}
            >
              <div
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  padding: '22px 28px',
                  background: openFaq === i ? 'rgba(249, 115, 22, 0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${openFaq === i ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: openFaq === i ? '12px 12px 0 0' : '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '1rem', paddingRight: '20px' }}>{item.q}</span>
                <ChevronRight
                  size={18}
                  style={{
                    color: 'var(--primary)',
                    transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
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
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '20px 28px',
                      background: 'rgba(249, 115, 22, 0.04)',
                      border: '1px solid var(--primary)',
                      borderTop: 'none',
                      borderRadius: '0 0 12px 12px',
                      color: 'var(--text-dim)',
                      lineHeight: 1.7,
                      fontSize: '0.95rem'
                    }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ padding: '80px 5% 40px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', marginBottom: '30px' }}>
          <img
            src={logo}
            alt="trainVector Logo"
            style={{
              height: 'var(--logo-height, 70px)',
              maxHeight: '12vw',
              minHeight: '40px',
              borderRadius: '6px',
              background: '#fff',
              padding: '6px'
            }}
          />
        </div>
        <p style={{ color: 'var(--text-dim)', marginBottom: '10px' }}>&copy; {new Date().getFullYear()} trainVector Academy. All Rights Reserved.</p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '30px', fontSize: '1.1rem' }}>
          Questions? Call us: <a href="tel:+918310590859" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8310590859</a>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Twitter size={20} color="var(--text-dim)" />
          <Linkedin size={20} color="var(--text-dim)" />
          <BookOpen size={20} color="var(--text-dim)" />
        </div>
      </footer>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(5, 6, 10, 0.9)', backdropFilter: 'blur(8px)' }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '550px',
                position: 'relative',
                padding: '40px',
                zIndex: 1001,
                border: `1px solid ${formData.specialization ? roles.find(r => r.title === formData.specialization)?.color : 'var(--border)'}`,
                boxShadow: `0 20px 50px ${formData.specialization ? roles.find(r => r.title === formData.specialization)?.color + '22' : 'rgba(0,0,0,0.5)'}`
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              {isSuccess ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle2 size={64} color="var(--primary)" style={{ marginBottom: '20px' }} />
                  <h2 className="font-orbitron">APPLICATION RECEIVED</h2>
                  <p style={{ color: 'var(--text-dim)', marginTop: '20px' }}>
                    Welcome to the trainVector Academy, <strong>{formData.name}</strong>. Our admissions team will review your profile for the <strong>{formData.specialization}</strong> track and reach out within 48 hours.
                  </p>
                  <button onClick={() => setIsModalOpen(false)} className="glow-btn" style={{ marginTop: '40px' }}>Close Terminal</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    background: '#ffde0022', 
                    color: '#ffde00', 
                    padding: '8px 16px', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem', 
                    fontWeight: 800,
                    border: '1px solid #ffde0033',
                    marginBottom: '25px',
                    justifyContent: 'center'
                  }}>
                    <Zap size={14} /> SCHOLARSHIP ALERT: FIRST 10 SEATS ARE FREE
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h3 className="font-orbitron" style={{ fontSize: '1.2rem' }}>
                      {step === 1 && "TELL US ABOUT YOU"}
                      {step === 2 && "CHOOSE YOUR PATH"}
                      {step === 3 && "ADMISSIONS CONTEXT"}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>STEP {step}/3</span>
                  </div>

                      <AnimatePresence mode="wait">
                        {step === 1 && (
                          <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Name <span style={{ color: 'var(--primary)' }}>*</span></label>
                              <input
                                required
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.name}
                                onChange={(e) => {
                                  setFormData({ ...formData, name: e.target.value });
                                  setFormError('');
                                }}
                              />
                            </div>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Email <span style={{ color: 'var(--primary)' }}>*</span></label>
                              <input
                                required
                                type="email"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.email}
                                onChange={(e) => {
                                  setFormData({ ...formData, email: e.target.value });
                                  setFormError('');
                                }}
                              />
                            </div>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Phone <span style={{ color: 'var(--primary)' }}>*</span></label>
                              <input
                                required
                                type="tel"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.phone}
                                onChange={(e) => {
                                  setFormData({ ...formData, phone: e.target.value });
                                  setFormError('');
                                }}
                              />
                            </div>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Company (Optional)</label>
                              <input
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              />
                            </div>
                        {formError && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>
                            {formError}
                          </motion.div>
                        )}
                        <button 
                          type="button" 
                          onClick={() => {
                            if (!formData.name || !formData.email || !formData.phone) {
                              setFormError('All fields with * are mandatory');
                            } else {
                              setStep(2);
                            }
                          }} 
                          className="glow-btn" 
                          style={{ marginTop: '20px' }}
                        >
                          Next Sequence
                        </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {roles.map((r, i) => (
                          <div
                            key={i}
                            onClick={() => setFormData({ ...formData, specialization: r.title })}
                            style={{
                              padding: '15px',
                              borderRadius: '8px',
                              border: `1px solid ${formData.specialization === r.title ? r.color : 'var(--border)'}`,
                              background: formData.specialization === r.title ? `${r.color}11` : 'rgba(255,255,255,0.02)',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <div style={{ color: r.color, marginBottom: '10px' }}>{r.icon}</div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{r.title}</div>
                          </div>
                        ))}
                        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '15px', marginTop: '20px' }}>
                          <button onClick={() => setStep(1)} type="button" className="glass-card" style={{ padding: '12px 20px', flex: 1 }}><ChevronLeft size={18} /> Back</button>
                          <button onClick={() => setStep(3)} disabled={!formData.specialization} type="button" className="glow-btn" style={{ flex: 2 }}>Next Step</button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="input-field">
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Primary Goal for this Cohort</label>
                          <textarea
                            required
                            className="glass-card"
                            rows={3}
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', resize: 'none' }}
                            value={formData.goals}
                            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                            placeholder="e.g. Scaling LLM Infrastructure..."
                          />
                        </div>
                        <div className="input-field">
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Current AI Proficiency</label>
                          <select
                            className="glass-card"
                            style={{ width: '100%', padding: '12px', background: 'rgba(5, 6, 10, 1)', border: '1px solid var(--border)' }}
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          >
                            <option>Beginner (AI Curious)</option>
                            <option>Intermediate (Practical Use)</option>
                            <option>Advanced (Building/Architecting)</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                          <button onClick={() => setStep(2)} type="button" className="glass-card" style={{ padding: '12px 20px', flex: 1 }}><ChevronLeft size={18} /> Back</button>
                          <button type="submit" disabled={isSubmitting || !formData.goals} className="glow-btn" style={{ flex: 2 }}>
                            {isSubmitting ? "TRANSMITTING..." : "COMPLETE APPLICATION"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
