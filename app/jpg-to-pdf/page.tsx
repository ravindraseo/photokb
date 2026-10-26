import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Sparkles, ShieldCheck, Zap, Clock, Check } from 'lucide-react';
import { TOOLS } from '@/lib/tools-data';
import { JpgToPdfTool } from '@/components/JpgToPdfTool';
import { FaqAccordion } from '@/components/FaqAccordion';
import { InternalLinks } from '@/components/InternalLinks';
import { SeoSchema } from '@/components/SeoSchema';

const tool = TOOLS['jpg-to-pdf'];

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: tool.keywords,
  alternates: {
    canonical: `https://photokb.net/${tool.slug}`,
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `https://photokb.net/${tool.slug}`,
    type: 'website',
  },
};

export default function JpgToPdfPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://photokb.net/' },
    { name: tool.title, url: `https://photokb.net/${tool.slug}` }
  ];

  return (
    <>
      <SeoSchema
        type="tool"
        title={tool.metaTitle}
        description={tool.metaDescription}
        url={`https://photokb.net/${tool.slug}`}
        breadcrumbs={breadcrumbs}
        faqs={tool.faqs}
      />

      {/* Breadcrumbs */}
      <div className="border-b border-slate-200/60 bg-white/60 py-2 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs font-semibold text-slate-500 sm:px-6 lg:px-8 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-200 truncate">{tool.title}</span>
        </div>
      </div>

      {/* Hero & Interactive Tool */}
      <section className="relative overflow-hidden py-5 sm:py-6 md:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-xs font-extrabold text-rose-700 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-300">
              <Sparkles className="h-3.5 w-3.5" />
              FREE ONLINE PDF CONVERTER
            </div>

            <h1 className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
              {tool.h1}
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {tool.subtitle}
            </p>
          </div>

          <div className="mt-5 mx-auto max-w-4xl">
            <JpgToPdfTool />
          </div>
        </div>
      </section>

      {/* Technical Specs & Features */}
      <section className="border-t border-slate-200/80 bg-white py-6 sm:py-7 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                PDF Layout & Export Specifications
              </h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody>
                    {tool.specs.map((spec, i) => (
                      <tr key={i} className="border-b border-slate-200/80 last:border-b-0 dark:border-slate-800">
                        <td className="px-4 py-2.5 font-bold text-slate-800 dark:text-slate-200">{spec.label}</td>
                        <td className="px-4 py-2.5 font-semibold text-rose-600 dark:text-rose-400">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Client-side PDF compiler
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-500" />
                  No file size caps
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Why Convert JPG to PDF with PhotoKB?
              </h2>
              <div className="mt-4 space-y-2">
                {tool.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-6 sm:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FaqAccordion items={tool.faqs} title="Frequently Asked Questions about JPG to PDF" />
        </div>
      </section>

      {/* Internal Links */}
      <section className="border-t border-slate-200/80 bg-white py-6 sm:py-7 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InternalLinks currentSlug={tool.slug} relatedTools={tool.relatedTools} />
        </div>
      </section>
    </>
  );
}
