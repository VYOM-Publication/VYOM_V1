import Link from 'next/link';

const COLUMNS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Browse Books',    href: '/books' },
      { label: 'Our Journals',    href: '/editorial-board' },
      { label: 'Editorial Board', href: '/editorial-board' },
      { label: 'Achievements',    href: '/achievements' },
    ],
  },
  {
    heading: 'Authors',
    links: [
      { label: 'Submission Guidelines', href: '/guidelines' },
      { label: 'Publication Fee',       href: '/publication-fee' },
      { label: 'Publish With Us',       href: '/register?role=author' },
      { label: 'Author Dashboard',      href: '/author/dashboard' },
    ],
  },
  {
    heading: 'Readers',
    links: [
      { label: 'Member Dashboard', href: '/member/dashboard' },
      { label: 'Bookmarks', href: '/member/bookmarks' },
      { label: 'Downloads', href: '/member/downloads' },
      { label: 'Reading History', href: '/member/reading-history' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const SOCIALS = [
  { label: 'VYOM Publication on Facebook', href: '#', icon: 'F' },
  { label: 'VYOM Publication on Twitter', href: '#', icon: 'X' },
  { label: 'VYOM Publication on Instagram', href: '#', icon: 'In' },
  { label: 'VYOM Publication on LinkedIn', href: '#', icon: 'Li' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-green text-ivory/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-sub-heading font-bold text-gold mb-3">VYOM</p>
            <p className="text-caption leading-relaxed">
              Where meaningful ideas become lasting publications.
            </p>
            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory/20 text-metadata font-bold text-ivory/60 hover:border-gold hover:text-gold transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="mb-4 text-caption font-semibold uppercase tracking-widest text-gold">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-caption text-ivory/60 hover:text-ivory transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-ivory/10 pt-6 text-center text-metadata text-ivory/40">
          © {year} VYOM Publication. All rights reserved. · Talegaon Dabhade, Pune, Maharashtra 410506
        </div>
      </div>
    </footer>
  );
}
