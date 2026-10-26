import React from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface SeoSchemaProps {
  type?: 'website' | 'tool' | 'article' | 'faq';
  title?: string;
  description?: string;
  url?: string;
  faqs?: FaqItem[];
  breadcrumbs?: { name: string; url: string }[];
  datePublished?: string;
  author?: string;
  category?: string;
}

export function SeoSchema({
  type = 'website',
  title = 'PhotoKB - Free Online Image Tools',
  description = 'Resize, compress and convert images in seconds without losing quality.',
  url = 'https://photokb.net/',
  faqs = [],
  breadcrumbs = [],
  datePublished,
  author = 'PhotoKB Tech Editorial Team',
  category = 'Image Processing'
}: SeoSchemaProps) {
  const schemas: object[] = [];

  // Base Organization & WebSite Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PhotoKB',
    url: 'https://photokb.net/',
    description: 'Free online image tools to resize, compress, and convert images to exact KB sizes without quality loss.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://photokb.net/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  });

  // Breadcrumbs Schema
  if (breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    });
  }

  // Tool / SoftwareApplication Schema
  if (type === 'tool') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All (Web Browser)',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      description: description,
      url: url,
      featureList: [
        'Target KB compression (20 KB, 50 KB, 100 KB, 200 KB)',
        '100% In-Browser Privacy Protection',
        'Bicubic Dimension Resizer in px, cm, inch',
        'Instant JPG, PNG, WEBP Conversion',
        'No Server Upload Required'
      ]
    });
  }

  // Blog Article Schema
  if (type === 'article') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      datePublished: datePublished || new Date().toISOString(),
      dateModified: datePublished || new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: author,
        url: 'https://photokb.net/about'
      },
      publisher: {
        '@type': 'Organization',
        name: 'PhotoKB',
        logo: {
          '@type': 'ImageObject',
          url: 'https://photokb.net/icon.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      articleSection: category
    });
  }

  // FAQ Schema
  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return (
    <>
      {schemas.map((schemaObj, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
        />
      ))}
    </>
  );
}
