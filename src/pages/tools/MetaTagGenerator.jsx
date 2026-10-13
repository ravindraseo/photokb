import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Tags, Copy, Check, Globe } from 'lucide-react';

export default function MetaTagGenerator() {
  const [siteTitle, setSiteTitle] = useState('My Awesome Web Project');
  const [description, setDescription] = useState('Explore fast, modern online utilities and tools.');
  const [keywords, setKeywords] = useState('tools, online, utility, fast, free');
  const [author, setAuthor] = useState('PhotoKB');
  const [canonicalUrl, setCanonicalUrl] = useState('https://example.com');
  const [copied, setCopied] = useState(false);

  const generatedTags = `<!-- Primary Meta Tags -->
<title>${siteTitle}</title>
<meta name="title" content="${siteTitle}" />
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />
<link rel="canonical" href="${canonicalUrl}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${canonicalUrl}" />
<meta property="og:title" content="${siteTitle}" />
<meta property="og:description" content="${description}" />

<!-- Twitter Card -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${canonicalUrl}" />
<meta property="twitter:title" content="${siteTitle}" />
<meta property="twitter:description" content="${description}" />`;

  const copyCode = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="SEO Meta Tag Generator"
      subtitle="Generate Google search metadata, Open Graph cards for Facebook/LinkedIn, and Twitter Card tags with live preview."
      category="SEO Tools"
      categorySlug="seo-tools"
      currentToolId="meta-tag-generator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Page Title</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Meta Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Canonical URL</label>
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Keywords</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Output Code & SERP Preview */}
        <div className="space-y-4">
          {/* Google Preview */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase block mb-2">Google Search Preview</span>
            <div className="text-xs text-slate-500 truncate">{canonicalUrl}</div>
            <div className="text-base text-blue-700 hover:underline font-semibold cursor-pointer truncate">{siteTitle}</div>
            <div className="text-xs text-slate-600 line-clamp-2 mt-0.5">{description}</div>
          </div>

          {/* Code */}
          <div className="relative bg-slate-900 text-slate-100 rounded-2xl p-4 font-mono text-xs">
            <button
              onClick={copyCode}
              className="absolute top-3 right-3 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <pre className="overflow-x-auto pt-6 leading-relaxed text-slate-300">
              {generatedTags}
            </pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
