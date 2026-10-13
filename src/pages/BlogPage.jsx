import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { Calendar, Clock, ArrowRight, FileText, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 sm:pb-16">
      <SEOHead
        title="Blog & Productivity Guides"
        description="Step-by-step tutorials, PDF tips, image optimization guides, and typing speed improvement habits from PhotoKB experts."
        canonical="/blog"
      />

      {/* Blog Hero */}
      <div className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border-b border-slate-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[11px] font-bold mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Productivity Guides & Tech Tips</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            PhotoKB Blog & Guides
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-1">
            Step-by-step tutorials, formatting guides, and technical explanations to boost your digital workflow.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="h-44 sm:h-52 bg-slate-100 overflow-hidden relative">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.imageAlt || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center p-4 text-white">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/95 text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {post.category}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-1.5">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readTime}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 group-hover:underline">Read Full Tutorial</span>
                  <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
