import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: FileList | File[]) => void;
  disabled?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
      e.target.value = ''; // Reset to allow re-uploading same file
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Trascina qui i tuoi file WebP o clicca per sfogliare"
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full max-w-xl mx-auto rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 ${
        disabled
          ? 'opacity-50 cursor-not-allowed border-slate-800 bg-slate-900/30'
          : isDragOver
          ? 'border-fuchsia-500 bg-fuchsia-950/20 shadow-xl shadow-fuchsia-950/40 scale-[1.01]'
          : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80 shadow-md'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".webp,image/webp,image/*"
        onChange={handleFileInputChange}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div
        className={`p-4 rounded-2xl transition-colors duration-200 ${
          isDragOver
            ? 'bg-fuchsia-900/40 text-fuchsia-300'
            : 'bg-slate-800/80 text-slate-300'
        }`}
      >
        {isDragOver ? (
          <UploadCloud className="w-10 h-10 animate-bounce" aria-hidden="true" />
        ) : (
          <ImageIcon className="w-10 h-10 text-fuchsia-400" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-base sm:text-lg font-bold text-white">
          Trascina qui i file <span className="text-fuchsia-400">.webp</span> o clicca per selezionare
        </p>
        <p className="text-xs sm:text-sm text-slate-400">
          Supporta caricamento singolo o batch • Nessun limite di dimensione
        </p>
      </div>

      <div className="mt-2 inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors">
        Sfoglia dal dispositivo
      </div>
    </div>
  );
};
