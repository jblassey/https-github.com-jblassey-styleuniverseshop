import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import Container from '../components/ui/Container.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import PlaceholderImage from '../components/ui/PlaceholderImage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { GHANA_REGIONS, getDeliveryZoneForRegion } from '../config/delivery.js';
import { validateCheckoutForm, normalizeGhanaPhone } from '../utils/validation.js';
import { formatPrice } from '../utils/format.js';
import { initializePayment } from '../services/paymentService.js';
import { buildWhatsAppLink, cartOrderMessage } from '../utils/whatsapp.js';

const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  region: '',
  city: '',
  address: '',
  landmark: '',
  instructions: '',
};

export default function Checkout() {
  const { items, subtotal } = useCart();

  return (
    <>
      <SEO title="Checkout" description="Complete your Style Universe order." noIndex />
      {items.length === 0 ? <EmptyCheckout /> : <CheckoutForm items={items} subtotal={subtotal} />}
    </>
  );
}

function EmptyCheckout() {
  return (
    <Container className="py-16 sm:py-22">
      <EmptyState
        className="border border-grey-100"
        title="Your Cart Is Empty"
        titleAs="h1"
        description="Explore Style Universe and find your next fit."
        action={<Button to="/shop">Shop Now</Button>}
      />
    </Container>
  );
}

function CheckoutForm({ items, subtotal }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | processing
  const [submitError, setSubmitError] = useState('');

  const zone = form.region ? getDeliveryZoneForRegion(form.region) : null;
  const deliveryFee = zone ? zone.fee : 0;
  const total = subtotal + deliveryFee;

  const whatsappFallbackLink = useMemo(() => buildWhatsAppLink(cartOrderMessage(items)), [items]);

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateCheckoutForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstField = Object.keys(validationErrors)[0];
      document.getElementById(`field-${firstField}`)?.focus();
      return;
    }

    setStatus('processing');
    setSubmitError('');

    try {
      const callbackUrl = `${window.location.origin}/order-confirmation`;
      const result = await initializePayment({
        customer: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: normalizeGhanaPhone(form.phone),
        },
        delivery: {
          region: form.region,
          city: form.city.trim(),
          address: form.address.trim(),
          landmark: form.landmark.trim(),
          instructions: form.instructions.trim(),
        },
        items: items.map((item) => ({
          productId: item.productId,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        })),
        callbackUrl,
      });

      window.location.href = result.authorizationUrl;
    } catch (err) {
      setStatus('idle');
      setSubmitError(err.message || 'Could not start payment. Please try again.');
    }
  };

  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-8">
        <span className="text-label">Checkout</span>
        <h1 className="text-h1 mt-2">Ready to Enter the Universe?</h1>
        <p className="text-body mt-2">Your style. Your fit. Just a few details away.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          <div className="flex flex-col gap-10">
            <fieldset>
              <legend className="text-label mb-4">Customer Information</legend>
              <div className="flex flex-col gap-4">
                <Field
                  id="fullName"
                  label="Full Name"
                  required
                  value={form.fullName}
                  onChange={handleChange('fullName')}
                  error={errors.fullName}
                  autoComplete="name"
                />
                <Field
                  id="email"
                  label="Email Address"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange('phone')}
                  error={errors.phone}
                  placeholder="024 XXX XXXX"
                  autoComplete="tel"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-label mb-4">Delivery Information</legend>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="field-region" className="text-body-sm font-medium mb-1.5 block">
                    Region <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="field-region"
                    value={form.region}
                    onChange={handleChange('region')}
                    aria-invalid={Boolean(errors.region)}
                    aria-describedby={errors.region ? 'error-region' : undefined}
                    className={`w-full border px-4 py-3 text-sm bg-white focus-visible:outline-black ${
                      errors.region ? 'border-error' : 'border-grey-200'
                    }`}
                  >
                    <option value="">Select region</option>
                    {GHANA_REGIONS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  {errors.region && (
                    <p id="error-region" className="text-body-sm mt-1.5" role="alert" style={{ color: '#8C3B2E' }}>
                      {errors.region}
                    </p>
                  )}
                </div>

                <Field
                  id="city"
                  label="City / Town"
                  required
                  value={form.city}
                  onChange={handleChange('city')}
                  error={errors.city}
                  autoComplete="address-level2"
                />
                <Field
                  id="address"
                  label="Delivery Address"
                  required
                  value={form.address}
                  onChange={handleChange('address')}
                  error={errors.address}
                  autoComplete="street-address"
                  as="textarea"
                />
                <Field
                  id="landmark"
                  label="Landmark"
                  value={form.landmark}
                  onChange={handleChange('landmark')}
                  placeholder="e.g. Near Shell Filling Station"
                />
                <Field
                  id="instructions"
                  label="Additional Delivery Instructions"
                  value={form.instructions}
                  onChange={handleChange('instructions')}
                  as="textarea"
                />
              </div>
            </fieldset>

            <p className="text-body-sm">
              Prefer to order over WhatsApp instead?{' '}
              <a href={whatsappFallbackLink} target="_blank" rel="noreferrer" className="underline hover:no-underline">
                Chat with us
              </a>{' '}
              — this sends your cart, not a completed payment.
            </p>
          </div>

          <div className="lg:sticky lg:top-24 h-fit border border-grey-100 p-6">
            <p className="text-label mb-4">Order Summary</p>

            <ul className="flex flex-col gap-4 mb-5 max-h-72 overflow-y-auto">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                  <div className="w-14 flex-shrink-0">
                    <PlaceholderImage label={item.imageLabel} ratio="4 / 5" tone="light" />
                  </div>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold">{item.name}</p>
                      <p className="text-body-sm mt-0.5">
                        {item.size}
                        {item.color ? ` \u00b7 ${item.color}` : ''} &middot; Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-xs font-semibold flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 text-sm border-t border-grey-100 pt-4">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery fee</span>
                <span>{zone ? formatPrice(deliveryFee) : 'Select a region'}</span>
              </div>
              {zone && <p className="text-body-sm">Estimated delivery: {zone.estimatedDelivery}</p>}
              <div className="flex items-center justify-between pt-3 mt-1 border-t border-grey-100 font-semibold text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {submitError && (
              <p className="text-body-sm mt-4" role="alert" style={{ color: '#8C3B2E' }}>
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'processing'}
              className="text-button w-full mt-5 px-6 py-4 bg-black text-white hover:bg-charcoal transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'processing' ? 'Processing Payment...' : 'Pay Now'}
            </button>

            <p className="text-body-sm mt-3 text-center">Secure payment powered by Paystack.</p>

            <Link to="/cart" className="text-body-sm underline hover:no-underline mt-4 block text-center">
              Back to Cart
            </Link>
          </div>
        </div>
      </form>
    </Container>
  );
}

function Field({ id, label, required, error, as = 'input', ...rest }) {
  const Tag = as;
  return (
    <div>
      <label htmlFor={`field-${id}`} className="text-body-sm font-medium mb-1.5 block">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <Tag
        id={`field-${id}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `error-${id}` : undefined}
        rows={as === 'textarea' ? 3 : undefined}
        className={`w-full border px-4 py-3 text-sm focus-visible:outline-black ${
          error ? 'border-error' : 'border-grey-200'
        }`}
        {...rest}
      />
      {error && (
        <p id={`error-${id}`} className="text-body-sm mt-1.5" role="alert" style={{ color: '#8C3B2E' }}>
          {error}
        </p>
      )}
    </div>
  );
}
