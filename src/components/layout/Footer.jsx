import { Link } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';
import Container from '../ui/Container.jsx';
import site from '../../config/site.js';

function FooterColumn({ heading, links }) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-widest uppercase text-grey-400 mb-4">{heading}</p>
      <ul className="flex flex-col gap-3 text-sm">
        {links.map((link) =>
          link.external ? (
            <li key={link.label}>
              <a
                href={link.to}
                target="_blank"
                rel="noreferrer"
                className="text-grey-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <Link to={link.to} className="text-grey-300 hover:text-white transition-colors">
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    { heading: 'Shop', links: site.footerNav.shop },
    { heading: 'Help', links: site.footerNav.help },
    {
      heading: 'About',
      links: [
        { label: 'Our Story', to: '/about' },
        { label: 'SU Passport', to: '/su-passport' },
        { label: 'Instagram', to: site.social.instagram, external: true },
        { label: 'TikTok', to: site.social.tiktok, external: true },
      ],
    },
    { heading: 'Legal', links: site.footerNav.legal },
  ];

  return (
    <footer className="bg-black text-white mt-30">
      <Container className="py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12">
          <div className="col-span-2 lg:col-span-2">
            <Logo tone="light" />
            <p className="text-grey-400 text-sm mt-4 max-w-xs">{site.brand.tagline}</p>
          </div>

          {columns.map((col) => (
            <FooterColumn key={col.heading} heading={col.heading} links={col.links} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-16 pt-8 border-t border-charcoal-light">
          <p className="text-grey-400 text-sm">
            &copy; {year} {site.brand.name}. All Rights Reserved.
          </p>
          <p className="text-grey-400 text-sm">{site.delivery.regionsServed}</p>
        </div>
      </Container>
    </footer>
  );
}
