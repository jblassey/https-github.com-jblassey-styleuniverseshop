import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import site from '../../config/site.js';
import useFocusReturn from '../../hooks/useFocusReturn.js';

/**
 * Slide-in mobile navigation panel. Closes on: backdrop click, close
 * button, Escape key, or selecting a link. Locks body scroll while open
 * and moves focus to the close button so keyboard/screen-reader users
 * land somewhere sensible.
 */
export default function MobileMenu({ open, onClose }) {
  const closeRef = useRef(null);
  useFocusReturn(open);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const links = [...site.nav.primary, ...site.nav.mobileSecondary];

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        aria-label="Close menu"
        className={`absolute inset-0 w-full h-full bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute top-0 right-0 h-full w-[86%] max-w-xs bg-white shadow-lg flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-[64px] px-5 border-b border-grey-100 flex-shrink-0">
          <span className="text-label">Menu</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center text-black hover:opacity-60 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col gap-1">
            {links.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className="block py-3 text-lg font-display font-semibold tracking-tight text-charcoal border-b border-grey-100"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
