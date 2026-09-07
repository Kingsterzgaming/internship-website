import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIJob } from '../types.ts';
import AIJobCard from '../components/AIJobCard.tsx';
import JobDetailsModal from '../components/JobDetailsModal.tsx';

interface AIJobFinderViewProps {
  savedJobIds: string[];
  onToggleSaveJob: (job: AIJob) => void;
}

export const AIJobFinderView: React.FC<AIJobFinderViewProps> = ({
  savedJobIds,
  onToggleSaveJob
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('India');
  const [jobType, setJobType] = useState('Any');
  const [experience, setExperience] = useState('Entry Level');
  const [workMode, setWorkMode] = useState('Any');
  const [datePosted, setDatePosted] = useState('Any');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'best_match' | 'recent'>('best_match');

  const [jobs, setJobs] = useState<AIJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedJob, setSelectedJob] = useState<AIJob | null>(null);

  // Suggested prompt chips for students & freshers
  const exampleQueries = [
    'Frontend developer internships for freshers in India',
    'Remote Junior Python developer',
    'UI/UX design intern Figma',
    'Junior Data Analyst entry level SQL',
    'Cybersecurity entry level analyst'
  ];

  const handleSearch = async (overrideQuery?: string) => {
    const q = overrideQuery !== undefined ? overrideQuery : query;
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setLoadingStep(1);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 600);

    try {
      const response = await fetch('/api/ai-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          location,
          jobType,
          experience,
          workMode,
          datePosted
        })
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error("We couldn't complete the search. Please try again in a moment.");
      }

      const json = await response.json();
      if (json.success && Array.isArray(json.jobs)) {
        setJobs(json.jobs);
      } else {
        throw new Error(json.error || 'Failed to retrieve jobs');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error occurred while matching jobs.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  // Initial load with default recommendations
  useEffect(() => {
    handleSearch('Frontend developer internships for freshers in India');
  }, []);

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === 'best_match') {
      return (b.matchScore || 0) - (a.matchScore || 0);
    }
    return 0; // Default order
  });

  const activeSearchQuery = query || 'Tech internships freshers';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* 1. PROFESSIONAL HERO BANNER WITH AMBIENT ANIMATION */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-slate-800">
        {/* Animated ambient floating gradient orbs */}
        <motion.div 
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -15, 0],
            scale: [1, 1.08, 1] 
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            x: [0, -25, 0], 
            y: [0, 20, 0],
            scale: [1, 1.15, 1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" 
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30 shadow-2xs backdrop-blur-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Verified Early Career Portals & Match Engine</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white"
          >
            Launch Your Tech Career With Verified Opportunities
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal"
          >
            Discover verified internships, traineeships, and entry-level positions tailored for university students and fresh graduates. Receive real-time AI match scores and customized outreach templates.
          </motion.p>
        </div>
      </div>

      {/* 2. SEARCH & FILTER INTERFACE */}
      <motion.div 
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-sm space-y-5"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="space-y-4"
        >
          {/* Main Input Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Job title, keywords, or skills (e.g. Frontend developer internships for freshers in India)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60 text-slate-900 transition-all font-medium placeholder:text-slate-400"
              />
            </div>
            
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                showFilters 
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-2xs' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              <motion.div
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm rounded-2xl shadow-sm shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find Jobs</span>
            </motion.button>
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-400 mr-1">Trending Searches:</span>
            {exampleQueries.map((example, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => {
                  setQuery(example);
                  handleSearch(example);
                }}
                className="text-xs px-3 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-600 transition-colors border border-slate-200/60 cursor-pointer font-medium"
              >
                {example}
              </motion.button>
            ))}
          </div>

          {/* Animated Expandable Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Location
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                    >
                      <option value="Any">Any Location</option>
                      <option value="India">India (All Hubs)</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Pune">Pune</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Remote">Remote</option>
                      <option value="Global">Global</option>
                    </select>
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Job Type
                    </label>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                    >
                      <option value="Any">Any Type</option>
                      <option value="Internship">Internship</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Experience Level
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                    >
                      <option value="Any">Any Experience</option>
                      <option value="Entry Level">Entry Level / Freshers</option>
                      <option value="1–3 Years">1–3 Years</option>
                      <option value="3+ Years">3+ Years</option>
                    </select>
                  </div>

                  {/* Work Mode */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Work Mode
                    </label>
                    <select
                      value={workMode}
                      onChange={(e) => setWorkMode(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                    >
                      <option value="Any">Any Mode</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>

                  {/* Date Posted */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Date Posted
                    </label>
                    <select
                      value={datePosted}
                      onChange={(e) => setDatePosted(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-medium"
                    >
                      <option value="Any">Anytime</option>
                      <option value="24h">Past 24 Hours</option>
                      <option value="week">Past Week</option>
                      <option value="month">Past Month</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* 3. ANIMATED LOADING STATE */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl border border-slate-200/90 p-10 text-center max-w-lg mx-auto shadow-sm space-y-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
              <Sparkles className="w-6 h-6 animate-spin text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Finding curated opportunities...</h3>
              <p className="text-xs text-slate-500 mt-1">Scanning verified feeds & calculating AI fit metrics.</p>
            </div>

            <div className="space-y-2 text-xs text-left max-w-xs mx-auto pt-2">
              <motion.div 
                animate={{ opacity: loadingStep >= 1 ? 1 : 0.4 }}
                className={`flex items-center gap-2 ${loadingStep >= 1 ? 'text-indigo-600 font-semibold' : 'text-slate-400'}`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Scanning available verified listings</span>
              </motion.div>
              <motion.div 
                animate={{ opacity: loadingStep >= 2 ? 1 : 0.4 }}
                className={`flex items-center gap-2 ${loadingStep >= 2 ? 'text-indigo-600 font-semibold' : 'text-slate-400'}`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Analyzing requirements & fresher criteria</span>
              </motion.div>
              <motion.div 
                animate={{ opacity: loadingStep >= 3 ? 1 : 0.4 }}
                className={`flex items-center gap-2 ${loadingStep >= 3 ? 'text-indigo-600 font-semibold' : 'text-slate-400'}`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Generating tailored AI match scores</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. ERROR STATE */}
      {error && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-md mx-auto"
        >
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-rose-900">{error}</h3>
          <button
            onClick={() => handleSearch()}
            className="mt-3 px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-xl hover:bg-rose-700 cursor-pointer"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* 5. RESULTS SECTION */}
      {!loading && !error && hasSearched && (
        <div className="space-y-6">
          {/* Results Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {sortedJobs.length} {sortedJobs.length === 1 ? 'Opportunity' : 'Opportunities'} Found
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Curated openings for students & freshers. Click any position for detailed insights and cover notes.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold p-2 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none shadow-2xs"
              >
                <option value="best_match">Best Match</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>
          </div>

          {/* Staggered Job List Grid */}
          {sortedJobs.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {sortedJobs.map((job, idx) => (
                <motion.div key={job.id || idx} variants={itemVariants}>
                  <AIJobCard 
                    job={job} 
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={onToggleSaveJob}
                    onSelectJob={(j) => setSelectedJob(j)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No matching jobs found</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Try broader keywords or relax your location and experience filters.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setLocation('Any');
                  setJobType('Any');
                  setExperience('Any');
                  setWorkMode('Any');
                  handleSearch('Internship');
                }}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset and Try Another Search</span>
              </button>
            </div>
          )}

          {/* 6. EXTERNAL SEARCH SHORTCUTS */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 mt-8">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Want more direct openings?
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Launch targeted searches on leading career portals with query: &quot;{activeSearchQuery}&quot;
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(activeSearchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors shadow-2xs"
              >
                <span>Search LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`https://in.indeed.com/jobs?q=${encodeURIComponent(activeSearchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors shadow-2xs"
              >
                <span>Search Indeed</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`https://www.google.com/search?q=${encodeURIComponent(activeSearchQuery + ' jobs')}&ibp=htl;jobs`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors shadow-2xs"
              >
                <span>Search Google Jobs</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </motion.a>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Modal */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
        onToggleSave={onToggleSaveJob}
      />
    </div>
  );
};

export default AIJobFinderView;
