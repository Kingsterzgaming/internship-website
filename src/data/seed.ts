import { Career, Resource, Opportunity } from '../types.ts';

export const seedCareers: Career[] = [
  {
    id: 'career-1',
    title: 'Software Developer',
    slug: 'software-developer',
    category: 'Technology',
    description: 'Design, code, test, and maintain software applications, web platforms, and mobile apps that power modern digital experiences.',
    education: "Bachelor's degree in Computer Science, Information Technology, or equivalent practical bootcamps and certifications.",
    demand: 'Very High',
    skills: ['JavaScript / TypeScript', 'React / Next.js', 'Node.js & APIs', 'Data Structures & Algorithms', 'Git & CI/CD', 'SQL / PostgreSQL'],
    salaryGuide: 'Approx. ₹4.5L – ₹12L/yr (Entry Level to 3 yrs) · Illustrative industry benchmark',
    careerPath: [
      { stage: 'Entry Level', role: 'Junior Software Engineer / Intern', description: 'Write modular features, write unit tests, and review pull requests under senior mentorship.', timeline: '0–2 Years' },
      { stage: 'Mid Level', role: 'Full-Stack Developer / SDE II', description: 'Own microservices, architect database schemas, lead feature delivery, and optimize system speed.', timeline: '2–5 Years' },
      { stage: 'Senior Level', role: 'Senior Engineer / Tech Lead', description: 'Drive architectural decisions, mentor junior devs, interface with product teams, and ensure scalability.', timeline: '5–8 Years' },
      { stage: 'Leadership', role: 'Engineering Manager / Principal Architect', description: 'Lead multi-team engineering departments, direct technology roadmaps, and shape core company tech vision.', timeline: '8+ Years' }
    ]
  },
  {
    id: 'career-2',
    title: 'Data Analyst',
    slug: 'data-analyst',
    category: 'Technology',
    description: 'Transform raw datasets into actionable commercial and product insights using statistical tools, SQL, and data visualization dashboards.',
    education: "Degree in Statistics, Mathematics, Economics, Computer Science, or data analytics professional diplomas.",
    demand: 'High',
    skills: ['SQL & Querying', 'Python / R', 'Power BI & Tableau', 'Excel & Modeling', 'Data Cleaning', 'Statistical Analysis'],
    salaryGuide: 'Approx. ₹4.0L – ₹9.5L/yr (Entry Level to 3 yrs) · Illustrative industry benchmark',
    careerPath: [
      { stage: 'Entry Level', role: 'Junior Data Analyst', description: 'Extract queries, clean anomalies from transactional datasets, and build standard operational reports.', timeline: '0–2 Years' },
      { stage: 'Mid Level', role: 'Data Analyst / BI Specialist', description: 'Build interactive dashboards, model business metrics, and run A/B test experiments for growth teams.', timeline: '2–5 Years' },
      { stage: 'Senior Level', role: 'Senior Analytics Consultant', description: 'Design enterprise analytics data marts, lead complex predictive modeling, and advise executive stakeholders.', timeline: '5–8 Years' },
      { stage: 'Leadership', role: 'Head of Data & Business Intelligence', description: 'Oversee corporate data strategy, data governance pipelines, and enterprise machine learning initiatives.', timeline: '8+ Years' }
    ]
  },
  {
    id: 'career-3',
    title: 'UI/UX Designer',
    slug: 'ui-ux-designer',
    category: 'Design',
    description: 'Craft intuitive, engaging, and accessible digital user interfaces through user research, wireframing, interactive prototyping, and design systems.',
    education: "Degree or diploma in Interaction Design, Human-Computer Interaction (HCI), Graphic Design, or self-directed portfolio.",
    demand: 'High',
    skills: ['Figma & Prototyping', 'User Research & Personas', 'Wireframing & Information Architecture', 'Design Systems & Tokens', 'Usability Testing', 'HTML/CSS Basics'],
    salaryGuide: 'Approx. ₹3.8L – ₹10L/yr (Entry Level to 3 yrs) · Illustrative industry benchmark',
    careerPath: [
      { stage: 'Entry Level', role: 'Associate UI/UX Designer', description: 'Support component creation in Figma, document design tokens, and assist with usability interviews.', timeline: '0–2 Years' },
      { stage: 'Mid Level', role: 'Product Designer', description: 'Own end-to-end design flows, build interactive prototypes, and collaborate directly with engineers.', timeline: '2–5 Years' },
      { stage: 'Senior Level', role: 'Lead Product Designer', description: 'Establish design guidelines, spearhead user research initiatives, and shape product strategy.', timeline: '5–8 Years' },
      { stage: 'Leadership', role: 'VP of Design / Design Director', description: 'Champion design culture across products, manage design managers, and align brand vision.', timeline: '8+ Years' }
    ]
  },
  {
    id: 'career-4',
    title: 'Financial Analyst',
    slug: 'financial-analyst',
    category: 'Finance',
    description: 'Examine market trends, financial statements, and investment opportunities to guide corporate capital allocation and wealth management.',
    education: "Bachelor's in Commerce, Finance, Economics, or professional tracks like CFA / CA foundation.",
    demand: 'High',
    skills: ['Financial Modeling', 'DCF & Valuation', 'Corporate Accounting', 'Excel & VBA', 'Risk Assessment', 'Market Research'],
    salaryGuide: 'Approx. ₹5.0L – ₹11L/yr (Entry Level to 3 yrs) · Illustrative industry benchmark',
    careerPath: [
      { stage: 'Entry Level', role: 'Junior Financial Analyst', description: 'Audit balance sheets, prepare quarterly variance memos, and update valuation models.', timeline: '0–2 Years' },
      { stage: 'Mid Level', role: 'Investment / Financial Analyst', description: 'Lead valuation analyses for acquisitions, forecast revenue streams, and present investment cases.', timeline: '2–5 Years' },
      { stage: 'Senior Level', role: 'Senior Financial Manager / Associate', description: 'Manage corporate treasury, oversee debt/equity structuring, and direct budgeting cycles.', timeline: '5–8 Years' },
      { stage: 'Leadership', role: 'Chief Financial Officer (CFO) / VP Finance', description: 'Direct total corporate fiscal governance, investor relations, and capital strategy.', timeline: '8+ Years' }
    ]
  },
  {
    id: 'career-5',
    title: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    category: 'Technology',
    description: 'Protect organizational networks, cloud infrastructure, and sensitive consumer data against malicious cyber intrusions and vulnerability exploits.',
    education: "Bachelor's in Cybersecurity, Computer Networks, IT, or industry certs (CompTIA Security+, CEH, CISSP).",
    demand: 'Very High',
    skills: ['Network Security & Firewalls', 'SIEM & Threat Monitoring', 'Penetration Testing', 'Incident Response', 'Vulnerability Assessment', 'Cloud Security (AWS/Azure)'],
    salaryGuide: 'Approx. ₹5.2L – ₹12.5L/yr (Entry Level to 3 yrs) · Illustrative industry benchmark',
    careerPath: [
      { stage: 'Entry Level', role: 'SOC Analyst Tier 1', description: 'Triage security alert feeds, analyze phishing reports, and isolate anomalous network traffic.', timeline: '0–2 Years' },
      { stage: 'Mid Level', role: 'Information Security Specialist', description: 'Conduct penetration audits, implement endpoint security policies, and remediate zero-days.', timeline: '2–5 Years' },
      { stage: 'Senior Level', role: 'Senior Security Architect', description: 'Architect zero-trust security postures, conduct threat hunting, and ensure regulatory compliance.', timeline: '5–8 Years' },
      { stage: 'Leadership', role: 'Chief Information Security Officer (CISO)', description: 'Set enterprise cyber defense doctrine, manage multi-million defense budgets, and handle board risk.', timeline: '8+ Years' }
    ]
  },
  {
    id: 'career-6',
    title: 'Digital Marketer',
    slug: 'digital-marketer',
    category: 'Marketing',
    description: 'Grow brand awareness and customer acquisition through search engine optimization, paid performance campaigns, social media, and email marketing.',
    education: "Degree in Marketing, Communications, Business Administration, or Google / Meta certified digital tracks.",
    demand: 'Moderate',
    skills: ['Search Engine Optimization (SEO)', 'Google & Meta Ads (SEM)', 'Content Strategy & Copywriting', 'Web Analytics (GA4)', 'Email Marketing Automation', 'Conversion Rate Optimization'],
    salaryGuide: 'Approx. ₹3.5L – ₹8.0L/yr (Entry Level to 3 yrs) · Illustrative industry benchmark',
    careerPath: [
      { stage: 'Entry Level', role: 'Digital Marketing Associate', description: 'Execute organic social postings, research keyword clusters, and draft newsletter campaigns.', timeline: '0–2 Years' },
      { stage: 'Mid Level', role: 'Performance Marketer / SEO Lead', description: 'Manage paid media ad budgets, optimize conversion funnels, and scale inbound traffic channels.', timeline: '2–5 Years' },
      { stage: 'Senior Level', role: 'Growth Marketing Manager', description: 'Develop omni-channel acquisition strategies, lead marketing operations, and drive CAC/LTV metrics.', timeline: '5–8 Years' },
      { stage: 'Leadership', role: 'Chief Marketing Officer (CMO)', description: 'Steer global brand positioning, corporate narrative, and strategic marketing budget allocation.', timeline: '8+ Years' }
    ]
  },
  {
    id: 'career-7',
    title: 'Graphic Designer',
    slug: 'graphic-designer',
    category: 'Design',
    description: 'Create visual concepts, branding identities, editorial layouts, and packaging that communicate corporate values across print and digital media.',
    education: "Degree or diploma in Visual Arts, Graphic Design, Fine Arts, or an accomplished creative portfolio.",
    demand: 'Moderate',
    skills: ['Adobe Photoshop & Illustrator', 'Typography & Color Theory', 'Brand Identity Design', 'InDesign & Editorial Layout', 'Motion Graphics (After Effects)', 'Print Production Basics'],
    salaryGuide: 'Approx. ₹3.2L – ₹7.5L/yr (Entry Level to 3 yrs) · Illustrative industry benchmark',
    careerPath: [
      { stage: 'Entry Level', role: 'Junior Graphic Designer', description: 'Produce marketing collaterals, resize visual assets, and assist in brand guideline execution.', timeline: '0–2 Years' },
      { stage: 'Mid Level', role: 'Visual & Brand Designer', description: 'Create comprehensive visual identities, design packaging, and create bespoke brand assets.', timeline: '2–5 Years' },
      { stage: 'Senior Level', role: 'Senior Visual Designer / Art Lead', description: 'Lead campaign visual aesthetics, art-direct photoshoots, and establish creative benchmarks.', timeline: '5–8 Years' },
      { stage: 'Leadership', role: 'Creative Director', description: 'Direct multidisciplinary creative teams, establish creative agency vision, and pitch to marquee clients.', timeline: '8+ Years' }
    ]
  },
  {
    id: 'career-8',
    title: 'Biomedical Professional',
    slug: 'biomedical-professional',
    category: 'Healthcare',
    description: 'Bridge medical science and engineering to develop medical equipment, therapeutic devices, diagnostic instruments, and healthcare software solutions.',
    education: "Degree in Biomedical Engineering, Biotechnology, Medical Laboratory Sciences, or Biophysics.",
    demand: 'Growing',
    skills: ['Medical Device Regulations (ISO 13485)', 'Biomechanics & Biomaterials', 'Clinical Instrumentation', 'Laboratory Protocols', 'Signal Processing Basics', 'Data Documentation'],
    salaryGuide: 'Approx. ₹4.2L – ₹9.0L/yr (Entry Level to 3 yrs) · Illustrative industry benchmark',
    careerPath: [
      { stage: 'Entry Level', role: 'Biomedical Technician / Associate', description: 'Calibrate hospital diagnostics, monitor equipment compliance, and conduct lab testing.', timeline: '0–2 Years' },
      { stage: 'Mid Level', role: 'Biomedical R&D Engineer', description: 'Prototype therapeutic diagnostic devices, assist in clinical trials, and file patent docs.', timeline: '2–5 Years' },
      { stage: 'Senior Level', role: 'Senior Clinical Systems Specialist', description: 'Oversee hospital biomedical operations, manage regulatory submissions, and guide clinical QA.', timeline: '5–8 Years' },
      { stage: 'Leadership', role: 'Director of Healthcare Technologies', description: 'Oversee enterprise medical technology adoption, strategic healthcare partnerships, and regulatory roadmaps.', timeline: '8+ Years' }
    ]
  }
];

