import React from 'react';
import type { ImageItem } from '../types/converter';
import { ImageCard } from './ImageCard';
import { Archive, DownloadCloud, Trash2, Loader2, Coffee, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface ImageQueueProps {
  items: ImageItem[];
  isZipping?: boolean;
  showDonationCallout?: boolean;
  onDismissDonationCallout?: () => void;
  onDownload: (item: ImageItem) => void;
  onDownloadAll: () => void;
  onDownloadZip: () => void;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
  onClearAll: () => void;
}

export const ImageQueue: React.FC<ImageQueueProps> = ({
  items,
  isZipping = false,
  showDonationCallout = false,
  onDismissDonationCallout,
  onDownload,
  onDownloadAll,
  onDownloadZip,
  onRemove,
  onRetry,
  onClearAll,
}) => {
  if (items.length === 0) return null;

  const completedCount = items.filter((item) => item.status === 'completed').length;

  return (
    <section className="w-full max-w-xl mx-auto flex flex-col gap-4">
      {/* Queue Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">Queue</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-fuchsia-400 text-xs font-mono font-semibold">
            {completedCount}/{items.length} ready
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Batch Download Action: ZIP if >= 2, Direct if 1 */}
          {completedCount >= 2 && (
            <button
              type="button"
              onClick={onDownloadZip}
              disabled={isZipping}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md shadow-fuchsia-950/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isZipping ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Creating ZIP...</span>
                </>
              ) : (
                <>
                  <Archive className="w-4 h-4" aria-hidden="true" />
                  <span>Download ZIP ({completedCount})</span>
                </>
              )}
            </button>
          )}

          {completedCount === 1 && (
            <button
              type="button"
              onClick={onDownloadAll}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md shadow-fuchsia-950/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 active:scale-95"
            >
              <DownloadCloud className="w-4 h-4" aria-hidden="true" />
              <span>Download (1)</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClearAll}
            disabled={isZipping}
            className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium inline-flex items-center gap-1.5 border border-slate-700/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Optional Post-Batch Tip Callout */}
      {showDonationCallout && (
        <div className="w-full p-3 sm:px-4 sm:py-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-amber-200 shadow-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <Coffee className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="font-medium text-[11px] sm:text-xs leading-snug">
              Saved you time? Support ZapWebp with a quick coffee!
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 shrink-0 self-end sm:self-auto">
            <a
              href={SITE_CONFIG.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
            >
              Tip ☕
            </a>
            {onDismissDonationCallout && (
              <button
                type="button"
                onClick={onDismissDonationCallout}
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-amber-300/80 hover:text-amber-100 hover:bg-amber-900/40 transition-colors inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer active:scale-95"
                aria-label="Dismiss tip suggestion"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cards List */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ImageCard
            key={item.id}
            item={item}
            onDownload={onDownload}
            onRemove={onRemove}
            onRetry={onRetry}
          />
        ))}
      </div>
    </section>
  );
};
