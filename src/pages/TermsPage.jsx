import React from 'react';
import { FileText } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-14">
      <SEOHead 
        title="Terms of Service - PhotoKB" 
        description="Terms of service and license terms for using PhotoKB free online tools and utilities." 
        canonical="/terms" 
      />

      <div className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[11px] font-bold mb-2.5">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Usage Guidelines & Policy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-1.5 text-slate-500 text-xs sm:text-sm">Last updated: October 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8">
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PhotoKB ("the Service"), you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Free Use & License</h2>
            <p>
              PhotoKB provides all online tools completely free of charge for personal, academic, and commercial purposes. You are free to process, convert, edit, and download results without payment or attribution.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Prohibited Conduct</h2>
            <p>
              You agree not to misuse our platform by attempting to execute automated denial-of-service attacks, reverse engineer non-public backend interfaces, or upload malicious code intended to compromise client environments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Disclaimer of Warranties</h2>
            <p>
              The tools and services on PhotoKB are provided "as is" without warranty of any kind. While we strive for 100% accuracy in our calculators, converters, and algorithms, PhotoKB cannot be held liable for any damages resulting from using the site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
