import { useEffect } from 'react';

/**
 * Dynamic SEO Head component to manage document title, meta descriptions, canonical tags, and structured data
 */
export default function SEOHead({ title, description, canonical, schema, ogImage }) {
  useEffect(() => {
    // 1. Update Document Title
    const siteName = 'PhotoKB';
    let formattedTitle = title;
    if (title) {
      formattedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
      document.title = formattedTitle;
    }

    const titleMeta = document.querySelector('meta[name="title"]');
    if (titleMeta && formattedTitle) {
      titleMeta.setAttribute('content', formattedTitle);
    }

    // 2. Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // 3. Update Canonical URL & Alternates
    if (canonical !== undefined) {
      const cleanPath = canonical === '/' ? '/' : canonical.startsWith('/') ? canonical : `/${canonical}`;
      const canonicalUrl = `https://www.photokb.net${cleanPath}`;

      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);

      // Keep alternate hreflang tags consistent with canonical URL
      const altEn = document.querySelector('link[rel="alternate"][hreflang="en-US"]');
      if (altEn) altEn.setAttribute('href', canonicalUrl);

      const altDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
      if (altDefault) altDefault.setAttribute('href', canonicalUrl);

      // Open Graph URL
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

      const twUrl = document.querySelector('meta[property="twitter:url"]');
      if (twUrl) twUrl.setAttribute('content', canonicalUrl);
    }

    // 4. Sync Open Graph & Twitter Titles & Descriptions
    if (formattedTitle) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', formattedTitle);
      const twTitle = document.querySelector('meta[property="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', formattedTitle);
    }

    if (description) {
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
      const twDesc = document.querySelector('meta[property="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', description);
    }

    // 5. Open Graph / Twitter Image
    const targetImage = ogImage 
      ? (ogImage.startsWith('http') ? ogImage : `https://www.photokb.net${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`)
      : 'https://www.photokb.net/og-image.png';

    const ogImgMeta = document.querySelector('meta[property="og:image"]');
    if (ogImgMeta) ogImgMeta.setAttribute('content', targetImage);

    const twImgMeta = document.querySelector('meta[property="twitter:image"]');
    if (twImgMeta) twImgMeta.setAttribute('content', targetImage);

    // 6. Structured Data (JSON-LD Schema)
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
