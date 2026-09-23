import useInView from '../../hooks/useInView.js';

/**
 * Wraps a section so it fades/slides in once scrolled into view.
 * Subtle by design (small translate, 700ms ease-out) and fully inert
 * for prefers-reduced-motion users (handled globally in index.css).
 */
export default function Reveal({ children, className = '', as: Tag = 'div', delay = 0 }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
