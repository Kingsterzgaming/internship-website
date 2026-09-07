import React from 'react';
import { X, Building2, MapPin, Calendar, DollarSign, Briefcase, AlertCircle } from 'lucide-react';
import { Opportunity } from '../types.ts';

interface OpportunityModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export const OpportunityModal: React.FC<OpportunityModalProps> = ({ opportunity, onClose }) => {
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                {opportunity.type}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                {opportunity.workMode}
              </span>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Demo Listing
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {opportunity.title}
            </h2>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mt-1">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{opportunity.company}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <p className="text-xs text-slate-400 font-medium">Location</p>
              <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {opportunity.location}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Compensation</p>
              <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                {opportunity.salary}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Work Arrangement</p>
              <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                {opportunity.workMode}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Application Deadline</p>
              <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {opportunity.deadline}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2">Role Overview & Responsibilities</h4>
            <p className="text-slate-600 leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          {/* Educational Demo Notice */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Educational Demo Listing Notice</span>
              This opportunity is an illustrative demonstration listing for curriculum exploration. No live application system is connected. To discover active live openings with direct company links, visit the <strong>AI Job Finder</strong> tab.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;
