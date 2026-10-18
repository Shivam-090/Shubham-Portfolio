import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Code2, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    phase: 'Audit & Intent',
    title: 'Analyze',
    icon: Target,
    description:
      'Conducting technical SEO audits, keyword intent mapping, competitor research, and crawl diagnostics to establish a robust organic and paid foundation.',
    tags: ['Technical SEO Audit', 'Keyword Intent', 'Competitor Insights'],
  },
  {
    number: '02',
    phase: 'Campaign & On-Page',
    title: 'Execute',
    icon: Code2,
    description:
      'Architecting Google & Meta ad campaigns, crafting optimized meta tags, managing GMB local search, and coordinating directly with web developers.',
    tags: ['Google & Meta Ads', 'Meta Tag Architecture', 'Local SEO / GMB'],
  },
  {
    number: '03',
    phase: 'Analytics & Scale',
    title: 'Scale',
    icon: Rocket,
    description:
      'Continuously analyzing Google Analytics (GA4) and Search Console metrics, refining budget allocation, and iterating campaigns for maximum ROI.',
    tags: ['GA4 & Search Console', 'Budget Allocation', 'Measurable Growth'],
  },
];

export default function HowIWork() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from('.hiw-header', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });

      // Animate cards reliably with trigger on section container
      gsap.fromTo(
        '.hiw-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="how-i-work"
      className="py-24 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-border"
    >
      {/* ── Section Header ── */}
      <div className="hiw-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>

          <h2
            className="font-display font-bold tracking-tight text-fg"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            How I Work
          </h2>
        </div>
        <p className="text-sm text-fg-muted max-w-sm md:text-right">
          A data-driven, conversion-focused marketing methodology from audience discovery to measurable ROI.
        </p>
      </div>

      {/* ── 3-Card Process Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="hiw-card flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-border bg-bg-elevated/40 hover:border-fg-muted/40 transition-all duration-300 group"
            >
              <div>
                {/* Top Row: Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono tracking-widest text-fg-subtle border border-border px-2 py-0.5 rounded">
                    {step.number} / {step.phase}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-bg border border-border flex items-center justify-center text-fg group-hover:border-fg/40 transition-colors">
                    <Icon className="w-5 h-5 text-fg-muted group-hover:text-fg transition-colors" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-fg mb-3 tracking-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-fg-muted text-sm sm:text-base leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md border border-border/80 bg-bg text-fg-subtle group-hover:text-fg-muted transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
