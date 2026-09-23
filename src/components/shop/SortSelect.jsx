const OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
];

export default function SortSelect({ value, onChange, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <label htmlFor="sort-select" className="text-body-sm whitespace-nowrap">
        Sort by
      </label>
      <select
        id="sort-select"
        value={value || 'featured'}
        onChange={(e) => onChange(e.target.value)}
        className="border border-grey-200 px-3 py-2 text-sm bg-white focus-visible:outline-black"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
