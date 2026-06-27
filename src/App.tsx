import React, { useState } from 'react';
import ChatWidget from './components/ChatWidget';
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
  Instagram,
  Github,
  Mail,
  Phone,
  MapPin,
  Youtube
} from 'lucide-react';

import logo from './assets/logo_new.png';
import agentclampPreview from './assets/agentclamp_preview.png';
import phaniProfile from './assets/phani_profile.png';


const App = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [userType, setUserType] = useState<'student' | 'professional' | 'consulting' | null>(null);
  const [activeProfRoadmap, setActiveProfRoadmap] = useState<'developer' | 'executive'>('developer');
  const [heroTab, setHeroTab] = useState<'academy' | 'consulting'>('academy');

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



  const handleApply = (type?: 'student' | 'professional' | 'consulting') => {
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    let resolvedUserType = 'Working Professional';
    if (userType === 'student') {
      resolvedUserType = 'Campus / Fresh Graduate';
    } else if (userType === 'consulting') {
      resolvedUserType = 'Enterprise Consulting';
    }

    try {
      // 1. Save to Firebase Firestore
      await addDoc(collection(db, 'submissions'), {
        userType: resolvedUserType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyOrCollege: formData.company,
        designationOrDegree: formData.designationOrDegree,
        specialization: formData.specialization || (userType === 'consulting' ? 'AI Consulting' : ''),
        goals: formData.goals || (userType === 'consulting' ? 'Consulting Request' : ''),
        experience: formData.experience || '',
        createdAt: serverTimestamp()
      });

      // 2. Send email notification via EmailJS
      await emailjs.send(
        'service_hntv8qm',
        'template_nnw0myj',
        {
          userType: resolvedUserType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          designationOrDegree: formData.designationOrDegree,
          specialization: formData.specialization || (userType === 'consulting' ? 'AI Consulting' : ''),
          goals: formData.goals || (userType === 'consulting' ? 'Consulting Request' : ''),
          experience: formData.experience || '',
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
            draggable={false}
            style={{
              height: 'var(--logo-height, 70px)',
              maxHeight: '12vw',
              minHeight: '40px',
              borderRadius: '6px',
              userSelect: 'none',
              WebkitUserDrag: 'none'
            } as any}
          />
        </div>
        <div className="nav-links">
          <a href="#why-trainvector" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Why trainVector</a>
          <a href="#student-roadmap" onClick={() => setHeroTab('academy')} className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Academy Roadmaps</a>
          <a href="#agentclamp" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>AgentClamp</a>
          <a href="#consulting" onClick={() => setHeroTab('consulting')} className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Consulting & Advisory</a>
          <a href="#team" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Team</a>
          <a href="#faq" className="nav-link-text" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>FAQ</a>
          <button onClick={() => handleApply()} className="glow-btn" style={{ fontSize: 'min(0.8rem, 3vw)', padding: '8px 20px' }}>Join Cohort</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '160px 5% 30px', textAlign: 'center', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ color: 'var(--primary)', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            GenAI Academy & Enterprise Consulting
          </span>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', marginTop: '20px', lineHeight: 1.25, marginBottom: '35px', fontWeight: 800 }}>
            FROM <span style={{ color: 'var(--primary)', textShadow: '0 0 20px var(--primary-glow)' }}>AI SKILLS</span> TO <span style={{ color: 'var(--text-dim)' }}>ENTERPRISE IMPACT</span>
          </h1>

          {/* Premium Segmented Tab Switcher */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border)',
            padding: '6px',
            borderRadius: '30px',
            marginBottom: '45px',
            position: 'relative',
            zIndex: 5,
            gap: '4px'
          }}>
            <button
              onClick={() => setHeroTab('academy')}
              style={{
                padding: '12px 32px',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 800,
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '1px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: heroTab === 'academy' ? 'linear-gradient(135deg, var(--primary), #ff9a44)' : 'transparent',
                color: heroTab === 'academy' ? '#000' : 'var(--text-dim)',
                boxShadow: heroTab === 'academy' ? '0 4px 15px rgba(249,115,22,0.3)' : 'none',
              }}
            >
              GenAI Academy
            </button>
            <button
              onClick={() => setHeroTab('consulting')}
              style={{
                padding: '12px 32px',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 800,
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '1px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: heroTab === 'consulting' ? 'linear-gradient(135deg, var(--secondary), #a78bfa)' : 'transparent',
                color: heroTab === 'consulting' ? '#fff' : 'var(--text-dim)',
                boxShadow: heroTab === 'consulting' ? '0 4px 15px rgba(139,92,246,0.3)' : 'none',
              }}
            >
              Consulting & Advisory
            </button>
          </div>

          <AnimatePresence mode="wait">
            {heroTab === 'academy' ? (
              <motion.div
                key="academy-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.8rem)', color: 'var(--text-bright)', marginBottom: '40px', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>
                  Are you a <span style={{ color: '#06b6d4', textShadow: '0 0 15px rgba(6,182,212,0.25)' }}>Student</span> or a <span style={{ color: 'var(--primary)', textShadow: '0 0 15px rgba(249,115,22,0.25)' }}>Working Professional</span>? <br />
                  <span style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '3px', display: 'inline-block', marginTop: '10px' }}>Choose your path</span>
                </h2>

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
                        <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="#06b6d4" /> Master the Foundations of AI</li>
                        <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="#06b6d4" /> Understand modern GenAI & Agentic AI systems</li>
                        <li style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="#06b6d4" /> Build Real-World AI Solutions</li>
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
                        Explore Track
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="consulting-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass-card" style={{
                  maxWidth: '1100px',
                  margin: '0 auto',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  background: 'rgba(139, 92, 246, 0.02)',
                  padding: '45px 35px',
                  boxShadow: '0 20px 60px rgba(139, 92, 246, 0.08)',
                  borderRadius: '20px',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'inline-flex', padding: '14px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)', borderRadius: '12px', flexShrink: 0 }}>
                      <Globe size={32} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.65rem', fontWeight: 900, marginBottom: '4px', fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.5px' }}>ENTERPRISE GENAI ADVISORY</h3>
                      <p style={{ color: 'var(--secondary)', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
                        From Scoping to Production-Ready Cognitive Systems
                      </p>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '35px' }}>
                    Empower your organization with tailored enterprise cognitive systems, advanced Retrieval-Augmented Generation (RAG) pipelines, and autonomous agent orchestration. We implement robust, compliant, and cost-controlled solutions with built-in PII protection and observability frameworks.
                  </p>
                  
                  {/* Outcomes / Pillars Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '30px',
                    marginBottom: '35px'
                  }}>
                    <div className="glass-card" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <CheckCircle2 size={18} color="var(--secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>🎯 ROI & Feasibility</h4>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                        Stop guessing. We identify high-impact AI use cases and assess data readiness before you write a single line of code.
                      </p>
                    </div>

                    <div className="glass-card" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <CheckCircle2 size={18} color="var(--secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>⚙️ Bespoke Agentic Systems</h4>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                        From stateful multi-agent workflow pipelines to advanced context-grounded RAG engines built for your private data.
                      </p>
                    </div>

                    <div className="glass-card" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <CheckCircle2 size={18} color="var(--secondary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>🛡️ Enterprise Guardrails</h4>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                        Production-ready safety shields with real-time PII masking, prompt-injection defense, and token cost evaluations.
                      </p>
                    </div>
                  </div>

                  {/* Technology Badges */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '40px',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginRight: '10px' }}>Capabilities:</span>
                    {['LangGraph', 'CrewAI', 'LiteLLM Client', 'MCP Protocol', 'Vector Search & RAG', 'PII & Security Guardrails'].map((tech) => (
                      <span key={tech} style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: 'rgba(139, 92, 246, 0.05)',
                        border: '1px solid rgba(139, 92, 246, 0.15)',
                        color: 'var(--secondary)',
                        letterSpacing: '0.5px'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Engagement Process Timeline */}
                  <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '35px',
                    marginBottom: '40px'
                  }}>
                    <h4 style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: 'var(--secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      marginBottom: '25px',
                      fontFamily: 'Orbitron, sans-serif'
                    }}>
                      Our Advisory & Delivery Process
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '30px',
                      position: 'relative'
                    }}>
                      {[
                        {
                          step: "01",
                          title: "Audit & Scope",
                          desc: "Determine feasibility, analyze your data infrastructure, and map out AI use cases with calculated ROI projections."
                        },
                        {
                          step: "02",
                          title: "Sandbox Prototyping",
                          desc: "Build functional proof-of-concepts inside our AgentClamp sandbox to test agent logic, tools, and RAG retrieval accuracy."
                        },
                        {
                          step: "03",
                          title: "Production Scaling",
                          desc: "Deploy self-hosted, telemetry-monitored agent systems complete with strict safety guardrails and prompt security."
                        }
                      ].map((phase, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          gap: '15px',
                          alignItems: 'flex-start',
                          position: 'relative'
                        }}>
                          <div style={{
                            fontSize: '1.8rem',
                            fontWeight: 900,
                            color: 'rgba(139, 92, 246, 0.15)',
                            fontFamily: 'Orbitron, sans-serif',
                            lineHeight: 1,
                            flexShrink: 0
                          }}>
                            {phase.step}
                          </div>
                          <div>
                            <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{phase.title}</h5>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.45 }}>{phase.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <button onClick={() => handleApply('consulting')} className="glow-btn" style={{ background: 'var(--secondary)', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(139,92,246,0.3)' }}>
                      Request AI Consultation
                    </button>
                    <button onClick={() => document.getElementById('consulting')?.scrollIntoView({ behavior: 'smooth' })} className="glass-card" style={{ padding: '12px 28px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                      Explore Advisory Pillars
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Why trainVector Section */}
      <section id="why-trainvector" style={{ padding: '30px 5% 60px', background: 'rgba(255,255,255,0.01)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle decorative background glows */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        
        <div style={{ textAlign: 'center', marginBottom: '50px', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '15px', fontFamily: 'Orbitron, sans-serif' }}>
            WHY <span style={{ color: 'var(--primary)' }}>TRAINVECTOR</span>?
          </h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
            A dual-engine learning and advisory ecosystem designed to build high-performance AI professionals and production-ready cognitive systems.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          {[
            {
              title: "GenAI Academy",
              subtitle: "Structured Learning. Practical Experience. Enterprise Impact.",
              description: "Transition from basic prompting to deploying complex, production-ready cognitive architectures. Our curriculum focuses on hands-on software engineering practices for AI models.",
              icon: <GraduationCap size={28} />,
              color: "var(--primary)",
              bgGlow: "rgba(249, 115, 22, 0.1)",
              borderColor: "rgba(249, 115, 22, 0.25)",
              hoverBorder: "var(--primary)",
              badge: "ENGINEERING ACADEMY"
            },
            {
              title: "Advisory & Consulting",
              subtitle: "Bespoke Systems. Safety Guardrails. Measured ROI.",
              description: "Partnering with organizations to scope high-value use cases, assess data readiness, and deploy secure agent networks with compliance, safety, and strict cost controls.",
              icon: <Briefcase size={28} />,
              color: "var(--secondary)",
              bgGlow: "rgba(139, 92, 246, 0.1)",
              borderColor: "rgba(139, 92, 246, 0.25)",
              hoverBorder: "var(--secondary)",
              badge: "ENTERPRISE SOLUTIONS"
            },
            {
              title: "AgentClamp™ Sandbox",
              subtitle: "High-Fidelity Sandbox & Observability",
              description: "The core engine that powers both: allowing students to learn by building, and enterprises to prototype safely with full telemetry, real-time logging, and system observability.",
              icon: <Terminal size={28} />,
              color: "var(--accent-blue)",
              bgGlow: "rgba(59, 130, 246, 0.1)",
              borderColor: "rgba(59, 130, 246, 0.25)",
              hoverBorder: "var(--accent-blue)",
              badge: "PROTOTYPING ENGINE"
            }
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -6, 
                borderColor: pillar.hoverBorder,
                boxShadow: `0 12px 30px rgba(0, 0, 0, 0.3), 0 0 15px ${pillar.borderColor}`
              }}
              style={{
                background: 'var(--glass)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '30px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                {/* Badge header */}
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  color: pillar.color,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '15px'
                }}>
                  {pillar.badge}
                </div>

                {/* Icon & Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '54px',
                    height: '54px',
                    borderRadius: '12px',
                    background: pillar.bgGlow,
                    color: pillar.color,
                    border: `1px solid ${pillar.borderColor}`,
                    boxShadow: `0 0 15px ${pillar.bgGlow}`,
                    flexShrink: 0
                  }}>
                    {pillar.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    margin: 0,
                    color: '#fff',
                    fontFamily: 'Orbitron, sans-serif'
                  }}>
                    {pillar.title}
                  </h3>
                </div>

                {/* Subtitle */}
                <p style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: pillar.color,
                  lineHeight: 1.4,
                  marginBottom: '12px'
                }}>
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-dim)',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Student Specialization Roadmap */}
      <section id="student-roadmap" style={{ padding: '20px 5% 60px', background: 'rgba(255,255,255,0.01)', position: 'relative', overflow: 'hidden' }}>
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
                        fontSize: '0.85rem',
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
                        fontSize: '0.85rem',
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
      <section id="agentclamp" style={{ padding: '50px 5% 20px', background: 'rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
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
              onClick={() => setIsVideoModalOpen(true)}
              style={{ 
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1.5px solid #f97316',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={agentclampPreview} 
                alt="AgentClamp Dashboard" 
                draggable={false}
                style={{ width: '100%', height: '320px', objectFit: 'contain', display: 'block', userSelect: 'none', WebkitUserDrag: 'none' } as any} 
              />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(5,6,10,0.8), transparent 40%)',
                pointerEvents: 'none'
              }} />
              
              {/* Play Button Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(5, 6, 10, 0.15)',
                transition: 'all 0.3s ease',
              }}>
                <motion.div 
                  whileHover={{ scale: 1.15, backgroundColor: 'rgba(249, 115, 22, 1)' }}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.85)',
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: '0 0 25px rgba(249, 115, 22, 0.5)',
                    color: '#000',
                    cursor: 'pointer'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" style={{ transform: 'translateX(2px)' }}>
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* What's Included Section */}
      <section style={{ padding: '20px 5% 40px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border)' }}>
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
      <section style={{ padding: '20px 5% 30px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
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
                No prior coding experience or specialized AI background is required. We teach you from the absolute ground up. To thrive in this cohort, you only need to bring:
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
                    desc: "Concept preperations, supplemental guides, deep-dive readings, and working with Agent Clamp",
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

      {/* Consulting Section */}
      <section id="consulting" style={{ padding: '20px 5% 20px', background: 'rgba(255,255,255,0.01)', borderBottom: 'none' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: 'var(--primary)', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Enterprise Solutions
          </span>
          <h2 style={{ fontSize: '2.4rem', marginTop: '15px', marginBottom: '20px' }}>
            AI ARCHITECTURE & <span style={{ color: 'var(--primary)', textShadow: '0 0 20px var(--primary-glow)' }}>CONSULTING</span>
          </h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.7' }}>
            We help enterprises build, secure, and scale production-ready cognitive systems, from initial feasibility mapping to custom multi-agent orchestration and compliance-ready deployment.
          </p>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {/* Pillar 1 */}
            <div className="glass-card" style={{ padding: '35px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--primary)', borderRadius: '10px', marginBottom: '20px' }}>
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
                AI Strategy & Use Case Mapping
              </h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Analyze business processes, evaluate model options (open-source vs. proprietary), measure ROI expectations, and draft executable implementation roadmaps tailored to your operations.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--primary)" /> Sourcing & Data Readiness Audits</li>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--primary)" /> Model Suitability Assessments</li>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--primary)" /> ROI & Cost Scoping Frameworks</li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="glass-card" style={{ padding: '35px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', borderRadius: '10px', marginBottom: '20px' }}>
                <Code size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
                Bespoke Cognitive Systems
              </h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Architect and build production-grade agentic platforms, state-driven multi-agent workflows, and advanced context retrieval (RAG) engines grounded in your private enterprise knowledge.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-blue)" /> Stateful Multi-Agent Pipelines</li>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-blue)" /> Advanced Chunking & Embedding</li>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--accent-blue)" /> Custom Tooling & Model Integration</li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="glass-card" style={{ padding: '35px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)', borderRadius: '10px', marginBottom: '20px' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
                Safety, Governance & Scale
              </h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Hardening AI completions with strict policy filters, token cost tracing, and secure proxy integrations—including prompt injection protection and PII masking.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" /> PII Detection & Anonymization</li>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" /> Prompt Injection Protection Shields</li>
                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} color="var(--secondary)" /> Cost, Latency & Quality Monitoring</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button 
              type="button"
              onClick={() => {
                handleApply('consulting');
              }} 
              className="glow-btn"
            >
              Request AI Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="about-section" style={{ padding: '20px 5% 20px', borderBottom: 'none' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--primary)', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            The Architects of Intelligence
          </span>
          <h2 style={{ fontSize: '2.4rem', marginTop: '15px', marginBottom: '20px' }}>
            OUR CORE <span style={{ color: 'var(--primary)', textShadow: '0 0 20px var(--primary-glow)' }}>TEAM</span>
          </h2>
        </div>

        <div className="tab-content-container">
          {/* Mission Statement */}
          <div className="glass-card" style={{ 
            maxWidth: '800px', 
            margin: '0 auto 50px', 
            padding: '30px 40px', 
            textAlign: 'center', 
            border: '1px solid rgba(249, 115, 22, 0.25)', 
            background: 'rgba(249, 115, 22, 0.01)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(249, 115, 22, 0.02)'
          }}>
            <h3 className="font-orbitron" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px' }}>
              Our Mission
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.98rem', lineHeight: '1.7', margin: 0 }}>
              To empower individuals and organizations with the knowledge, skills and strategic guidance needed to harness AI, drive innovation and accelerate digital transformation. Through world-class training, consulting, and hands-on implementation, we help turn emerging technologies into measurable business outcomes.
            </p>
          </div>

          <div className="team-grid">
            {/* Phani Kumar */}
            <div className="team-card team-orange">
              <div className="avatar-container">
                <div className="avatar-glow"></div>
                <img 
                  src={phaniProfile} 
                  alt="Phani Prasad Thimmapuram" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    zIndex: 2, 
                    position: 'relative',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }} 
                />
              </div>
              <h3 className="team-card-name">Phani Prasad Thimmapuram</h3>
              <div className="team-card-role" style={{ color: 'var(--primary)' }}>Founder and CTO</div>
              <div style={{
                fontSize: '0.72rem',
                color: '#e2e8f0',
                fontWeight: 700,
                marginTop: '2px',
                marginBottom: '6px',
                letterSpacing: '0.3px',
                opacity: 0.9
              }}>
                Pursuing PhD in Gen AI and Agentic AI in SCM Eco system
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--accent-blue)',
                fontWeight: 800,
                marginTop: '4px',
                marginBottom: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                letterSpacing: '0.5px'
              }}>
                <BookOpen size={12} style={{ flexShrink: 0 }} />
                <span>Author: "Agentic AI Handbook" & "Kubernetes"</span>
              </div>
              <p className="team-card-bio" style={{ marginBottom: '0px' }}>
                Transformation leader with 30 years of IT experience directing GenAI architecture, cloud migration, and systems engineering for global financial institutions. Specialized in translating business strategy into high-performing engineering cultures and scaling AI-ready platforms.
              </p>
               
              {/* Professional Certifications */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                justifyContent: 'center',
                margin: '15px 0 8px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}>
                {[
                  {
                    name: "TOGAF 10",
                    icon: (
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '5px', flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )
                  },
                  {
                    name: "AWS CCP",
                    icon: (
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px', flexShrink: 0 }}>
                        <path d="M6 14c2.5 3 9.5 3 12 0" />
                        <path d="M17 13l2.5 3L21 12" />
                      </svg>
                    )
                  },
                  {
                    name: "MS AI Leader",
                    icon: (
                      <svg viewBox="0 0 23 23" width="9" height="9" style={{ marginRight: '5px', flexShrink: 0 }}>
                        <rect x="0" y="0" width="10" height="10" fill="#f25022"/>
                        <rect x="12" y="0" width="10" height="10" fill="#7fba00"/>
                        <rect x="0" y="12" width="10" height="10" fill="#00a4ef"/>
                        <rect x="12" y="12" width="10" height="10" fill="#ffb900"/>
                      </svg>
                    )
                  },
                  {
                    name: "Agile SPC 6.0",
                    icon: (
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style={{ marginRight: '5px', flexShrink: 0 }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    )
                  },
                  {
                    name: "Databricks",
                    icon: (
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px', flexShrink: 0 }}>
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    )
                  }
                ].map((cert) => (
                  <span key={cert.name} style={{
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(249, 115, 22, 0.05)',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                    color: 'var(--primary)',
                    letterSpacing: '0.5px',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}>
                    {cert.icon}
                    {cert.name}
                  </span>
                ))}
              </div>
              
              <div style={{ 
                width: '100%', 
                marginTop: '8px', 
                marginBottom: '18px', 
                borderTop: '1px solid rgba(255,255,255,0.08)', 
                paddingTop: '12px',
                textAlign: 'center'
              }}>
                <span style={{ 
                  display: 'block', 
                  fontSize: '0.68rem', 
                  color: 'var(--text-dim)', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase', 
                  marginBottom: '15px', 
                  fontWeight: 700 
                }}>
                  Prior Enterprise Leadership
                </span>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '15px 24px', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  opacity: 0.6,
                  color: 'var(--text-bright)',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.95'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                >
                  {/* Bank of America */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Bank of America">
                    <svg viewBox="0 0 100 100" width="18" height="18" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M10 25 L45 10 L45 35 L10 50 Z M55 10 L90 25 L90 50 L55 35 Z M10 60 L45 45 L45 70 L10 85 Z M55 45 L90 60 L90 85 L55 70 Z" />
                    </svg>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.3px' }}>Bank of America</span>
                  </div>

                  <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 900 }}>•</span>

                  {/* J.P. Morgan */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="J.P. Morgan">
                    <svg viewBox="0 0 100 100" width="18" height="18" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M50 18 L82 50 L65 50 L50 35 Z M82 50 L50 82 L50 65 L65 50 Z M50 82 L18 50 L35 50 L50 65 Z M18 50 L50 18 L50 35 L35 50 Z" />
                    </svg>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1px', fontFamily: 'Georgia, serif' }}>J.P. Morgan</span>
                  </div>

                  <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 900 }}>•</span>

                  {/* DBS */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="DBS">
                    <svg viewBox="0 0 100 100" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}>
                      <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
                    </svg>
                    <span style={{ fontSize: '0.82rem', fontWeight: 900, letterSpacing: '0.5px' }}>DBS</span>
                  </div>

                  <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 900 }}>•</span>

                  {/* Société Générale */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Société Générale">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '16px', height: '16px', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ background: 'currentColor', height: '6px', width: '16px' }}></div>
                      <div style={{ background: 'currentColor', height: '6px', width: '16px' }}></div>
                    </div>
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.3px', textTransform: 'uppercase' }}>Société Générale</span>
                  </div>

                  <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 900 }}>•</span>

                  {/* Virtusa */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Virtusa">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 10l4 4 4-4" />
                    </svg>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '1px' }}>virtusa</span>
                  </div>

                  <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 900 }}>•</span>

                  {/* IBM */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="IBM">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flexShrink: 0 }}>
                      {[...Array(6)].map((_, i) => (
                        <div key={i} style={{ height: '2px', width: '18px', background: 'currentColor' }}></div>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 900, letterSpacing: '1.5px', fontFamily: 'monospace' }}>IBM</span>
                  </div>
                </div>
              </div>


              <div className="team-socials">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="team-social-link">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="team-social-link">
                  <Github size={18} />
                </a>
                <a href="mailto:phani@example.com" className="team-social-link">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* K. Sreedhar */}
            <div className="team-card team-blue">
              <div className="avatar-container">
                <div className="avatar-glow"></div>
                <div className="avatar-image-placeholder">
                  <Briefcase size={36} color="var(--accent-blue)" />
                </div>
              </div>
              <h3 className="team-card-name">K. Sreedhar</h3>
              <div className="team-card-role" style={{ color: 'var(--accent-blue)' }}>Chief Operating Officer</div>
              <p className="team-card-bio">
                Seasoned operations leader with deep expertise in scaling enterprise programs, driving cross-functional alignment, and operationalizing AI-led transformation initiatives across complex, multi-stakeholder environments.
              </p>

              <div style={{
                width: '100%',
                marginTop: '0px',
                marginBottom: '25px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '18px',
                textAlign: 'center'
              }}>
                <span style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  color: 'var(--text-dim)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '15px',
                  fontWeight: 700
                }}>
                  Prior Enterprise Leadership
                </span>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '15px 24px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0.6,
                  color: 'var(--text-bright)',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.95'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
                >
                  {/* Fidelity Information Systems */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Fidelity Information Systems">
                    <svg viewBox="0 0 100 100" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}>
                      <rect x="10" y="10" width="35" height="35" rx="4" />
                      <rect x="55" y="10" width="35" height="35" rx="4" />
                      <rect x="10" y="55" width="35" height="35" rx="4" />
                      <rect x="55" y="55" width="35" height="35" rx="4" />
                    </svg>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.3px' }}>FIS</span>
                  </div>

                  <span style={{ color: 'var(--accent-blue)', fontSize: '0.8rem', fontWeight: 900 }}>•</span>

                  {/* GE */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="General Electric">
                    <svg viewBox="0 0 100 100" width="18" height="18" fill="currentColor" style={{ flexShrink: 0 }}>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" />
                      <path d="M28 50 Q50 22 72 50" fill="none" stroke="currentColor" strokeWidth="8" />
                      <path d="M28 50 Q50 78 72 50" fill="none" stroke="currentColor" strokeWidth="8" />
                    </svg>
                    <span style={{ fontSize: '0.82rem', fontWeight: 900, letterSpacing: '1px' }}>GE</span>
                  </div>

                  <span style={{ color: 'var(--accent-blue)', fontSize: '0.8rem', fontWeight: 900 }}>•</span>

                  {/* Ramco Systems */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Ramco Systems">
                    <svg viewBox="0 0 100 100" width="16" height="16" fill="currentColor" style={{ flexShrink: 0 }}>
                      <polygon points="50,10 90,35 90,65 50,90 10,65 10,35" fill="none" stroke="currentColor" strokeWidth="8" />
                      <circle cx="50" cy="50" r="12" />
                    </svg>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.3px' }}>Ramco</span>
                  </div>
                </div>
              </div>

              <div className="team-socials">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="team-social-link">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="team-social-link">
                  <Github size={18} />
                </a>
                <a href="mailto:sreedhar@trainvector.ai" className="team-social-link">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '20px 5% 20px' }}>
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
      <footer className="footer" style={{ padding: '20px 5% 40px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', marginBottom: '30px' }}>
          <img
            src={logo}
            alt="trainVector™ Logo"
            draggable={false}
            style={{
              height: 'var(--logo-height, 70px)',
              maxHeight: '12vw',
              minHeight: '40px',
              borderRadius: '6px',
              userSelect: 'none',
              WebkitUserDrag: 'none'
            } as any}
          />
        </div>
        <p style={{ color: 'var(--text-dim)', marginBottom: '10px' }}>&copy; {new Date().getFullYear()} trainVector™. All Rights Reserved.</p>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '12px', 
          margin: '25px auto 35px',
          maxWidth: '500px'
        }}>
          {/* Phone block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '1.05rem' }}>
            <Phone size={18} style={{ flexShrink: 0 }} />
            <span>Questions? Call us: </span>
            <a href="tel:+918310590859" style={{ color: 'var(--primary)', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
              +91 83105 90859
            </a>
          </div>

          {/* Address block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            <MapPin size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span>50, Bethel Nagar, KR Puram, Bangalore - 560036</span>
          </div>
        </div>

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
          <a href="https://www.youtube.com/@trainVector" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'color 0.3s ease' }} className="social-link">
            <Youtube size={20} color="var(--text-dim)" />
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
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                padding: '30px 25px',
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
                  <h2 className="font-orbitron">
                    {userType === 'consulting' ? "CONSULTATION REQUEST RECEIVED" : "APPLICATION RECEIVED"}
                  </h2>
                  <p style={{ color: 'var(--text-dim)', marginTop: '20px' }}>
                    {userType === 'consulting' ? (
                      <>
                        Thank you for reaching out, <strong>{formData.name}</strong>. Our enterprise consulting team will review your inquiry for <strong>{formData.company}</strong> and contact you within 24 hours.
                      </>
                    ) : (
                      <>
                        Welcome to the trainVector Academy, <strong>{formData.name}</strong>. Our admissions team will review your profile for the <strong>{formData.specialization}</strong> track and reach out within 48 hours.
                      </>
                    )}
                  </p>
                  <button onClick={() => setIsModalOpen(false)} className="glow-btn" style={{ marginTop: '40px' }}>Close Terminal</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {userType !== 'consulting' && (
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
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h3 className="font-orbitron" style={{ fontSize: '1.1rem' }}>
                      {step === 1 && "CHOOSE YOUR PATHWAY"}
                      {step === 2 && (userType === 'consulting' ? "REQUEST AI CONSULTATION" : userType === 'student' ? "STUDENT ENROLLMENT" : "PROFESSIONAL ENROLLMENT")}
                      {step === 3 && "CHOOSE SPECIALIZATION"}
                      {step === 4 && "COHORT CONTEXT"}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>
                      {userType === 'consulting' ? "STEP 1/1" : `STEP ${userType ? step - 1 : step}/${userType ? 3 : 4}`}
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

                        {userType === 'student' && (
                          <>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>College / University</label>
                              <input
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="e.g. Bangalore University"
                              />
                            </div>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Degree & Branch</label>
                              <input
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.designationOrDegree}
                                onChange={(e) => setFormData({ ...formData, designationOrDegree: e.target.value })}
                                placeholder="e.g. B.E. Computer Science"
                              />
                            </div>
                          </>
                        )}

                        {userType === 'professional' && (
                          <>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Company Name</label>
                              <input
                                type="text"
                                className="glass-card"
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="e.g. Tech Solutions"
                              />
                            </div>
                            <div className="input-field">
                              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Current Designation</label>
                              <input
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

                        {userType === 'consulting' && (
                          <div className="input-field">
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>
                              Company Name <span style={{ color: 'var(--primary)' }}>*</span>
                            </label>
                            <input
                              required
                              type="text"
                              className="glass-card"
                              style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
                              value={formData.company}
                              onChange={(e) => {
                                setFormData({ ...formData, company: e.target.value });
                                setFormError('');
                              }}
                              placeholder="e.g. Enterprise Corp"
                            />
                          </div>
                        )}

                        {formError && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>
                            {formError}
                          </motion.div>
                        )}

                        {userType === 'consulting' ? (
                          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                            <button 
                              type="button" 
                              disabled={isSubmitting}
                              onClick={() => {
                                if (!formData.name || !formData.email || !formData.phone || !formData.company) {
                                  setFormError('All fields with * are mandatory');
                                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                                  setFormError('Please enter a valid email address');
                                } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(formData.phone)) {
                                  setFormError('Please enter a valid phone number (minimum 10 digits)');
                                } else {
                                  setFormError('');
                                  handleSubmit();
                                }
                              }} 
                              className="glow-btn" 
                              style={{ flex: 1 }}
                            >
                              {isSubmitting ? "TRANSMITTING..." : "SUBMIT CONSULTATION REQUEST"}
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                            <button onClick={() => { setUserType(null); setStep(1); }} type="button" className="glass-card" style={{ padding: '12px 20px', flex: 1 }}><ChevronLeft size={18} /> Back</button>
                            <button 
                              type="button" 
                              onClick={() => {
                                if (!formData.name || !formData.email || !formData.phone) {
                                  setFormError('All fields with * are mandatory');
                                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                                  setFormError('Please enter a valid email address');
                                } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(formData.phone)) {
                                  setFormError('Please enter a valid phone number (minimum 10 digits)');
                                } else {
                                  setFormError('');
                                  setStep(3);
                                }
                              }} 
                              className="glow-btn" 
                              style={{ flex: 2 }}
                            >
                              Next Step
                            </button>
                          </div>
                        )}
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

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 2000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '20px' 
          }}>
            {/* Dark background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'rgba(5, 6, 10, 0.95)', 
                backdropFilter: 'blur(12px)' 
              }}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: '900px',
                aspectRatio: '16/9',
                position: 'relative',
                zIndex: 2001,
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoModalOpen(false)}
                style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  right: '15px', 
                  background: 'rgba(5, 6, 10, 0.8)', 
                  border: 'none', 
                  color: '#fff', 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  display: 'grid', 
                  placeItems: 'center', 
                  cursor: 'pointer',
                  zIndex: 2002,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(5, 6, 10, 0.8)'}
              >
                <X size={20} />
              </button>

              {/* YouTube Embed iFrame */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/vRStdEutf5s?autoplay=1"
                title="AgentClamp Sandbox Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ChatWidget />
    </div>
  );
};

export default App;
