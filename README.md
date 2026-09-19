PROBLEM UNDERSTANDING
AI-Powered Public Profile & Digital Footprint Intelligence
Neurax Hackathon 3.0 · Domain 3: AI in Cybersecurity
Purpose: A complete problem-understanding brief for Checkpoint 1 (15 marks), with emphasis on the 5-mark Problem Understanding criterion.
1. What Exactly Is the Problem?
A person's public information is fragmented across many independent platforms and sources. The same person may use different names, usernames, aliases or profile photographs on different platforms. Professional information, events, projects, publications and affiliations may also be distributed across separate public sources.
•	Social platforms: Instagram, X/Twitter, YouTube, LinkedIn and similar public sources.
•	Technical/professional sources: GitHub, personal websites, company pages and professional profiles.
•	Public activities: conferences, hackathons, workshops, webinars and interviews.
•	Public contributions: projects, products, publications, patents and other documented technical work.
The central problem is therefore not simply finding information. It is identifying, verifying and connecting fragmented public information that most likely belongs to the same person.
2. What Is the System Expected to Do?
The hackathon requires a software-only AI system that starts with an organizer-provided, consented image and limited context and produces evidence-backed public identity intelligence.
1. Identify the most likely public identity associated with the image.
2. Discover relevant public social-media and professional profiles.
3. Resolve different names, aliases and usernames.
4. Correlate information across multiple public sources.
5. Extract organizations, roles, events, projects, publications and related entities.
6. Identify publicly documented patents, inventions or innovations where applicable.
7. Construct a timeline and/or relationship graph.
8. Attach evidence and confidence to material findings.
9. Explicitly expose uncertain, conflicting or insufficient information.
3. Why Is This Problem Difficult?
Challenge	Example	Why it matters
Fragmentation	LinkedIn → education; GitHub → projects; company site → role	No single source contains the complete footprint.
Different identities	Priya Sharma / @priya_codes / priya-dev	The system must determine whether records refer to one person.
Common names	Rahul Kumar	Name equality does not imply identity equality.
Missing information	No real name, incomplete bio, missing photo	The system must reason under incomplete evidence.
Conflicting information	Different job titles on different sources	The system must surface conflict instead of blindly selecting one source.
False matches	Similar name + similar username	Incorrect correlation can produce a false identity profile.
4. Key Technical Concepts
Identity matching — Selecting the most likely candidate identity from several candidates.
Identity resolution / entity resolution — Determining whether records, profiles or accounts described differently refer to the same real-world person.
Multi-platform correlation — Combining evidence from multiple independent public sources.
Information extraction — Turning unstructured pages into structured entities such as people, organizations, roles, projects and events.
Evidence verification — Keeping a traceable source for each material claim.
Confidence / uncertainty — Representing how strongly the available evidence supports a finding.
Timeline / relationship graph — Organizing activities and entities chronologically or as connected relationships.
5. Existing Approaches and Applications
The problem is not a completely unexplored research area. Existing technologies address different pieces of it. Therefore, the project should not claim that public-profile discovery or identity resolution is new by itself.
Existing approach/system	What it already does	Limitation relative to this hackathon
Search engines	Find pages, names, usernames, companies, articles and profiles.	Human investigators still need to determine which results belong to the same person.
Google Lens / visual search	Accepts an image and can return similar images, objects and websites containing the image or a similar image.	Visual search is not the same as a complete, evidence-backed digital identity intelligence workflow.
Cross-platform identity research	Research systems have attempted to link identities across different social networks.	Prior systems often target particular networks and research settings rather than the full workflow specified here.
Bayesi-Chain	Uses digital footprints, identity resolution, machine learning and Bayesian probabilistic modelling to assess identity reliability for a refugee identity use case.	Different primary use case; not the complete image → public profile discovery → correlation → evidence graph workflow required here.
Manual OSINT investigation	Human investigator searches and correlates public information.	Slow, difficult to scale, and vulnerable to inconsistent reasoning and false matches.
6. Prior Research Case Study: Bayesi-Chain
Proving Yourself: Addressing the Refugee Identity Crisis with Bayesi-Chain Probability & Digital Footprints was published by Juanita Blue, Joan Condell and Tom Lunney at ISNCC 2019. The paper addresses a different problem: helping displaced people who may lack traditional identity documentation build a digital identity artifact from digital-footprint evidence.
Conceptual flow:
Digital footprint → identity resolution → probabilistic assessment → trust/reliability → digital identity artifact
7. Technologies / Technical Ideas in Bayesi-Chain
•	Machine learning.
•	Identity resolution: comparing attributes across records to determine whether they refer to the same individual.
•	Bayesian probabilistic modelling: estimating the likelihood/reliability of identity evidence.
•	A blockchain-inspired ledger / digital identification artifact for retaining accepted identity evidence.
8. How Bayesi-Chain Relates to Our Project
The projects overlap conceptually because both treat digital footprints as evidence that can contribute to identity resolution. However, they answer different primary questions.
Aspect	Bayesi-Chain	Our hackathon problem
Primary question	Can digital-footprint evidence help establish an asserted identity?	Who is the most likely public identity and what public footprint can be reliably associated with them?
Starting point	Identity assertion + digital footprint evidence	Consented image + limited context
Identity resolution	Core component	Core component
Public profile discovery	Not the main stated objective	Explicit requirement
Cross-platform correlation	Related to identity evidence	Explicit requirement
Timeline / graph	Not the central output	Explicit requirement
Evidence trail	Supports identity reliability	Explicit requirement for material findings
Main use case	Refugee identity reconstruction	Public digital-footprint intelligence under authorized/public-data boundaries
9. Technical Drawbacks / Limitations of the Bayesi-Chain Approach
1. Initial rather than mature platform — The paper describes design/initial development and preliminary testing rather than a mature production-scale identity intelligence platform.
2. Dependence on identity attributes — Identity resolution relies on attributes. Missing, erroneous or inconsistent attributes reduce the available evidence and make matching harder.
3. Digital account does not guarantee real identity — A public account or online footprint is evidence, not automatic proof that the account owner is the target person.
4. Probability is not proof — A Bayesian trust or confidence value represents an estimate under model assumptions; it should not be presented as absolute proof.
5. Source reliability matters — Official organizational records, conference pages and anonymous social accounts should not automatically be treated as equally reliable evidence.
6. False association risk — Incorrectly combining two people's records can create a misleading identity profile; robust false-match handling is therefore essential.
10. Normal / Real-World Limitations
•	A person may have little or no public digital footprint; absence of evidence is not evidence of absence.
•	People may use pseudonyms, changed usernames, deleted accounts or incomplete profiles.
•	Aggregating individually public information can create a much more detailed profile than any single source reveals.
•	False identity association can cause reputational or practical harm.
•	Consent, purpose limitation, public-source boundaries and transparent evidence handling are essential.
•	The system must not access private accounts, leaked data, credentials or bypass access controls.
11. The Technology / Research Gap
The research gap should NOT be stated as 'nobody has done digital identity resolution before.' Prior work demonstrates that digital footprints, identity resolution and probabilistic reasoning already exist.
A more defensible gap is the integration of the following authorized workflow into one explainable system:
1.	Consented image + limited context
2.	Candidate public-identity discovery
3.	Multi-platform public-profile discovery
4.	Alias / username / name resolution
5.	Cross-source entity correlation
6.	Structured extraction of roles, organizations, events, projects and publications
7.	Evidence-backed claims with confidence
8.	Conflict and uncertainty reporting
9.	Timeline / relationship graph generation
10.	False-match handling and responsible-design controls
12. Potential Novelty — To Be Validated by Prior-Art Research
The team should not claim that every individual feature is novel. The potential contribution lies in the specific, integrated and explainable workflow. Before making a final novelty claim, the team should compare the prototype against existing systems and research.
•	Evidence-backed cross-platform identity correlation rather than simple search-result aggregation.
•	Explainable reasons for why multiple public profiles are considered related.
•	Explicit uncertainty and conflict reporting rather than forcing a single answer.
•	A unified timeline / relationship graph of public activities and affiliations.
•	A source-aware confidence model that distinguishes stronger and weaker evidence.
•	A consented/public-data boundary built into the system design.
13. What the System Must NOT Become
•	Not merely a reverse-image search interface.
•	Not merely a generic web scraper.
•	Not a private-account access tool.
•	Not a leaked-data or credential-based intelligence system.
•	Not a mechanism for bypassing access controls.
•	Not a system that presents uncertain matches as facts.
14. Privacy & Responsible Design
The problem statement explicitly requires matching, discovery and verification to use organizer-approved, consented, public, synthetic or otherwise authorized information.
•	Use only authorized/public sources.
•	Record source URLs or source identifiers for material claims.
•	Display confidence and uncertainty.
•	Show conflicting evidence rather than silently resolving it.
•	Avoid collecting unnecessary personal information.
•	Provide a clear distinction between 'found', 'correlated', and 'verified' information.
•	Do not infer private facts that are not supported by public evidence.
15. What Success Looks Like
Judging capability	What our prototype should demonstrate
Identity matching — 10	Select the most likely candidate and explain supporting evidence.
Public profile discovery — 5	Find relevant public profiles.
Multi-platform correlation — 10	Connect evidence across independent public sources.
Entity resolution — 5	Resolve names, aliases and usernames.
Information extraction — 5	Structure organizations, roles, events, projects, publications and related entities.
Evidence/source verification — 5	Attach traceable evidence to material findings.
Timeline/relationship generation — 5	Produce a coherent timeline or relationship graph.
Robustness / false-match handling — 5	Handle ambiguity, missing data, conflicts and false matches.
AI/technical implementation — 5	Demonstrate meaningful technical contribution and reliability.
Privacy/responsible design — 5	Respect consent and public-information boundaries.
16. The Problem in One Sentence
“The challenge is not simply to find information about a person; it is to determine which fragmented public records most likely belong to that person, correlate them across sources, verify them with evidence, and clearly communicate confidence and uncertainty.”
17. Questions the Team Must Be Able to Answer
•	Why is this different from Google Lens or a normal search engine?
•	How do you distinguish identity matching from simple name matching?
•	How do you handle two people with the same name?
•	How do you determine whether two usernames belong to the same person?
•	What happens when evidence conflicts?
•	How do you calculate or justify confidence?
•	What makes one source more reliable than another?
•	What happens when there is insufficient evidence?
•	How do you prevent false matches?
•	What exactly is novel compared with existing research?
•	What data are you allowed to access?
•	How do you protect the person from incorrect aggregation?
•	How will you evaluate whether your system actually works?
18. References for the Problem-Understanding Stage
•	Blue, J., Condell, J., & Lunney, T. (2019). Proving Yourself: Addressing the Refugee Identity Crisis with Bayesi-Chain Probability & Digital Footprints. ISNCC 2019. DOI: 10.1109/ISNCC.2019.8909145.
•	Jain, P., Kumaraguru, P., & Joshi, A. Finding Nemo: Searching and Resolving Identities of Users Across Online Social Networks. WWW 2013 Companion / arXiv:1212.6147.
•	Google Search Help. Search with an image on Google / Google Lens.
•	Hackathon problem statement supplied by the organizers: Neurax Hackathon 3.0, Domain 3 — AI in Cybersecurity, Public Profile & Digital Footprint Intelligence.

Prepared as a problem-understanding and prior-art foundation — not as a final novelty claim.

