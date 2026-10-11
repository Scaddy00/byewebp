<div align="center">

# ⚡ WebpSnap

**Ultra-fast, 100% client-side WebP to PNG/JPG image converter & privacy metadata stripper.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side-emerald.svg)](https://github.com)

[Live Demo (Cloudflare Pages)](https://webpsnap.pages.dev) • [Report Bug](https://github.com/scaddy/webpsnap/issues) • [Request Feature](https://github.com/scaddy/webpsnap/issues)

</div>

---

## 🌟 Why WebpSnap?

Most online image converters are bloated, slow, rate-limited, and filled with deceptive ads. Worse, they **upload your personal photos to third-party remote servers** to process them.

**WebpSnap changes that:**
- **Zero Upload:** Your files **never leave your browser or device**. Processing happens entirely in local RAM and CPU.
- **Hardware Acceleration:** Native `OffscreenCanvas` rendering offloaded to dedicated Web Workers (<100ms per image).
- **Zero Tracking & No Accounts:** No registration, no cookies, no tracking scripts, no file size limits.
- **Batch ZIP Download:** Convert dozens of images at once and grab them in a single compressed `.zip` archive via `JSZip`.
- **EXIF Metadata Stripper:** Automatically strip sensitive GPS coordinates, timestamps, and device info.

---

## ✨ Features

- 🔄 **Lossless PNG & Compressed JPG:** Convert `.webp` to high-fidelity PNG or customizable JPG (60% to 100% compression slider with automatic white background fill for transparency).
- 🧵 **Multi-Threaded Web Worker Engine:** Image decoding and rasterization are executed in an isolated background thread, ensuring a buttery-smooth 60fps UI with zero frame drops.
- 📦 **Batch Queue & ZIP Download:** Drop multiple files simultaneously; download individually or export all as a timestamped archive (`webpsnap-YYYYMMDD.zip`).
- 🛡️ **Privacy Mode (EXIF Stripping):** Toggleable EXIF metadata stripper to sanitize private photos before sharing online.
- 🎨 **Modern Accessible UI:** Dark mode with Ryu brand aesthetics (fuchsia/rose accents), fully compliant with WCAG 2.1 AA standards (keyboard navigable, 44px touch targets, screen-reader friendly).
- 📱 **Responsive Design:** Optimized layout for all screens, from desktop workstations down to mobile viewports (375px).

---

## 🏗️ Architecture & How It Works

```
               [ User Drops .webp Files ]
                           │
                           ▼
               [ React 19 UI (DropZone) ]
                           │
              (ArrayBuffer / File Blob)
                           ▼
               [ Web Worker Thread ]
           ┌───────────────┴───────────────┐
           ▼                               ▼
    [ ImageBitmap ]                 [ OffscreenCanvas ]
  (Hardware decoding)             (Zero main-thread blocking)
           │                               │
           └───────────────┬───────────────┘
                           │
      (Canvas rasterization + Alpha fallback for JPG)
                           │
                           ▼
              [ Blob (PNG / JPEG) ]
                           │
                           ▼
          [ useWebpConverter Hook ]
        (Queue management: Max 3 concurrent)
        (URL.revokeObjectURL memory cleanup)
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    [ Single Download ]         [ JSZip In-Memory Archiver ]
  (Immediate file save)          (DEFLATE level 6 batch .zip)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/scaddy/webpsnap.git
   cd webpsnap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The static distribution files will be generated in `dist/`.

---

## 🚢 Deployment

Because **WebpSnap** is 100% static and client-side, it costs **$0 to host** with unlimited bandwidth.

### Recommended: Cloudflare Pages

1. Fork or push this repository to GitHub.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select `webpsnap`.
4. Build configuration:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**. Your site will be live worldwide on Cloudflare's Edge CDN with automated SSL in ~20 seconds.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Archiving:** [JSZip](https://stuk.github.io/jszip/)
- **Linter:** [Oxlint](https://oxc.rs/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal and commercial use.
