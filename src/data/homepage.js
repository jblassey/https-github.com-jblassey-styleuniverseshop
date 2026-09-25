/**
 * Homepage section content, kept separate from src/config/site.js so
 * brand-wide settings stay distinct from page-specific copy/imagery.
 * Every `imageLabel` here drives a PlaceholderImage — swap the relevant
 * component's PlaceholderImage for a real <img> once photography exists,
 * the data shape does not need to change.
 */

export const hero = {
  eyebrow: 'Style Universe',
  headline: ['Find Your Style.', 'Find Your Fit.'],
  subtext:
    "Quality men's fashion built around style, fit, and the sizes that are harder to find.",
  primaryCta: { label: 'Shop Shoes', to: '/shop?category=shoes' },
  secondaryCta: { label: 'Shop Clothing', to: '/shop?category=clothing' },
  imageLabel: 'Hero \u2014 replace with campaign photography',
};

export const categories = [
  {
  id: 'shoes',
  title: 'Shoes',
  copy: 'Step into your next look.',
  ctaLabel: 'Shop Shoes',
  to: '/shop?category=shoes',
  imageLabel: 'Jordan 3 Brown',
  image: '/images/jordan 3 brown.webp',
},
  {
    id: 'clothing',
    title: 'Clothing',
    copy: 'Built for everyday expression.',
    ctaLabel: 'Shop Clothing',
    to: '/shop?category=clothing',
    imageLabel: '/images/pants.webp',
  },
  {
    id: 'big-tall',
    title: 'Big & Tall',
    copy: 'More sizes. More style.',
    ctaLabel: 'Shop Big & Tall',
    to: '/shop?category=big-tall',
    imageLabel: 'Big & Tall',
  },
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    copy: 'Fresh pieces have entered the Universe.',
    ctaLabel: 'Shop New Arrivals',
    to: '/shop?collection=new-arrivals',
    imageLabel: '/images/asics-silver.webp'
  },
];

export const sizeFeature = {
  headline: 'Your Size Shouldn\u2019t Limit Your Style.',
  copy:
    'Finding your size shouldn\u2019t mean settling for less. Style Universe brings quality men\u2019s fashion to sizes that are often difficult to find.',
  ctaLabel: 'Shop Your Size',
  to: '/shop?category=big-tall',
};

export const editorial = {
  eyebrow: 'The Style Universe Edit',
  headline: 'Your Style. Your Fit. Your Universe.',
  copy:
    'From everyday essentials to statement pieces, discover a collection designed to give you more ways to express yourself.',
  ctaLabel: 'Explore The Edit',
  to: '/shop?collection=new-arrivals',
  imageLabel: 'Editorial \u2014 replace with lookbook photography',
};

export const look = {
  eyebrow: 'Build The Look',
  copy: 'Good style is about more than one piece.',
  ctaLabel: 'Shop The Look',
  to: '/shop',
  pieces: [
    { label: 'Sneaker', imageLabel: 'Sneaker' },
    { label: 'Oversized Tee', imageLabel: 'Oversized Tee' },
    { label: 'Joggers', imageLabel: 'Joggers' },
  ],
};

export const brandStory = {
  headline: 'Welcome To Your Universe.',
  paragraphs: [
    'Style Universe was created around a simple idea: finding clothes and shoes that fit shouldn\u2019t be difficult.',
    'We bring together quality men\u2019s fashion with a focus on personal style, comfort, and hard-to-find sizes.',
    'Because your size shouldn\u2019t decide how good you can look.',
  ],
  ctaLabel: 'Our Story',
  to: '/about',
  imageLabel: 'Brand Story',
};

export const suPassport = {
  eyebrow: 'Your Style Journey Starts Here.',
  name: 'SU Passport',
  copy: 'Earn rewards, unlock exclusive offers and get early access to new drops.',
  benefits: [
    { title: 'Earn', copy: 'Collect points when you shop.' },
    { title: 'Unlock', copy: 'Access exclusive rewards.' },
    { title: 'Discover', copy: 'Get early access to new releases.' },
  ],
  ctaLabel: 'Discover SU Passport',
  to: '/su-passport',
};

export const socialSection = {
  eyebrow: 'Follow The Universe',
  copy: 'See what\u2019s happening inside Style Universe.',
  gridCount: 6,
};

export const newsletter = {
  headline: 'Enter The Universe.',
  copy: 'Be the first to know about new drops, exclusive offers and limited releases.',
  ctaLabel: 'Join The Universe',
};
