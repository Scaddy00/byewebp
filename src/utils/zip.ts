import JSZip from 'jszip';
import type { ImageItem } from '../types/converter';

function getTimestampString(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

export async function downloadZipArchive(
  items: ImageItem[],
  customPrefix = 'zapwebp'
): Promise<void> {
  const completedItems = items.filter(
    (item) => item.status === 'completed' && item.convertedBlob
  );

  if (completedItems.length === 0) {
    return;
  }

  const zip = new JSZip();
  const usedNames = new Set<string>();

  completedItems.forEach((item) => {
    if (!item.convertedBlob) return;

    const baseName = item.file.name.replace(/\.[^/.]+$/, '');
    const extension = item.targetFormat === 'jpeg' ? 'jpg' : item.targetFormat;
    let targetFileName = `${baseName}.${extension}`;

    // Deduplicate file names if user uploaded identically named files
    let counter = 2;
    while (usedNames.has(targetFileName)) {
      targetFileName = `${baseName}_${counter}.${extension}`;
      counter++;
    }
    usedNames.add(targetFileName);

    zip.file(targetFileName, item.convertedBlob);
  });

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const downloadUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = `${customPrefix}-${getTimestampString()}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke object URL after trigger
  setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 1000);
}
