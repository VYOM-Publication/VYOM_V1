import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

const RESOURCES = [
  { label: 'Book Catalogue',  href: '/books' },
  { label: 'Blogs',           href: '/blogs' },
  { label: 'Guidelines',      href: '/guidelines' },
  { label: 'Achievements',    href: '/achievements' },
];

const INSTITUTIONAL = [
  { label: 'Institutional Access', href: '/contact' },
  { label: 'Contact Us',           href: '/contact' },
  { label: 'Privacy Policy',       href: '/privacy' },
  { label: 'Terms of Service',     href: '/terms' },
];

const year = new Date().getFullYear();

/**
 * Shared footer used by all public-facing pages via the (public) layout.
 * Single source of truth — replaces all previously duplicated inline footers.
 */
export default function PublicFooter() {
  return (
    <footer className="bg-ivory border-t border-sand/40 px-6 pt-16 pb-8 mt-auto">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

        {/* Brand */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <Image src="/vyom-logo.png" alt="VYOM Publications" width={36} height={36} className="object-contain" />
            <span className="font-display text-lg font-bold text-forest-green tracking-wide">VYOM PUBLICATIONS</span>
          </div>
          <p className="text-sm text-forest-green/60 leading-relaxed">
            Vision for Young &amp; Optimistic Minds. A quiet, exacting home for authors,
            researchers, and readers.
          </p>
        </div>

        {/* Editorial Office */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-forest-green mb-1">Editorial Office</h3>
          <p className="text-sm text-forest-green/60 leading-relaxed">
            Yashwanta Nagar, Talegaon Dabhade,<br />
            Pune, Maharashtra, India 410506
          </p>
          <a
            href="mailto:ORGANIZATIONVYOM@gmail.com"
            className="flex items-center gap-2 text-sm text-forest-green/60 hover:text-ochre transition-colors"
          >
            <Mail className="h-4 w-4 shrink-0" /> ORGANIZATIONVYOM@gmail.com
          </a>
          <a
            href="tel:+919325349303"
            className="flex items-center gap-2 text-sm text-forest-green/60 hover:text-ochre transition-colors"
          >
            <Phone className="h-4 w-4 shrink-0" /> 9325349303, 9021581421
          </a>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-base font-bold text-forest-green mb-4">Resources</h3>
          <ul className="flex flex-col gap-3">
            {RESOURCES.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-sm text-forest-green/60 hover:text-ochre transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Institutional */}
        <div>
          <h3 className="text-base font-bold text-forest-green mb-4">Institutional</h3>
          <ul className="flex flex-col gap-3">
            {INSTITUTIONAL.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-sm text-forest-green/60 hover:text-ochre transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sand/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-forest-green/40">© {year} VYOM Publication. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="VYOM Publication on X / Twitter" className="text-forest-green/40 hover:text-ochre transition-colors">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="VYOM Publication on Instagram" className="text-forest-green/40 hover:text-ochre transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="VYOM Publication on LinkedIn" className="text-forest-green/40 hover:text-ochre transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="https://vyompublication.com" target="_blank" rel="noopener noreferrer" aria-label="VYOM Publication website" className="text-forest-green/40 hover:text-ochre transition-colors">
            <Globe className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
