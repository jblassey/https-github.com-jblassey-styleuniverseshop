import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { CartProvider } from '../../context/CartContext.jsx';
import { WishlistProvider } from '../../context/WishlistContext.jsx';
import { ToastProvider } from '../../context/ToastContext.jsx';
import { QuickAddProvider } from '../../context/QuickAddContext.jsx';
import QuickAddModal from '../product/QuickAddModal.jsx';
import CartDrawer from '../cart/CartDrawer.jsx';

export default function Layout() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <QuickAddProvider>
            <div className="min-h-screen flex flex-col">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-black focus:text-white focus:px-4 focus:py-2"
              >
                Skip to content
              </a>
              <AnnouncementBar />
              <Header />
              <main id="main-content" className="flex-1">
                <Outlet />
              </main>
              <Footer />
              <QuickAddModal />
              <CartDrawer />
            </div>
          </QuickAddProvider>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
