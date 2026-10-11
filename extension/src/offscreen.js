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
  const canvas = document.getElementById('conversion-canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get 2D canvas context');
  }

  let width = 0;
  let height = 0;
  let drawSource = null;
  let isBitmap = false;

  // Strategy 1: Try fetch + createImageBitmap (fastest & handles headers with host_permissions)
  try {
    const response = await fetch(srcUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    width = bitmap.width;
    height = bitmap.height;
    drawSource = bitmap;
    isBitmap = true;
  } catch (fetchErr) {
    console.warn('[ZapWebp Offscreen] Fetch failed, falling back to HTMLImageElement:', fetchErr);
    // Strategy 2: Fallback to HTMLImageElement
    const img = await loadImageElement(srcUrl);
    width = img.naturalWidth || img.width;
    height = img.naturalHeight || img.height;
    drawSource = img;
  }

  if (!width || !height || !drawSource) {
    throw new Error('Failed to decode image dimensions');
  }

  canvas.width = width;
  canvas.height = height;

  // Clear previous canvas
  ctx.clearRect(0, 0, width, height);

  // If converting to JPEG, fill transparent background with clean white
  if (format === 'jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  // Draw source image
  ctx.drawImage(drawSource, 0, 0);

  if (isBitmap && drawSource.close) {
    drawSource.close();
  }

  // Export Data URL
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  const quality = format === 'jpeg' ? 0.92 : undefined;
  const dataUrl = canvas.toDataURL(mimeType, quality);

  const filename = generateConvertedFilename(srcUrl, format);
  return { dataUrl, filename };
}

function loadImageElement(srcUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Retry once without crossOrigin in case host rejects CORS header
      const fallbackImg = new Image();
      fallbackImg.onload = () => resolve(fallbackImg);
      fallbackImg.onerror = (e) => reject(new Error('Image failed to load via DOM element: ' + (e.message || 'Network error')));
      fallbackImg.src = srcUrl;
    };
    img.src = srcUrl;
  });
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
