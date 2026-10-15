import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { ALL_TOOLS } from '../data/toolsData';
import SEOHead from './SEOHead';

export default function ToolLayout({
  title,
  subtitle,
  category,
  categorySlug,
  children,
  howToSteps = [],
  features = [],
  faqs = [],
  seoContent = null,
  currentToolId
}) {
  const relatedTools = ALL_TOOLS.filter((t) => t.id !== currentToolId && (t.category === categorySlug || t.featured)).slice(0, 4);

  // Generate comprehensive Google-friendly structured data schema
  const toolCanonicalPath = `/${currentToolId}`;
  const toolUrl = `https://www.photokb.net${toolCanonicalPath}`;

  const schemaGraph = [
    {
      '@type': 'WebApplication',
      '@id': `${toolUrl}#webapp`,
      'name': title,
      'url': toolUrl,
      'description': subtitle,
      'applicationCategory': categorySlug === 'image-tools' ? 'PhotoApplication' : 'UtilitiesApplication',
      'operatingSystem': 'All',
      'browserRequirements': 'Requires JavaScript and HTML5 Canvas',
      'inLanguage': 'en-US',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${toolUrl}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://www.photokb.net/'
        },
        ...(categorySlug ? [{
          '@type': 'ListItem',
          'position': 2,
          'name': category || 'Tools',
          'item': `https://www.photokb.net/category/${categorySlug}`
        }] : [{
          '@type': 'ListItem',
          'position': 2,
          'name': 'Tools',
          'item': 'https://www.photokb.net/tools'
        }]),
        {
          '@type': 'ListItem',
          'position': 3,
          'name': title,
          'item': toolUrl
        }
      ]
    }
  ];

  if (faqs && faqs.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      '@id': `${toolUrl}#faq`,
      'mainEntity': faqs.map((f) => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer
        }
      }))
    });
  }

  if (howToSteps && howToSteps.length > 0) {
    schemaGraph.push({
      '@type': 'HowTo',
      '@id': `${toolUrl}#howto`,
      'name': `How to Use ${title}`,
      'description': subtitle,
      'step': howToSteps.map((step, idx) => ({
        '@type': 'HowToStep',
        'position': idx + 1,
        'name': step.title,
        'text': step.desc
      }))
    });
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': schemaGraph
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-6 sm:pb-8">
      {/* Dynamic SEO Meta */}
      <SEOHead 
        title={title} 
        description={subtitle} 
        canonical={toolCanonicalPath}
        schema={structuredData}
      />

      {/* Breadcrumb & Header Banner */}
      <div className="bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/80 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-1.5 text-[10px] sm:text-xs text-slate-500 mb-2 sm:mb-2.5 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <Link to="/tools" className="hover:text-blue-600 transition-colors">Tools</Link>
            {category && categorySlug && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <Link to={`/category/${categorySlug}`} className="hover:text-blue-600 transition-colors">
                  {category}
                </Link>
              </>
            )}
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="font-semibold text-slate-800">{title}</span>
          </nav>

          {/* Heading with USA badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-700 text-[10px] sm:text-[11px] font-bold mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>100% Free Online Tool • No Registration Required</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                {title}
              </h1>
              <p className="mt-0.5 text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* In-Browser Security Seal */}
            <div className="flex-shrink-0 flex items-center space-x-2 bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200/80 shadow-2xs w-fit">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-800">100% In-Browser Privacy</div>
                <div className="text-[9px] sm:text-[10px] text-slate-500">Your files never touch external servers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-1 sm:-mt-2">
        {/* The interactive tool itself */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm p-3 sm:p-5 lg:p-6">
          {children}
        </div>

        {/* Features & How It Works Row */}
        {(howToSteps.length > 0 || features.length > 0) && (
          <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
            {/* How to use */}
            {howToSteps.length > 0 && (
              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2.5 flex items-center space-x-2">
                  <span>How to Use {title}</span>
                </h2>
                <div className="space-y-2">
                  {howToSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] sm:text-xs flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-800">{step.title}</h3>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Advantages */}
            {features.length > 0 && (
              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2.5">Key Advantages & Benefits</h2>
                <div className="space-y-2">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-slate-800">{feat.title}: </span>
                        <span className="text-[11px] text-slate-600">{feat.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detailed In-Depth SEO Guide Section */}
        {seoContent && (
          <div className="mt-4 sm:mt-5 bg-white rounded-xl p-3.5 sm:p-5 border border-slate-200/90 shadow-2xs text-slate-700 leading-relaxed text-xs sm:text-sm">
            {seoContent}
          </div>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <div className="mt-4 sm:mt-5 bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs">
            <div className="flex items-center space-x-2 mb-3">
              <HelpCircle className="w-4.5 h-4.5 text-blue-600" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50/70 p-3 sm:p-3.5 rounded-lg border border-slate-200/70">
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{faq.question}</h3>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-4 sm:mt-5">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Related Popular Tools</h2>
              <Link to="/tools" className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center space-x-1">
                <span>View all tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.route}
                  className="group bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      Free
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors text-xs sm:text-sm">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
