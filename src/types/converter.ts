export type TargetFormat = 'png' | 'jpeg' | 'webp' | 'avif';

export interface ConversionOptions {
  format: TargetFormat;
  quality: number; // 0.1 to 1.0 (used for lossy formats: jpeg, webp, avif)
  stripExif: boolean;
}

export type ItemStatus = 'idle' | 'converting' | 'completed' | 'error';

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  status: ItemStatus;
  targetFormat: TargetFormat;
  stripExif?: boolean;
  convertedBlob?: Blob;
  convertedUrl?: string;
  convertedSize?: number;
  errorMessage?: string;
}

export interface WorkerInputMessage {
  id: string;
  fileBlob: Blob;
  fileName?: string;
  format: TargetFormat;
  quality: number;
  stripExif?: boolean;
}

export interface WorkerSuccessMessage {
  id: string;
  success: true;
  blob: Blob;
  size: number;
}

export interface WorkerErrorMessage {
  id: string;
  success: false;
  error: string;
}

export type WorkerOutputMessage = WorkerSuccessMessage | WorkerErrorMessage;
