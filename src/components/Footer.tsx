import React from 'react';
import { Compass, Instagram, Linkedin, Twitter, ArrowUp, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-left">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                Youth Career Guide
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Explore. Learn. Grow. Empowering students, recent graduates, and ambitious young professionals to navigate modern career pathways with confidence.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('careers')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Career Paths
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('resources')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Career Resources
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('opportunities')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Demo Opportunities
                </button>
              </li>
            </ul>
          </div>

          {/* AI Features & Platform */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('ai-jobs')} 
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>AI Job Finder</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    New
                  </span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Mission
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Platform
                </button>
              </li>
            </ul>
          </div>

          {/* Mission Note */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Commitment
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% free educational guidance for youths everywhere. Built to make career exploration clear, transparent, and accessible.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
              <span className="font-semibold text-white block mb-1">Have feedback or career questions?</span>
              <button
                onClick={() => onNavigate('contact')}
                className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2"
              >
                Send our team a message →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Youth Career Guide. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for young dreamers
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
