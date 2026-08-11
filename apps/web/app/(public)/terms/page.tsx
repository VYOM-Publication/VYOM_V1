import Link from 'next/link';
import { Mail } from 'lucide-react';

const SECTIONS = [
  { title: '1. Acceptance of Terms', content: `By accessing or using the VYOM Publication platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use the platform. We reserve the right to modify these terms at any time with notice to registered users.` },
  { title: '2. User Accounts', content: `You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account. You must notify us immediately of any unauthorised use of your account.` },
  { title: '3. Manuscript Submission', content: `By submitting a manuscript, you represent and warrant that:\n• The work is original and has not been published or submitted elsewhere simultaneously\n• You have obtained all necessary permissions for third-party content\n• The research complies with applicable ethical standards\n• All co-authors have approved the submission\n• You have disclosed all conflicts of interest\n\nSubmission of a manuscript does not guarantee acceptance for publication.` },
  { title: '4. Intellectual Property', content: `Upon acceptance and payment of the Article Processing Charge, you grant VYOM Publication a non-exclusive, worldwide, royalty-free licence to publish, distribute, and archive your work. You retain copyright. Published articles are made available under a Creative Commons Attribution (CC BY 4.0) licence unless otherwise agreed in writing.` },
  { title: '5. Article Processing Charges', content: `Publication of accepted manuscripts is subject to an Article Processing Charge (APC) of ₹8,500 INR (subject to revision). Payment is due within 30 days of acceptance notification. Waiver applications are available for authors from qualifying institutions.` },
  { title: '6. Peer Review', content: `VYOM Publication operates a double-blind peer review process. Reviewers are bound by confidentiality obligations. Authors must not attempt to identify or contact reviewers. Editorial decisions are final except in cases of demonstrable procedural error.` },
  { title: '7. Prohibited Conduct', content: `You may not:\n• Submit plagiarised, fabricated, or falsified content\n• Manipulate the peer review process\n• Harass or intimidate editors, reviewers, or other users\n• Use the platform for any unlawful purpose\n• Attempt to gain unauthorised access to any part of the platform` },
  { title: '8. Limitation of Liability', content: `To the maximum extent permitted by law, VYOM Publication shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.` },
  { title: '9. Governing Law', content: `These Terms of Service are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Pune, Maharashtra, India.` },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-ivory py-20 px-6 text-center border-b border-sand/30">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-5">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-ochre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">Legal</span>
            <span className="block h-px w-12 bg-ochre" />
          </div>
          <h1 className="font-display text-5xl font-bold text-forest-green leading-tight">Terms of Service</h1>
          <p className="text-sm text-forest-green/50">Last updated: 1 July 2025</p>
        </div>
      </section>

      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl flex flex-col gap-10">
          <p className="text-base text-forest-green/70 leading-relaxed">
            These Terms of Service govern your use of the VYOM Publication platform operated by VYOM Publication
            (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). Please read these terms carefully before using our services.
          </p>

          {SECTIONS.map(s => (
            <div key={s.title} className="flex flex-col gap-3">
              <h2 className="font-display text-xl font-bold text-forest-green">{s.title}</h2>
              <div className="text-sm text-forest-green/65 leading-relaxed whitespace-pre-line">{s.content}</div>
            </div>
          ))}

          <div className="rounded-2xl border border-sand/40 bg-white p-6 flex flex-col gap-2">
            <h2 className="font-display text-lg font-bold text-forest-green">Questions?</h2>
            <p className="text-sm text-forest-green/60">For questions about these terms, contact our editorial office:</p>
            <a href="mailto:ORGANIZATIONVYOM@gmail.com" className="flex items-center gap-2 text-sm text-ochre hover:underline">
              <Mail className="h-4 w-4" /> ORGANIZATIONVYOM@gmail.com
            </a>
            <div className="flex gap-4 mt-2 text-xs">
              <Link href="/privacy" className="text-ochre hover:underline">Privacy Policy</Link>
              <Link href="/contact" className="text-ochre hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
