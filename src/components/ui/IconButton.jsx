import { Link } from 'react-router-dom';

/**
 * Accessible icon-only control (cart, search, wishlist, etc.). Always
 * requires a label for screen readers since there is no visible text.
 * Renders a <Link> when `to` is passed, otherwise a native <button>.
 */
export default function IconButton({
  children,
  label,
  onClick,
  to,
  className = '',
  badge,
  type = 'button',
  ...rest
}) {
  const classes = `relative inline-flex items-center justify-center w-10 h-10 text-black hover:opacity-60 transition-opacity ${className}`;

  const content = (
    <>
      {children}
      {badge !== undefined && badge !== null && badge !== 0 && (
        <span
          className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-black text-white text-[10px] leading-4 text-center"
          aria-hidden="true"
        >
          {badge}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} aria-label={label} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={label} className={classes} {...rest}>
      {content}
    </button>
  );
}
