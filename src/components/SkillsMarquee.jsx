import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills, skillCategories } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsMarquee() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-heading', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });
      gsap.from('.skills-sub', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });
      gsap.from('.skill-card', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 88%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Split skills into two balanced rows for marquee
  const mid = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, mid);
  const row2 = skills.slice(mid);

  const doubleRow1 = [...row1, ...row1, ...row1];
  const doubleRow2 = [...row2, ...row2, ...row2];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 md:py-36 border-t border-border overflow-hidden relative"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2
            className="skills-heading font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)' }}
          >
            Skills &amp; Technologies
          </h2>
        </div>

        <a
          href="/Shubham Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono uppercase tracking-widest text-fg-muted hover:text-fg border border-border hover:border-fg-muted px-4 py-2 rounded-full transition-colors w-fit flex items-center gap-1.5"
        >
          <span>All Skills in Resume</span>
          <span>↗</span>
        </a>
      </div>

      {/* Marquee Row 1 - scrolling left */}
      <div className="py-2.5 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex whitespace-nowrap will-change-transform gap-4">
          {doubleRow1.map((skill, i) => (
            <div
              key={`${skill}-${i}`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border bg-bg-elevated/70 text-sm font-medium text-fg/80 hover:text-fg hover:border-fg-muted hover:bg-bg-elevated transition-all duration-300 select-none backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - scrolling right */}
      <div className="py-2.5 mt-2 mb-16 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="marquee-track-reverse flex whitespace-nowrap will-change-transform gap-4">
          {doubleRow2.map((skill, i) => (
            <div
              key={`${skill}-${i}`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border bg-bg-elevated/70 text-sm font-medium text-fg/80 hover:text-fg hover:border-fg-muted hover:bg-bg-elevated transition-all duration-300 select-none backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-fg-muted/60" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Skills Breakdown from Resume */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((group) => (
            <div
              key={group.category}
              className="skill-card p-6 rounded-2xl border border-border/70 bg-bg-elevated/40 backdrop-blur-sm hover:border-fg-muted/40 transition-colors"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-fg-subtle mb-4 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent" />
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-lg border border-border/60 bg-bg/60 text-fg-muted font-medium hover:text-fg hover:border-fg-muted/60 hover:bg-bg-elevated transition-all duration-200 select-none"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
