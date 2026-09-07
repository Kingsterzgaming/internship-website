import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Check,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InterviewQuestion } from '../types.ts';

export const InterviewPrepView: React.FC = () => {
  const [role, setRole] = useState('Frontend Developer Intern');
  const [category, setCategory] = useState('All');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [masteredQuestions, setMasteredQuestions] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const roles = [
    'Frontend Developer Intern',
    'Junior Python Developer',
    'Data Analyst Fresher',
    'Associate Product Manager (APM)',
    'UI/UX Design Intern',
    'Cloud & DevOps Intern',
    'Cybersecurity Analyst Entry Level'
  ];

  const fetchQuestions = async (targetRole = role, targetCategory = category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: targetRole,
          category: targetCategory
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate interview practice questions.');
      }

      const json = await response.json();
      if (json.success && Array.isArray(json.questions)) {
        setQuestions(json.questions);
        setRevealedAnswers({});
      } else {
        throw new Error(json.error || 'Invalid questions response');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error occurred while loading questions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [role]);

  const toggleAnswer = (qKey: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [qKey]: !prev[qKey]
    }));
  };

  const toggleMastered = (qKey: string) => {
    setMasteredQuestions(prev => ({
      ...prev,
      [qKey]: !prev[qKey]
    }));
  };

  const filteredQuestions = category === 'All' 
    ? questions 
    : questions.filter(q => q.category.toLowerCase().includes(category.toLowerCase()));

  const masteredCount = Object.values(masteredQuestions).filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Technical & Behavioral Coach</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AI Interview Simulator & Prep
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Master the exact questions asked in technical screening calls and hiring manager rounds for entry-level roles. Test yourself first, then reveal structured STAR-format model answers.
        </p>
      </div>

      {/* Control Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
          <div className="w-full sm:w-64">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">
              Role Focus
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 font-bold"
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-48">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">
              Question Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 font-semibold"
            >
              <option value="All">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Problem Solving">Problem Solving</option>
              <option value="HR / Fresher">HR / Fresher</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {filteredQuestions.length > 0 && (
            <span className="text-xs font-semibold text-slate-500">
              {masteredCount} / {filteredQuestions.length} Mastered
            </span>
          )}

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            disabled={loading}
            onClick={() => fetchQuestions(role, category)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-indigo-600/20 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Regenerate Questions</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Loading state */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
              <Sparkles className="w-6 h-6 text-indigo-600 animate-spin" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Formulating role-specific scenarios...</h3>
            <p className="text-xs text-slate-500">Synthesizing common entry-level challenges and optimal STAR answers.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions list */}
      {!loading && (
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => {
            const qKey = q.id || `q-${idx}`;
            const isRevealed = !!revealedAnswers[qKey];
            const isMastered = !!masteredQuestions[qKey];

            return (
              <motion.div 
                key={qKey}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`bg-white rounded-3xl border p-6 sm:p-8 shadow-sm space-y-4 transition-all ${
                  isMastered ? 'border-emerald-200/90 bg-emerald-50/10' : 'border-slate-200/90 hover:border-indigo-200'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {q.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                        {q.difficulty}
                      </span>
                      {isMastered && (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300">
                          ✓ Mastered
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug pt-1">
                      {q.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      type="button"
                      onClick={() => toggleMastered(qKey)}
                      title={isMastered ? "Mark unmastered" : "Mark as mastered"}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        isMastered
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => toggleAnswer(qKey)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'Hide Answer' : 'Reveal Answer'}</span>
                    </motion.button>
                  </div>
                </div>

                {/* Key Concept Chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Key Concepts:</span>
                  {q.keyConcepts.map((concept, cIdx) => (
                    <span 
                      key={cIdx}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                {/* Revealed Answer Box with AnimatePresence */}
                <AnimatePresence>
                  {isRevealed && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pt-2"
                    >
                      <div className="pt-4 border-t border-slate-100 space-y-4">
                        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                          <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Recommended Model Answer</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-normal">
                            {q.sampleAnswer}
                          </p>
                        </div>

                        {q.pitfallsToAvoid && (
                          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-amber-900">Rookie Pitfall to Avoid: </span>
                              <span>{q.pitfallsToAvoid}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InterviewPrepView;
