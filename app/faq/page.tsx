import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { FaqAccordion } from '@/components/FaqAccordion';
import { SeoSchema } from '@/components/SeoSchema';
import { InternalLinks } from '@/components/InternalLinks';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | PhotoKB',
  description:
    'Got questions about image compression, 20 KB/50 KB requirements, dimensions in cm/inches, or privacy? Find all answers in the PhotoKB FAQ.',
  alternates: {
    canonical: 'https://photokb.net/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) - PhotoKB',
    description: 'Everything you need to know about photo compression, portal requirements, and browser privacy.',
    url: 'https://photokb.net/faq',
    type: 'website',
  },
};

const allFaqs = [
  {
    question: 'How do I compress an image to exactly 20 KB for online forms?',
    answer: 'Navigate to our Compress to 20 KB tool, drop your signature or photo, and PhotoKB automatically runs a binary-search canvas compression algorithm that iteratively balances quality and dimensions until the output strictly measures 20 KB or below.'
  },
  {
    question: 'Why do government portals like SSC, UPSC, and IBPS reject my photo?',
    answer: 'Government portal reject photos primarily due to three reasons: (1) File size is above 50 KB or below 20 KB, (2) Dimensions do not match the required aspect ratio (e.g., 3.5x4.5 cm), or (3) The file is in an unsupported format like PNG or WebP instead of standard JPEG.'
  },
  {
    question: 'Are my images and signatures saved on your servers?',
    answer: 'Never. PhotoKB executes 100% within your client browser using the HTML5 Canvas API. Your images, personal photos, and signatures never leave your device and are never sent across the internet.'
  },
  {
    question: 'What is the required size for candidate signatures on Indian competitive exams?',
    answer: 'Most exams (such as SSC CGL/CHSL, IBPS Bank PO, and UPSC) require signatures between 10 KB and 20 KB with pixel dimensions of approximately 140 x 60 pixels.'
  },
  {
    question: 'How do I resize an image in centimeters (cm) instead of pixels?',
    answer: 'Open our Image Resizer tool, switch the unit dropdown from pixels (px) to centimeters (cm), enter your required dimensions (e.g., 3.5 cm width and 4.5 cm height), and click Download.'
  },
  {
    question: 'Can I convert multiple images into a single PDF?',
    answer: 'Yes! Use our free JPG to PDF tool. You can select multiple JPG, PNG, or WebP images, reorder them, adjust margins, and export a clean PDF document directly in your browser.'
  },
  {
    question: 'Is PhotoKB completely free to use?',
    answer: 'Yes, PhotoKB is 100% free with no registration, no hidden subscriptions, and no watermarks.'
  }
];

export default function FaqPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://photokb.net/' },
    { name: 'FAQ', url: 'https://photokb.net/faq' }
  ];

  return (
    <>
      <SeoSchema
        type="faq"
        title="Frequently Asked Questions - PhotoKB"
        description="Clear answers on in-browser compression, government portal guidelines, and quality preservation."
        url="https://photokb.net/faq"
        breadcrumbs={breadcrumbs}
        faqs={allFaqs}
      />

      <div className="border-b border-slate-200/60 bg-white/60 py-2 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs font-semibold text-slate-500 sm:px-6 lg:px-8 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-200">FAQ</span>
        </div>
      </div>

      <section className="py-6 sm:py-7">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FaqAccordion
            items={allFaqs}
            title="Frequently Asked Questions"
            subtitle="Find quick, authoritative answers to common questions about image compression, portal size guidelines, and security."
          />

          <div className="mt-5 sm:mt-6">
            <InternalLinks title="Explore Popular PhotoKB Tools" />
          </div>
        </div>
      </section>
    </>
  );
}
