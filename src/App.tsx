import { useState, useCallback } from 'react';
import { useWebpConverter } from './hooks/useWebpConverter';
import { Header } from './components/Header';
import { FormatSelector } from './components/FormatSelector';
import { DropZone } from './components/DropZone';
import { ImageQueue } from './components/ImageQueue';
import { FaqSection } from './components/FaqSection';
import { RecommendedTools } from './components/RecommendedTools';
import { Footer } from './components/Footer';
import { downloadZipArchive } from './utils/zip';
import type { ImageItem } from './types/converter';

export function App() {
  const {
    items,
    format,
    quality,
    stripExif,
    setFormat,
    setQuality,
    setStripExif,
    addFiles,
    removeFile,
    clearAll,
    retryItem,
    isProcessing,
  } = useWebpConverter();

  const [isZipping, setIsZipping] = useState(false);
  const [showDonationCallout, setShowDonationCallout] = useState(false);

  const handleDownloadItem = useCallback((item: ImageItem) => {
    if (!item.convertedUrl) return;
    const link = document.createElement('a');
    link.href = item.convertedUrl;
    const baseName = item.file.name.replace(/\.[^/.]+$/, '');
    const extension = item.targetFormat === 'png' ? 'png' : 'jpg';
    link.download = `${baseName}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleDownloadAll = useCallback(() => {
    const completedItems = items.filter(
      (item) => item.status === 'completed' && item.convertedUrl
    );

    completedItems.forEach((item, index) => {
      // Small staggered timeout to prevent browser download flood suppression
      setTimeout(() => {
        handleDownloadItem(item);
      }, index * 200);
    });
  }, [items, handleDownloadItem]);

  const handleDownloadZip = useCallback(async () => {
    setIsZipping(true);
    try {
      await downloadZipArchive(items);
      setShowDonationCallout(true);
    } catch (error) {
      console.error('Failed to generate ZIP archive:', error);
    } finally {
      setIsZipping(false);
    }
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between px-4 sm:px-6">
      <main className="w-full max-w-2xl flex flex-col items-center gap-6 sm:gap-8 flex-1">
        <Header />

        <FormatSelector
          format={format}
          quality={quality}
          stripExif={stripExif}
          onFormatChange={setFormat}
          onQualityChange={setQuality}
          onStripExifChange={setStripExif}
          disabled={isProcessing}
        />

        <DropZone onFilesSelected={addFiles} />

        <ImageQueue
          items={items}
          isZipping={isZipping}
          showDonationCallout={showDonationCallout}
          onDismissDonationCallout={() => setShowDonationCallout(false)}
          onDownload={handleDownloadItem}
          onDownloadAll={handleDownloadAll}
          onDownloadZip={handleDownloadZip}
          onRemove={removeFile}
          onRetry={retryItem}
          onClearAll={clearAll}
        />

        <RecommendedTools />

        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
