import React from 'react';
import { Lock, Zap, FileX } from 'lucide-react';

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

      <p className="text-slate-500">
        WebpSnap • Progettato per massima privacy e velocità • 100% In-Browser Utility
      </p>
    </footer>
  );
};
