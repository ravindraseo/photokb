import { useEffect } from 'react';

function setMetaTag(attr, attrVal, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkTag(rel, href, extraAttrs = {}) {
  if (!href) return;
  let selector = `link[rel="${rel}"]`;
  if (extraAttrs.hreflang) selector += `[hreflang="${extraAttrs.hreflang}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Dynamic SEO Head component to manage document title, meta descriptions, canonical tags, and structured data
 */
export default function SEOHead({ title, description, canonical, schema, ogImage, noindex = false }) {
  useEffect(() => {
    const siteName = 'PhotoKB';
    let formattedTitle = title;
    if (title) {
      formattedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
      document.title = formattedTitle;
    }

    // 1. Primary Meta Tags
    setMetaTag('name', 'title', formattedTitle);
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 2. Canonical & Hreflang URLs
    if (canonical !== undefined) {
      const cleanPath = canonical === '/' ? '/' : canonical.startsWith('/') ? canonical : `/${canonical}`;
      const rawUrl = `https://www.photokb.net${cleanPath}`;
      const canonicalUrl = rawUrl.replace(/([^:]\/)\/+/g, '$1');

      setLinkTag('canonical', canonicalUrl);
      setLinkTag('alternate', canonicalUrl, { hreflang: 'en-US' });
      setLinkTag('alternate', canonicalUrl, { hreflang: 'x-default' });

      // Open Graph & Twitter URL
      setMetaTag('property', 'og:url', canonicalUrl);
      setMetaTag('property', 'twitter:url', canonicalUrl);
    }

    // 3. Open Graph & Twitter Titles & Descriptions
    setMetaTag('property', 'og:site_name', siteName);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'twitter:title', formattedTitle);
    setMetaTag('property', 'twitter:card', 'summary_large_image');

    if (description) {
      setMetaTag('property', 'og:description', description);
      setMetaTag('property', 'twitter:description', description);
    }

    // 4. Open Graph & Twitter Image
    const targetImage = ogImage 
      ? (ogImage.startsWith('http') ? ogImage : `https://www.photokb.net${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`)
      : 'https://www.photokb.net/og-image.png';

    setMetaTag('property', 'og:image', targetImage);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '630');
    setMetaTag('property', 'og:image:type', 'image/png');
    setMetaTag('property', 'twitter:image', targetImage);

    // 5. Structured Data (JSON-LD Schema)
    let scriptSchema = document.querySelector('script[data-schema="page-schema"]');
    if (schema) {
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.setAttribute('type', 'application/ld+json');
        scriptSchema.setAttribute('data-schema', 'page-schema');
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    } else if (scriptSchema) {
      scriptSchema.remove();
    }
  }, [title, description, canonical, schema, ogImage]);

  return null;
}
