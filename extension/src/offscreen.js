// Offscreen Document script: converts web images to PNG or JPG via Canvas
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.target !== 'offscreen' || message.action !== 'convert_image') {
    return false;
  }

  handleConversion(message.srcUrl, message.format)
    .then((result) => sendResponse({ success: true, dataUrl: result.dataUrl, filename: result.filename }))
    .catch((error) => sendResponse({ success: false, error: error.message }));

  return true; // Keep message channel open for async response
});

async function handleConversion(srcUrl, format) {
  // 1. Fetch image binary
  const response = await fetch(srcUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: HTTP ${response.status}`);
  }

  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  const { width, height } = bitmap;

  // 2. Setup canvas
  const canvas = document.getElementById('conversion-canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('Could not get 2D canvas context');
  }

  // Clear previous canvas data
  ctx.clearRect(0, 0, width, height);

  // If converting to JPEG, fill transparent areas with clean white
  if (format === 'jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  // Draw bitmap
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  // 3. Export Data URL
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  const quality = format === 'jpeg' ? 0.92 : undefined;
  const dataUrl = canvas.toDataURL(mimeType, quality);

  // 4. Derive filename
  const filename = generateConvertedFilename(srcUrl, format);

  return { dataUrl, filename };
}

function generateConvertedFilename(srcUrl, format) {
  try {
    const urlObj = new URL(srcUrl);
    const pathname = urlObj.pathname;
    let baseName = pathname.substring(pathname.lastIndexOf('/') + 1).trim();

    // Remove query params or trailing special characters if any
    baseName = baseName.replace(/[^a-zA-Z0-9_-]/g, '_');

    // Remove existing extension
    const dotIndex = baseName.lastIndexOf('.');
    if (dotIndex > 0) {
      baseName = baseName.substring(0, dotIndex);
    }

    if (!baseName || baseName === '_') {
      baseName = 'zapwebp_image';
    }

    const ext = format === 'png' ? 'png' : 'jpg';
    return `${baseName}.${ext}`;
  } catch {
    const ext = format === 'png' ? 'png' : 'jpg';
    return `zapwebp_image_${Date.now()}.${ext}`;
  }
}
