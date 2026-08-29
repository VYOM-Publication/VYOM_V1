/**
 * VYOM Publication — Centralised Demo Data
 * All realistic mock data used across dashboard pages lives here.
 * TODO: Replace each export with real API calls once backend credentials are available.
 */

// ── Submissions ───────────────────────────────────────────────────────────────
export const DEMO_SUBMISSIONS = [
  {
    id: 'MS-2025-012',
    title: 'Language Acquisition in Bilingual Infants: A Longitudinal Study',
    abstract: 'This study investigates the patterns of language acquisition in bilingual infants aged 6–24 months, examining the interplay between phonological development and lexical growth across two simultaneous languages.',
    keywords: ['bilingualism', 'language acquisition', 'infant cognition', 'phonology'],
    author: 'Dr. Priya Raghunathan',
    authorEmail: 'p.raghunathan@jnu.ac.in',
    affiliation: 'Jawaharlal Nehru University, New Delhi',
    journal: 'VJLS',
    status: 'UNDER REVIEW',
    submittedDate: '2025-06-12',
    daysInPipeline: 19,
    currentVersion: 1,
    paymentStatus: 'pending',
    reviewerCount: 2,
    editorName: 'Prof. Vikram Das',
  },
  {
    id: 'MS-2025-008',
    title: 'Prosodic Cues in Early Speech: Evidence from Hindi-English Bilinguals',
    abstract: 'An examination of how prosodic cues function as bootstrapping mechanisms in early speech perception among Hindi-English bilingual children.',
    keywords: ['prosody', 'speech perception', 'bootstrapping', 'Hindi-English'],
    author: 'Dr. Priya Raghunathan',
    authorEmail: 'p.raghunathan@jnu.ac.in',
    affiliation: 'Jawaharlal Nehru University, New Delhi',
    journal: 'VQR',
    status: 'REVISION',
    submittedDate: '2025-05-03',
    daysInPipeline: 32,
    currentVersion: 2,
    paymentStatus: 'pending',
    reviewerCount: 2,
    editorName: 'Prof. Vikram Das',
    revisionDeadline: '2025-07-25',
    revisionComments: 'The reviewers have requested clarification on the methodology in Section 3 and additional data analysis for the prosodic boundary detection experiments.',
  },
  {
    id: 'MS-2025-003',
    title: 'Code-Switching in Academic Discourse: A Corpus Analysis',
    abstract: 'A corpus-based analysis of code-switching patterns in academic discourse among multilingual scholars in Indian universities.',
    keywords: ['code-switching', 'academic discourse', 'corpus linguistics', 'multilingualism'],
    author: 'Dr. Priya Raghunathan',
    authorEmail: 'p.raghunathan@jnu.ac.in',
    affiliation: 'Jawaharlal Nehru University, New Delhi',
    journal: 'VJAL',
    status: 'ACCEPTED',
    submittedDate: '2025-03-18',
    daysInPipeline: 67,
    currentVersion: 3,
    paymentStatus: 'pending',
    reviewerCount: 3,
    editorName: 'Prof. Vikram Das',
    doi: '10.vyom/vjal.2025.003',
  },
  {
    id: 'MS-2024-089',
    title: 'Semantic Drift in Bilingual Lexicons: Evidence from Hindi-English Code-Switching',
    abstract: 'This paper examines semantic drift phenomena in the lexicons of Hindi-English bilinguals, with particular attention to contact-induced semantic change.',
    keywords: ['semantic drift', 'bilingual lexicon', 'contact linguistics'],
    author: 'Dr. Priya Raghunathan',
    authorEmail: 'p.raghunathan@jnu.ac.in',
    affiliation: 'Jawaharlal Nehru University, New Delhi',
    journal: 'VJLS',
    status: 'PUBLISHED',
    submittedDate: '2024-11-05',
    daysInPipeline: 113,
    currentVersion: 3,
    paymentStatus: 'paid',
    reviewerCount: 2,
    editorName: 'Prof. Vikram Das',
    doi: '10.vyom/vjls.2024.089',
    publishedDate: '2025-03-01',
    volume: 14,
    issue: 1,
    pageRange: '1–22',
  },
];

// ── Reviews (for reviewer role) ───────────────────────────────────────────────
export const DEMO_REVIEW_ASSIGNMENTS = [
  {
    id: 'RA-2025-041',
    submissionId: 'MS-2025-041',
    title: 'Prosodic Bootstrapping in Early Bilingual Acquisition',
    author: 'Dr. Priya Raghunathan',
    journal: 'VJLS',
    deadline: '2025-07-24',
    daysLeft: 21,
    status: 'PENDING',
    assignedDate: '2025-07-03',
    abstract: 'This study investigates prosodic bootstrapping mechanisms in early bilingual language acquisition, examining how infants use prosodic cues to segment and categorise words across two languages simultaneously.',
    keywords: ['prosodic bootstrapping', 'bilingual acquisition', 'infant language', 'phonology'],
    manuscriptUrl: '#',
    versionNo: 1,
  },
  {
    id: 'RA-2025-033',
    submissionId: 'MS-2025-033',
    title: 'Tonal Patterns in Mandarin-English Code-Switching',
    author: 'Prof. Li Wei',
    journal: 'VJLS',
    deadline: '2025-07-18',
    daysLeft: 15,
    status: 'IN PROGRESS',
    assignedDate: '2025-06-28',
    abstract: 'An investigation of tonal pattern preservation and modification in Mandarin-English code-switching contexts, with implications for phonological interface theory.',
    keywords: ['tone', 'code-switching', 'Mandarin', 'phonological interface'],
    manuscriptUrl: '#',
    versionNo: 1,
  },
];

