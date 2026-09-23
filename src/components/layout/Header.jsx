import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';
import IconButton from '../ui/IconButton.jsx';
import MobileMenu from './MobileMenu.jsx';
import SearchOverlay from './SearchOverlay.jsx';
import useScrolled from '../../hooks/useScrolled.js';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import site from '../../config/site.js';

/**
 * Site header: hamburger + centered logo + search/cart on mobile;
 * logo + center nav + search/account/wishlist/cart on desktop (md+).
 * Sticky, with a subtle shadow/height transition once the page scrolls.
 * Cart/wishlist badges reflect the real localStorage-backed counts.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const scrolled = useScrolled();
  const { count: cartCount, openDrawer } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur border-b transition-shadow duration-300 ${
        scrolled ? 'border-grey-100 shadow-sm' : 'border-transparent'
      }`}
    >
      <div
        className={`container-page relative flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-[60px]' : 'h-[72px]'
        }`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="md:hidden w-10 h-10 -ml-2 flex items-center justify-center text-black"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <line x1="2" y1="5.5" x2="18" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="14.5" x2="18" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0">
          <Logo />
        </div>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {site.nav.primary.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-sm font-medium tracking-wide text-grey-500 hover:text-black transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <IconButton
            label={searchOpen ? 'Close search' : 'Search'}
            onClick={() => setSearchOpen((s) => !s)}
            aria-expanded={searchOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13.5" y1="13.5" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </IconButton>

          <div className="hidden md:flex items-center gap-1">
            <IconButton label="Account" to="/account">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="6.5" r="3.25" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M3.5 17c1.2-3.2 4-4.5 6.5-4.5s5.3 1.3 6.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </IconButton>
            <IconButton label="Wishlist" to="/wishlist" badge={wishlistCount}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M10 17S3 12.6 3 7.8C3 5.4 4.9 3.5 7.2 3.5c1.4 0 2.6.7 3.3 1.8.7-1.1 1.9-1.8 3.3-1.8C16.1 3.5 18 5.4 18 7.8 18 12.6 10 17 10 17Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          </div>

          <IconButton label="Cart" onClick={openDrawer} badge={cartCount}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 7h10l-.8 8.2a1.5 1.5 0 0 1-1.5 1.3H7.3a1.5 1.5 0 0 1-1.5-1.3L5 7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </IconButton>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
