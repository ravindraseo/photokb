import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Clock, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-[#0B132B] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pt-7 pb-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xl font-black text-white">
                    Photo<span className="text-blue-400">KB</span>
                  </span>
                  <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-black text-white uppercase">
                    USA
                  </span>
                </div>
                <span className="mt-0.5 text-[10px] font-medium text-slate-400">
                  Free Online Tools For Everyone
                </span>
              </div>
            </Link>

            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              PhotoKB provides a wide range of free online tools for image editing, PDF conversion, calculators, SEO tools and more. Simple, fast and secure tools for everyone in the USA.
            </p>

            {/* Social Icons */}
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 transition-colors hover:bg-red-600 hover:text-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/#popular-tools" className="hover:text-white">All Tools</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">Blog</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">Terms and Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Tool Categories */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              Tool Categories
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/image-resizer" className="hover:text-white">Image Tools</Link>
              </li>
              <li>
                <Link href="/jpg-to-pdf" className="hover:text-white">PDF Tools</Link>
              </li>
              <li>
                <Link href="/image-resizer" className="hover:text-white">Calculator Tools</Link>
              </li>
              <li>
                <Link href="/#popular-tools" className="hover:text-white">Text Tools</Link>
              </li>
              <li>
                <Link href="/compress-to-50kb" className="hover:text-white">SEO Tools</Link>
              </li>
              <li>
                <Link href="/image-converter" className="hover:text-white">Developer Tools</Link>
              </li>
              <li>
                <Link href="/image-resizer" className="hover:text-white">Unit Converter</Link>
              </li>
              <li>
                <Link href="/#popular-tools" className="hover:text-white">Other Tools</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white uppercase">
              Contact Us
            </h3>
            <div className="mt-4 space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:support@photokb.com" className="hover:text-white">
                  support@photokb.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>New York, USA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM (EST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-2.5 border-t border-slate-800/80 pt-3 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 PhotoKB. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" /> for USA Users
          </p>
        </div>
      </div>
    </footer>
  );
}
