import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import Button from '../components/ui/Button.jsx';
import PlaceholderImage from '../components/ui/PlaceholderImage.jsx';
import QuantityStepper from '../components/product/QuantityStepper.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatPrice } from '../utils/format.js';

/**
 * Full cart page — same CartContext as the drawer, Quick Add and the
 * product page, so nothing here can drift out of sync with them. The
 * actual checkout/payment flow is built in a later stage; "Proceed to
 * Checkout" hands off to the existing Checkout placeholder.
 */
export default function Cart() {
  const { items, subtotal, updateQuantity, remove } = useCart();
  const { showToast } = useToast();

  const handleRemove = (item) => {
    remove(item.productId, item.size, item.color);
    showToast('Removed from Cart', item.name);
  };

  return (
    <>
      <SEO title="Cart" description="Your Style Universe shopping cart." noIndex />
      <Container className="py-12 sm:py-16">
        <SectionHeading label="Cart" title="Your Cart" level="h1" />

        {items.length === 0 ? (
          <EmptyState
            className="mt-8 border border-grey-100"
            title="Your Cart Is Empty"
            description="Looks like your Universe needs a little something."
            action={<Button to="/shop?collection=new-arrivals">Explore New Arrivals</Button>}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 mt-10">
              <ul className="flex flex-col divide-y divide-grey-100">
                {items.map((item) => (
                  <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-6 first:pt-0">
                    <Link to={`/product/${item.slug}`} className="w-24 flex-shrink-0">
                      <PlaceholderImage label={item.imageLabel} ratio="4 / 5" tone="light" />
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            to={`/product/${item.slug}`}
                            className="text-sm font-semibold hover:opacity-60 transition-opacity"
                          >
                            {item.name}
                          </Link>
                          <p className="text-body-sm mt-1">
                            {item.size}
                            {item.color ? ` \u00b7 ${item.color}` : ''}
                          </p>
                        </div>
                        <p className="text-price flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4">
                        <QuantityStepper
                          value={item.quantity}
                          max={item.stock}
                          onChange={(q) => updateQuantity(item.productId, item.size, item.color, q)}
                          itemName={item.name}
                          label=""
                          compact
                        />

                        <button
                          type="button"
                          onClick={() => handleRemove(item)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="text-body-sm underline hover:no-underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border border-grey-100 p-6 h-fit">
                <p className="text-label mb-4">Order Summary</p>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span>Delivery</span>
                  <span className="text-body-sm">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-4 border-t border-grey-100 mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <Button to="/checkout" size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </div>

            <div className="mt-10">
              <Button to="/shop" variant="ghost" size="md">
                &larr; Continue Shopping
              </Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
