import type { WorkerInputMessage, WorkerOutputMessage } from '../types/converter';
import { heicTo } from 'heic-to/next';

self.onmessage = async (event: MessageEvent<WorkerInputMessage>) => {
  const { id, fileBlob, fileName, format, quality } = event.data;

  try {
    let bitmap: ImageBitmap;

    const isHeic =
      (fileName && (fileName.toLowerCase().endsWith('.heic') || fileName.toLowerCase().endsWith('.heif'))) ||
      fileBlob.type === 'image/heic' ||
      fileBlob.type === 'image/heif';

    if (isHeic) {
      bitmap = await heicTo({
        blob: fileBlob,
        type: 'bitmap',
      });
    } else {
      try {
        bitmap = await createImageBitmap(fileBlob);
      } catch {
        // Fallback: try heicTo in case HEIC format without proper extension/MIME
        bitmap = await heicTo({
          blob: fileBlob,
          type: 'bitmap',
        });
      }
    }

    const { width, height } = bitmap;

    if (typeof OffscreenCanvas === 'undefined') {
      throw new Error('OffscreenCanvas is not supported in this browser environment');
    }

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      bitmap.close();
      throw new Error('Failed to obtain 2D rendering context on canvas');
    }

    // For JPEG, transparent background turns black by default. Fill with clean white first.
    if (format === 'jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    let mimeType = 'image/png';
    let outputQuality: number | undefined = undefined;

    if (format === 'jpeg') {
      mimeType = 'image/jpeg';
      outputQuality = Math.max(0.1, Math.min(1.0, quality));
    } else if (format === 'webp') {
      mimeType = 'image/webp';
      outputQuality = Math.max(0.1, Math.min(1.0, quality));
    } else if (format === 'avif') {
      mimeType = 'image/avif';
      outputQuality = Math.max(0.1, Math.min(1.0, quality));
    }

    const outputBlob = await canvas.convertToBlob({
      type: mimeType,
      quality: outputQuality,
    });

    const response: WorkerOutputMessage = {
      id,
      success: true,
      blob: outputBlob,
      size: outputBlob.size,
    };

    self.postMessage(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown conversion error';
    const response: WorkerOutputMessage = {
      id,
      success: false,
      error: errorMessage,
    };
    self.postMessage(response);
  }
};
