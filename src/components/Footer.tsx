import React from 'react';
import { Lock, Zap, FileX, Coffee } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-xl mx-auto mt-12 mb-8 pt-8 border-t border-slate-800/80 text-center flex flex-col gap-6 text-slate-400 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="font-semibold text-slate-200">Zero Upload</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Your files never travel across the internet. Everything stays strictly on your device.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <Zap className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="font-semibold text-slate-200">No Limits</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">No file size caps or session quotas. Enjoy pure native hardware processing speed.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <FileX className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="font-semibold text-slate-200">EXIF Stripped</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">In-browser re-encoding safely removes embedded GPS tags and device metadata.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-xs pt-2">
        <span>{SITE_CONFIG.name} • 100% In-Browser Privacy Utility</span>
        <div className="flex items-center gap-2">
          <a
            href={SITE_CONFIG.donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-300 hover:text-amber-200 hover:bg-amber-900/40 hover:border-amber-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 font-medium"
            aria-label="Support the developer on Ko-fi"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>{SITE_CONFIG.donationLabel} ☕</span>
          </a>

          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-400 hover:text-fuchsia-300 hover:bg-slate-900/60 border border-transparent hover:border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            aria-label="View repository and star on GitHub"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Star on GitHub ⭐</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
