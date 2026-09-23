import { useState } from 'react';

/**
 * Expandable info sections (Description / Fit & Sizing / Delivery /
 * Returns). Built as a plain accessible disclosure list — each item
 * toggles independently, no external library needed.
 */
export default function ProductAccordion({ sections }) {
  const [openId, setOpenId] = useState(sections[0]?.id ?? null);

  return (
    <div className="border-t border-grey-100">
      {sections.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id} className="border-b border-grey-100">
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : section.id)}
                aria-expanded={isOpen}
                aria-controls={`accordion-${section.id}`}
                className="w-full flex items-center justify-between py-4 text-left text-sm font-semibold tracking-wide uppercase"
              >
                {section.title}
                <span
                  className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            {isOpen && (
              <div id={`accordion-${section.id}`} className="pb-4 text-body-sm max-w-prose">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
