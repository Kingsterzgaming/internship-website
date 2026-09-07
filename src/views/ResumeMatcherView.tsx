import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Lightbulb, 
  ListChecks, 
  RefreshCw,
  Copy,
  ChevronRight,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ResumeMatchResult } from '../types.ts';

export const ResumeMatcherView: React.FC = () => {
  const [targetRole, setTargetRole] = useState('Frontend Developer Intern');
  const [resumeText, setResumeText] = useState(
    `Passionate Computer Science student (final year, CGPA 8.4) with strong interest in modern web development.
Skills: JavaScript (ES6), HTML5, CSS3, React basics, Git, C++, Python.
Projects:
1. Weather Forecast App: Built with React and OpenWeatherMap API, displays 5-day forecasts.
2. College Fest Website: Static landing page using HTML/CSS and responsive design for 1,000+ attendees.
Looking for an entry-level frontend developer or software engineering internship to contribute and grow.`
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeMatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({});

  const sampleRoles = [
    'Frontend Developer Intern',
    'Graduate Software Engineer Trainee',
    'Junior Python / Backend Developer',
    'Data Analyst Fresher',
    'UI/UX Design Intern',
    'Cloud & DevOps Intern'
  ];

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume or student profile text.');
      return;
    }

    setLoading(true);
    setError(null);
    setCheckedActions({});

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze profile. Please try again.');
      }

      const json = await response.json();
      if (json.success && json.result) {
        setResult(json.result);
      } else {
        throw new Error(json.error || 'Could not parse resume data');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during resume matching.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAction = (idx: number) => {
    setCheckedActions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-left">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Skill-Gap Diagnostic</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          AI Resume & Skill Matcher
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed font-normal">
          Paste your student resume or bio, select your target role, and get instantaneous feedback on missing competencies, suggested portfolio projects, and a concrete 24-hour action roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-5"
        >
          {/* Target Role Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              1. Desired Target Role
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Frontend Developer Intern"
              className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-slate-200 bg-slate-50/70 font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Quick role suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {sampleRoles.map((role, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setTargetRole(role)}
                  className={`text-[11px] px-2.5 py-1 rounded-xl border font-semibold transition-all cursor-pointer ${
                    targetRole === role
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {role}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Resume Text Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                2. Resume Summary / Profile Text
              </label>
              <button
                type="button"
                onClick={() => {
                  setResumeText(`B.Tech Computer Science student with project experience in Python, Flask, and PostgreSQL. Built a student attendance tracker with authentication and REST API. Looking for software engineer trainee positions.`);
                }}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                Insert Sample
              </button>
            </div>
            <textarea
              rows={8}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume bullet points, skills list, coursework, and project highlights here..."
              className="w-full p-3.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-slate-50/70 text-slate-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono placeholder:font-sans"
            />
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-sm shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Benchmarking against industry requirements...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Skill Match Analysis</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center shadow-sm space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
                  <Sparkles className="w-7 h-7 animate-spin text-indigo-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Evaluating Profile Alignment...</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Cross-referencing your experience against verified requirements for {targetRole}.
                </p>
                {/* Progress bar animation */}
                <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden mx-auto mt-4">
                  <motion.div 
                    className="h-full bg-indigo-600 rounded-full"
                    animate={{ x: [-100, 200] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Score & Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Role Compatibility Assessment
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      {result.targetRole}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1 font-medium">
                      {result.summary}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs shrink-0 min-w-[100px]">
                    <span className="text-3xl font-black text-indigo-600">{result.overallScore}%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fit Score</span>
                  </div>
                </div>

                {/* Skills Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Skills You Possess</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {result.matchingSkills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-xs px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-semibold shadow-2xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>High-Impact Missing Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {result.missingSkills.map((skill, mIdx) => (
                        <span key={mIdx} className="text-xs px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-semibold shadow-2xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Strengths & Improvement Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      <span>Profile Strengths</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {result.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Key Growth Recommendations</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {result.improvementAreas.map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommended Projects */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Projects to Build to Bridge the Gap</span>
                  </h4>
                  <div className="space-y-3">
                    {result.recommendedProjects.map((proj, pIdx) => (
                      <div key={pIdx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2">
                        <h5 className="text-sm font-bold text-slate-900">{proj.title}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-bold">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive 4-Step Actionable Checklist */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                      <ListChecks className="w-4 h-4" />
                      <span>Interactive 24-Hour Action Checklist</span>
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {Object.values(checkedActions).filter(Boolean).length} / {result.actionableChecklist.length} completed
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-1 text-xs text-slate-300">
                    {result.actionableChecklist.map((item, cIdx) => {
                      const isDone = !!checkedActions[cIdx];
                      return (
                        <li 
                          key={cIdx} 
                          onClick={() => toggleAction(cIdx)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isDone 
                              ? 'bg-slate-800/90 border-emerald-500/40 text-slate-400 line-through' 
                              : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800 text-slate-200'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isDone ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-500'
                          }`}>
                            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="awaiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-50 rounded-3xl border border-slate-200/90 p-12 text-center h-full flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <FileText className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Awaiting Profile Review</h3>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  Choose your desired target role on the left and click &quot;Run Skill Match Analysis&quot; to inspect your score and improvement checklist.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ResumeMatcherView;