export const DEMO_COMPLETED_REVIEWS = [
  {
    id: 'RA-2025-019',
    submissionId: 'MS-2025-019',
    title: 'Morphological Complexity in Heritage Language Grammars',
    author: 'Dr. Sunita Rao',
    journal: 'VJAL',
    completedDate: '2025-06-10',
    recommendation: 'MINOR REVISION',
    score: 7.5,
  },
  {
    id: 'RA-2025-011',
    submissionId: 'MS-2025-011',
    title: 'Pragmatic Transfer in L2 English Requests',
    author: 'Prof. Arjun Mehta',
    journal: 'VQR',
    completedDate: '2025-05-22',
    recommendation: 'ACCEPT',
    score: 8.8,
  },
  {
    id: 'RA-2024-098',
    submissionId: 'MS-2024-098',
    title: 'Discourse Markers in Academic Writing',
    author: 'Dr. Kavitha Anand',
    journal: 'VJLS',
    completedDate: '2025-04-15',
    recommendation: 'REJECT',
    score: 4.2,
  },
];

// ── Notifications ─────────────────────────────────────────────────────────────
export const DEMO_NOTIFICATIONS = [
  {
    id: 'N-001',
    title: 'Abstract Approved',
    message: 'Your abstract "Language Acquisition in Bilingual Infants" has been approved by the editorial team. Please upload your full manuscript.',
    type: 'success' as const,
    read: false,
    date: '2025-07-10',
    link: '/author/submissions/MS-2025-012',
  },
  {
    id: 'N-002',
    title: 'Revision Requested',
    message: 'The editorial team has requested revisions for "Prosodic Cues in Early Speech". Please review the reviewer comments and submit a revised manuscript.',
    type: 'warning' as const,
    read: false,
    date: '2025-07-05',
    link: '/author/submissions/MS-2025-008',
  },
  {
    id: 'N-003',
    title: 'Manuscript Accepted',
    message: 'Congratulations! Your manuscript "Code-Switching in Academic Discourse" has been accepted for publication.',
    type: 'success' as const,
    read: true,
    date: '2025-06-28',
    link: '/author/submissions/MS-2025-003',
  },
  {
    id: 'N-004',
    title: 'Payment Due',
    message: 'Publication fee of ₹8,500 is due for "Code-Switching in Academic Discourse". Please complete payment to proceed to publication.',
    type: 'info' as const,
    read: true,
    date: '2025-06-29',
    link: '/author/submissions/MS-2025-003/payment',
  },
  {
    id: 'N-005',
    title: 'Article Published',
    message: 'Your article "Semantic Drift in Bilingual Lexicons" is now live on the VYOM portal. DOI: 10.vyom/vjls.2024.089',
    type: 'success' as const,
    read: true,
    date: '2025-03-01',
    link: '/books',
  },
  {
    id: 'N-006',
    title: 'New Review Assignment',
    message: 'You have been assigned to review "Prosodic Bootstrapping in Early Bilingual Acquisition". Deadline: 24 July 2025.',
    type: 'info' as const,
    read: false,
    date: '2025-07-03',
    link: '/reviewer/assignments/RA-2025-041',
  },
];

// ── Bookmarks ─────────────────────────────────────────────────────────────────
export const DEMO_BOOKMARKS = [
  { id: 'BM-001', bookId: '5', title: 'Quantum Computing Frontiers', author: 'Dr. Vikram Singh', category: 'Science & Technology', savedDate: '2025-06-15' },
  { id: 'BM-002', bookId: '1', title: 'Foundations of Modern Research', author: 'Dr. Ananya Sharma', category: 'Academic & Research', savedDate: '2025-06-10' },
  { id: 'BM-003', bookId: '11', title: 'Voices from the Margins', author: 'Dr. Kavita Rao', category: 'Fiction', savedDate: '2025-05-28' },
  { id: 'BM-004', bookId: '3', title: 'Contemporary Literary Studies', author: 'Dr. Priya Nair', category: 'Literature', savedDate: '2025-05-20' },
  { id: 'BM-005', bookId: '9', title: 'Molecular Biology Essentials', author: 'Prof. Meera Iyer', category: 'Science & Technology', savedDate: '2025-04-12' },
];

// ── Downloads ─────────────────────────────────────────────────────────────────
export const DEMO_DOWNLOADS = [
  { id: 'DL-001', bookId: '5', title: 'Quantum Computing Frontiers', author: 'Dr. Vikram Singh', fileType: 'PDF', fileSize: '4.2 MB', downloadDate: '2025-07-08' },
  { id: 'DL-002', bookId: '1', title: 'Foundations of Modern Research', author: 'Dr. Ananya Sharma', fileType: 'PDF', fileSize: '3.1 MB', downloadDate: '2025-07-01' },
  { id: 'DL-003', bookId: '15', title: 'Computational Linguistics Today', author: 'Prof. Priya Nambiar', fileType: 'PDF', fileSize: '5.8 MB', downloadDate: '2025-06-22' },
  { id: 'DL-004', bookId: '11', title: 'Voices from the Margins', author: 'Dr. Kavita Rao', fileType: 'PDF', fileSize: '2.9 MB', downloadDate: '2025-06-15' },
  { id: 'DL-005', bookId: '7', title: 'Sustainable Development Goals', author: 'Dr. Arun Nambiar', fileType: 'PDF', fileSize: '6.1 MB', downloadDate: '2025-05-30' },
];

