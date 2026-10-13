import { useEffect } from 'react';

/**
 * Dynamic SEO Head component to manage document title, meta descriptions, and canonical tags
 */
export default function SEOHead({ title, description, canonical, schema }) {
  useEffect(() => {
    // Update Title
    if (title) {
      const formattedTitle = title.includes('PhotoKB') ? title : `${title} | PhotoKB`;
      document.title = formattedTitle;
    }

    // Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // Update Canonical URL
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', `https://photokb.net${canonical}`);
    }

    // Sync Open Graph & Twitter title and description
    if (title) {
      const formattedTitle = title.includes('PhotoKB') ? title : `${title} | PhotoKB`;
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

    // Structured Data (JSON-LD Schema)
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
  }, [title, description, canonical, schema]);

  return null;
}
