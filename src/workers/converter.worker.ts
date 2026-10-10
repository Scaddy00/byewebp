import type { WorkerInputMessage, WorkerOutputMessage } from '../types/converter';

self.onmessage = async (event: MessageEvent<WorkerInputMessage>) => {
  const { id, fileBlob, format, quality } = event.data;

  try {
    const bitmap = await createImageBitmap(fileBlob);
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

    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const outputBlob = await canvas.convertToBlob({
      type: mimeType,
      quality: format === 'jpeg' ? Math.max(0.1, Math.min(1.0, quality)) : undefined,
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
