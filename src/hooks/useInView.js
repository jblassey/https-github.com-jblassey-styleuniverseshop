import { useEffect, useRef, useState } from 'react';

/**
 * Reports whether the element it's attached to has scrolled into view.
 * Backs the Reveal component's fade-in-on-scroll effect. Fires once
 * (disconnects after the first intersection) since sections should not
 * re-animate every time the user scrolls past them again.
 */
export default function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options || { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}
