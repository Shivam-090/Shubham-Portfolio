import { useRef, useCallback } from 'react';

/**
 * A wrapper that makes any element subtly follow the cursor when hovered.
 * Renders as <a> when `href` is provided, otherwise <button>.
 */
export default function MagneticButton({
  children,
  href,
  className = '',
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      if (!ref.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      ref.current.style.transition = 'transform 0.1s ease-out';
    },
    [strength],
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.25, 0.1, 0.25, 1)';
  }, []);

  const Tag = href ? 'a' : 'button';
  const externalProps =
    href && (href.startsWith('http') || href.endsWith('.pdf'))
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

  return (
    <Tag
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className}`}
      {...externalProps}
      {...props}
    >
      {children}
    </Tag>
  );
}
