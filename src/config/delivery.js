/**
 * GHANA DELIVERY CONFIGURATION — PLACEHOLDER PRICING
 * ----------------------------------------------------------------------
 * Style Universe has not finalized real delivery rates yet. The `fee`
 * values below (in GHS) are configurable placeholders, not confirmed
 * pricing — edit them here once real rates are set. Everything that
 * needs a delivery fee (the checkout page AND the Paystack amount
 * calculation in netlify/functions/initialize-payment.js) reads from
 * this single file, so this is the only place a price change is needed.
 *
 * `regions` lists which of Ghana's official regions map to this zone —
 * add more zones or move regions between them as real rates are set.
 */

export const GHANA_REGIONS = [
  'Greater Accra',
  'Ashanti',
  'Western',
  'Western North',
  'Central',
  'Eastern',
  'Volta',
  'Oti',
  'Northern',
  'Savannah',
  'North East',
  'Upper East',
  'Upper West',
  'Bono',
  'Bono East',
  'Ahafo',
];

export const deliveryZones = [
  {
    id: 'greater-accra',
    label: 'Accra / Tema / Greater Accra',
    regions: ['Greater Accra'],
    fee: 30,
    estimatedDelivery: '1-2 business days',
  },
  {
    id: 'other-regions',
    label: 'Other Regions (Ghana-wide)',
    regions: [],
    fee: 60,
    estimatedDelivery: '3-5 business days',
    isDefault: true,
  },
];

/** Looks up the delivery zone for a given region, falling back to the default (non-Greater-Accra) zone. */
export function getDeliveryZoneForRegion(region) {
  return (
    deliveryZones.find((zone) => zone.regions.includes(region)) ||
    deliveryZones.find((zone) => zone.isDefault) ||
    deliveryZones[0]
  );
}
