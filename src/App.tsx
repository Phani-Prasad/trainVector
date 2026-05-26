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
  ChevronLeft,
  Instagram
} from 'lucide-react';

import logo from './assets/logo_new.png';
import agentclampPreview from './assets/agentclamp_preview.png';

const App = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [userType, setUserType] = useState<'student' | 'professional' | null>(null);
  const [activeProfRoadmap, setActiveProfRoadmap] = useState<'developer' | 'executive'>('developer');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',            // Stores Company OR College
    designationOrDegree: '', // Stores Designation OR Degree/Branch
    specialization: '',
    goals: '',
    experience: 'Intermediate (Practical Use)'
  });

  const studentRoles = [
    {
      title: "AI Engineer",
      icon: <Cpu size={24} color="var(--primary)" />,
      skills: ["Core ML, Deep Learning & Transformer Models", "Building Advanced RAG & Retrieval Pipelines", "Agentic Systems & Multi-Agent Workflows", "API Integrations & Custom AI Sandbox Deployment"],
      summary: "Deep technical mastery in RAG, Agentic frameworks, model customization, and hands-on building to launch an AI development career.",
      color: "var(--primary)"
    }
  ];

  const professionalRoles = [
    {
      title: "Developer / Architect (Enterprise Engineering)",
      icon: <Terminal size={24} color="var(--accent-blue)" />,
      skills: ["Advanced RAG Architecture & Model Customization", "Enterprise Multi-Agent Orchestration & Workflows", "Model Fine-Tuning & Customization Strategies", "AI Observability, Evaluation & Safety Guardrails"],
      summary: "Advanced engineering, multi-agent frameworks, deep LLM customization, and robust system architecture.",
      color: "var(--accent-blue)"
    },
    {
      title: "Executives, PMs & Analysts (Enterprise AI Strategy & Adoption)",
      icon: <Briefcase size={24} color="var(--secondary)" />,
      skills: ["AI Opportunity Identification & Feasibility Assessment", "AI Value Realization & ROI Scoping", "AI Adoption & Change Leadership", "AI Governance, Responsible AI & Risk Mitigation"],
      summary: "Identifying, Evaluating, Prioritizing, and Scaling AI Use Cases for Business Value.",
      color: "var(--secondary)"
    }
  ];

  const studentRoadmap = [
    {
      week: "Week 1",
      title: "Foundations of AI & Python Programming",
      subtitle: "From ML Basics to Vibe Coding",
      icon: <Cpu size={20} color="#06b6d4" />,
      skills: [
        "Introduction to AI, ML, DL & the evolution of Generative models",
        "Python fundamentals optimized for AI & mathematical computing",
        "Data handling pipelines using NumPy, Pandas & structured schemas",
        "Introduction to AI-assisted development & Vibe Coding paradigms"
      ]
    },
    {
      week: "Week 2",
      title: "Generative AI & Large Language Models",
      subtitle: "LLM Architectures & API Integration",
      icon: <Layers size={20} color="#06b6d4" />,
      skills: [
        "Transformer neural architectures, tokenization & embeddings",
        "Advanced prompt engineering mechanics & structured inputs",
        "Integrating OpenAI & Groq high-speed inference APIs",
        "Running local open-source models with Ollama & building a custom chatbot"
      ]
    },
    {
      week: "Week 3",
      title: "Retrieval-Augmented Generation (RAG)",
      subtitle: "Enterprise Knowledge & Context Engineering",
      icon: <Terminal size={20} color="#06b6d4" />,
      skills: [
        "RAG architecture to ground LLMs in private vector knowledge",
        "Setting up Vector Databases & understanding similarity searches",
        "Optimizing embedding models & hybrid semantic search strategies",
        "Advanced document chunking schemas & retrieval engineering metrics"
      ]
    },
    {
      week: "Week 4",
      title: "Agentic AI & Multi-Agent Systems",
      subtitle: "Stateful Workflows & Orchestrations",
      icon: <Code size={20} color="#06b6d4" />,
      skills: [
        "What makes a system agentic: reasoning loops & tool-calling setups",
        "Orchestrating agent workflows using CrewAI & LangGraph state trees",
        "Model Context Protocol (MCP) for standardized agent tool syncing",
        "Designing collaborative multi-agent teams for automated output tasks"
      ]
    },
    {
      week: "Week 5",
      title: "Enterprise AI, Governance & Observability",
      subtitle: "Production Systems & Responsible AI",
      icon: <Globe size={20} color="#06b6d4" />,
      skills: [
        "AI governance frameworks, safety rails & hallucination mitigation",
        "Implementing Responsible AI paradigms & security audits",
        "Enterprise observability: tracing reasoning chains & cost controls",
        "System telemetry: real-time prompt monitoring & performance evals"
      ]
    }
  ];

  const professionalDevRoadmap = [
    {
      week: "Week 1",
      title: "GenAI Foundations & Core Mechanics",
      subtitle: "Tokens, Architectures & System Constraints",
      icon: <Cpu size={20} color="var(--accent-blue)" />,
      skills: [
        "LLM core mechanics: tokenization, context windows & function calling",
        "The modern AI engineering stack: model providers, tooling & vibe coding",
        "Production constraints: latency budgets, rate limits & cost optimization",
        "System reliability: designing robust token pipelines & structured outputs"
      ]
    },
    {
      week: "Week 2",
      title: "Grounding AI with RAG & Context Engineering",
      subtitle: "Enterprise Knowledge & Semantic Retrieval",
      icon: <Layers size={20} color="var(--accent-blue)" />,
      skills: [
        "Advanced context engineering: designing beyond simple zero-shot prompts",
        "RAG anchors: vector databases, document chunking & embedding strategies",
        "Retrieval pipelines: hybrid keyword-semantic search & active routing",
        "Implementing advanced RAG query rerouting & context distillation patterns"
      ]
    },
    {
      week: "Week 3",
      title: "The Agentic Leap & Stateful Orchestration",
      subtitle: "Autonomous Agent Architectures",
      icon: <Terminal size={20} color="var(--accent-blue)" />,
      skills: [
        "State-driven systems: core loops, planning, memory & reasoning nodes",
        "Standardizing tool syncing using Model Context Protocol (MCP) & A2A schemas",
        "Orchestrating complex workflows using LangChain & LangGraph state trees",
        "Designing human-in-the-loop gates & safe multi-agent handoff actions"
      ]
    },
    {
      week: "Week 4",
      title: "Model Fine-Tuning & Local Execution",
      subtitle: "Optimization & Quantization",
      icon: <Code size={20} color="var(--accent-blue)" />,
      skills: [
        "Fine-tuning fundamentals: deciding when to tune versus prompt scope",
        "Parameter-efficient fine-tuning: LoRA & QLoRA custom weight strategies",
        "Running open-source models locally & offline with Ollama integrations",
        "Optimizing memory footprints, latency budgets & local GPU serving nodes"
      ]
    },
    {
      week: "Week 5",
      title: "AI Evals, Security & Production Readiness",
      subtitle: "Enterprise Quality Assurance & Career Roadmap",
      icon: <Globe size={20} color="var(--accent-blue)" />,
      skills: [
        "AI evaluation frameworks: Golden Datasets, failure tracing & LLM-as-a-judge",
        "Observability platforms (Langfuse/LangSmith) to monitor production drifts",
        "Security hardening: prompt injection shields, red teaming & privacy audits",
        "Bonus: 2026 career strategy, 10x coding tools, and building visible AI portfolios"
      ]
    }
  ];

  const professionalExecRoadmap = [
    {
      week: "Week 1",
      title: "AI Opportunity Identification",
      subtitle: "How to Identify & Map Use Cases",
      icon: <Compass size={20} color="var(--secondary)" />,
      skills: [
        "Techniques for identifying high-impact AI use cases",
        "Business problem mapping to AI solutions",
        "AI suitability analysis for organizational goals",
        "Scoping first-wave versus next-wave AI features"
      ]
    },
    {
      week: "Week 2",
      title: "AI Feasibility Assessment",
      subtitle: "Evaluating Capabilities & Readiness",
      icon: <Layers size={20} color="var(--secondary)" />,
      skills: [
        "Assessing feasibility: Is AI actually the right solution?",
        "Data readiness, sourcing & pipeline checks",
        "Process maturity and workflow integration analysis",
        "Evaluating ROI potential and setting baseline feasibility targets"
      ]
    },
    {
      week: "Week 3",
      title: "AI Value Realization",
      subtitle: "ROI Scoping & Business Value",
      icon: <Briefcase size={20} color="var(--secondary)" />,
      skills: [
        "Analyzing cost of implementation versus long-term business value",
        "Defining key performance indicators (KPIs) for AI projects",
        "Formulating robust, multi-dimensional ROI frameworks",
        "Conducting comprehensive business impact assessments"
      ]
    },
    {
      week: "Week 4",
      title: "AI Adoption & Change Leadership",
      subtitle: "Stakeholder Alignment & Scaling",
      icon: <ShieldCheck size={20} color="var(--secondary)" />,
      skills: [
        "Aligning stakeholders and building cross-functional alignment",
        "Designing enterprise AI transformation strategy & roadmaps",
        "Driving worker/workforce adoption & mitigating resistance",
        "Establishing operational change oversight & training loops"
      ]
    },
    {
      week: "Week 5",
      title: "AI Governance & Risk",
      subtitle: "Responsible AI & Observability",
      icon: <Zap size={20} color="var(--secondary)" />,
      skills: [
        "Implementing Responsible AI guidelines & ethical guardrails",
        "Ensuring regulatory compliance & auditing workflows",
        "Comprehensive risk assessment & mitigation protocols",
        "AI observability: tracking performance, cost & system drift"
      ]
    }
  ];



  const handleApply = (type?: 'student' | 'professional') => {
    setIsModalOpen(true);
    setStep(type ? 2 : 1); // Skip selection screen if pre-selected in hero!
    setUserType(type || null);
    setIsSuccess(false);
    setFormError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      designationOrDegree: '',
      specialization: type === 'student' ? 'AI Engineer' : '', // Pre-select single option for students
      goals: '',
      experience: 'Intermediate (Practical Use)'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Firebase Firestore
      await addDoc(collection(db, 'submissions'), {
        userType: userType === 'student' ? 'Campus / Fresh Graduate' : 'Working Professional',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyOrCollege: formData.company,
        designationOrDegree: formData.designationOrDegree,
        specialization: formData.specialization,
        goals: formData.goals,
        experience: formData.experience,
        createdAt: serverTimestamp()
      });

      // 2. Send email notification via EmailJS
      await emailjs.send(
        'service_hntv8qm',
        'template_nnw0myj',
        {
          userType: userType === 'student' ? 'Campus / Fresh Graduate' : 'Working Professional',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          designationOrDegree: formData.designationOrDegree,
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

  const activeProfRoadmapData = 
    activeProfRoadmap === 'developer' ? professionalDevRoadmap :
    professionalExecRoadmap;

  const activeProfThemeColor = 
    activeProfRoadmap === 'developer' ? 'var(--accent-blue)' :
    'var(--secondary)';

  const activeProfGlowColor = 
    activeProfRoadmap === 'developer' ? 'rgba(59, 130, 246, 0.15)' :
    'rgba(139, 92, 246, 0.15)';

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
            alt="trainVector™ Logo"
            style={{
              height: 'var(--logo-height, 70px)',
              maxHeight: '12vw',
              minHeight: '40px',
              borderRadius: '6px',
            }}
          />
        </div>
        <div className="nav-links">
          <a href="#student-roadmap" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Roadmaps</a>
          <a href="#agentclamp" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>AgentClamp</a>
          <a href="#faq" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>FAQ</a>
          <button onClick={() => handleApply()} className="glow-btn" style={{ fontSize: 'min(0.8rem, 3vw)', padding: '8px 20px' }}>Join Cohort</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '160px 5% 100px', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ color: 'var(--primary)', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            The Architecture of Intelligence
          </span>
          <h1 style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)', marginTop: '20px', lineHeight: 1.25 }}>
            BUILD YOUR <span style={{ color: 'var(--primary)', textShadow: '0 0 20px var(--primary-glow)' }}>AI FUTURE</span> <br />
            <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--text-dim)', fontWeight: 600 }}>ON A SOLID FOUNDATION</span>
          </h1>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.8rem)', color: 'var(--text-bright)', marginTop: '30px', marginBottom: '40px', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>
            Are you a <span style={{ color: '#06b6d4', textShadow: '0 0 15px rgba(6,182,212,0.25)' }}>Student</span> or a <span style={{ color: 'var(--primary)', textShadow: '0 0 15px rgba(249,115,22,0.25)' }}>Working Professional</span>? <br />
            <span style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '3px', display: 'inline-block', marginTop: '10px' }}>Choose your path</span>
          </h2>

          {/* Split Hero Segment Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            textAlign: 'left'
          }}>
            {/* Campus Students Block */}
            <div className="glass-card" style={{
              border: '1px solid rgba(6, 182, 212, 0.25)',
              background: 'rgba(6, 182, 212, 0.02)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 40px rgba(6, 182, 212, 0.05)',
              borderRadius: '16px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', borderRadius: '10px', flexShrink: 0 }}>
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2px' }}>Students & Fresh Graduates</h3>
                    <p style={{ color: '#06b6d4', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Career Launchpad
                    </p>
                  </div>
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  Accelerate your transition into AI development. Learn from core concepts to dynamic model orchestrations with dedicated portfolio builder placement.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="#06b6d4" /> Build real-world AI applications</li>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="#06b6d4" /> Understand modern GenAI & Agentic AI systems</li>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="#06b6d4" /> Gain enterprise AI exposure</li>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="#06b6d4" /> Become industry-ready AI professionals</li>
                </ul>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => handleApply('student')} className="glow-btn" style={{ background: '#06b6d4', boxShadow: 'none', animation: 'none', flex: 1, padding: '10px 16px', fontSize: '0.8rem' }}>
                  Apply as Student
                </button>
                <button onClick={() => document.getElementById('student-roadmap')?.scrollIntoView({ behavior: 'smooth' })} className="glass-card" style={{ padding: '10px 16px', fontSize: '0.8rem', fontWeight: 600, flex: 1, textAlign: 'center' }}>
                  Explore Track
                </button>
              </div>
            </div>

            {/* Working Professionals Block */}
            <div className="glass-card" style={{
              border: '1px solid rgba(249, 115, 22, 0.25)',
              background: 'rgba(249, 115, 22, 0.02)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 40px rgba(249, 115, 22, 0.05)',
              borderRadius: '16px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--primary)', borderRadius: '10px', flexShrink: 0 }}>
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2px' }}>Working Professionals</h3>
                    <p style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Enterprise Scaling
                    </p>
                  </div>
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  Drive ROI and architect complex, safety-guarded enterprise systems. Branch into engineering specialization or executive decision leadership.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--primary)" /> Identify and prioritize high-value AI and GenAI use cases</li>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--primary)" /> Gain practical understanding of modern GenAI, Agentic AI, RAG</li>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--primary)" /> Learn AI governance, observability, ROI, and responsible AI</li>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--primary)" /> Drive AI-led transformation, innovation, and value realization</li>
                </ul>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => handleApply('professional')} className="glow-btn" style={{ flex: 1, padding: '10px 16px', fontSize: '0.8rem' }}>
                  Apply as Professional
                </button>
                <button onClick={() => document.getElementById('professional-roadmap')?.scrollIntoView({ behavior: 'smooth' })} className="glass-card" style={{ padding: '10px 16px', fontSize: '0.8rem', fontWeight: 600, flex: 1, textAlign: 'center' }}>
                  Explore Tracks
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>


      {/* Student Specialization Roadmap */}
      <section id="student-roadmap" style={{ padding: '60px 5%', background: 'rgba(255,255,255,0.01)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>THE trainVector™ <span style={{ color: '#06b6d4' }}>STUDENT ROADMAP</span></h2>
          <p style={{ color: 'var(--text-dim)', margin: '0 auto', fontSize: '0.9rem' }}>Fast-track your technical specialized AI domain knowledge in a high-intensity 5-week cohort.</p>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          {/* Timeline Connector Line (Desktop Only) */}
          <div style={{
            position: 'absolute',
            top: '110px',
            left: '10%',
            right: '10%',
            height: '3px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05), #06b6d4, rgba(255,255,255,0.05))',
            zIndex: 1,
          }} className="timeline-connector-line" />

          {/* Steps Container */}
          <div className="roadmap-timeline-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            position: 'relative',
            zIndex: 2
          }}>
            {studentRoadmap.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                {/* Stepping Indicator Node */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: '2px solid #06b6d4',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#06b6d4',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  marginBottom: '20px',
                  position: 'relative',
                  zIndex: 3,
                  transition: 'all 0.3s ease'
                }} className="roadmap-node">
                  {step.icon}
                </div>

                {/* Card Context */}
                <div className="glass-card" style={{
                  padding: '24px 15px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.02)',
                  width: '100%',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ color: '#06b6d4', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
                    {step.week}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '6px', minHeight: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {step.title}
                  </h4>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: '15px' }}>
                    {step.subtitle}
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    textAlign: 'left',
                    marginTop: 'auto'
                  }}>
                    {step.skills.map((skill, si) => (
                      <div key={si} style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-dim)',
                        display: 'flex',
                        gap: '6px',
                        alignItems: 'flex-start',
                        lineHeight: 1.35
                      }}>
                        <span style={{ color: '#06b6d4', marginTop: '2px' }}>•</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Specialization Roadmap */}
      <section id="professional-roadmap" style={{ padding: '60px 5%', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>THE trainVector™ <span style={{ color: 'var(--primary)' }}>PROFESSIONAL ROADMAP</span></h2>
          <p style={{ color: 'var(--text-dim)', margin: '0 auto', fontSize: '0.9rem' }}>Fast-track your enterprise AI scaling and strategic decision-making in a high-intensity 5-week cohort.</p>
        </div>

        {/* Roadmap Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveProfRoadmap('developer')}
            style={{
              padding: '12px 30px',
              borderRadius: '30px',
              border: `1.5px solid ${activeProfRoadmap === 'developer' ? 'var(--accent-blue)' : 'var(--border)'}`,
              background: activeProfRoadmap === 'developer' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.02)',
              color: activeProfRoadmap === 'developer' ? 'var(--accent-blue)' : 'var(--text-dim)',
              fontSize: '0.95rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: activeProfRoadmap === 'developer' ? '0 0 20px rgba(59, 130, 246, 0.2)' : 'none'
            }}
          >
            <Terminal size={18} /> Developer / Architect (Enterprise Engineering)
          </button>
          <button
            onClick={() => setActiveProfRoadmap('executive')}
            style={{
              padding: '12px 30px',
              borderRadius: '30px',
              border: `1.5px solid ${activeProfRoadmap === 'executive' ? 'var(--secondary)' : 'var(--border)'}`,
              background: activeProfRoadmap === 'executive' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.02)',
              color: activeProfRoadmap === 'executive' ? 'var(--secondary)' : 'var(--text-dim)',
              fontSize: '0.95rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: activeProfRoadmap === 'executive' ? '0 0 20px rgba(139, 92, 246, 0.2)' : 'none'
            }}
          >
            <Briefcase size={18} /> Executives, PMs & Analysts (Enterprise AI Strategy & Adoption)
          </button>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          {/* Timeline Connector Line (Desktop Only) */}
          <div style={{
            position: 'absolute',
            top: '110px',
            left: '10%',
            right: '10%',
            height: '3px',
            background: `linear-gradient(90deg, rgba(255,255,255,0.05), ${activeProfThemeColor}, rgba(255,255,255,0.05))`,
            zIndex: 1,
          }} className="timeline-connector-line" />

          {/* Steps Container */}
          <div className="roadmap-timeline-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            position: 'relative',
            zIndex: 2
          }}>
            {activeProfRoadmapData.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                {/* Stepping Indicator Node */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: `2px solid ${activeProfThemeColor}`,
                  boxShadow: `0 0 20px ${activeProfGlowColor}`,
                  display: 'grid',
                  placeItems: 'center',
                  color: activeProfThemeColor,
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  marginBottom: '20px',
                  position: 'relative',
                  zIndex: 3,
                  transition: 'all 0.3s ease'
                }} className="roadmap-node">
                  {step.icon}
                </div>

                {/* Card Context */}
                <div className="glass-card" style={{
                  padding: '24px 15px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.02)',
                  width: '100%',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ color: activeProfThemeColor, fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
                    {step.week}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '6px', minHeight: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {step.title}
                  </h4>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: '15px' }}>
                    {step.subtitle}
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    textAlign: 'left',
                    marginTop: 'auto'
                  }}>
                    {step.skills.map((skill, si) => (
                      <div key={si} style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-dim)',
                        display: 'flex',
                        gap: '6px',
                        alignItems: 'flex-start',
                        lineHeight: 1.35
                      }}>
                        <span style={{ color: activeProfThemeColor, marginTop: '2px' }}>•</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* The Agentic Sandbox Section */}
      <section id="agentclamp" style={{ padding: '50px 5%', background: 'rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="platform-grid">
            
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '2.2rem', marginBottom: '20px' }}>The trainVector™ <br /><span style={{ color: 'var(--primary)' }}>Agent</span><span style={{ color: '#fff' }}>Clamp</span> <span style={{ color: 'var(--primary)' }}>Platform</span></h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                Don't just learn about AI, deploy it. Every student gets exclusive access to our high-fidelity sandbox designed for testing complex multi-agent systems.
              </p>
              
              <div className="platform-features" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
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
                src={agentclampPreview} 
                alt="AgentClamp Dashboard" 
                style={{ width: '100%', height: '320px', objectFit: 'contain', display: 'block' }} 
              />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(5,6,10,0.8), transparent 40%)',
                pointerEvents: 'none'
              }} />
              
            </motion.div>
          </div>
        </div>
      </section>


      {/* What's Included Section */}
      <section style={{ padding: '80px 5% 40px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: 'var(--primary)', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Comprehensive Program Features
          </span>
          <h2 style={{ fontSize: '2.4rem', marginTop: '15px', marginBottom: '20px' }}>
            WHAT'S <span style={{ color: 'var(--primary)', textShadow: '0 0 20px var(--primary-glow)' }}>INCLUDED</span>
          </h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: '700px', margin: '0 auto 60px', fontSize: '1rem', lineHeight: '1.65' }}>
            Everything you need to master AI development, strategy, and system orchestration. Build a complete portfolio and secure credentials that validate your expertise.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            textAlign: 'left'
          }}>
            {[
              {
                title: "Interactive Live Sessions",
                desc: "Engage in real-time masterclasses with interactive, practical modules, working directly with instructors on advanced system architecture.",
                icon: <MessageSquare size={24} />,
                color: "var(--accent-blue)"
              },
              {
                title: "Weekly Projects & Capstone Build",
                desc: "Build five progressive AI applications (one per week) and a comprehensive, customized capstone project designed to showcase deep system engineering capabilities.",
                icon: <Code size={24} />,
                color: "var(--primary)"
              },
              {
                title: "Targeted Career & Interview Prep",
                desc: "Receive expert career positioning strategy, technical interview prep, and direct portfolio review to confidently present your systems to hiring managers.",
                icon: <Target size={24} />,
                color: "var(--secondary)"
              },
              {
                title: "Lifetime Material Access & Updates",
                desc: "Keep all lecture recordings, reading resources, frameworks, templates, and code repos forever, including free lifetime access to all future cohort updates.",
                icon: <BookOpen size={24} />,
                color: "#ffde00"
              },
              {
                title: "Verifiable AI Credentials",
                desc: "Earn a certified trainVector™ AI Completion Certificate, formatted and optimized for LinkedIn verification to immediately signal your technical expertise to recruiters.",
                icon: <Award size={24} />,
                color: "#06b6d4"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card"
                style={{
                  padding: '35px',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{
                  border: `1px solid ${item.color}55`,
                  background: 'rgba(255,255,255,0.02)',
                  scale: 1.02,
                  boxShadow: `0 10px 30px ${item.color}11`
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: `${item.color}15`,
                  borderRadius: '12px',
                  display: 'grid',
                  placeItems: 'center',
                  color: item.color,
                  boxShadow: `0 0 15px ${item.color}20`
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites & Schedule Section */}
      <section style={{ padding: '20px 5% 80px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'start'
          }} className="prereq-schedule-grid">
            
            {/* Left Column: Prerequisites / Preparedness */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span style={{ color: '#06b6d4', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Program Eligibility & Mindset
              </span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '15px', marginBottom: '25px' }}>
                WHO THIS IS <span style={{ color: '#06b6d4' }}>DESIGNED FOR</span>
              </h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '35px' }}>
                Zero prior coding experience or specialized AI background is required. We teach you from the absolute ground up. To thrive in this cohort, you only need to bring:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {[
                  {
                    title: "Inquisitive Mindset",
                    desc: "A deep desire to demystify how generative intelligence works under the hood. You want to build functional AI systems, not just absorb abstract slides.",
                    icon: <Compass size={20} color="#06b6d4" />
                  },
                  {
                    title: "Obsession to Learn",
                    desc: "An understanding that the AI landscape is moving at breakneck speed. You are here to learn fast, capture opportunities, and lead the charge.",
                    icon: <Target size={20} color="#06b6d4" />
                  },
                  {
                    title: "Resilience through Challenge",
                    desc: "An eagerness to step outside your comfort zone. This curriculum is designed to push you technical-wise, and you will thrive by working through complex problems.",
                    icon: <ShieldCheck size={20} color="#06b6d4" />
                  }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                    <div style={{
                      padding: '10px',
                      background: 'rgba(6, 182, 212, 0.1)',
                      color: '#06b6d4',
                      borderRadius: '8px',
                      display: 'grid',
                      placeItems: 'center',
                      marginTop: '2px'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '5px', color: '#fff' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: '1.5' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Time Commitment & Weekly rhythm */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card"
              style={{
                padding: '40px',
                borderRadius: '20px',
                border: '1px solid rgba(249, 115, 22, 0.25)',
                background: 'rgba(249, 115, 22, 0.01)',
                boxShadow: '0 10px 40px rgba(249, 115, 22, 0.02)'
              }}
            >
              <span style={{ color: 'var(--primary)', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Time Commitment & Rhythm
              </span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '15px', marginBottom: '25px' }}>
                YOUR WEEKLY <span style={{ color: 'var(--primary)', textShadow: '0 0 15px rgba(249,115,22,0.2)' }}>SCHEDULE</span>
              </h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '35px' }}>
                A structured commitment of **10 hours per week**, divided as follows:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {[
                  {
                    title: "Live Interactive Sessions",
                    time: "4 Hours / Week",
                    desc: "Real-time masterclasses, interactive building workshops, guest panels, and group architecture reviews.",
                    icon: <Laptop size={20} color="var(--primary)" />
                  },
                  {
                    title: "Hands-On Project Builds",
                    time: "3 Hours / Week",
                    desc: "Direct practical development inside sandbox files, engineering custom chatbots, vector DBs, and agent states.",
                    icon: <Code size={20} color="var(--primary)" />
                  },
                  {
                    title: "Self-Directed Learning",
                    time: "3 Hours / Week",
                    desc: "Concept preps, supplemental guides, deep-dive readings, and pre-session sandbox testing.",
                    icon: <BookOpen size={20} color="var(--primary)" />
                  }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{
                      padding: '12px',
                      background: 'rgba(249, 115, 22, 0.1)',
                      color: 'var(--primary)',
                      borderRadius: '10px',
                      display: 'grid',
                      placeItems: 'center',
                      marginTop: '2px'
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px', flexWrap: 'wrap', gap: '10px' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{item.title}</h4>
                        <span style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 800 }}>{item.time}</span>
                      </div>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: '1.5' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
          </div>
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
            { q: "Is this program suitable for beginners?", a: "Yes! While intensive, our direct tracks are designed with a rapid ramp-up structure. We provide curated prep materials before the cohort starts to ensure you possess the necessary fundamentals to excel in your specialized role." },
            { q: "How much time do I need to commit per week?", a: "This is a 5-week high-intensity program. We recommend a commitment of 15-20 hours per week. This includes interactive modules, live builder workshops, and hands-on project work." },
            { q: "Which track should I choose?", a: "Choose based on your current role: Builder Track (Developers & Architects), Product Track (Product Managers & BAs), Delivery Track (Program Managers and Scrum Masters), or Strategy Track (Executives & Leaders). Not sure? Apply and we'll guide you." },
            { q: "Do I get a certificate at the end?", a: "Yes! Upon successful completion of your track, you receive a trainVector™ AI Mastery Certificate. You also get access to exclusive alumni community and resources." },
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
            alt="trainVector™ Logo"
            style={{
              height: 'var(--logo-height, 70px)',
              maxHeight: '12vw',
              minHeight: '40px',
              borderRadius: '6px',
            }}
          />
        </div>
        <p style={{ color: 'var(--text-dim)', marginBottom: '10px' }}>&copy; {new Date().getFullYear()} trainVector™ Academy. All Rights Reserved.</p>
        <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '30px', fontSize: '1.1rem' }}>
          Questions? Call us: +91 8310590859
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="https://x.com/TrainVector9" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'color 0.3s ease' }} className="social-link">
            <Twitter size={20} color="var(--text-dim)" />
          </a>
          <a href="https://www.linkedin.com/company/trainvector/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'color 0.3s ease' }} className="social-link">
            <Linkedin size={20} color="var(--text-dim)" />
          </a>
          <a href="https://www.instagram.com/trainvector9/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'color 0.3s ease' }} className="social-link">
            <Instagram size={20} color="var(--text-dim)" />
          </a>
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
                border: `1px solid ${formData.specialization ? 'var(--primary)' : 'var(--border)'}`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.5)`
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
                    <h3 className="font-orbitron" style={{ fontSize: '1.1rem' }}>
                      {step === 1 && "CHOOSE YOUR PATHWAY"}
                      {step === 2 && (userType === 'student' ? "STUDENT ENROLLMENT" : "PROFESSIONAL ENROLLMENT")}
                      {step === 3 && "CHOOSE SPECIALIZATION"}
                      {step === 4 && "COHORT CONTEXT"}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
                      STEP {userType ? step - 1 : step}/{userType ? 3 : 4}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '10px' }}>
                          Are you currently a student or a working professional?
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                          <div
                            onClick={() => {
                              setUserType('student');
                              setFormData({ ...formData, specialization: 'AI Engineer' });
                              setStep(2);
                            }}
                            className="glass-card"
                            style={{
                              textAlign: 'center',
                              cursor: 'pointer',
                              border: '1px solid rgba(6, 182, 212, 0.25)',
                              background: 'rgba(6, 182, 212, 0.02)',
                              padding: '25px 15px'
                            }}
                          >
                            <GraduationCap size={32} color="#06b6d4" style={{ marginBottom: '10px' }} />
                            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Campus Student</div>
                          </div>

                          <div
                            onClick={() => {
                              setUserType('professional');
                              setFormData({ ...formData, specialization: '' });
                              setStep(2);
                            }}
                            className="glass-card"
                            style={{
                              textAlign: 'center',
                              cursor: 'pointer',
                              border: '1px solid rgba(249, 115, 22, 0.25)',
                              background: 'rgba(249, 115, 22, 0.02)',
                              padding: '25px 15px'
                            }}
                          >
                            <Briefcase size={32} color="var(--primary)" style={{ marginBottom: '10px' }} />
                            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Working Professional</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="input-field">
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Full Name <span style={{ color: 'var(--primary)' }}>*</span></label>
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
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Phone Number <span style={{ color: 'var(--primary)' }}>*</span></label>
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

                        {userType === 'student' ? (
                          <>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>College / University <span style={{ color: 'var(--primary)' }}>*</span></label>
                              <input
                                required
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="e.g. Bangalore University"
                              />
                            </div>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Degree & Branch <span style={{ color: 'var(--primary)' }}>*</span></label>
                              <input
                                required
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.designationOrDegree}
                                onChange={(e) => setFormData({ ...formData, designationOrDegree: e.target.value })}
                                placeholder="e.g. B.E. Computer Science"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Company Name <span style={{ color: 'var(--primary)' }}>*</span></label>
                              <input
                                required
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="e.g. Tech Solutions"
                              />
                            </div>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Current Designation <span style={{ color: 'var(--primary)' }}>*</span></label>
                              <input
                                required
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.designationOrDegree}
                                onChange={(e) => setFormData({ ...formData, designationOrDegree: e.target.value })}
                                placeholder="e.g. Software Engineer"
                              />
                            </div>
                          </>
                        )}

                        {formError && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>
                            {formError}
                          </motion.div>
                        )}

                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                          <button onClick={() => { setUserType(null); setStep(1); }} type="button" className="glass-card" style={{ padding: '12px 20px', flex: 1 }}><ChevronLeft size={18} /> Back</button>
                          <button 
                            type="button" 
                            onClick={() => {
                              if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.designationOrDegree) {
                                setFormError('All fields with * are mandatory');
                              } else {
                                setStep(3);
                              }
                            }} 
                            className="glow-btn" 
                            style={{ flex: 2 }}
                          >
                            Next Step
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                          Select your specialized mastery track:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {userType === 'student' ? (
                            studentRoles.map((r, i) => (
                              <div
                                key={i}
                                onClick={() => setFormData({ ...formData, specialization: r.title })}
                                style={{
                                  padding: '16px 20px',
                                  borderRadius: '12px',
                                  border: `1.5px solid var(--primary)`,
                                  background: `rgba(6, 182, 212, 0.05)`,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '15px'
                                }}
                              >
                                <div style={{ color: 'var(--primary)' }}>{r.icon}</div>
                                <div style={{ textAlign: 'left' }}>
                                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{r.title}</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>Student Career Track</div>
                                </div>
                              </div>
                            ))
                          ) : (
                            professionalRoles.map((r, i) => (
                              <div
                                key={i}
                                onClick={() => setFormData({ ...formData, specialization: r.title })}
                                style={{
                                  padding: '16px 20px',
                                  borderRadius: '12px',
                                  border: `1.5px solid ${formData.specialization === r.title ? r.color : 'var(--border)'}`,
                                  background: formData.specialization === r.title ? `${r.color}11` : 'rgba(255,255,255,0.02)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '15px',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <div style={{ color: r.color }}>{r.icon}</div>
                                <div style={{ textAlign: 'left' }}>
                                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{r.title}</div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                          <button onClick={() => setStep(2)} type="button" className="glass-card" style={{ padding: '12px 20px', flex: 1 }}><ChevronLeft size={18} /> Back</button>
                          <button onClick={() => setStep(4)} disabled={!formData.specialization} type="button" className="glow-btn" style={{ flex: 2 }}>Next Step</button>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="input-field">
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Primary Goal for this Cohort</label>
                          <textarea
                            required
                            className="glass-card"
                            rows={3}
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', resize: 'none' }}
                            value={formData.goals}
                            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                            placeholder="e.g. Launching my career as an AI dev..."
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
                          <button onClick={() => setStep(3)} type="button" className="glass-card" style={{ padding: '12px 20px', flex: 1 }}><ChevronLeft size={18} /> Back</button>
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
