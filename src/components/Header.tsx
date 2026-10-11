import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full text-center py-8 px-4 flex flex-col items-center gap-4">
      {/* Centered Privacy Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
        <span>100% Client-Side • Zero Upload • Guaranteed Privacy</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-rose-900 to-fuchsia-900 border border-fuchsia-500/30 shadow-lg shadow-fuchsia-950/50">
          <Zap className="w-7 h-7 text-fuchsia-300" aria-hidden="true" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Webp<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400">Snap</span>
        </h1>
      </div>

      <p className="max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed">
        Convert <strong className="text-white font-semibold">.webp</strong> images to <strong className="text-white font-semibold">PNG</strong> or <strong className="text-white font-semibold">JPG</strong> in a snap, right inside your browser memory. No files ever leave your device.
      </p>
    </header>
  );
};
