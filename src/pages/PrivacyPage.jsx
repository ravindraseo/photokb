import React from 'react';
import SEOHead from '../components/SEOHead';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-14">
      <SEOHead 
        title="Privacy Policy - PhotoKB Client-Side Data Security" 
        description="PhotoKB privacy policy. We prioritize privacy with 100% in-browser processing, zero server storage, and no tracking." 
        canonical="/privacy-policy" 
      />

      <div className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-1.5 text-slate-500 text-xs sm:text-sm">Last updated: October 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8">
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Information We Do Not Collect</h2>
            <p>
              When you use our photo resizer, image compressor, PDF converters, or calculators:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>We <strong>do not</strong> upload, inspect, or retain your files on any remote server.</li>
              <li>We <strong>do not</strong> request your name, phone number, address, or credit card.</li>
              <li>We <strong>do not</strong> sell your data to third-party ad networks or brokers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Local Storage and Client Execution</h2>
            <p>
              All file conversions, resizing operations, and calculations execute entirely in your web browser's sandboxed JavaScript runtime environment. When you close or refresh the browser tab, any cached files are cleared automatically from memory.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Cookies & Analytics</h2>
            <p>
              We only use anonymous, aggregated traffic measurement solely to monitor performance, server uptime, and understand which tools are most helpful to users.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Contacting Us About Privacy</h2>
            <p>
              If you have any questions or feedback regarding our privacy practices, please contact us at <a href="mailto:support@photokb.com" className="text-blue-600 font-bold hover:underline">support@photokb.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
