import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  Tag,
  ChevronRight,
  ListOrdered,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-data';
import { SeoSchema } from '@/components/SeoSchema';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';
import { FaqAccordion } from '@/components/FaqAccordion';
import { InternalLinks } from '@/components/InternalLinks';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `https://photokb.net/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://photokb.net/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://photokb.net/' },
    { name: 'Blog', url: 'https://photokb.net/blog' },
    { name: post.title, url: `https://photokb.net/blog/${post.slug}` }
  ];

  return (
    <>
      <SeoSchema
        type="article"
        title={post.metaTitle}
        description={post.metaDescription}
        url={`https://photokb.net/blog/${post.slug}`}
        breadcrumbs={breadcrumbs}
        datePublished={post.publishedDate}
        author={post.author}
        category={post.category}
        faqs={post.faqs}
      />

      {/* Breadcrumbs */}
      <div className="border-b border-slate-200/60 bg-white/60 py-2 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-xs font-semibold text-slate-500 sm:px-6 lg:px-8 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">
            Blog
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-slate-200 truncate">{post.title}</span>
        </div>
      </div>

      <article className="py-6 sm:py-7">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Post Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Tag className="h-3.5 w-3.5" />
              {post.category}
            </span>

            <h1 className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
              {post.title}
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {post.excerpt}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                <User className="h-3.5 w-3.5 text-blue-600" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {post.publishedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Table of Contents Box */}
          {post.tableOfContents.length > 0 && (
            <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/60 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400">
                <ListOrdered className="h-4 w-4" />
                <span>Table of Contents</span>
              </div>
              <ul className="mt-2 space-y-1 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                {post.tableOfContents.map((toc) => (
                  <li key={toc.id}>
                    <a
                      href={`#${toc.id}`}
                      className="hover:text-blue-600 hover:underline dark:hover:text-blue-400"
                    >
                      {toc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Body Content */}
          <div className="prose prose-slate mt-5 max-w-none dark:prose-invert prose-headings:font-black prose-a:text-blue-600 prose-table:border prose-table:border-slate-200 dark:prose-table:border-slate-800 prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:p-2.5 prose-td:p-2.5 text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/## (.*)/g, '<h2 class="text-xl font-black mt-5 mb-2.5 text-slate-900 dark:text-white">$1</h2>')
                  .replace(/### (.*)/g, '<h3 class="text-lg font-bold mt-3.5 mb-2 text-slate-800 dark:text-slate-100">$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 font-bold hover:underline">$1</a>')
                  .replace(/\n\n/g, '<p class="my-2.5 text-slate-600 dark:text-slate-300 leading-relaxed"></p>')
              }}
            />
          </div>

          {/* YouTube Video Guide */}
          {post.youtubeId && (
            <div className="mt-5 sm:mt-6">
              <YouTubeEmbed
                videoId={post.youtubeId}
                title={post.youtubeTitle || post.title}
                subtitle="Visual walkthrough for this tutorial"
              />
            </div>
          )}

          {/* FAQs */}
          {post.faqs.length > 0 && (
            <div className="mt-5 sm:mt-6 border-t border-slate-200/80 pt-4 sm:pt-5 dark:border-slate-800">
              <FaqAccordion
                items={post.faqs}
                title="Frequently Asked Questions"
                subtitle="Common queries related to this topic"
              />
            </div>
          )}

          {/* Internal Linking to Tools */}
          <div className="mt-5 sm:mt-6">
            <InternalLinks
              title="Recommended Tools Mentioned in this Article"
              relatedTools={post.relatedTools.map(t => ({ slug: t.slug, name: t.name, desc: 'Direct portal tool' }))}
            />
          </div>
        </div>
      </article>
    </>
  );
}
