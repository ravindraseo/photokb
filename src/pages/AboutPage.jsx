import React from 'react';
import { ShieldCheck, Zap, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-14">
      <SEOHead 
        title="About PhotoKB - Free Online Tools for Everyone in USA" 
        description="Learn about PhotoKB, our mission to provide lightning-fast, 100% free client-side online tools with zero server storage and complete user privacy." 
        canonical="/about" 
      />

      <div className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 bg-rose-100 text-rose-700 rounded-full text-[11px] font-bold mb-3">
            <span>🇺🇸 Built for USA and Global Creators</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            About PhotoKB
          </h1>
          <p className="mt-2 text-slate-600 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our mission is simple: provide free, uncompromising, and lightning-fast digital utility tools that work directly in your browser without tracking or intrusive signups.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8 space-y-6 sm:space-y-8">
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Why We Built PhotoKB</h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            For years, simple tasks like resizing a passport photo, merging two PDF contracts, or calculating an exact age required either paid subscription software or sketchy websites riddled with malware, fake download buttons, and file-retention traps.
          </p>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            PhotoKB changes this forever by using modern WebAssembly and HTML5 Canvas client-side technology. When you use PhotoKB, the computation happens right inside your browser memory. Your confidential files never get transmitted across external servers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 pt-3">
            <div className="p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/80 text-center">
              <ShieldCheck className="w-7 h-7 text-emerald-600 mx-auto mb-1.5" />
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Zero Server Storage</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">100% Client-side sandbox</p>
            </div>
            <div className="p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/80 text-center">
              <Zap className="w-7 h-7 text-blue-600 mx-auto mb-1.5" />
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">Instant Execution</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">No queues or waiting rooms</p>
            </div>
            <div className="p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-200/80 text-center">
              <Award className="w-7 h-7 text-amber-500 mx-auto mb-1.5" />
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm">100% Free Forever</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">No subscriptions or credit cards</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/tools"
            className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 bg-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all"
          >
            <span>Explore All 50+ Tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
