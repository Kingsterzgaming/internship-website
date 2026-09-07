import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { Resource } from '../types.ts';
import ResourceCard from '../components/ResourceCard.tsx';
import FilterTabs from '../components/FilterTabs.tsx';
import SectionHeader from '../components/SectionHeader.tsx';

interface ResourcesViewProps {
  resources: Resource[];
  loading: boolean;
  onReadResource: (resource: Resource) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  loading,
  onReadResource
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Job Preparation',
    'Interview Skills',
    'Internships',
    'Career Planning',
    'Skills Development',
    'Portfolio'
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        res.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        res.title.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.content.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [resources, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <SectionHeader
        badge="STUDY & PREPARE"
        title="Career Guidance Resources"
        description="Practical, fluff-free advice on resumes, interviews, internships, and building momentum early in your professional life."
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, topics, or interview advice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
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

          <div className="text-xs sm:text-sm text-slate-500 font-medium self-start md:self-center">
            Showing <strong className="text-slate-900">{filteredResources.length}</strong> of {resources.length} guides
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <FilterTabs
            categories={categories}
            activeCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </div>

      {/* Resources Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onRead={onReadResource}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-900">No resources found</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Try adjusting your search terms or selecting another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
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

export default ResourcesView;
