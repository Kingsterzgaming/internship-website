import React from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIJob } from '../types.ts';

interface SavedJobsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedJobs: AIJob[];
  onRemoveJob: (jobId: string) => void;
  onSelectJob: (job: AIJob) => void;
}

export const SavedJobsDrawer: React.FC<SavedJobsDrawerProps> = ({
  isOpen,
  onClose,
  savedJobs,
  onRemoveJob,
  onSelectJob
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dimmed backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
            onClick={onClose}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            {/* Sliding drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200/90 flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-2xs">
                    <Bookmark className="w-5 h-5 fill-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900">Saved Opportunities</h2>
                    <p className="text-xs text-slate-500 font-medium">{savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} bookmarked</p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
                {savedJobs.length > 0 ? (
                  savedJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => onSelectJob(job)}
                      className="group relative bg-white rounded-2xl border border-slate-200/90 p-4 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{job.company}</span>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {job.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                            {job.matchScore}% Match
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveJob(job.id);
                            }}
                            title="Remove"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate max-w-[140px]">{job.location}</span>
                        </span>
                        <span>•</span>
                        <span>{job.jobType}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-slate-400 text-[11px]">{job.datePosted}</span>
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                        >
                          <span>Apply</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                      <Bookmark className="w-7 h-7" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700">No saved jobs yet</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Click the bookmark icon on any job card to save roles you want to apply to later.
                    </p>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {savedJobs.length > 0 && (
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Saved in browser storage</span>
                  <button
                    type="button"
                    onClick={() => {
                      savedJobs.forEach(j => onRemoveJob(j.id));
                    }}
                    className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SavedJobsDrawer;
