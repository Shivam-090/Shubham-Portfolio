import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ArrowUpRight,
  Download,
  MessageCircle,
} from 'lucide-react';

export default function ClosingCTA() {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = (text, itemKey) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedItem(itemKey);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-6 md:px-10 max-w-6xl mx-auto border-t border-border"
    >
      {/* ── Section Heading & Description ── */}
      <div className="mb-10 text-left max-w-3xl">
        <h2 className="font-display font-bold tracking-tight text-fg mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15 }}>
          Ready to accelerate growth?
          <span className="block text-fg-muted font-normal text-lg sm:text-2xl mt-1.5">
            Let&rsquo;s start a conversation.
          </span>
        </h2>

        <p className="text-fg-muted text-sm sm:text-base leading-relaxed max-w-2xl">
          I&rsquo;m currently seeking digital marketing roles, performance advertising campaigns, and growth opportunities. Whether you need to scale Google &amp; Meta ad campaigns, elevate SEO rankings, or build high-converting web pages — feel free to reach out directly through any channel below:
        </p>
      </div>

      {/* ── Main Contact Grid (Compact 2-Column) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Email Box */}
        <div className="p-4 sm:p-5 rounded-xl border border-border bg-bg-elevated/40 hover:border-fg-muted/40 transition-colors flex flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center text-fg shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-fg-subtle">
                  Email
                </p>
                <p className="text-base sm:text-lg font-semibold text-fg select-all break-all">
                  Shubhamumrao090@gmail.com
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase text-fg-subtle border border-border px-1.5 py-0.5 rounded shrink-0">
              Primary
            </span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <a
              href="mailto:Shubhamumrao090@gmail.com"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-bg bg-fg hover:bg-fg/90 transition-colors"
            >
              <span>Send Email</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              onClick={() => copyToClipboard('Shubhamumrao090@gmail.com', 'email')}
              title="Copy Email"
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-bg hover:border-fg-muted text-fg transition-colors"
            >
              {copiedItem === 'email' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent text-[11px] font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-fg-muted" />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Phone / WhatsApp Box */}
        <div className="p-4 sm:p-5 rounded-xl border border-border bg-bg-elevated/40 hover:border-fg-muted/40 transition-colors flex flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-bg border border-border flex items-center justify-center text-fg shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-fg-subtle">
                  Phone &amp; WhatsApp
                </p>
                <p className="text-base sm:text-lg font-semibold text-fg select-all">
                  +91 9910278567
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase text-fg-subtle border border-border px-1.5 py-0.5 rounded shrink-0">
              Voice / Chat
            </span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <a
              href="tel:+919910278567"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-bg bg-fg hover:bg-fg/90 transition-colors"
            >
              <span>Call</span>
            </a>
            <a
              href="https://wa.me/919910278567?text=Hi%20Shubham,%20I%20saw%20your%20portfolio!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-bg hover:border-fg-muted text-fg transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-accent" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => copyToClipboard('+919910278567', 'phone')}
              title="Copy Phone"
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-bg hover:border-fg-muted text-fg transition-colors"
            >
              {copiedItem === 'phone' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent text-[11px] font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-fg-muted" />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Secondary Details: Location, Socials, Resume (Single Row) ── */}
      <div className="p-4 sm:p-5 rounded-xl border border-border bg-bg-elevated/40 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Location & availability */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="w-9 h-9 rounded-lg bg-bg border border-border flex items-center justify-center text-fg shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-fg flex items-center gap-2">
              <span>Faridabad, Haryana, India</span>
              <span className="text-[10px] font-mono text-fg-subtle border border-border px-1.5 py-0.2 rounded">
                IST (UTC+5:30)
              </span>
            </p>
            <p className="text-[11px] text-fg-muted">
              Open to Opportunities · Remote &amp; On-site · English &amp; Hindi
            </p>
          </div>
        </div>

        {/* Links & Resume */}
        <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 w-full md:w-auto">


          {/* GitHub CodeSandbox-ui */}
          <a
            href="https://github.com/CodeSandbox-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-bg hover:border-fg-muted text-xs font-medium text-fg-muted hover:text-fg transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          {/* Resume PDF */}
          <a
            href="/Shubham Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-bg bg-fg hover:bg-fg/90 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume (PDF)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
