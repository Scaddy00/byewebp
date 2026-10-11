// Background Service Worker for ZapWebp Extension (Manifest V3)

const MENU_PNG_ID = 'zapwebp_save_png';
const MENU_JPG_ID = 'zapwebp_save_jpg';
const OFFSCREEN_DOCUMENT_PATH = 'src/offscreen.html';

// 1. Setup Context Menus on Installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_PNG_ID,
    title: 'ZapWebp: Save image as PNG',
    contexts: ['image'],
  });

  chrome.contextMenus.create({
    id: MENU_JPG_ID,
    title: 'ZapWebp: Save image as JPG',
    contexts: ['image'],
  });
});

// 2. Handle Context Menu Clicks
chrome.contextMenus.onClicked.addListener(async (info, _tab) => {
  const { menuItemId, srcUrl } = info;
  if (!srcUrl) return;

  let targetFormat = null;
  if (menuItemId === MENU_PNG_ID) {
    targetFormat = 'png';
  } else if (menuItemId === MENU_JPG_ID) {
    targetFormat = 'jpeg';
  }

  if (!targetFormat) return;

  try {
    await ensureOffscreenDocument();

    const response = await chrome.runtime.sendMessage({
      target: 'offscreen',
      action: 'convert_image',
      srcUrl,
      format: targetFormat,
    });

    if (response && response.success && response.dataUrl) {
      await chrome.downloads.download({
        url: response.dataUrl,
        filename: response.filename,
        saveAs: false,
      });
    } else {
      const errorMsg = response && response.error ? response.error : 'Could not convert image';
      console.error('[ZapWebp] Conversion failed:', errorMsg);
      showNotification('Conversion Failed', `Could not convert image: ${errorMsg}`);
    }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[ZapWebp] Error processing context menu image:', err);
    showNotification('Conversion Error', errorMsg);
  }
});

function showNotification(title, message) {
  if (typeof chrome.notifications !== 'undefined') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon-48.png',
      title: `ZapWebp: ${title}`,
      message: message,
    });
  }
}

// 3. Ensure Offscreen Document Exists
let creatingOffscreenPromise = null;

async function ensureOffscreenDocument() {
  if (typeof chrome.offscreen === 'undefined') {
    throw new Error('chrome.offscreen API is not supported in this browser version');
  }

  // Check if existing offscreen document exists
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)],
  });

  if (existingContexts.length > 0) {
    return;
  }

  if (creatingOffscreenPromise) {
    await creatingOffscreenPromise;
    return;
  }

  creatingOffscreenPromise = chrome.offscreen.createDocument({
    url: OFFSCREEN_DOCUMENT_PATH,
    reasons: ['DOM_PARSER', 'BLOBS'],
    justification: 'ZapWebp needs Canvas 2D to re-encode web images locally without uploading to servers.',
  });

  await creatingOffscreenPromise;
  creatingOffscreenPromise = null;
}
