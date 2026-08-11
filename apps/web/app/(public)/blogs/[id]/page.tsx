'use client';

// TODO: Replace demo data with GET /api/v1/blogs/:id once backend credentials are available.

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';

const POSTS: Record<string, {
  id: string; title: string; date: string; author: string; authorRole: string; category: string;
  readTime: string; body: string[]; relatedIds: string[];
}> = {
  '1': {
    id: '1', title: 'The Future of Peer Review in the Age of AI', date: 'June 10, 2025',
    author: 'Dr. Kavitha Anand', authorRole: 'Associate Editor, VJLS', category: 'Editorial',
    readTime: '6 min read',
    body: [
      'Artificial intelligence tools can now produce publication-ready manuscripts in minutes. As generative models become increasingly fluent in academic prose, the question that every editorial board must reckon with is no longer whether AI can write — it clearly can — but whether human critical appraisal is more vital than ever.',
      'At VYOM Publication, we believe the answer is unambiguously yes. Peer review has never been merely about grammatical accuracy or stylistic polish. It is about contextual judgement: whether a methodology is appropriate for the research question, whether the claims are proportionate to the evidence, whether the contribution genuinely advances the field.',
      'These are judgements that require disciplinary expertise, intellectual honesty, and — critically — the capacity to be wrong and to acknowledge it. A language model operating on pattern recognition cannot replicate this. It can mimic the surface features of a rigorous review, but it cannot stake a scholarly reputation on its conclusions.',
      'The practical implication for our journals is clear: we are investing more, not less, in our reviewer pool. We are expanding our editorial board, increasing reviewer remuneration, and introducing structured reviewer feedback to improve the quality of every submission decision.',
      'The age of AI does not diminish the value of peer review. If anything, it raises the stakes — because the volume of content requiring expert scrutiny will only grow.',
    ],
    relatedIds: ['2', '3', '4'],
  },
  '2': {
    id: '2', title: 'How to Write an Abstract That Gets Accepted', date: 'May 22, 2025',
    author: 'Helena Thorne', authorRole: 'Senior Commissioning Editor', category: 'Author Tips',
    readTime: '5 min read',
    body: [
      'Your abstract is the single most important paragraph in your manuscript. Before a reviewer commits to reading your work, before an editor considers your submission, they read the abstract. It is your first — and sometimes only — opportunity to make your case.',
      'A strong abstract follows a predictable structure: context, problem, methodology, findings, and significance. This is not a constraint — it is a gift. Readers and reviewers know exactly where to look for the information they need, and if it is there, clearly stated, your work earns the attention it deserves.',
      'The most common mistakes we see at VYOM are: abstracts that bury the research question in background context; abstracts that describe methodology at the expense of findings; and abstracts that use hedged, tentative language where direct claims are warranted.',
      'Write your abstract last. Once you know exactly what your paper concludes, you can write an abstract that accurately represents it — not what you hoped to find, but what you actually found.',
      'Keep it under 300 words. Use active voice where possible. State your contribution in the final sentence with confidence.',
    ],
    relatedIds: ['1', '5', '3'],
  },
  '3': {
    id: '3', title: 'Why Bilingual Research Matters in South Asian Linguistics', date: 'May 4, 2025',
    author: 'Dr. Priya Raghunathan', authorRole: 'Author, VJLS Vol. 14', category: 'Research',
    readTime: '7 min read',
    body: [
      'South Asia is, by any measure, the most linguistically complex region on earth. India alone is home to over 19,500 mother tongues according to the 2011 Census, with 121 languages spoken by more than 10,000 people. The scientific study of bilingualism and multilingualism in this context is not a niche interest — it is foundational to understanding how human language works.',
      'Yet for decades, the dominant models of bilingual language acquisition were derived from European contexts: primarily French-English, German-English, and Dutch-English bilinguals. These models do not always transfer cleanly to contexts where typologically distant languages interact — where Hindi and English share cognitive space, or where Tamil and Malayalam coexist in the same household.',
      'The research coming out of Indian linguistics departments is beginning to correct this imbalance. Work on prosodic bootstrapping in Hindi-English bilinguals, code-switching in academic discourse, and heritage language maintenance in diaspora communities is producing data that challenges received assumptions and enriches our understanding of the bilingual mind.',
      'VYOM Journal of Linguistic Studies actively solicits work in this space. The South Asian context offers something that no European bilingualism dataset can: scale, diversity, and typological depth. We are only beginning to explore what this means for cognitive linguistics and language acquisition theory.',
    ],
    relatedIds: ['1', '2', '6'],
  },
  '4': {
    id: '4', title: 'Open Access vs. Subscription: An Honest Comparison', date: 'April 18, 2025',
    author: 'Editorial Team', authorRole: 'VYOM Publication', category: 'Publishing',
    readTime: '5 min read',
    body: [
      'The choice between open access and subscription publishing is one of the most consequential decisions an author can make — and it is rarely as simple as advocates on either side suggest.',
      'Open access maximises visibility. Your article is findable by anyone, anywhere, without an institutional login. For researchers at institutions with limited library budgets — which describes the majority of the world\'s universities — this is not a minor advantage. It is the difference between being read and being ignored.',
      'The tradeoff is cost. Article Processing Charges (APCs) for reputable open access journals typically range from ₹5,000 to ₹15,000 for Indian publishers, and significantly more for international journals. These charges fund editorial operations, peer review coordination, and digital archiving.',
      'Subscription journals, by contrast, charge readers rather than authors — which can mean limited reach, particularly in developing academic economies. The prestige associated with high-impact subscription journals is real, but it is gradually eroding as open access mandates spread among research funders.',
      'At VYOM, we offer open access as the default for all accepted articles, with our APC set at ₹8,500 — competitive with international standards, and supported by waiver applications for authors from low-income institutions.',
    ],
    relatedIds: ['1', '2', '5'],
  },
  '5': {
    id: '5', title: 'Five Common Manuscript Mistakes — and How to Fix Them', date: 'March 29, 2025',
    author: 'Marco Finch', authorRole: 'Copy Editor', category: 'Author Tips',
    readTime: '4 min read',
    body: [
      'After reviewing thousands of manuscripts, the same patterns recur. Here are the five mistakes we see most often — and how to address each before you submit.',
      '1. Passive voice overuse. Academic writing has a long tradition of the passive voice ("it was found that…"), but overuse obscures agency and weakens prose. Identify your key claims and state them directly: "Our analysis reveals…" rather than "It was revealed that…".',
      '2. The literature review as citation dump. A literature review should build an argument, not list papers. Each cited work should serve a purpose: establishing a gap, supporting a claim, or contextualising your contribution.',
      '3. Methodology buried in jargon. Reviewers need to assess whether your methods are appropriate. If your methodology section is incomprehensible to a specialist in an adjacent field, it needs to be clearer.',
      '4. Under-stated findings. Many authors hedge their conclusions out of scholarly caution. Caution is appropriate; timidity is not. State what your findings actually show — clearly and directly.',
      '5. Missing limitations section. A manuscript without a genuine limitations section raises red flags. It suggests the author has not thought critically about their work. A good limitations section demonstrates intellectual honesty and invites further research.',
    ],
    relatedIds: ['2', '4', '1'],
  },
  '6': {
    id: '6', title: 'What Makes a Great Academic Non-Fiction Book?', date: 'March 5, 2025',
    author: 'Dr. Sara Cohen', authorRole: 'Acquisitions Editor', category: 'Editorial',
    readTime: '6 min read',
    body: [
      'The best academic non-fiction books do something that journal articles cannot: they sustain an argument over 60,000 words, drawing the reader through evidence, counter-evidence, and synthesis towards a conclusion that feels both surprising and inevitable.',
      'The qualities that distinguish great academic non-fiction are not mysterious, but they are demanding. First: a clear central argument. Not a topic, not a theme — an argument. A claim that can be stated in one sentence and that is neither obviously true nor obviously false.',
      'Second: narrative momentum. Academic books that read like extended literature reviews fail as books, whatever their intellectual merit. The best academic non-fiction tells a story — of discovery, of debate, of evidence accumulating towards a conclusion.',
      'Third: transparency about method and sources. The reader should understand not just what you claim, but how you know it. This is not a matter of footnotes alone — it is woven into the prose.',
      'Fourth, and most importantly: a genuine contribution. The book should exist because something needed to be said that had not been said, or had been said less well, before. If you cannot state clearly what that contribution is, the book is not ready.',
    ],
    relatedIds: ['1', '2', '4'],
  },
};

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = POSTS[params.id];

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-40 px-6 text-center gap-6">
        <h1 className="font-display text-4xl font-bold text-forest-green">Post Not Found</h1>
        <p className="text-forest-green/60 text-base max-w-md">
          This blog post does not exist or may have been removed.
        </p>
        <Link href="/blogs"
          className="inline-flex items-center gap-2 rounded-full bg-ochre px-7 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const related = post.relatedIds.map(id => POSTS[id]).filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="bg-ivory py-16 px-6 border-b border-sand/30">
        <div className="mx-auto max-w-2xl flex flex-col gap-5">
          <Link href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-forest-green/50 hover:text-forest-green transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="rounded-full border border-ochre/40 px-3 py-1 text-xs font-bold text-ochre">{post.category}</span>
            <span className="text-xs text-forest-green/40">{post.readTime}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-forest-green leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-forest-green/50">
            <Link href="/authors/dr-priya-raghunathan" className="flex items-center gap-1.5 font-bold text-ochre hover:underline">
              <User className="h-3.5 w-3.5" />{post.author}
            </Link>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <main className="py-14 px-6">
        <div className="mx-auto max-w-2xl flex flex-col gap-6">
          {/* Image placeholder */}
          <div className="w-full rounded-2xl bg-gradient-to-br from-sand/30 to-sand/10 h-56 flex items-center justify-center border border-sand/40 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-ochre">{post.category}</span>
          </div>

          {/* Body paragraphs */}
          {post.body.map((paragraph, i) => (
            <p key={i} className="text-base text-forest-green/80 leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Author box */}
          <div className="mt-8 rounded-2xl border border-sand/40 bg-ivory px-6 py-5 flex items-center gap-5">
            <div className="h-12 w-12 rounded-full bg-ochre/20 flex items-center justify-center text-ochre font-bold text-sm shrink-0">
              {post.author.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <p className="text-sm font-bold text-forest-green">{post.author}</p>
              <p className="text-xs text-forest-green/50">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-14 px-6 bg-sand/10 border-t border-sand/30">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-forest-green mb-8">More from the Blog</h2>
            <div className="flex flex-col gap-4">
              {related.map(r => r && (
                <Link key={r.id} href={`/blogs/${r.id}`}
                  className="group rounded-2xl border border-sand/40 bg-white px-6 py-4 flex items-center justify-between gap-4 hover:border-sand hover:shadow-card transition-all">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-ochre">{r.category}</span>
                    <h3 className="text-sm font-bold text-forest-green group-hover:text-ochre transition-colors">{r.title}</h3>
                    <p className="text-xs text-forest-green/40">{r.author} · {r.date}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-forest-green/30 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
