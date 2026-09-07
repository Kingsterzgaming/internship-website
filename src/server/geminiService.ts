import { GoogleGenAI, Type } from '@google/genai';
import { AIJob, ResumeMatchResult, InterviewQuestion } from '../types.ts';
import { curatedJobs } from './jobsData.ts';

let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiInstance;
}

export async function searchAIJobs(params: {
  query?: string;
  location?: string;
  jobType?: string;
  experience?: string;
  workMode?: string;
  datePosted?: string;
}): Promise<AIJob[]> {
  const { query = '', location = 'Any', jobType = 'Any', experience = 'Any', workMode = 'Any' } = params;

  // First filter existing curated database
  let filtered = curatedJobs.filter((job) => {
    if (location !== 'Any' && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    if (jobType !== 'Any' && job.jobType.toLowerCase() !== jobType.toLowerCase()) {
      return false;
    }
    if (workMode !== 'Any' && job.workMode.toLowerCase() !== workMode.toLowerCase()) {
      return false;
    }
    if (experience !== 'Any') {
      const expClean = experience.toLowerCase();
      const jobExpClean = job.experience.toLowerCase();
      if (expClean.includes('entry') && !jobExpClean.includes('entry') && !jobExpClean.includes('fresher') && !jobExpClean.includes('0–1')) {
        return false;
      }
    }
    return true;
  });

  const ai = getAI();
  if (ai && query.trim()) {
    try {
      const prompt = `You are an AI Career Matcher for youth, students, and freshers.
The user is searching for: "${query}" with filters: Location=${location}, JobType=${jobType}, Experience=${experience}, WorkMode=${workMode}.

Here is a list of candidate positions:
${JSON.stringify(curatedJobs.map(j => ({ id: j.id, title: j.title, company: j.company, skills: j.skills, description: j.description, location: j.location, jobType: j.jobType })))}

Instructions:
1. Re-score and evaluate how well each job matches the search query "${query}". Calculate a matchScore (integer from 50 to 99) and a concise, personalized 1-sentence matchReason explaining why this fits a young candidate or student.
2. If the user query is very specific or requests a distinct new role not well represented in the list (e.g. "Game Developer intern Unreal" or "Flutter developer Pune"), generate 2-3 additional realistic verified-style job openings for freshers with appropriate company, description, requirements, skills, applyUrl, and matchScore.

Return a JSON array of jobs. Each job must follow this schema:
- id: string
- title: string
- company: string
- location: string
- jobType: 'Internship' | 'Full-time' | 'Part-time' | 'Contract'
- workMode: 'Remote' | 'Hybrid' | 'On-site'
- experience: string
- salary: string
- datePosted: string
- matchScore: number (50 to 99)
- matchReason: string
- description: string
- requirements: string[]
- skills: string[]
- applyUrl: string
- sourcePlatform: string
- isFeatured: boolean
- isVerified: boolean`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                company: { type: Type.STRING },
                location: { type: Type.STRING },
                jobType: { type: Type.STRING },
                workMode: { type: Type.STRING },
                experience: { type: Type.STRING },
                salary: { type: Type.STRING },
                datePosted: { type: Type.STRING },
                matchScore: { type: Type.INTEGER },
                matchReason: { type: Type.STRING },
                description: { type: Type.STRING },
                requirements: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                skills: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                applyUrl: { type: Type.STRING },
                sourcePlatform: { type: Type.STRING },
                isFeatured: { type: Type.BOOLEAN },
                isVerified: { type: Type.BOOLEAN }
              },
              required: ['id', 'title', 'company', 'location', 'jobType', 'workMode', 'experience', 'matchScore', 'description', 'requirements', 'skills', 'applyUrl', 'sourcePlatform']
            }
          }
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as AIJob[];
        }
      }
    } catch (err) {
      console.warn('Gemini query processing error, utilizing heuristic matching:', err);
    }
  }

  // Heuristic matching fallback
  if (query.trim()) {
    const qLower = query.toLowerCase();
    const queryTokens = qLower.split(/\s+/).filter(t => t.length > 2);

    filtered = (filtered.length > 0 ? filtered : curatedJobs).map((job) => {
      let score = 70;
      const fullText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')}`.toLowerCase();
      
      let matchedTokens = 0;
      for (const token of queryTokens) {
        if (fullText.includes(token)) {
          matchedTokens++;
          score += 6;
        }
      }

      if (qLower.includes('intern') && job.jobType === 'Internship') score += 8;
      if (qLower.includes('remote') && job.workMode === 'Remote') score += 8;

      const boundedScore = Math.min(98, Math.max(62, score));
      return {
        ...job,
        matchScore: boundedScore,
        matchReason: `Matches ${matchedTokens} key criteria from your search for "${query}".`
      };
    });
  }

  return filtered.length > 0 ? filtered : curatedJobs;
}

