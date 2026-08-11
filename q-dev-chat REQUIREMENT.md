
# VYOM PUBLICATION – SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

---

## DOCUMENT CONTROL

| Attribute | Value |
|-----------|-------|
| Document Title | VYOM Publication Software Requirements Specification |
| Document Version | 1.0 |
| Document Status | Approved |
| Last Updated | 2024 |
| Prepared By | VYOM Publication Team |
| Document Type | Requirements Specification |

---

## TABLE OF CONTENTS

1. Project Overview
2. Business Context
3. Executive Summary
4. Business Requirements Document (BRD)
5. User Personas
6. User Journey Maps
7. Publication Lifecycle Diagram & State Definitions
8. Workflow Diagrams
9. Module Breakdown
10. Entity Identification & Data Analysis
11. Permission Matrix
12. Business Rules
13. Security Requirements
14. Scalability Requirements
15. Future Expansion Opportunities

---

# 1. PROJECT OVERVIEW

## 1.1 Project Identity

**Project Name:** VYOM Publication

**Project Classification:** Digital Publication Ecosystem and Scholarly Workflow Management System

**Primary Purpose:** To provide a comprehensive, governed, end-to-end platform for managing the complete scholarly publication lifecycle from author submission to public content dissemination.

---

## 1.2 Project Vision

To establish VYOM Publication as the premier scholarly publication management ecosystem that transforms fragmented, manual publication workflows into a unified, transparent, and governed digital platform — enabling seamless collaboration among authors, reviewers, editors, and readers while maintaining the highest standards of academic integrity and operational excellence.

---

## 1.3 Project Mission

VYOM Publication's mission is to:

- **Streamline Publication Workflows:** Eliminate coordination overhead by centralizing all publication activities in a single governed platform
- **Ensure Transparency:** Provide real-time visibility into submission status for all stakeholders throughout the publication lifecycle
- **Enable Quality Control:** Facilitate rigorous peer review and editorial oversight through structured workflows and accountability mechanisms
- **Democratize Access:** Make published scholarly content discoverable and accessible to readers through a public-facing knowledge portal
- **Support Financial Sustainability:** Generate revenue through publication fees while maintaining transparent pricing and payment processes
- **Build Trust:** Create an auditable, compliant publication record that satisfies regulatory and academic standards

---

## 1.4 Problem Statement

### Current State

Traditional scholarly publication management suffers from critical systemic inefficiencies:

**Fragmentation:** Publication workflows are scattered across email threads, spreadsheet trackers, shared drives, and manual paper trails, resulting in:
- Lost communications between authors and editors
- Missed review deadlines and unclear accountability
- Version control issues across manuscript revisions
- Inability to track submission status in real-time

**Coordination Overhead:** Editorial teams spend 60-70% of their time on administrative coordination rather than editorial judgment:
- Manual reviewer assignment and tracking
- Manual status updates to authors
- Manual payment tracking and reconciliation
- Manual deadline management and reminder systems

**Lack of Transparency:** Authors experience submission workflows as "black boxes":
- No visibility into review progress
- Uncertain timelines for editorial decisions
- Unclear payment triggers and requirements
- No structured communication channels with editors

**Quality Control Challenges:** Peer review processes lack standardization:
- Inconsistent review criteria across submissions
- No structured feedback templates
- Difficulty tracking reviewer performance
- Limited ability to enforce review quality standards

**Compliance Gaps:** Manual processes create audit and compliance vulnerabilities:
- Incomplete submission history records
- Unclear decision rationale documentation
- Difficulty demonstrating regulatory compliance
- No centralized audit trail for critical actions

### Desired State

VYOM Publication addresses these challenges by providing:

- A **single unified platform** for all publication activities
- **Automated workflow orchestration** that eliminates manual coordination
- **Real-time status transparency** for all stakeholders
- **Structured communication channels** between authors, reviewers, and editors
- **Standardized review processes** with configurable quality criteria
- **Complete audit trails** for all workflow state changes
- **Public-facing content portal** for reader discovery and access

---

## 1.5 Business Goals

### Primary Business Goals

**BG-01: Operational Efficiency**
- Reduce editorial coordination overhead by 70%
- Decrease average submission-to-decision time by 50%
- Automate 80% of routine administrative tasks

**BG-02: Quality Assurance**
- Maintain 100% peer review completion for accepted manuscripts
- Achieve 95% reviewer response rate within response deadlines
- Ensure all editorial decisions have documented rationale

**BG-03: Author Satisfaction**
- Provide real-time submission status visibility to 100% of authors
- Achieve author satisfaction score of 8.0/10 or higher
- Reduce author support queries by 60% through self-service features

**BG-04: Revenue Generation**
- Process 100% of publication fee payments through integrated gateway
- Achieve 95% payment collection rate within 30 days of invoice
- Generate recurring subscription revenue from member access tiers

**BG-05: Platform Scalability**
- Support 10,000+ concurrent users without performance degradation
- Manage 100,000+ submission records with sub-3-second query performance
- Scale to 50,000+ annual submissions within 3 years

**BG-06: Compliance and Auditability**
- Maintain complete audit trail for 100% of submission state changes
- Satisfy regulatory compliance requirements for academic publishing
- Provide audit reports on-demand with zero manual compilation

---

## 1.6 Value Proposition

### For Authors

**Transparency:** Real-time submission tracking from abstract submission to publication

**Efficiency:** Structured submission forms eliminate ambiguity and reduce rejection due to formatting issues

**Communication:** Direct, structured communication channels with editors for queries and clarifications

**Recognition:** Published works with certificates of publication and permanent digital records

**Convenience:** Integrated payment processing with clear pricing and receipt generation

### For Reviewers

**Clarity:** Structured review forms with clear evaluation criteria

**Flexibility:** Ability to accept or decline review assignments based on availability and expertise

**Workload Management:** Transparent deadline tracking and reminder systems

**Recognition:** Performance metrics and acknowledgment for contributions to scholarly quality control

**Professionalism:** Secure, blinded manuscript access with proper version control

### For Editors

**Control:** Unified dashboard providing complete visibility into submission pipeline

**Efficiency:** Automated reviewer matching based on subject area and availability

**Quality:** Structured decision workflows with documented rationale requirements

**Communication:** Integrated messaging with authors and reviewers in context of specific submissions

**Scheduling:** Issue and volume management tools for publication planning

### For Administrators

**Oversight:** Real-time dashboards for platform health, submission metrics, and financial status

**Control:** Centralized user, role, and permission management

**Compliance:** Automated audit log generation for all critical system actions

**Reporting:** On-demand generation of submission, publication, and financial reports

**Configuration:** System-wide settings management without requiring technical deployments

### For Members and Readers

**Discovery:** Searchable catalog of published books and articles organized by category

**Access:** Bookmarking, download, and reading history tracking for convenience

**Quality:** Curated content that has undergone rigorous peer review and editorial oversight

**Trust:** Transparent editorial board and publication guidelines build credibility

**Notifications:** Updates on new publications in areas of interest

---

## 1.7 Target Audience

### Primary Stakeholders

**Authors (Researchers, Academics, Scholars)**
- Demographic: Academic professionals seeking to publish research findings
- Technical Proficiency: Moderate — comfortable with online forms and document uploads
- Primary Need: Transparent, efficient publication process with clear timelines
- Success Metric: Submission-to-publication completion rate

**Reviewers (Subject Matter Experts)**
- Demographic: Experienced researchers with domain expertise
- Technical Proficiency: Moderate to High
- Primary Need: Structured review workflows with manageable workload
- Success Metric: Review completion rate and turnaround time

**Editors (Editorial Board Members, Managing Editors)**
- Demographic: Senior academics or professional editors
- Technical Proficiency: Moderate
- Primary Need: Complete submission pipeline visibility and workflow control
- Success Metric: Editorial decision turnaround time and quality consistency

**Administrators (Platform Managers, System Controllers)**
- Demographic: Technical and operational staff
- Technical Proficiency: High
- Primary Need: Platform oversight, reporting, and configuration control
- Success Metric: System uptime, user growth, revenue metrics

### Secondary Stakeholders

**Members (Registered Readers)**
- Demographic: Researchers, students, professionals seeking published content
- Technical Proficiency: Moderate
- Primary Need: Easy content discovery, bookmarking, and reading history
- Success Metric: Engagement metrics (downloads, reading time, return visits)

**Visitors (Public Users)**
- Demographic: General public, prospective authors, casual readers
- Technical Proficiency: Low to Moderate
- Primary Need: Understanding platform credibility, discovering content, registration pathways
- Success Metric: Conversion rate to registered users

---

## 1.8 Success Criteria

### Platform Launch Success Criteria (Month 1-3)

**SC-01:** All six user roles (Visitor, Member, Author, Reviewer, Editor, Administrator) can successfully register, log in, and access role-appropriate dashboards

**SC-02:** Authors can submit abstracts and receive automated acknowledgment within 60 seconds

**SC-03:** Editors can screen abstracts and issue accept/reject decisions with documented rationale

**SC-04:** Authors can upload manuscripts following abstract acceptance

**SC-05:** Editors can assign reviewers to manuscripts and reviewers can accept/decline assignments

**SC-06:** The complete publication lifecycle (abstract → manuscript → review → decision → payment → publication) can be completed for at least 10 test submissions

### Operational Success Criteria (Month 4-6)

**SC-07:** Platform achieves 99.5% uptime during business hours (8 AM - 8 PM IST, Monday-Saturday)

**SC-08:** Average page load time remains under 3 seconds for 95% of requests

**SC-09:** Average submission-to-editorial-decision time is under 45 days

**SC-10:** Reviewer acceptance rate exceeds 60% for review invitations

**SC-11:** Payment collection rate exceeds 90% within 30 days of invoice generation

**SC-12:** Zero critical security vulnerabilities identified in independent security audit

### Growth Success Criteria (Month 7-12)

**SC-13:** Platform supports 500+ active authors with concurrent submission activity

**SC-14:** Platform processes 100+ manuscript submissions per month

**SC-15:** Published content catalog contains 200+ articles or books

**SC-16:** Member registration base exceeds 2,000 registered users

**SC-17:** Author satisfaction score (via survey) averages 7.5/10 or higher

**SC-18:** Editorial coordination time reduced by 60% compared to pre-platform baseline

### Long-Term Success Criteria (Year 2-3)

**SC-19:** Platform scales to support 10,000 concurrent users without performance degradation

**SC-20:** Annual submission volume exceeds 5,000 manuscripts

**SC-21:** Platform achieves operational profitability through publication fees and subscriptions

**SC-22:** Platform is recognized as a credible scholarly publication venue by academic institutions

---

## 1.9 What VYOM Publication IS

**VYOM Publication IS:**

✓ **A Scholarly Workflow Management System** — Orchestrates the complete publication lifecycle from submission to publication with governance and accountability

✓ **A Governed Publication Platform** — Enforces editorial policies, peer review requirements, and quality standards through structured workflows

✓ **A Multi-Role Collaboration Tool** — Enables authors, reviewers, editors, and administrators to work together within a unified system

✓ **A Content Publishing Platform** — Publishes peer-reviewed scholarly books and articles to a public-facing knowledge portal

✓ **An Audit-Compliant System** — Maintains complete, immutable records of all submission states, decisions, and actions

✓ **A Transparent Communication Channel** — Provides structured, in-platform messaging between stakeholders in the context of specific submissions

✓ **A Revenue-Generating Platform** — Processes publication fees through integrated payment gateways and manages invoicing

✓ **A Reader Engagement Platform** — Offers registered members personalized dashboards, bookmarking, reading history, and content discovery tools

---

## 1.10 What VYOM Publication IS NOT

**VYOM Publication IS NOT:**

✗ **An E-Commerce Bookstore** — VYOM does not sell books or articles as products. Published content may be open-access or access-controlled, but the platform's primary purpose is scholarly publication management, not retail sales.

✗ **A Simple Content Repository** — VYOM is not a passive document storage system. It is an active workflow engine that governs submission evaluation, peer review, editorial decisions, and publication processes.

✗ **A Social Networking Platform** — VYOM does not provide general social features like messaging between arbitrary users, profile following, or content sharing outside the context of submissions.

✗ **A Preprint or Self-Publishing Platform** — All content published through VYOM undergoes editorial screening and peer review. Authors cannot directly publish content without editorial approval.

✗ **A Generic Document Management System** — VYOM is purpose-built for scholarly publication workflows and cannot be generalized to manage arbitrary document types or workflows outside this domain.

✗ **A Learning Management System (LMS)** — VYOM does not provide course management, assignments, grading, or educational content delivery features.

✗ **An Open Peer Review Platform** — VYOM follows traditional blinded peer review models where reviewer identities are protected and comments are mediated by editors.

✗ **A Citation Management Tool** — VYOM does not provide reference management, citation formatting, or bibliographic database features.

---

# 2. BUSINESS CONTEXT

## 2.1 Industry Context

### Scholarly Publishing Landscape

The scholarly publishing industry is characterized by:

**Traditional Challenges:**
- Lengthy publication timelines (6-18 months from submission to publication)
- Opaque peer review processes with limited author visibility
- High rejection rates (60-90% for prestigious journals) with minimal feedback
- Coordination overhead for editorial teams managing manual workflows
- Inconsistent reviewer availability and quality

**Digital Transformation Trends:**
- Migration from print-based to digital-first publishing models
- Demand for open-access publication models alongside traditional subscription-based access
- Expectation of real-time status transparency throughout submission lifecycles
- Increasing use of workflow management systems to reduce editorial burden
- Growing importance of audit trails and compliance documentation

**Market Dynamics:**
- Proliferation of predatory journals creating credibility challenges for legitimate publishers
- Increasing scrutiny of publication fees and transparency requirements
- Rising author expectations for faster turnaround times and clear communication
- Growing emphasis on peer review quality and accountability
- Expansion of multidisciplinary and niche publication venues

### VYOM's Position in the Ecosystem

VYOM Publication positions itself as a **governed, transparent, and efficient alternative** to fragmented manual workflows and predatory platforms by:

- Providing complete workflow automation while maintaining editorial control
- Ensuring transparency through real-time status tracking and audit trails
- Building credibility through visible editorial boards and documented policies
- Supporting both book and article publication formats
- Offering flexibility for open-access and access-controlled content models

---

## 2.2 Publication Ecosystem

### Ecosystem Participants

VYOM Publication operates within a scholarly publication ecosystem involving multiple interconnected stakeholders:

**Content Creators (Authors)**
- Researchers seeking to disseminate findings
- Academics building publication portfolios for career advancement
- Independent scholars contributing to knowledge domains

**Quality Gatekeepers (Reviewers and Editors)**
- Peer reviewers providing domain expertise and quality evaluation
- Editors making accept/reject decisions based on scope, quality, and reviewer feedback
- Editorial board members setting publication standards and policies

**Platform Operators (Administrators)**
- System administrators ensuring platform availability and security
- Financial administrators managing payment processing and revenue tracking
- Content administrators managing categories, announcements, and static content

**Content Consumers (Members and Visitors)**
- Researchers and students accessing published works for literature review
- Professionals seeking domain knowledge and best practices
- General public interested in scholarly findings

**Supporting Infrastructure**
- Payment gateways processing publication fees
- Email services delivering notifications and communications
- File storage systems securing manuscript versions and published content
- Identity verification services (ORCID) for author disambiguation

---

## 2.3 Key Stakeholders

### Internal Stakeholders

**VYOM Editorial Board**
- **Role:** Define publication scope, quality standards, and editorial policies
- **Responsibility:** Review and approve high-level editorial decisions, resolve disputes
- **Success Metric:** Consistency of publication quality and adherence to editorial standards

**VYOM Platform Management Team**
- **Role:** Oversee platform operations, user support, and business strategy
- **Responsibility:** Ensure platform availability, financial sustainability, and user satisfaction
- **Success Metric:** Platform uptime, user growth, revenue targets, satisfaction scores

**VYOM Technical Team**
- **Role:** Develop, maintain, and enhance platform functionality and security
- **Responsibility:** Implement features, resolve bugs, ensure data integrity, maintain security posture
- **Success Metric:** Feature delivery timelines, bug resolution times, security audit results

