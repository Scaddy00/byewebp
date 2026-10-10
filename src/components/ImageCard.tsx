import React from 'react';
import type { ImageItem } from '../types/converter';
import { Download, Loader2, AlertCircle, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';

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
  const extension = item.targetFormat === 'png' ? 'png' : 'jpg';
  const originalSizeStr = formatBytes(item.file.size);
  const convertedSizeStr = item.convertedSize ? formatBytes(item.convertedSize) : null;

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg transition-all hover:border-slate-700">
      {/* Thumbnail */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 flex items-center justify-center">
        <img
          src={item.previewUrl}
          alt={`Anteprima ${item.file.name}`}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[10px] font-mono text-slate-300 uppercase">
          webp
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 w-full flex flex-col gap-1 text-center sm:text-left">
        <h3 className="text-sm font-semibold text-white truncate" title={item.file.name}>
          {item.file.name}
        </h3>
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-400">
          <span>{originalSizeStr}</span>
          <span>→</span>
          <span className="uppercase font-semibold text-fuchsia-400">{extension}</span>
          {convertedSizeStr && (
            <span className="text-slate-300 font-medium">({convertedSizeStr})</span>
          )}
        </div>

        {/* Status Message */}
        <div className="mt-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs">
          {item.status === 'idle' && (
            <span className="text-slate-400">In attesa...</span>
          )}
          {item.status === 'converting' && (
            <span className="inline-flex items-center gap-1.5 text-fuchsia-400 font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              Conversione in corso...
            </span>
          )}
          {item.status === 'completed' && (
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              Pronto per il download
            </span>
          )}
          {item.status === 'error' && (
            <span className="inline-flex items-center gap-1.5 text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
              {item.errorMessage || 'Errore nella conversione'}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {item.status === 'completed' && (
          <button
            type="button"
            onClick={() => onDownload(item)}
            className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 shadow-md shadow-fuchsia-950/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 active:scale-95"
            aria-label={`Scarica ${item.file.name} come ${extension.toUpperCase()}`}
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Scarica</span>
          </button>
        )}

        {item.status === 'error' && (
          <button
            type="button"
            onClick={() => onRetry(item.id)}
            className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-semibold inline-flex items-center justify-center gap-1.5 border border-rose-900/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            aria-label={`Riprova conversione per ${item.file.name}`}
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Riprova</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-700/60 hover:border-rose-800/50 transition-colors inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          aria-label={`Rimuovi ${item.file.name} dalla lista`}
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
