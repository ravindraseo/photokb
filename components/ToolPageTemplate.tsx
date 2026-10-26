import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Layers,
  ChevronRight,
  Check
} from 'lucide-react';
import { ImageProcessor } from '@/components/ImageProcessor';
import { FaqAccordion } from '@/components/FaqAccordion';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';
import { InternalLinks } from '@/components/InternalLinks';
import { SeoSchema } from '@/components/SeoSchema';
import { ToolData } from '@/lib/tools-data';

interface ToolPageTemplateProps {
  tool: ToolData;
}

export function ToolPageTemplate({ tool }: ToolPageTemplateProps) {
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

      {/* Hero & Interactive Tool Section */}
      <section className="relative overflow-hidden py-5 sm:py-6 md:py-7">
        {/* Ambient Light */}
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-[600px] -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-950/20" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-extrabold text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              100% IN-BROWSER • INSTANT DOWNLOAD
            </div>

            <h1 className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
              {tool.h1}
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {tool.subtitle}
            </p>
          </div>

          {/* Interactive Processor Tool */}
          <div className="mt-5">
            <ImageProcessor
              defaultTargetKB={tool.targetKB || 50}
              showSideHeroCard={true}
            />
          </div>
        </div>
      </section>

      {/* Specifications & Overview */}
      <section className="border-t border-slate-200/80 bg-white py-6 sm:py-7 dark:border-slate-800/80 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Technical Specs Table */}
            <div className="lg:col-span-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Technical Specifications & Format Limits
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Calibrated to meet strict administrative portal guidelines and high-resolution print standards.
              </p>

              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody>
                    {tool.specs.map((spec, i) => (
                      <tr
                        key={i}
                        className="border-b border-slate-200/80 last:border-b-0 dark:border-slate-800"
                      >
                        <td className="px-4 py-2.5 font-bold text-slate-800 dark:text-slate-200">
                          {spec.label}
                        </td>
                        <td className="px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Security badges */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  Client-side processing only
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Instant &lt; 0.5s execution
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-blue-500" />
                  No wait queues
                </span>
              </div>
            </div>

            {/* Right: Key Features */}
            <div className="lg:col-span-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Why Choose PhotoKB&apos;s {tool.title}?
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Engineered with high-fidelity canvas algorithms to avoid pixel distortion and rejection errors.
              </p>

              <div className="mt-4 space-y-2">
                {tool.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Guide: How to Use */}
      <section className="py-6 sm:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              How to Use {tool.title} in 3 Simple Steps
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              No technical skills needed. Complete your compression in under 5 seconds.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {tool.steps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white shadow-md shadow-blue-500/25">
                  0{idx + 1}
                </div>
                <h3 className="mt-2.5 text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Exam & Portal Use Cases */}
      {tool.useCases.length > 0 && (
        <section className="border-t border-slate-200/80 bg-white py-6 sm:py-7 dark:border-slate-800/80 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Common Use Cases & Supported Portals
              </h2>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                Pre-configured to strictly comply with official examination authorities and government platforms.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {tool.useCases.map((uc, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {uc.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {uc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* YouTube Video Guide Section */}
      {tool.youtubeId && (
        <section className="py-6 sm:py-7">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <YouTubeEmbed
              videoId={tool.youtubeId}
              title={tool.youtubeTitle || `Video Guide: How to use ${tool.title}`}
              subtitle="Watch this quick demonstration to learn how to prepare your image correctly."
            />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {tool.faqs.length > 0 && (
        <section className="border-t border-slate-200/80 bg-white py-6 sm:py-7 dark:border-slate-800/80 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FaqAccordion
              items={tool.faqs}
              title={`Frequently Asked Questions about ${tool.title}`}
              subtitle="Answers to common questions regarding specifications, rejection errors, and resolution."
            />
          </div>
        </section>
      )}

      {/* Internal Links & Contextual Crawling */}
      <section className="py-6 sm:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InternalLinks
            currentSlug={tool.slug}
            relatedTools={tool.relatedTools}
            title={`More Image Optimization Tools Related to ${tool.title}`}
          />
        </div>
      </section>
    </>
  );
}