### External Stakeholders

**Authors and Co-Authors**
- **Interest:** Successful publication of research with minimal friction and clear timelines
- **Influence:** High — platform adoption depends on author satisfaction and word-of-mouth
- **Expectation:** Transparency, efficiency, fairness, clear communication

**Peer Reviewers**
- **Interest:** Manageable workload, clear expectations, recognition for contributions
- **Influence:** High — reviewer participation is critical to publication quality
- **Expectation:** Structured review forms, deadline flexibility, acknowledgment

**Editors**
- **Interest:** Efficient workflow tools that reduce coordination burden while maintaining editorial control
- **Influence:** High — editors are primary workflow drivers and quality gatekeepers
- **Expectation:** Complete submission visibility, reviewer management tools, decision documentation support

**Institutional Affiliations (Universities, Research Institutions)**
- **Interest:** Credible publication venues for faculty and researchers
- **Influence:** Medium — institutions may recommend or discourage specific publication venues
- **Expectation:** Transparent peer review, clear editorial standards, ISSN registration, audit trails

**Readers and Members**
- **Interest:** Access to high-quality, peer-reviewed scholarly content
- **Influence:** Medium — reader engagement drives platform visibility and credibility
- **Expectation:** Easy discovery, reliable access, content quality, citation information

**Regulatory and Accreditation Bodies**
- **Interest:** Compliance with academic publishing standards and data protection regulations
- **Influence:** High — non-compliance can result in loss of credibility or legal penalties
- **Expectation:** Audit trails, data privacy compliance (GDPR/CCPA if applicable), ethical review documentation

---

## 2.4 Platform Objectives

### Objective 1: Automate and Streamline Publication Workflows

**Objective Statement:** Eliminate manual coordination overhead by automating submission tracking, reviewer assignment, deadline management, and notification dispatch, reducing editorial administrative time by 70%.

**Key Results:**
- KR-1.1: 100% of submission state transitions trigger automated notifications to relevant stakeholders
- KR-1.2: Reviewer assignment suggestions generated automatically based on subject area and availability
- KR-1.3: Deadline reminders sent automatically at 50%, 75%, and 100% of deadline duration
- KR-1.4: Invoice generation and payment tracking fully automated upon editorial approval

### Objective 2: Ensure Transparency and Real-Time Status Visibility

**Objective Statement:** Provide all stakeholders with real-time visibility into submission status, review progress, and decision timelines, achieving 95% reduction in status inquiry support tickets.

**Key Results:**
- KR-2.1: Authors can view complete submission lifecycle timeline with current status at any time
- KR-2.2: Reviewers can view all assigned manuscripts and deadlines in a unified dashboard
- KR-2.3: Editors can view submission queue with aging, bottleneck identification, and workload distribution
- KR-2.4: Administrators can view real-time platform metrics on submissions, reviews, and payments

### Objective 3: Maintain High-Quality Peer Review Standards

**Objective Statement:** Enforce structured, consistent peer review processes with documented evaluation criteria, achieving 95% reviewer participation rate and 100% documented review rationale.

**Key Results:**
- KR-3.1: All reviews completed using standardized evaluation rubrics with scored criteria
- KR-3.2: Reviewer performance metrics tracked and visible to editors for assignment decisions
- KR-3.3: Review quality thresholds enforced (minimum comment length, all criteria scored)
- KR-3.4: Editor decisions reference specific reviewer reports and include documented rationale

### Objective 4: Build and Maintain Platform Credibility

**Objective Statement:** Establish VYOM Publication as a credible scholarly publication venue recognized by academic institutions, achieving 8.0/10 or higher trust rating from authors and readers.

**Key Results:**
- KR-4.1: Editorial board composition and biographies publicly visible
- KR-4.2: Publication guidelines, peer review policies, and ethical standards clearly documented
- KR-4.3: ISSN registration obtained for journal publications
- KR-4.4: Complete audit trail maintained for all editorial decisions with timestamped records

### Objective 5: Achieve Financial Sustainability

**Objective Statement:** Generate sustainable revenue through publication fees and member subscriptions while maintaining transparent, fair pricing, achieving operational profitability by Year 2.

**Key Results:**
- KR-5.1: 95% of invoices paid within 30 days of generation
- KR-5.2: Payment processing success rate exceeds 98% on first attempt
- KR-5.3: Pricing structure clearly documented and visible to prospective authors
- KR-5.4: Revenue tracking and financial reporting automated with monthly reports generated

### Objective 6: Ensure Scalability and Performance

**Objective Statement:** Build a platform capable of scaling to 50,000 annual submissions and 10,000 concurrent users within 3 years while maintaining sub-3-second page load times.

**Key Results:**
- KR-6.1: Platform supports 10,000 concurrent users with no performance degradation
- KR-6.2: Database queries return results in under 3 seconds for 95th percentile
- KR-6.3: File uploads complete in under 10 seconds for documents up to 50MB
- KR-6.4: Platform maintains 99.9% uptime during business hours

---

## 2.5 Expected Outcomes

### For the Organization (VYOM Publication)

**Operational Outcomes:**
- 70% reduction in editorial coordination time and administrative overhead
- Complete elimination of manual spreadsheet tracking and email-based status updates
- Automated compliance reporting with zero manual compilation effort
- Real-time visibility into platform health, user activity, and financial metrics

**Financial Outcomes:**
- Predictable revenue stream from publication fees and member subscriptions
- Reduced operational costs through workflow automation
- Scalable business model capable of supporting growth without proportional cost increases
- Transparent financial tracking with audit-ready records

**Reputation Outcomes:**
- Recognition as a credible, transparent scholarly publication venue
- Differentiation from predatory publishers through visible quality standards
- Positive author and reviewer testimonials driving word-of-mouth growth
- Institutional acceptance and recommendations from universities and research organizations

### For Authors

**Process Outcomes:**
- 50% reduction in average submission-to-decision time
- 90% reduction in status inquiry wait times through self-service visibility
- Clear, structured submission requirements reducing rejection due to formatting issues
- Direct communication channels with editors for clarifications

**Experience Outcomes:**
- Increased confidence in publication process transparency and fairness
- Reduced anxiety through real-time status tracking
- Clear understanding of review feedback and revision requirements
- Professional publication certificates and permanent digital records

### For Reviewers

**Workload Outcomes:**
- Clear visibility into review workload and deadline commitments
- Structured review forms reducing time spent on free-form feedback composition
- Flexibility to accept or decline assignments based on availability
- Automated reminders preventing missed deadlines

**Recognition Outcomes:**
- Performance metrics visible to editors demonstrating contribution quality
- Formal acknowledgment for peer review contributions
- Portfolio of completed reviews for professional development tracking

### For Editors

**Efficiency Outcomes:**
- 80% reduction in manual reviewer coordination effort
- Unified submission queue replacing scattered email and spreadsheet tracking
- Automated deadline tracking eliminating manual reminder sending
- Integrated communication log providing complete submission context

**Quality Outcomes:**
- Consistent application of review criteria across all submissions
- Documented decision rationale for every editorial decision
- Reviewer performance visibility enabling informed assignment decisions
- Complete submission history for trend analysis and policy refinement

### For Members and Readers

**Discovery Outcomes:**
- Easy content discovery through searchable catalog and category browsing
- Personalized reading history and bookmark management
- Notification of new publications in areas of interest

**Trust Outcomes:**
- Confidence in content quality through visible peer review processes
- Trust in platform credibility through transparent editorial boards
- Clear citation information and permanent digital identifiers (DOI if applicable)

---

# 3. EXECUTIVE SUMMARY

## 1.1 Project Identity

- Project Name: VYOM Publication
- Nature: Digital Publication Ecosystem & Workflow Management System
- Purpose: End-to-end management of the publication lifecycle — from author registration to public content visibility
- Target Audience: Authors, Reviewers, Editors, Administrators, Public Readers, Registered Members

## 1.2 Core Problem Statement

Traditional publication management is fragmented across email threads, spreadsheets, and manual coordination. VYOM Publication centralizes every step — abstract submission, peer review, editorial decisions, payments, and publication — into a single governed platform.

## 1.3 Platform Positioning

VYOM is NOT a bookstore.
VYOM is NOT a simple content repository.
VYOM IS a governed, workflow-driven publication management system with a public-facing content layer.

## 1.4 Strategic Goals

- Reduce editorial coordination overhead by 70%
- Provide authors with real-time submission transparency
- Enable reviewers to work asynchronously with deadline governance
- Create a public knowledge portal for readers
- Generate revenue through publication fees and subscriptions
- Build an auditable, compliant publication record

---

# 2. BUSINESS REQUIREMENTS DOCUMENT (BRD)

## 2.1 Functional Requirements

### 2.1.1 Public Access
- FR-PUB-01: Any visitor can browse homepage, about us, guidelines, editorial board, and contact pages without registration
- FR-PUB-02: Visitors can view the published book catalog and filter by category
- FR-PUB-03: Visitors can view upcoming publications
- FR-PUB-04: Visitors can read free/open-access public articles
- FR-PUB-05: Visitors can access the "Publish With Us" information page
- FR-PUB-06: Visitors can register as a Member or Author

### 2.1.2 Member Access
- FR-MEM-01: Registered members can log in and access a personalized dashboard
- FR-MEM-02: Members can manage their profile information
- FR-MEM-03: Members can save, bookmark, and download permitted content
- FR-MEM-04: Members can view reading history and track previously accessed articles
- FR-MEM-05: Members can receive platform notifications and important announcements
- FR-MEM-06: Members can access subscriber-only content based on their subscription tier

### 2.1.3 Author Module
- FR-AUTH-01: Authors can register with professional and institutional details
- FR-AUTH-02: Authors can submit an abstract with metadata (title, keywords, subject area, co-authors)
- FR-AUTH-03: Authors can track abstract submission status in real time
- FR-AUTH-04: Authors can submit a full manuscript after abstract acceptance
- FR-AUTH-05: Authors can receive reviewer comments and submit revisions
- FR-AUTH-06: Authors can communicate with editors through a structured query system
- FR-AUTH-07: Authors can complete payment after final acceptance
- FR-AUTH-08: Authors can download their published work and certificate of publication
- FR-AUTH-09: Authors can view full history of all their submissions

### 2.1.4 Reviewer Module
- FR-REV-01: Reviewers can be invited or self-registered and assigned to submissions
- FR-REV-02: Reviewers can accept or decline review assignments with reason
- FR-REV-03: Reviewers can access the assigned manuscript securely
- FR-REV-04: Reviewers can submit structured reviews with scores, comments, and recommendations
- FR-REV-05: Reviewers can request additional time or escalate deadline conflicts
- FR-REV-06: Reviewers can track their historical review assignments and performance metrics

### 2.1.5 Editor Module
- FR-ED-01: Editors can view all incoming abstract and manuscript submissions in their assigned subject areas
- FR-ED-02: Editors can make editorial decisions — accept, reject, or request revision — at both abstract and manuscript stages
- FR-ED-03: Editors can assign reviewers to manuscripts
- FR-ED-04: Editors can communicate directly with authors and reviewers through the platform
- FR-ED-05: Editors can schedule approved manuscripts for publication in specific issues/volumes
- FR-ED-06: Editors can manage publication issues, volumes, and archives
- FR-ED-07: Editors can approve final publication after all conditions are met

### 2.1.6 Admin Module
- FR-ADM-01: Administrators can manage all user accounts, roles, and permissions
- FR-ADM-02: Administrators can configure system-wide settings, categories, and publication parameters
- FR-ADM-03: Administrators can manage the editorial board — members, assignments, bios
- FR-ADM-04: Administrators can oversee all financial transactions and payment statuses
- FR-ADM-05: Administrators can generate reports on submissions, publications, revenues, and reviewer performance
- FR-ADM-06: Administrators can create and publish announcements and notices
- FR-ADM-07: Administrators can view full audit logs for all critical system actions
- FR-ADM-08: Administrators can manually intervene in any workflow stage when necessary

## 2.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-01 | Availability | System must maintain 99.9% uptime during business hours |
| NFR-02 | Performance | Page load under 3 seconds; document processing under 10 seconds |
| NFR-03 | Scalability | Must support 10,000 concurrent users and 100,000+ document records |
| NFR-04 | Security | All data encrypted at rest and in transit; role-based access enforced throughout |
| NFR-05 | Auditability | Every state change in a submission must be logged with actor, timestamp, and reason |
| NFR-06 | Accessibility | Platform must meet WCAG 2.1 AA standards |
| NFR-07 | Maintainability | System must support modular updates without full redeployment |
| NFR-08 | Data Integrity | No submission data may be deleted — only archived |
| NFR-09 | Notification | All critical workflow events must trigger configurable notifications within 60 seconds |
| NFR-10 | Document Security | Uploaded documents must not be publicly accessible via direct URL without authorization |

---

# 3. USER PERSONAS

## Persona 1 – Public Visitor: "The Curious Reader"

- Name: Arjun Mehta
- Age: 32 | Occupation: Graduate student | Technical Comfort: Moderate
- Goals: Discover research content, understand if VYOM is credible, find books in his field
- Pain Points: Can't access full content without registering; unsure of journal credibility
- What VYOM Must Deliver: Clear editorial board visibility, open-access preview content, easy registration CTA, trust signals (ISSN, publisher details)

## Persona 2 – Registered Member: "The Engaged Reader"

- Name: Priya Nair
- Age: 28 | Occupation: Researcher | Technical Comfort: High
- Goals: Stay updated with publications in her domain, download and bookmark papers, track reading history
- Pain Points: Notification overload, no organized reading list
- What VYOM Must Deliver: Smart notification preferences, organized bookmarks, download history, reading progress tracking

## Persona 3 – Author: "The First-Time Submitter"

- Name: Dr. Ramesh Sharma
- Age: 45 | Occupation: Associate Professor | Technical Comfort: Moderate
- Goals: Submit research, track review progress, get published, receive certificate
- Pain Points: Unclear submission status, no direct editor communication, uncertain payment timing
- What VYOM Must Deliver: Real-time submission tracking, transparent workflow states, structured author–editor communication, clear payment triggers

## Persona 4 – Reviewer: "The Domain Expert"

- Name: Dr. Ananya Singh
- Age: 38 | Occupation: Senior Researcher | Technical Comfort: High
- Goals: Contribute to quality control, manage review workload, maintain professional record
- Pain Points: Tight deadlines, unclear review guidelines, no acknowledgment system
- What VYOM Must Deliver: Structured review forms, deadline management, calendar integration hints, reviewer acknowledgment certificates

## Persona 5 – Editor: "The Workflow Manager"

- Name: Prof. Vikram Das
- Age: 52 | Occupation: Chief Editor | Technical Comfort: Moderate
- Goals: Maintain publication quality, manage reviewers, schedule issues on time
- Pain Points: Scattered communications, no single view of submission pipeline
- What VYOM Must Deliver: Unified submission dashboard, reviewer management panel, integrated communication log, issue scheduling calendar

## Persona 6 – Administrator: "The System Controller"

- Name: Sneha Kapoor
- Age: 35 | Occupation: Platform Administrator | Technical Comfort: Very High
- Goals: Keep the system running, ensure compliance, generate reports for management
- Pain Points: No real-time monitoring, manual report compilation
- What VYOM Must Deliver: Admin control panel, real-time dashboards, automated reports, audit trail, manual override capability

---

# 4. USER JOURNEY MAPS

## 4.1 Public Visitor Journey

```
AWARENESS
    │
    ▼
Lands on Homepage
    │
    ├──► Reads About Us → Understands VYOM credibility
    │
    ├──► Browses Books & Categories → Discovers content
    │
    ├──► Reads Public Articles → Evaluates content quality
    │
    ├──► Views Editorial Board → Builds trust
    │
    ├──► Reads "Publish With Us" → Considers authorship
    │
    └──► Decision Point ──────────────────────┐
              │                               │
        Register as Member            Register as Author
```

## 4.2 Member Journey

