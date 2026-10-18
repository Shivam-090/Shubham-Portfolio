import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(1, Math.max(0, scrollY / docHeight)));
      }
      setVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 16;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Scroll back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full border border-border bg-bg-elevated/80 backdrop-blur-md text-fg hover:border-fg-muted hover:bg-bg-elevated shadow-md hover:shadow-lg transition-all flex items-center justify-center cursor-pointer group"
        >
          {/* Circular progress stroke */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              className="text-border"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              className="text-accent transition-all duration-150"
              strokeWidth="1.75"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
            />
          </svg>

          <ArrowUp className="w-4 h-4 text-fg-muted group-hover:text-fg group-hover:-translate-y-0.5 transition-all duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
