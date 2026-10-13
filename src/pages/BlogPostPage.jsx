import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { ChevronRight, Calendar, Clock, ArrowLeft, CheckCircle2, ChevronDown, HelpCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

function formatMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, (match, anchor, url) => {
      // Normalize internal photokb.net/com links to relative paths for instant SPA routing
      const isInternal = /^https?:\/\/photokb\.(net|com)/.test(url) || url.startsWith('/');
      if (isInternal) {
        const cleanUrl = url.replace(/^https?:\/\/photokb\.(net|com)/, '');
        const finalUrl = cleanUrl === '' ? '/' : cleanUrl;
        return `<a href="${finalUrl}" class="text-blue-600 font-bold hover:underline">${anchor}</a>`;
      }
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 font-bold hover:underline">${anchor}</a>`;
    });
}

export default function BlogPostPage() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => 
    p.id === id || 
    (id === 'how-to-resize-an-image-online-for-free' && p.id === 'how-to-resize-an-image-online') ||
    (id === 'how-to-resize-an-image-online' && p.id === 'how-to-resize-an-image-online-for-free') ||
    (id === 'jpg-vs-png-which-image-format-should-you-use' && p.id === 'jpg-vs-png') ||
    (id === 'jpg-vs-png' && p.id === 'jpg-vs-png-which-image-format-should-you-use') ||
    (id === 'us-passport-photo-size-complete-guide' && p.id === 'us-passport-photo-size-guide') ||
    (id === 'us-passport-photo-size-guide' && p.id === 'us-passport-photo-size-complete-guide')
  ) || BLOG_POSTS[0];
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  // Build Comprehensive Schema.org JSON-LD (supports customSchema override)
  const articleSchema = post.customSchema ? {
    ...post.customSchema,
    ...(post.faqs && post.faqs.length > 0 ? {
      mainEntity: {
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      }
    } : {})
  } : {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: '2026-10-11',
    author: {
      '@type': 'Organization',
      name: post.author || 'PhotoKB Team',
      url: 'https://photokb.net/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PhotoKB',
      url: 'https://photokb.net/'
    },
    ...(post.faqs && post.faqs.length > 0 ? {
      mainEntity: {
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      }
    } : {})
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 sm:pb-16">
      <SEOHead 
        title={post.seoTitle || post.title} 
        description={post.metaDescription || post.summary} 
        canonical={`/blog/${post.id}`} 
        schema={articleSchema}
      />

      {/* Article Header */}
      <div className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1.5 text-[11px] sm:text-xs text-slate-500 mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span className="font-semibold text-slate-800 truncate">{post.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[11px] font-bold rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 pt-4 border-t border-slate-200/80 text-[11px] sm:text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {post.author ? post.author[0] : 'P'}
              </div>
              <div>
                <span className="font-bold text-slate-900 block leading-tight">{post.author}</span>
                <span className="text-[10px] text-slate-500">{post.authorRole}</span>
              </div>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
          
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900">
              <img
                src={post.featuredImage}
                alt={post.imageAlt || post.title}
                className="w-full h-auto aspect-video object-cover"
                loading="eager"
              />
            </div>
          )}

          <div className="p-3.5 sm:p-4 bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl sm:rounded-r-2xl text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            {post.summary}
          </div>

          <div className="prose max-w-none text-slate-700 space-y-5 leading-relaxed text-sm sm:text-base">
            {post.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 pt-5 pb-1 border-b border-slate-100">
                    {trimmed.replace('## ', '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg sm:text-xl font-bold text-slate-900 pt-3">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.includes('1. **') || /^\d+\.\s+\*\*/.test(trimmed)) {
                return (
                  <div key={idx} className="space-y-2 my-3">
                    {trimmed.split('\n').map((line, i) => (
                      <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: formatMarkdown(line.replace(/^\d+\.\s+/, '')) }} />
                      </div>
                    ))}
                  </div>
                );
              }
              if (trimmed.startsWith('- **') || trimmed.startsWith('- ')) {
                return (
                  <div key={idx} className="space-y-2 my-3">
                    {trimmed.split('\n').map((line, i) => (
                      <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: formatMarkdown(line.replace(/^-\s+/, '')) }} />
                      </div>
                    ))}
                  </div>
                );
              }
              if (trimmed.startsWith('|') && trimmed.includes('\n|')) {
                const rows = trimmed.split('\n').filter((r) => r.trim().startsWith('|'));
                if (rows.length >= 2) {
                  const headerCells = rows[0].split('|').slice(1, -1).map((c) => c.trim());
                  const bodyRows = rows.slice(2);
                  return (
                    <div key={idx} className="my-5 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                      <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                        <thead className="bg-slate-50 font-bold text-slate-800">
                          <tr>
                            {headerCells.map((cell, cIdx) => (
                              <th key={cIdx} className="px-4 py-3 border-r last:border-r-0 border-slate-200">{cell}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
                          {bodyRows.map((row, rIdx) => {
                            const cells = row.split('|').slice(1, -1).map((c) => c.trim());
                            return (
                              <tr key={rIdx} className="hover:bg-slate-50/50">
                                {cells.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 font-medium text-slate-700 border-r last:border-r-0 border-slate-100">{cell}</td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }
              }
              return (
                <p key={idx} className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatMarkdown(trimmed) }} />
              );
            })}
          </div>

          {/* Article Specific FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="pt-8 border-t border-slate-200 mt-8">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-3">
                {post.faqs.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;
                  return (
                    <div key={fIdx} className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50">
                      <button
                        type="button"
                        onClick={() => toggleFaq(fIdx)}
                        className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                          <p dangerouslySetInnerHTML={{ __html: formatMarkdown(faq.answer) }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Back Button & Action */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Blog Posts</span>
            </Link>

            <Link
              to="/tools"
              className="w-full sm:w-auto text-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20"
            >
              Try Out Free Tools
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
