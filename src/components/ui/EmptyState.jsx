/**
 * Standard "nothing here yet" pattern for empty carts, empty search
 * results, empty wishlists, etc. Treats emptiness as an invitation to
 * act rather than a dead end.
 *
 * `titleAs` controls the title's tag ("p" by default). Pass "h1" when
 * this EmptyState is the only content on the page (e.g. an empty-cart
 * checkout gate) so the page still has exactly one h1; leave it at the
 * default when a SectionHeading elsewhere on the page already owns the
 * h1 (e.g. the shop's "nothing found" state).
 */
export default function EmptyState({ title, description, action, className = '', titleAs = 'p' }) {
  const Title = titleAs;

  return (
    <div className={`flex flex-col items-center justify-center text-center gap-4 py-20 px-6 ${className}`}>
      {title && <Title className="text-h3">{title}</Title>}
      {description && <p className="text-body max-w-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