```
Registration & Email Verification
    │
    ▼
Login → Member Dashboard
    │
    ├──► Profile Setup (Institution, Interests, Profile Photo)
    │
    ├──► Browse Articles → Read → Bookmark → Download
    │
    ├──► View Notifications (New Publications, Announcements)
    │
    ├──► Manage Reading History
    │
    ├──► View Saved/Bookmarked Content
    │
    └──► Manage Subscription (if applicable)
```

## 4.3 Author Journey (Full Lifecycle)

```
Registration
    │
    ▼
Profile Completion (ORCID, Affiliation, Bio, Areas of Expertise)
    │
    ▼
Abstract Submission
    │   [Title, Keywords, Abstract Text, Subject Area, Co-Authors, Declaration]
    ▼
Submission Confirmation + Acknowledgment Notification
    │
    ▼
Editorial Screening
    │
    ├── REJECTED ──► Rejection Notification with Reason → Author Archives Submission
    │
    └── ACCEPTED ──► Acceptance Notification
                        │
                        ▼
                  Manuscript Submission
                  [Full Document, Cover Letter, Figures, Supplementary Files]
                        │
                        ▼
                  Under Peer Review
                        │
                        ├── REVISION REQUESTED ──► Author Receives Comments
                        │                              │
                        │                              ▼
                        │                        Revision Submission
                        │                              │
                        │                              ▼
                        │                        Re-Review Cycle (loops back)
                        │
                        ├── REJECTED AFTER REVIEW ──► Final Rejection with Full Report
                        │
                        └── APPROVED ──► Editorial Final Approval
                                            │
                                            ▼
                                      Payment Triggered
                                            │
                                      [Invoice Generated → Payment Made → Receipt Issued]
                                            │
                                            ▼
                                      Scheduled for Publication
                                            │
                                            ▼
                                      Published → Author Notified
                                            │
                                            ▼
                                      Certificate + Published Document Access
```

## 4.4 Reviewer Journey

```
Invitation / Assignment by Editor
    │
    ▼
Review Invitation Notification (Email + Platform)
    │
    ├── DECLINED ──► Reason Captured → Editor Reassigns
    │
    └── ACCEPTED ──► Review Assignment Confirmed
                        │
                        ▼
                  Access Manuscript (Anonymous/Blind)
                        │
                        ▼
                  Complete Review Form
                  [Scores, Comments, Revision Notes, Recommendation]
                        │
                        ▼
                  Submit Review
                        │
                        ├── Revision Recommended ──► Editor forwards to Author
                        │
                        ├── Accept ──► Editorial Approval Process
                        │
                        └── Reject ──► Editor Reviews Rejection Report
```

## 4.5 Editor Journey

```
Login → Editor Dashboard
    │
    ├──► View Submission Queue (New Abstracts / Manuscripts)
    │        │
    │        ▼
    │   Review Submission
    │        │
    │        ├── Reject at Screening ──► Send Rejection Notification
    │        │
    │        └── Accept → Assign to Reviewer(s)
    │                        │
    │                        ▼
    │                  Monitor Review Progress
    │                        │
    │                        ▼
    │                  Receive Review Reports
    │                        │
    │                  Make Editorial Decision
    │                  (Accept / Revise / Reject)
    │
    ├──► Manage Issues & Volumes
    │        [Create Issue → Assign Approved Papers → Schedule Publication Date]
    │
    ├──► Communicate with Authors (Structured Messaging)
    │
    └──► Archive Management
```

## 4.6 Admin Journey

```
Login → Admin Control Panel
    │
    ├──► User Management (Create / Edit / Deactivate / Role Assignment)
    │
    ├──► Content Management (Categories / Guidelines / Announcements)
    │
    ├──► Editorial Board Management (Add/Remove Members, Assign Domains)
    │
    ├──► Financial Overview (Payments Received / Pending / Reports)
    │
    ├──► System Reports (Submission Stats / Review Turnaround / Publication Rate)
    │
    ├──► Audit Log Review
    │
    └──► System Configuration (Workflow Rules / Notification Templates / Deadlines)
```

---

# 5. PUBLICATION LIFECYCLE – STATE DEFINITIONS & TRANSITIONS

## 5.1 Complete State Diagram

```
                        ┌─────────────────┐
                        │      DRAFT      │ ◄── Author creating/editing
                        └────────┬────────┘
                                 │ Author Submits Abstract
                                 ▼
                        ┌─────────────────┐
                        │   ABSTRACT      │
                        │   SUBMITTED     │ ◄── Awaiting editorial screening
                        └────────┬────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
           ┌──────────────┐         ┌──────────────────┐
           │  ABSTRACT    │         │    ABSTRACT      │
           │  REJECTED    │         │    ACCEPTED      │
           └──────────────┘         └────────┬─────────┘
           (Terminal – Author                │ Author submits Manuscript
            can re-submit new)               ▼
                                    ┌──────────────────┐
                                    │   MANUSCRIPT     │
                                    │   SUBMITTED      │
                                    └────────┬─────────┘
                                             │ Editor assigns reviewers
                                             ▼
                                    ┌──────────────────┐
                                    │  UNDER PEER      │
                                    │  REVIEW          │
                                    └────────┬─────────┘
                                             │
                          ┌──────────────────┼───────────────────┐
                          │                  │                   │
                          ▼                  ▼                   ▼
                 ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐
                 │  REVISION    │   │  REJECTED    │   │   CONDITIONALLY  │
                 │  REQUESTED   │   │  AFTER REVIEW│   │   ACCEPTED       │
                 └──────┬───────┘   └──────────────┘   └────────┬─────────┘
                        │           (Terminal)                   │
                        │ Author submits revision                │ Editor Final Check
                        ▼                                        ▼
               ┌─────────────────┐                    ┌──────────────────┐
               │  REVISION       │                    │  EDITORIALLY     │
               │  SUBMITTED      │──► (loops back     │  APPROVED        │
               └─────────────────┘    to peer review) └────────┬─────────┘
                                                               │ Payment Triggered
                                                               ▼
                                                      ┌──────────────────┐
                                                      │  PAYMENT         │
                                                      │  PENDING         │
                                                      └────────┬─────────┘
                                                               │ Payment Confirmed
                                                               ▼
                                                      ┌──────────────────┐
                                                      │  SCHEDULED FOR   │
                                                      │  PUBLICATION     │
                                                      └────────┬─────────┘
                                                               │ Publication Date Reached
                                                               ▼
                                                      ┌──────────────────┐
                                                      │   PUBLISHED      │
                                                      └────────┬─────────┘
                                                               │ After defined period
                                                               ▼
                                                      ┌──────────────────┐
                                                      │   ARCHIVED       │
                                                      └──────────────────┘
```

## 5.2 State Definitions

| State | Definition | Owner |
|-------|------------|-------|
| DRAFT | Author is composing/editing the abstract before submission | Author |
| ABSTRACT SUBMITTED | Abstract formally submitted; awaiting editorial screening | System |
| ABSTRACT REJECTED | Editor has rejected abstract; reason documented | Editor |
| ABSTRACT ACCEPTED | Abstract approved; author invited to submit full manuscript | Editor |
| MANUSCRIPT SUBMITTED | Full manuscript received; awaiting review assignment | Author/System |
| UNDER PEER REVIEW | Manuscript assigned to and being evaluated by reviewer(s) | Reviewer |
| REVISION REQUESTED | Reviewer/Editor has requested modifications | Editor |
| REVISION SUBMITTED | Author has submitted revised manuscript | Author |
| REJECTED AFTER REVIEW | Manuscript rejected post peer review; reason documented | Editor |
| CONDITIONALLY ACCEPTED | Accepted pending minor corrections | Editor |
| EDITORIALLY APPROVED | Final editorial sign-off granted | Editor |
| PAYMENT PENDING | Publication fee invoice issued; awaiting author payment | System |
| SCHEDULED FOR PUBLICATION | Payment confirmed; assigned to issue/volume; awaiting date | Editor |
| PUBLISHED | Content live and publicly visible | System |
| ARCHIVED | Content moved to archive after active period | System/Admin |

## 5.3 Transition Rules

| From State | To State | Trigger | Actor | Condition |
|------------|----------|---------|-------|-----------|
| DRAFT | ABSTRACT SUBMITTED | Submit action | Author | All required fields complete |
| ABSTRACT SUBMITTED | ABSTRACT ACCEPTED | Editorial decision | Editor | Meets scope and quality criteria |
| ABSTRACT SUBMITTED | ABSTRACT REJECTED | Editorial decision | Editor | Out of scope, low quality, duplicate |
| ABSTRACT ACCEPTED | MANUSCRIPT SUBMITTED | Manuscript upload | Author | Within submission deadline |
| MANUSCRIPT SUBMITTED | UNDER PEER REVIEW | Reviewer assignment | Editor | Minimum 1 reviewer assigned |
| UNDER PEER REVIEW | REVISION REQUESTED | Review submitted | Reviewer/Editor | Major/minor revisions needed |
| UNDER PEER REVIEW | REJECTED AFTER REVIEW | Review submitted | Reviewer/Editor | Unanimous rejection |
| UNDER PEER REVIEW | CONDITIONALLY ACCEPTED | Review submitted | Reviewer/Editor | Minor corrections needed |
| REVISION REQUESTED | REVISION SUBMITTED | Revision upload | Author | Within revision deadline |
| REVISION SUBMITTED | UNDER PEER REVIEW | Re-assignment | Editor | Revision requires re-review |
| CONDITIONALLY ACCEPTED | EDITORIALLY APPROVED | Final check | Editor | All conditions satisfied |
| EDITORIALLY APPROVED | PAYMENT PENDING | Auto-trigger | System | After editorial approval |
| PAYMENT PENDING | SCHEDULED FOR PUBLICATION | Payment confirmed | System/Payment Gateway | Full payment received |
| SCHEDULED FOR PUBLICATION | PUBLISHED | Publication date | System (automated) | Date reached, content verified |
| PUBLISHED | ARCHIVED | Time trigger / Admin | System/Admin | Archival policy period met |

---

# 6. WORKFLOW DIAGRAMS

## 6.1 Abstract Submission Workflow

```
Author Submits Abstract
         │
         ▼
System validates form completeness
         │
    Incomplete ──► Return to Author with errors
         │
      Complete
         │
         ▼
Submission ID generated
Acknowledgment sent to Author
         │
         ▼
Abstract enters Editorial Queue
         │
         ▼
Editor reviews:
  - Scope alignment
  - Quality threshold
  - Duplicate check
  - Author eligibility
         │
         ├── REJECT ──► Rejection email with reason → Status = ABSTRACT REJECTED
         │
         └── ACCEPT ──► Acceptance email with manuscript guidelines
                          Status = ABSTRACT ACCEPTED
                          Manuscript deadline set
```

## 6.2 Peer Review Workflow

```
Manuscript Received
         │
         ▼
Editor selects reviewer pool (by subject area, availability, no conflict of interest)
         │
         ▼
Review Invitation sent (with deadline)
         │
    Reviewer DECLINES ──► New reviewer selected (escalation if pool exhausted)
         │
    Reviewer ACCEPTS
         │
         ▼
Manuscript shared (blinded as per policy)
         │
         ▼
Review deadline active (reminders at 50%, 75%, 100% of deadline)
         │
    Missed deadline ──► Editor escalation → reassign or extend
         │
    Review submitted
         │
         ▼
Editor reviews all submitted reports
         │
         ▼
Editorial Decision:
  ├── REJECT ──────────────────────────────────────► Status = REJECTED AFTER REVIEW
  ├── REVISION REQUIRED ──► Notify Author → Status = REVISION REQUESTED
  └── ACCEPT ─────────────────────────────────────► Status = CONDITIONALLY ACCEPTED
```

## 6.3 Payment Workflow

```
Editorial Approval granted
         │
         ▼
System generates Invoice
  - Author name
  - Submission ID
  - Article title
  - Amount due
  - Due date
         │
         ▼
Invoice sent to Author via notification + email
Status = PAYMENT PENDING
         │
         ▼
Author accesses payment portal
         │
    Payment FAILED ──► Retry allowed (up to 3 attempts before support escalation)
         │
    Payment SUCCESS
         │
         ▼
Receipt generated
Payment record stored
Status = SCHEDULED FOR PUBLICATION
Editor notified
```

## 6.4 Editorial Decision Workflow

```
Editor receives all reviewer reports
         │
         ▼
Editor reads reports + manuscript
         │
         ▼
Editor Decision Matrix:
  All reviewers recommend Accept? ──► ACCEPT (Conditional or Full)
  Mixed reviews? ──► Editor judgment → may seek additional review
  Majority recommend Reject? ──► REJECT (with consolidated report)
  Any recommend Revision? ──► REVISION REQUESTED
         │
         ▼
Decision logged with:
  - Decision type
  - Editor ID
  - Timestamp
  - Supporting rationale
  - Reviewer report references
         │
         ▼
Author notified with full decision report
```

---

# 7. MODULE BREAKDOWN

## Module 1: Public Portal

Purpose: Public-facing content and information layer
Responsibilities:
- Serve homepage, about, guidelines, editorial board, contact
- Display published books, articles, categories
- Show upcoming publications
- Host "Publish With Us" onboarding content

Dependencies: Content Management Module, Publication Module
Owner Role: Administrator / Editor
Submodules:
- Homepage & Navigation
- Book Catalog
- Article Browser
- Editorial Board Display
- Static Content Management (About, Guidelines)
- Announcements & Notices Board

---

## Module 2: Authentication & Identity Management

Purpose: Govern all user access, identity, and sessions
Responsibilities:
- Registration, login, logout, password management
- Email verification, OTP handling
- Session management and token lifecycle
- Role assignment at registration and by admin

Dependencies: All modules (foundational)
Owner Role: Administrator
Submodules:
- Registration Flows (Member / Author / Reviewer)
- Login & Session Management
- Password Reset & Recovery
- Email Verification
- Role & Permission Assignment

---

## Module 3: Member Module

Purpose: Personalized reader experience for registered members
Responsibilities:
- Dashboard with reading activity
- Content bookmarking and downloads
- Notification center
- Profile management

Dependencies: Authentication, Content/Publication Module
Owner Role: Member (self-managed)
Submodules:
- Member Dashboard
- Profile Management
- Bookmarks & Saved Content
- Download History
- Reading History
- Notification Preferences
- Subscription Management

---

## Module 4: Author Module

Purpose: Full author submission and communication lifecycle
Responsibilities:
- Abstract and manuscript submission
- Revision management
- Status tracking
- Payment processing
- Document access post-publication

Dependencies: Authentication, Submission Engine, Reviewer Module, Payment Module, Notification Module
Owner Role: Author
Submodules:
- Author Dashboard
- Abstract Submission Form
- Manuscript Submission Form
- Revision Submission
- Submission Status Tracker
- Author–Editor Communication (Query System)
- Payment Interface
- Certificate & Document Access
- Submission History Archive

---

## Module 5: Reviewer Module

Purpose: Peer review management and reviewer governance
Responsibilities:
- Review invitation and acceptance
- Manuscript access management (blinded)
- Structured review form submission
- Deadline tracking
- Reviewer performance record

Dependencies: Authentication, Submission Engine, Notification Module, Editor Module
Owner Role: Reviewer / Editor
Submodules:
- Reviewer Dashboard
- Assignment Management (Accept / Decline)
- Manuscript Viewer (Blinded Access)
- Structured Review Form
- Deadline Tracker & Reminders
- Review History
- Performance Metrics

---

## Module 6: Editor Module

Purpose: Editorial oversight, decision-making, and publication management
Responsibilities:
- Submission queue management
- Reviewer selection and assignment
- Editorial decisions at each stage
- Publication scheduling and issue management
- Author and reviewer communication

Dependencies: Submission Engine, Reviewer Module, Author Module, Publication Module, Notification Module
Owner Role: Editor
Submodules:
- Editor Dashboard
- Submission Queue
- Screening & Decision Workspace
- Reviewer Assignment Panel
- Communication Center
- Issue & Volume Management
- Publication Scheduling
- Archive Management

---

## Module 7: Submission Engine