export const seedResources: Resource[] = [
  {
    id: 'res-1',
    title: 'How to Build Your First Resume',
    category: 'Job Preparation',
    readTime: '5 min read',
    description: 'A step-by-step blueprint for students and recent grads to write an impactful, applicant-tracking-system (ATS) friendly resume with zero fluff.',
    content: `Crafting your very first resume can feel daunting when you do not yet have extensive corporate work experience. The key secret is to emphasize your academic projects, internships, leadership roles in college clubs, and technical proficiencies.

### 1. The Modern Single-Page Format
Keep your resume strictly to one page. Use clean headings: Summary, Education, Skills, Key Projects, and Extracurricular Experience. Use an ATS-friendly layout with readable typography (10-12pt body font) and clear date ranges.

### 2. Focus on Project Impact
Instead of merely writing "Built an e-commerce website", quantify your accomplishment: "Built a responsive e-commerce web application using React and Tailwind, decreasing page load times by 35% and supporting 200+ simulated checkout orders."

### 3. Highlight Relevant Skills First
Organize skills into logical buckets (e.g. Programming Languages, Frameworks, Tools, Soft Skills). Only list technologies you can confidently discuss in a technical screen.

### 4. Eliminate Common Traps
Avoid generic buzzwords like "hard-working team player." Never include your photo, date of birth, or full home address unless legally required in your target market.`
  },
  {
    id: 'res-2',
    title: 'Preparing for Your First Interview',
    category: 'Interview Skills',
    readTime: '6 min read',
    description: 'Actionable techniques to overcome interview nervousness, answer behavioral questions with the STAR framework, and impress hiring managers.',
    content: `Interviewing is a learnable skill. Even the most seasoned professionals get nervous before important interviews. Preparation transforms anxiety into calm confidence.

### 1. Research the Company Thoroughly
Spend at least 30 minutes reading the company's product pages, recent news, mission statement, and LinkedIn updates. Prepare an authentic answer to: "Why do you want to join our specific team?"

### 2. Master the STAR Method
For situational questions ("Tell me about a time you solved a tough problem"), structure your answer using:
* **Situation:** Set the context in 1–2 concise sentences.
* **Task:** Clearly explain what objective you needed to achieve.
* **Action:** Detail the specific steps you personally took.
* **Result:** Highlight the measurable outcome or lesson learned.

### 3. Ask Intelligent Questions at the End
Never say "I don't have any questions." Ask: "What does success look like in the first 90 days for this role?" or "What are the most challenging problems the team is currently tackling?"`
  },
  {
    id: 'res-3',
    title: 'How to Find an Internship',
    category: 'Internships',
    readTime: '7 min read',
    description: 'Strategic methods to discover high-value internship opportunities through direct outreach, career portals, open-source work, and networking.',
    content: `Finding an internship requires a proactive approach beyond casually submitting 100 blind applications on job boards.

### 1. Diversify Your Search Channels
* **Direct Startup Outreach:** Identify 20 fast-growing startups in your sector. Reach out to founders or team leads on LinkedIn with a customized, concise note.
* **Campus Placement Drives:** Attend all scheduled workshops, resume clinics, and campus recruitment panels.
* **Hackathons & Competitions:** Participating in public hackathons is one of the highest-yield ways to catch the attention of hiring sponsors.

### 2. The Cold Email That Actually Works
Keep your outreach under 150 words:
1. Greet them by name and mention specific work of theirs you admire.
2. Introduce yourself and your top 2 relevant skills.
3. Share a link to a live project or portfolio item solving a problem relevant to their team.
4. Request a brief 10-minute chat or internship consideration.`
  },
  {
    id: 'res-4',
    title: 'Choosing a Career After Class 12',
    category: 'Career Planning',
    readTime: '6 min read',
    description: 'A structured evaluation framework for high school graduates to align natural curiosity, market demand, and academic choices.',
    content: `Finishing secondary school often brings intense pressure from family and peers to pick a lifelong path immediately. However, modern careers are dynamic and multi-disciplinary.

### 1. The Ikigai Matrix for Students
Evaluate your options against four pillars:
1. What do you naturally enjoy learning about in your free time?
2. What are your foundational strengths (analytical, creative, communicative)?
3. What disciplines have expanding industry demand over the next 10 years?
4. What fields offer viable long-term compensation?

### 2. Traditional vs. Emerging Degrees
Do not assume that traditional degrees are the only path. Data science, interaction design, digital media, and cybersecurity offer immense opportunities that did not exist a decade ago.

### 3. Build Transferable Competencies
Regardless of the major you select, commit to developing digital literacy, written communication, basic financial knowledge, and problem-solving.`
  },
  {
    id: 'res-5',
    title: 'Essential Skills for College Students',
    category: 'Skills Development',
    readTime: '5 min read',
    description: 'The top 5 technical and interpersonal superpowers that distinguish average students from standout graduates.',
    content: `Academic marks get you into the consideration pool, but practical capabilities land the job and foster long-term career growth.

### 1. Clear Written and Verbal Communication
Being able to summarize complex thoughts into bullet points, write crisp emails, and present ideas without rambling is the single most valuable soft skill.

### 2. Digital Fluency & Tool Mastery
Become proficient in modern productivity tools: Git, spreadsheets, collaborative docs, Figma, and prompt engineering with AI tools.

### 3. Project Management & Personal Time Boxing
Learn to break down semester projects into weekly sprints. Tools like Trello or Notion help you stay organized and demonstrate accountability.

### 4. Networking with Empathy
Build friendships with peers, professors, and alumni. Professional networking is not transactional; it is about building mutual trust over time.`
  },
  {
    id: 'res-6',
    title: 'How to Build a Strong Portfolio',
    category: 'Portfolio',
    readTime: '6 min read',
    description: 'How to showcase proof of work with case studies, clean live demos, and GitHub repositories that recruiters actually review.',
    content: `In design, software engineering, and digital marketing, a portfolio speaks louder than a resume. Recruiters want to see proof of work.

### 1. Quality Over Quantity
Three polished, deeply documented projects are vastly superior to ten shallow tutorial clones. Show projects that solve authentic problems.

### 2. Write Compelling Case Studies
For every portfolio entry, include:
* The core problem being addressed
* Your role and constraints
* The design or technical decisions made
* The final outcome, metrics, and what you would improve next time

### 3. Make Everything Clickable
Ensure your website works seamlessly on mobile devices. Provide working live demo links alongside your source code or visual artifacts.`
  },
  {
    id: 'res-7',
    title: 'Setting Your Career Goals',
    category: 'Career Planning',
    readTime: '5 min read',
    description: 'Use the SMART framework and reverse-engineering techniques to turn vague ambitions into actionable quarterly milestones.',
    content: `Ambition without structure often leads to burnout and drift. Setting clear career milestones gives your daily studying purpose.

### 1. Reverse Engineer Your Dream Role
Look up 5 professionals on LinkedIn who hold the exact job you want in 5 years. Inspect their journey: What was their first job? What certifications or skills did they accumulate?

### 2. Apply SMART Criteria
* **Specific:** "Learn React and build 2 full-stack web apps" rather than "Learn coding".
* **Measurable:** Track completed hours and GitHub commits weekly.
* **Achievable:** Don't attempt to master five disparate fields simultaneously.
* **Relevant:** Focus on skills in high demand.
* **Time-bound:** Set an explicit target date for each milestone.

### 3. Conduct Quarterly Reviews
Every three months, review what worked and adjust course. Agility is essential as industry requirements change.`
  },
  {
    id: 'res-8',
    title: 'Building a Professional Online Profile',
    category: 'Personal Branding',
    readTime: '6 min read',
    description: 'How to optimize your LinkedIn, GitHub, or Behance profile to attract inbound internship leads and industry mentors.',
    content: `Recruiters proactively search LinkedIn and GitHub for entry-level candidates every single day. If your profile is complete, opportunities come to you.

### 1. An Inviting Headline and Photo
Never leave your headline as just "Student at XYZ College". Change it to: "Aspiring Full-Stack Developer | React, Node.js & TypeScript Enthusiast | Computer Science Undergrad". Use a clear, well-lit headshot with a friendly expression.

### 2. The 'About' Section Story
Write a 3-paragraph summary in first-person: What sparked your passion, what projects you are actively building, and what type of internship or collaborative role you are seeking.

### 3. Share Your Learning in Public
Post brief updates whenever you complete a course, finish a hackathon, or write a technical blog post. Consistent public learning signals initiative and passion.`
  },
  {
    id: 'res-9',
    title: 'Improving Communication Skills',
    category: 'Soft Skills',
    readTime: '5 min read',
    description: 'Practical drills for active listening, concise articulation, and confident teamwork in professional environments.',
    content: `Technical capability gets you hired, but communication capability decides how far you rise within any organization.

### 1. Active Listening
In team meetings, resist the urge to formulate your reply while the other person is still speaking. Take notes, summarize back what you heard ("If I understand correctly, our main priority for this sprint is..."), and confirm alignment.

### 2. The BLUF Principle (Bottom Line Up Front)
When writing messages to managers or senior teammates, place the main conclusion or question in the very first sentence, followed by supporting context. Busy colleagues appreciate brevity.

### 3. Constructive Feedback
Learn to separate ideas from personal ego. When critiquing code or design, focus on how the solution serves user needs rather than pointing fingers.`
  },
  {
    id: 'res-10',
    title: 'Preparing for Your First Job',
    category: 'Workplace Success',
    readTime: '6 min read',
    description: 'Navigating the first 90 days at your first full-time job: setting expectations, asking questions, and creating early momentum.',
    content: `Transitioning from college life to full-time corporate employment requires adjusting to new rhythms and professional accountability.

### 1. The First 30 Days: Observe and Absorb
Take exhaustive notes during onboarding. Understand how decisions are made, how code or reports are approved, and who key subject matter experts are across the company.

### 2. Ask Thoughtful Questions
Never hesitate to ask questions, but avoid asking before doing basic research. Formulate queries like: "I checked the documentation and tried X, but encountered Y error. Could you guide me on the recommended path?"

### 3. Under-Promise and Over-Deliver
When given a deadline, account for unexpected roadblocks. Delivering reliable, high-quality work on time builds an unshakeable reputation in your team.`
  }
];