// ── Reading History ───────────────────────────────────────────────────────────
export const DEMO_READING_HISTORY = [
  { id: 'RH-001', bookId: '5', title: 'Quantum Computing Frontiers', author: 'Dr. Vikram Singh', progress: 68, lastRead: '2025-07-10', totalPages: 380, pagesRead: 258 },
  { id: 'RH-002', bookId: '15', title: 'Computational Linguistics Today', author: 'Prof. Priya Nambiar', progress: 100, lastRead: '2025-07-01', totalPages: 356, pagesRead: 356 },
  { id: 'RH-003', bookId: '1', title: 'Foundations of Modern Research', author: 'Dr. Ananya Sharma', progress: 45, lastRead: '2025-06-28', totalPages: 312, pagesRead: 140 },
  { id: 'RH-004', bookId: '11', title: 'Voices from the Margins', author: 'Dr. Kavita Rao', progress: 100, lastRead: '2025-06-20', totalPages: 242, pagesRead: 242 },
  { id: 'RH-005', bookId: '3', title: 'Contemporary Literary Studies', author: 'Dr. Priya Nair', progress: 22, lastRead: '2025-06-10', totalPages: 256, pagesRead: 56 },
];

// ── Announcements ─────────────────────────────────────────────────────────────
export const DEMO_ANNOUNCEMENTS = [
  {
    id: 'AN-001',
    title: 'Call for Papers: VJLS Special Issue on Multilingualism',
    content: 'The VYOM Journal of Linguistic Studies invites submissions for a special issue on "Multilingualism in South Asian Contexts". Deadline for abstract submission: 31 August 2025. Topics include code-switching, language policy, heritage languages, and bilingual education.',
    category: 'Call for Papers',
    publishDate: '2025-07-01',
    status: 'published',
    author: 'Editorial Office',
    pinned: true,
  },
  {
    id: 'AN-002',
    title: 'Platform Maintenance — 15 July 2025',
    content: 'The VYOM Publication platform will undergo scheduled maintenance on 15 July 2025 from 2:00 AM to 6:00 AM IST. During this period, submission and review workflows will be temporarily unavailable. We apologise for any inconvenience.',
    category: 'System Notice',
    publishDate: '2025-07-08',
    status: 'published',
    author: 'Technical Team',
    pinned: false,
  },
  {
    id: 'AN-003',
    title: 'New Journal: VYOM Quarterly Review (VQR) — Now Accepting Submissions',
    content: 'We are pleased to announce the launch of the VYOM Quarterly Review, a new interdisciplinary journal covering humanities, social sciences, and applied linguistics. The inaugural issue will be published in October 2025.',
    category: 'New Journal',
    publishDate: '2025-06-20',
    status: 'published',
    author: 'Editorial Office',
    pinned: false,
  },
  {
    id: 'AN-004',
    title: 'Updated Publication Fee Structure — Effective 1 August 2025',
    content: 'Following a review of our operational costs, VYOM Publication will implement a revised publication fee structure from 1 August 2025. Article Processing Charges (APC) for standard articles will be ₹8,500. Waiver applications are available for authors from low-income institutions.',
    category: 'Fee Update',
    publishDate: '2025-06-15',
    status: 'published',
    author: 'Administration',
    pinned: false,
  },
];

// ── Audit Logs ────────────────────────────────────────────────────────────────
export const DEMO_AUDIT_LOGS = [
  { id: 'AL-001', actor: 'Prof. Vikram Das', role: 'Editor', action: 'submission.status_changed', entity: 'MS-2025-012', detail: 'Status changed from ABSTRACT_SUBMITTED → ABSTRACT_APPROVED', ip: '103.21.58.12', timestamp: '2025-07-10 14:32:11' },
  { id: 'AL-002', actor: 'Dr. Priya Raghunathan', role: 'Author', action: 'submission.manuscript_uploaded', entity: 'MS-2025-012', detail: 'Manuscript v1 uploaded (4.2 MB, PDF)', ip: '49.36.112.88', timestamp: '2025-07-10 16:05:44' },
  { id: 'AL-003', actor: 'Prof. Vikram Das', role: 'Editor', action: 'review.reviewer_assigned', entity: 'MS-2025-012', detail: 'Reviewer Prof. D. Krishnaswamy assigned. Deadline: 24 Jul 2025', ip: '103.21.58.12', timestamp: '2025-07-11 09:18:22' },
  { id: 'AL-004', actor: 'System', role: 'System', action: 'notification.sent', entity: 'MS-2025-012', detail: 'Review assignment notification sent to reviewer@demo.com', ip: 'system', timestamp: '2025-07-11 09:18:23' },
  { id: 'AL-005', actor: 'Dr. S. Fernandes', role: 'Reviewer', action: 'review.submitted', entity: 'MS-2025-008', detail: 'Review submitted. Recommendation: MINOR REVISION. Score: 7.5/10', ip: '117.55.23.44', timestamp: '2025-07-05 11:44:09' },
  { id: 'AL-006', actor: 'Prof. Vikram Das', role: 'Editor', action: 'submission.decision_made', entity: 'MS-2025-008', detail: 'Editorial decision: REVISION REQUESTED. Comments sent to author.', ip: '103.21.58.12', timestamp: '2025-07-05 15:22:31' },
  { id: 'AL-007', actor: 'admin@demo.com', role: 'Admin', action: 'user.role_assigned', entity: 'USR-0089', detail: 'Role REVIEWER assigned to Dr. R. Nambiar (IIT Bombay)', ip: '192.168.1.5', timestamp: '2025-07-04 10:05:00' },
  { id: 'AL-008', actor: 'System', role: 'System', action: 'payment.invoice_generated', entity: 'MS-2025-003', detail: 'Invoice INV-2025-0031 generated. Amount: ₹8,500 INR', ip: 'system', timestamp: '2025-06-28 12:00:00' },
  { id: 'AL-009', actor: 'Dr. Priya Raghunathan', role: 'Author', action: 'payment.completed', entity: 'MS-2025-003', detail: 'Payment of ₹8,500 completed via UPI. Transaction: mock_order_abc123', ip: '49.36.112.88', timestamp: '2025-06-29 09:15:33' },
  { id: 'AL-010', actor: 'Prof. Vikram Das', role: 'Editor', action: 'submission.published', entity: 'MS-2024-089', detail: 'Article published. DOI: 10.vyom/vjls.2024.089. Vol. 14, No. 1, pp. 1–22', ip: '103.21.58.12', timestamp: '2025-03-01 10:00:00' },
];

