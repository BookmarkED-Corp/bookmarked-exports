# What Book Intelligence Is

**Bookmarked** is the Book Intelligence Company. The product districts log into is called **OnShelf**. Book Intelligence is not a tab or a module inside OnShelf — it is the intelligence engine underneath every surface in the product. Every screen, every workflow, every report in OnShelf is powered by Book Intelligence. When we say "Bookmarked," we are talking about a company whose entire value proposition is the quality and depth of the intelligence it provides about books.

---

## What This Document Covers — and What It Does Not

This document explains everything about Book Intelligence: what it is, how it works, where the data comes from, what the system does with that data, how it gets smarter over time, and where it is going.

**This document does not cover the Content Scanner.**

The Content Scanner is a separate, future capability where AI would read actual book content — the text inside the book itself — with publisher permission. The Content Scanner is Layer 3 of Bookmarked's intelligence architecture. It has its own specification, its own timeline, and its own set of ethical and legal considerations. It is completely out of scope for everything described in this narrative.

The reason this distinction matters: Book Intelligence operates entirely on publicly available information *about* books. It never reads, scans, processes, or analyzes the actual text of any book. Every piece of intelligence that Book Intelligence produces comes from external public sources — metadata databases, public reviews, news articles, organization listings, school district actions, and AI analysis of that public information. The Content Scanner would change that by reading the book itself, which is why it is a fundamentally different capability requiring publisher relationships and a separate product decision. That decision has not been made, and this narrative has nothing to do with it.

---

## Why Book Intelligence Exists

Texas passed Senate Bill 13, requiring school districts to review library materials. Then Texas passed Senate Bill 412, which went further — it established criminal liability for school personnel who provide "sexually explicit" material in K-12 settings. Suddenly, librarians and administrators across Texas were personally liable for the books on their shelves.

The problem is that a typical school district has tens of thousands of books across dozens of libraries and classrooms. No one had ever systematically assessed all of those books against these new legal standards. The regulatory requirements arrived, but the infrastructure to comply did not exist. Librarians were left with spreadsheets, Google searches, and guesswork — trying to figure out which of their thousands of books might create legal exposure.

Bookmarked exists to solve that problem. Not by telling districts which books are good or bad — that is not our role and never will be. Bookmarked exists to give districts the intelligence infrastructure they need to make informed, defensible decisions about their collections. Before Bookmarked, districts had no way to know what external sources were saying about their books, no way to benchmark against peer districts, and no way to systematically assess risk across their entire collection. Book Intelligence is the system that provides all of that.

---

## The Three Intelligence Layers

Bookmarked's intelligence architecture has three layers. This narrative covers Layers 1 and 2. Layer 3 is the Content Scanner, which is excluded.

**Layer 1: External Signals.** This is everything that is publicly known about a book from sources outside the book itself — metadata databases, ban and challenge lists, news coverage, organization flags, public reviews, and AI analysis of all that public information. Layer 1 is live in production today. It is the foundation of everything Book Intelligence does.

**Layer 2: Network Intelligence.** This is intelligence derived from the Bookmarked network itself — what 150+ districts are collectively doing with their books. When a district reviews a book, makes a decision, uploads their collection, or processes an order, that activity becomes anonymized data that makes the system smarter for every other district. Layer 2 data is being collected today as districts use the product. The intelligence surfaces for Layer 2 are being designed and built.

**Layer 3: Content Scanner.** AI reads the actual book with publisher permission. Separate capability, separate spec, separate timeline. Not covered here.

---

## How Book Intelligence Works

When a district joins Bookmarked, they upload their book collection — typically as a list of ISBNs. From that moment, Book Intelligence goes to work on every single title.

### The Pipeline

The intelligence pipeline has five stages:

**Stage 1: ISBN Validation and Deduplication.** The system validates that each ISBN is real and deduplicates against books already in the Bookmarked database. If a book has already been processed for another district, the system may reuse existing intelligence rather than regenerating it from scratch.