Purpose: Core workflow orchestration for all submissions
Responsibilities:
- State machine governing all submission transitions
- Deadline calculation and enforcement
- Workflow rule execution
- Audit trail generation for all state changes

Dependencies: All content modules (foundational workflow engine)
Owner Role: System / Administrator
Submodules:
- Submission State Machine
- Deadline Management
- Workflow Rules Engine
- Duplicate Detection
- Submission Audit Logger

---

## Module 8: Payment Module

Purpose: Financial transaction management for publication fees
Responsibilities:
- Invoice generation
- Payment gateway integration
- Receipt generation and storage
- Financial reporting

Dependencies: Submission Engine, Notification Module
Owner Role: System / Administrator
Submodules:
- Invoice Generator
- Payment Gateway Interface
- Transaction Record Management
- Receipt & Confirmation System
- Financial Reports

---

## Module 9: Notification Module

Purpose: Multi-channel communication engine
Responsibilities:
- Trigger-based notification delivery
- Email notification management
- In-platform notification center
- Notification templates management
- Digest and scheduling

Dependencies: All modules (event-driven)
Owner Role: System / Administrator
Submodules:
- Notification Trigger Engine
- Email Notification Service
- In-Platform Notification Center
- Notification Templates
- Notification Preferences
- Notification History Log

---

## Module 10: Admin Control Panel

Purpose: Full platform governance and oversight
Responsibilities:
- User and role management
- System configuration
- Editorial board management
- Revenue and analytics oversight
- Audit log review

Dependencies: All modules
Owner Role: Administrator
Submodules:
- User Management
- Role & Permission Management
- Editorial Board Management
- Content Configuration
- Financial Overview
- System Reports & Analytics
- Audit Log Viewer
- Announcement Management
- System Settings & Configuration

---

## Module 11: Document Management

Purpose: Secure storage, versioning, and access of all submission documents
Responsibilities:
- File upload handling
- Document versioning (original, revision 1, revision 2, published version)
- Access control per document per role
- Published document delivery

Dependencies: Submission Engine, Auth Module, Publication Module
Owner Role: System / Editor / Admin
Submodules:
- File Upload Service
- Document Version Manager
- Access Control Layer
- Document Preview Service
- Archive Storage

---

# 8. ENTITY IDENTIFICATION & DATA ANALYSIS

## 8.1 Core Entities

### Entity: User
- Represents all platform actors
- Has role(s): Visitor (not stored), Member, Author, Reviewer, Editor, Admin
- Lifecycle: Registration → Active → Suspended → Deactivated
- Key Attributes: Full name, email, password (hashed), role, status, registration date, profile details

### Entity: Author Profile
- Extended from User (when role = Author)
- Key Attributes: ORCID ID, institutional affiliation, department, research areas, biography, publication count

### Entity: Reviewer Profile
- Extended from User (when role = Reviewer)
- Key Attributes: Domain expertise, institutional affiliation, review history, availability status, performance score

### Entity: Abstract
- The entry point of every publication journey
- Key Attributes: Title, abstract text, keywords, subject area, co-author list, submission date, status, rejection reason (if any)
- Relationships: Belongs to Author, linked to Manuscript (if accepted)

### Entity: Manuscript
- The full submission following abstract acceptance
- Key Attributes: Title, document file reference, cover letter, version number, submission date, current status, word count
- Relationships: Linked to Abstract, belongs to Author, assigned to Reviewer(s), managed by Editor

### Entity: Revision
- A version of the manuscript submitted after revision request
- Key Attributes: Revision number, submitted date, response letter, revised document reference, change summary
- Relationships: Belongs to Manuscript, triggered by Review Report

### Entity: Review Assignment
- Tracks individual reviewer assignment to a manuscript
- Key Attributes: Assignment date, acceptance status, deadline, completion status, declined reason
- Relationships: Links Reviewer to Manuscript

### Entity: Review Report
- The structured output submitted by a reviewer
- Key Attributes: Scores (originality, methodology, clarity, relevance), detailed comments, recommendation (Accept/Revise/Reject), submission date
- Relationships: Belongs to Review Assignment

### Entity: Editorial Decision
- Formal decision logged by an editor at any workflow stage
- Key Attributes: Decision type, decision date, rationale, editor ID, referenced review reports
- Relationships: Linked to Manuscript or Abstract, made by Editor

### Entity: Publication Issue / Volume
- Groups published manuscripts into formal publication units
- Key Attributes: Volume number, issue number, publication date, ISSN, status
- Relationships:
---
---
# VYOM PUBLICATION – PHASE 2: DATABASE DESIGN, ENTITY RELATIONSHIPS & API ARCHITECTURE

---

## TABLE OF CONTENTS

1. Complete Entity Catalogue
2. Entity Relationship Diagram (ERD)
3. Database Architecture & Collection Designs
4. Submission Lifecycle Data Model
5. File Management Architecture
6. Permission Matrix
7. API Architecture
8. Search Architecture
9. Audit & Compliance Architecture
10. Analytics Architecture
11. Scalability Review
12. Production Deployment Recommendations

---

# 1. COMPLETE ENTITY CATALOGUE

## 1.1 Identity & Access Domain

### Entity: users
Purpose: Central identity record for every person on the platform. All roles are derived from this entity. No duplicate identity should exist regardless of how many roles a person holds.

### Entity: roles
Purpose: Defines all named roles in the system — Visitor, Member, Author, Reviewer, Editor, Administrator. Designed to be extended without schema changes.

### Entity: permissions
Purpose: Atomic capability units — create_submission, approve_manuscript, assign_reviewer, publish_content, etc. Each permission is a discrete business action.

### Entity: role_permissions
Purpose: Junction table mapping which permissions belong to which roles. Supports custom role composition without code changes.

### Entity: user_roles
Purpose: Assigns one or more roles to a user. A single person can be both Author and Reviewer simultaneously.

### Entity: user_sessions
Purpose: Tracks active login sessions, device fingerprints, IP addresses, and token lifecycle for security and audit purposes.

### Entity: password_reset_tokens
Purpose: Stores time-limited, single-use tokens for password recovery flows. Prevents token reuse.

### Entity: email_verification_tokens
Purpose: Manages email verification state during registration and email change workflows.

---

## 1.2 Profile Domain

### Entity: member_profiles
Purpose: Extended profile data for users with the Member role — reading preferences, subscription tier, notification settings.

### Entity: author_profiles
Purpose: Extended profile for Authors — ORCID ID, institutional affiliation, department, research areas, biography, co-authorship history. Required before abstract submission is allowed.

### Entity: reviewer_profiles
Purpose: Extended profile for Reviewers — domains of expertise, current workload, availability flag, performance score, institutional affiliation.

### Entity: editor_profiles
Purpose: Extended profile for Editors — assigned subject areas, editorial role level (Associate Editor, Senior Editor, Chief Editor), issue management scope.

---

## 1.3 Content Domain

### Entity: books
Purpose: Master record for every book published or managed on the platform. Supports both authored books and edited volumes.

### Entity: book_categories
Purpose: Hierarchical classification system for books — supports parent categories and subcategories.

### Entity: book_authors
Purpose: Junction entity linking books to their authors with role indicators (primary author, co-author, editor-of-volume).

### Entity: articles
Purpose: Individual article records — both standalone articles and articles belonging to journal issues. Tracks access type (open/restricted), DOI, and publication status.

### Entity: article_authors
Purpose: Links articles to author profiles with order and contribution role.

### Entity: article_categories
Purpose: Tags articles to subject categories and research areas.

### Entity: journals
Purpose: Defines journal entities — title, ISSN, scope, frequency, editorial policy.

### Entity: journal_issues
Purpose: Volume and issue records for journals — groups multiple articles into a formal publication unit.

### Entity: upcoming_publications
Purpose: Records books and articles scheduled for future publication — visible to public as "coming soon" with configurable metadata reveal.

---

## 1.4 Submission Domain

### Entity: submissions
Purpose: The master record for every author's publication attempt. Acts as the central hub linking abstract, manuscript, reviews, decisions, and payments. Every workflow event references this entity.

### Entity: abstracts
Purpose: The first formal document in the lifecycle. Contains title, abstract text, keywords, subject area, co-author declarations, and ethical compliance confirmations.

### Entity: manuscripts
Purpose: The full document submission. Linked to an accepted abstract. Tracks version history, cover letter, supplementary materials, and word count.

### Entity: manuscript_versions
Purpose: Immutable version record for every iteration of a manuscript — original, revision 1, revision 2, final. Ensures full document history is preserved.

### Entity: co_author_declarations
Purpose: Tracks each co-author declared on a submission — name, affiliation, contribution statement, email, confirmation status.

### Entity: submission_keywords
Purpose: Normalized keyword store linked to submissions for search indexing and matching.

### Entity: submission_subject_areas
Purpose: Links submissions to subject area taxonomy for editorial routing and reviewer matching.

---

## 1.5 Review Domain

### Entity: review_assignments
Purpose: Governs the assignment of a reviewer to a specific manuscript version. Tracks invitation, acceptance, deadline, and completion state.

### Entity: review_reports
Purpose: The structured output of a completed review — numerical scores, detailed comments per section, overall recommendation, and confidential notes to editor.

### Entity: review_criteria
Purpose: Configurable scoring rubric definitions — originality, methodology, clarity, significance, formatting. Allows editorial policy to evolve over time.

### Entity: review_scores
Purpose: Individual score records per review criterion per review report. Normalized for analytics and threshold enforcement.

### Entity: revision_requests
Purpose: Formal revision request document generated by editor after review — lists specific changes required, categorized by severity.

### Entity: revision_responses
Purpose: Author's structured response to each revision request item — acknowledgment, action taken, location of changes.

---

## 1.6 Editorial Domain

### Entity: editorial_decisions
Purpose: Formal, immutable record of every editorial decision made on a submission — at abstract stage, post-review, post-revision. Includes decision type, rationale, and editor identity.

### Entity: editorial_board_members
Purpose: Records persons serving on the editorial board — role, subject area, term dates, biography, photo. Separate from operational editor accounts but may be linked.

### Entity: editorial_assignments
Purpose: Assigns a specific editor to a specific submission for accountability and workload tracking.

---

## 1.7 Payment Domain

### Entity: invoices
Purpose: Formal invoice records generated upon editorial approval — article processing charges, book publication fees, etc.

### Entity: payments
Purpose: Transaction records for all payment events — successful, failed, refunded. Linked to invoice and submission.

### Entity: payment_line_items
Purpose: Itemized fee breakdown within an invoice — base fee, expedited review surcharge, color figure fee, etc.

### Entity: refunds
Purpose: Records refund events with reason, amount, approval chain, and processing status.

### Entity: fee_configurations
Purpose: Admin-configurable fee structures per content type, subject area, or author category. Enables fee policy changes without code deployment.

---

## 1.8 Communication Domain

### Entity: notifications
Purpose: In-platform notification records triggered by workflow events — linked to recipient user, event type, and reference entity.

### Entity: notification_templates
Purpose: Configurable message templates for all notification types — supports variable substitution for personalization.

### Entity: notification_preferences
Purpose: Per-user configuration for which notification types are delivered via which channels — in-app, email, SMS.

### Entity: messages
Purpose: Structured messaging between Authors and Editors on a specific submission — replaces email communication with an auditable in-platform thread.

### Entity: message_threads
Purpose: Groups messages into conversation threads scoped to a submission, creating a complete communication audit trail.

### Entity: announcements
Purpose: Admin-published platform-wide notices — pinned, dated, with audience targeting (all users, authors only, members only).

### Entity: contact_submissions
Purpose: Records submitted contact form messages from public visitors — tracks status (new, in progress, resolved).

---

## 1.9 Reader Engagement Domain

### Entity: reading_history
Purpose: Tracks every article or book a member has accessed — supports reading progress, return-to-reading, and recommendation logic.

### Entity: bookmarks
Purpose: User-saved content references — articles, books, upcoming publications. Supports folder-based organization.

### Entity: downloads
Purpose: Logs every permitted file download — user, content reference, file type, timestamp. Supports quota enforcement and analytics.

### Entity: content_ratings
Purpose: Reader ratings for published content — supports aggregated quality signals and future recommendation features.

---

## 1.10 Operational Domain

### Entity: categories
Purpose: Master taxonomy for content classification — hierarchical, supports both books and articles.

### Entity: tags
Purpose: Flexible keyword tagging for content discoverability — user-generated or editorial-applied.

### Entity: content_tags
Purpose: Junction table linking tags to content items (articles, books, submissions).

### Entity: newsletters
Purpose: Newsletter edition records — title, issue date, summary content, distribution list reference.

### Entity: newsletter_subscribers
Purpose: Tracks email subscriptions with confirmation status, subscription preferences, and unsubscribe records.

### Entity: support_tickets
Purpose: Platform support requests from any authenticated user — categorized, prioritized, and assigned to admin staff.

### Entity: support_ticket_responses
Purpose: Response thread records for support tickets — tracks agent replies, resolution steps, and resolution status.

---

## 1.11 Audit & Compliance Domain

### Entity: audit_logs
Purpose: Immutable, append-only record of every state-changing action on the platform — actor, timestamp, action type, before/after state, IP address.

### Entity: submission_history
Purpose: Dedicated timeline of every status transition for a submission — provides the complete lifecycle view in one query.

### Entity: document_access_logs
Purpose: Records every access event to a secured document — who, what, when, from where. Satisfies compliance requirements.

### Entity: security_events
Purpose: Records authentication anomalies, unauthorized access attempts, rate limit breaches, and suspicious activity.

---

# 2. ENTITY RELATIONSHIP DIAGRAM

## 2.1 Identity Domain Relationships

```
users
  ├─── user_roles (M:M via user_roles junction) ──► roles
  │         └──► role_permissions ──► permissions
  ├─── user_sessions (1:M)
  ├─── password_reset_tokens (1:M)
  ├─── email_verification_tokens (1:M)
  ├─── member_profiles (1:1, only if role=Member)
  ├─── author_profiles (1:1, only if role=Author)
  ├─── reviewer_profiles (1:1, only if role=Reviewer)
  └─── editor_profiles (1:1, only if role=Editor)
```

## 2.2 Submission Domain Relationships

```
users (Author)
  └─── submissions (1:M)
         ├─── abstracts (1:1)
         │      └─── co_author_declarations (1:M)
         ├─── manuscripts (1:M, versioned)
         │      └─── manuscript_versions (1:M)
         ├─── review_assignments (1:M)
         │      ├─── users (Reviewer) (M:1)
         │      └─── review_reports (1:1)
         │             └─── review_scores (1:M) ──► review_criteria
         ├─── revision_requests (1:M)
         │      └─── revision_responses (1:M)
         ├─── editorial_decisions (1:M) ──► users (Editor)
         ├─── editorial_assignments (1:M) ──► users (Editor)
         ├─── message_threads (1:M)
         │      └─── messages (1:M)
         ├─── invoices (1:1)
         │      ├─── payment_line_items (1:M)
         │      └─── payments (1:M)
         │             └─── refunds (1:M)
         └─── submission_history (1:M)
```

## 2.3 Content Domain Relationships

```
books
  ├─── book_authors (M:M via junction) ──► author_profiles
  ├─── book_categories (M:M via junction) ──► categories
  └─── content_tags (M:M via junction) ──► tags

journals
  └─── journal_issues (1:M)
         └─── articles (1:M)
                ├─── article_authors (M:M via junction) ──► author_profiles
                ├─── article_categories (M:M via junction) ──► categories
                └─── content_tags (M:M via junction) ──► tags

submissions ──► articles (1:1, when published)
submissions ──► books (1:1, when published as book)
```

## 2.4 Engagement Domain Relationships

```
users (Member)
  ├─── reading_history (1:M) ──► articles / books
  ├─── bookmarks (1:M) ──► articles / books / upcoming_publications
  ├─── downloads (1:M) ──► articles / books / manuscripts
  └─── content_ratings (1:M) ──► articles / books
```

## 2.5 Communication Domain Relationships