// ── Users (Admin) ─────────────────────────────────────────────────────────────
export const DEMO_USERS = [
  { id: 'USR-0001', name: 'Dr. Priya Raghunathan', email: 'author@demo.com', role: 'Author', status: 'Active', joined: '2024-09-15', submissions: 4 },
  { id: 'USR-0002', name: 'Demo Reader', email: 'reader@demo.com', role: 'Member', status: 'Active', joined: '2024-10-02', submissions: 0 },
  { id: 'USR-0003', name: 'Prof. Vikram Das', email: 'editor@demo.com', role: 'Editor', status: 'Active', joined: '2024-08-01', submissions: 0 },
  { id: 'USR-0004', name: 'Dr. S. Fernandes', email: 'reviewer@demo.com', role: 'Reviewer', status: 'Active', joined: '2024-08-20', submissions: 0 },
  { id: 'USR-0005', name: 'Demo Admin', email: 'admin@demo.com', role: 'Admin', status: 'Active', joined: '2024-07-01', submissions: 0 },
  { id: 'USR-0006', name: 'Dr. Kavitha Anand', email: 'k.anand@du.ac.in', role: 'Author', status: 'Active', joined: '2024-11-10', submissions: 2 },
  { id: 'USR-0007', name: 'Prof. Arjun Mehta', email: 'a.mehta@eflu.ac.in', role: 'Author', status: 'Active', joined: '2024-12-05', submissions: 1 },
  { id: 'USR-0008', name: 'Dr. Sunita Rao', email: 's.rao@du.ac.in', role: 'Author', status: 'Active', joined: '2025-01-18', submissions: 1 },
  { id: 'USR-0009', name: 'Prof. D. Krishnaswamy', email: 'd.krishnaswamy@bits.ac.in', role: 'Reviewer', status: 'Active', joined: '2024-09-01', submissions: 0 },
  { id: 'USR-0010', name: 'Dr. R. Nambiar', email: 'r.nambiar@iitb.ac.in', role: 'Reviewer', status: 'Active', joined: '2025-07-04', submissions: 0 },
  { id: 'USR-0011', name: 'Meera Pillai', email: 'm.pillai@gmail.com', role: 'Member', status: 'Active', joined: '2025-02-14', submissions: 0 },
  { id: 'USR-0012', name: 'Rahul Sharma', email: 'r.sharma@gmail.com', role: 'Member', status: 'Suspended', joined: '2025-03-22', submissions: 0 },
];

// ── Payments (Admin) ──────────────────────────────────────────────────────────
export const DEMO_PAYMENTS = [
  { id: 'PAY-001', invoiceNo: 'INV-2025-0031', author: 'Dr. Priya Raghunathan', submission: 'MS-2025-003', amount: 8500, currency: 'INR', method: 'UPI', status: 'COMPLETED', date: '2025-06-29', transactionId: 'mock_order_abc123' },
  { id: 'PAY-002', invoiceNo: 'INV-2025-0028', author: 'Dr. Kavitha Anand', submission: 'MS-2024-089', amount: 8500, currency: 'INR', method: 'Net Banking', status: 'COMPLETED', date: '2025-02-15', transactionId: 'mock_order_def456' },
  { id: 'PAY-003', invoiceNo: 'INV-2025-0035', author: 'Prof. Arjun Mehta', submission: 'MS-2025-038', amount: 8500, currency: 'INR', method: 'Card', status: 'PENDING', date: '2025-07-05', transactionId: null },
  { id: 'PAY-004', invoiceNo: 'INV-2025-0041', author: 'Dr. Sunita Rao', submission: 'MS-2025-035', amount: 8500, currency: 'INR', method: 'UPI', status: 'FAILED', date: '2025-07-08', transactionId: 'mock_order_ghi789' },
];

// ── Author Profile ────────────────────────────────────────────────────────────
export const DEMO_AUTHOR_PROFILE = {
  fullName: 'Dr. Priya Raghunathan',
  email: 'author@demo.com',
  phone: '+91 98765 43210',
  institution: 'Jawaharlal Nehru University',
  department: 'Centre for Linguistics',
  country: 'India',
  orcidId: '0000-0002-1234-5678',
  researchAreas: ['Bilingualism', 'Language Acquisition', 'Phonology', 'Psycholinguistics'],
  biography: 'Dr. Priya Raghunathan is an Associate Professor at the Centre for Linguistics, JNU. Her research focuses on bilingual language acquisition, prosodic development, and code-switching in multilingual communities.',
  websiteUrl: 'https://jnu.ac.in/faculty/praghunathan',
  submissionCount: 4,
  publishedCount: 1,
};