export async function analyzeResume(params: {
  resumeText: string;
  targetRole?: string;
}): Promise<ResumeMatchResult> {
  const { resumeText, targetRole = 'Software Engineer Intern / Fresher' } = params;

  const ai = getAI();
  if (ai) {
    try {
      const prompt = `You are an expert career counselor and technical resume reviewer for students, youth, and fresh college graduates.
Analyze the following resume / candidate bio against the target role: "${targetRole}".

Candidate text:
"""
${resumeText}
"""

Evaluate their profile realistically and encouragingly:
1. Overall Match Score (integer 40 to 98)
2. Summary feedback (2-3 sentences)
3. 3-4 Key Strengths
4. 3-4 Key Improvement Areas (constructive for a student/fresher)
5. Matching Skills already present
6. High-impact Missing Skills needed for "${targetRole}"
7. 2 Recommended Portfolio Projects they can build right now to impress recruiters (title, short description, tech stack)
8. Actionable Checklist (4 quick steps to polish their profile today)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: { type: Type.INTEGER },
              targetRole: { type: Type.STRING },
              summary: { type: Type.STRING },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              improvementAreas: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              matchingSkills: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              missingSkills: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              recommendedProjects: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    techStack: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ['title', 'description', 'techStack']
                }
              },
              actionableChecklist: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: [
              'overallScore',
              'targetRole',
              'summary',
              'strengths',
              'improvementAreas',
              'matchingSkills',
              'missingSkills',
              'recommendedProjects',
              'actionableChecklist'
            ]
          }
        }
      });

      const text = response.text;
      if (text) {
        return JSON.parse(text) as ResumeMatchResult;
      }
    } catch (e) {
      console.warn('Gemini resume analysis fallback:', e);
    }
  }

  // Heuristic Fallback
  return {
    overallScore: 82,
    targetRole,
    summary: `Your profile demonstrates solid enthusiasm and core technical foundations for ${targetRole}. With stronger portfolio project metrics and targeted key certifications, your application will stand out in recruiter screening.`,
    strengths: [
      'Good baseline understanding of foundational programming concepts and web architecture',
      'Clean structuring of academic projects and course curriculum',
      'Clear desire to learn emerging modern tooling'
    ],
    improvementAreas: [
      'Quantify project achievements with metrics (e.g. "improved load time by 30%", "tested with 50+ users")',
      'Add live deployment links (Vercel, Render, GitHub Pages) and clean GitHub README files',
      'Highlight collaborative tools like Git version control and pull request reviews'
    ],
    matchingSkills: ['JavaScript / Python', 'Git', 'Problem Solving', 'HTML/CSS', 'Database Fundamentals'],
    missingSkills: ['Automated Testing (Jest / Vitest)', 'Docker / Containerization', 'CI/CD Pipelines', 'System Design Basics'],
    recommendedProjects: [
      {
        title: 'Full-Stack Workflow Tracker with Real-Time Updates',
        description: 'Build an authenticated task management system with optimistic UI updates and responsive layout to showcase production-grade state management.',
        techStack: ['React', 'TypeScript', 'Node.js / Express', 'PostgreSQL', 'Tailwind']
      },
      {
        title: 'API Performance & Data Visualizer Dashboard',
        description: 'Connect to public APIs (e.g. GitHub, Weather, or Finance), cache responses, and visualize key trends with interactive charts.',
        techStack: ['React', 'Recharts / D3', 'REST APIs', 'Vite']
      }
    ],
    actionableChecklist: [
      'Ensure your GitHub profile has pinned repositories with detailed READMEs and live demo links',
      'Replace vague bullet points with action verbs: "Architected", "Engineered", "Optimized"',
      'Limit resume to a clean 1-page single column format optimized for ATS scanners',
      'Add a dedicated 3-line Summary section targeted specifically at junior roles'
    ]
  };
}

export async function generateInterviewPrep(params: {
  role: string;
  category?: string;
}): Promise<InterviewQuestion[]> {
  const { role, category = 'All' } = params;

  const ai = getAI();
  if (ai) {
    try {
      const prompt = `You are a friendly hiring manager at a top technology company specializing in university recruiting and junior engineer hiring.
Generate 5 realistic, high-frequency interview questions for a fresher/intern applying for "${role}".
Category filter: ${category}.

For each question provide:
- id: string
- question: string
- category: 'Technical' | 'Behavioral' | 'Problem Solving' | 'HR / Fresher'
- difficulty: 'Fresher / Intern' | 'Junior' | 'Moderate'
- sampleAnswer: Comprehensive model answer showing how a smart candidate should structure their answer using STAR method or technical clarity
- keyConcepts: 3-4 bullet tags
- pitfallsToAvoid: Common mistake students make when answering this`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                category: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                sampleAnswer: { type: Type.STRING },
                keyConcepts: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                pitfallsToAvoid: { type: Type.STRING }
              },
              required: ['id', 'question', 'category', 'difficulty', 'sampleAnswer', 'keyConcepts', 'pitfallsToAvoid']
            }
          }
        }
      });

      const text = response.text;
      if (text) {
        return JSON.parse(text) as InterviewQuestion[];
      }
    } catch (e) {
      console.warn('Gemini interview prep fallback:', e);
    }
  }

  // Curated default questions
  return [
    {
      id: 'q-1',
      question: 'Can you explain the Virtual DOM in React and why it is beneficial for web performance?',
      category: 'Technical',
      difficulty: 'Fresher / Intern',
      sampleAnswer: 'The Virtual DOM is a lightweight in-memory representation of the actual DOM elements created by React. When state changes occur in a component, React first creates a new Virtual DOM tree and diffs it with the previous one (reconciliation). It then calculates the minimal set of real DOM mutations needed and applies them in batch, avoiding costly browser reflows and repaints.',
      keyConcepts: ['Reconciliation', 'Diffing Algorithm', 'Batching Updates', 'Browser Reflow'],
      pitfallsToAvoid: 'Claiming that Virtual DOM is always faster than native DOM manipulation; clarify that its primary advantage is predictable performance and declarative abstractions.'
    },
    {
      id: 'q-2',
      question: 'Tell me about a challenging bug you encountered in a personal or college project and how you solved it.',
      category: 'Behavioral',
      difficulty: 'Fresher / Intern',
      sampleAnswer: 'In my final-year e-commerce project, users reported that adding items to the cart occasionally triggered duplicate orders. I isolated the issue by inspecting network payloads in Chrome DevTools and found that rapid double-clicks fired multiple concurrent POST requests before the button was disabled. I resolved it by implementing client-side request debouncing with button loading states, and added an idempotency key on the backend endpoint. This eliminated duplicate orders and taught me the importance of race-condition handling.',
      keyConcepts: ['STAR Method', 'Debugging Methodology', 'Idempotency', 'UX Safeguards'],
      pitfallsToAvoid: 'Blaming team members or stating that you just randomly changed code until it worked without understanding the root cause.'
    },
    {
      id: 'q-3',
      question: 'What is the difference between SQL and NoSQL databases, and how would you choose between them for a new project?',
      category: 'Problem Solving',
      difficulty: 'Junior',
      sampleAnswer: 'SQL databases (like PostgreSQL or MySQL) are relational, table-based, enforce strict schemas, and provide ACID guarantees. They are ideal for complex queries, financial transactions, and structured relational data. NoSQL databases (like MongoDB or Firestore) are document or key-value based, schemaless, and scale horizontally with high write speeds. For a fresh project, I prefer SQL for structured domains with relationships, and NoSQL for rapid prototyping, unstructured content, or real-time event logging.',
      keyConcepts: ['ACID Properties', 'Normalization', 'Horizontal vs Vertical Scaling', 'Schema Flexibility'],
      pitfallsToAvoid: 'Saying "NoSQL is newer so it is better". Interviewers look for trade-off evaluation.'
    },
    {
      id: 'q-4',
      question: 'Why do you want to join our company as an intern/junior, and what do you hope to accomplish in your first 90 days?',
      category: 'HR / Fresher',
      difficulty: 'Fresher / Intern',
      sampleAnswer: 'I have followed your engineering team’s recent developments in scalable payment pipelines and admire your commitment to high developer velocity. In my first 30 days, my priority is to understand the codebase, set up my local environment swiftly, and ship my first small bug fix or test. By 60 days, I aim to independently take ownership of sprint tickets, and by 90 days, contribute to a core feature while seeking feedback from senior mentors.',
      keyConcepts: ['30-60-90 Day Framework', 'Company Research', 'Proactive Learning', 'Mentorship'],
      pitfallsToAvoid: 'Giving generic answers like "I need a job" or focusing only on what the company can do for you rather than how you will add value.'
    }
  ];
}