**Stage 2: External Data Lookup.** The system queries ISBNDB and Open Library — two metadata databases — to pull the book's identity: title, author, publisher, publication year, page count, cover image, synopsis, and subject classifications. These are factual fields sourced directly from established databases. They are generally reliable and low-risk.

**Stage 3: AI Enrichment.** This is where the intelligence gets interesting. An AI model processes the publicly available metadata, reviews, and information about the book — not the book itself — and generates a set of assessments. These include content ratings for violence, sexual content, and language on a severity scale. They include grade level suitability assessments for elementary, middle school, and high school. They include theme identification, mature theme tagging, content warnings, educational value summaries, and an overall AI content summary. Every one of these fields is generated from public information about the book. The AI has not read the book. It has analyzed what is publicly known about the book from reviews, metadata, and other external sources.

**Stage 4: Flag Detection and Classification.** The system scans public web sources for signals about the book — has it appeared on a ban list? Has an organization flagged it? Has a school district taken action on it? Has it appeared in news coverage related to book challenges? Each of these signals is captured as a "flag" with its source, the organization that produced it, the date, the reasons given, and a direct link to the source material. Flags are organized into three categories: Library and Advocacy sources, News and Media sources, and School and District sources. This is the most defensible category of Book Intelligence data because every flag is traceable to a specific public source.

**Stage 5: Storage and Surfacing.** All of this intelligence is stored and surfaced across multiple views in OnShelf — the book detail page, the orders workflow, the dashboard, classroom library views, reports, and the parent portal. Each surface shows a different density of intelligence appropriate to the user's context and role.

### What the Pipeline Produces

For every book, Book Intelligence produces a comprehensive Intelligence Card. Think of it as everything publicly known about a book, organized for decision-making.

The Intelligence Card has nine groups of fields:

**Identity and Metadata** — the basics: title, author, publisher, ISBN, cover image, page count, publication year, synopsis, subjects, and a list of people and characters mentioned in public sources. These come from database lookups and are straightforward factual data.