// ── Reviewer Profile ──────────────────────────────────────────────────────────
export const DEMO_REVIEWER_PROFILE = {
  fullName: 'Dr. S. Fernandes',
  email: 'reviewer@demo.com',
  institution: 'University of Pune',
  department: 'Department of Linguistics',
  country: 'India',
  expertiseDomains: ['Cognitive Linguistics', 'Semantics', 'Pragmatics', 'Discourse Analysis'],
  hIndex: 18,
  totalReviews: 17,
  avgTurnaround: 14,
  performanceScore: 4.6,
  isAvailable: true,
};

// ── TASK 1: Centralized Demo Data ─────────────────────────────────────────────
export const DEMO_MONTHLY_SUBMISSIONS = [
  { month: 'Feb', count: 3 },
  { month: 'Mar', count: 5 },
  { month: 'Apr', count: 4 },
  { month: 'May', count: 7 },
  { month: 'Jun', count: 6 },
  { month: 'Jul', count: 4 },
];

export const DEMO_JOURNAL_DIST = [
  { journal: 'VJLS', count: 18, pct: 47 },
  { journal: 'VQR',  count: 12, pct: 32 },
  { journal: 'VJAL', count: 8,  pct: 21 },
];

export const DEMO_JOURNALS = [
  'VJLS — VYOM Journal of Linguistic Studies',
  'VQR — VYOM Quarterly Review',
  'VJAL — VYOM Journal of Applied Linguistics'
];

export const DEMO_ARTICLE_TYPES = [
  'Original Research Article',
  'Review Article',
  'Short Communication',
  'Case Study',
  'Book Review',
  'Letter to the Editor',
  'Perspective / Opinion',
  'Technical Note',
  'Systematic Review',
  'Meta-Analysis',
  'Methodology Article',
  'Commentary',
];

export const DEMO_REVIEW_CRITERIA = [
  { key: 'originality', label: 'Originality & Novelty' },
  { key: 'methodology', label: 'Methodology & Rigour' },
  { key: 'clarity', label: 'Clarity & Presentation' },
  { key: 'relevance', label: 'Relevance to Journal Scope' },
  { key: 'references', label: 'References & Literature Review' },
];

export const DEMO_REVIEW_RECOMMENDATIONS = [
  'ACCEPT',
  'MINOR REVISION',
  'MAJOR REVISION',
  'REJECT'
];

export const DEMO_COMMUNICATION_THREADS = [
  { id: 1, name: 'Raghunathan', ms: 'MS-2025-041', preview: 'Please find attached the two reviewer reports for your manuscript. We request a revised version', date: '3 Jul 2025', active: true },
  { id: 2, name: 'Mehta',       ms: 'MS-2025-038', preview: 'The editorial board has reviewed your manuscript and requests a substantial revision of Section 4...', date: '5 Jun 2025', active: false },
  { id: 3, name: 'Anand',       ms: 'MS-2025-031', preview: 'We are delighted to inform you that your manuscript has been accepted for publication...', date: '1 Jul 2025', active: false },
];

export const DEMO_ISSUES_CHECKLIST = [
  'All article proofs reviewed and signed off',
  'DOIs assigned and registered with Crossref',
  'Table of contents compiled and reviewed',
  'Issue cover designed and approved',
  'Metadata exported to indexing databases',
  'ISSN and volume information verified',
  'Repository (institutional & PubMed) notified',
  'Author notification emails drafted',
];

export const DEMO_ISSUES_ARTICLES = [
  { num: '01', title: 'Semantic Drift in Bilingual Lexicons: Evidence from Hindi-English Code-Switching', author: 'Dr. Kavitha Anand', pages: '1–22',  doi: '10.1234/vjls.2025.14.3.001', proofed: true  },
  { num: '02', title: 'Prosodic Bootstrapping in Early Bilingual Acquisition',                            author: 'Dr. P. Raghunathan', pages: '23–48', doi: '10.1234/vjls.2025.14.3.002', proofed: true  },
  { num: '03', title: 'Grammatical Gender Assignment in Heritage Hindi Speakers',                         author: 'Prof. S. Varma',      pages: '49–68', doi: '10.1234/vjls.2025.14.3.003', proofed: false },
  { num: '04', title: 'Intonational Phrase Boundaries in Tamil-English Bilinguals',                       author: 'Dr. L. Subramaniam', pages: '69–90', doi: '10.1234/vjls.2025.14.3.004', proofed: true  },
  { num: '05', title: 'Register Variation in Academic Hindi Writing',                                     author: 'Prof. K. Sharma',    pages: '91–112',doi: '10.1234/vjls.2025.14.3.005', proofed: false },
];

