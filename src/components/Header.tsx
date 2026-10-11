import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

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

export const Header: React.FC = () => {
  return (
    <header className="w-full text-center pt-6 pb-4 px-4 flex flex-col items-center gap-4">
      {/* Top Bar with Privacy Badge and GitHub Link */}
      <div className="w-full max-w-xl flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">100% Client-Side • Zero Upload • Privacy Garantita</span>
          <span className="sm:hidden">100% Client-Side</span>
        </div>

        <a
          href="https://github.com/Scaddy00/webpsnap"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 min-h-[36px]"
          aria-label="Vedi codice sorgente su GitHub"
        >
          <GithubIcon className="w-4 h-4 text-slate-300" />
          <span>GitHub</span>
        </a>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-rose-900 to-fuchsia-900 border border-fuchsia-500/30 shadow-lg shadow-fuchsia-950/50">
          <Zap className="w-7 h-7 text-fuchsia-300" aria-hidden="true" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Webp<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400">Snap</span>
        </h1>
      </div>

      <p className="max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed">
        Converti immagini <strong className="text-white font-semibold">.webp</strong> in <strong className="text-white font-semibold">PNG</strong> o <strong className="text-white font-semibold">JPG</strong> in un lampo, direttamente nella memoria del tuo browser. Nessun file lascia mai il tuo dispositivo.
      </p>
    </header>
  );
};