```
users
  ├─── notifications (1:M)
  ├─── notification_preferences (1:1)
  └─── message_threads (M:M)
         └─── messages (1:M) ──► users (sender)

announcements ──► users (audience filter)
contact_submissions ──► support_tickets (1:1, when escalated)
```

---

# 3. DATABASE ARCHITECTURE & COLLECTION DESIGNS

## Design Philosophy

- Primary datastore: MongoDB (document-oriented, schema-flexible for evolving publication workflows)
- Relational candidates: payments, invoices, fee_configurations, role_permissions (strict referential integrity needed)
- Hybrid strategy: MongoDB for workflow/content data; PostgreSQL for financial and permission data
- All collections include: created_at, updated_at, created_by, is_deleted (soft delete), schema_version

---

## 3.1 Collection: users

```
Purpose: Central identity for all platform users

Fields:
  _id                   ObjectId        PK, auto-generated
  email                 String          Required, Unique, Indexed, Lowercase
  password_hash         String          Required, bcrypt, never returned in API
  full_name             String          Required
  phone_number          String          Optional, E.164 format
  profile_photo_url     String          Optional, file reference
  status                Enum            [active, suspended, deactivated, pending_verification]
  email_verified        Boolean         Default: false
  last_login_at         DateTime        Nullable
  created_at            DateTime        Auto, Indexed
  updated_at            DateTime        Auto
  created_by            ObjectId        Nullable (admin-created accounts)
  is_deleted            Boolean         Default: false (soft delete)
  deleted_at            DateTime        Nullable
  schema_version        Integer         Default: 1

Indexes:
  email (unique)
  status
  created_at

Rules:
  - Email must be unique across all users regardless of status
  - Soft delete only — no hard deletes on user records
  - Password hash must never appear in any API response
```

## 3.2 Collection: user_roles

```
Purpose: Assigns roles to users. Supports multiple roles per user.

Fields:
  _id           ObjectId    PK
  user_id       ObjectId    FK → users, Required, Indexed
  role_id       ObjectId    FK → roles, Required
  assigned_by   ObjectId    FK → users (admin), Required
  assigned_at   DateTime    Auto
  is_active     Boolean     Default: true
  revoked_at    DateTime    Nullable

Indexes:
  user_id
  Compound: user_id + role_id (unique when is_active=true)
```

## 3.3 Collection: author_profiles

```
Purpose: Extended professional data for all Author-role users

Fields:
  _id                   ObjectId    PK
  user_id               ObjectId    FK → users, Unique, Required, Indexed
  orcid_id              String      Optional, validated format
  salutation            Enum        [Dr., Prof., Mr., Ms., Mrs.]
  institution           String      Required
  department            String      Optional
  country               String      Required, ISO 3166-1
  biography             String      Optional, max 1000 chars
  research_areas        Array[String]   Required, min 1
  website_url           String      Optional, URL validated
  submission_count      Integer     Default: 0, maintained by system
  published_count       Integer     Default: 0, maintained by system
  profile_complete      Boolean     Computed, required before submission
  created_at            DateTime    Auto
  updated_at            DateTime    Auto

Indexes:
  user_id (unique)
  research_areas (multikey)
  country
```

## 3.4 Collection: reviewer_profiles

```
Purpose: Reviewer professional profile and availability management

Fields:
  _id                     ObjectId      PK
  user_id                 ObjectId      FK → users, Unique, Required
  institution             String        Required
  department              String        Optional
  country                 String        Required, ISO 3166-1
  expertise_domains       Array[String] Required, min 1, Indexed
  max_concurrent_reviews  Integer       Default: 3
  current_review_count    Integer       Default: 0, system-maintained
  is_available            Boolean       Default: true
  availability_note       String        Optional
  performance_score       Decimal       Range: 0.0–5.0, system-computed
  total_reviews_completed Integer       Default: 0
  avg_review_turnaround_days Integer    System-computed
  created_at              DateTime      Auto
  updated_at              DateTime      Auto

Indexes:
  user_id (unique)
  expertise_domains (multikey)
  is_available
  performance_score
```

## 3.5 Collection: submissions

```
Purpose: Master workflow record. Every abstract, manuscript, review, decision,
         and payment is a child of a submission record. This is the most critical
         collection in the system.

Fields:
  _id                   ObjectId    PK
  submission_code       String      Unique, human-readable, e.g. VYM-2024-00423
  author_id             ObjectId    FK → users, Required, Indexed
  content_type          Enum        [article, book_chapter, book, journal_article]
  title                 String      Required, Indexed (text)
  subject_area_ids      Array[ObjectId]  FK → categories, Required
  keywords              Array[String]    Required, min 3, Indexed
  current_status        Enum        [see full state list], Required, Indexed
  current_version       Integer     Default: 1
  assigned_editor_id    ObjectId    FK → users (Editor), Nullable, Indexed
  abstract_id           ObjectId    FK → abstracts, Nullable (set after submission)
  active_manuscript_id  ObjectId    FK → manuscripts, Nullable
  published_content_id  ObjectId    FK → articles/books, Nullable
  is_revision_of        ObjectId    FK → submissions, Nullable (for resubmissions)
  submission_deadline   DateTime    Nullable (manuscript due date after acceptance)
  payment_status        Enum        [not_required, pending, completed, waived]
  is_withdrawn          Boolean     Default: false
  withdrawn_at          DateTime    Nullable
  withdrawal_reason     String      Nullable
  created_at            DateTime    Auto, Indexed
  updated_at            DateTime    Auto
  schema_version        Integer     Default: 1

Indexes:
  submission_code (unique)
  author_id
  current_status
  assigned_editor_id
  created_at
  Compound: author_id + current_status
  Text: title, keywords

Status Enum Values (full list):
  draft | abstract_submitted | under_editorial_review | abstract_rejected |
  abstract_accepted | awaiting_manuscript | manuscript_submitted |
  under_peer_review | minor_revision_requested | major_revision_requested |
  revision_submitted | editorial_review | conditionally_accepted |
  accepted | rejected | payment_pending | ready_for_publication |
  published | archived

Rules:
  - submission_code must be generated at creation, never modified
  - Status transitions must be validated against allowed transition matrix
  - No hard deletes — use is_withdrawn or archival
  - Every status change must write to submission_history
```

## 3.6 Collection: abstracts

```
Purpose: First formal document in the lifecycle. Immutable after submission.

Fields:
  _id                       ObjectId        PK
  submission_id             ObjectId        FK → submissions, Unique, Required, Indexed
  abstract_text             String          Required, min 150 / max 500 words
  structured_sections       Object          Optional: {background, methods, results, conclusion}
  keywords                  Array[String]   Required, min 3
  subject_area_ids          Array[ObjectId] FK → categories
  co_authors                Array[Object]   [{name, email, institution, contribution_role, confirmed}]
  funding_statement         String          Optional
  conflict_of_interest      String          Required (declaration, even if "none")
  ethics_approval_number    String          Optional
  submission_date           DateTime        Auto (immutable)
  editorial_decision        Enum            [pending, accepted, rejected]  Default: pending
  decision_date             DateTime        Nullable
  decision_note             String          Nullable
  screened_by               ObjectId        FK → users (Editor), Nullable
  created_at                DateTime        Auto
  schema_version            Integer         Default: 1

Rules:
  - abstract_text is immutable after submission (snapshots revisions)
  - co_author email must be valid
  - conflict_of_interest cannot be empty
```

## 3.7 Collection: manuscripts

```
Purpose: Full document submission record. Tracks all versions.

Fields:
  _id                       ObjectId    PK
  submission_id             ObjectId    FK → submissions, Required, Indexed
  version_number            Integer     Required, starts at 1
  document_file_id          ObjectId    FK → file_assets, Required
  cover_letter_file_id      ObjectId    FK → file_assets, Nullable
  supplementary_file_ids    Array[ObjectId]  FK → file_assets
  word_count                Integer     Optional
  page_count                Integer     Optional
  figure_count              Integer     Default: 0
  table_count               Integer     Default: 0
  submission_date           DateTime    Auto (immutable)
  status                    Enum        [active, superseded, withdrawn]
  is_blinded                Boolean     Default: true (author info stripped for reviewers)
  blinded_file_id           ObjectId    FK → file_assets, Nullable
  submitted_by              ObjectId    FK → users (Author), Required

Indexes:
  submission_id
  Compound: submission_id + version_number (unique)
  status
```

## 3.8 Collection: review_assignments

```
Purpose: Governs reviewer–manuscript assignment lifecycle

Fields:
  _id                   ObjectId    PK
  submission_id         ObjectId    FK → submissions, Required, Indexed
  manuscript_id         ObjectId    FK → manuscripts, Required
  reviewer_id           ObjectId    FK → users (Reviewer), Required, Indexed
  assigned_by           ObjectId    FK → users (Editor), Required
  invited_at            DateTime    Auto
  response_deadline     DateTime    Required (48-72 hours for acceptance)
  review_deadline       DateTime    Required
  status                Enum        [invited, accepted, declined, completed, expired, withdrawn]
  acceptance_date       DateTime    Nullable
  decline_date          DateTime    Nullable
  decline_reason        String      Nullable
  completion_date       DateTime    Nullable
  reminder_count        Integer     Default: 0
  is_blinded            Boolean     Default: true
  review_report_id      ObjectId    FK → review_reports, Nullable
  created_at            DateTime    Auto
  updated_at            DateTime    Auto

Indexes:
  submission_id
  reviewer_id
  status
  review_deadline
  Compound: submission_id + reviewer_id + status
```

## 3.9 Collection: review_reports

```
Purpose: Structured output of reviewer evaluation

Fields:
  _id                         ObjectId    PK
  review_assignment_id        ObjectId    FK → review_assignments, Unique, Required
  submission_id               ObjectId    FK → submissions, Required, Indexed
  reviewer_id                 ObjectId    FK → users, Required
  manuscript_version          Integer     Required (which version was reviewed)
  summary_comments            String      Required, min 200 chars
  comments_to_author          String      Required (visible to author)
  comments_to_editor          String      Optional (confidential)
  specific_comments           Array[Object] [{section, page, line, comment}]
  scores                      Array[ObjectId] FK → review_scores
  recommendation              Enum        [accept, minor_revision, major_revision, reject]
  recommendation_rationale    String      Required
  attachment_file_ids         Array[ObjectId] FK → file_assets
  submitted_at                DateTime    Auto (immutable)
  is_visible_to_author        Boolean     Default: false (editor controls release)
  released_to_author_at       DateTime    Nullable
  created_at                  DateTime    Auto

Indexes:
  review_assignment_id (unique)
  submission_id
  reviewer_id
  recommendation
```

## 3.10 Collection: editorial_decisions

```
Purpose: Immutable formal decision record at each workflow stage

Fields:
  _id                   ObjectId    PK
  submission_id         ObjectId    FK → submissions, Required, Indexed
  editor_id             ObjectId    FK → users (Editor), Required
  decision_stage        Enum        [abstract_screening, post_review, post_revision, final]
  decision_type         Enum        [accept, reject, minor_revision, major_revision,
                                    conditional_accept, publish, archive]
  rationale             String      Required, min 50 chars
  review_report_ids     Array[ObjectId]  FK → review_reports (supporting evidence)
  revision_request_id   ObjectId    FK → revision_requests, Nullable
  decision_date         DateTime    Auto (immutable)
  notified_author       Boolean     Default: false
  notified_at           DateTime    Nullable
  schema_version        Integer     Default: 1

Rules:
  - No updates or deletes on this collection — append only
  - One decision per stage per lifecycle pass

Indexes:
  submission_id
  editor_id
  decision_stage
  decision_date
```

## 3.11 Collection: invoices

```
Purpose: Financial invoice issued upon editorial approval

Fields:
  _id                   ObjectId    PK
  invoice_number        String      Unique, formatted: INV-2024-00001
  submission_id         ObjectId    FK → submissions, Unique, Required, Indexed
  author_id             ObjectId    FK → users, Required
  line_items            Array[ObjectId]  FK → payment_line_items
  subtotal              Decimal     Required
  discount_amount       Decimal     Default: 0
  tax_amount            Decimal     Default: 0
  total_amount          Decimal     Required
  currency              String      Required, ISO 4217 (e.g. INR, USD)
  status                Enum        [draft, issued, partially_paid, paid, void, refunded]
  due_date              DateTime    Required
  issued_at             DateTime    Auto
  paid_at               DateTime    Nullable
  void_reason           String      Nullable
  payment_ids           Array[ObjectId]  FK → payments
  created_at            DateTime    Auto
  updated_at            DateTime    Auto

Indexes:
  invoice_number (unique)
  submission_id (unique)
  author_id
  status
  due_date
```

## 3.12 Collection: payments

```
Purpose: Individual transaction records — each payment attempt is one record

Fields:
  _id                   ObjectId    PK
  invoice_id            ObjectId    FK → invoices, Required, Indexed
  submission_id         ObjectId    FK → submissions, Required
  author_id             ObjectId    FK → users, Required
  amount                Decimal     Required
  currency              String      Required, ISO 4217
  payment_method        Enum        [card, upi, net_banking, wallet, bank_transfer]
  gateway               String      Required (payment gateway identifier)
  gateway_transaction_id String     Unique, Required after attempt
  gateway_order_id      String      Nullable
  status                Enum        [initiated, pending, success, failed, refunded]
  failure_reason        String      Nullable
  payment_date          DateTime    Auto
  receipt_url           String      Nullable (generated on success)
  attempt_number        Integer     Default: 1
  ip_address            String      Required
  created_at            DateTime    Auto

Indexes:
  invoice_id
  author_id
  gateway_transaction_id (unique when not null)
  status
  payment_date
```

## 3.13 Collection: notifications

```
Purpose: In-platform notification delivery records

Fields:
  _id                   ObjectId    PK
  recipient_id          ObjectId    FK → users, Required, Indexed
  notification_type     String      Required, maps to notification_templates
  title                 String      Required
  message               String      Required
  reference_type        String      Optional (submission, payment, announcement, etc.)
  reference_id          ObjectId    Optional (FK to relevant entity)
  channel               Enum        [in_app, email, sms]
  is_read               Boolean     Default: false, Indexed
  read_at               DateTime    Nullable
  sent_at               DateTime    Auto
  delivery_status       Enum        [pending, sent, failed, delivered]
  created_at            DateTime    Auto

Indexes:
  recipient_id
  Compound: recipient_id + is_read
  sent_at
  reference_type + reference_id
```

## 3.14 Collection: audit_logs

```
Purpose: Immutable, append-only compliance and security record

Fields:
  _id               ObjectId    PK
  actor_id          ObjectId    FK → users, Nullable (null for system actions)
  actor_type        Enum        [user, system, admin, scheduler]
  action            String      Required (namespaced: submission.status_changed)
  entity_type       String      Required (e.g. submission, user, payment)
  entity_id         ObjectId    Required
  previous_state    Object      Nullable (JSON snapshot)
  new_state         Object      Nullable (JSON snapshot)
  ip_address        String      Nullable
  user_agent        String      Nullable
  session_id        ObjectId    Nullable FK → user_sessions
  timestamp         DateTime    Auto, Indexed (TTL exempt — never expire)
  metadata          Object      Nullable (additional context)

Rules:
  - No updates, no deletes — ever
  - Separate capped or time-series collection recommended for volume management
  - Write concern: majority (never lose an audit record)

Indexes:
  actor_id
  entity_type + entity_id (compound)
  action
  timestamp
```

## 3.15 Collection: submission_history

```
Purpose: Dedicated, human-readable lifecycle timeline per submission

Fields:
  _id               ObjectId    PK
  submission_id     ObjectId    FK → submissions, Required, Indexed
  from_status       String      Required
  to_status         String      Required
  transitioned_by   ObjectId    FK → users, Required
  transitioned_at   DateTime    Auto
  reason            String      Optional
  system_note       String      Optional

Indexes:
  submission_id
  transitioned_at
```

## 3.16 Collection: file_assets

