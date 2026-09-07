import React, { useState, useEffect } from 'react';
import Navbar, { NavTab } from './components/Navbar.tsx';
import AIJobFinderView from './views/AIJobFinderView.tsx';
import CareerRoadmapsView from './views/CareerRoadmapsView.tsx';
import ResumeMatcherView from './views/ResumeMatcherView.tsx';
import InterviewPrepView from './views/InterviewPrepView.tsx';
import SavedJobsDrawer from './components/SavedJobsDrawer.tsx';
import JobDetailsModal from './components/JobDetailsModal.tsx';
import { AIJob } from './types.ts';
import { Compass, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('jobs');
  const [savedJobs, setSavedJobs] = useState<AIJob[]>(() => {
    try {
      const stored = localStorage.getItem('careerlaunch_saved_jobs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [modalJob, setModalJob] = useState<AIJob | null>(null);

  // Sync saved jobs with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('careerlaunch_saved_jobs', JSON.stringify(savedJobs));
    } catch (err) {
      console.warn('Could not save bookmarks to localStorage', err);
    }
  }, [savedJobs]);

  const handleToggleSaveJob = (job: AIJob) => {
    setSavedJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) {
        return prev.filter((j) => j.id !== job.id);
      } else {
        return [...prev, job];
      }
    });
  };

  const handleRemoveSavedJob = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const savedJobIds = savedJobs.map((j) => j.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        savedCount={savedJobs.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
      />

      {/* Main View Body */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {activeTab === 'jobs' && (
              <AIJobFinderView
                savedJobIds={savedJobIds}
                onToggleSaveJob={handleToggleSaveJob}
              />
            )}

            {activeTab === 'roadmaps' && (
              <CareerRoadmapsView />
            )}

            {activeTab === 'resume' && (
              <ResumeMatcherView />
            )}

            {activeTab === 'interview' && (
              <InterviewPrepView />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Saved Jobs Slideover Drawer */}
      <SavedJobsDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedJobs={savedJobs}
        onRemoveJob={handleRemoveSavedJob}
        onSelectJob={(job) => {
          setModalJob(job);
        }}
      />

      {/* Standalone Job Details Modal for drawer item inspection */}
      <JobDetailsModal
        job={modalJob}
        isOpen={!!modalJob}
        onClose={() => setModalJob(null)}
        isSaved={modalJob ? savedJobIds.includes(modalJob.id) : false}
        onToggleSave={handleToggleSaveJob}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-base font-black text-slate-900">CareerLaunch</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  AI Career Guide
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                Empowering students, freshers, and early-career jobseekers with verified tech internships, step-by-step career roadmaps, and intelligent match scoring.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Career Tracks
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><button onClick={() => setActiveTab('roadmaps')} className="hover:text-indigo-600 cursor-pointer">Frontend Development</button></li>
                <li><button onClick={() => setActiveTab('roadmaps')} className="hover:text-indigo-600 cursor-pointer">Backend Engineering</button></li>
                <li><button onClick={() => setActiveTab('roadmaps')} className="hover:text-indigo-600 cursor-pointer">AI & Machine Learning</button></li>
                <li><button onClick={() => setActiveTab('roadmaps')} className="hover:text-indigo-600 cursor-pointer">Data Analytics & BI</button></li>
                <li><button onClick={() => setActiveTab('roadmaps')} className="hover:text-indigo-600 cursor-pointer">UI/UX Product Design</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Preparation Tools
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li><button onClick={() => setActiveTab('jobs')} className="hover:text-indigo-600 cursor-pointer">Internship Search</button></li>
                <li><button onClick={() => setActiveTab('resume')} className="hover:text-indigo-600 cursor-pointer">Resume Fit Analyzer</button></li>
                <li><button onClick={() => setActiveTab('interview')} className="hover:text-indigo-600 cursor-pointer">Interview Question Bank</button></li>
                <li><button onClick={() => setSavedDrawerOpen(true)} className="hover:text-indigo-600 cursor-pointer">Bookmarked Positions</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>All job links route to official corporate career portals and open industry feeds.</span>
            </div>
            <div>
              <span>Youth Career Guide & Opportunities</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
