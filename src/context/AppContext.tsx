import React, { createContext, useContext, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  designationOrDegree: string;
  specialization: string;
  goals: string;
  experience: string;
}

export type UserType = 'student' | 'professional' | 'consulting' | 'domain' | 'academic' | 'brainbuddy' | 'agentclamp' | 'kreomax' | null;

export interface AppContextType {
  isModalOpen: boolean;
  isVideoModalOpen: boolean;
  step: number;
  isSubmitting: boolean;
  isSuccess: boolean;
  formError: string;
  userType: UserType;
  formData: FormData;
  setFormData: (data: FormData) => void;
  setIsModalOpen: (v: boolean) => void;
  setIsVideoModalOpen: (v: boolean) => void;
  setStep: (v: number) => void;
  setUserType: (v: UserType) => void;
  setFormError: (v: string) => void;
  handleApply: (type?: UserType, trackTitle?: string) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [userType, setUserType] = useState<UserType>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', company: '',
    designationOrDegree: '', specialization: '', goals: '',
    experience: 'Intermediate (Practical Use)'
  });

  const handleApply = (type?: UserType, trackTitle?: string) => {
    setIsModalOpen(true);
    setStep(type ? 2 : 1);
    setUserType(type || null);
    setIsSuccess(false);
    setFormError('');
    setFormData({
      name: '', email: '', phone: '', company: '',
      designationOrDegree: '',
      specialization: trackTitle || (type === 'student' ? 'Student AI Launchpad' : ''),
      goals: trackTitle ? `Enquiry: ${trackTitle}` : '',
      experience: 'Intermediate (Practical Use)'
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    let resolvedUserType = 'Working Professional';
    if (userType === 'student') resolvedUserType = 'Campus / Fresh Graduate';
    else if (userType === 'domain') resolvedUserType = 'Business Domain Track';
    else if (userType === 'academic') resolvedUserType = 'Academic / Institutional';
    else if (userType === 'consulting') resolvedUserType = 'Enterprise Consulting';
    else if (userType === 'brainbuddy') resolvedUserType = 'BrainBuddy School Partnership';
    else if (userType === 'agentclamp') resolvedUserType = 'AgentClamp Enterprise Demo';
    else if (userType === 'kreomax') resolvedUserType = 'KREOMAX Student Enrollment';

    const fallbackSpec = userType === 'brainbuddy'
      ? 'BrainBuddy School Partnership'
      : userType === 'agentclamp'
      ? 'AgentClamp Enterprise Demo'
      : userType === 'kreomax'
      ? 'KREOMAX Student Enrollment'
      : userType === 'consulting'
      ? 'AI Consulting'
      : '';

    const fallbackGoals = userType === 'brainbuddy'
      ? 'BrainBuddy Partnership Request'
      : userType === 'agentclamp'
      ? 'AgentClamp Enterprise Demo Request'
      : userType === 'kreomax'
      ? 'KREOMAX Student Enrollment Request'
      : userType === 'consulting'
      ? 'Consulting Request'
      : '';

    try {
      await addDoc(collection(db, 'submissions'), {
        userType: resolvedUserType, name: formData.name, email: formData.email,
        phone: formData.phone, companyOrCollege: formData.company,
        designationOrDegree: formData.designationOrDegree,
        specialization: formData.specialization || fallbackSpec,
        goals: formData.goals || fallbackGoals,
        experience: formData.experience || '', createdAt: serverTimestamp()
      });
      await emailjs.send('service_hntv8qm', 'template_nnw0myj', {
        userType: resolvedUserType, name: formData.name, email: formData.email,
        phone: formData.phone, company: formData.company,
        designationOrDegree: formData.designationOrDegree,
        specialization: formData.specialization || fallbackSpec,
        goals: formData.goals || fallbackGoals,
        experience: formData.experience || '',
      }, 'eNkzn7ZO6GbcTQ8wL');
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission Error:', error);
      setIsSubmitting(false);
      alert('Submission failed. Please check your connection and try again.');
    }
  };

  return (
    <AppContext.Provider value={{
      isModalOpen, isVideoModalOpen, step, isSubmitting, isSuccess, formError,
      userType, formData, setFormData, setIsModalOpen, setIsVideoModalOpen,
      setStep, setUserType, setFormError, handleApply, handleSubmit
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
