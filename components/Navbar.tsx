'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Search,
  LayoutGrid,
  Menu,
  X,
  Maximize2,
  Minimize2,
  FileText,
  UserSquare2,
  RefreshCw,
  Calculator,
  Compass,
  FileCode,
  Globe,
  Sliders,
  Sparkles
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
  }, [pathname]);

  // Keyboard shortcut Ctrl/Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const searchableItems = [
    { name: 'US Passport Photo Resizer', href: '/passport-photo-maker', desc: 'Crop to 2x2 in (600x600 px) State gov standards' },
    { name: 'Resize Image in KB', href: '/compress-to-50kb', desc: 'Exact 20KB, 50KB, 100KB, 200KB for forms' },
    { name: 'Inches to Pixels Resizer', href: '/image-resizer', desc: 'Convert 2x2, 4x6, 5x7 inches to 300 DPI pixels' },
    { name: 'Image Resizer', href: '/image-resizer', desc: 'Custom dimensions and aspect ratios' },
    { name: 'Compress Image', href: '/compress-to-20kb', desc: 'Reduce file size without quality degradation' },
    { name: 'JPG to PDF', href: '/jpg-to-pdf', desc: 'Convert JPG photos to clean multi-page PDF' },
    { name: 'Image Converter', href: '/image-converter', desc: 'Convert JPG, PNG, WebP formats' },
    { name: 'How to Resize an Image Online', href: '/blog/best-image-dimensions-for-online-forms', desc: 'Master guide' },
    { name: 'How to Compress an Image Without Quality Loss', href: '/blog/how-to-compress-photo-to-50kb', desc: 'Tutorial' },
    { name: 'JPG vs PNG: Which to Use', href: '/blog/jpg-vs-png-vs-webp', desc: 'Comparison' },
  ];

  const filteredItems = searchQuery.trim() === ''
    ? searchableItems
    : searchableItems.filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo with USA badge and tagline */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25 transition-transform group-hover:scale-105">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Photo<span className="text-blue-600">KB</span>
                </span>
                <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[10px] font-black tracking-wider text-white uppercase shadow-sm">
                  USA
                </span>
              </div>
              <span className="mt-0.5 text-[10px] font-semibold tracking-tight text-slate-400">
                Free Online Tools For Everyone
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
            <Link
              href="/"
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                pathname === '/'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>

            <Link
              href="/#popular-tools"
              className="rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:text-blue-600"
            >
              All Tools
            </Link>

            {/* Image Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('image')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:text-blue-600">
                Image Tools
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'image' && (
                <div className="absolute top-full left-0 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link href="/image-resizer" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600">
                    <Maximize2 className="h-4 w-4 text-blue-600" />
                    Image Resizer (px, cm, inch)
                  </Link>
                  <Link href="/compress-to-50kb" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600">
                    <Sliders className="h-4 w-4 text-emerald-600" />
                    Resize Image in KB
                  </Link>
                  <Link href="/passport-photo-maker" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600">
                    <UserSquare2 className="h-4 w-4 text-indigo-600" />
                    US Passport Photo (2x2 in)
                  </Link>
                  <Link href="/image-converter" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600">
                    <RefreshCw className="h-4 w-4 text-cyan-600" />
                    Image Converter (JPG, PNG, WebP)
                  </Link>
                </div>
              )}
            </div>

            {/* PDF Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('pdf')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:text-blue-600">
                PDF Tools
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'pdf' && (
                <div className="absolute top-full left-0 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link href="/jpg-to-pdf" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600">
                    <FileText className="h-4 w-4 text-rose-600" />
                    JPG to PDF Converter
                  </Link>
                  <Link href="/jpg-to-pdf" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600">
                    <FileText className="h-4 w-4 text-amber-600" />
                    Merge Multiple PDFs
                  </Link>
                </div>
              )}
            </div>

            {/* Calculator Tools */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('calc')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:text-blue-600">
                Calculator Tools
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'calc' && (
                <div className="absolute top-full left-0 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link href="/image-resizer" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-600">
                    <Calculator className="h-4 w-4 text-emerald-600" />
                    DPI & Pixel Calculator
                  </Link>
                  <Link href="/image-resizer" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-600">
                    <Calculator className="h-4 w-4 text-blue-600" />
                    Aspect Ratio Calculator
                  </Link>
                </div>
              )}
            </div>

            {/* SEO Tools */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('seo')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:text-blue-600">
                SEO Tools
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {activeDropdown === 'seo' && (
                <div className="absolute top-full left-0 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link href="/compress-to-50kb" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-purple-50 hover:text-purple-600">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    Image Speed Optimizer (LCP)
                  </Link>
                  <Link href="/image-converter" className="flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold text-slate-800 hover:bg-purple-50 hover:text-purple-600">
                    <RefreshCw className="h-4 w-4 text-indigo-600" />
                    Next-Gen WebP Generator
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                pathname.startsWith('/blog')
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Icon Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* "All Tools" Button with Grid Icon */}
            <Link
              href="/#popular-tools"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700"
            >
              <LayoutGrid className="h-4 w-4" />
              All Tools
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 lg:hidden hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl lg:hidden">
            <div className="grid gap-1">
              <Link href="/" className="rounded-lg px-3 py-2 text-sm font-bold text-slate-800 hover:bg-blue-50">
                Home
              </Link>
              <Link href="/#popular-tools" className="rounded-lg px-3 py-2 text-sm font-bold text-slate-800 hover:bg-blue-50">
                All Tools
              </Link>
              <Link href="/passport-photo-maker" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50">
                US Passport Photo Resizer (2x2)
              </Link>
              <Link href="/image-resizer" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50">
                Image Resizer (Width & Height)
              </Link>
              <Link href="/compress-to-50kb" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50">
                Resize Image in KB
              </Link>
              <Link href="/jpg-to-pdf" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50">
                JPG to PDF
              </Link>
              <Link href="/blog" className="rounded-lg px-3 py-2 text-sm font-bold text-slate-800 hover:bg-blue-50">
                Blog
              </Link>
              <Link href="/faq" className="rounded-lg px-3 py-2 text-sm font-bold text-slate-800 hover:bg-blue-50">
                FAQ
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-20 backdrop-blur-sm sm:p-6 sm:pt-24">
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center border-b border-slate-100 px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, passport, 50kb, resize, PDF..."
                className="ml-3 flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSearchOpen(false)}
                  className="flex flex-col rounded-xl px-3.5 py-2.5 transition-colors hover:bg-blue-50"
                >
                  <span className="text-sm font-bold text-slate-900">{item.name}</span>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
