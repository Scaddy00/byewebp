import React from 'react';
import type { ImageItem } from '../types/converter';
import { Download, Loader2, AlertCircle, RefreshCw, Trash2, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface ImageCardProps {
  item: ImageItem;
  onDownload: (item: ImageItem) => void;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
}

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  item,
  onDownload,
  onRemove,
  onRetry,
}) => {
  const extension = item.targetFormat === 'jpeg' ? 'jpg' : item.targetFormat;
  const originalExt = item.file.name.split('.').pop()?.toLowerCase() || 'img';
  const originalSizeStr = formatBytes(item.file.size);
  const convertedSizeStr = item.convertedSize ? formatBytes(item.convertedSize) : null;
  const isHeic = originalExt === 'heic' || originalExt === 'heif';
  const displayUrl = item.convertedUrl || (!isHeic ? item.previewUrl : null);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-lg transition-all hover:border-slate-700">
      {/* Thumbnail */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 flex items-center justify-center">
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={`Preview of ${item.file.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon className="w-6 h-6 text-fuchsia-400/80" aria-hidden="true" />
        )}
        <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/75 text-[9px] font-mono text-slate-300 uppercase leading-none">
          {originalExt}
        </span>
      </div>

      {/* Info Central Column */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5 text-left">
        <h3 className="text-xs sm:text-sm font-semibold text-white truncate" title={item.file.name}>
          {item.file.name}
        </h3>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400">
          <span>{originalSizeStr}</span>
          <span>→</span>
          <span className="uppercase font-bold text-fuchsia-400">{extension}</span>
          {convertedSizeStr && (
            <span className="text-slate-300 font-medium">({convertedSizeStr})</span>
          )}
        </div>

        {/* Status Message */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
          {item.status === 'idle' && (
            <span className="text-slate-400">Waiting...</span>
          )}
          {item.status === 'converting' && (
            <span className="inline-flex items-center gap-1 text-fuchsia-400 font-medium">
              <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
              Converting...
            </span>
          )}
          {item.status === 'completed' && (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" aria-hidden="true" />
              Ready
            </span>
          )}
          {item.status === 'error' && (
            <span className="inline-flex items-center gap-1 text-rose-400 font-medium truncate">
              <AlertCircle className="w-3 h-3 text-rose-400 shrink-0" aria-hidden="true" />
              {item.errorMessage || 'Failed'}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {item.status === 'completed' && (
          <button
            type="button"
            onClick={() => onDownload(item)}
            className="min-h-[44px] min-w-[44px] px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 shadow-md shadow-fuchsia-950/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 active:scale-95"
            aria-label={`Download ${item.file.name} as ${extension.toUpperCase()}`}
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Download</span>
          </button>
        )}

        {item.status === 'error' && (
          <button
            type="button"
            onClick={() => onRetry(item.id)}
            className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-semibold inline-flex items-center justify-center gap-1.5 border border-rose-900/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 active:scale-95"
            aria-label={`Retry conversion for ${item.file.name}`}
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Retry</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-700/60 hover:border-rose-800/50 transition-colors inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 active:scale-95"
          aria-label={`Remove ${item.file.name} from queue`}
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