```
Purpose: Central file metadata registry — decouples file references from storage

Fields:
  _id               ObjectId    PK
  uploaded_by       ObjectId    FK → users, Required
  original_filename String      Required
  stored_filename   String      Required (UUID-based, not guessable)
  file_type         Enum        [abstract, manuscript, manuscript_blinded, cover_letter,
                                 supplementary, book_cover, article_pdf, invoice,
                                 certificate, review_attachment, author_photo]
  mime_type         String      Required
  file_size_bytes   Integer     Required
  storage_bucket    String      Required
  storage_path      String      Required (relative, never exposed via API)
  checksum_sha256   String      Required (integrity verification)
  access_level      Enum        [public, authenticated, role_restricted, submission_party]
  allowed_roles     Array[String]  Nullable (when access_level = role_restricted)
  submission_id     ObjectId    FK → submissions, Nullable (Indexed)
  is_deleted        Boolean     Default: false
  deleted_at        DateTime    Nullable
  created_

---

---

# VYOM PUBLICATION – PHASE 3: TECHNICAL ARCHITECTURE & IMPLEMENTATION BLUEPRINT

---

## TABLE OF CONTENTS

1. Technology Stack Decisions
2. System Architecture Overview
3. Frontend Architecture
4. Backend Architecture
5. Security Architecture
6. File Storage Design
7. Payment Architecture
8. Search Architecture
9. Analytics & Reporting Design
10. Deployment Architecture
11. Development Roadmap

---

# 1. TECHNOLOGY STACK DECISIONS

## 1.1 Stack Selection Philosophy

Every technology chosen must satisfy five criteria:
- Production-proven at scale in content-heavy platforms
- Maintainable by a mid-sized team without specialist lock-in
- Extensible without full rewrites as the platform grows
- Secure by default with active security community support
- Cost-efficient across development, hosting, and operations

---

## 1.2 Frontend Stack

### Primary Choice: Next.js 14+ (App Router)

Why chosen:
- Server-Side Rendering (SSR) for SEO-critical public pages — book listings, article pages, editorial board, and "Publish With Us" pages must be crawlable
- Static Site Generation (SSG) for near-static content like About Us, Guidelines
- Incremental Static Regeneration (ISR) for semi-dynamic content like upcoming publications
- API Routes for lightweight BFF (Backend-for-Frontend) patterns
- Built-in image optimization for book covers and author photos
- React Server Components reduce client-side JavaScript bundle significantly
- File-based routing maps cleanly to VYOM's module structure

Limitations:
- More complex deployment model compared to pure React (requires Node.js server)
- App Router learning curve for developers new to React Server Components

Alternative Considered: React (Vite) + React Router
- Rejected because: Pure SPA model is weak for SEO on public content pages. VYOM's public portal must rank in search engines for author discovery and content reach.

Comparison:

| Factor | Next.js | React + Vite |
|--------|---------|--------------|
| SEO | Excellent (SSR/SSG) | Poor (SPA) |
| Performance | Excellent (RSC) | Good |
| Dashboard Suitability | Good | Excellent |
| Build Complexity | Medium | Low |
| Deployment | Node server required | CDN only |

Verdict: Next.js wins because VYOM has both a public portal (SEO critical) and authenticated dashboards (SPA-like). Next.js handles both in one project.

---

### UI Component Library: shadcn/ui + Tailwind CSS

Why chosen:
- shadcn/ui provides accessible, unstyled base components that are copied into the codebase — no vendor lock-in, full customization control
- Tailwind CSS utility-first approach enables rapid, consistent styling without maintaining custom CSS files
- Together they support complex dashboard layouts, data tables, multi-step forms, and modal workflows required for the publication lifecycle UI
- Accessibility compliance (WCAG 2.1 AA) built into shadcn primitives via Radix UI

Alternative: Material UI (MUI)
- Rejected because: MUI enforces Material Design aesthetics heavily, making custom brand identity (VYOM) difficult. Bundle size is significantly larger.

---

### State Management: Zustand + TanStack Query

Why two libraries:

Zustand — for client UI state:
- Active modal states, sidebar collapse, notification drawer state, multi-step form progress
- Extremely lightweight (~1KB), no boilerplate, no context hell

TanStack Query (React Query) — for server state:
- All API data fetching, caching, background refetch, and pagination
- Replaces manual loading/error/data state management for every API call
- Stale-while-revalidate strategy perfect for submission status polling

Alternative Considered: Redux Toolkit
- Rejected because: Redux overhead is unnecessary for VYOM's complexity level. TanStack Query already handles 80% of what Redux would manage.

---

### Form Handling: React Hook Form + Zod

Why chosen:
- React Hook Form is performance-optimized — uncontrolled inputs prevent full re-renders on every keystroke, critical for large manuscript submission forms
- Zod provides TypeScript-first schema validation shared between frontend and backend
- Multi-step form support with field-level validation per step

---

### Additional Frontend Dependencies

| Purpose | Library | Reason |
|---------|---------|--------|
| Rich Text / Abstract Editor | TipTap (Headless) | Extensible, supports academic formatting |
| PDF Viewer | react-pdf | Inline manuscript preview without download |
| Date Handling | date-fns | Lightweight, tree-shakeable |
| Charts & Analytics | Recharts | React-native charting, responsive |
| Data Tables | TanStack Table | Headless, works with any UI |
| Notifications (Toast) | sonner | Minimal, accessible |
| File Upload UI | react-dropzone | Drag-and-drop with type/size validation |
| Icons | Lucide React | Consistent, tree-shakeable |

---

## 1.3 Backend Stack

### Primary Choice: Node.js + Express.js (TypeScript)

Why chosen:
- TypeScript across full stack means shared type definitions between frontend and backend — critical for a complex domain model like VYOM's submission lifecycle
- Express is minimal and un-opinionated, allowing precise architecture control — important because VYOM's workflow engine has custom rules that don't fit framework conventions
- Massive ecosystem for publication platform needs: file processing, PDF generation, email, payment SDKs
- Team hiring: Node.js has the largest available developer talent pool
- Non-blocking I/O handles concurrent file uploads and notification dispatch efficiently

Alternative Considered: NestJS
- Considered because: NestJS provides structured DI, decorators, and module system
- Partially adopted: NestJS architectural patterns (modules, services, repositories) are adopted as a convention without using the NestJS framework itself — giving structure without framework lock-in

Alternative Considered: Python (FastAPI or Django)
- Rejected because: Full-stack TypeScript shared types would be lost. Two-language maintenance overhead is not justified for VYOM's team size.

Alternative Considered: Go
- Rejected because: Go's ecosystem for publication workflows (PDF, email templates, payment SDKs) is less mature. Hiring difficulty is higher.

---

## 1.4 Database Strategy

### Primary Database: MongoDB (with Mongoose ODM)

Why chosen:
- Publication workflows have deeply nested, variable-structure documents (review reports, co-author arrays, scoring rubrics) that map naturally to documents
- Schema evolution over time (new fields, new states, new content types) is safer without migration scripts blocking deployments
- Submission history, audit logs, and notification records have unbounded array-like growth — document storage handles this natively
- Horizontal scaling via sharding when data grows beyond single-server capacity

Limitations:
- No native ACID multi-document transactions (partially solved in MongoDB 4.x with multi-document transactions, with performance cost)
- Complex reporting joins are less efficient than relational queries

### Secondary Database: PostgreSQL

Why used alongside MongoDB:
- Payment records, invoices, fee configurations, and financial ledger data require strict ACID transactions, referential integrity, and auditability
- Financial data must never be lost, corrupted, or orphaned — relational constraints enforce this
- Regulatory and accounting requirements expect relational financial records

When each is used:

| Data Type | MongoDB | PostgreSQL |
|-----------|---------|------------|
| Submissions & Workflow | ✓ | |
| User Profiles | ✓ | |
| Reviews & Reports | ✓ | |
| Notifications | ✓ | |
| Audit Logs | ✓ | |
| Books & Articles | ✓ | |
| Payments & Invoices | | ✓ |
| Fee Configurations | | ✓ |
| Role Permissions | | ✓ |
| Financial Reports | | ✓ |

### Cache Layer: Redis

Why chosen:
- Session token storage and validation (sub-millisecond access)
- Rate limiting counters per IP and per user
- Short-lived OTP and verification token storage
- Frequently-read, rarely-changed data: categories, editorial board, fee configurations
- Submission status caching for high-frequency dashboard polling
- Background job queue (via BullMQ — Redis-backed)

---

## 1.5 Authentication

### Primary Choice: JWT (Access + Refresh Token Pattern)

Why chosen:
- Stateless access tokens eliminate database round-trips on every authenticated request
- Refresh token stored in HttpOnly cookies — not accessible to JavaScript, resistant to XSS
- Access token in memory (not localStorage) — prevents token theft via XSS
- Short-lived access tokens (15 minutes) limit blast radius of token compromise
- Refresh tokens stored in Redis with rotation — enables remote revocation (logout from all devices)

Alternative Considered: Session-Based Authentication
- Rejected because: Session-based auth requires every request to hit the session store, creating a scalability bottleneck as user count grows. VYOM must support horizontal scaling.

Alternative Considered: NextAuth.js / Auth.js
- Partially applicable for social login extension but not sufficient for VYOM's custom role-based registration flows and submission-level permissions.

Token Strategy:

```
Access Token:  JWT, 15-minute expiry, signed RS256, stored in memory
Refresh Token: Opaque token, 7-day expiry, HttpOnly cookie, stored in Redis
Rotation:      Every refresh issues a new refresh token and invalidates the old one
Revocation:    Redis delete on logout; all tokens for a user invalidated on security events
```

---

## 1.6 File Storage

### Primary Choice: AWS S3 (or S3-Compatible: MinIO for self-hosted)

Why chosen:
- Manuscripts, research papers, and published PDFs can grow to terabytes — S3 scales infinitely
- Pre-signed URLs enable time-limited, direct, secure downloads without routing files through the application server
- Storage classes (S3 Standard, S3 Infrequent Access, S3 Glacier) map to VYOM's retention policy — active files, archived files, and legal retention
- Server-side encryption at rest, bucket policies, and IAM enforce document access security

Why NOT Cloudinary:
- Cloudinary is excellent for image transformation (book covers, author photos) and will be used for that purpose
- Cloudinary is not suitable for secure document storage — URLs can be guessed/shared, no submission-scoped access control
- Cost at scale for large PDF storage becomes prohibitive

Hybrid Storage Strategy:

| Asset Type | Storage | Reason |
|------------|---------|--------|
| Manuscripts, Papers, PDFs | AWS S3 | Secure, pre-signed access |
| Book Covers, Author Photos | Cloudinary | Image transforms, CDN delivery |
| Invoices, Receipts | AWS S3 | Secure financial document storage |
| Review Attachments | AWS S3 | Blinded access, submission-scoped |
| Published Open-Access PDFs | AWS S3 + CloudFront | CDN delivery for public content |

---

## 1.7 Email / Notifications

### Email Service: AWS SES (Simple Email Service)

Why chosen:
- High deliverability, cost-effective at volume (publication platforms send thousands of workflow emails)
- Supports custom sending domains, DKIM, SPF — critical for professional "noreply@vyom.publication.com" sender identity
- Bounce and complaint handling built in

### In-App Notifications: Custom + Socket.io

- Real-time in-app notifications (new review assigned, payment confirmed) delivered via WebSocket
- Socket.io handles connection management and reconnection
- Redis Pub/Sub used as the event bus between backend services and Socket.io server

### SMS Notifications (Optional): Twilio or AWS SNS

- Used only for critical events: payment confirmation, publication notification
- Configurable per user preference

---

## 1.8 Search

### Phase 1: MongoDB Atlas Search (or MongoDB text indexes)

- Sufficient for initial scale — full-text search on books, articles, authors
- Zero additional infrastructure in early phases

### Phase 2 (Growth): Elasticsearch / OpenSearch

- Dedicated search cluster when submission volume exceeds 10,000+ records
- Faceted search, fuzzy matching, relevance scoring, filter aggregations
- Data synced from MongoDB via change streams

---

## 1.9 Payments

### Payment Gateway: Razorpay

Why chosen:
- Market leader for Indian payment processing — supports UPI, cards, net banking, wallets
- Webhooks for reliable payment confirmation (not relying on redirect-only)
- Razorpay Order API maps perfectly to VYOM's invoice model
- Extensive subscription and invoice APIs for recurring and one-time payments
- PCI DSS compliant — VYOM never touches raw card data

Backup/International: Stripe
- Available for international authors paying publication fees in USD/EUR

---

## 1.10 Analytics

### Internal Analytics: Custom event tracking + MongoDB aggregations + Recharts dashboards

### External / Advanced Analytics: PostHog (self-hosted or cloud)

Why PostHog:
- Open-source, can be self-hosted for data privacy compliance
- Session recording, funnel analysis, feature flags, and event tracking
- Replaces need for Google Analytics while maintaining data ownership

---

## 1.11 Monitoring & Observability

| Layer | Tool | Purpose |
|-------|------|---------|
| Application Monitoring | Sentry | Error tracking, performance monitoring |
| Infrastructure Metrics | Prometheus + Grafana | Server metrics, DB performance, custom VYOM metrics |
| Log Aggregation | Winston + Loki + Grafana | Structured log shipping and querying |
| Uptime Monitoring | Better Uptime / UptimeRobot | External availability monitoring |
| Distributed Tracing | OpenTelemetry + Jaeger | Request tracing across services |

---

## 1.12 CI/CD

| Tool | Purpose |
|------|---------|
| GitHub | Source control, PR workflow, branch protection |
| GitHub Actions | CI pipeline, automated testing, deployment triggers |
| Docker | Container packaging for consistent environments |
| Docker Compose | Local development multi-service orchestration |
| AWS ECR | Container registry |
| AWS ECS or Railway | Container deployment (ECS for production scale) |

---

# 2. SYSTEM ARCHITECTURE OVERVIEW

## 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          PUBLIC INTERNET                            │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │    CloudFront CDN   │
                    │  (Static Assets +   │
                    │  Public PDFs)       │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Next.js Frontend  │
                    │   (Vercel / ECS)    │
                    │   SSR + SSG + CSR   │
                    └──────────┬──────────┘
                               │ HTTPS / REST / WebSocket
                    ┌──────────▼──────────┐
                    │   API Gateway /     │
                    │   Nginx Reverse     │
                    │   Proxy             │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
   ┌──────────▼─────┐ ┌───────▼───────┐ ┌──────▼──────────┐
   │  Core API      │ │  WebSocket    │ │  Background     │
   │  Server        │ │  Server       │ │  Worker         │
   │  (Express.js)  │ │  (Socket.io)  │ │  (BullMQ)       │
   └──────────┬─────┘ └───────┬───────┘ └──────┬──────────┘
              │               │                │
              └───────────────┼────────────────┘
                              │
         ┌────────────────────┼───────────────────────┐
         │                    │                       │
┌────────▼───────┐  ┌─────────▼──────┐  ┌────────────▼────┐
│   MongoDB      │  │   PostgreSQL   │  │     Redis       │
│   (Workflow,   │  │   (Payments,   │  │   (Sessions,    │
│   Submissions, │  │   Financial,   │  │   Cache,        │
│   Content)     │  │   Permissions) │  │   Queue)        │
└────────────────┘  └────────────────┘  └─────────────────┘

External Services:
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ AWS S3   │  │ AWS SES  │  │ Razorpay │  │Cloudinary│
│Documents │  │ (Email)  │  │(Payments)│  │ (Images) │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

## 2.2 Request Lifecycle

```
Browser Request
      │
      ▼
Next.js (SSR/CSR Decision)
      │
      ├── Static/SSG → Served from CDN instantly
      │
      └── Dynamic → API Call to Express Backend
                        │
                        ▼
               Nginx Reverse Proxy
                        │
                        ▼
               Rate Limiter (Redis)
                        │
                        ▼
               Auth Middleware (JWT validation)
                        │
                        ▼
               RBAC Middleware (permission check)
                        │
                        ▼
               Route Handler → Controller
                        │
                        ▼
               Service Layer (business logic)
                        │
                        ├── MongoDB (primary data)
                        ├── PostgreSQL (financial data)
                        ├── Redis (cache hit/miss)
                        └── External Services (S3, SES, Razorpay)
                        │
                        ▼
               Response Formatter
                        │
                        ▼
               Structured JSON Response
