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

const App = () => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
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
      {/* Interactive Sync Glow */}
      <AnimatePresence>
        {activeColor && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              background: `radial-gradient(circle at 50% 50%, ${activeColor}33 0%, transparent 70%)`,
              zIndex: -1,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

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
        <div className="nav-links" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#curriculum" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>CURRICULUM</a>
          <a href="#faq" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>FAQ</a>
          <button onClick={handleApply} className="glow-btn" style={{ fontSize: '0.8rem', padding: '8px 20px' }}>Join Cohort</button>
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
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '30px auto', fontSize: '1.25rem', lineHeight: '1.6' }}>
             One common intelligence core. Four specialized professional paths. <br />
             <span style={{ color: '#fff', fontWeight: 600, display: 'block', marginTop: '10px', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                trainVector Academy's structured blueprint for your next career move.
             </span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
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


      {/* The AI Knowledge Temple (The House) */}
      <section id="curriculum" style={{ padding: '100px 5%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '80px', fontSize: '2.5rem' }}>The Knowledge <span style={{ color: 'var(--primary)' }}>Temple</span></h2>
        
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {/* The Roof (Mastery) */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ 
                    width: '100%', 
                    padding: '40px', 
                    textAlign: 'center',
                    background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                    borderRadius: '100% 100% 0 0 / 100% 100% 0 0',
                    marginBottom: '10px',
                    color: '#000',
                    fontWeight: 900,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div className="data-beam" style={{ left: '10%', height: '200%', top: '-50%', animationDelay: '0.5s' }} />
                <div className="data-beam" style={{ right: '15%', height: '200%', top: '-50%', animationDelay: '1.2s', background: 'var(--secondary)' }} />
                
                <GraduationCap style={{ marginBottom: '10px' }} />
                <div className="font-orbitron" style={{ fontSize: '1.5rem' }}>trainVector Role based AI MASTERY</div>
            </motion.div>

            {/* The Pillars (Role Spikes) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px', position: 'relative' }}>
                {roles.map((role, i) => (
                    <motion.div 
                        key={i} 
                        onMouseEnter={() => setActiveColor(role.color)}
                        onMouseLeave={() => setActiveColor(null)}
                        onClick={handleApply}
                        initial={{ opacity: 0, height: 0 }}
                        whileInView={{ opacity: 1, height: 'auto' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                        style={{ 
                            background: 'var(--bg-card)', 
                            borderLeft: `4px solid ${role.color}`, 
                            borderRight: `4px solid ${role.color}`, 
                            padding: '30px 20px',
                            minHeight: '350px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Data Beam climbing the pillar */}
                        <div className="data-beam" style={{ left: '0', background: role.color, animationDelay: `${i * 0.4}s`, opacity: activeColor === role.color ? 0.8 : 0.3 }} />
                        <div className="data-beam" style={{ right: '0', background: role.color, animationDelay: `${i * 0.6}s`, opacity: activeColor === role.color ? 0.8 : 0.3 }} />
                        
                        <div style={{ marginBottom: '20px' }}>{role.icon}</div>
                        <h4 style={{ color: role.color, fontSize: '0.9rem', marginBottom: '20px', letterSpacing: '1px' }}>{role.title.toUpperCase()}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flexGrow: 1 }}>
                            {role.skills.map((skill, si) => (
                                <div key={si} style={{ fontSize: '0.85rem', color: 'var(--text-dim)', borderBottom: '1px solid var(--border)', paddingBottom: '5px' }}>
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* The Foundation (The Base) */}
            <motion.div 
                initial={{ opacity: 0.6, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1, boxShadow: '0 0 50px var(--primary-glow)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ 
                    width: '100%', 
                    background: 'var(--bg-card)', 
                    border: '2px solid var(--primary)', 
                    borderRadius: '0 0 12px 12px',
                    padding: '50px 30px',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--primary)', color: '#000', padding: '5px 15px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '20px' }}>
                    <Target size={14} /> The Shared Core
                </div>
                <h3 className="font-orbitron" style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '30px' }}>THE AI FOUNDATION MODULE</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {foundationItems.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                            <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'left' }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
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
              title: "Builder Workshops",
              desc: "Interactive, hands-on sessions where you build real-world AI projects and custom agentic workflows.",
              icon: <Code size={32} />,
              color: "var(--primary)"
            },
            {
              title: "Expert Guest Talks",
              desc: "Strategic insights and cutting-edge trends directly from industry leaders and AI pioneers.",
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

      {/* Fast-Track Timeline */}
      <section style={{ padding: '100px 5%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '60px' }}>YOUR <span style={{ color: 'var(--secondary)' }}>3-STEP</span> JOURNEY</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          {[
            { step: "01", title: "Apply for Cohort", desc: "Select your career-synced track and submit your application for the next masterclass." },
            { step: "02", title: "Master AI Modules", desc: "Complete the Shared Core and branch into high-impact role-specific specialized training." },
            { step: "03", title: "Scale Your Role", desc: "Deploy your custom AI workflows and lead the transformation in your organization." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              style={{ padding: '40px', position: 'relative', borderLeft: i !== 0 ? '1px solid var(--border)' : 'none' }}
            >
              <div style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(255,255,255,0.03)', position: 'absolute', top: '10px', left: '20px', zIndex: 0 }}>{item.step}</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h4 style={{ color: i === 0 ? 'var(--primary)' : i === 1 ? 'var(--secondary)' : 'var(--accent-blue)', marginBottom: '15px', fontSize: '1.2rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
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
            { q: "Is this program suitable for beginners?", a: "Yes! The program starts with a Shared AI Foundation module that brings everyone up to speed — regardless of your background. From there, you branch into your role-specific track. You only need curiosity and a growth mindset." },
            { q: "How much time do I need to commit per week?", a: "We recommend 6–8 hours per week. This includes self-paced modules, live workshops (2 hrs/week), and hands-on project work." },
            { q: "Which track should I choose?", a: "Choose based on your current role: Developers & Architects for builders, PMs & BAs for product folks, Delivery Managers for project leaders, and Executives & Leaders for strategic decision-makers. Not sure? Apply and we'll guide you." },
            { q: "Do I get a certificate at the end?", a: "Yes! Upon successful completion of your track, you receive a trainVector AI Mastery Certificate — verified and shareable on LinkedIn. You also get access to exclusive alumni alumni community and resources." },
            { q: "Is the content updated regularly?", a: "Absolutely. AI moves fast and so do we. The curriculum is reviewed and updated every cohort to reflect the latest models, tools, and industry best practices — including emerging topics like MCP and multi-agent systems." },
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
                          Welcome to the Vector, <strong>{formData.name}</strong>. Our admissions team will review your profile for the <strong>{formData.specialization}</strong> track and reach out within 48 hours.
                      </p>
                      <button onClick={() => setIsModalOpen(false)} className="glow-btn" style={{ marginTop: '40px' }}>Close Terminal</button>
                  </motion.div>
              ) : (
                  <form onSubmit={handleSubmit}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                          <h3 className="font-orbitron" style={{ fontSize: '1.2rem' }}>
                              {step === 1 && "PROFESSIONAL IDENTITY"}
                              {step === 2 && "SELECT SPECIALIZATION"}
                              {step === 3 && "CURRICULUM INTENT"}
                          </h3>
                          <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>STEP {step}/3</span>
                      </div>

                      <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div className="input-field">
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Full Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="glass-card" 
                                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }} 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="input-field">
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Work Email</label>
                                    <input 
                                        required
                                        type="email" 
                                        className="glass-card" 
                                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }} 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className="input-field">
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Phone Number</label>
                                    <input 
                                        required
                                        type="tel" 
                                        className="glass-card" 
                                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }} 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                                <div className="input-field">
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Company / Organization</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="glass-card" 
                                        style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }} 
                                        value={formData.company}
                                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                                    />
                                </div>
                            <button type="button" onClick={() => setStep(2)} disabled={!formData.name || !formData.email || !formData.phone} className="glow-btn" style={{ marginTop: '20px' }}>Next Sequence</button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                {roles.map((r, i) => (
                                    <div 
                                        key={i}
                                        onClick={() => setFormData({...formData, specialization: r.title})}
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
                                        onChange={(e) => setFormData({...formData, goals: e.target.value})}
                                        placeholder="e.g. Scaling LLM Infrastructure..."
                                    />
                                </div>
                                <div className="input-field">
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', textTransform: 'uppercase' }}>Current AI Proficiency</label>
                                    <select 
                                        className="glass-card" 
                                        style={{ width: '100%', padding: '12px', background: 'rgba(5, 6, 10, 1)', border: '1px solid var(--border)' }}
                                        value={formData.experience}
                                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
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
