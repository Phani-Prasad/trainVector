import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const VideoModal: React.FC = () => {
  const { isVideoModalOpen, setIsVideoModalOpen } = useApp();
  if (!isVideoModalOpen) return null;
  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(5,6,10,0.95)', backdropFilter: 'blur(12px)' }} />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ width: '100%', maxWidth: '900px', aspectRatio: '16/9', position: 'relative', zIndex: 2001, borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(249,115,22,0.3)', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
          <button onClick={() => setIsVideoModalOpen(false)} style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(5,6,10,0.8)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'grid', placeItems: 'center', cursor: 'pointer', zIndex: 2002 }}><X size={18} /></button>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/vRStdEutf5s?autoplay=1" title="AgentClamp Sandbox Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{ border: 'none' }} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoModal;
