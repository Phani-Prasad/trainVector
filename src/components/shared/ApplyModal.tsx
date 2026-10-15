import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Zap, ChevronLeft, GraduationCap, Briefcase, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ACADEMY_TRACKS } from '../../data/tracksData';

const ApplyModal: React.FC = () => {
  const { isModalOpen, setIsModalOpen, step, setStep, userType, setUserType, formData, setFormData, formError, setFormError, isSuccess, isSubmitting, handleSubmit } = useApp();

  if (!isModalOpen) return null;

  const isProduct = userType === 'brainbuddy' || userType === 'agentclamp' || userType === 'kreomax';

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(5,6,10,0.88)', backdropFilter: 'blur(8px)' }} />
        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="glass-card"
          style={{ width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', padding: '28px 24px', zIndex: 1001, background: '#ffffff', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', borderRadius: '20px', border: '1px solid var(--border)' }}>
          <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'rgba(15,23,42,0.06)', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', borderRadius: '8px', padding: '6px', display: 'grid', placeItems: 'center' }}><X size={20} /></button>

          {isSuccess ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '36px 0' }}>
              <CheckCircle2 size={60} color="var(--primary)" style={{ marginBottom: '20px' }} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '14px', color: 'var(--text-bright)' }}>
                {userType === 'brainbuddy' ? 'PARTNERSHIP REQUEST RECEIVED'
                  : userType === 'agentclamp' ? 'DEMO REQUEST RECEIVED'
                  : userType === 'kreomax' ? 'ENROLLMENT REQUEST RECEIVED'
                  : userType === 'consulting' ? 'CONSULTATION REQUEST RECEIVED'
                  : 'APPLICATION RECEIVED'}
              </h2>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
                {userType === 'brainbuddy' ? (
                  <>Thank you, <strong>{formData.name}</strong>. Our BrainBuddy™ partnership team will contact you within 24 hours.</>
                ) : userType === 'agentclamp' ? (
                  <>Thank you. Our enterprise architecture team will contact <strong>{formData.company || formData.name}</strong> within 24 hours to schedule your demo.</>
                ) : userType === 'kreomax' ? (
                  <>Welcome, <strong>{formData.name}</strong>! Our KREOMAX™ admissions team will contact you within 24 hours.</>
                ) : userType === 'consulting' ? (
                  <>Thank you, <strong>{formData.name}</strong>. Our enterprise consulting team will contact you within 24 hours.</>
                ) : (
                  <>Welcome, <strong>{formData.name}</strong>! Our admissions team will review your application for <strong>{formData.specialization}</strong> and reach out within 48 hours.</>
                )}
              </p>
              <button onClick={() => setIsModalOpen(false)} className="glow-btn" style={{ marginTop: '28px' }}>Close</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {!isProduct && userType !== 'consulting' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffde0018', color: '#b45309', padding: '8px 14px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800, border: '1px solid #ffde0033', marginBottom: '22px', justifyContent: 'center' }}>
                  <Zap size={13} /> SCHOLARSHIP ALERT: FIRST 10 SEATS ARE FREE
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-bright)' }}>
                  {step === 1 && 'CHOOSE YOUR PATHWAY'}
                  {step === 2 && (
                    userType === 'brainbuddy' ? 'PARTNER WITH US — BRAINBUDDY™' :
                    userType === 'agentclamp' ? 'REQUEST ENTERPRISE DEMO — AGENTCLAMP™' :
                    userType === 'kreomax' ? 'ENROLL STUDENTS — KREOMAX™' :
                    userType === 'consulting' ? 'REQUEST AI CONSULTATION' :
                    userType === 'student' ? 'STUDENT ENROLLMENT' :
                    'PROFESSIONAL ENROLLMENT'
                  )}
                  {step === 3 && 'CHOOSE SPECIALIZATION'}
                  {step === 4 && 'COHORT CONTEXT'}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                  {isProduct || userType === 'consulting' ? 'STEP 1/1' : `STEP ${userType ? step - 1 : step}/${userType ? 3 : 4}`}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', textAlign: 'center' }}>Are you currently a student or a working professional?</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      {[{ type: 'student' as const, icon: <GraduationCap size={30} color="#06b6d4" />, label: 'Campus Student', border: 'rgba(6,182,212,0.25)', bg: 'rgba(6,182,212,0.03)' }, { type: 'professional' as const, icon: <Briefcase size={30} color="var(--primary)" />, label: 'Working Professional', border: 'rgba(249,115,22,0.25)', bg: 'rgba(249,115,22,0.03)' }].map(opt => (
                        <div key={opt.type} onClick={() => { setUserType(opt.type); setFormData({ ...formData, specialization: opt.type === 'student' ? 'AI Engineer' : '' }); setStep(2); }} style={{ textAlign: 'center', cursor: 'pointer', border: `1px solid ${opt.border}`, background: opt.bg, padding: '22px 14px', borderRadius: '12px', transition: 'all 0.2s ease' }}>
                          <div style={{ marginBottom: '10px' }}>{opt.icon}</div>
                          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-bright)' }}>{opt.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* ── 1. BrainBuddy Form: Student Name or School Name, Email, Phone ── */}
                    {userType === 'brainbuddy' && (
                      <>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Student Name or School Name <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="e.g. Rahul Sharma / Delhi Public School"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.name}
                            onChange={e => { setFormData({ ...formData, name: e.target.value }); setFormError(''); }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Email Address <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="e.g. contact@school.edu / student@gmail.com"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.email}
                            onChange={e => { setFormData({ ...formData, email: e.target.value }); setFormError(''); }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Phone Number <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="tel"
                            placeholder="e.g. +91 98765 43210"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.phone}
                            onChange={e => { setFormData({ ...formData, phone: e.target.value }); setFormError(''); }}
                          />
                        </div>
                      </>
                    )}

                    {/* ── 2. AgentClamp Form: Organization Details ── */}
                    {userType === 'agentclamp' && (
                      <>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Organization / Company Name <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="e.g. Acme Financial / Global Tech Corp"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.company}
                            onChange={e => { setFormData({ ...formData, company: e.target.value }); setFormError(''); }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Contact Person Name <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="e.g. Rajesh Kumar (VP Architecture)"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.name}
                            onChange={e => { setFormData({ ...formData, name: e.target.value }); setFormError(''); }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Work Email Address <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="e.g. rajesh@acmefinancial.com"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.email}
                            onChange={e => { setFormData({ ...formData, email: e.target.value }); setFormError(''); }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Phone Number <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="tel"
                            placeholder="e.g. +91 98765 43210"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.phone}
                            onChange={e => { setFormData({ ...formData, phone: e.target.value }); setFormError(''); }}
                          />
                        </div>
                      </>
                    )}

                    {/* ── 3. KREOMAX Form: Student/School Name, Email, Phone ── */}
                    {userType === 'kreomax' && (
                      <>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Student / School Name <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="e.g. Aryan / St. Xavier High School"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.name}
                            onChange={e => { setFormData({ ...formData, name: e.target.value }); setFormError(''); }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Email Address <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="e.g. student@gmail.com / school@edu.in"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.email}
                            onChange={e => { setFormData({ ...formData, email: e.target.value }); setFormError(''); }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>
                            Phone Number <span style={{ color: 'var(--primary)' }}>*</span>
                          </label>
                          <input
                            required
                            type="tel"
                            placeholder="e.g. +91 98765 43210"
                            style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                            value={formData.phone}
                            onChange={e => { setFormData({ ...formData, phone: e.target.value }); setFormError(''); }}
                          />
                        </div>
                      </>
                    )}

                    {/* ── Standard Pathways (consulting, student, professional) ── */}
                    {!isProduct && (
                      <>
                        {[
                          { label: 'Full Name', key: 'name', type: 'text', required: true },
                          { label: 'Email', key: 'email', type: 'email', required: true },
                          { label: 'Phone Number', key: 'phone', type: 'tel', required: true },
                        ].map(field => (
                          <div key={field.key}>
                            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>{field.label} {field.required && <span style={{ color: 'var(--primary)' }}>*</span>}</label>
                            <input required={field.required} type={field.type} style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }}
                              value={(formData as any)[field.key]} onChange={e => { setFormData({ ...formData, [field.key]: e.target.value }); setFormError(''); }} />
                          </div>
                        ))}
                        {userType === 'student' && <>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>College / University</label>
                            <input type="text" style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }} value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="e.g. Bangalore University" />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>Degree & Branch</label>
                            <input type="text" style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }} value={formData.designationOrDegree} onChange={e => setFormData({ ...formData, designationOrDegree: e.target.value })} placeholder="e.g. B.E. Computer Science" />
                          </div>
                        </>}
                        {userType === 'professional' && <>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>Company Name</label>
                            <input type="text" style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }} value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="e.g. Tech Solutions" />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>Current Designation</label>
                            <input type="text" style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }} value={formData.designationOrDegree} onChange={e => setFormData({ ...formData, designationOrDegree: e.target.value })} placeholder="e.g. Software Engineer" />
                          </div>
                        </>}
                        {userType === 'consulting' && (
                          <div>
                            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>Company Name <span style={{ color: 'var(--primary)' }}>*</span></label>
                            <input required type="text" style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }} value={formData.company} onChange={e => { setFormData({ ...formData, company: e.target.value }); setFormError(''); }} placeholder="e.g. Enterprise Corp" />
                          </div>
                        )}
                      </>
                    )}

                    {formError && <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>{formError}</div>}

                    <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                      {!isProduct && userType !== 'consulting' && (
                        <button onClick={() => { setUserType(null); setStep(1); }} type="button" style={{ padding: '12px 18px', flex: 1, background: '#f1f5f9', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-dim)' }}><ChevronLeft size={16} /> Back</button>
                      )}

                      {/* Product or Consulting Direct Submit Button */}
                      {userType === 'brainbuddy' ? (
                        <button type="button" disabled={isSubmitting} onClick={() => {
                          if (!formData.name || !formData.email || !formData.phone) {
                            setFormError('All fields are mandatory');
                          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                            setFormError('Please enter a valid email address');
                          } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) {
                            setFormError('Please enter a valid phone number');
                          } else {
                            setFormError('');
                            handleSubmit();
                          }
                        }} className="glow-btn" style={{ flex: 1 }}>
                          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT PARTNERSHIP REQUEST'}
                        </button>
                      ) : userType === 'agentclamp' ? (
                        <button type="button" disabled={isSubmitting} onClick={() => {
                          if (!formData.company || !formData.name || !formData.email || !formData.phone) {
                            setFormError('All fields are mandatory');
                          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                            setFormError('Please enter a valid email address');
                          } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) {
                            setFormError('Please enter a valid phone number');
                          } else {
                            setFormError('');
                            handleSubmit();
                          }
                        }} className="glow-btn" style={{ flex: 1 }}>
                          {isSubmitting ? 'SUBMITTING...' : 'REQUEST ENTERPRISE DEMO'}
                        </button>
                      ) : userType === 'kreomax' ? (
                        <button type="button" disabled={isSubmitting} onClick={() => {
                          if (!formData.name || !formData.email || !formData.phone) {
                            setFormError('All fields are mandatory');
                          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                            setFormError('Please enter a valid email address');
                          } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) {
                            setFormError('Please enter a valid phone number');
                          } else {
                            setFormError('');
                            handleSubmit();
                          }
                        }} className="glow-btn" style={{ flex: 1 }}>
                          {isSubmitting ? 'SUBMITTING...' : 'ENROLL STUDENT'}
                        </button>
                      ) : userType === 'consulting' ? (
                        <button type="button" disabled={isSubmitting} onClick={() => {
                          if (!formData.name || !formData.email || !formData.phone || !formData.company) {
                            setFormError('All fields with * are mandatory');
                          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                            setFormError('Please enter a valid email');
                          } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(formData.phone)) {
                            setFormError('Please enter a valid phone number');
                          } else {
                            setFormError('');
                            handleSubmit();
                          }
                        }} className="glow-btn" style={{ flex: 1 }}>
                          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT CONSULTATION REQUEST'}
                        </button>
                      ) : (
                        <button type="button" onClick={() => {
                          if (!formData.name || !formData.email || !formData.phone) {
                            setFormError('All fields with * are mandatory');
                          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                            setFormError('Please enter a valid email');
                          } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(formData.phone)) {
                            setFormError('Please enter a valid phone number');
                          } else {
                            setFormError('');
                            setStep(3);
                          }
                        }} className="glow-btn" style={{ flex: 2 }}>
                          Next Step <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Select your specialized mastery track:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
                      {ACADEMY_TRACKS.filter(t => { if (userType === 'student') return t.category === 'academic' || t.id === 'ai-engineering'; if (userType === 'academic') return t.category === 'academic'; if (userType === 'domain') return t.category === 'domain'; return true; }).map(t => (
                        <div key={t.id} onClick={() => setFormData({ ...formData, specialization: t.title })}
                          style={{ padding: '11px 14px', borderRadius: '10px', border: `1.5px solid ${formData.specialization === t.title ? t.color : 'var(--border)'}`, background: formData.specialization === t.title ? `${t.color}14` : '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', transition: 'all 0.2s ease' }}>
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: formData.specialization === t.title ? t.color : 'var(--text-bright)' }}>{t.title}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>{t.roleBadge}</div>
                          </div>
                          <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '12px', background: `${t.color}22`, color: t.color, fontWeight: 700, flexShrink: 0 }}>{t.roleBadge}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button onClick={() => setStep(2)} type="button" style={{ padding: '12px 18px', flex: 1, background: '#f1f5f9', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, color: 'var(--text-dim)' }}>Back</button>
                      <button onClick={() => setStep(4)} disabled={!formData.specialization} type="button" className="glow-btn" style={{ flex: 2 }}>Next Step</button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>Primary Goal for this Cohort</label>
                      <textarea required rows={3} style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', resize: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }} value={formData.goals} onChange={e => setFormData({ ...formData, goals: e.target.value })} placeholder="e.g. Launching my career as an AI developer..." />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>Current AI Proficiency</label>
                      <select style={{ width: '100%', padding: '11px 14px', background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', color: 'var(--text-main)', fontFamily: 'inherit' }} value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })}>
                        <option>Beginner (AI Curious)</option>
                        <option>Intermediate (Practical Use)</option>
                        <option>Advanced (Building/Architecting)</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                      <button onClick={() => setStep(3)} type="button" style={{ padding: '12px 18px', flex: 1, background: '#f1f5f9', border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, color: 'var(--text-dim)' }}>Back</button>
                      <button type="submit" disabled={isSubmitting || !formData.goals} className="glow-btn" style={{ flex: 2 }}>{isSubmitting ? 'SUBMITTING...' : 'COMPLETE APPLICATION'}</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ApplyModal;
