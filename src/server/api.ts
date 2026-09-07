import express, { Request, Response } from 'express';
import { searchAIJobs, analyzeResume, generateInterviewPrep } from './geminiService.ts';

export const apiRouter = express.Router();

// Search & match AI jobs
apiRouter.post('/ai-jobs', async (req: Request, res: Response) => {
  try {
    const { query, location, jobType, experience, workMode, datePosted } = req.body || {};
    const jobs = await searchAIJobs({
      query,
      location,
      jobType,
      experience,
      workMode,
      datePosted
    });
    res.json({ success: true, jobs });
  } catch (error: any) {
    console.error('Error handling /api/ai-jobs:', error);
    res.status(500).json({ success: false, error: error?.message || 'Failed to search jobs' });
  }
});

// Resume review and skill gap analysis
apiRouter.post('/analyze-resume', async (req: Request, res: Response) => {
  try {
    const { resumeText, targetRole } = req.body || {};
    if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
      return res.status(400).json({ success: false, error: 'Resume text is required.' });
    }
    const result = await analyzeResume({ resumeText, targetRole });
    res.json({ success: true, result });
  } catch (error: any) {
    console.error('Error handling /api/analyze-resume:', error);
    res.status(500).json({ success: false, error: error?.message || 'Failed to analyze resume' });
  }
});

// Interview preparation questions
apiRouter.post('/interview-prep', async (req: Request, res: Response) => {
  try {
    const { role = 'Frontend Developer Intern', category = 'All' } = req.body || {};
    const questions = await generateInterviewPrep({ role, category });
    res.json({ success: true, questions });
  } catch (error: any) {
    console.error('Error handling /api/interview-prep:', error);
    res.status(500).json({ success: false, error: error?.message || 'Failed to generate questions' });
  }
});

export default apiRouter;
