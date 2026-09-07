import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  Copy, 
  FileText, 
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIJob } from '../types.ts';

interface JobDetailsModalProps {
  job: AIJob | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (job: AIJob) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  onClose,
  isSaved = false,
  onToggleSave
}) => {
  const [copiedNote, setCopiedNote] = useState(false);

  if (!job) return null;

  const sampleCoverNote = `Dear Hiring Team at ${job.company},

I am writing to express my eager interest in the ${job.title} role. As an aspiring software professional with hands-on project experience in ${job.skills.slice(0, 3).join(', ')}, I have built practical applications demonstrating strong fundamentals and clean development practices.

I admire ${job.company}'s work and would love the opportunity to contribute with dedication, rapid learning, and positive energy to your team.

Thank you for your consideration!`;

  const handleCopyNote = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(sampleCoverNote);
      setCopiedNote(true);
      setTimeout(() => setCopiedNote(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col z-10 text-left"
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{job.company}</span>
                    {job.isVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    )}
                    {job.isFeatured && (
                      <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {job.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-2xs">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-medium shadow-2xs">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {job.jobType}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                      {job.workMode}
                    </span>
                    {job.salary && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                        {job.salary}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700">
              {/* AI Match Score Breakdown */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                      AI Fit Assessment
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-indigo-200/70 text-indigo-900">
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-950 mt-1 leading-relaxed">
                    {job.matchReason || 'Strong match for youth and junior candidates with foundational programming skills and curiosity.'}
                  </p>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Role Overview</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {job.description}
                </p>
              </div>

              {/* Key Requirements */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2.5">Key Requirements & Qualifications</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-slate-600 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Skills */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Student Outreach / Cover Note Helper */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Quick Outreach / Cover Note (Ready to copy)
                    </h4>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCopyNote}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedNote ? 'Copied!' : 'Copy Note'}</span>
                  </motion.button>
                </div>
                <p className="text-xs text-slate-500 whitespace-pre-line font-mono bg-white p-3 rounded-xl border border-slate-200">
                  {sampleCoverNote}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-white flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500 hidden sm:block">
                Posted {job.datePosted} via {job.sourcePlatform}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {onToggleSave && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => onToggleSave(job)}
                    className={`px-4 py-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                      isSaved
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-700 text-indigo-700' : ''}`} />
                    <span>{isSaved ? 'Saved' : 'Save Job'}</span>
                  </motion.button>
                )}

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Apply on Company Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JobDetailsModal;
