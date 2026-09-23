import { Link } from 'react-router-dom';

/**
 * `items` = [{ label, to }, ...] — the last item renders as plain text
 * (current page), everything before it is a link. Wraps on small
 * screens instead of overflowing.
 */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-grey-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isLast || !item.to ? (
                <span className={isLast ? 'text-black' : ''} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-black transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
