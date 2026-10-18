import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-heading', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });

      gsap.from('.exp-entry', {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.exp-entry', start: 'top 87%' },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="experience"
      className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-border"
    >
      <h2
        className="exp-heading font-display font-bold tracking-tight mb-20 overflow-hidden"
        style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)' }}
      >
        Experience
      </h2>

      <div className="space-y-16 md:space-y-20">
        {experience.map((exp) => (
          <div
            key={exp.id}
            className="exp-entry grid md:grid-cols-[260px_1fr] gap-3 md:gap-14"
          >
            <p className="text-fg-subtle text-xs font-mono tracking-wider pt-1">{exp.period}</p>
            <div>
              <h3 className="font-display font-semibold text-lg md:text-xl mb-1">
                {exp.role}
              </h3>
              <p className="text-fg-muted text-sm mb-5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{exp.company}</span>
                {exp.location && (
                  <>
                    <span className="text-fg-subtle select-none">·</span>
                    <span className="text-fg-subtle">{exp.location}</span>
                  </>
                )}
              </p>
              <ul className="space-y-2.5">
                {exp.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="text-fg-muted text-sm leading-relaxed flex gap-3"
                  >
                    <span className="text-fg-subtle mt-0.5 flex-shrink-0 select-none">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
