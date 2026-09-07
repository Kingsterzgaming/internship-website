import React from 'react';
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { Career } from '../types.ts';

interface CareerCardProps {
  career: Career;
  onSelect: (career: Career) => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({ career, onSelect }) => {
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Growing':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 text-left">
      <div>
        {/* Header with Category & Demand */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60 tracking-wide">
            {career.category}
          </span>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${getDemandColor(career.demand)}`}>
            <TrendingUp className="w-3 h-3" />
            {career.demand} Demand
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {career.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {career.description}
        </p>

        {/* Skills Preview */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
            Key Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {career.skills.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60 font-medium"
              >
                {skill}
              </span>
            ))}
            {career.skills.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-md bg-slate-50 text-slate-400 font-medium">
                +{career.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          Guided Career Path
        </span>
        <button
          onClick={() => onSelect(career)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 group-hover:translate-x-1 transition-all cursor-pointer"
        >
          View Career
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CareerCard;