```

---

# 3. FRONTEND ARCHITECTURE

## 3.1 Project Structure

```
vyom-frontend/
├── app/                              # Next.js App Router
│   ├── (public)/                     # Public route group — no auth required
│   │   ├── page.tsx                  # Homepage
│   │   ├── about/
│   │   ├── guidelines/
│   │   ├── editorial-board/
│   │   ├── contact/
│   │   ├── books/
│   │   │   ├── page.tsx              # Book catalog
│   │   │   └── [slug]/               # Individual book page
│   │   ├── articles/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   ├── publish-with-us/
│   │   └── upcoming/
│   │
│   ├── (auth)/                       # Authentication route group
│   │   ├── login/
│   │   ├── register/
│   │   │   ├── member/
│   │   │   └── author/
│   │   ├── forgot-password/
│   │   └── verify-email/
│   │
│   ├── (member)/                     # Member dashboard route group
│   │   ├── layout.tsx                # Member layout with sidebar
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── bookmarks/
│   │   ├── downloads/
│   │   ├── reading-history/
│   │   └── notifications/
│   │
│   ├── (author)/                     # Author dashboard route group
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── submissions/
│   │   │   ├── new/                  # Multi-step abstract submission
│   │   │   ├── [id]/                 # Submission detail
│   │   │   └── [id]/manuscript/      # Manuscript upload
│   │   ├── revisions/
│   │   ├── payments/
│   │   └── publications/
│   │
│   ├── (reviewer)/                   # Reviewer dashboard route group
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── assignments/
│   │   │   ├── [id]/                 # Assignment detail
│   │   │   └── [id]/review/          # Review submission form
│   │   └── history/
│   │
│   ├── (editor)/                     # Editor dashboard route group
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── submissions/
│   │   ├── reviewers/
│   │   ├── decisions/
│   │   ├── issues/
│   │   └── communications/
│   │
│   ├── (admin)/                      # Admin control panel route group
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── editorial-board/
│   │   ├── content/
│   │   ├── payments/
│   │   ├── reports/
│   │   ├── announcements/
│   │   ├── audit-logs/
│   │   └── settings/
│   │
│   ├── api/                          # Next.js API Routes (BFF layer only)
│   │   └── auth/                     # Auth token refresh proxy
│   │
│   ├── layout.tsx                    # Root layout
│   ├── error.tsx                     # Global error boundary
│   └── not-found.tsx
│
├── components/
│   ├── ui/                           # shadcn/ui base components (owned)
│   ├── common/                       # Shared cross-module components
│   │   ├── PageHeader/
│   │   ├── DataTable/
│   │   ├── StatusBadge/
│   │   ├── FileUploader/
│   │   ├── ConfirmDialog/
│   │   ├── EmptyState/
│   │   └── Pagination/
│   ├── layout/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── DashboardShell/
│   ├── public/                       # Public portal components
│   ├── author/                       # Author module components
│   ├── reviewer/                     # Reviewer module components
│   ├── editor/                       # Editor module components
│   └── admin/                        # Admin module components
│
├── lib/
│   ├── api/                          # API client (axios instances, interceptors)
│   │   ├── client.ts
│   │   ├── auth.api.ts
│   │   ├── submissions.api.ts
│   │   └── ...
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useSubmission.ts
│   │   └── usePermissions.ts
│   ├── stores/                       # Zustand stores
│   │   ├── auth.store.ts
│   │   ├── ui.store.ts
│   │   └── notification.store.ts
│   ├── validations/                  # Zod schemas (shared with backend)
│   │   ├── auth.schema.ts
│   │   ├── submission.schema.ts
│   │   └── ...
│   └── utils/                        # Pure utility functions
│
├── types/                            # TypeScript type definitions
│   ├── api.types.ts
│   ├── submission.types.ts
│   └── user.types.ts
│
├── public/                           # Static assets
├── middleware.ts                     # Next.js middleware (route protection)
└── next.config.ts
```

## 3.2 Protected Route Strategy

```
Next.js Middleware (middleware.ts) runs on every request before rendering.

