export interface AIJob {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  jobType: 'Internship' | 'Full-time' | 'Part-time' | 'Contract';
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  experience: string;
  salary?: string;
  datePosted: string;
  matchScore: number;
  matchReason?: string;
  description: string;
  requirements: string[];
  skills: string[];
  matchedSkills?: string[];
  missingSkills?: string[];
  applyUrl: string;
  sourcePlatform: string;
  isFeatured?: boolean;
  isVerified?: boolean;
}

export interface CareerRoadmapStage {
  stageNumber: number;
  title: string;
  description: string;
  skills: string[];
  freeResources: {
    title: string;
    url: string;
    type: 'Course' | 'Docs' | 'Video' | 'Practice';
  }[];
  projectIdea: string;
}

export interface CareerRoadmap {
  id: string;
  title: string;
  badge: string;
  icon: string;
  summary: string;
  avgSalaryFresher: string;
  growthOutlook: string;
  stages: CareerRoadmapStage[];
  certifications: string[];
  sampleInterviewQuestions: {
    question: string;
    answerSummary: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }[];
}

export interface ResumeMatchResult {
  overallScore: number;
  targetRole: string;
  summary: string;
  strengths: string[];
  improvementAreas: string[];
  matchingSkills: string[];
  missingSkills: string[];
  recommendedProjects: {
    title: string;
    description: string;
    techStack: string[];
  }[];
  actionableChecklist: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Technical' | 'Behavioral' | 'Problem Solving' | 'HR / Fresher';
  difficulty: 'Fresher / Intern' | 'Junior' | 'Moderate';
  sampleAnswer: string;
  keyConcepts: string[];
  pitfallsToAvoid: string;
}
