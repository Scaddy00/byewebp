import React from 'react';
import type { ImageItem } from '../types/converter';
import { ImageCard } from './ImageCard';
import { Archive, DownloadCloud, Trash2, Loader2 } from 'lucide-react';

interface ImageQueueProps {
  items: ImageItem[];
  isZipping?: boolean;
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
