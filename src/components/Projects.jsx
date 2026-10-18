import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { X, Image as ImageIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Keyboard shortcut and scroll-lock for lightbox
  useEffect(() => {
    if (!lightboxImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj-header-elem', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });

      gsap.from('.proj-row', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.proj-list-container', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-border relative"
    >
      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2
            className="proj-header-elem font-display font-bold tracking-tight text-fg"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
          >
            Projects
          </h2>
        </div>
        <p className="proj-header-elem text-fg-muted text-sm md:text-base max-w-md leading-relaxed">
          Digital marketing campaigns, website redesigns, and growth platforms executed with data-driven precision.
        </p>
      </div>

      {/* ── All Projects List (Horizontal Rows matching reference design) ── */}
      <div className="proj-list-container">
        {projects.map((project, index) => {
          const fullDesc = project.featuredDescription || project.description;
          const projectImages = project.images || [];

          return (
            <div
              key={project.id}
              className="proj-row border-t border-border py-10 md:py-14 transition-colors duration-300 hover:bg-bg-elevated/20 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 rounded-xl group relative"
            >
              {/* Row Header: Title on Left, Action Link on Right */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-xs font-mono text-fg-subtle uppercase tracking-wider">
                    0{index + 1}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-fg tracking-tight group-hover:text-fg/80 transition-colors">
                    {project.name}
                  </h3>
                  {project.category && (
                    <span className="text-xs font-mono text-fg-subtle">
                      / {project.category}
                    </span>
                  )}
                  {project.featured && (
                    <span className="text-[11px] font-mono uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                  {projectImages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setLightboxImage(projectImages[0])}
                      title="Click to view screenshots"
                      className="text-[11px] font-mono text-fg-muted hover:text-fg border border-border/70 bg-bg-elevated/40 hover:bg-bg-elevated px-2 py-0.5 rounded inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>{projectImages.length} {projectImages.length > 1 ? 'Screens' : 'Screen'}</span>
                    </button>
                  )}
                </div>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-mono px-4 py-2 border border-border bg-bg-elevated/50 text-fg hover:text-bg hover:bg-fg hover:border-fg transition-all duration-200 rounded shrink-0 shadow-sm"
                  >
                    <span>Visit Live Site</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
                  </a>
                ) : project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start sm:self-auto text-xs font-mono px-4 py-2 border border-border bg-bg-elevated/50 text-fg-muted hover:text-bg hover:bg-fg hover:border-fg transition-all duration-200 rounded shrink-0 shadow-sm"
                  >
                    <span>Jump To Project</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-mono px-3.5 py-2 border border-border/80 bg-bg-elevated/40 text-fg-subtle rounded shrink-0 shadow-sm cursor-default select-none"
                  >
                    <span>Case Study</span>
                    <span className="text-[11px] opacity-75">✦</span>
                  </span>
                )}
              </div>

              {/* Description (Full details always visible directly) */}
              <div className="max-w-3xl mb-5">
                <p className="text-fg-muted text-sm sm:text-base leading-relaxed">
                  {fullDesc}
                </p>
              </div>

              {/* All the technology/tools used in the project */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-fg-subtle mr-1">
                  Stack:
                </span>
                {project.tech.map((techItem) => (
                  <span
                    key={techItem}
                    className="text-xs font-mono text-fg-muted border border-border bg-bg-elevated/50 px-2.5 py-1 rounded"
                  >
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        {/* Bottom divider line */}
        <div className="border-t border-border" />
      </div>

      {/* ── Fullscreen Lightbox Modal (For Previewing Screenshots on Demand) ── */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-fadeIn cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[92vh] flex flex-col items-center justify-center cursor-default"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close screenshot preview"
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox image */}
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black max-h-[85vh]">
              <img
                src={lightboxImage}
                alt="Enlarged project screenshot"
                className="w-auto h-auto max-h-[85vh] max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
