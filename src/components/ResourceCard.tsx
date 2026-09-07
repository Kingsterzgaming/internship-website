import React from 'react';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { Resource } from '../types.ts';

interface ResourceCardProps {
  resource: Resource;
  onRead: (resource: Resource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onRead }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 text-left">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100/60 tracking-wide">
            {resource.category}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {resource.readTime}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
          {resource.title}
        </h3>

        <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {resource.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          Practical Advice
        </span>
        <button
          onClick={() => onRead(resource)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 group-hover:translate-x-1 transition-all cursor-pointer"
        >
          Read Guide
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
