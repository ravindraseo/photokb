import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use | PhotoKB',
  description: 'Terms and conditions for utilizing PhotoKB online image tools and services.',
  alternates: {
    canonical: 'https://photokb.net/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <div className="border-b border-slate-200/60 bg-white/60 py-2 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs font-semibold text-slate-500 sm:px-6 lg:px-8 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-200">Terms of Use</span>
        </div>
      </div>

      <section className="py-6 sm:py-7">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Terms of Use
          </h1>
          <p className="mt-1 text-xs text-slate-500">Effective Date: October 2026</p>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PhotoKB (https://photokb.net), you agree to be bound by these Terms of Use and all applicable laws and regulations.
            </p>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Free & Lawful Use</h2>
            <p>
              PhotoKB provides web-based image manipulation tools free of charge for personal, academic, and commercial purposes. Users agree not to utilize the service for processing unlawful, infringing, or malicious content.
            </p>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Disclaimer of Warranty</h2>
            <p>
              PhotoKB tools are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. While we calibrate all target sizes with mathematical rigor, candidates are responsible for verifying their final files against official portal requirements prior to submission.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
