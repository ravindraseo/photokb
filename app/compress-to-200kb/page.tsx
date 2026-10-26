import type { Metadata } from 'next';
import { TOOLS } from '@/lib/tools-data';
import { ToolPageTemplate } from '@/components/ToolPageTemplate';

const tool = TOOLS['compress-to-200kb'];

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

export default function CompressTo200KBPage() {
  return <ToolPageTemplate tool={tool} />;
}
