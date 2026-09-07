import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  ExternalLink, 
  DollarSign, 
  TrendingUp, 
  Award, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Laptop, 
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CareerRoadmap } from '../types.ts';

const roadmaps: CareerRoadmap[] = [
  {
    id: 'frontend',
    title: 'Frontend Web Developer',
    badge: 'High Demand',
    icon: 'code',
    summary: 'Build responsive, fast, and accessible user interfaces for web applications using modern JavaScript frameworks.',
    avgSalaryFresher: '₹5.5L - ₹9.5L / yr ($65k - $85k)',
    growthOutlook: '+22% YoY (Rapidly growing)',
    stages: [
      {
        stageNumber: 1,
        title: 'Foundations: Web Core',
        description: 'Master HTML5 semantic elements, CSS3 modern flexbox & grid layouts, and JavaScript (ES6+) basics.',
        skills: ['HTML5', 'CSS3 / Tailwind', 'JavaScript ES6+', 'DOM Manipulation', 'Git & GitHub'],
        freeResources: [
          { title: 'MDN Web Docs - JavaScript Guide', url: 'https://developer.mozilla.org', type: 'Docs' },
          { title: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org', type: 'Course' },
          { title: 'JavaScript.info Complete Guide', url: 'https://javascript.info', type: 'Course' }
        ],
        projectIdea: 'Interactive Task & Expense Dashboard with local storage persistence and clean responsive layout.'
      },
      {
        stageNumber: 2,
        title: 'Modern Frameworks: React & TypeScript',
        description: 'Understand declarative component architecture, state management (hooks), component lifecycles, and strict TypeScript types.',
        skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'React Router', 'Fetch / Axios APIs'],
        freeResources: [
          { title: 'Official React Documentation', url: 'https://react.dev', type: 'Docs' },
          { title: 'Total TypeScript Beginner Tutorials', url: 'https://www.totaltypescript.com', type: 'Course' }
        ],
        projectIdea: 'E-commerce Catalog with live category filtering, cart state management, and mock payment flow.'
      },
      {
        stageNumber: 3,
        title: 'Production Engineering & Next.js',
        description: 'Explore Server-Side Rendering (SSR), API route proxies, performance optimization, and Core Web Vitals.',
        skills: ['Next.js / Vite', 'REST & GraphQL', 'Zustand / TanStack Query', 'Unit Testing with Vitest'],
        freeResources: [
          { title: 'Next.js Learn Interactive Course', url: 'https://nextjs.org/learn', type: 'Course' },
          { title: 'Web.dev Fast Load Times & SEO', url: 'https://web.dev', type: 'Practice' }
        ],
        projectIdea: 'Full-fledged Collaborative Notes Workspace with instant search, markdown previews, and light/dark theme.'
      }
    ],
    certifications: [
      'Meta Front-End Developer Professional Certificate (Coursera)',
      'freeCodeCamp JavaScript Algorithms and Data Structures'
    ],
    sampleInterviewQuestions: [
      {
        question: 'What is the difference between state and props in React?',
        answerSummary: 'Props are read-only inputs passed from a parent component down to child components. State is internal data managed within the component that triggers re-renders when updated.',
        difficulty: 'Easy'
      },
      {
        question: 'How do you prevent unnecessary re-renders in React?',
        answerSummary: 'Use React.memo for pure functional components, useMemo for expensive calculations, useCallback to memoize function references, and hoist state only as high as necessary.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Software Engineer',
    badge: 'Core Tech',
    icon: 'server',
    summary: 'Design scalable server architectures, build RESTful and GraphQL APIs, manage databases, and safeguard security.',
    avgSalaryFresher: '₹6L - ₹11L / yr ($70k - $95k)',
    growthOutlook: '+20% YoY (Strong sustained hiring)',
    stages: [
      {
        stageNumber: 1,
        title: 'Language Mastery & Core Protocols',
        description: 'Deep dive into Python (FastAPI/Django) or Node.js (Express) along with HTTP status codes, headers, and async processing.',
        skills: ['Python / Node.js', 'HTTP/HTTPS Protocols', 'RESTful API Design', 'JSON & Authentication Basics'],
        freeResources: [
          { title: 'FastAPI Official Interactive Tutorial', url: 'https://fastapi.tiangolo.com', type: 'Docs' },
          { title: 'The Odin Project NodeJS Path', url: 'https://www.theodinproject.com', type: 'Course' }
        ],
        projectIdea: 'REST API for a Book Review Service with CRUD endpoints, request validation, and API rate limiting.'
      },
      {
        stageNumber: 2,
        title: 'Databases & Data Modeling',
        description: 'Master relational databases (PostgreSQL) with normalization, indexing, joins, plus document stores (MongoDB/Redis).',
        skills: ['PostgreSQL', 'SQL Indexing', 'Prisma / Drizzle ORM', 'Redis Caching', 'JWT & OAuth2'],
        freeResources: [
          { title: 'SQLBolt - Learn SQL Interactively', url: 'https://sqlbolt.com', type: 'Practice' },
          { title: 'PostgreSQL Tutorial Official Community', url: 'https://www.postgresqltutorial.com', type: 'Docs' }
        ],
        projectIdea: 'Multi-tenant User Authentication & Role-Based Access Control (RBAC) service with refresh tokens.'
      },
      {
        stageNumber: 3,
        title: 'Containerization & Cloud Deployments',
        description: 'Package apps with Docker, write GitHub Actions CI/CD workflows, and deploy onto Cloud Run or AWS ECS.',
        skills: ['Docker', 'CI/CD Pipelines', 'Linux Shell', 'Message Queues (RabbitMQ/Kafka basics)', 'Cloud Run / AWS EC2'],
        freeResources: [
          { title: 'Docker for Beginners Tutorial', url: 'https://docs.docker.com/get-started', type: 'Docs' },
          { title: 'GitHub Actions Continuous Integration', url: 'https://docs.github.com/en/actions', type: 'Docs' }
        ],
        projectIdea: 'Asynchronous Job Processing Queue that compresses images uploaded by users in the background.'
      }
    ],
    certifications: [
      'AWS Certified Cloud Practitioner',
      'IBM Back-End Development Professional Certificate'
    ],
    sampleInterviewQuestions: [
      {
        question: 'What are ACID properties in database transactions?',
        answerSummary: 'Atomicity (all or nothing), Consistency (preserves schema constraints), Isolation (concurrent transactions do not interfere), and Durability (committed changes persist even after crash).',
        difficulty: 'Medium'
      },
      {
        question: 'How do you mitigate SQL injection attacks?',
        answerSummary: 'Always use parameterized queries and prepared statements via an ORM or database driver, validate user inputs, and avoid concatenating raw strings into SQL queries.',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning Engineer',
    badge: 'Trending Frontier',
    icon: 'sparkles',
    summary: 'Develop machine learning models, fine-tune open weights, and build intelligent LLM-powered applications.',
    avgSalaryFresher: '₹7.5L - ₹14L / yr ($80k - $110k)',
    growthOutlook: '+35% YoY (Highest tech growth rate)',
    stages: [
      {
        stageNumber: 1,
        title: 'Math Foundations & Python Data Stack',
        description: 'Linear algebra, probability, calculus fundamentals alongside Python libraries (NumPy, Pandas, Matplotlib).',
        skills: ['Python', 'NumPy', 'Pandas', 'Linear Algebra', 'Data Cleaning & EDA'],
        freeResources: [
          { title: '3Blue1Brown Essence of Linear Algebra', url: 'https://www.3blue1brown.com', type: 'Video' },
          { title: 'Kaggle Python & Pandas Micro-Courses', url: 'https://www.kaggle.com/learn', type: 'Course' }
        ],
        projectIdea: 'Exploratory Data Analysis on real-world housing or customer churn datasets with visual trend charts.'
      },
      {
        stageNumber: 2,
        title: 'Classical ML & Deep Learning',
        description: 'Implement regression, decision trees, random forests using Scikit-Learn, and neural networks with PyTorch.',
        skills: ['Scikit-Learn', 'PyTorch', 'Model Evaluation (F1, ROC-AUC)', 'Feature Engineering', 'HuggingFace'],
        freeResources: [
          { title: 'DeepLearning.AI Machine Learning Specialization', url: 'https://www.deeplearning.ai', type: 'Course' },
          { title: 'PyTorch 60-Minute Blitz Guide', url: 'https://pytorch.org/tutorials', type: 'Docs' }
        ],
        projectIdea: 'Image Classification web app that detects defective industrial components or handwritten symbols.'
      },
      {
        stageNumber: 3,
        title: 'Generative AI & LLM Systems',
        description: 'Prompt engineering, Retrieval-Augmented Generation (RAG), vector databases (Chroma/Pinecone), and agentic workflows.',
        skills: ['Gemini / OpenAI APIs', 'LangChain / LlamaIndex', 'Vector Databases', 'RAG Pipelines', 'Model Serving'],
        freeResources: [
          { title: 'Google AI Studio & Gemini Documentation', url: 'https://ai.google.dev', type: 'Docs' },
          { title: 'HuggingFace NLP Course', url: 'https://huggingface.co/learn', type: 'Course' }
        ],
        projectIdea: 'Document Question-Answering Chatbot with semantic document search and grounded citations.'
      }
    ],
    certifications: [
      'Google Cloud Professional Machine Learning Engineer',
      'DeepLearning.AI Deep Learning Specialization'
    ],
    sampleInterviewQuestions: [
      {
        question: 'What is the difference between overfitting and underfitting, and how do you fix them?',
        answerSummary: 'Overfitting occurs when a model learns training noise and fails to generalize (fixed with regularization, dropout, more data). Underfitting occurs when the model is too simple to capture patterns (fixed with more complex architectures or better features).',
        difficulty: 'Easy'
      },
      {
        question: 'How does Retrieval-Augmented Generation (RAG) work?',
        answerSummary: 'RAG retrieves relevant external text chunks from a vector database using embeddings, and passes those chunks into the prompt context of an LLM so it answers with accurate, private, and up-to-date facts.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst & BI Specialist',
    badge: 'High Placement Rate',
    icon: 'bar-chart',
    summary: 'Transform raw business data into actionable dashboards, executive insights, and automated metric reports.',
    avgSalaryFresher: '₹5L - ₹8.5L / yr ($60k - $80k)',
    growthOutlook: '+18% YoY (Universal demand across sectors)',
    stages: [
      {
        stageNumber: 1,
        title: 'Spreadsheets & Relational SQL',
        description: 'Advanced Excel formulas (XLOOKUP, PivotTables) and robust SQL querying (Joins, Window Functions, Group By).',
        skills: ['Advanced Excel', 'SQL (PostgreSQL/MySQL)', 'Data Cleansing', 'Statistical Thinking'],
        freeResources: [
          { title: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial', type: 'Practice' },
          { title: 'Excel Easy Advanced Modeling', url: 'https://www.excel-easy.com', type: 'Course' }
        ],
        projectIdea: 'Retail Sales Performance SQL audit uncovering underperforming geographic regions and top customer cohorts.'
      },
      {
        stageNumber: 2,
        title: 'Business Intelligence & Dashboards',
        description: 'Build interactive dashboards and visualizations with PowerBI, Tableau, or Metabase.',
        skills: ['PowerBI / Tableau', 'DAX Formulas', 'Dashboard UX', 'Storytelling with Data', 'KPI Tracking'],
        freeResources: [
          { title: 'Microsoft Learn PowerBI Data Analyst Path', url: 'https://learn.microsoft.com', type: 'Course' },
          { title: 'Storytelling with Data Free Guides', url: 'https://www.storytellingwithdata.com', type: 'Docs' }
        ],
        projectIdea: 'Executive SaaS Metrics Dashboard monitoring Monthly Recurring Revenue (MRR), Churn Rate, and LTV.'
      },
      {
        stageNumber: 3,
        title: 'Python Analytics & Experimentation',
        description: 'Automate repetitive workflows, run hypothesis tests, and perform A/B test statistical significance checks.',
        skills: ['Python Pandas', 'Seaborn', 'A/B Testing', 'Hypothesis Testing', 'Data Storytelling'],
        freeResources: [
          { title: 'Google Data Analytics Professional Certificate', url: 'https://grow.google/certificates', type: 'Course' }
        ],
        projectIdea: 'A/B Testing Analysis notebook determining whether a new landing page checkout design statistically increased signups.'
      }
    ],
    certifications: [
      'Google Data Analytics Professional Certificate',
      'Microsoft Certified: Power BI Data Analyst Associate'
    ],
    sampleInterviewQuestions: [
      {
        question: 'Explain the difference between WHERE and HAVING clauses in SQL.',
        answerSummary: 'WHERE filters rows before any groupings or aggregate functions are calculated. HAVING filters the results after the GROUP BY aggregation has taken place.',
        difficulty: 'Easy'
      },
      {
        question: 'What is a p-value in an A/B test?',
        answerSummary: 'The p-value is the probability of obtaining test results at least as extreme as the observed results, assuming that the null hypothesis (no real effect) is true. If p < 0.05, we reject the null hypothesis.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Product Designer',
    badge: 'Creative & Tech',
    icon: 'palette',
    summary: 'Craft intuitive, user-centric mobile and web experiences, user flows, wireframes, and scalable design systems.',
    avgSalaryFresher: '₹5L - ₹9L / yr ($65k - $85k)',
    growthOutlook: '+16% YoY (Valued for digital conversion)',
    stages: [
      {
        stageNumber: 1,
        title: 'Design Principles & Figma Fluency',
        description: 'Color theory, typography hierarchy, negative space, visual balance, and Figma component fundamentals.',
        skills: ['Figma Mastery', 'Color & Typography', 'Auto-layout & Variants', 'Wireframing', 'Heuristic Evaluation'],
        freeResources: [
          { title: 'Figma Community Official Crash Course', url: 'https://www.figma.com/resource-library', type: 'Course' },
          { title: 'Refactoring UI Book & Tips', url: 'https://www.refactoringui.com', type: 'Docs' }
        ],
        projectIdea: 'Redesign an existing confusing mobile app flow (e.g. public transport booking) with improved clarity.'
      },
      {
        stageNumber: 2,
        title: 'User Research & Prototyping',
        description: 'Conduct user interviews, map customer journeys, create high-fidelity interactive prototypes with micro-animations.',
        skills: ['User Interviews', 'Persona Creation', 'Interactive Prototyping', 'Usability Testing', 'Design Tokens'],
        freeResources: [
          { title: 'Nielsen Norman Group UX Articles', url: 'https://www.nngroup.com', type: 'Docs' },
          { title: 'Interaction Design Foundation Guides', url: 'https://www.interaction-design.org', type: 'Course' }
        ],
        projectIdea: 'Comprehensive 0-to-1 mobile banking application case study with end-to-end user research validation.'
      },
      {
        stageNumber: 3,
        title: 'Design Systems & Developer Handoff',
        description: 'Structure design systems with tokens, WCAG AA accessibility compliance, and developer documentation.',
        skills: ['Design Systems', 'WCAG Accessibility', 'Figma Variables', 'Design Handoff', 'Portfolio Presentation'],
        freeResources: [
          { title: 'Google UX Design Professional Certificate', url: 'https://grow.google/uxdesign', type: 'Course' }
        ],
        projectIdea: 'Reusable, documented design system comprising 30+ accessible components with light and dark mode tokens.'
      }
    ],
    certifications: [
      'Google UX Design Professional Certificate',
      'Interaction Design Foundation (IxDF) Certification'
    ],
    sampleInterviewQuestions: [
      {
        question: 'Walk me through your design process when starting a new project from scratch.',
        answerSummary: 'I follow the Double Diamond framework: Discover (user research, competitor audit), Define (problem statement, personas), Develop (wireframing, rapid prototyping), and Deliver (usability testing, refinement, dev handoff).',
        difficulty: 'Easy'
      },
      {
        question: 'How do you handle disagreement with a software engineer who says a design is too difficult to implement?',
        answerSummary: 'I approach it with curiosity and collaboration: understand the technical constraint, evaluate which elements are critical to user success versus nice-to-haves, and co-create an MVP compromise that preserves usability without inflating build complexity.',
        difficulty: 'Medium'
      }
    ]
  }
];

export const CareerRoadmapsView: React.FC = () => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>('frontend');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [completedStages, setCompletedStages] = useState<Record<string, number[]>>({});

  const currentRoadmap = roadmaps.find(r => r.id === selectedRoadmapId) || roadmaps[0];

  const toggleQuestion = (idx: number) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [`${currentRoadmap.id}-${idx}`]: !prev[`${currentRoadmap.id}-${idx}`]
    }));
  };

  const toggleStageComplete = (stageNum: number) => {
    setCompletedStages(prev => {
      const currentList = prev[currentRoadmap.id] || [];
      const updated = currentList.includes(stageNum)
        ? currentList.filter(n => n !== stageNum)
        : [...currentList, stageNum];
      return { ...prev, [currentRoadmap.id]: updated };
    });
  };

  const finishedCount = (completedStages[currentRoadmap.id] || []).length;
  const progressPercent = Math.round((finishedCount / currentRoadmap.stages.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* View Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-2xs">
          <Compass className="w-3.5 h-3.5" />
          <span>Verified Tech Career Paths for Freshers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Step-by-Step Career Roadmaps
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Unsure where to start? Explore beginner-friendly milestone guides designed specifically for college students and freshers. Each path includes verified free resources, portfolio project blueprints, and interview questions.
        </p>
      </div>

      {/* Roadmap Selector Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {roadmaps.map((rm) => (
          <motion.button
            key={rm.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedRoadmapId(rm.id)}
            className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
              selectedRoadmapId === rm.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/20'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{rm.title}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              selectedRoadmapId === rm.id
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {rm.badge}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Selected Roadmap Overview Card with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRoadmap.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6"
        >
          {/* Header section with summary and salaries */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Career Blueprint
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {currentRoadmap.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {currentRoadmap.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentRoadmap.summary}
              </p>

              {/* Interactive Roadmap Tracker */}
              <div className="pt-2 flex items-center gap-3">
                <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                  <motion.div 
                    className="h-full bg-indigo-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-600">
                  {finishedCount} of {currentRoadmap.stages.length} Stages Completed ({progressPercent}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 shrink-0">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <DollarSign className="w-4 h-4" />
                  <span>Entry Salary Range</span>
                </div>
                <p className="text-sm sm:text-base font-black text-emerald-950">
                  {currentRoadmap.avgSalaryFresher}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-800">
                  <TrendingUp className="w-4 h-4" />
                  <span>Industry Demand</span>
                </div>
                <p className="text-sm sm:text-base font-black text-indigo-950">
                  {currentRoadmap.growthOutlook}
                </p>
              </div>
            </div>
          </div>

          {/* Learning Stages / Stepper */}
          <div className="space-y-6 pt-2">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>3-Stage Mastery Roadmap</span>
            </h3>

            <div className="space-y-6">
              {currentRoadmap.stages.map((stage) => {
                const isCompleted = (completedStages[currentRoadmap.id] || []).includes(stage.stageNumber);

                return (
                  <div 
                    key={stage.stageNumber}
                    className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200 space-y-4"
                  >
                    {/* Stepper Node with completion check */}
                    <button
                      type="button"
                      onClick={() => toggleStageComplete(stage.stageNumber)}
                      title={isCompleted ? "Mark incomplete" : "Mark stage completed"}
                      className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center border-4 border-white shadow-xs transition-colors cursor-pointer ${
                        isCompleted ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stage.stageNumber}
                    </button>

                    <motion.div 
                      whileHover={{ y: -2 }}
                      className={`rounded-2xl border p-5 sm:p-6 space-y-4 transition-all ${
                        isCompleted
                          ? 'bg-emerald-50/30 border-emerald-200'
                          : 'bg-slate-50/70 border-slate-200/80 hover:border-indigo-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                            <span>Stage {stage.stageNumber}: {stage.title}</span>
                            {isCompleted && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                                Completed
                              </span>
                            )}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleStageComplete(stage.stageNumber)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 self-start sm:self-center ${
                            isCompleted
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {isCompleted ? '✓ Completed' : 'Mark Done'}
                        </button>
                      </div>

                      {/* Skills to Learn */}
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Target Skills:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {stage.skills.map((skill, sIdx) => (
                            <span 
                              key={sIdx}
                              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Recommendation */}
                      <div className="p-3.5 rounded-xl bg-white border border-indigo-100 flex items-start gap-3 shadow-2xs">
                        <Laptop className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                            Recommended Portfolio Project:
                          </span>
                          <p className="text-xs text-slate-700 mt-0.5 leading-relaxed font-medium">
                            {stage.projectIdea}
                          </p>
                        </div>
                      </div>

                      {/* Free High-Quality Resources */}
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Free Learning Materials:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
                          {stage.freeResources.map((res, rIdx) => (
                            <motion.a
                              key={rIdx}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-white hover:bg-indigo-50/60 border border-slate-200 hover:border-indigo-200 transition-colors flex items-center justify-between text-xs text-slate-700 font-medium group shadow-2xs"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                <span className="truncate font-semibold">{res.title}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 shrink-0 font-bold uppercase">
                                {res.type}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certifications & Interview Prep */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Certifications */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Recommended Industry Certifications</span>
              </h4>
              <ul className="space-y-2">
                {currentRoadmap.certifications.map((cert, cIdx) => (
                  <li 
                    key={cIdx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Interview Questions */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Common Fresher Interview Questions</span>
              </h4>
              <div className="space-y-2">
                {currentRoadmap.sampleInterviewQuestions.map((item, qIdx) => {
                  const isOpen = !!expandedQuestions[`${currentRoadmap.id}-${qIdx}`];
                  return (
                    <div 
                      key={qIdx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
                    >
                      <button
                        type="button"
                        onClick={() => toggleQuestion(qIdx)}
                        className="w-full p-3 text-left text-xs font-bold text-slate-800 flex items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-600 font-black">Q{qIdx + 1}:</span>
                          <span>{item.question}</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                              <span className="font-semibold text-slate-900">Key Answer: </span>
                              {item.answerSummary}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CareerRoadmapsView;
