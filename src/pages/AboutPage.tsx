import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Cpu, Compass, Layers, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import phaniProfile from '../assets/phani_profile.png';
import rukmaProfile from '../assets/Rukma.jpeg';
import sreeProfile from '../assets/Sree.jpeg';

const AboutPage: React.FC = () => {
  const { handleApply } = useApp();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION: Leadership & Architectural Vision             */}
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
                About Us · Applied AI Leadership
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
              About Us
            </h1>

            <p style={{
              color: '#475569',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '680px',
              margin: '0 auto 32px',
            }}>
              Built by enterprise AI leaders with over 30 years of hands-on experience directing AI architecture, cloud platforms, and large-scale engineering transformations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 2. MISSION SECTION (Clean Light Card)                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5%',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '40px 38px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 30px -4px rgba(15, 23, 42, 0.06)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#f97316' }} />
            <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
              Strategic Purpose
            </span>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>
              Our Mission
            </h3>
            <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.75, margin: 0 }}>
              To empower organizations and builders with the systems, architectures, and strategic capability needed to harness AI responsibly and accelerate cognitive transformation. Through proprietary AI software platforms, bespoke enterprise engineering, and practitioner training, we turn emerging intelligence into measurable business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 3. WHY TRAINVECTOR (The 4 Integrated Pillars)                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5%',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
              Integrated Capability Model
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.3rem)', fontWeight: 900, color: '#0f172a' }}>
              Why trainVector™?
            </h2>
            <p style={{ color: '#475569', maxWidth: '680px', margin: '10px auto 0', fontSize: '0.94rem', lineHeight: 1.6 }}>
              A unified execution engine bridging proprietary software platforms, transformative enterprise strategy, bespoke engineering consulting, and elite practitioner training.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px' }}>
            {[
              {
                badge: 'Platforms & Software',
                title: 'Proprietary AI Products',
                desc: 'Battle-tested software engineered to solve real enterprise and educational challenges — featuring BrainBuddy™ for adaptive learning and AgentClamp™ for multi-agent governance, telemetry, and zero-latency prompt shields.',
                color: '#ea580c',
                icon: <Cpu size={22} />,
                highlights: ['AgentClamp™ Governance Sandbox', 'BrainBuddy™ Cognitive Platform', 'Real-Time Prompt Shields']
              },
              {
                badge: 'Executive & Roadmap',
                title: 'Enterprise AI Strategy',
                desc: 'Advising C-suite leaders on high-conviction 3-year AI transformation roadmaps, build-vs-buy economics, token unit economics, and institutional Centers of Excellence (CoE) that de-risk investment and maximize ROI.',
                color: '#8b5cf6',
                icon: <Compass size={22} />,
                highlights: ['3-Year Strategic Roadmaps', 'Build vs. Buy TCO Models', 'Enterprise AI Centers of Excellence']
              },
              {
                badge: 'Bespoke Engineering',
                title: 'Engineering & Consulting',
                desc: 'Direct architectural co-development and delivery of mission-critical systems. We build resilient multi-agent swarms, hybrid RAG topologies, private model hosting, and zero-leakage security perimeters.',
                color: '#0284c7',
                icon: <Layers size={22} />,
                highlights: ['Stateful Multi-Agent Swarms', 'Hybrid RAG & Knowledge Graphs', 'Private LLM Cluster Hosting']
              },
              {
                badge: 'Academy & Capability',
                title: 'Practitioner Training',
                desc: 'Applied capability building across 12 calibrated specializations. We empower software engineers, domain leaders, faculty researchers (FDPs), and university graduates to build, test, and ship production AI.',
                color: '#10b981',
                icon: <Award size={22} />,
                highlights: ['12 Calibrated Specializations', 'Faculty FDPs & Campus CoEs', 'Deployable Capstone Systems']
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.08)' }}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px 22px',
                  boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Top Accent Bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: pillar.color }} />

                {/* Header: Icon & Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{
                    display: 'inline-flex',
                    padding: '8px',
                    borderRadius: '10px',
                    background: `${pillar.color}14`,
                    color: pillar.color,
                    border: `1px solid ${pillar.color}30`
                  }}>
                    {pillar.icon}
                  </div>
                  <span style={{
                    fontSize: '0.64rem',
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    color: pillar.color,
                    background: `${pillar.color}10`,
                    border: `1px solid ${pillar.color}25`,
                    borderRadius: '20px',
                    padding: '2px 8px'
                  }}>
                    {pillar.badge}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>
                  {pillar.title}
                </h4>

                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.55, marginBottom: '16px', flex: 1 }}>
                  {pillar.desc}
                </p>

                {/* Highlights List */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {pillar.highlights.map((h, hi) => (
                    <div key={hi} style={{ fontSize: '0.72rem', color: '#334155', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: pillar.color, fontWeight: 900, fontSize: '0.8rem' }}>•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 4. CORE LEADERSHIP TEAM (Executive Cards)                     */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '36px 5% 40px',
        background: '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#ea580c', display: 'block', marginBottom: '8px' }}>
              Leadership Team
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.3rem)', fontWeight: 900, color: '#0f172a' }}>
              Executive Leadership
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {/* Phani */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '36px 28px',
              textAlign: 'center',
              boxShadow: '0 8px 30px -4px rgba(15, 23, 42, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#f97316' }} />
              <div style={{ width: '100px', height: '100px', margin: '0 auto 18px', position: 'relative' }}>
                <img src={phaniProfile} alt="Phani Prasad Thimmapuram" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f97316', boxShadow: '0 4px 16px rgba(249,115,22,0.3)' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>Phani Prasad Thimmapuram</h3>
              <div style={{ color: '#ea580c', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Founder & CTO</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#ea580c', fontWeight: 700, margin: '0 auto 10px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)' }}>
                <GraduationCap size={13} /> Pursuing PhD in GenAI & Agentic AI
              </div>
              <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>
                Transformation leader with 30 years of IT experience directing GenAI architecture, cloud migration, and systems engineering for global financial institutions.
              </p>
              <div style={{ fontSize: '0.70rem', color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 800 }}>Certifications</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
                {['TOGAF 10', 'AWS CCP', 'MS AI Leader', 'Agile SPC 6.0', 'Databricks'].map(cert => (
                  <span key={cert} style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#334155' }}>{cert}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <a href="mailto:phani@trainvector.com" style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c', textDecoration: 'none' }}><Mail size={16} /></a>
              </div>
            </div>

            {/* Sreedhar */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '36px 28px',
              textAlign: 'center',
              boxShadow: '0 8px 30px -4px rgba(15, 23, 42, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#f97316' }} />
              <div style={{ width: '100px', height: '100px', margin: '0 auto 18px', position: 'relative' }}>
                <img src={sreeProfile} alt="K. Sreedhar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f97316', boxShadow: '0 4px 16px rgba(249,115,22,0.3)' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>K. Sreedhar</h3>
              <div style={{ color: '#ea580c', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>Co-Founder & COO</div>
              <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                Seasoned operations leader with deep expertise in scaling enterprise programs, driving cross-functional alignment, and operationalizing AI-led transformation initiatives across global environments.
              </p>
              <div style={{ fontSize: '0.70rem', color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 800 }}>Prior Leadership</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
                {['FIS', 'GE', 'Ramco Systems'].map(org => (
                  <span key={org} style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#334155' }}>{org}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <a href="mailto:sreedhar@trainvector.com" style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c', textDecoration: 'none' }}><Mail size={16} /></a>
              </div>
            </div>

            {/* Rukma */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              padding: '36px 28px',
              textAlign: 'center',
              boxShadow: '0 8px 30px -4px rgba(15, 23, 42, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#f97316' }} />
              <div style={{ width: '100px', height: '100px', margin: '0 auto 18px', position: 'relative' }}>
                <img src={rukmaProfile} alt="Rukma G" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f97316', boxShadow: '0 4px 16px rgba(249,115,22,0.3)' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>Rukma G</h3>
              <div style={{ color: '#ea580c', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Co-Founder & CBTO</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#ea580c', fontWeight: 700, margin: '0 auto 10px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)' }}>
                <GraduationCap size={13} /> MBA – Data Science & Analytics
              </div>
              <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>
                Business transformation leader with over 25 years of experience driving digital transformation, customer success, and process innovation across enterprise sectors.
              </p>
              <div style={{ fontSize: '0.70rem', color: '#64748b', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 800 }}>Prior Leadership</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
                {['Ramco', 'EY', 'Cloudpay', 'CGI'].map(org => (
                  <span key={org} style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#334155' }}>{org}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <a href="mailto:rukma@trainvector.com" style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c', textDecoration: 'none' }}><Mail size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
