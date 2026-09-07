import React, { useState, useMemo } from 'react';
import { Search, Filter, Compass, AlertCircle } from 'lucide-react';
import { Career } from '../types.ts';
import CareerCard from '../components/CareerCard.tsx';
import FilterTabs from '../components/FilterTabs.tsx';
import SectionHeader from '../components/SectionHeader.tsx';

interface CareersViewProps {
  careers: Career[];
  loading: boolean;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onSelectCareer: (career: Career) => void;
}

export const CareersView: React.FC<CareersViewProps> = ({
  careers,
  loading,
  selectedCategory,
  onCategoryChange,
  onSelectCareer
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Technology', 'Design', 'Finance', 'Marketing', 'Healthcare'];

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      // Category match
      const matchesCategory =
        selectedCategory.toLowerCase() === 'all' ||
        career.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        career.title.toLowerCase().includes(query) ||
        career.description.toLowerCase().includes(query) ||
        career.skills.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [careers, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <SectionHeader
        badge="CAREER PATHWAYS"
        title="Explore Career Paths"
        description="Comprehensive roadmaps detailing foundational skills, educational requirements, demand levels, and career progression."
      />

      {/* Controls: Search & Category Filter Tabs */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search careers, skills, or titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Result Count */}
          <div className="text-xs sm:text-sm text-slate-500 font-medium self-start md:self-center">
            Showing <strong className="text-slate-900">{filteredCareers.length}</strong> of {careers.length} careers
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="pt-2 border-t border-slate-100">
          <FilterTabs
            categories={categories}
            activeCategory={selectedCategory}
            onSelect={onCategoryChange}
          />
        </div>
      </div>

      {/* Grid of Career Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : filteredCareers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onSelect={onSelectCareer}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-900">No career paths match your criteria</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onCategoryChange('All');
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CareersView;
