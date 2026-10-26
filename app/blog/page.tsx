import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, Tag, ArrowRight, User } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-data';
import { SeoSchema } from '@/components/SeoSchema';

export const metadata: Metadata = {
  title: 'Blog & Image Optimization Guides | PhotoKB',
  description:
    'Read expert tutorials on image compression, portal size requirements (SSC, UPSC, NEET), dimensions cheat sheets, and image format comparisons.',
  alternates: {
    canonical: 'https://photokb.net/blog',
  },
  openGraph: {
    title: 'PhotoKB Blog - Image Compression & Optimization Tutorials',
    description: 'Expert guides on reducing photo size for competitive exams, web performance, and social media.',
    url: 'https://photokb.net/blog',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const posts = Object.values(BLOG_POSTS);
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  const breadcrumbs = [
    { name: 'Home', url: 'https://photokb.net/' },
    { name: 'Blog', url: 'https://photokb.net/blog' }
  ];

  return (
    <>
      <SeoSchema
        type="website"
        title="PhotoKB Blog - Image Compression & Optimization Tutorials"
        description="Learn how to optimize images, meet strict government portal requirements, and select the right image formats."
        url="https://photokb.net/blog"
        breadcrumbs={breadcrumbs}
      />

      {/* Header */}
      <section className="relative overflow-hidden bg-white py-6 sm:py-7 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
            <BookOpen className="h-3.5 w-3.5" />
            KNOWLEDGE BASE & GUIDES
          </div>
          <h1 className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
            PhotoKB <span className="text-blue-600 dark:text-blue-400">Editorial & Guides</span>
          </h1>
          <p className="mx-auto mt-1.5 max-w-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Actionable, 100% original tutorials on image compression, dimension calibration for government exams, and web performance.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-5 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-black tracking-wider text-slate-400 uppercase">
            Featured Master Guide
          </h2>

          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative aspect-video lg:aspect-auto lg:col-span-7 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80"
                  alt={featuredPost.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between p-4 sm:p-5 lg:col-span-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{featuredPost.category}</span>
                  </div>

                  <h3 className="mt-1.5 text-lg sm:text-xl font-black text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {featuredPost.publishedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700"
                  >
                    Read Full Article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Articles Grid */}
      <section className="pb-6 sm:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-black tracking-wider text-slate-400 uppercase">
            All Tutorials & Articles
          </h2>

          <div className="mt-3.5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {regularPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={
                      post.slug.includes('dimension')
                        ? 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=700&q=80'
                        : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80'
                    }
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      <Tag className="h-3.5 w-3.5" />
                      <span>{post.category}</span>
                    </div>

                    <h3 className="mt-1.5 text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.publishedDate}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-bold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
