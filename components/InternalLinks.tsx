import React from 'react';
import Link from 'next/link';
import { ArrowRight, Link2 } from 'lucide-react';

interface RelatedTool {
  slug: string;
  name: string;
  desc?: string;
}

interface InternalLinksProps {
  currentSlug?: string;
  relatedTools?: RelatedTool[];
  title?: string;
}

export function InternalLinks({
  currentSlug,
  relatedTools,
  title = 'Related Tools & Resources'
}: InternalLinksProps) {
  const defaultTools = [
    { slug: 'compress-to-20kb', name: 'Compress to 20 KB', desc: 'Exact size for SSC & UPSC signatures' },
    { slug: 'compress-to-50kb', name: 'Compress to 50 KB', desc: 'Passport & candidate photo resizer' },
    { slug: 'compress-to-100kb', name: 'Compress to 100 KB', desc: 'High quality certificates & documents' },
    { slug: 'image-resizer', name: 'Image Resizer', desc: 'Custom width & height in px, cm, inch' },
    { slug: 'passport-photo-maker', name: 'Passport Photo Maker', desc: 'Official 3.5x4.5 cm and 2x2 inch standards' },
    { slug: 'image-converter', name: 'Image Converter', desc: 'Convert JPG, PNG, and WebP instantly' },
    { slug: 'jpg-to-pdf', name: 'JPG to PDF', desc: 'Combine multiple photos into one PDF' }
  ];

  const toolsToShow = relatedTools || defaultTools.filter(t => t.slug !== currentSlug);

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
        <Link2 className="h-4 w-4" />
        <span>Contextual Quick Links</span>
      </div>
      <h3 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
        {title}
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {toolsToShow.map((item) => (
          <Link
            key={item.slug}
            href={`/${item.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {item.name}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600 dark:text-slate-500" />
              </div>
              {item.desc && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              )}
            </div>
            <div className="mt-3 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              Open Tool →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
