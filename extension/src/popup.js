// Script for extension popup
document.addEventListener('DOMContentLoaded', () => {
  // Ensure links open properly in a new browser tab from the popup
  const webappBtn = document.getElementById('open-webapp-link');
  const kofiBtn = document.getElementById('open-kofi-link');

  if (webappBtn) {
    webappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.create({ url: 'https://zapwebp.pages.dev' });
      } else {
        window.open('https://zapwebp.pages.dev', '_blank');
      }
    });
  }

  if (kofiBtn) {
    kofiBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.create({ url: 'https://ko-fi.com/scaddy00' });
      } else {
        window.open('https://ko-fi.com/scaddy00', '_blank');
      }
    });
  }
});
