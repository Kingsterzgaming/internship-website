import React, { useState } from 'react';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Sparkles, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  ShieldCheck,
  Share2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { AIJob } from '../types.ts';

interface AIJobCardProps {
  job: AIJob;
  isSaved?: boolean;
  onToggleSave?: (job: AIJob) => void;
  onSelectJob?: (job: AIJob) => void;
}

export const AIJobCard: React.FC<AIJobCardProps> = ({
  job,
  isSaved = false,
  onToggleSave,
  onSelectJob
}) => {
  const [copied, setCopied] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200/80';
    if (score >= 80) return 'text-indigo-700 bg-indigo-50 border-indigo-200/80';
    return 'text-amber-700 bg-amber-50 border-amber-200/80';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-indigo-600';
    return 'bg-amber-500';
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${job.title} at ${job.company} - ${job.applyUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      onClick={() => onSelectJob && onSelectJob(job)}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-300/90 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top subtle highlight border on hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Main card body */}
      <div className="p-6 pb-4 space-y-4 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <motion.div 
              whileHover={{ rotate: 3, scale: 1.05 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-100 border border-slate-200/80 flex items-center justify-center font-black text-lg text-indigo-700 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 shrink-0"
            >
              {job.company.charAt(0)}
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">{job.company}</span>
                {job.isVerified && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-indigo-700 bg-indigo-50/80 px-2 py-0.2 rounded-full border border-indigo-200/60">
                    <ShieldCheck className="w-3 h-3 text-indigo-600" />
                    <span>Verified</span>
                  </span>
                )}
                {job.isFeatured && (
                  <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.2 rounded-full bg-amber-50 text-amber-800 border border-amber-200/70">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mt-0.5">
                {job.title}
              </h3>
            </div>
          </div>

          {/* AI Match Score Badge with mini meter */}
          <div className="flex flex-col items-end shrink-0">
            <div className={`px-2.5 py-1 rounded-xl border text-xs font-bold flex items-center gap-1.5 shadow-2xs ${getScoreColor(job.matchScore)}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{job.matchScore}%</span>
            </div>
            {/* Tiny animated progress indicator */}
            <div className="w-14 h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${job.matchScore}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${getProgressBarColor(job.matchScore)}`}
              />
            </div>
          </div>
        </div>

        {/* Quick meta pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/70 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.jobType}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50/70 border border-indigo-100 text-indigo-700 font-semibold">
            <span>{job.workMode}</span>
          </span>

          {job.salary && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-800 font-bold">
              <span>{job.salary}</span>
            </span>
          )}
        </div>

        {/* AI Fit Explanation */}
        {job.matchReason && (
          <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100/70 text-xs text-indigo-950 flex items-start gap-2.5 group-hover:bg-indigo-50/80 transition-colors">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed">
              <span className="font-semibold text-indigo-900">AI Match: </span>
              {job.matchReason}
            </p>
          </div>
        )}

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Key skills chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {job.skills.slice(0, 4).map((skill, sIdx) => (
            <span
              key={sIdx}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 font-medium transition-colors border border-slate-200/40"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[11px] text-slate-400 font-medium pl-1">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{job.datePosted}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-semibold">{job.sourcePlatform}</span>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleShare}
            title="Share job"
            className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </motion.button>

          {onToggleSave && (
            <motion.button
              whileTap={{ scale: 0.85 }}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(job);
              }}
              title={isSaved ? 'Remove from saved' : 'Save job'}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isSaved
                  ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                  : 'text-slate-400 hover:text-indigo-600 hover:bg-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-600 text-indigo-600' : ''}`} />
            </motion.button>
          )}

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-2xs"
          >
            <span>Apply</span>
            <ExternalLink className="w-3 h-3" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default AIJobCard;
