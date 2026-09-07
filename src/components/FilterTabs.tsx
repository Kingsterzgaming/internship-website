import React from 'react';

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
  className?: string;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  categories,
  activeCategory,
  onSelect,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar ${className}`}>
      {categories.map((cat) => {
        const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer border select-none ${
              isActive
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default FilterTabs;
