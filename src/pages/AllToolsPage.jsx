import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, LayoutGrid, Zap, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { ALL_TOOLS, CATEGORIES } from '../data/toolsData';
import SEOHead from '../components/SEOHead';

export default function AllToolsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setQuery(q);
  }, [searchParams]);

  const filteredTools = ALL_TOOLS.filter((tool) => {
    const matchesQuery =
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const allToolsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.photokb.net/tools#directory',
        name: 'All Online Tools Directory | PhotoKB',
        description: 'Complete catalogue of 50+ free in-browser tools categorized by Image Tools, PDF Tools, Calculators, Text Tools, SEO Tools, and Developer Tools.',
        url: 'https://www.photokb.net/tools',
        hasPart: ALL_TOOLS.map((t) => ({
          '@type': 'WebApplication',
          name: t.name,
          description: t.description,
          url: `https://www.photokb.net${t.route}`
        }))
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.photokb.net/tools#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.photokb.net/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://www.photokb.net/tools'
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-6 sm:pb-8">
      <SEOHead
        title="All Online Tools Directory"
        description="Complete catalogue of 50+ free in-browser tools categorized by Image Tools, PDF Tools, Calculators, Text Tools, SEO Tools, and Developer Tools."
        canonical="/tools"
        schema={allToolsSchema}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200 py-3.5 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[11px] font-bold mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Complete Directory of 50+ In-Browser Tools</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            All Online Tools
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-1">
            Explore our complete suite of free image converters, PDF editors, calculators, SEO generators, and developer helpers.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-4">
            <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-300 p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Search className="w-4 h-4 text-slate-400 ml-2.5 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchParams(e.target.value ? { q: e.target.value } : {});
                }}
                placeholder="Search across all 50+ tools..."
                className="w-full px-2.5 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                aria-label="Search all tools"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setSearchParams({}); }}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        {/* Category Pills Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Categories ({ALL_TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = ALL_TOOLS.filter((t) => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Tools Results Grid */}
        <div className="mt-3 sm:mt-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Showing {filteredTools.length} tools
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.route}
                  className="group bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Zap className="w-4 h-4" />
                      </div>
                      {tool.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs text-blue-600 font-semibold">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-800">No tools found</h3>
              <p className="text-xs text-slate-500 mt-1">
                No tools matched your search query "{query}".
              </p>
              <button
                onClick={() => { setQuery(''); setSelectedCategory('all'); }}
                className="mt-3 px-3.5 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
