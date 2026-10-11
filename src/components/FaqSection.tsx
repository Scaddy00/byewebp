import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is ZapWebp free and private?',
    answer:
      'Yes, ZapWebp is 100% free with no hidden paywalls, account registrations, or watermarks. All image conversions happen entirely client-side inside your browser via HTML5 Canvas and Web Workers. Your files are never sent to any remote server.',
  },
  {
    question: 'How does ZapWebp convert WebP to PNG or JPG without uploading?',
    answer:
      'ZapWebp leverages your browser’s native OffscreenCanvas and Web Worker APIs. The WebP image file is decoded directly into device memory as an ImageBitmap, rendered onto an isolated canvas, and re-encoded into PNG or JPG format locally without sending a single byte across the network.',
  },
  {
    question: 'What is EXIF metadata stripping and why does it matter?',
    answer:
      'EXIF metadata embedded in photos often reveals private personal information, including exact GPS geographic coordinates, capture date and time, and camera or smartphone hardware serial numbers. When Privacy Mode is active, ZapWebp rasterizes the image cleanly, stripping all tracking metadata for safe social sharing and publishing.',
  },
  {
    question: 'Can I convert multiple WebP images in batch?',
    answer:
      'Yes! You can drag and drop dozens of WebP files at the same time. ZapWebp converts them concurrently with automatic queuing, and provides a one-click ZIP download button so you can download all converted PNG or JPG images at once.',
  },
  {
    question: 'Are there any file size or conversion limits?',
    answer:
      'There are zero arbitrary file size limits or daily quotas. Because processing happens purely on your computer hardware rather than a shared server cluster, capacity is bounded only by your device’s available RAM and CPU power.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      className="w-full max-w-xl mx-auto mt-6 flex flex-col gap-4 text-left"
      aria-labelledby="faq-heading"
    >
      <div className="flex items-center gap-2 px-1">
        <HelpCircle className="w-5 h-5 text-fuchsia-400 shrink-0" aria-hidden="true" />
        <h2 id="faq-heading" className="text-base sm:text-lg font-bold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndices.includes(index);
          const questionId = `faq-q-${index}`;
          const answerId = `faq-a-${index}`;

          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden transition-colors hover:border-slate-700/80"
            >
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleIndex(index)}
                className="w-full min-h-[48px] px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-fuchsia-400' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className="px-4 sm:px-5 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
