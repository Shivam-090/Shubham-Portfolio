import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education, certifications } from '../data/experience';
import MagneticButton from './extra/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-heading', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });

      gsap.from('.edu-entry', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.edu-entry', start: 'top 87%' },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="education"
      className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-border"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div>
          <h2
            className="edu-heading font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)' }}
          >
            Education &amp; Certifications
          </h2>
        </div>

        <MagneticButton
          href="/Shubham Resume.pdf"
          className="text-xs font-mono uppercase tracking-widest text-fg-muted hover:text-fg border border-border hover:border-fg-muted px-5 py-2.5 rounded-full transition-colors w-fit flex items-center gap-2"
        >
          <span>Official Resume (PDF)</span>
          <span>↓</span>
        </MagneticButton>
      </div>

      {/* Degrees */}
      <div className="space-y-10 mb-20">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="edu-entry grid md:grid-cols-[260px_1fr] gap-2 md:gap-14 pb-8 border-b border-border/50"
          >
            <p className="text-fg-subtle text-sm pt-0.5 font-mono">{edu.period}</p>
            <div>
              <h3 className="font-display font-semibold text-lg text-fg mb-1">
                {edu.degree}
              </h3>
              <p className="text-fg-muted text-sm">
                {edu.institution}
                {edu.detail && (
                  <span className="text-fg-subtle ml-2 font-mono text-xs">— {edu.detail}</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications Sub-section */}
      <div className="pt-6">
        <h3 className="font-display font-semibold text-xl text-fg mb-8 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Certifications
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-xl border border-border/70 bg-bg-elevated/40 backdrop-blur-sm hover:border-fg-muted/40 transition-colors duration-200"
            >
              <p className="text-fg-subtle text-xs font-mono mb-1">{cert.period}</p>
              <h4 className="text-sm font-semibold text-fg mb-1">{cert.title}</h4>
              <p className="text-xs text-fg-muted mb-1.5">{cert.institution}</p>
              {cert.detail && (
                <p className="text-xs text-fg-subtle leading-relaxed border-t border-border/40 pt-2 mt-2">
                  {cert.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
