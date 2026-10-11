import React from 'react';
import { Server, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';
import { AFFILIATE_TOOLS } from '../config/site';

export const RecommendedTools: React.FC = () => {
  return (
    <section 
      className="w-full max-w-xl mx-auto flex flex-col gap-4 mt-2 mb-2"
      aria-labelledby="recommended-tools-heading"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-fuchsia-400" aria-hidden="true" />
          <h2 id="recommended-tools-heading" className="text-sm font-bold text-white tracking-tight">
            Recommended Tools for Creators & Webmasters
          </h2>
        </div>
        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
          Curated Picks
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {AFFILIATE_TOOLS.map((tool) => {
          const isHosting = tool.id === 'hosting';
          return (
            <div
              key={tool.id}
              className="flex flex-col justify-between p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/90 transition-all hover:bg-slate-900/60 shadow-sm"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isHosting ? (
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Server className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                    )}
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {tool.category}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800/80 text-fuchsia-300 border border-slate-700/50">
                    {tool.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-100 text-sm">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-col gap-2">
                <div className="text-[11px] font-medium text-emerald-400">
                  {tool.highlight}
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="min-h-[44px] w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-fuchsia-600/90 text-white font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-all hover:shadow-md hover:shadow-fuchsia-950/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 active:scale-98"
                >
                  <span>{tool.ctaText}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* FTC / Advertising Transparency Disclosure */}
      <p className="text-[11px] text-slate-500 text-center px-4 leading-normal">
        <span className="font-semibold text-slate-400">Affiliate Disclosure:</span> Some links above are affiliate partnerships. If you choose to subscribe through them, we may earn a modest commission at zero additional cost to you, helping keep ZapWebp 100% free.
      </p>
    </section>
  );
};
