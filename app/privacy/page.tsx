import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | PhotoKB',
  description: 'PhotoKB privacy policy. We operate with a strict zero-data-retention principle because all image processing occurs client-side in your web browser.',
  alternates: {
    canonical: 'https://photokb.net/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="border-b border-slate-200/60 bg-white/60 py-2 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs font-semibold text-slate-500 sm:px-6 lg:px-8 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-200">Privacy Policy</span>
        </div>
      </div>

      <section className="py-6 sm:py-7">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            Zero-Knowledge In-Browser Privacy
          </div>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-1 text-xs text-slate-500">Last Updated: October 2026</p>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Core Privacy Principle: Zero Image Uploads</h2>
            <p>
              At PhotoKB (https://photokb.net), your privacy is our top engineering priority. Unlike conventional online file converters that upload your photographs, government identity cards, or signatures to remote cloud servers, <strong>PhotoKB performs 100% of image compression, resizing, and conversion locally inside your web browser</strong>.
            </p>
            <p>
              Your files never traverse the internet, are never stored on any server, and cannot be accessed or viewed by our team or any third party.
            </p>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Information We Do Not Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>We do not collect or view your photos, signatures, or documents.</li>
              <li>We do not require account registration or passwords.</li>
              <li>We do not store biometric data or EXIF location metadata.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Local Storage</h2>
            <p>
              PhotoKB uses your browser&apos;s local storage strictly for preserving user interface preferences, such as your chosen theme (Dark Mode / Light Mode). No tracking identifiers are stored.
            </p>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Contact Information</h2>
            <p>
              If you have any questions regarding this Privacy Policy, you may contact our engineering team at support@photokb.net.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
