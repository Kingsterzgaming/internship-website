import React from 'react';
import { ArrowRight, MapPin, Building2, Calendar, Briefcase, Sparkles } from 'lucide-react';
import { Opportunity } from '../types.ts';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onView: (opp: Opportunity) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onView }) => {
  const getWorkModeBadge = (mode: string) => {
    switch (mode) {
      case 'Remote':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Hybrid':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 text-left">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200/80">
              {opportunity.type}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getWorkModeBadge(opportunity.workMode)}`}>
              {opportunity.workMode}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80 tracking-wide">
            Demo Listing
          </span>
        </div>

        {/* Position & Company */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
          {opportunity.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mt-1">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span>{opportunity.company}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{opportunity.location}</span>
        </div>

        {/* Description snippet */}
        <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {opportunity.description}
        </p>

        {/* Salary & Details */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Stipend / Comp:</span>
            <span className="font-semibold text-slate-900">{opportunity.salary}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Deadline:
            </span>
            <span className="font-medium text-slate-700">{opportunity.deadline}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Entry Level
        </span>
        <button
          onClick={() => onView(opportunity)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 group-hover:translate-x-1 transition-all cursor-pointer"
        >
          View Opportunity
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;