export const DEMO_REVIEWERS_POOL = [
  { initials: 'SK', name: 'Prof. Shital R Kalekar',  institution: 'D.Y. Patil University, School of Pharmacy', expertise: ['pharmacognosy','herbal science','drug delivery'], hIndex: 0, active: 0, available: true  },
  { initials: 'VC', name: 'Dr. Vimla Choudhary',     institution: 'PhD Biotechnology',                         expertise: ['biotechnology','pharmacology'],                 hIndex: 0, active: 0, available: true  },
  { initials: 'GM', name: 'Prof. Ganesh More',        institution: 'D.Y. Patil University, School of Pharmacy', expertise: ['pharmacy','pharmacognosy'],                     hIndex: 0, active: 0, available: true  },
  { initials: 'PN', name: 'Poonam U Nalawade',        institution: '',                                          expertise: ['herbal science','research'],                    hIndex: 0, active: 0, available: true  },
  { initials: 'SS', name: 'Saee S Sutar',             institution: '',                                          expertise: ['editorial','research'],                        hIndex: 0, active: 0, available: true  },
];

export const DEMO_ARCHIVES_VOLUMES = [
  { vol: 'Vol. 14, No. 2', year: 2025, journal: 'VJLS', articles: 7,  editor: 'Dr. Kavitha Anand',  indexed: true,  access: 'Open',         size: '4.2 MB' },
  { vol: 'Vol. 14, No. 1', year: 2025, journal: 'VJLS', articles: 6,  editor: 'Prof. T. Krishnan',  indexed: true,  access: 'Open',         size: '3.8 MB' },
  { vol: 'Q2 2025',        year: 2025, journal: 'VQR',  articles: 8,  editor: 'Dr. S. Pillai',      indexed: true,  access: 'Subscription', size: '5.1 MB' },
  { vol: 'Vol. 13, No. 4', year: 2024, journal: 'VJLS', articles: 9,  editor: 'Prof. R. Iyer',      indexed: true,  access: 'Open',         size: '6.0 MB' },
  { vol: 'Vol. 13, No. 3', year: 2024, journal: 'VJLS', articles: 7,  editor: 'Dr. P. Raghunathan', indexed: true,  access: 'Open',         size: '4.7 MB' },
  { vol: 'Q1 2025',        year: 2025, journal: 'VQR',  articles: 6,  editor: 'Prof. A. Mehta',     indexed: false, access: 'Subscription', size: '3.9 MB' },
  { vol: 'Vol. 7, No. 1',  year: 2025, journal: 'VJAL', articles: 5,  editor: 'Dr. R. Nambiar',     indexed: false, access: 'Open',         size: '2.8 MB' },
  { vol: 'Vol. 13, No. 2', year: 2024, journal: 'VJLS', articles: 8,  editor: 'Dr. Sunita Rao',     indexed: true,  access: 'Open',         size: '5.2 MB' },
];

export const DEMO_EDITORIAL_BOARDS = [
  {
    journal: 'VYOM HERBAL SCIENCE & DELIVERY INNOVATION: A PHARMACOGNOSY PERSPECTIVE — Volume 1',
    issn: '',
    frequency: '',
    scope: 'Herbal science, pharmacognosy, and drug delivery innovation.',
    editors: [
      'Prof. Mrs. Shital R Kalekar',
      'Poonam U Nalawade',
      'Manas M Joshi',
      'Saee S Sutar',
    ],
    vicharEditors: [
      { name: 'Saee Sutar',                  note: ''             },
      { name: 'Priyanka Dharmadhikari',       note: 'IIM Bodh Gaya' },
      { name: 'Virashrie Naikare',            note: ''             },
      { name: 'Manas Joshi',                 note: ''             },
    ],
    members: [
      { name: 'Prof. Shital R Kalekar',  role: 'Editor-in-Chief',        institution: 'D.Y. Patil University, School of Pharmacy', country: 'India'       },
      { name: 'Dr. Vimla Choudhary',     role: 'Associate Editor',       institution: 'PhD Biotechnology',                         country: 'India'       },
      { name: 'Prof. Ganesh More',       role: 'Associate Editor',       institution: 'D.Y. Patil University, School of Pharmacy', country: 'India'       },
      { name: 'Poonam U Nalawade',       role: 'Editor-in-Chief',        institution: '',                                          country: 'India'       },
      { name: 'Saee S Sutar',           role: 'Sub-Editor',             institution: '',                                          country: 'India'       },
      { name: 'Ronit V Handa',          role: 'International Advisory',  institution: '',                                          country: 'Australia'   },
      { name: 'Smruti U Tatkare',       role: 'Reviewing Editor',       institution: '',                                          country: 'India'       },
      { name: 'Nidhi S Vichare',        role: 'International Advisory',  institution: '',                                          country: 'Netherlands' },
      { name: 'Kartik Divekar',         role: 'Reviewing Editor',       institution: '',                                          country: 'India'       },
      { name: 'Atima Bharti',           role: 'Reviewing Editor',       institution: '',                                          country: 'India'       },
      { name: 'Virashrie Naikare',      role: 'Reviewing Editor',       institution: 'VYOM Vichar (Blogs Editor)',                 country: 'India'       },
    ],
  },
];

export const DEMO_BLOG_POSTS = [
  {
    id: '1',
    date: 'AUGUST 2026',
    title: 'Herbal Science & Delivery Innovation',
    excerpt: 'Exploring the frontiers of pharmacognosy and herbal drug delivery — perspectives from the VYOM Herbal Science editorial team.',
    author: 'Saee Sutar',
    category: 'Editorial',
  },
  {
    id: '2',
    date: 'AUGUST 2026',
    title: 'Research at the Intersection of Herbal Science and Modern Medicine',
    excerpt: 'How traditional pharmacognosy is informing cutting-edge delivery mechanisms in contemporary research.',
    author: 'Priyanka Dharmadhikari',
    category: 'Research',
  },
  {
    id: '3',
    date: 'AUGUST 2026',
    title: 'Publishing Your Research with VYOM',
    excerpt: 'A guide for emerging scholars on navigating the submission and peer-review process at VYOM Publication.',
    author: 'Virashrie Naikare',
    category: 'Author Tips',
  },
  {
    id: '4',
    date: 'AUGUST 2026',
    title: 'The Role of Pharmacognosy in Drug Discovery',
    excerpt: 'From plant-based compounds to clinical applications — a closer look at pharmacognosy\'s growing influence.',
    author: 'Manas Joshi',
    category: 'Research',
  },
];

