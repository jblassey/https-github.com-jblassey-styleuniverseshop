/**
 * Shared quantity control — used on the product page, in Quick Add, and
 * on the cart page/drawer. Never goes below `min`, never exceeds `max`
 * (the product's current stock); the + button disables at the ceiling
 * and shows a plain-language note instead of silently doing nothing.
 */
export default function QuantityStepper({
  value,
  onChange,
  max = 10,
  min = 1,
  label = 'Quantity',
  itemName = '',
  compact = false,
}) {
  const boxSize = compact ? 'w-8 h-8' : 'w-10 h-10';
  const trackWidth = compact ? 'w-8' : 'w-10';
  const atMax = value >= max;

  return (
    <div>
      {label && <span className="text-label mb-3 block">{label}</span>}
      <div className="inline-flex items-center border border-grey-200">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={itemName ? `Decrease quantity of ${itemName}` : 'Decrease quantity'}
          className={`${boxSize} flex items-center justify-center hover:bg-grey-50 transition-colors`}
        >
          −
        </button>
        <span className={`${trackWidth} text-center text-sm`} aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => !atMax && onChange(Math.min(max, value + 1))}
          aria-label={itemName ? `Increase quantity of ${itemName}` : 'Increase quantity'}
          disabled={atMax}
          className={`${boxSize} flex items-center justify-center hover:bg-grey-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          +
        </button>
      </div>
      {atMax && <p className="text-body-sm mt-2">Only {max} in stock.</p>}
    </div>
  );
}
