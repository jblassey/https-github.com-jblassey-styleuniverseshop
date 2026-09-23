import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import Button from '../components/ui/Button.jsx';
import LoadingState from '../components/ui/LoadingState.jsx';
import PlaceholderImage from '../components/ui/PlaceholderImage.jsx';
import { verifyPayment } from '../services/paymentService.js';
import { buildWhatsAppLink, orderSupportMessage } from '../utils/whatsapp.js';
import { formatPrice } from '../utils/format.js';
import { useCart } from '../context/CartContext.jsx';

/**
 * Lands here after Paystack redirects back (callback_url set at
 * initialize-payment time includes ?reference=...). Never trusts the
 * redirect itself as proof of payment — always calls verify-payment,
 * which checks with Paystack server-side, before showing success.
 */
export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const { clear } = useCart();
  const clearedRef = useRef(false);

  const [state, setState] = useState('loading'); // loading | success | failed | error
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!reference) {
      setState('error');
      setMessage('No payment reference was found.');
      return;
    }

    let cancelled = false;

    verifyPayment(reference)
      .then((data) => {
        if (cancelled) return;
        if (data.verified) {
          setOrder(data.order);
          setState('success');
          if (!clearedRef.current) {
            clearedRef.current = true;
            clear();
          }
        } else {
          setState('failed');
          setMessage(data.message || 'Payment was not completed.');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setState('error');
        setMessage(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [reference, clear]);

  return (
    <>
      <SEO title="Order Confirmation" description="Your Style Universe order confirmation." noIndex />
      <Container className="py-16 sm:py-22 max-w-2xl">
        {state === 'loading' && <LoadingState label="Confirming your payment" />}

        {state === 'error' && (
          <div className="text-center flex flex-col items-center gap-4">
            <span className="text-label">Verification</span>
            <h1 className="text-h1">We Couldn&rsquo;t Confirm Your Payment Yet</h1>
            <p className="text-body max-w-md">{message}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <a
                href={buildWhatsAppLink('Hello Style Universe, I need help confirming a payment I just made.')}
                target="_blank"
                rel="noreferrer"
                className="text-button inline-flex items-center justify-center px-7 py-3.5 bg-black text-white hover:bg-charcoal transition-colors"
              >
                Chat With Us on WhatsApp
              </a>
              <Button to="/" variant="secondary">
                Back to Home
              </Button>
            </div>
          </div>
        )}

        {state === 'failed' && (
          <div className="text-center flex flex-col items-center gap-4">
            <span className="text-label">Payment</span>
            <h1 className="text-h1">Payment Was Not Completed</h1>
            <p className="text-body max-w-md">
              Your order hasn&rsquo;t been placed — no charge was made. You can try again whenever you&rsquo;re ready.
            </p>
            <Button to="/checkout" size="lg" className="mt-4">
              Try Again
            </Button>
          </div>
        )}

        {state === 'success' && order && <OrderSuccess order={order} />}
      </Container>
    </>
  );
}

function OrderSuccess({ order }) {
  const whatsappLink = buildWhatsAppLink(orderSupportMessage(order.orderId));

  return (
    <div className="flex flex-col items-center text-center gap-3">
      <span className="text-label">Order Confirmed</span>
      <h1 className="text-h1">Thank You for Shopping With Style Universe.</h1>
      <p className="text-body-sm">
        Order <span className="font-semibold text-black">{order.orderId}</span>
      </p>

      <div className="w-full text-left border border-grey-100 mt-8">
        <div className="px-6 py-5 border-b border-grey-100">
          <p className="text-label mb-3">Items</p>
          <ul className="flex flex-col gap-4">
            {order.items.map((item) => (
              <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                <div className="w-16 flex-shrink-0">
                  <PlaceholderImage label={item.imageLabel} ratio="4 / 5" tone="light" />
                </div>
                <div className="flex-1 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-body-sm mt-1">
                      {item.size}
                      {item.color ? ` \u00b7 ${item.color}` : ''} &middot; Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-price flex-shrink-0">{formatPrice(item.lineTotal)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-5 border-b border-grey-100 flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery</span>
            <span>{formatPrice(order.deliveryFee)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-grey-100 font-semibold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
          <p className="text-body-sm mt-1">Payment status: Paid</p>
        </div>

        {order.customer && order.delivery && (
          <div className="px-6 py-5 text-sm">
            <p className="text-label mb-3">Delivery Information</p>
            <p>{order.customer.fullName}</p>
            <p className="text-body-sm mt-1">{order.customer.phone}</p>
            <p className="text-body-sm mt-3">
              {order.delivery.address}
              {order.delivery.landmark ? `, near ${order.delivery.landmark}` : ''}
            </p>
            <p className="text-body-sm">
              {order.delivery.city}, {order.delivery.region}
            </p>
            <p className="text-body-sm mt-1">Estimated delivery: {order.delivery.estimatedDelivery}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <Button to="/shop" size="lg">
          Continue Shopping
        </Button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="text-button inline-flex items-center justify-center px-9 py-4 border border-black hover:bg-black hover:text-white transition-colors"
        >
          Chat With Us on WhatsApp
        </a>
      </div>
    </div>
  );
}
