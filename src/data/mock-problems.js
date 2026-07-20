import b2b1 from "@/assets/post_images/B2B 1.jpeg";
import ed1 from "@/assets/post_images/Ed -1.jpeg";
import ed2 from "@/assets/post_images/Ed 2.jpeg";
import b2b2 from "@/assets/post_images/b2b.jpeg";
import fintech1 from "@/assets/post_images/FinTech 1.jpeg";
import fintech2 from "@/assets/post_images/Fintech 2.jpeg";
import hospital2 from "@/assets/post_images/Hospital 2.jpeg";
import hospital3 from "@/assets/post_images/Hospital 3.jpeg";

export const problems = [
  {
    id: 1,
    title: "Hospital Queue & Patient Flow Management System",
    description: "We currently handle over 500 outpatient visits manually every single day across 12 departments. The lack of structured queue management leads to severe waiting area congestion, misplaced paper patient files, doctor burnout from unorganized consultations, and extremely poor patient satisfaction scores.",
    details: `Problem Overview:
We currently handle over 500 outpatient visits manually every single day across 12 departments. The lack of structured queue management leads to severe waiting area congestion, misplaced paper patient files, doctor burnout from unorganized consultations, and extremely poor patient satisfaction scores.

Detailed Description & Requirements:
Allen Hospitals operates a busy facility in Pune handling significant daily footfall. The current manual check-in process relies heavily on paper tokens and physical registers at central reception desk. This results in bottlenecks where patients cluster around reception desks, front-desk staff face constant verbal pressure, and doctors receive files out of triage order.
To solve this, we require an enterprise-grade digital Queue Management System (QMS) integrated seamlessly with our legacy Hospital Management System (HMS).

Key Functional Requirements:
1. Patient Self Check-in & SMS Alerting: Interactive kiosk/tablet interface at entry for token generation. Automated SMS alerts to patients informing them of live wait status, estimated consultation time, and reminder when 3 patients are ahead.
2. Doctor Portal & Consultation Management: Intuitive real-time dashboard for physicians showing waiting list, patient triage priority, digital file attachment links, and status controls (Call Patient, In-Consultation, On Hold, Completed).
3. Centralized Reception Control: Admin dashboard to reassign patient queues dynamically during emergency arrivals or physician delays.
4. Real-time Digital Display Integration: Web-based display views for waiting room monitors showing live token updates and audio chime notifications.
5. Analytics & Operational Reporting: Daily, weekly, and monthly reports detailing average wait times per department, peak congestion hours, doctor consultation turnaround times, and patient drop-off rates.

Technical & Reliability Expectations: 
The system must maintain 99.9% uptime operating 24/7. It should feature offline fallback queue syncing in case of localized network interruptions and comply with standard healthcare data privacy guidelines.`,
    date: "2 hours ago",
    category: "Healthcare",
    type: "Paid Project",
    author: {
      name: "John From Chennai",
      role: "Hospital Administrator - Allen Hospitals, Pune",
    },
    image: hospital2.src,
    stats: { likes: 142, comments: 28, views: 1205 }
  },
  {
    id: 2,
    title: "Remote Tele-ICU Monitoring & Early Warning Alert System",
    description: "Intensive Care Units across our 4 regional hub hospitals suffer from delayed recognition of critical patient deterioration due to fragmented vital sign monitoring. Off-site intensivists lack a unified real-time dashboard that aggregates continuous ICU telemetry, risking delayed emergency interventions.",
    details: `Problem Overview:
Intensive Care Units across our 4 regional hub hospitals suffer from delayed recognition of critical patient deterioration due to fragmented vital sign monitoring. Off-site intensivists lack a unified real-time dashboard that aggregates continuous ICU telemetry, risking delayed emergency interventions.

Detailed Description & Requirements:
Apex Telecare connects central specialized intensivists with peripheral ICU beds in Tier-2 and Tier-3 city hospitals. Currently, vital signs (ECG, SpO2, arterial pressure, respiratory rate) are recorded on disparate bedside hardware, requiring manual entry into local charts every hour. This lag creates critical windows where subtle pathophysiological deterioration passes unnoticed until severe cardiac or respiratory arrest occurs.
We are looking to develop a central Tele-ICU Streaming & Early Warning Alert Platform capable of ingesting high-frequency IoT streaming telemetry from bedside monitors.

Core Requirements:
1. Multi-bed Streaming Dashboard: Real-time visual display aggregating 50+ ICU beds simultaneously with color-coded risk indicators based on modified Early Warning Scores (MEWS).
2. Automated Deterioration Alerts: Intelligent event-driven threshold triggers that push instant visual, auditory, and mobile push notifications to senior duty doctors when vital parameters drift outside personalized safe zones.
3. Digital Rounding & Clinical Notes: Integrated video consult panel enabling remote bedside virtual rounds, structured SOAP note entry, and automated synchronization with the EHR database.
4. Historical Waveform Review: High-speed historical telemetry viewer allowing clinicians to review 72-hour vital trends and ECG waveform segments for precise diagnostic evaluation.

Security & Performance: 
Strict HIPAA/ISO 27001 data compliance, sub-second streaming latency, robust end-to-end encryption, and role-based access control for multi-hospital administrative hierarchies.`,
    date: "5 hours ago",
    category: "Healthcare",
    type: "Contract Project",
    author: {
      name: "Dr. Aris Thorne",
      role: "Chief Medical Officer - Apex Telecare, Hyderabad",
    },
    image: hospital3.src,
    stats: { likes: 89, comments: 14, views: 890 }
  },
  {
    id: 3,
    title: "Automated Pathology Lab Specimen Tracking & Result Dispatch",
    description: "Manual sample labeling and paper-based tracking across 25 collection centers lead to occasional specimen mislabeling, delayed lab processing times, and manual WhatsApp/email delivery of diagnostic reports, causing operational inefficiency and customer dissatisfaction.",
    details: `Problem Overview:
Manual sample labeling and paper-based tracking across 25 collection centers lead to occasional specimen mislabeling, delayed lab processing times, and manual WhatsApp/email delivery of diagnostic reports, causing operational inefficiency and customer dissatisfaction.

Detailed Description & Requirements:
BioMed Diagnostics processes over 3,000 blood, urine, and tissue samples daily gathered from 25 satellite phlebotomy centers and dispatched to a central testing facility. Our existing operational bottleneck stems from manual barcode creation, manual registration in central diagnostic hardware, and manual PDF emailing of verified results.
We need a comprehensive End-to-End Specimen Lifecycle & Results Automation Platform.

Key System Features:
1. Smart Phlebotomy App: Mobile application for collection technicians enabling barcode scanning, patient identification verification, timestamped sample pickup, and temperature-controlled transport tracking.
2. LIMS (Laboratory Information Management System) Integration: Automated bidirectional interface connecting automated blood analyzers directly with our central database to eliminate manual typing of diagnostic values.
3. Automated Result Verification & Patient Dispatch: Rule-based auto-validation for normal parameters, instant queuing of abnormal values for pathologist digital signature, and automated distribution of encrypted PDF reports via WhatsApp API and SMS portal.
4. Logistics & SLA Tracking: Real-time map view tracking sample transit couriers with automated alerting if transit time exceeds recommended sample stability thresholds.`,
    date: "1 day ago",
    category: "Healthcare",
    type: "Full-Time Consulting",
    author: {
      name: "Priya Sundaram",
      role: "Operations Lead - BioMed Diagnostics, Bengaluru",
    },
    stats: { likes: 56, comments: 8, views: 430 }
  },
  {
    id: 4,
    title: "AI-Powered Automated Plagiarism & Code Assessment Platform",
    description: "Evaluating over 2,500 computer science coding submissions manually each week creates immense grading backlogs, inconsistent feedback, and an inability to reliably detect peer plagiarism or generative AI code submissions.",
    details: `Problem Overview:
Evaluating over 2,500 computer science coding submissions manually each week creates immense grading backlogs, inconsistent feedback, and an inability to reliably detect peer plagiarism or generative AI code submissions.

Detailed Description & Requirements:
Horizon University’s Department of Computer Science has experienced a 400% surge in student enrollment over the past two years. Teaching assistants are overwhelmed with manually running, testing, and grading thousands of programming assignments across Python, C++, Java, and SQL. Furthermore, traditional static plagiarism tools fail to identify AI-generated code rewrites and structural code copying.
We require an Enterprise Automated Code Grading & Integrity Analysis System.

Core Capabilities Required:
1. Multi-language Automated Sandbox Execution: Isolated, secure Docker container environment to automatically pull student submissions from Git/portal, compile, run against private unit test suites, and measure execution speed and memory efficiency.
2. AST & Semantic Code Plagiarism Engine: Advanced Abstract Syntax Tree analysis combined with semantic similarity algorithms to detect structural code plagiarisms, variable renaming, and obfuscated copy-pasting among peer submissions.
3. Generative AI Code Detection: Algorithmic detection modules capable of benchmarking code against known LLM generation patterns and providing confidence scoring to instructors.
4. Interactive Student & Faculty Dashboard: Detailed visual breakage of test case results for students, along with an intuitive grading interface for professors to insert custom code comments and export grades to Canvas/Moodle LMS.`,
    date: "3 hours ago",
    category: "Education",
    type: "Paid Project",
    author: {
      name: "Prof. Marcus Vance",
      role: "Director of Academic Affairs - Horizon University, Mumbai",
    },
    image: ed1.src,
    stats: { likes: 312, comments: 64, views: 2400 }
  },
  {
    id: 5,
    title: "Gamified Adaptive Learning App for Elementary Mathematics",
    description: "Elementary students (Grades 1-5) suffer from high drop-off rates and low engagement when using standard text-heavy digital worksheets, leading to weak foundational mathematical skills and lack of parental visibility.",
    details: `Problem Overview:
Elementary students (Grades 1-5) suffer from high drop-off rates and low engagement when using standard text-heavy digital worksheets, leading to weak foundational mathematical skills and lack of parental visibility.

Detailed Description & Requirements:
BrightKids operates a network of supplemental learning centers. Current digital homework modules rely on static PDF worksheets converted to interactive web forms. Young learners find this format tedious and discouraging, resulting in incomplete assignments and persistent learning gaps in basic numeracy, fractions, and word problems.
We are looking to build a highly interactive, adaptive, gamified learning application for web and mobile platforms.

Key Functionality:
1. Adaptive Skill Tree Engine: Dynamic difficulty scaling that assesses individual student performance in real time. If a child struggles with division, the system automatically provides scaffolded visual micro-lessons before progressing.
2. Gamified Rewards System: Interactive storylines, customizable avatars, earned achievement badges, and non-competitive personal streak rewards to sustain daily practice motivation.
3. Teacher & Parent Insights Dashboard: Real-time tracking portal displaying student proficiency maps, speed, common conceptual sticking points, and automated weekly progress digests sent to parents.`,
    date: "12 hours ago",
    category: "Education",
    type: "Paid Project",
    author: {
      name: "Sonal Deshmukh",
      role: "Founder - BrightKids Early Learning, Pune",
    },
    image: ed2.src,
    stats: { likes: 215, comments: 42, views: 1850 }
  },
  {
    id: 6,
    title: "Remote Online Examination & AI Proctoring Solution",
    description: "Conducting high-stakes semester examinations remotely for 10,000+ distance education students presents severe security challenges, high proctoring labor costs, and frequent student connectivity complaints during live exams.",
    details: `Problem Overview:
Conducting high-stakes semester examinations remotely for 10,000+ distance education students presents severe security challenges, high proctoring labor costs, and frequent student connectivity complaints during live exams.

Detailed Description & Requirements:
Our institution runs extensive distance degree programs. Moving to online testing has exposed vulnerabilities including unauthorized tab switching, impersonation, visual cheating, and audio collusion during exams. Manual human proctoring over webcams is financially unscalable and prone to human oversight.
We are seeking a lightweight, high-security Automated AI Proctoring & Examination Management System.

System Requirements:
1. Lockdown Examination Browser / Engine: Restricts system functionality during exams—disabling copy-paste, secondary monitors, screen recording, and unauthorized browser tabs.
2. Multi-Factor AI Proctoring: Real-time face detection/matching, head pose tracking to flag gaze drift, multiple person detection, and background audio anomaly detection.
3. Low-Bandwidth Network Optimization: Ability to function smoothly under unstable low-bandwidth mobile connections (down to 256 kbps) with auto-save and local encrypted caching during brief outages.
4. Post-Exam Review Console: Time-indexed flag system allowing faculty reviewers to jump directly to flagged suspicious video segments rather than watching hours of footage.`,
    date: "2 days ago",
    category: "Education",
    type: "Contract Project",
    author: {
      name: "Dr. Rajesh Kulkarni",
      role: "Dean - National Institute of Professional Studies, Delhi",
    },
    stats: { likes: 178, comments: 31, views: 1540 }
  },
  {
    id: 7,
    title: "Real-time AI Fraud Detection & Transaction Scoring Engine",
    description: "Rising payment fraud vectors, including account takeover, synthetic identity creation, and rapid carding attacks, are causing increased chargeback penalties and manual review queues that slow down legitimate merchant transaction flows.",
    details: `Problem Overview:
Rising payment fraud vectors, including account takeover, synthetic identity creation, and rapid carding attacks, are causing increased chargeback penalties and manual review queues that slow down legitimate merchant transaction flows.

Detailed Description & Requirements:
PaySwift processes over 1.5 million payment transactions daily for e-commerce merchants across South Asia. Legacy rule-based fraud detection systems rely on static threshold logic (e.g., flagging transactions over ₹50,000). This generates unacceptable false positive rates—blocking valid high-value customers—while failing to catch sophisticated low-value distributed fraud patterns.
We need a high-performance Real-Time Machine Learning Fraud Scoring Engine integrated directly into our payment gateway authorization pipeline.

Technical Specifications:
1. Ultra-Low Latency Inference: Sub-50 millisecond decision latency to evaluate transactions during live payment processing without affecting check-out experience.
2. Multi-Signal Behavioral Profiling: Real-time evaluation of device fingerprinting, IP velocity, geo-location anomalies, behavioral biometrics (typing cadence, mouse movement), and transactional velocity.
3. Dynamic Decision Orchestration: Automated routing rules based on score tiers: Approve, Request 3DS/2FA, Trigger Manual Review, or Block.
4. Analyst Operations Dashboard: Visual tool for risk team members to audit flagged transactions, update blacklists/whitelists, perform graph analysis of linked fraudulent accounts, and retrain ML models with new fraud labels.`,
    date: "40 mins ago",
    category: "Fintech",
    type: "Paid Project",
    author: {
      name: "Vikram Mehta",
      role: "VP of Engineering - PaySwift Technologies, Bengaluru",
    },
    image: fintech1.src,
    stats: { likes: 420, comments: 85, views: 3100 }
  },
  {
    id: 8,
    title: "Automated Corporate Expense Management & Smart Card Platform",
    description: "Mid-market companies struggle with delayed employee expense reimbursements, paper receipt retention, unauthorized out-of-policy corporate spending, and painful manual reconciliation with ERP accounting software.",
    details: `Problem Overview:
Mid-market companies struggle with delayed employee expense reimbursements, paper receipt retention, unauthorized out-of-policy corporate spending, and painful manual reconciliation with ERP accounting software.

Detailed Description & Requirements:
GrowthWealth serves hundreds of corporate clients who spend thousands of hours monthly manually reconciling employee corporate cards, paper receipts, and travel claims. Employees wait weeks for reimbursements, while finance teams lack real-time visibility into operational expenditures until month-end closing.
We are building a unified Enterprise Expense Management Platform with Virtual/Physical Smart Card Integration.

Core Functionality:
1. Smart Optical Character Recognition (OCR) Expense Capture: Mobile app allowing employees to snap photos of receipts; system automatically extracts vendor, tax, amount, date, and maps to correct budget categories.
2. Programmable Corporate Card Controls: Ability for finance admins to issue instant virtual cards with custom spend limits, merchant category restrictions (e.g., flight only, dining only), and expiration dates.
3. Automated Multi-Level Approval Workflows: Rule-based approval trees based on department, spend limits, and policy compliance flags.
4. Bi-directional ERP Integration: Seamless automated ledger synchronization with Tally, QuickBooks, SAP, and NetSuite.`,
    date: "4 hours ago",
    category: "Fintech",
    type: "Paid Project",
    author: {
      name: "Ananya Roy",
      role: "Head of Product - GrowthWealth Advisory, Mumbai",
    },
    image: fintech2.src,
    stats: { likes: 290, comments: 48, views: 2100 }
  },
  {
    id: 9,
    title: "Alternative Data Credit Scoring Platform for MSME Lending",
    description: "Micro, Small, and Medium Enterprises (MSMEs) lacking formal credit bureau histories face high loan rejection rates because traditional credit scoring algorithms rely strictly on historical banking and tax filings.",
    details: `Problem Overview:
Micro, Small, and Medium Enterprises (MSMEs) lacking formal credit bureau histories face high loan rejection rates because traditional credit scoring algorithms rely strictly on historical banking and tax filings.

Detailed Description & Requirements:
MicroLend aims to disburse collateral-free working capital loans to underserved small business owners. Traditional credit scoring relies heavily on formal CIBIL scores and Audited Financial Statements, which over 60% of micro-merchants lack despite running healthy cash-flow positive operations.
We are developing an Alternative Data Underwriting & Credit Risk Assessment System.

Key Platform Features:
1. Multi-source Data Ingestion Engine: Consents-based automated fetching of GST returns, digital payment aggregator logs (UPI, POS transactions), utility bill payments, and e-commerce seller metrics.
2. ML-driven Credit Risk Model: Algorithms that calculate a dynamic alternative credit score based on cash-flow consistency, revenue seasonality, supplier payment reliability, and customer retention.
3. Automated Loan Sanctioning & Document Generation: Instant loan limit calculation, automated digital agreement generation, and integration with e-Sign / e-NACH for automatic repayment setup.`,
    date: "1 day ago",
    category: "Fintech",
    type: "Contract Project",
    author: {
      name: "Siddharth Nair",
      role: "Chief Risk Officer - MicroLend Financial, Gurugram",
    },
    stats: { likes: 150, comments: 24, views: 1200 }
  },
  {
    id: 10,
    title: "Automated Algorithmic Portfolio Rebalancing Dashboard",
    description: "Retail wealth management clients experience portfolio drift and sub-optimal asset allocation because manual rebalancing across equities, mutual funds, and debt instruments is complex and tax-inefficient.",
    details: `Problem Overview:
Retail wealth management clients experience portfolio drift and sub-optimal asset allocation because manual rebalancing across equities, mutual funds, and debt instruments is complex and tax-inefficient.

Detailed Description & Requirements:
NeoInvest manages wealth portfolios for retail investors. Market fluctuations quickly push asset allocations away from targeted risk profiles. Manually calculating trades required to rebalance while minimizing capital gains taxes and exit loads is extremely tedious for financial advisors.
We require an Automated Portfolio Rebalancing & Tax-Loss Harvesting Module for our wealth management platform.

Required Functionality:
1. Target Allocation Drift Monitoring: Continuous monitoring of client portfolios against model allocations with customizable drift threshold alerts.
2. Tax-Aware Rebalancing Algorithm: Smart order generation that prioritizes rebalancing via new cash inflows, matches loss-making lots against gains (tax-loss harvesting), and minimizes exit load penalties.
3. One-Click Execution Panel: Unified trade confirmation UI allowing clients or advisors to review and execute multi-asset batch orders in a single click.`,
    date: "3 days ago",
    category: "Fintech",
    type: "Paid Project",
    author: {
      name: "Kavita Rao",
      role: "Product Manager - NeoInvest, Hyderabad",
    },
    stats: { likes: 112, comments: 15, views: 950 }
  },
  {
    id: 11,
    title: "Automated Vendor Performance & Procurement Portal",
    description: "Managing over 400 active logistics vendors using manual spreadsheets and email threads leads to procurement delays, lack of vendor accountability, unverified invoice overcharges, and poor SLA monitoring.",
    details: `Problem Overview:
Managing over 400 active logistics vendors using manual spreadsheets and email threads leads to procurement delays, lack of vendor accountability, unverified invoice overcharges, and poor SLA monitoring.

Detailed Description & Requirements:
GlobalLogix contracts with hundreds of third-party trucking and warehousing vendors across India. Vendor onboarding, performance evaluations, rate negotiations, and invoice approvals currently happen via decentralized emails and WhatsApp messages, resulting in zero centralized visibility and significant financial leakages.
We require a centralized B2B Vendor Management System (VMS) & Digital Procurement Portal.

Core Features:
1. Digital Vendor Onboarding & Compliance Tracker: Portal for vendors to submit tax registrations, insurance documents, vehicle fleets, and compliance certs with automated expiry tracking.
2. Automated Reverse Bidding / RFQ System: System to post shipping routes and allow pre-approved vendors to submit competitive bids in real time.
3. Performance Scorecard Matrix: Dynamic vendor scoring based on delay metrics, damage rates, pricing adherence, and customer rating.
4. Invoice Matching Engine: Automated three-way matching between Purchase Orders, Proof of Delivery (POD) uploads, and vendor invoices.`,
    date: "1 hour ago",
    category: "B2B Services",
    type: "Paid Project",
    author: {
      name: "Rajesh Varma",
      role: "VP Operations - GlobalLogix Supply Chain, Chennai",
    },
    image: b2b1.src,
    stats: { likes: 85, comments: 12, views: 760 }
  },
  {
    id: 12,
    title: "Enterprise B2B Facility Management & Maintenance Ticketing System",
    description: "Corporate clients managing large office complexes experience excessive facility downtime, missed preventive maintenance, and unorganized vendor service calls due to fragmented communication.",
    details: `Problem Overview:
Corporate clients managing large office complexes experience excessive facility downtime, missed preventive maintenance, and unorganized vendor service calls due to fragmented communication.

Detailed Description & Requirements:
Apex Facilities manages operational services (HVAC, electrical, plumbing, security, janitorial) for 30+ IT parks and commercial towers. Building managers report issues verbally or via messaging apps, leading to untracked SLAs, lost work orders, and tenant dissatisfaction.
We need an Integrated B2B Facility Management Platform.

Key Requirements:
1. QR Code Facility Ticketing: Employees/facility managers scan QR codes placed on office equipment or rooms to instantly log maintenance requests with photos.
2. Smart Work Order Assignment: Automated routing of work orders to technical personnel based on skill set, availability, and physical location within the facility building.
3. Scheduled Preventive Maintenance Planner: Calendar-driven maintenance scheduler that automatically dispatches recurring tasks and alerts team leads of overdue maintenance.
4. Executive Service Level Agreement (SLA) Analytics: SLA dashboards displaying real-time compliance metrics, average resolution times, and recurring equipment failure trends.`,
    date: "8 hours ago",
    category: "B2B Services",
    type: "Contract Project",
    author: {
      name: "Tanya Bhatia",
      role: "Head of Client Services - Apex Corporate Facilities, Gurugram",
    },
    image: b2b2.src,
    stats: { likes: 104, comments: 20, views: 890 }
  },
  {
    id: 13,
    title: "B2B Freight Matching & Load Optimization Platform",
    description: "Commercial truck fleets suffer from 35% empty return miles (deadheading) due to fragmented broker networks and inefficient freight matching between shippers and fleet owners.",
    details: `Problem Overview:
Commercial truck fleets suffer from 35% empty return miles (deadheading) due to fragmented broker networks and inefficient freight matching between shippers and fleet owners.

Detailed Description & Requirements:
FleetWise operates in the B2B freight sector. Truck operators frequently return empty after delivering cargo because they lack real-time visibility into return cargo loads from mid-sized manufacturing hubs along their route back.
We want to develop a B2B Freight Matching & Route Optimization Platform.

Main System Components:
1. Load-to-Truck Algorithmic Matching: Real-time matching algorithm connecting shipper load postings with empty fleet capacity based on truck capacity, cargo type, route, and timing window.
2. Route & Capacity Optimization: Smart suggestions for multi-stop pickup/drop-off routes to maximize truck space utilization.
3. Digital Proof of Delivery (e-POD) & Escalation System: Mobile app for truck drivers to record OTP verification, digital signatures, and cargo condition photos upon delivery.`,
    date: "1 day ago",
    category: "B2B Services",
    type: "Paid Project",
    author: {
      name: "Deepak Singhania",
      role: "Founder - FleetWise Transport, Ahmedabad",
    },
    stats: { likes: 140, comments: 32, views: 1150 }
  },
  {
    id: 14,
    title: "Multi-Cloud Infrastructure Cost Optimization & Security Dashboard",
    description: "SaaS engineering teams encounter massive cloud cost overruns and compliance blind spots due to unmonitored multi-cloud resource provisioning across AWS, Azure, and Google Cloud Platform.",
    details: `Problem Overview:
SaaS engineering teams encounter massive cloud cost overruns and compliance blind spots due to unmonitored multi-cloud resource provisioning across AWS, Azure, and Google Cloud Platform.

Detailed Description & Requirements:
CloudScale manages complex cloud environments across AWS, Azure, and GCP. Development teams routinely launch idle compute instances, unattached storage volumes, and misconfigured security groups. Without central visibility, monthly cloud expenditures continuously exceed budgets while security vulnerabilities remain undetected.
We need a centralized Multi-Cloud FinOps & Security Posture Management Platform.

Key Requirements:
1. Unified Cost Aggregation & Anomaly Detection: Single-pane-of-glass dashboard displaying daily cost trends grouped by team, environment, and cloud provider, with automated alerts on sudden cost spikes.
2. Automated Resource Rightsizing Recommendations: Engine analyzing CPU, memory, and I/O utilization patterns to suggest idle resource termination or instance downsizing.
3. Continuous Security & Compliance Auditing: Real-time scanning for open security groups, unencrypted databases, public S3 buckets, and non-compliance with ISO 27001 / SOC 2 standards.
4. One-Click Remediation Scripts: Capability for cloud engineers to execute automated cleanup scripts directly from the alert interface.`,
    date: "2 hours ago",
    category: "Technology",
    type: "Paid Project",
    author: {
      name: "Amitabh Sen",
      role: "CTO - CloudScale Systems, Bengaluru",
    },
    stats: { likes: 310, comments: 54, views: 2600 }
  },
  {
    id: 15,
    title: "Low-Code Internal Tool Builder for Engineering Teams",
    description: "Engineering teams waste 20-30% of sprint capacity building and maintaining custom internal admin portals, database GUIs, and support tools instead of delivering core product features.",
    details: `Problem Overview:
Engineering teams waste 20-30% of sprint capacity building and maintaining custom internal admin portals, database GUIs, and support tools instead of delivering core product features.

Detailed Description & Requirements:
DataPulse AI has dozens of internal microservices and SQL/NoSQL databases. Operations, customer support, and risk teams need custom user interfaces to interact with these databases and APIs. Developers spend excessive time building web forms, CRUD tables, and authorization systems for internal consumption.
We want to build a extensible Web-Based Low-Code Internal Tool Builder.

Core Functionality:
1. Drag-and-Drop Visual UI Canvas: Library of pre-built UI components (tables, forms, buttons, charts, search bars) that can be arranged visually.
2. Multi-Data Source Connectors: Native connectors for PostgreSQL, MongoDB, REST APIs, GraphQL, and Redis with custom JS/Python transformation capabilities.
3. Granular Role-Based Access Control (RBAC): Enterprise security allowing admins to define read/write permissions at the component and data query level.
4. Version Control & Audit Logging: Full audit trail of internal user actions and deployment versioning for created internal dashboards.`,
    date: "6 hours ago",
    category: "Technology",
    type: "Contract Project",
    author: {
      name: "Elena Rostova",
      role: "VP Product - DataPulse AI, Remote",
    },
    stats: { likes: 275, comments: 41, views: 1980 }
  },
  {
    id: 16,
    title: "Automated Software Supply Chain Vulnerability Scanner",
    description: "Software development pipelines suffer from exposure to third-party open-source dependency vulnerabilities and secrets accidentally committed into source code repositories.",
    details: `Problem Overview:
Software development pipelines suffer from exposure to third-party open-source dependency vulnerabilities and secrets accidentally committed into source code repositories.

Detailed Description & Requirements:
CyberShield builds enterprise software products. Development teams rely heavily on open-source packages (npm, PyPI, Maven). Currently, vulnerability checks occur manually before major release cycles, resulting in last-minute security fixes or unpatched vulnerabilities reaching production.
We need an Automated Continuous CI/CD Security & Dependency Scanner.

System Features:
1. Real-time Repository & Secrets Scanning: Continuous background scanning of Git commits to detect hardcoded API keys, passwords, and private certificates.
2. Software Bill of Materials (SBOM) & Dependency Analysis: Automatic generation of SBOM for every build, mapping open-source libraries against CVE vulnerability databases.
3. Automated Pull Request Patching: Automated bot that generates PRs to bump vulnerable dependencies to secure, stable versions without breaking builds.
4. Executive Risk & Compliance Matrix: Summary view for Security Chiefs displaying open vulnerabilities by severity tier (Critical, High, Medium, Low).`,
    date: "1 day ago",
    category: "Technology",
    type: "Paid Project",
    author: {
      name: "Karan Malhotra",
      role: "Lead DevOps - CyberShield Security, Delhi",
    },
    stats: { likes: 195, comments: 28, views: 1600 }
  },
  {
    id: 17,
    title: "Digital Brand Asset Management & Collaborative Review Platform",
    description: "Design teams and clients struggle with version confusion, chaotic feedback across email/chat tools, and delayed sign-offs on complex graphic, video, and UI/UX design deliverables.",
    details: `Problem Overview:
Design teams and clients struggle with version confusion, chaotic feedback across email/chat tools, and delayed sign-offs on complex graphic, video, and UI/UX design deliverables.

Detailed Description & Requirements:
CreativePulse handles design branding campaigns for multi-national brands. Managing thousands of high-resolution graphic files, video edits, and marketing assets across Google Drive, Figma, and email threads leads to misplaced files, client sign-off on outdated design revisions, and costly re-work.
We need a dedicated Digital Asset Management (DAM) & Design Collaboration Workbench.

Key System Features:
1. Visual Asset Library with Smart Tagging: Central repository supporting high-res vector graphics, 3D assets, and video files with auto-tagging using AI image recognition.
2. Frame-Accurate Video & Graphic Annotations: Contextual commenting tools where clients click directly on graphic coordinates or specific video timestamps to leave visual feedback.
3. Version Comparison & Approval Matrix: Side-by-side visual difference view for asset iterations and one-click formal approval workflow.
4. Expiration & Usage Rights Management: Automated alerts for media asset licensing rights and brand usage compliance.`,
    date: "3 hours ago",
    category: "Design",
    type: "Paid Project",
    author: {
      name: "Maya Lin",
      role: "Design Director - CreativePulse Agency, Mumbai",
    },
    stats: { likes: 156, comments: 22, views: 1340 }
  },
  {
    id: 18,
    title: "3D Architectural Portfolio & Interactive VR Showcase System",
    description: "Architectural clients find it difficult to visualize 2D blueprints and static 3D renderings, leading to frequent project scope revisions mid-construction and client dissatisfaction.",
    details: `Problem Overview:
Architectural clients find it difficult to visualize 2D blueprints and static 3D renderings, leading to frequent project scope revisions mid-construction and client dissatisfaction.

Detailed Description & Requirements:
StudioSpace designs premium residential and commercial spaces. Explaining architectural layouts using standard 2D drawings and static 3D renders fails to give clients a true spatial sense of scale, lighting, and interior material finishes, leading to mid-project construction alterations.
We want to develop an WebGL / VR-enabled Interactive Architectural Showcase Platform.

Required Features:
1. WebGL Interactive 3D Walkthrough: High-performance browser rendering of 3D architectural CAD models without requiring plugin downloads.
2. Real-time Material & Lighting Customization: Interface allowing clients to switch material options (flooring, lighting fixtures, wall finishes) in real time during client presentations.
3. VR Headset Compatibility: One-click WebXR mode to stream 360-degree immersive architectural tours directly to Meta Quest and desktop VR devices.
4. Annotation & Client Preferences Capture: Capability for clients to pin comments on specific architectural elements during virtual walkthroughs.`,
    date: "10 hours ago",
    category: "Design",
    type: "Paid Project",
    author: {
      name: "Siddharth Verma",
      role: "Founder - StudioSpace Architects, New Delhi",
    },
    stats: { likes: 210, comments: 39, views: 1700 }
  },
  {
    id: 19,
    title: "High-Throughput Genomic Sequence Analysis Pipeline Engine",
    description: "Bioinformatics researchers face severe computational bottlenecks processing multi-gigabyte Next-Generation Sequencing (NGS) raw genomic data using fragmented command-line scripts.",
    details: `Problem Overview:
Bioinformatics researchers face severe computational bottlenecks processing multi-gigabyte Next-Generation Sequencing (NGS) raw genomic data using fragmented command-line scripts.

Detailed Description & Requirements:
Our genomics laboratory sequences hundreds of DNA samples weekly for disease variant discovery. Raw FASTQ and BAM data files are massive (50GB+ per sample). Researchers execute bioinformatic pipelines manually via terminal scripts, leading to execution errors, lack of reproducibility, and long execution times.
We are seeking a Graphical Web-Based Genomic Pipeline Orchestration Engine.

Core Functionality:
1. Visual Drag-and-Drop Workflow Builder: Web UI allowing bioinformaticians to construct processing pipelines by connecting bioinformatic tools (FastQC, BWA, GATK, SAMtools).
2. Cloud High-Performance Compute (HPC) Execution: Automated cluster execution management scaling AWS EC2 / Azure Batch instances dynamically based on job queue load.
3. Variant Visualization & Annotation Viewer: Interactive browser tool to view genomic variant calls (VCF files), allele frequencies, and biological annotations.
4. Data Provenance & FAIR Compliance: Automated record-keeping of execution parameters, tool versions, and audit trails for scientific peer review.`,
    date: "1 hour ago",
    category: "Science",
    type: "Paid Project",
    author: {
      name: "Dr. Eleanor Vance",
      role: "Principal Investigator - Genomics Research Lab, Hyderabad",
    },
    stats: { likes: 134, comments: 18, views: 980 }
  },
  {
    id: 20,
    title: "Omnichannel Marketing Attribution & Campaign Analytics Platform",
    description: "E-commerce brands spend millions across Google, Meta, Influencers, and Email campaigns without knowing which specific marketing touchpoint actually drove customer conversion.",
    details: `Problem Overview:
E-commerce brands spend millions across Google, Meta, Influencers, and Email campaigns without knowing which specific marketing touchpoint actually drove customer conversion.

Detailed Description & Requirements:
RetailPulse operates large omnichannel retail campaigns. Current marketing analytics rely on basic last-click attribution models provided by ad networks, which over-credit their own ad channels. Marketing leaders cannot accurately evaluate multi-touch buyer journeys spanning social ads, search ads, email clicks, and direct visits.
We require an Enterprise Multi-Touch Attribution (MTA) & Marketing Mix Analytics Platform.

Core Platform Capabilities:
1. Multi-Touch Attribution Engine: Algorithmic attribution models (First-Touch, Last-Touch, Linear, Time-Decay, and Data-Driven ML Attribution) tracking cross-channel user journeys via cookieless server-side tracking.
2. Dynamic Ad Spend ROI Aggregator: Automated API integration pulling spend, impression, and click data from Meta Ads, Google Ads, TikTok Ads, and Email tools into a single unified financial dashboard.
3. Customer Acquisition Cost (CAC) vs Lifetime Value (LTV) Cohort Analysis: Visual cohort reports detailing customer payback periods grouped by acquisition source and campaign creative.
4. Budget Allocation Recommender: Predictive insights highlighting underperforming campaigns and recommending budget reallocations to maximize overall return on ad spend (ROAS).`,
    date: "2 hours ago",
    category: "Marketing",
    type: "Paid Project",
    author: {
      name: "Kavita Deshmukh",
      role: "CMO - RetailPulse Omnichannel, Mumbai",
    },
    stats: { likes: 188, comments: 29, views: 1450 }
  },
  {
    id: 21,
    title: "Hyper-Personalized AI Nutrition & Meal Planning Platform",
    description: "Fitness clients struggle to adhere to generic meal plans because traditional diet recommendations ignore local dietary preferences, allergies, busy schedules, and daily grocery availability.",
    details: `Problem Overview:
Fitness clients struggle to adhere to generic meal plans because traditional diet recommendations ignore local dietary preferences, allergies, busy schedules, and daily grocery availability.

Detailed Description & Requirements:
ZenFit provides wellness coaching to thousands of clients across major cities. Standard PDF nutrition charts fail because clients find them monotonous, culturally irrelevant, or difficult to prepare with locally available ingredients. Nutritionists spend excessive time writing manual weekly meal charts.
We want to develop an AI-powered Personalized Nutrition & Grocery Automation Application.

Key Features:
1. Dynamic AI Diet Generator: Algorithm creating customizable meal plans tailored to biometric data, health goals, dietary restrictions (vegan, keto, Jain, gluten-free), and regional culinary preferences.
2. Smart Grocery List Integration: Automated aggregation of weekly required ingredients with one-click ordering integration via quick-commerce delivery APIs (Zepto, Blinkit).
3. Macro Nutrients & Calorie Photo Tracker: Computer vision tool allowing users to take a photo of their meal to estimate calorie count and macro breakdown (protein, carbs, fats).
4. Dedicated Coach Consultation Dashboard: Client tracking panel enabling human nutritionists to audit, override, and comment on AI-generated meal schedules.`,
    date: "4 hours ago",
    category: "Lifestyle",
    type: "Paid Project",
    author: {
      name: "Samantha Reed",
      role: "Founder - ZenFit Personal Wellness, Bengaluru",
    },
    stats: { likes: 256, comments: 45, views: 2200 }
  }
];
