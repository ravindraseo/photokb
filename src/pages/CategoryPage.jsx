import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_TOOLS, CATEGORIES } from '../data/toolsData';
import { ChevronRight, Zap, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const category = CATEGORIES.find((c) => c.id === categorySlug) || {
    id: categorySlug,
    name: categorySlug ? categorySlug.replace('-', ' ').toUpperCase() : 'Tools',
    description: 'Explore online tools in this category.'
  };

  const tools = ALL_TOOLS.filter((t) => t.category === categorySlug);

  const categorySchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `https://www.photokb.net/category/${categorySlug}#category`,
        name: `${category.name} - Free Online Utilities`,
        description: category.description,
        url: `https://www.photokb.net/category/${categorySlug}`,
        hasPart: tools.map((t) => ({
          '@type': 'WebApplication',
          name: t.name,
          description: t.description,
          url: `https://www.photokb.net${t.route}`
        }))
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://www.photokb.net/category/${categorySlug}#breadcrumb`,
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
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: `https://www.photokb.net/category/${categorySlug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-6 sm:pb-8">
      <SEOHead
        title={`${category.name} - Free Online Utilities`}
        description={category.description}
        canonical={`/category/${categorySlug}`}
        schema={categorySchema}
      />

      {/* Category Header */}
      <div className="bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/80 py-3.5 sm:py-4.5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1.5 text-[10px] sm:text-xs text-slate-500 mb-1.5 sm:mb-2 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <Link to="/tools" className="hover:text-blue-600">Categories</Link>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="font-semibold text-slate-800">{category.name}</span>
          </nav>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            {category.name}
          </h1>
          <p className="mt-0.5 text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
          {tools.length > 0 ? (
            tools.map((tool) => (
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
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-xs sm:text-sm text-slate-500">More tools are constantly being added to {category.name}!</p>
              <Link to="/tools" className="mt-2.5 inline-block px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">
                Browse All Tools
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
