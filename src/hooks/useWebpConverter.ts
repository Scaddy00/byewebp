import { useState, useEffect, useRef, useCallback } from 'react';
import type {
  ImageItem,
  TargetFormat,
  WorkerInputMessage,
  WorkerOutputMessage,
} from '../types/converter';

const MAX_CONCURRENT = 3;

export function useWebpConverter() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [format, setFormat] = useState<TargetFormat>('png');
  const [quality, setQuality] = useState<number>(0.92);
  const [stripExif, setStripExif] = useState<boolean>(true);

  const workerRef = useRef<Worker | null>(null);
  const activeIdsRef = useRef<Set<string>>(new Set());
  const itemsRef = useRef<ImageItem[]>(items);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Initialize Web Worker
  useEffect(() => {
    const worker = new Worker(
      new URL('../workers/converter.worker.ts', import.meta.url),
      { type: 'module' }
    );
    const activeIds = activeIdsRef.current;

    worker.onmessage = (event: MessageEvent<WorkerOutputMessage>) => {
      const result = event.data;
      activeIds.delete(result.id);

      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id !== result.id) return item;

          if (result.success) {
            const convertedUrl = URL.createObjectURL(result.blob);
            return {
              ...item,
              status: 'completed',
              convertedBlob: result.blob,
              convertedUrl,
              convertedSize: result.size,
            };
          } else {
            return {
              ...item,
              status: 'error',
              errorMessage: result.error,
            };
          }
        })
      );
    };

    workerRef.current = worker;

    return () => {
      worker.terminate();
      workerRef.current = null;
      activeIds.clear();
      // Revoke all created URLs to avoid memory leaks
      itemsRef.current.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
        if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
      });
    };
  }, []);

  // Process conversion queue up to MAX_CONCURRENT
  useEffect(() => {
    if (!workerRef.current) return;

    const availableSlots = MAX_CONCURRENT - activeIdsRef.current.size;
    if (availableSlots <= 0) return;

    const pendingItems = items.filter(
      (item) => item.status === 'idle' && !activeIdsRef.current.has(item.id)
    );

    if (pendingItems.length === 0) return;

    const itemsToProcess = pendingItems.slice(0, availableSlots);

    itemsToProcess.forEach((item) => {
      activeIdsRef.current.add(item.id);

      const message: WorkerInputMessage = {
        id: item.id,
        fileBlob: item.file,
        fileName: item.file.name,
        format: item.targetFormat,
        quality,
        stripExif,
      };

      workerRef.current?.postMessage(message);
    });

    setItems((prev) =>
      prev.map((item) => {
        if (itemsToProcess.some((p) => p.id === item.id)) {
          return { ...item, status: 'converting' };
        }
        return item;
      })
    );
  }, [items, quality, stripExif]);

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const newItems: ImageItem[] = [];

      fileArray.forEach((file) => {
        // Accept WebP files primarily, or common images
        const nameLower = file.name.toLowerCase();
        const isSupportedExt =
          nameLower.endsWith('.webp') ||
          nameLower.endsWith('.heic') ||
          nameLower.endsWith('.heif') ||
          nameLower.endsWith('.png') ||
          nameLower.endsWith('.jpg') ||
          nameLower.endsWith('.jpeg') ||
          nameLower.endsWith('.avif') ||
          nameLower.endsWith('.gif') ||
          nameLower.endsWith('.bmp') ||
          nameLower.endsWith('.svg');

        if (!isSupportedExt && !file.type.startsWith('image/')) {
          return;
        }

        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        const previewUrl = URL.createObjectURL(file);

        newItems.push({
          id,
          file,
          previewUrl,
          status: 'idle',
          targetFormat: format,
          stripExif,
        });
      });

      if (newItems.length > 0) {
        setItems((prev) => [...prev, ...newItems]);
      }
    },
    [format, stripExif]
  );

  const removeFile = useCallback((id: string) => {
    activeIdsRef.current.delete(id);
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.convertedUrl) URL.revokeObjectURL(target.convertedUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    activeIdsRef.current.clear();
    items.forEach((item) => {
      URL.revokeObjectURL(item.previewUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setItems([]);
  }, [items]);

  const changeFormat = useCallback((newFormat: TargetFormat) => {
    setFormat(newFormat);
  }, []);

  const retryItem = useCallback(
    (id: string) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
            return {
              ...item,
              status: 'idle',
              targetFormat: format,
              stripExif,
              convertedBlob: undefined,
              convertedUrl: undefined,
              convertedSize: undefined,
              errorMessage: undefined,
            };
          }
          return item;
        })
      );
    },
    [format, stripExif]
  );

  return {
    items,
    format,
    quality,
    stripExif,
    setFormat: changeFormat,
    setQuality,
    setStripExif,
    addFiles,
    removeFile,
    clearAll,
    retryItem,
    isProcessing: items.some(
      (item) => item.status === 'converting' || item.status === 'idle'
    ),
  };
}
