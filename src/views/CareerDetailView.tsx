import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  GraduationCap, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { Career, Resource } from '../types.ts';
import CareerCard from '../components/CareerCard.tsx';
import ResourceCard from '../components/ResourceCard.tsx';

interface CareerDetailViewProps {
  careerId: string;
  onBack: () => void;
  onSelectCareer: (career: Career) => void;
  onReadResource: (resource: Resource) => void;
}

export const CareerDetailView: React.FC<CareerDetailViewProps> = ({
  careerId,
  onBack,
  onSelectCareer,
  onReadResource
}) => {
  const [careerData, setCareerData] = useState<{
    career: Career | null;
    relatedCareers: Career[];
    relatedResources: Resource[];
  }>({
    career: null,
    relatedCareers: [],
    relatedResources: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`/api/careers/${careerId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Career path not found');
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          if (json.success && json.data) {
            setCareerData({
              career: json.data,
              relatedCareers: json.data.relatedCareers || [],
              relatedResources: json.data.relatedResources || []
            });
          } else {
            setError(json.error || 'Failed to load career');
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error loading career details');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [careerId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        <div className="h-8 w-32 bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-48 bg-slate-100 rounded-3xl animate-pulse" />
        <div className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (error || !careerData.career) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h3 className="text-xl font-bold text-gray-900">Career not found</h3>
        <p className="text-sm text-slate-500 mt-2">{error || 'Unable to locate this career path.'}</p>
        <button
          onClick={onBack}
          className="mt-6 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Back to Careers
        </button>
      </div>
    );
  }

  const { career, relatedCareers, relatedResources } = careerData;

  const getDemandBadge = (demand: string) => {
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 text-left">
      {/* Back Button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Careers</span>
        </button>
      </div>

      {/* Main Career Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 tracking-wide">
            {career.category}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${getDemandBadge(career.demand)}`}>
            <TrendingUp className="w-3.5 h-3.5" />
            {career.demand} Industry Demand
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {career.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          {career.description}
        </p>

        {/* Illustrative Salary Benchmark */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-200/80 flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Illustrative Salary Benchmark
            </div>
            <div className="text-sm sm:text-base font-bold text-emerald-950 mt-0.5">
              {career.salaryGuide}
            </div>
            <div className="text-xs text-emerald-800/80 mt-0.5">
              *Note: Figures are approximate national industry averages provided for student orientation; compensation varies by location, company size, and portfolio strength.
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Education & Required Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Education Requirements
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {career.education}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Self-directed portfolios & open-source projects can substitute or augment degrees.</span>
          </div>
        </div>

        {/* Skills Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Key Required Skills
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {career.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/80 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Career Progression Roadmap */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2.5 mb-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Career Progression Roadmap
          </h2>
        </div>
        <p className="text-sm text-slate-500 mb-8">
          A realistic trajectory illustrating how responsibilities, seniority, and leadership evolve over time.
        </p>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 before:hidden sm:before:block">
          {career.careerPath.map((step, idx) => (
            <div key={idx} className="relative sm:pl-10">
              {/* Dot marker */}
              <div className="hidden sm:flex absolute left-1.5 top-1.5 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-indigo-600 items-center justify-center" />
              
              <div className="bg-slate-50/70 border border-slate-200/70 rounded-2xl p-5 sm:p-6 transition-all hover:border-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                    {step.stage}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {step.timeline}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  {step.role}
                </h3>

                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Recommended Reading for this Path
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedResources.map((res) => (
              <ResourceCard
                key={res.id}
                resource={res}
                onRead={onReadResource}
              />
            ))}
          </div>
        </div>
      )}

      {/* Related Careers */}
      {relatedCareers.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Explore Similar Careers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCareers.map((rel) => (
              <CareerCard
                key={rel.id}
                career={rel}
                onSelect={(selected) => {
                  onSelectCareer(selected);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDetailView;
