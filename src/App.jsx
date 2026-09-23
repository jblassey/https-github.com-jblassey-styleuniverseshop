import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import LoadingState from './components/ui/LoadingState.jsx';
import Home from './pages/Home.jsx';

/**
 * Every page except Home is code-split (React.lazy) so the initial
 * bundle a customer downloads is just the homepage + shared chrome —
 * meaningful on the slower mobile connections much of the Ghanaian
 * customer base will be browsing on. Home stays eager since it's the
 * page almost everyone lands on first, so there's nothing to gain by
 * splitting it (and it avoids a loading flash on the very first paint).
 */
const Shop = lazy(() => import('./pages/Shop.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const SizeGuide = lazy(() => import('./pages/SizeGuide.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Delivery = lazy(() => import('./pages/Delivery.jsx'));
const Returns = lazy(() => import('./pages/Returns.jsx'));
const FAQs = lazy(() => import('./pages/FAQs.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const SUPassport = lazy(() => import('./pages/SUPassport.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <Suspense fallback={<LoadingState label="Loading" className="min-h-[60vh]" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/su-passport" element={<SUPassport />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