Protection Logic:
  Request arrives
        │
        ▼
  Check for auth token (cookie)
        │
  Not found → Redirect to /login with returnUrl parameter
        │
  Found → Validate token signature (edge-compatible)
        │
  Invalid → Clear cookie → Redirect to /login
        │
  Valid → Extract role from token claims
        │
  Route is in (admin)/* but role ≠ admin → Redirect to /unauthorized
        │
  All checks pass → Allow request to proceed

Route Group → Required Role Mapping:
  (public)/*   → No restriction
  (auth)/*     → No restriction (redirect if already logged in)
  (member)/*   → member | author | reviewer | editor | admin
  (author)/*   → author | admin
  (reviewer)/* → reviewer | admin
  (editor)/*   → editor | admin
  (admin)/*    → admin only
```

## 3.3 State Management Strategy

```
State Categories:

1. SERVER STATE (TanStack Query)
   - All API data: submissions, assignments, notifications, books
   - Cache keys structured as: ['submissions', submissionId]
   - Stale time: 30s for dashboard data, 5min for static content
   - Background refetch on window focus for active workflow screens

2. CLIENT UI STATE (Zustand)
   - auth store: current user, role, token, loading state
   - ui store: sidebar open, active modal, theme preference
   - notification store: unread count, notification drawer state

3. FORM STATE (React Hook Form)
   - Multi-step abstract submission form
   - Manuscript upload form
   - Review submission form
   - Persisted in component state, not global store

4. URL STATE (Next.js Router / searchParams)
   - Current tab, filters, pagination, search query
   - Shareable and bookmarkable URLs for submission lists
```

## 3.4 API Communication Strategy

```
Axios Instance Configuration:
  - Base URL from environment variable
  - Default headers: Content-Type, Accept, X-Client-Version
  - Request interceptor: Attach Bearer token from memory store
  - Response interceptor: 
    - 401 → Trigger silent refresh via /api/auth/refresh
    - 403 → Dispatch permission denied event
    - 429 → Show rate limit notification
    - 5xx → Dispatch server error event
  - Token Refresh Queue:
    - If refresh in progress, queue subsequent requests
    - Replay queued requests after refresh succeeds
    - On refresh failure → force logout
```

---

# 4. BACKEND ARCHITECTURE

## 4.1 Folder Structure

```
vyom-backend/
├── src/
│   ├── config/
│   │   ├── database.config.ts          # MongoDB + PostgreSQL connections
│   │   ├── redis.config.ts
│   │   ├── storage.config.ts           # S3 + Cloudinary config
│   │   ├── email.config.ts
│   │   ├── payment.config.ts
│   │   └── app.config.ts               # Central config aggregator
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── strategies/
│   │   │       ├── jwt.strategy.ts
│   │   │       └── refresh.strategy.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── users.routes.ts
│   │   │   └── users.validator.ts
│   │   │
│   │   ├── submissions/
│   │   │   ├── submissions.controller.ts
│   │   │   ├── submissions.service.ts
│   │   │   ├── submissions.repository.ts
│   │   │   ├── submissions.routes.ts
│   │   │   ├── submissions.validator.ts
│   │   │   └── workflow/
│   │   │       ├── state-machine.ts      # Submission state transition engine
│   │   │       ├── transition-rules.ts
│   │   │       └── transition-guards.ts
│   │   │
│   │   ├── abstracts/
│   │   ├── manuscripts/
│   │   ├── reviews/
│   │   ├── editorial/
│   │   ├── payments/
│   │   ├── notifications/
│   │   ├── books/
│   │   ├── articles/
│   │   ├── search/
│   │   ├── analytics/
│   │   ├── admin/
│   │   └── support/
│   │
│   ├── middleware/
│   │   ├── authenticate.ts             # JWT verification
│   │   ├── authorize.ts                # RBAC permission check
│   │   ├── rateLimiter.ts              # Redis-backed rate limiting
│   │   ├── requestLogger.ts            # Winston request logging
│   │   ├── errorHandler.ts             # Central error handler
│   │   ├── validateRequest.ts          # Zod schema validation
│   │   ├── auditLogger.ts              # Automatic audit trail
│   │   └── sanitizeInput.ts            # XSS sanitization
│   │
│   ├── shared/
│   │   ├── types/                      # Shared TypeScript interfaces
│   │   ├── errors/                     # Custom error classes
│   │   │   ├── AppError.ts
│   │   │   ├── AuthError.ts
│   │   │   ├── ValidationError.ts
│   │   │   └── WorkflowError.ts
│   │   ├── events/                     # Internal event system
│   │   │   ├── eventBus.ts
│   │   │   └── handlers/
│   │   ├── utils/
│   │   └── constants/
│   │       ├── submission-states.ts    # State machine constants
│   │       └── permissions.ts
│   │
│   ├── jobs/                           # BullMQ background workers
│   │   ├── email.job.ts
│   │   ├── notification.job.ts
│   │   ├── review-reminder.job.ts
│   │   ├── payment-reminder.job.ts
│   │   ├── archive.job.ts
│   │   └── analytics-aggregation.job.ts
│   │
│   ├── infrastructure/
│   │   ├── storage/
│   │   │   ├── s3.service.ts
│   │   │   └── cloudinary.service.ts
│   │   ├── email/
│   │   │   └── ses.service.ts
│   │   ├── payment/
│   │   │   └── razorpay.service.ts
│   │   └── cache/
│   │       └── redis.service.ts
│   │
│   └── app.ts                          # Express app setup
│
├── prisma/                             # PostgreSQL schema (Prisma ORM)
│   └── schema.prisma
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── Dockerfile
```

## 4.2 Layered Architecture

```
Request
  │
  ▼
ROUTES LAYER
  Purpose: Maps HTTP methods + paths to controllers
  Rules: No business logic here

  │
  ▼
MIDDLEWARE LAYER
  Purpose: Cross-cutting concerns before controller
  Order: rat

---
---

# VYOM PUBLICATION – PHASE 4: PROJECT FOUNDATION, REPOSITORY STRUCTURE & DEVELOPMENT BLUEPRINT

---

## TABLE OF CONTENTS

1. Repository Structure & Strategy
2. Frontend Project Structure
3. Backend Project Structure
4. Module Breakdown
5. Development Order
6. Environment Strategy
7. Git Workflow
8. Testing Strategy
9. Documentation Strategy
10. MVP Definition
11. Full Implementation Roadmap

---

# 1. REPOSITORY STRUCTURE & STRATEGY

## 1.1 Monorepo vs Separate Repositories — Decision

### Recommendation: Monorepo using Turborepo

Rationale:

VYOM Publication has a tightly coupled frontend and backend that share:
- TypeScript type definitions for all API request/response contracts
- Zod validation schemas used identically on both sides
- Submission state machine constants referenced by UI and API
- Permission constants used for both route guards and API authorization
- Notification event types consumed by frontend listeners and backend emitters

Maintaining these shared contracts across two separate repositories creates a synchronization overhead that grows into a serious maintenance liability. A missed type update in a separate repo breaks both the API and the UI in ways that are hard to trace.

| Factor | Monorepo | Separate Repos |
|--------|----------|----------------|
| Shared types | Single source of truth | Duplication or private package overhead |
| Atomic commits | Yes — one PR changes frontend + backend + types | Multiple PRs, synchronization required |
| CI/CD complexity | Moderate (Turborepo handles it) | Lower per repo, higher overall |
| Team coordination | One PR review cycle | Multiple review cycles for cross-cutting changes |
| Code discovery | Developers see the full system | Context switching between repos |
| Deployment independence | Requires care | Natural |
| Scaling to microservices | Extract packages when needed | Already separated |

Verdict: Monorepo is the correct choice for VYOM's team size, shared domain complexity, and early-stage development velocity. If VYOM scales to a dedicated platform team with multiple squads, individual packages can be extracted into separate deployable units without restructuring.

---

## 1.2 Monorepo Tool: Turborepo

Why Turborepo:
- Intelligent build caching — only rebuilds packages affected by a change
- Parallel task execution across packages
- Remote cache sharing on CI (GitHub Actions + Vercel Remote Cache)
- Zero opinion on tech stack — works with Next.js, Express, any Node package
- Simple configuration compared to Nx for VYOM's scale

---

## 1.3 Complete Repository Structure

```
vyom-publication/                          # Repository root
│
├── apps/                                  # Deployable applications
│   ├── web/                               # Next.js 14 frontend (public + dashboards)
│   └── api/                               # Express.js backend API
│
├── packages/                              # Shared internal packages
│   ├── types/                             # Shared TypeScript interfaces and enums
│   ├── validations/                       # Shared Zod schemas (frontend + backend)
│   ├── constants/                         # Submission states, roles, permissions
│   ├── ui/                                # Shared React component library (design system)
│   └── config/                            # Shared tooling configs (ESLint, Prettier, TSConfig)
│
├── docs/                                  # All project documentation
│   ├── architecture/                      # Phase 1–3 documents
│   ├── api/                               # API reference
│   ├── database/                          # Schema docs, ERD diagrams
│   ├── deployment/                        # Deployment guides
│   └── decisions/                         # Architecture Decision Records (ADRs)
│
├── scripts/                               # Dev and ops utility scripts
│   ├── setup.sh                           # One-command local environment setup
│   ├── seed-dev.ts                        # Development database seeding
│   ├── seed-roles.ts                      # Role and permission seeding
│   └── generate-keys.ts                   # JWT key pair generation
│
├── infrastructure/                        # Infrastructure-as-Code
│   ├── docker/
│   │   ├── docker-compose.yml             # Full local stack
│   │   ├── docker-compose.test.yml        # Test environment stack
│   │   └── Dockerfile.api                 # API production image
│   └── terraform/                         # AWS infrastructure definitions
│       ├── environments/
│       │   ├── staging/
│       │   └── production/
│       └── modules/
│           ├── ecs/
│           ├── rds/
│           ├── s3/
│           └── cloudfront/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                         # CI on every PR
│   │   ├── deploy-staging.yml             # Deploy on merge to develop
│   │   └── deploy-production.yml          # Deploy on release tag
│   ├── pull_request_template.md
│   └── CODEOWNERS
│
├── .env.example                           # Template for all required env vars
├── turbo.json                             # Turborepo pipeline config
├── package.json                           # Root workspace config
├── pnpm-workspace.yaml                    # pnpm workspace definition
└── README.md                              # Repository entry point
```

---

## 1.4 Shared Packages Detail

### packages/types
```
packages/types/
├── src/
│   ├── user.types.ts           # User, Role, Permission interfaces
│   ├── submission.types.ts     # Submission, Abstract, Manuscript interfaces
│   ├── review.types.ts         # ReviewAssignment, ReviewReport interfaces
│   ├── payment.types.ts        # Invoice, Payment, Refund interfaces
│   ├── content.types.ts        # Book, Article, Journal interfaces
│   ├── notification.types.ts   # Notification, NotificationEvent interfaces
│   └── api.types.ts            # Generic API response wrappers
├── package.json
└── tsconfig.json
```

### packages/validations
```
packages/validations/
├── src/
│   ├── auth.schema.ts
│   ├── submission.schema.ts    # Abstract form, manuscript form validation
│   ├── review.schema.ts
│   ├── payment.schema.ts
│   └── user.schema.ts
├── package.json
└── tsconfig.json
```

### packages/constants
```
packages/constants/
├── src/
│   ├── submission-states.ts    # All 18 submission states as typed enum
│   ├── state-transitions.ts    # Allowed transitions matrix
│   ├── roles.ts                # Role names and hierarchy
│   ├── permissions.ts          # All permission strings
│   └── notification-events.ts  # All notification trigger event names
├── package.json
└── tsconfig.json
```

---

# 2. FRONTEND PROJECT STRUCTURE

## 2.1 Complete Frontend Structure

```
apps/web/
│
├── app/                                    # Next.js App Router
│   │
│   ├── (public)/                           # Public portal — SSR/SSG
│   │   ├── layout.tsx                      # Public layout (Navbar + Footer)
│   │   ├── page.tsx                        # Homepage
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── guidelines/
│   │   │   └── page.tsx
│   │   ├── editorial-board/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── publish-with-us/
│   │   │   └── page.tsx
│   │   ├── books/
│   │   │   ├── page.tsx                    # Book catalog (SSG + ISR)
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx                # Book detail
│   │   │   └── categories/
│   │   │       └── [category]/
│   │   │           └── page.tsx
│   │   ├── articles/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── upcoming/
│   │       └── page.tsx
│   │
│   ├── (auth)/                             # Auth flows — no layout chrome
│   │   ├── layout.tsx                      # Centered card layout
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   ├── page.tsx                    # Role selection
│   │   │   ├── member/
│   │   │   │   └── page.tsx
│   │   │   └── author/
│   │   │       └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   ├── reset-password/
│   │   │   └── page.tsx
│   │   └── verify-email/
│   │       └── page.tsx
│   │
│   ├── (member)/                           # Member dashboard
│   │   ├── layout.tsx                      # Dashboard shell + member sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── bookmarks/
│   │   │   └── page.tsx
│   │   ├── downloads/
│   │   │   └── page.tsx
│   │   ├── reading-history/
│   │   │   └── page.tsx
│   │   └── notifications/
│   │       └── page.tsx
│   │
│   ├── (author)/                           # Author dashboard
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── submissions/
│   │   │   ├── page.tsx                    # All submissions list
│   │   │   ├── new/
│   │   │   │   └── page.tsx                # Multi-step abstract submission
│   │   │   └── [submissionId]/
│   │   │       ├── page.tsx                # Submission detail + timeline
│   │   │       ├── manuscript/
│   │   │       │   └── page.tsx            # Manuscript upload
│   │   │       ├── revision/
│   │   │       │   └── page.tsx            # Revision submission
│   │   │       ├── review-reports/
│   │   │       │   └── page.tsx            # Released review reports
│   │   │       └── payment/
│   │   │           └── page.tsx            # Payment interface
│   │   └── publications/
│   │       └── page.tsx                    # Published works + certificates
│   │
│   ├── (reviewer)/                         # Reviewer dashboard
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── assignments/
│   │   │   ├── page.tsx                    # All assignments
│   │   │   └── [assignmentId]/
│   │   │       ├── page.tsx                # Assignment detail
│   │   │       └── review/
│   │   │           └── page.tsx            # Review submission form
│   │   ├── history/
│   │   │   └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   │
│   ├── (editor)/                           # Editor dashboard
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── submissions/
│   │   │   ├── page.tsx                    # Submission queue
│   │   │   └── [submissionId]/
│   │   │       ├── page.tsx                # Submission workspace
│   │   │       ├── assign-reviewer/
│   │   │       │   └── page.tsx
│   │   │       └── decision/
│   │   │           └── page.tsx
│   │   ├── reviewers/
│   │   │   └── page.tsx                    # Reviewer pool management
│   │   ├── issues/
│   │   │   ├── page.tsx
│   │   │   └── [issueId]/
│   │   │       └── page.tsx
│   │   └── communications/
│   │       └── page.tsx
│   │
│   ├── (admin)/                            # Admin control panel
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── users/
│   │   │   ├── page.tsx
│   │   │   └── [userId]/
│   │   │       └── page.tsx
│   │   ├── editorial-board/
│   │   │   └── page.tsx
│   │   ├── submissions/
│   │   │   └── page.tsx
│   │   ├── payments/
│   │   │   └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   ├── announcements/
│   │   │   └── page.tsx
│   │   ├── audit-logs/
│   │   │   └── page.tsx
│   │   ├── categories/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   │
│   ├── api/                                # Next.js API routes (BFF only)
│   │   └── auth/
│   │       └── refresh/
│   │           └── route.ts               # Token refresh proxy
│   │
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── loading.tsx
│   └── layout.tsx                          # Root layout (fonts, providers)
│
├── components/
│   │
│   ├── ui/                                 # shadcn/ui components (owned, not node_modules)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   └── ... (all shadcn primitives)
│   │
│   ├── common/                             # Cross-module reusable components
│   │   ├── DataTable/
│   │   │   ├── DataTable.tsx
│   │   │   ├── DataTableToolbar.tsx
│   │   │   ├── DataTablePagination.tsx
│   │   │   └── DataTableColumnHeader.tsx
│   │   ├── StatusBadge/
│   │   │   └── SubmissionStatusBadge.tsx   # Submission state → styled badge
│   │   ├── FileUploader/
│   │   │   ├── FileUploader.tsx
│   │   │   └── FileUploaderPreview.tsx
│   │   ├── PageHeader/
│   │   │   └── PageHeader.tsx
│   │   ├── EmptyState/
│   │   │   └── EmptyState.tsx
│   │   ├── ConfirmDialog/
│   │   │   └── ConfirmDialog.tsx
│   │   ├── RichTextEditor/
│   │   │   └── RichTextEditor.tsx          # TipTap wrapper
│   │   ├── PDFViewer/
│   │   │   └── PDFViewer.tsx               # react-pdf wrapper
│   │   ├── Timeline/
│   │   │   └── SubmissionTimeline.tsx      # Lifecycle visualization
│   │   └── Notification/
│   │       ├── NotificationBell.tsx
│   │       └── NotificationDrawer.tsx
│   │
│   ├── layout/
│   │   ├── Navbar/
│   │   │   ├── PublicNavbar.tsx
│   │   │   └── DashboardNavbar.tsx
│   │   ├── Footer/
│   │   │   └── PublicFooter.tsx
│   │   ├── Sidebar/
│   │   │   ├── AuthorSidebar.tsx
│   │   │   ├── ReviewerSidebar.tsx
│   │   │   ├── EditorSidebar.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── MemberSidebar.tsx
│   │   └── DashboardShell/
│   │       └── DashboardShell.tsx
│   │
│   ├── features/                           # Module-specific components
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ForgotPasswordForm.tsx
│   │   ├── submission/
│   │   │   ├── AbstractForm/
│   │   │   │   ├── AbstractForm.tsx        # Multi-step wrapper
│   │   │   │   ├── Step1BasicInfo.tsx
│   │   │   │   ├── Step2AbstractText.tsx
│   │   │   │   ├── Step3CoAuthors.tsx
│   │   │   │   ├── Step4Declarations.tsx
│   │   │   │   └── Step5Review.tsx
│   │   │   ├── ManuscriptUpload/
│   │   │   │   └── ManuscriptUploadForm.tsx
│   │   │   ├── SubmissionCard.tsx
│   │   │   ├── SubmissionStatusTracker.tsx
│   │   │   └── RevisionSubmissionForm.tsx
│   │   ├── review/
│   │   │   ├── ReviewForm/
│   │   │   │   ├── ReviewForm.tsx
│   │   │   │   ├── ReviewScoreSection.tsx
│   │   │   │   └── ReviewRecommendation.tsx
│   │   │   └── ReviewReportView.tsx
│   │   ├── editorial/
│   │   │   ├── SubmissionQueue.tsx
│   │   │   ├── ReviewerAssignmentPanel.tsx
│   │   │   └── EditorialDecisionForm.tsx
│   │   ├── payment/
│   │   │   ├── InvoiceView.tsx
│   │   │   └── PaymentWidget.tsx           # Razorpay integration wrapper
│   │   └── admin/
│   │       ├── UserManagementTable.tsx
│   │       └── AuditLogViewer.tsx
│
├── lib/
│   │
│   ├── api/                                # API client layer
│   │   ├── client.ts                       # Axios instance + interceptors
│   │   ├── auth.api.ts
│   │   ├── users.api.ts
│   │   ├── submissions.api.ts
│   │   ├── manuscripts.api.ts
│   │   ├── reviews.api.ts
│   │   ├── editorial.api.ts
│   │   ├── payments.api.ts
│   │   ├── books.api.ts
│   │   ├── articles.api.ts
│   │   └── notifications.api.ts
│   │
│   ├── hooks/                              # Custom React hooks
│   │   ├── useAuth.ts                      # Auth state + actions
│   │   ├── usePermissions.ts               # Role-based permission checks
│   │   ├── useSubmission.ts                # Submission data + mutations
│   │   ├── useNotifications.ts             # Notification polling + socket
│   │   ├── useFileUpload.ts                # Upload with progress
│   │   └── useDebounce.ts
│   │
│   ├── stores/                             # Zustand state stores
│   │   ├── auth.store.ts
│   │   ├── ui.store.ts
│   │   └── notification.store.ts
│   │
│   ├── query/                              # TanStack Query key factories
│   │   ├── submission.queries.ts
│   │   ├── review.queries.ts
│   │   └── user.queries.ts
│   │
│   └── utils/
│       ├── format.ts                       # Date, currency, number formatters
│       ├── submission-state.utils.ts       # State label, color, allowed actions
│       └── file.utils.ts                   # File type validation, size formatting
│
├── middleware.ts                           # Next.js route protection middleware
├── providers.tsx                           # Root providers (QueryClient, ThemeProvider)
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

# 3. BACKEND PROJECT STRUCTURE

## 3.1 Complete Backend Structure

```
apps/api/
│
├── src/
│   │
│   ├── config/
│   │   ├── index.ts                        # Central config export
│   │   ├── database.ts                     # MongoDB + PostgreSQL connections
│   │   ├── redis.ts                        # Redis client
│   │   ├── storage.ts                      # S3 + Cloudinary clients
│   │   ├── email.ts                        # AWS SES client
│   │   ├── payment.ts                      # Razorpay client
│   │   └── logger.ts                       # Winston logger config
│   │
│   ├── modules/                            # Feature modules (one per domain)
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.validator.ts
│   │   │   └── strategies/
│   │   │       ├── jwt.strategy.ts
│   │   │       └── refresh-token.strategy.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.routes.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── users.validator.ts
│   │   │   └── profiles/
│   │   │       ├── author-profile.service.ts
│   │   │       ├── reviewer-profile.service.ts
│   │   │       └── editor-profile.service.ts
│   │   │
│   │   ├── submissions/
│   │   │   ├── submissions.routes.ts
│   │   │   ├── submissions.controller.ts
│   │   │   ├── submissions.service.ts
│   │   │   ├── submissions.repository.ts
│   │   │   ├── submissions.validator.ts
│   │   │   └── workflow/
│   │   │       ├── submission.state-machine.ts
│   │   │       ├── transition.rules.ts
│   │   │       ├── transition.guards.ts
│   │   │       └── transition.events.ts
│   │   │
│   │   ├── abstracts/
│   │   │   ├── abstracts.routes.ts
│   │   │   ├── abstracts.controller.ts
│   │   │   ├── abstracts.service.ts
│   │   │   ├── abstracts.repository.ts
│   │   │   └── abstracts.validator.ts
│   │   │
│   │   ├── manuscripts/
│   │   │   ├── manuscripts.routes.ts
│   │   │   ├── manuscripts.controller.ts
│   │   │   ├── manuscripts.service.ts
│   │   │   ├── manuscripts.repository.ts
│   │   │   └── manuscripts.validator.ts
│   │   │
│   │   ├── reviews/
│   │   │   ├── reviews.routes.ts
│   │   │   ├── reviews.controller.ts
│   │   │   ├── reviews.service.ts
│   │   │   ├── reviews.repository.ts
│   │   │   └── reviews.validator.ts
│   │   │
│   │   ├── editorial/
│   │   │   ├── editorial.routes.ts
│   │   │   ├── editorial.controller.ts
│   │   │   ├── editorial.service.ts
│   │   │   ├── editorial.repository.ts
│   │   │   └── editorial.validator.ts
│   │   │
│   │   ├── payments/
│   │   │   ├── payments.routes.ts
│   │   │   ├── payments.controller.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── payments.repository.ts
│   │   │   ├── payments.validator.ts
│   │   │   └── webhooks/
│   │   │       └── razorpay.webhook.handler.ts
│   │   │
│   │   ├── notifications/
│   │   │   ├── notifications.routes.ts
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.service.ts
│   │   │   ├── notifications.repository.ts
│   │   │   └── templates/
│   │   │       ├── abstract-accepted.template.ts
│   │   │       ├── review-assigned.template.ts
│   │   │       ├── payment-due.template.ts
│   │   │       └── published.template.ts
│   │   │
│   │   ├── books/
│   │   │   ├── books.routes.ts
│   │   │   ├── books.controller.ts
│   │   │   ├── books.service.ts
│   │   │   ├── books.repository.ts
│   │   │   └── books.validator.ts
│   │   │
│   │   ├── articles/
│   │   │   ├── articles.routes.ts
│   │   │   ├── articles.controller.ts
│   │   │   ├── articles.service.ts
│   │   │   ├── articles.repository.ts
│   │   │   └── articles.validator.ts
│   │   │
│   │   ├── editorial-board/
│   │   │   ├── editorial-board.routes.ts
│   │   │   ├── editorial-board.controller.ts
│   │   │   ├── editorial-board.service.ts
│   │   │   └── editorial-board.repository.ts
│   │   │
│   │   ├── categories/
│   │   ├── search/
│   │   │   ├── search.routes.ts
│   │   │   ├── search.controller.ts
│   │   │   └── search.service.ts
│   │   │
│   │   ├── analytics/
│   │   │   ├── analytics.routes.ts
│   │   │   ├── analytics.controller.ts
│   │   │   └── analytics.service.ts
│   │   │
│   │   ├── admin/
│   │   │   ├── admin.routes.ts
│   │   │   ├── admin.controller.ts
│   │   │   └── admin.service.ts
│   │   │
│   │   └── support/
│   │       ├── support.routes.ts
│   │       ├── support.controller.ts
│   │       └── support.service.ts
│   │
│   ├── middleware/
│   │   ├── authenticate.middleware.ts       # JWT access token validation
│   │   ├── authorize.middleware.ts          # RBAC permission enforcement
│   │   ├── rate-limiter.middleware.ts       # Redis-backed rate limiting
│   │   ├── validate-request.middleware.ts   # Zod schema validation
│   │   ├── sanitize-input.middleware.ts     # XSS sanitization
│   │   ├── audit-log.middleware.ts          # Auto audit trail on mutations
│   │   ├── request-logger.middleware.ts     # Structured request logging
│   │   ├── correlation-id.middleware.ts     # Trace ID injection
│   │   └── error-handler.middleware.ts      # Central error handler
│   │
│   ├── models/                             # Mongoose models
│   │   ├── user.model.ts
│   │   ├── user-role.model.ts
│   │   ├── author-profile.model.ts
│   │   ├── reviewer-profile.model.ts
│   │   ├── editor-profile.model.ts
│   │   ├── member-profile.model.ts
│   │   ├── submission.model.ts
│   │   ├── abstract.model.ts
│   │   ├── manuscript.model.ts
│   │   ├── manuscript-version.model.ts
│   │   ├── review-assignment.model.ts
│   │   ├── review-report.model.ts
│   │   ├── editorial-decision.model.ts
│   │   ├── revision-request.model.ts
│   │   ├── notification.model.ts
│   │   ├── message-thread.model.ts
│   │   ├── message.model.ts
│   │   ├── book.model.ts
│   │   ├── article.model.ts
│   │   ├── journal.model.ts
│   │   ├── journal-issue.model.ts
│   │   ├── category.model.ts
│   │   ├── file-asset.model.ts
│   │   ├── audit-log.model.ts
│   │   ├── submission-history.model.ts
│   │   ├── reading-history.model.ts
│   │   ├── bookmark.model.ts
│   │   └── announcement.model.ts
│   │
│   ├── infrastructure/
│   │   ├── storage/
│   │   │   ├── s3.service.ts               # S3 operations + presigned URLs
│   │   │   └── cloudinary.service.ts       # Image uploads + transforms
│   │   ├── email/
│   │   │   └── ses.service.ts              # Email dispatch
│   │   ├── payment/
│   │   │   └── razorpay.service.ts         # Order creation + verification
│   │   ├── cache/
│   │   │   └── redis.service.ts            # Cache operations
│   │   └── socket/


---
---