export const DEMO_ACHIEVEMENTS_STATS = [
  { value: 500,  suffix: '+', label: 'Published Books',      icon: 'BookOpen'  },
  { value: 150,  suffix: '+', label: 'Registered Authors',   icon: 'Users'     },
  { value: 25,   suffix: '+', label: 'Academic Partners',    icon: 'Building2' },
  { value: 8,    suffix: '+', label: 'Years of Excellence',  icon: 'Trophy'    },
  { value: 50,   suffix: '+', label: 'Countries Reached',    icon: 'Globe'     },
  { value: 1200, suffix: '+', label: 'Citations Recorded',   icon: 'TrendingUp'},
  { value: 98,   suffix: '%', label: 'Author Satisfaction',  icon: 'Star'      },
  { value: 30,   suffix: '+', label: 'Research Categories',  icon: 'Award'     },
];

export const DEMO_ACHIEVEMENTS_MILESTONES = [
  { year: '2016', title: 'Founded',                  desc: 'VYOM Publication established with a founding team of 5 academics and a mission to democratise scholarly publishing.' },
  { year: '2017', title: 'First Publication',        desc: 'Released our inaugural title — a landmark research monograph in Environmental Science.' },
  { year: '2018', title: 'Peer Review Launch',       desc: 'Introduced a structured double-blind peer review programme; onboarded 25 authors across 8 disciplines.' },
  { year: '2019', title: 'Digital Platform',         desc: 'Launched the first version of our digital submission and tracking portal.' },
  { year: '2020', title: '100 Titles Milestone',     desc: 'Crossed 100 published titles and established partnerships with 10 leading academic institutions.' },
  { year: '2021', title: 'International Reach',      desc: 'Expanded readership to 30+ countries; indexed in 3 international academic databases.' },
  { year: '2022', title: 'Open Access Initiative',   desc: 'Introduced open-access publishing options, making research freely available to global readers.' },
  { year: '2024', title: 'VYOM Platform Launch',     desc: 'Launched the fully governed, workflow-driven VYOM Publication Management Platform.' },
];

export const DEMO_ACHIEVEMENTS_AWARDS = [
  { title: 'Best Academic Publisher',       body: 'Indian Publishing Federation',       year: '2022' },
  { title: 'Excellence in Peer Review',     body: 'South Asian Scholarly Council',      year: '2021' },
  { title: 'Digital Innovation Award',      body: 'Academic Technology Forum',          year: '2023' },
  { title: 'Author Choice Award',           body: 'Research Authors Guild of India',    year: '2022' },
];

export const DEMO_ACHIEVEMENTS_PARTNERS = [
  'IIT Delhi', 'IISc Bangalore', 'JNU New Delhi', 'IIM Ahmedabad',
  'TIFR Mumbai', 'Delhi University', 'Jadavpur University', 'BITS Pilani',
];

export const DEMO_ACHIEVEMENTS_GLOBAL_REACH = [
  { region: 'South Asia',    countries: 8,  readers: '45,000+' },
  { region: 'Southeast Asia',countries: 6,  readers: '12,000+' },
  { region: 'Europe',        countries: 15, readers: '8,500+'  },
  { region: 'North America', countries: 3,  readers: '6,200+'  },
  { region: 'Other Regions', countries: 18, readers: '3,100+'  },
];

// ── Public Authors Directory ──────────────────────────────────────────────────
type AuthorPublication = { id: string; title: string; journal: string; year: number; doi: string };
type AuthorBook = { id: string; title: string; category: string; year: number; price: number };

