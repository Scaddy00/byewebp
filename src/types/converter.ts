export type TargetFormat = 'png' | 'jpeg';

export interface ConversionOptions {
  format: TargetFormat;
  quality: number; // 0.1 to 1.0 (used for jpeg)
}

export type ItemStatus = 'idle' | 'converting' | 'completed' | 'error';

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  status: ItemStatus;
  targetFormat: TargetFormat;
  convertedBlob?: Blob;
  convertedUrl?: string;
  convertedSize?: number;
  errorMessage?: string;
}

export interface WorkerInputMessage {
  id: string;
  fileBlob: Blob;
  format: TargetFormat;
  quality: number;
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
