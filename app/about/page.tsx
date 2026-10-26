import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Heart, Globe, Award, ChevronRight } from 'lucide-react';
import { InternalLinks } from '@/components/InternalLinks';

export const metadata: Metadata = {
  title: 'About Us | PhotoKB',
  description: 'Learn about PhotoKB: our mission to provide lightning-fast, 100% private in-browser image optimization tools for candidates, students, and professionals.',
  alternates: {
    canonical: 'https://photokb.net/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-slate-200/60 bg-white/60 py-2 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs font-semibold text-slate-500 sm:px-6 lg:px-8 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-200">About Us</span>
        </div>
      </div>

      <section className="py-6 sm:py-7">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              About <span className="text-blue-600 dark:text-blue-400">PhotoKB</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              The privacy-first image suite designed to give every photo the perfect size.
            </p>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              PhotoKB was created to solve a persistent frustration faced by millions of candidates, students, job seekers, and web creators worldwide: <strong>online form photo size rejection</strong>.
            </p>

            <p>
              When applying for competitive examinations (like SSC, UPSC, IBPS, NEET), visas, or identity cards, users are repeatedly prompted with strict warnings like <em>&ldquo;Photo must be between 20 KB and 50 KB&rdquo;</em> or <em>&ldquo;Signature must not exceed 20 KB&rdquo;</em>. Most legacy tools require uploading private pictures to insecure third-party servers or downloading ad-heavy software.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 my-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">100% Client-Side</h3>
                <p className="mt-0.5 text-xs text-slate-500">Zero file uploads to external servers.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">Sub-Second Speed</h3>
                <p className="mt-0.5 text-xs text-slate-500">Canvas binary search algorithms.</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">100% Free Forever</h3>
                <p className="mt-0.5 text-xs text-slate-500">No watermarks, no registration.</p>
              </div>
            </div>

            <h2 className="text-xl font-black text-slate-900 dark:text-white">Our Technology Guarantee</h2>
            <p>
              PhotoKB uses standard HTML5 Canvas and modern WebAssembly features that run locally inside your browser sandbox. When you compress or resize an image on PhotoKB, the processing takes place entirely on your device&apos;s processor (CPU/GPU). Your private documents, ID proofs, and signatures never leave your hardware.
            </p>
          </div>

          <div className="mt-6 sm:mt-8">
            <InternalLinks title="Try Our Popular Optimization Tools" />
          </div>
        </div>
      </section>
    </>
  );
}
