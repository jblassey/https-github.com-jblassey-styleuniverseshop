/**
 * Central brand & site configuration.
 *
 * Change values here — not inside individual components — to update brand
 * information across the whole site. Every component that needs brand
 * copy, contact details, currency, navigation, or social links should
 * import from this file rather than hardcoding strings.
 */

export const site = {
  brand: {
    name: 'Style Universe',
    shortName: 'SU',
    tagline: 'Find Your Style. Find Your Fit.',
    description:
      "Style Universe is a men's fashion destination that helps customers discover quality clothing and footwear that matches their personal style and fits their body, including hard-to-find sizes.",
    mission:
      'Make it easier for men to find quality fashion that matches their style and fits their body.',
  },

  seo: {
    defaultTitle: 'Style Universe Ghana | Find Your Style. Find Your Fit.',
    titleTemplate: '%s | Style Universe',
    defaultDescription:
      "Style Universe is a men's fashion destination in Ghana offering quality shoes and clothing with a focus on style, fit and hard-to-find sizes.",
    siteUrl: 'https://styleuniverse.gh',
    ogImage: '/og-image.jpg',
    locale: 'en_GH',
  },

  currency: {
    code: 'GHS',
    symbol: 'GH\u20B5',
  },

  contact: {
    // Placeholder only — replace with the real business WhatsApp number.
    // Format: country code + number, no spaces, no leading "+".
    whatsappNumber: '233XXXXXXXXX',
    email: 'hello@styleuniverse.gh',
  },

  social: {
    instagram: 'https://instagram.com/styleuniverseghana',
    tiktok: 'https://tiktok.com/@styleuniverseghana',
    facebook: 'https://facebook.com/styleuniverseghana',
    twitter: '',
    whatsappChannel: '',
  },

  delivery: {
    // High-level, non-binding placeholders for Part 1/2. Refine with real
    // delivery zones, fees and timelines in a later stage.
    regionsServed: 'Nationwide within Ghana',
    estimatedTime: '2-5 business days within Accra, longer outside Accra',
    note: 'Delivery fees and timelines will be confirmed at checkout.',
  },

  sizing: {
    shoeSizes: ['EU 45', 'EU 46', 'EU 47'],
    shoeSizesShort: ['45', '46', '47'],
    clothingSizes: ['XL', '2XL', '3XL', '4XL'],
  },

  announcement: {
    enabled: true,
    text: 'WELCOME TO STYLE UNIVERSE \u2022 FIND YOUR STYLE. FIND YOUR FIT.',
  },

  nav: {
    // Primary desktop nav + mobile menu top section.
    primary: [
      { label: 'New Arrivals', to: '/shop?collection=new-arrivals' },
      { label: 'Shoes', to: '/shop?category=shoes' },
      { label: 'Clothing', to: '/shop?category=clothing' },
      { label: 'Big & Tall', to: '/shop?category=big-tall' },
      { label: 'Collections', to: '/shop?category=collections' },
    ],
    // Extra links shown only in the mobile menu, below the primary list.
    mobileSecondary: [
      { label: 'About', to: '/about' },
      { label: 'Size Guide', to: '/size-guide' },
      { label: 'Contact', to: '/contact' },
    ],
  },

  footerNav: {
    shop: [
      { label: 'New Arrivals', to: '/shop?collection=new-arrivals' },
      { label: 'Shoes', to: '/shop?category=shoes' },
      { label: 'Clothing', to: '/shop?category=clothing' },
      { label: 'Big & Tall', to: '/shop?category=big-tall' },
      { label: 'Collections', to: '/shop?category=collections' },
    ],
    help: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Delivery', to: '/delivery' },
      { label: 'Returns', to: '/returns' },
      { label: 'Size Guide', to: '/size-guide' },
      { label: 'FAQs', to: '/faqs' },
    ],
    legal: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms' },
    ],
  },
};

export default site;