export const DEMO_PUBLIC_AUTHORS: Array<{
  id: string; name: string; designation: string; institution: string; department: string;
  country: string; shortBio: string; extendedBio: string; researchInterests: string[];
  expertise: string[]; orcid: string; email: string; joinedDate: string; experienceYears: number;
  languages: string[]; awards: string[]; socialLinks: Record<string, string>;
  books: AuthorBook[]; publications: AuthorPublication[];
}> = [
  {
    id: 'prof-shital-r-kalekar',
    name: 'Prof. Mrs. Shital R Kalekar',
    designation: 'Professor',
    institution: 'D.Y. Patil University, School of Pharmacy',
    department: 'School of Pharmacy',
    country: 'India',
    shortBio: 'Prof. Shital R Kalekar is an editor and researcher specialising in pharmacognosy and herbal science at D.Y. Patil University.',
    extendedBio: 'Prof. Shital R Kalekar serves as Editor-in-Chief for VYOM\'s Herbal Science & Delivery Innovation volume. Her academic focus spans pharmacognosy, herbal drug delivery, and pharmaceutical sciences at D.Y. Patil University, School of Pharmacy.',
    researchInterests: ['Pharmacognosy', 'Herbal Drug Delivery', 'Pharmaceutical Sciences'],
    expertise: ['Herbal Science', 'Drug Delivery Innovation', 'Pharmacy'],
    orcid: '',
    email: '',
    joinedDate: '2025',
    experienceYears: 0,
    languages: ['English', 'Hindi', 'Marathi'],
    awards: [],
    socialLinks: {},
    books: [
      { id: '1', title: 'VYOM Herbal Science & Delivery Innovation: A Pharmacognosy Perspective', category: 'Pharmacy & Health Sciences', year: 2025, price: 0 },
    ],
    publications: [],
  },
  {
    id: 'poonam-u-nalawade',
    name: 'Poonam U Nalawade',
    designation: 'Editor-in-Chief',
    institution: '',
    department: '',
    country: 'India',
    shortBio: 'Poonam U Nalawade serves as Editor-in-Chief at VYOM Publication, contributing to the Herbal Science & Delivery Innovation volume.',
    extendedBio: 'Poonam U Nalawade is an editor at VYOM Publication, leading the editorial direction of the Herbal Science & Delivery Innovation: A Pharmacognosy Perspective volume.',
    researchInterests: ['Pharmacognosy', 'Herbal Science'],
    expertise: ['Editorial Management', 'Herbal Science'],
    orcid: '',
    email: '',
    joinedDate: '2025',
    experienceYears: 0,
    languages: ['English', 'Hindi', 'Marathi'],
    awards: [],
    socialLinks: {},
    books: [
      { id: '1', title: 'VYOM Herbal Science & Delivery Innovation: A Pharmacognosy Perspective', category: 'Pharmacy & Health Sciences', year: 2025, price: 0 },
    ],
    publications: [],
  },
  {
    id: 'manas-m-joshi',
    name: 'Manas M Joshi',
    designation: 'Editor',
    institution: '',
    department: '',
    country: 'India',
    shortBio: 'Manas M Joshi is an editor at VYOM Publication and a contributor to the VYOM Vichar blog.',
    extendedBio: 'Manas M Joshi contributes as an editor for the Herbal Science & Delivery Innovation volume and as a writer for VYOM Vichar, the VYOM Publication blog.',
    researchInterests: ['Herbal Science', 'Pharmacognosy'],
    expertise: ['Editorial', 'Research Writing'],
    orcid: '',
    email: '',
    joinedDate: '2025',
    experienceYears: 0,
    languages: ['English', 'Hindi', 'Marathi'],
    awards: [],
    socialLinks: {},
    books: [
      { id: '1', title: 'VYOM Herbal Science & Delivery Innovation: A Pharmacognosy Perspective', category: 'Pharmacy & Health Sciences', year: 2025, price: 0 },
    ],
    publications: [],
  },
  {
    id: 'saee-s-sutar',
    name: 'Saee S Sutar',
    designation: 'Sub-Editor',
    institution: '',
    department: '',
    country: 'India',
    shortBio: 'Saee S Sutar is Sub-Editor at VYOM Publication and a VYOM Vichar blog editor.',
    extendedBio: 'Saee S Sutar serves as Sub-Editor for the Herbal Science & Delivery Innovation volume and leads editorial contributions to VYOM Vichar, VYOM\'s scholarly blog.',
    researchInterests: ['Herbal Science', 'Academic Publishing'],
    expertise: ['Sub-Editing', 'Blog Editorial'],
    orcid: '',
    email: '',
    joinedDate: '2025',
    experienceYears: 0,
    languages: ['English', 'Hindi', 'Marathi'],
    awards: [],
    socialLinks: {},
    books: [
      { id: '1', title: 'VYOM Herbal Science & Delivery Innovation: A Pharmacognosy Perspective', category: 'Pharmacy & Health Sciences', year: 2025, price: 0 },
    ],
    publications: [],
  },
  {
    id: 'virashrie-naikare',
    name: 'Virashrie Naikare',
    designation: 'Blogs Editor — VYOM Vichar',
    institution: '',
    department: '',
    country: 'India',
    shortBio: 'Virashrie Naikare leads VYOM Vichar as Blogs Editor, curating scholarly and editorial content for VYOM Publication.',
    extendedBio: 'Virashrie Naikare is the Blogs Editor for VYOM Vichar and a Reviewing Editor on the VYOM Herbal Science & Delivery Innovation editorial board.',
    researchInterests: ['Academic Writing', 'Editorial Curation'],
    expertise: ['Blog Editing', 'Content Strategy'],
    orcid: '',
    email: '',
    joinedDate: '2025',
    experienceYears: 0,
    languages: ['English', 'Hindi', 'Marathi'],
    awards: [],
    socialLinks: {},
    books: [],
    publications: [],
  },
  {
    id: 'priyanka-dharmadhikari',
    name: 'Priyanka Dharmadhikari',
    designation: 'Blogs Editor — VYOM Vichar',
    institution: 'IIM Bodh Gaya',
    department: '',
    country: 'India',
    shortBio: 'Priyanka Dharmadhikari is a VYOM Vichar blog editor and a student at IIM Bodh Gaya.',
    extendedBio: 'Priyanka Dharmadhikari contributes as a Blogs Editor for VYOM Vichar, VYOM Publication\'s editorial blog, bringing perspectives from her management studies at IIM Bodh Gaya.',
    researchInterests: ['Management', 'Academic Writing'],
    expertise: ['Editorial Writing', 'Blog Curation'],
    orcid: '',
    email: '',
    joinedDate: '2025',
    experienceYears: 0,
    languages: ['English', 'Hindi', 'Marathi'],
    awards: [],
    socialLinks: {},
    books: [],
    publications: [],
  },
];


