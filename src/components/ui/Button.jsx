import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-black text-white hover:bg-charcoal',
  secondary: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
  ghost: 'bg-transparent text-black hover:bg-grey-50',
};

const SIZES = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-sm',
};

/**
 * Shared Button. Renders a <Link> when `to` is passed, an <a> when `href`
 * is passed, otherwise a native <button>. Keeps a single consistent
 * look/interaction pattern (and one place to change it later) instead of
 * hand-styling buttons per page.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  disabled = false,
  type = 'button',
  ...rest
}) {
  const classes = `text-button inline-flex items-center justify-center gap-2 rounded-sm transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
