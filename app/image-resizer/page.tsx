import type { Metadata } from 'next';
import { TOOLS } from '@/lib/tools-data';
import { ToolPageTemplate } from '@/components/ToolPageTemplate';

const tool = TOOLS['image-resizer'];

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: tool.keywords,
  alternates: {
    canonical: `https://photokb.net/${tool.slug}`,
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `https://photokb.net/${tool.slug}`,
    type: 'website',
  },
};

export default function ImageResizerPage() {
  return <ToolPageTemplate tool={tool} />;
}
