import React from 'react';
import type { TargetFormat } from '../types/converter';
import { Sliders } from 'lucide-react';

interface FormatSelectorProps {
  format: TargetFormat;
  quality: number;
  onFormatChange: (format: TargetFormat) => void;
  onQualityChange: (quality: number) => void;
  disabled?: boolean;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  format,
  quality,
  onFormatChange,
  onQualityChange,
  disabled = false,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col gap-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="block text-sm font-semibold text-white">
            Formato di Destinazione
          </span>
          <span className="text-xs text-slate-400">
            Scegli come esportare le immagini convertite
          </span>
        </div>

        <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800" role="group" aria-label="Selettore formato">
          <button
            type="button"
            onClick={() => onFormatChange('png')}
            disabled={disabled}
            className={`min-h-[44px] min-w-[72px] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 disabled:opacity-50 disabled:cursor-not-allowed ${
              format === 'png'
                ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            aria-pressed={format === 'png'}
          >
            PNG
          </button>
          <button
            type="button"
            onClick={() => onFormatChange('jpeg')}
            disabled={disabled}
            className={`min-h-[44px] min-w-[72px] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 disabled:opacity-50 disabled:cursor-not-allowed ${
              format === 'jpeg'
                ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            aria-pressed={format === 'jpeg'}
          >
            JPG
          </button>
        </div>
      </div>

      {format === 'jpeg' && (
        <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="quality-slider"
              className="text-xs font-medium text-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-fuchsia-400" aria-hidden="true" />
              Qualità compressione JPG
            </label>
            <span className="text-xs font-bold text-fuchsia-400 font-mono">
              {Math.round(quality * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 font-medium">Compatto (60%)</span>
            <input
              id="quality-slider"
              type="range"
              min="0.6"
              max="1.0"
              step="0.05"
              value={quality}
              disabled={disabled}
              onChange={(e) => onQualityChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-fuchsia-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 min-h-[44px]"
            />
            <span className="text-[11px] text-slate-500 font-medium">Massima (100%)</span>
          </div>
        </div>
      )}
    </div>
  );
};
