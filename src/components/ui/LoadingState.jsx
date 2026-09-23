/**
 * Standard loading indicator for async content (product grids, cart
 * totals, etc. in later stages). Keeps a single consistent pattern
 * instead of ad hoc spinners per feature.
 */
export default function LoadingState({ label = 'Loading', className = '' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 py-16 text-grey-500 ${className}`}
    >
      <span className="w-6 h-6 border-2 border-grey-200 border-t-black rounded-full animate-spin" />
      <span className="text-body-sm">{label}&hellip;</span>
    </div>
  );
}
