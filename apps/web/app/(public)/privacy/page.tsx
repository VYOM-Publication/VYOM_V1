import Link from 'next/link';
import { Mail } from 'lucide-react';

const SECTIONS = [
  { title: '1. Information We Collect', content: `We collect information you provide when you create an account, submit a manuscript, or contact us — including your name, email address, institutional affiliation, ORCID identifier, and payment information where applicable.\n\nWe also collect information automatically when you use our platform, including log data (IP address, browser type, pages visited) and usage analytics to improve our services.` },
  { title: '2. How We Use Your Information', content: `We use the information we collect to:\n• Provide, maintain, and improve our publication platform\n• Process manuscript submissions and manage the peer review workflow\n• Send transactional emails (submission confirmations, review assignments, editorial decisions)\n• Process payments for Article Processing Charges (APC)\n• Comply with legal obligations and enforce our terms of service\n• Detect and prevent fraudulent or abusive activity` },
  { title: '3. Information Sharing', content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with peer reviewers (anonymised where double-blind review applies), payment processors for APC transactions, and cloud infrastructure providers for hosting and storage. All third-party providers are contractually bound to protect your data.` },
  { title: '4. Data Retention', content: `We retain your personal data for as long as your account is active or as needed to provide services. Published articles and associated metadata are retained indefinitely as part of the scholarly record. You may request deletion of your account and personal data at any time, subject to our legal obligations.` },
  { title: '5. Cookies', content: `We use essential cookies to maintain your session and authentication state. We do not use third-party advertising cookies. You may disable cookies in your browser settings, but this may affect the functionality of the platform.` },
  { title: '6. Security', content: `We implement industry-standard security measures including TLS encryption for data in transit, bcrypt hashing for passwords, and JWT-based authentication with short-lived access tokens. Refresh tokens are stored as cryptographic hashes and rotated on every use.` },
  { title: '7. Your Rights', content: `Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data; object to or restrict processing; and data portability. To exercise these rights, contact us at ORGANIZATIONVYOM@gmail.com. We will respond within 30 days.` },
  { title: '8. Changes to This Policy', content: `We may update this Privacy Policy from time to time. We will notify registered users of material changes by email. Continued use of the platform after changes constitutes acceptance of the updated policy.` },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-ivory py-20 px-6 text-center border-b border-sand/30">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-5">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Legal</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-5xl font-bold text-forest-green leading-tight">Privacy Policy</h1>
          <p className="text-sm text-forest-green/50">Last updated: 1 July 2025</p>
        </div>
      </section>

      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl flex flex-col gap-10">
          <p className="text-base text-forest-green/70 leading-relaxed">
            VYOM Publication (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our
            scholarly publication management platform.
          </p>

          {SECTIONS.map(s => (
            <div key={s.title} className="flex flex-col gap-3">
              <h2 className="font-display text-xl font-bold text-forest-green">{s.title}</h2>
              <div className="text-sm text-forest-green/65 leading-relaxed whitespace-pre-line">{s.content}</div>
            </div>
          ))}

          <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-2">
            <h2 className="font-display text-lg font-bold text-forest-green">Contact Us</h2>
            <p className="text-sm text-forest-green/60">For privacy-related enquiries, please contact our editorial office:</p>
            <a href="mailto:ORGANIZATIONVYOM@gmail.com" className="flex items-center gap-2 text-sm text-ochre hover:underline">
              <Mail className="h-4 w-4" /> ORGANIZATIONVYOM@gmail.com
            </a>
            <p className="text-sm text-forest-green/50">Yashwanta Nagar, Talegaon Dabhade, Pune, Maharashtra, India 410506</p>
            <div className="flex gap-4 mt-2 text-xs">
              <Link href="/terms" className="text-ochre hover:underline">Terms of Service</Link>
              <Link href="/contact" className="text-ochre hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
