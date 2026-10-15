import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import ApplyModal from './components/shared/ApplyModal';
import VideoModal from './components/shared/VideoModal';
import ChatWidget from './components/ChatWidget';

import HomePage from './pages/HomePage';
import AcademyPage from './pages/AcademyPage';
import ConsultingPage from './pages/ConsultingPage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';

const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: 'easeIn' } },
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/consulting" element={<ConsultingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>
          <div className="glow-orb" style={{ width: '400px', height: '400px', top: '10%', left: '5%', background: '#f97316', opacity: 0.04 }} />
          <div className="glow-orb" style={{ width: '500px', height: '500px', bottom: '10%', right: '5%', background: '#4f46e5', opacity: 0.03, animationDelay: '-10s' }} />
          <div className="glow-orb" style={{ width: '300px', height: '300px', top: '40%', right: '20%', background: '#0284c7', opacity: 0.03, animationDelay: '-5s' }} />
          <Navbar />
          <main style={{ paddingTop: '0' }}>
            <AnimatedRoutes />
          </main>
          <Footer />
          <ApplyModal />
          <VideoModal />
          <ChatWidget />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
