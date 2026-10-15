import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight, Zap, AlertTriangle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { ALL_TOOLS } from '../data/toolsData';

export default function NotFoundPage() {
  const popularTools = ALL_TOOLS.filter((t) => t.featured).slice(0, 4);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center bg-slate-50/50">
      <SEOHead
        title="Page Not Found (404) - PhotoKB"
        description="The page you are looking for does not exist or has been moved. Explore our free in-browser image tools and calculators."
        canonical="/404"
        noindex={true}
      />

      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5 shadow-xs">
        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
        Error 404 • Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight max-w-xl">
        Oops! We can't find that page.
      </h1>

      <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mt-2 leading-relaxed">
        The link you followed may be broken, or the page may have been moved or removed. Check out our most popular tools below.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/tools"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs sm:text-sm font-bold rounded-xl shadow-2xs transition-colors"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span>Browse All 50+ Tools</span>
        </Link>
      </div>

      {/* Popular Tools Fallback Grid */}
      <div className="max-w-3xl w-full mt-10 pt-8 border-t border-slate-200">
        <h2 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">
          Or jump into a popular free tool:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.route}
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
