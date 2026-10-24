import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function Hero({ loaded }) {
  const section = useRef(null);

  /* ── GSAP Entrance Animation ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-title-line',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
        0.05
      )
        .fromTo(
          '.hero-desc',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.35
        )
        .fromTo(
          '.hero-tag',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.5 },
          0.5
        );
    }, section);

    return () => ctx.revert();
  }, [loaded]);

  const tags = [
    { label: 'Technical & On-Page SEO', href: '#skills' },
    { label: 'Google & Meta Ads', href: '#skills' },
    { label: 'Local SEO (GMB)', href: '#skills' },
    { label: 'GitHub: CodeSandbox-ui ↗', href: 'https://github.com/CodeSandbox-ui', isExternal: true },
    { label: 'Resume (PDF) ↗', href: '/Shubham Resume.pdf', isResume: true },
  ];

  return (
    <section
      ref={section}
      id="hero"
      className="relative min-h-[calc(100vh-5rem)] flex items-center pt-24 pb-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* ── Left Column: Editorial Minimal Typography ── */}
        <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
          {/* Main Giant Name with Domain Badge */}
          <h1
            className="font-display font-extrabold tracking-tight leading-[0.94] mb-6 text-fg"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 6.25rem)' }}
          >
            <span className="hero-title-line block overflow-hidden">
              Shubham
            </span>
            <span className="hero-title-line block overflow-hidden text-fg-muted font-normal text-xl md:text-2xl lg:text-3xl tracking-tight mt-3 flex items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-accent border border-accent/40 bg-accent/10 px-2 py-0.5 rounded">
                PORTFOLIO
              </span>
              <span className="font-semibold text-fg">Digital Marketing Executive</span>
            </span>
          </h1>

          {/* Subtitle / Tagline — two concise editorial lines */}
          <div className="hero-desc text-fg-muted text-base md:text-lg leading-snug mb-9 max-w-md space-y-1">
            <p className="font-medium text-fg/90">
              SEO · Google Ads · Meta Ads · Local SEO
            </p>
            <p className="text-fg-muted">
              BCA graduate driving measurable growth through technical precision &amp; high-ROI campaigns.
            </p>
          </div>

          {/* Minimalist Rectangular Tag Pills */}
          <div className="flex flex-wrap gap-2.5 max-w-lg mb-10">
            {tags.map((tag) => (
              <a
                key={tag.label}
                href={tag.href}
                target={tag.isResume || tag.isExternal ? '_blank' : undefined}
                rel={tag.isResume || tag.isExternal ? 'noopener noreferrer' : undefined}
                className={`hero-tag px-3.5 py-1.5 text-xs font-medium border transition-colors select-none ${
                  tag.isResume
                    ? 'border-fg/40 text-fg bg-fg/5 hover:bg-fg hover:text-bg'
                    : 'border-border text-fg-muted bg-bg-elevated/40 hover:border-fg-muted hover:text-fg'
                }`}
              >
                {tag.label}
              </a>
            ))}
          </div>

          {/* Quick minimal navigation jumps */}
          <div className="flex items-center gap-6 pt-2 text-xs font-mono tracking-wider text-fg-subtle uppercase">
            <a
              href="#projects"
              className="hover:text-fg transition-colors flex items-center gap-1.5 group"
            >
              <span>Selected Work</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <span>·</span>
            <a
              href="#about"
              className="hover:text-fg transition-colors flex items-center gap-1.5 group"
            >
              <span>About / CV</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <span>·</span>
            <a
              href="#contact"
              className="hover:text-fg transition-colors flex items-center gap-1.5 group"
            >
              <span>Contact</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* ── Right Column: Portrait Photograph (Clean, static, theme-aware background) ── */}
        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] max-h-[620px] overflow-hidden rounded-2xl border border-border/80 shadow-2xl bg-bg-elevated/40">
            <img
              src="/shubham.png"
              alt="Shubham — Digital Marketing Executive"
              fetchPriority="high"
              loading="eager"
              className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
            {/* Subtle gradient vignette at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg via-bg/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-fg/90 bg-bg/85 backdrop-blur-md border border-border/60 px-3 py-2 rounded-lg shadow-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open to Opportunities</span>
              </span>
              <span className="text-fg-subtle">Faridabad, Haryana, IN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
