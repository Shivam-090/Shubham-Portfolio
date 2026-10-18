import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './extra/ThemeToggle';

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education',  href: '#education' },
  { label: 'Projects',   href: '#projects' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'education', 'projects', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 inset-x-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-border shadow-xs transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Wordmark */}
        <a
          href="#"
          onClick={() => setMenuOpen(false)}
          className="font-display font-bold text-xl tracking-tight text-fg hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <span>SHUBHAM</span>
          <span className="text-[11px] font-mono tracking-widest text-fg-subtle border border-border px-1.5 py-0.5 rounded uppercase">MARKETER</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((l) => {
            const isActive = activeSection === l.href.replace('#', '');
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative nav-link text-sm transition-colors duration-200 py-1 ${
                  isActive ? 'text-fg font-medium' : 'text-fg-muted hover:text-fg'
                }`}
              >
                <span>{l.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 inset-x-0 h-0.5 bg-fg rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          <a
            href="/Shubham Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-fg border border-border px-4 py-2 rounded-full hover:border-fg-muted transition-colors duration-300 flex items-center gap-1.5"
          >
            <span>Resume</span>
            <span className="text-xs">↗</span>
          </a>

          <a href="#contact" className="text-sm font-medium text-bg bg-fg px-5 py-2 rounded-full hover:bg-fg/90 transition-colors duration-300">
            Contact
          </a>

          {/* Theme Toggle Button */}
          <div className="pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls: Theme Toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border bg-bg-elevated/40 text-fg"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-fg transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-fg transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile overlay sidebar drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] border-b border-border md:hidden flex flex-col justify-between px-8 py-8 overflow-y-auto"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            <div className="flex flex-col gap-5">
              <p className="text-[11px] font-mono uppercase tracking-widest text-fg-subtle border-b border-border/60 pb-3">
                Navigation
              </p>
              {navLinks.map((l, i) => {
                const isActive = activeSection === l.href.replace('#', '');
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`text-2xl font-display font-semibold transition-colors flex items-center justify-between ${
                      isActive ? 'text-fg pl-3 border-l-2 border-accent' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-xs font-mono text-fg-subtle">0{i + 1}</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-border/80 mt-6">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center text-sm font-semibold text-bg bg-fg py-3.5 rounded-xl shadow-xs"
              >
                Get in Touch (Contact)
              </a>
              <a
                href="/Shubham Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center text-sm font-medium text-fg border border-border bg-bg-elevated/40 py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <span>Download Resume (PDF)</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
