import React from 'react';
import { 
  ArrowRight, 
  Compass, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  TrendingUp,
  Search
} from 'lucide-react';
import { Career, Resource } from '../types.ts';
import CareerCard from '../components/CareerCard.tsx';
import ResourceCard from '../components/ResourceCard.tsx';
import CategoryCard from '../components/CategoryCard.tsx';
import SectionHeader from '../components/SectionHeader.tsx';

interface HomeViewProps {
  careers: Career[];
  resources: Resource[];
  loading: boolean;
  onNavigate: (tab: string, param?: string) => void;
  onSelectCareer: (career: Career) => void;
  onReadResource: (resource: Resource) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  careers,
  resources,
  loading,
  onNavigate,
  onSelectCareer,
  onReadResource
}) => {
  const categories = [
    'Technology',
    'Healthcare',
    'Engineering',
    'Finance',
    'Design',
    'Marketing',
    'Science',
    'Law'
  ];

  const featuredCareers = careers.slice(0, 4);
  const featuredResources = resources.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/70 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 border border-indigo-200/80 shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Dedicated Platform for Students & Graduates</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Explore Your Future.{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Start Your Career.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover career paths, build essential skills, and find useful resources to help you take your next step with confidence.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              onClick={() => onNavigate('careers')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Explore Careers</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('resources')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-7 py-3.5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>View Resources</span>
            </button>
          </div>

          {/* Value Badges */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Accounts Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Real Progression Paths</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Free Educational Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>AI Job Intelligence</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">8+</div>
            <div className="text-sm sm:text-base font-semibold text-gray-900 mt-1">Career Paths</div>
            <div className="text-xs text-slate-500 mt-0.5">Comprehensive guides</div>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-violet-600 tracking-tight">10+</div>
            <div className="text-sm sm:text-base font-semibold text-gray-900 mt-1">Resources</div>
            <div className="text-xs text-slate-500 mt-0.5">Interviews, resumes & skills</div>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">10+</div>
            <div className="text-sm sm:text-base font-semibold text-gray-900 mt-1">Opportunities</div>
            <div className="text-xs text-slate-500 mt-0.5">Curated internships & roles</div>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight">100%</div>
            <div className="text-sm sm:text-base font-semibold text-gray-900 mt-1">Free Access</div>
            <div className="text-xs text-slate-500 mt-0.5">Designed for students</div>
          </div>
        </div>
      </section>

      {/* 3. CAREER CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="DISCIPLINES"
          title="Explore Career Categories"
          description="Browse career roadmaps across diverse industries to find what resonates with your talents."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat}
              name={cat}
              onClick={() => onNavigate('careers', cat)}
            />
          ))}
        </div>
      </section>

      {/* 4. FEATURED CAREERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2 inline-block">
              IN DEMAND
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Featured Careers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              High-growth fields with practical education and skill roadmaps.
            </p>
          </div>
          <button
            onClick={() => onNavigate('careers')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            View All Careers ({careers.length})
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCareers.map((career) => (
              <CareerCard
                key={career.id}
                career={career}
                onSelect={onSelectCareer}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. FEATURED RESOURCES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100 mb-2 inline-block">
              ESSENTIAL GUIDES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Featured Resources
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Practical guides written specifically for students and young professionals.
            </p>
          </div>
          <button
            onClick={() => onNavigate('resources')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            View All Guides ({resources.length})
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-60 rounded-2xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                onRead={onReadResource}
              />
            ))}
          </div>
        )}
      </section>

      {/* AI JOB FINDER TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Search Feature</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Try the AI Job Finder
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Describe what you are looking for in natural language—like &quot;Frontend internships for freshers in India&quot;—and get matched listings from verified open online sources with an instant AI match score.
            </p>
            <div className="mt-6">
              <button
                onClick={() => onNavigate('ai-jobs')}
                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Launch AI Job Finder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-14 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Your Future Starts With One Step.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Whether you are deciding on a college major or polishing your resume for your first job, we have the maps to guide you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('careers')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Browse All Careers
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              Contact Our Mentors
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
