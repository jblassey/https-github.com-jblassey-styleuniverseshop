/**
 * Consistent heading block for page/section intros: an optional small
 * label, the heading itself, and an optional supporting line.
 *
 * `level` controls which heading tag is rendered ("h1" or "h2") without
 * changing its visual size — every page should have exactly one h1;
 * pass level="h1" on a page's primary SectionHeading (usually the only
 * one on the page) and leave nested/secondary ones at the h2 default.
 */
export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  level = 'h2',
  className = '',
}) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const Heading = level === 'h1' ? 'h1' : 'h2';

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {label && <span className="text-label">{label}</span>}
      {title && <Heading className="text-h2">{title}</Heading>}
      {description && <p className="text-body max-w-prose">{description}</p>}
    </div>
  );
}