**Status and Risk Overview** — four high-visibility fields that appear at the top of the card: Ban Status (has this book been reported as banned?), Challenge Risk (how likely is this book to be challenged?), Parental Guidance (is this flagged for parental guidance?), and Reading Level (adult, young adult, middle grade, or children's). These are the first things a user sees and they must be trustworthy.

**Content Ratings** — three dimensions rated on a severity scale: Violence, Sexual Content, and Language. Each is rated None, Mild, Moderate, or Explicit (Sexual Content adds a fifth value, "Implied," between Mild and Moderate). These ratings carry the highest regulatory weight because under SB 412, an incorrect "None" on a book with explicit sexual content creates criminal liability exposure for the district. These fields are generated by AI from public information, not from reading the book.

**Grade Level Suitability** — three fields assessing whether a book is Appropriate or Not Recommended for Elementary, Middle School, and High School. These should be mechanically derived from the Content Ratings to prevent contradictions — for example, a book rated Explicit for violence should never be marked Appropriate for Elementary.

**Content Analysis Tags** — collections of tags identifying potential concerns, mature themes, content warnings, and general themes. These are AI-generated from public information and provide additional context beyond the structured ratings. Content warnings are highlighted in red because they represent the most significant concerns.

**Advisory and Educational Context** — a text description of the book's educational value and an AI-generated content summary. These provide narrative context that goes beyond tags and ratings.

**Flags** — the external signals section, tabbed by source type. Each flag shows the organization that produced it, a link to the source, the date, the reasons given, and the location. This is the most traceable and defensible section of the Intelligence Card because every data point links to a public source.

**Collaborative Notes** — a space where staff members can add their own notes about a book. When a librarian documents why she retained a challenged book, that professional judgment becomes available to every librarian in the Bookmarked network facing the same decision. Notes are shared across the entire network, not siloed to a single district.

**Author Intelligence** — an expansion of the basic author field into structured intelligence about an author's public profile, challenge history across their entire catalog, publisher relationships, public statements, and cross-catalog patterns across the Bookmarked network. This is planned but not yet built. The hard boundary: Author Intelligence surfaces facts. It never produces author risk scores, editorial judgments, or assessments of an author's ideology.

---

## The Trust Model

Not all intelligence is created equal. A field generated by an AI model processing thin metadata is not as reliable as a field verified by twelve independent librarians across twelve districts. Book Intelligence has a three-tier trust model that makes this visible.

**Tier 1: AI-Generated.** This is the baseline. Every field starts here when the pipeline produces it. It means: "This value was generated by our AI enrichment process from publicly available information. No human has reviewed it." There is no special badge — it is the default state.

**Tier 2: Community-Informed.** When a practitioner — a librarian, an administrator, a teacher — takes a community action on a field (verifies it, disputes it, or gives accuracy feedback), the field advances to Community-Informed. This means: "At least one practitioner has weighed in on this value." The field displays a badge showing the count of community actions. A field verified by twelve districts is more trustworthy than one verified by one.

**Tier 3: Bookmarked Verified.** This is the highest tier. It means: "This value has been confirmed or contradicted by ground truth data from a connected library system." When Bookmarked connects to a district's actual library catalog and can verify whether a book is on the shelf or not, that is ground truth that no external source can match. A Bookmarked Verified badge with a verification date is the strongest signal the system produces.

Trust is not permanent. When significant new intelligence arrives after a field has been verified — new flags, source changes, rating updates — the verification status shifts to "Verified — new intelligence available since [date]." This nudges re-review without invalidating the original verification.

Every field also carries a confidence indicator based on evidence strength:

- **Strong signal** means multiple sources and community verifications support the value.
- **Moderate signal** means some evidence supports it but coverage is thin.
- **Limited data** means minimal evidence is available and professional judgment should be applied.

The trust model is not decorative. It directly feeds into the Prioritization Engine, which uses trust tier and confidence level as ranking factors when determining which books need attention first.

---

## The Accuracy Framework

Book Intelligence uses a four-tier accuracy priority system that determines where accuracy matters most and where errors are tolerable.

**Tier 1: Compliance-Critical.** Sexual Content ratings, Ban Status, Challenge Risk, and Elementary Grade Level Suitability. These fields must be accurate because errors create legal exposure. A false "None" on Sexual Content for a book that is actually explicit is the worst-case failure — it exposes the district to criminal liability under SB 412. False negatives are unacceptable.

**Tier 2: Decision-Informing.** Violence, Language, Parental Guidance, Content Warnings, Potential Concerns, and Reading Level. These inform professional decisions. Errors are problematic but not legally dangerous.

**Tier 3: Contextual.** Mature Themes, general Themes, Educational Value, AI Summary, and People/Characters. These provide context. A wrong theme tag is unlikely to cause a compliance failure.

**Tier 4: Informational.** Subjects, Page Count, Publication Year, Synopsis, Cover Image. Sourced from databases, not AI. Generally reliable, low-impact errors.

The accuracy framework includes a formal audit process: take a random sample of books, verify the Tier 1 fields against professional review sources like Kirkus and Common Sense Media, check Ban Status against PEN America and major ban lists, verify that Challenge Risk differentiation is meaningful, and verify that Grade Level Suitability is consistent with Content Ratings.

Beyond formal audits, the community features described later in this narrative create a continuous accuracy improvement mechanism — every verification, dispute, and accuracy vote is a data point about whether the AI got it right.

---

## Where Book Intelligence Appears

Book Intelligence surfaces across six locations in OnShelf, each showing different density appropriate to the user's task:

**The Book Detail Page** is the full Intelligence Card — every field group, every flag, every note. This is where a librarian goes to deeply research a specific book.

**The Orders View** shows compact intelligence at the point of decision. When a teacher or librarian is building a book order, every title gets a real-time intelligence check. "3 of the 12 books in this order have active flags. 1 has Explicit sexual content rating." The user doesn't leave the workflow to research — the research is embedded in the workflow.

**The Dashboard** shows aggregated collection-wide metrics — flagged books across school and classroom libraries, access status distribution, order alerts, weekly overviews, and parent restriction counts. This is the "how is our library system doing?" view.

**Classroom Libraries** show the same full Intelligence Card for books assigned to classrooms, giving teachers and administrators visibility into classroom collections.

**Reports** provide aggregated, formatted intelligence for presentation — board meetings, superintendent reviews, team assessments, and library health checks.

**The Parent Portal** shows a simplified view appropriate for parents — title, author, cover, summary, themes, age range, content advisory, and a restrict-access button. Parents do not see full flag detail, raw challenge data, risk classifications, or professional review notes.

---

## Network Intelligence

Everything described so far is Layer 1 — intelligence derived from external public sources about individual books. Network Intelligence is Layer 2 — intelligence derived from the collective activity of every district in the Bookmarked network.

The distinction is important: Network Intelligence is passive. It is collected automatically from district activity without anyone doing anything special. Every time a librarian changes a book's status, a teacher approves an order, a committee reviews a challenged book, or a district uploads their ISBNs — that activity becomes anonymized data that flows into the network.

Here is what Network Intelligence provides:

**Challenge Velocity** tracks which titles are being reviewed across districts in real time. "12 districts reviewed this book in the last 30 days" is a signal that something is happening with this title and your district should be aware.

**Placement Patterns** show where books live across the network. "89% of high school libraries in the Bookmarked network have this book" gives a librarian context for how common a title is in collections like hers.

**Decision Benchmarking** shows what peer districts decided about specific titles. "73% of similar districts retained this title after review." This is available at both the district level and the state level. It is not available at the ESC region level — ESC regions are strategic sales partners for Bookmarked, not product units or analytical units.

**Collection Composition** provides gap analysis and diversity metrics across the network. "No climate science titles in your collection. 78% of similar districts have 5+." This identifies what is missing, not just what is flagged.

**Review Outcomes** show the full outcome history of challenged books across the network. "Challenged in 8 districts, retained in 6, removed in 2." This is the "case law" for book challenges that does not exist anywhere today. No organization tracks what actually happened after a book was challenged — whether it was retained, removed, or is still under review. Bookmarked does, because districts use OnShelf to manage the review process.

**Ordering Patterns** reveal what districts like yours are ordering. This is the discovery bridge — the transition from "we use Bookmarked for compliance" to "we use Bookmarked to build a great library."

All of this data is already being collected as districts use the product. The books they upload, the statuses they change, the orders they process, the reviews they conduct, the parent restrictions that are applied — all of it flows into the network. The intelligence surfaces — the dashboards, benchmarks, and reports that make this data visible — are what is being designed and built.

**Privacy is absolute.** Individual district data stays private. The network sees only aggregated patterns and anonymized benchmarks. Districts are never attributed by name. Minimum thresholds prevent de-anonymization.

---

## District-Level Ground Truth

This is Bookmarked's most defensible competitive advantage, and it deserves its own section because it changes the nature of the entire system.

External organizations — PEN America, the American Library Association, news outlets, advocacy groups — publish lists of banned and challenged books. These lists are claims. PEN America says "Book X was banned in District Y." But PEN America has no access to District Y's actual library system. They do not know whether Book X is on the shelves or not. They are reporting what they have heard, what a source told them, what appeared in a news article. These are claims, not verified facts.

Bookmarked connects to actual library systems. When a district is a Bookmarked customer, Bookmarked can see their catalog. Bookmarked can see whether a book is on the shelf in 14 of 19 libraries. Bookmarked can see whether the librarian has marked it "Reviewed — Retained." Bookmarked can see the review history, the committee decision, and the outcome.

This means that when PEN America claims a book has been banned in a Bookmarked customer district, Bookmarked can check. And Bookmarked can report: "Claimed banned by PEN America. Bookmarked Verified: Present in 14 District Y libraries. Reviewed and retained."

This works in both directions:
- Book IS on shelves despite ban claims — Bookmarked contradicts the claim with verifiable fact.
- Book is NOT on shelves and district confirms removal — Bookmarked confirms the claim with verifiable fact.

At 150 districts, Bookmarked already has meaningful coverage. At 500 districts, this becomes the most authoritative source of information on what is actually happening with books in American school libraries versus what is being claimed. No other organization can build this because no other organization connects to actual library systems.

**Bookmarked becomes the source of truth for actual bans and challenges.** Every other organization reports claims. Bookmarked reports verifiable facts from connected systems.

---

## Community Intelligence

Network Intelligence is passive — it happens automatically from district activity. Community Intelligence is active — it requires practitioners to deliberately contribute.

Community Intelligence turns Book Intelligence from a one-way data feed into a collaborative intelligence system. Every librarian in the network becomes a sensor for accuracy, source quality, and ground truth. The system gets smarter every time a practitioner interacts with it.

Community Intelligence is designed in three phases:

### Phase 1: Verification and Accuracy Feedback

This is the simplest form of community participation, designed to ship first and establish the habit of practitioners engaging with the intelligence.

Every AI-generated field on the Intelligence Card gets two actions: **Verify** ("This rating is correct based on my professional knowledge") and **Dispute** ("This rating is incorrect — here's why"). Verification is one click with an optional note. Dispute is one click with a required correction value and an optional note.

These actions are always visible alongside the AI-generated value. They add context — they never replace the AI value. Both the AI assessment and the community signal are always visible. A librarian who disputes a rating cannot make the AI value disappear. She can add her professional judgment alongside it, and the system records who said what.

In addition to verify and dispute, simple accuracy feedback — thumbs up or thumbs down per field — creates a measurable accuracy metric over time without requiring librarians to specify what is wrong. Aggregated across districts: "This field has 94% positive accuracy feedback across 30 responses."

### Phase 2: Source Contribution and Source Reporting

After Phase 1 establishes community participation patterns, Phase 2 adds more substantive contributions.

**Source Contribution** lets users submit sources the pipeline missed. A librarian finds a news article or organization listing about a book that Bookmarked has not captured. She pastes the URL. The system classifies, validates, and ingests it into the flag pipeline with a "Submitted by community" tag. Every librarian becomes a sensor for the flag detection pipeline.

**Source Reporting** lets users flag sources they believe are unreliable. "Report source" with a structured dropdown reason: "Source no longer active," "Source is advocacy org, not factual," "Source misattributed this book," "Source data is outdated," "Information doesn't match the book." Reports do not remove sources — they add a credibility signal. Multiple independent reports from different districts are required before a source is downweighted. A single report is noted but does not affect the source's weight.

### Phase 3: District-Level Ground Truth at Scale

This is the convergence of Community Intelligence and the ground truth capability described earlier. At sufficient scale — hundreds of connected districts — Bookmarked becomes the definitive verification authority for ban and challenge claims. The system automatically surfaces contradictions between external claims and ground truth from connected libraries, creating Bookmarked Verified badges that represent the highest trust tier in the system.

---

## The Anti-Gaming Problem

Community features create an attack surface. A librarian who philosophically disagrees with a book's presence could verify an inaccurate "None" rating to protect it. A librarian who wants a book removed could dispute an accurate rating to trigger a review. Someone could report credible sources as unreliable to suppress information they do not like.

Book Intelligence addresses this through five architectural defenses:

**Transparency.** Every community action is tied to a named user at a named district. There is no anonymous influence in the system.

**Attribution.** Actions are visible to the user's administrators. A librarian cannot suppress information from her superintendent. The superintendent sees the same data the librarian sees.

**Additive only.** Community input adds a layer alongside the AI-generated baseline. It never overwrites or removes the baseline. Both the AI value and the community signal are always visible. If a librarian disputes a "Moderate" violence rating and suggests "Mild," the system shows: "Violence: Moderate (AI-Generated) — 1 dispute: 'Should be Mild — conflict is verbal only.'" The "Moderate" never disappears.

**Cross-district exposure.** If one librarian is disputing ratings that twelve other districts have verified, that pattern is visible. Outlier behavior becomes detectable across the network.

**Threshold-based influence.** A single action does not move the needle. Multiple independent actions from different districts carry weight. One verification does not change a confidence indicator. Twelve verifications from twelve districts does.

---

## Enhanced Intelligence

Beyond the core pipeline, community features, and network effects, Book Intelligence is designed to get smarter across several dimensions:

### Source Intelligence

Not all flag sources are created equal. PEN America, with its institutional credibility and documentation practices, produces different quality data than an anonymous blog post. The Source Intelligence System assigns credibility scores based on source type (institutional sources score higher than blogs), evidence citation (sources that cite board minutes score higher than assertion-only sources), track record (sources confirmed by Bookmarked Verified ground truth score higher), and recency (active sources score higher than dormant ones).

Each flag carries a confidence badge: Evidence-cited (green — source provides specific documentation), Reported (yellow — media coverage with some sourcing), or Assertion-only (gray — claims without evidence).

Over time, as more ground truth data accumulates, the system learns which sources are accurate. If Source X has been contradicted by Bookmarked Verified data 40% of the time, it gets downweighted automatically. If Source Y has been confirmed 95% of the time, it gets elevated. No human has to maintain a source quality list — the system learns it from usage.

### Temporal Intelligence

Flags have dates. Temporal Intelligence applies recency weighting: recent flags (last 6 months) carry full weight, older flags (6-24 months) remain visible but are weighted less, and historical flags (24+ months) are preserved as context but not used in risk calculations. No flags are ever removed — recency affects weighting, not visibility.

### Contradiction Detection

When sources disagree about the same book — one says "banned," another says "retained after review" — the system surfaces the contradiction for the user to evaluate. "Sources disagree about this book. [Show details]." The system does not resolve contradictions. It makes them visible.

### Legislative Tracking

Book Intelligence maps books to relevant legislation so districts can see the regulatory context around specific titles. "This book's themes intersect with subject matter covered by SB 412." This is topical overlap, not legal advice. The system maps — it does not advise. It never states whether a book "violates" a law. It surfaces the connection and leaves interpretation to librarians and legal counsel. The architecture supports multiple states from day one, starting with Texas (SB 13, SB 412, HB 900) and TSLAC as the policy body.

### Curriculum Alignment

A binary indicator: does this book appear on known curriculum or reading lists? Starting with Texas TEKS (Texas Essential Knowledge and Skills), with architecture supporting any state. This creates context that goes beyond compliance — a book on the TEKS reading list that also has a flag tells a different story than a flagged book with no curriculum connection.

### Award and Recognition Data

Book awards provide positive context that balances flag data. A Newbery-winning book with a flag tells a fundamentally different story than an unknown book with the same flag. The system surfaces awards from major recognition programs (Newbery, Caldecott, Coretta Scott King, National Book Award, Printz, and others) as part of the Intelligence Card.

---

## Intelligence Surfaces and Workflows

The intelligence described above needs to reach users at the right time, in the right format, and at the right density. This section describes how.

### The Prioritization Engine

This is the key user experience innovation. A district with 200 flagged books does not need a list of 200 books. They need: "Here are your top 5 priorities today. Start with these."

The Prioritization Engine ranks books by urgency using weighted factors: compliance exposure (an Explicit sexual content rating in an elementary library is a code-red), trust tier (a Bookmarked Verified flag carries more weight than an AI-Generated assessment with limited data), recency (a flag from yesterday matters more than one from 2023), peer signal (if 8 other districts just reviewed this book, yours probably should too), unreviewed duration (a flagged book sitting unreviewed for 60 days is more urgent than one flagged yesterday), and confidence level (low-confidence, high-stakes ratings need human review).

The output is a prioritized worklist — not a data display. The user sees ranked items with clear reasons why each is prioritized. This transforms Book Intelligence from "here is information" into "here is what you should do next."

The Prioritization Engine is especially important during onboarding. When a new district uploads 3,000 books and 200 have flags, the system says: "We found 200 books that need attention. Here are the 10 highest-priority — 3 have Explicit ratings in elementary collections. Start with these."

### Dashboard Evolution

The current dashboard shows basic aggregated metrics. The designed evolution adds:

**Compliance Posture** — a readiness indicator answering: "Have our flagged and at-risk books been reviewed and documented?" This measures the percentage of flagged books reviewed, unresolved flags older than 30 days, documentation coverage for board presentation, and review breakdown by category.

**Engagement Score** — a measure of who is actively using the system. Most active librarians, most active teachers, teachers who have not confirmed their classroom libraries, parent committee activity, board member engagement. This helps administrators manage their people, not just their books.

**Risk Heatmap** — a visual map of where risk concentrates by school, grade level, and classroom. "Your 3rd grade classroom libraries have 12 unreviewed flagged books" is actionable. "Your district has flagged books" is not.

**Trend Intelligence** — time-series data that turns snapshots into narratives. "Flags are increasing 23% month-over-month." "Challenge activity spiked this week — 4 new challenges." "Your review velocity is keeping pace with new flags." Units of analysis are districts and schools — not ESC regions.

**Peer Benchmarking** — anonymized comparison against peer districts at district and state level. "Districts your size have reviewed 94% of flagged books. You've reviewed 71%."

**Report Generator** — one-click export producing formatted reports for board presentations, superintendent meetings, team reviews, and library health checks. Multiple audiences, not just the board.

### Workflow Integration

**Review Workflow Intelligence** pre-loads everything relevant when a librarian opens the review workflow for a challenged book: the full Intelligence Card, peer district decisions, complete flag history, community verifications, and trust tier for each data point. The librarian should not have to research — the research is done.

**Order-Time Intelligence** checks every title against Book Intelligence when a book order is being built. The user sees flagged books and risk information before they submit, not after.

**New Flag Alerts** notify librarians when a book already in their collection gets newly flagged. "Book X in your library was flagged by [source] on [date]. No action required yet — here's the intelligence."

**Onboarding Intelligence** runs the full pipeline on a new district's collection and produces a Collection Health Report before they start using the product.

**Parent Access Intelligence** tracks parent behavior behind the scenes. When parents are restricting a title at 3x the rate of similar books, the system surfaces that as a signal — not a directive — to the librarian.

### Proactive Alerts

Book Intelligence pushes to users instead of waiting for them. Alerts are delivered by email (no native app exists), with dashboard notifications as a secondary channel. Alert types range from high urgency ("Book X in your collection was flagged") through medium ("3 books in elementary need review," "4 new challenges this week") to low ("Peer districts are reviewing Book Y," "Verification expired — new intelligence available").

---

## The Learning System

Everything described above produces data. The Learning System describes how that data makes Book Intelligence better tomorrow than it is today.

### AI Model Feedback Loop

Every community verification, dispute, and accuracy vote is a signal about whether the AI got it right. As the system accumulates thousands of human judgments over time, those judgments feed back into improving the AI.

This does not mean fine-tuning a model on day one. It means: first, identify systematic patterns in community feedback (the AI consistently over-rates violence in historical fiction, consistently under-rates sexual content in YA). Second, manually adjust enrichment prompts to address patterns. Third, measure whether adjustments improve accuracy. Fourth, iterate.

Over time, the community becomes the training signal for the AI, and the AI becomes the scaffolding that the community refines. This is a compounding loop — the more practitioners participate, the better the AI gets, which makes the practitioners' jobs easier, which encourages more participation.

### Source Quality Evolution

With source reporting from the community plus ground truth verification from connected districts, the system learns which sources are accurate over time. Sources that are consistently contradicted by ground truth get downweighted automatically. Sources that are consistently confirmed get elevated. No human has to maintain a source quality list.

### Predictive Intelligence

Once Book Intelligence has enough data, it can start predicting: "Books with these characteristics — subject matter, author history, publisher, themes — have a 73% chance of being flagged within 12 months." This is not speculation — it is pattern recognition across the dataset. A librarian adding a book to an order sees: "No current flags. Similar books in the Bookmarked network were flagged within 6 months 60% of the time."

Whether 150 districts provide enough signal for meaningful predictions is an open question that requires statistical analysis. The architecture is designed to support it when the data is sufficient.

### Network Effect Compounding

Each new district makes the system measurably better for every existing district:

- More districts means more verifications, which means higher confidence scores across the network.
- More collection data means better peer benchmarking at finer granularity.
- More flag reports from practitioners means faster source quality learning.
- More review outcomes means richer "case law" for decision benchmarking.
- More ground truth data means stronger verification authority.

At 150 districts, the network produces useful signals. At 500, patterns emerge that no individual district could see. At 2,000, Bookmarked has real-time visibility into every significant trend in K-12 school libraries.

### Curriculum and Legislative Sync

Laws change. Curriculum standards update. The books that matter shift. The Learning System envisions automated re-enrichment — when a new state passes a book regulation law, every book in the system gets re-assessed against the new regulatory context. When Texas updates TEKS, books tagged as curriculum-aligned get re-validated. This is a batch operation with cost and performance implications that need engineering analysis.

---

## The Hard Boundaries

These are the rules that Book Intelligence never breaks, regardless of what feature is being built or what surface is being designed:

**Book Intelligence operates on public information about books.** It never reads, scans, or processes actual book content. Every assessment is derived from metadata, reviews, flag sources, and other publicly available data. The Content Scanner is a separate capability.

**Book Intelligence never implies it has read a book.** Language must always reference external sources: "external sources report," "publicly available information indicates," "based on metadata and public reviews." Never: "the book contains," "what's in this book," "what's inside."

**Book Intelligence is not a rating system.** Bookmarked does not rate books. It surfaces intelligence from multiple sources so humans can make informed decisions. Framing the output as "ratings" risks being perceived as censorship.

**Book Intelligence is not a replacement for librarians.** Librarians make judgment calls. Book Intelligence provides the data infrastructure they never had. The system supports, empowers, and provides data for librarians. It never replaces them, eliminates their need, or automates their professional judgment.

**Book Intelligence is not a censor.** It does not decide what books are appropriate. It provides data for districts to make defensible decisions within their regulatory framework. No feature blocks, hides, or removes books based on intelligence data. All actions are human-initiated.

**Community features are transparent, attributed, and additive.** Every community action is tied to a named user at a named district. Actions add a layer — they never overwrite or remove the AI baseline. Administrators see the same data as librarians. Cross-district patterns expose outlier behavior.

---

## What Makes This Different

The book challenge landscape is full of organizations publishing lists — PEN America, ALA, individual advocacy groups, news outlets. They all report claims. "This book was banned here." "This book was challenged there."

Bookmarked is the only organization that connects to actual library systems. Bookmarked is the only organization that can check the claims against ground truth. Bookmarked is the only organization building a network where 150+ districts' collective activity produces intelligence that no individual district, no advocacy group, and no government agency has access to.

External organizations report what they hear. Bookmarked reports what it knows — from connected systems, from practitioner verifications, from actual library catalogs, and from the collective intelligence of the largest network of school libraries in the country.

That is what Book Intelligence is.
