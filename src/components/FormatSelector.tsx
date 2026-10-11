import React from 'react';
import type { TargetFormat } from '../types/converter';
import { Sliders, ShieldCheck } from 'lucide-react';

interface FormatSelectorProps {
  format: TargetFormat;
  quality: number;
  stripExif: boolean;
  onFormatChange: (format: TargetFormat) => void;
  onQualityChange: (quality: number) => void;
  onStripExifChange: (enabled: boolean) => void;
  disabled?: boolean;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  format,
  quality,
  stripExif,
  onFormatChange,
  onQualityChange,
  onStripExifChange,
  disabled = false,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col gap-4 shadow-xl">
      {/* Target Format Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="block text-sm font-semibold text-white">
            Target Format
          </span>
          <span className="text-xs text-slate-400">
            Choose output format for converted images
          </span>
        </div>

        <div
          className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800"
          role="group"
          aria-label="Format selector"
        >
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

      {/* JPG Quality Slider */}
      {format === 'jpeg' && (
        <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="quality-slider"
              className="text-xs font-medium text-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-fuchsia-400" aria-hidden="true" />
              JPG Quality
            </label>
            <span className="text-xs font-bold text-fuchsia-400 font-mono">
              {Math.round(quality * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 font-medium">Compact (60%)</span>
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
            <span className="text-[11px] text-slate-500 font-medium">Maximum (100%)</span>
          </div>
        </div>
      )}

      {/* EXIF Privacy Stripping Toggle */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4">
        <div className="flex items-start gap-2.5">
          <ShieldCheck
            className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${
              stripExif ? 'text-emerald-400' : 'text-slate-500'
            }`}
            aria-hidden="true"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200">
              Strip EXIF Metadata (Privacy Mode)
            </span>
            <span className="text-[11px] text-slate-400 leading-tight">
              Removes GPS location, capture date, and camera device details.
            </span>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={stripExif}
          aria-label="Toggle EXIF metadata stripping"
          disabled={disabled}
          onClick={() => onStripExifChange(!stripExif)}
          className="min-h-[44px] min-w-[48px] inline-flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            className={`relative inline-flex h-7 w-12 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
              stripExif ? 'bg-emerald-600' : 'bg-slate-800'
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                stripExif ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </span>
        </button>
      </div>
    </div>
  );
};
