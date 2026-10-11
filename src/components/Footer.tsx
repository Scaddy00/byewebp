import React from 'react';
import { Lock, Zap, FileX } from 'lucide-react';

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
            <p className="text-[11px] text-slate-400 mt-0.5">I tuoi file non viaggiano su internet. Restano sul tuo computer.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <Zap className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="font-semibold text-slate-200">Nessun Limite</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Nessun limite di megabyte o file per sessione. Velocità hardware pura.</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <FileX className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="font-semibold text-slate-200">EXIF Stripped</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">La rasterizzazione in-browser rimuove i metadati di geolocalizzazione.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-xs pt-2">
        <span>WebpSnap • 100% In-Browser Privacy Utility</span>
        <a
          href="https://github.com/Scaddy00/webpsnap"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-fuchsia-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 rounded-md py-1 px-2"
          aria-label="Vedi repository e lascia una stella su GitHub"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>Star on GitHub ⭐</span>
        </a>
      </div>
    </footer>
  );
};
