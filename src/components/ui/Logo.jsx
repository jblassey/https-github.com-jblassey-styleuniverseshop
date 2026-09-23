import { Link } from 'react-router-dom';
import site from '../../config/site.js';

/**
 * Temporary text-based logo system.
 *
 * This is intentionally the ONLY place the brand name/mark is drawn as
 * styled text. When a final logo image exists, swap the markup inside
 * the two variants below for an <img>/<svg> — every place that renders
 * the logo (header, footer, loading state, 404, etc.) imports this
 * component, so nothing else needs to change.
 *
 * variant="wordmark" -> "STYLE UNIVERSE" full lockup (default)
 * variant="mark"      -> "SU" monogram only, for tight spaces
 * tone="dark"          -> dark text/border, for light backgrounds (default)
 * tone="light"         -> white text/border, for dark backgrounds (e.g. footer)
 */
export default function Logo({ variant = 'wordmark', size = 'md', tone = 'dark', to = '/', className = '' }) {
  const sizes = {
    sm: variant === 'mark' ? 'text-lg' : 'text-sm',
    md: variant === 'mark' ? 'text-2xl' : 'text-lg',
    lg: variant === 'mark' ? 'text-4xl' : 'text-2xl',
  };

  const isDark = tone === 'dark';
  const textColor = isDark ? 'text-black' : 'text-white';
  const borderColor = isDark ? 'border-black' : 'border-white';

  const content =
    variant === 'mark' ? (
      <span
        className={`font-display font-bold tracking-tight ${sizes[size]} inline-flex items-center justify-center border ${borderColor} rounded-full aspect-square leading-none w-[1.8em] h-[1.8em] ${className}`}
        aria-hidden="true"
      >
        {site.brand.shortName}
      </span>
    ) : (
      <span
        className={`font-display font-bold tracking-widest uppercase ${sizes[size]} ${className}`}
      >
        {site.brand.name}
      </span>
    );

  return (
    <Link
      to={to}
      aria-label={`${site.brand.name} — home`}
      className={`inline-flex items-center ${textColor} hover:opacity-80 transition-opacity`}
    >
      {content}
    </Link>
  );
}
