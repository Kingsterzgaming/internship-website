import React, { useState, useMemo } from 'react';
import { Search, Briefcase, Sparkles, AlertCircle, Info } from 'lucide-react';
import { Opportunity } from '../types.ts';
import OpportunityCard from '../components/OpportunityCard.tsx';
import SectionHeader from '../components/SectionHeader.tsx';

interface OpportunitiesViewProps {
  opportunities: Opportunity[];
  loading: boolean;
  onViewOpportunity: (opp: Opportunity) => void;
  onNavigateAI: () => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  opportunities,
  loading,
  onViewOpportunity,
  onNavigateAI
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filterTabs = ['All', 'Internship', 'Full-time', 'Remote', 'Hybrid', 'On-site'];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      // Type or WorkMode filter
      let matchesFilter = true;
      if (activeFilter !== 'All') {
        const f = activeFilter.toLowerCase();
        matchesFilter =
          opp.type.toLowerCase() === f ||
          opp.workMode.toLowerCase() === f;
      }

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        opp.title.toLowerCase().includes(q) ||
        opp.company.toLowerCase().includes(q) ||
        opp.location.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [opportunities, activeFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <SectionHeader
        badge="EARLY TALENT"
        title="Internships & Entry-Level Roles"
        description="Browse sample opportunities to understand real-world job requirements, stipend ranges, and skills companies look for."
      />

      {/* Demo Disclosure Banner */}
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">Educational Demo Catalog:</span> These entries are realistic illustrative opportunities designed to help you benchmark requirements and stipends. To find live, active jobs with direct company links, use our <strong>AI Job Finder</strong>.
          </div>
        </div>
        <button
          onClick={onNavigateAI}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Go to AI Job Finder</span>
        </button>
      </div>

      {/* Controls: Search & Tabs */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role, company, or city..."
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
            Showing <strong className="text-slate-900">{filteredOpportunities.length}</strong> of {opportunities.length} opportunities
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeFilter.toLowerCase() === tab.toLowerCase();
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab === 'All' ? 'All Roles' : tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Opportunities Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onView={onViewOpportunity}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-900">No opportunities match your filter</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Try adjusting your search query or selecting &quot;All Roles&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('All');
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

export default OpportunitiesView;