export const seedOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Web Development Intern',
    company: 'TechNova Innovations',
    location: 'Bengaluru, India',
    type: 'Internship',
    workMode: 'Hybrid',
    salary: '₹18,000 / month (Illustrative Demo Stipend)',
    description: 'Join our customer dashboard team to build reusable React components, integrate REST APIs, and write clean unit tests using modern TypeScript.',
    deadline: 'Rolling Applications'
  },
  {
    id: 'opp-2',
    title: 'Data Analyst Intern',
    company: 'FinMatrix Analytics',
    location: 'Mumbai, India',
    type: 'Internship',
    workMode: 'Remote',
    salary: '₹15,000 / month (Illustrative Demo Stipend)',
    description: 'Assist our quantitative team in querying transaction records, building automated weekly Power BI reports, and cleaning tabular data.',
    deadline: 'April 15, 2026'
  },
  {
    id: 'opp-3',
    title: 'UI/UX Design Intern',
    company: 'PixelCraft Studio',
    location: 'Pune, India',
    type: 'Internship',
    workMode: 'Remote',
    salary: '₹16,000 / month (Illustrative Demo Stipend)',
    description: 'Work with senior product designers to build Figma design systems, conduct customer journey mapping, and create interactive clickable prototypes.',
    deadline: 'April 30, 2026'
  },
  {
    id: 'opp-4',
    title: 'Digital Marketing Intern',
    company: 'GrowthPulse Media',
    location: 'New Delhi, India',
    type: 'Internship',
    workMode: 'On-site',
    salary: '₹12,000 / month (Illustrative Demo Stipend)',
    description: 'Plan and execute social media campaigns, assist in organic SEO keyword audits, draft weekly email newsletters, and track GA4 conversion rates.',
    deadline: 'May 10, 2026'
  },
  {
    id: 'opp-5',
    title: 'Junior Software Developer',
    company: 'CloudScale Systems',
    location: 'Hyderabad, India',
    type: 'Full-time',
    workMode: 'Hybrid',
    salary: '₹5,50,000 / year (Illustrative Demo Salary)',
    description: 'Entry-level full-time opening for fresh graduates. Develop backend microservices in Node.js/PostgreSQL and collaborate with frontend engineers.',
    deadline: 'May 31, 2026'
  },
  {
    id: 'opp-6',
    title: 'Graphic Design Intern',
    company: 'Apex Creative Labs',
    location: 'Chennai, India',
    type: 'Internship',
    workMode: 'Remote',
    salary: '₹14,000 / month (Illustrative Demo Stipend)',
    description: 'Create eye-catching marketing banners, typography layouts, and brand identity assets using Adobe Photoshop, Illustrator, and After Effects.',
    deadline: 'Rolling Applications'
  },
  {
    id: 'opp-7',
    title: 'Finance Intern',
    company: 'Beacon Capital Partners',
    location: 'Gurugram, India',
    type: 'Internship',
    workMode: 'On-site',
    salary: '₹20,000 / month (Illustrative Demo Stipend)',
    description: 'Analyze financial statements, track portfolio market data, conduct competitor valuation benchmarks, and assist in investor pitch deck prep.',
    deadline: 'April 20, 2026'
  },
  {
    id: 'opp-8',
    title: 'Content Writing Intern',
    company: 'ScribeSphere Media',
    location: 'Kolkata, India',
    type: 'Internship',
    workMode: 'Remote',
    salary: '₹12,500 / month (Illustrative Demo Stipend)',
    description: 'Write educational blog articles, career advice guides, and industry news summaries with a strong focus on reader engagement and clarity.',
    deadline: 'May 05, 2026'
  },
  {
    id: 'opp-9',
    title: 'Business Analyst Intern',
    company: 'Vanguard Advisory Group',
    location: 'Noida, India',
    type: 'Internship',
    workMode: 'Hybrid',
    salary: '₹17,000 / month (Illustrative Demo Stipend)',
    description: 'Document software requirements, bridge communications between non-technical business teams and engineering squads, and create workflow diagrams.',
    deadline: 'Rolling Applications'
  },
  {
    id: 'opp-10',
    title: 'Cybersecurity Intern',
    company: 'ShieldNet Cyber Solutions',
    location: 'Bengaluru, India',
    type: 'Internship',
    workMode: 'On-site',
    salary: '₹22,000 / month (Illustrative Demo Stipend)',
    description: 'Support SOC incident response operations, scan web applications for OWASP Top 10 vulnerabilities, and test network security configurations.',
    deadline: 'April 25, 2026'
  }
];
