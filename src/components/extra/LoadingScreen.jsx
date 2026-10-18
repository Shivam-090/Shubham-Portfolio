import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const minDuration = 1000;
    let frame;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / minDuration, 1);
      /* ease-out cubic for natural deceleration */
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setReady(true), 200);
      }
    };

    /* wait for fonts, then start the counter */
    document.fonts.ready.then(() => {
      frame = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (ready) onComplete?.();
  }, [ready, onComplete]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
        >
          {/* Wordmark */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-bold text-3xl tracking-tight mb-12"
          >
            SHUBHAM<span className="text-fg-muted">.</span>
          </motion.p>

          {/* Thin progress bar */}
          <div className="w-48 h-px bg-border relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-fg"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25, ease: 'linear' }}
            />
          </div>

          {/* Percentage */}
          <p className="text-fg-subtle text-[11px] tracking-[0.35em] mt-6 tabular-nums font-medium">
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
