'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  UploadCloud,
  ArrowRight,
  Maximize2,
  Sliders,
  Ruler,
  FileText,
  FileImage,
  Layers,
  Keyboard,
  Image as ImageIcon,
  Calculator,
  Type,
  BarChart2,
  Code2,
  ArrowLeftRight,
  Grid,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  ChevronDown,
  Send,
  Star,
  Users,
  Settings,
  Cloud,
  Sparkles,
  Download
} from 'lucide-react';
import { SeoSchema } from '@/components/SeoSchema';
import { compressImage } from '@/lib/compressor';

export default function Home() {
  // Hero interactive state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(1200);
  const [height, setHeight] = useState<number>(630);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FAQ interactive state
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WEBP).');
      return;
    }
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = url;
  };

  const handleResize = async () => {
    if (!selectedImage) {
      fileInputRef.current?.click();
      return;
    }
    setIsProcessing(true);
    try {
      const res = await compressImage(selectedImage, {
        maxWidth: width,
        maxHeight: height,
        quality: 0.9,
      });
      setResizedUrl(res.dataUrl);

      // Auto download
      const a = document.createElement('a');
      a.href = res.dataUrl;
      a.download = `photokb_resized_${width}x${height}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert('Error processing image.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Popular tools list matching screenshot
  const popularTools = [
    {
      title: 'US Passport Photo Resizer',
      desc: 'Resize & crop to 2x2 in (600x600 px) State gov standards.',
      href: '/passport-photo-maker',
      badge: 'US Official',
      badgeColor: 'bg-blue-50 text-blue-600 border border-blue-200',
      iconBg: 'bg-blue-100 text-blue-600',
      icon: <ImageIcon className="h-5 w-5" />
    },
    {
      title: 'Resize Image in KB',
      desc: 'Compress to exact 20KB, 50KB, 100KB, 200KB for USCIS & jobs.',
      href: '/compress-to-50kb',
      badge: 'Exact KB',
      badgeColor: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-600',
      icon: <Sliders className="h-5 w-5" />
    },
    {
      title: 'Inches to Pixels Resizer',
      desc: 'Convert 2x2, 4x6, 5x7, 8.5x11 inches to 300 DPI print pixels.',
      href: '/image-resizer',
      badge: '300 DPI',
      badgeColor: 'bg-purple-50 text-purple-600 border border-purple-200',
      iconBg: 'bg-purple-100 text-purple-600',
      icon: <Ruler className="h-5 w-5" />
    },
    {
      title: 'Image Resizer',
      desc: 'Resize images online with custom dimensions and ratios.',
      href: '/image-resizer',
      badge: 'Popular',
      badgeColor: 'bg-blue-50 text-blue-600 border border-blue-200',
      iconBg: 'bg-blue-100 text-blue-600',
      icon: <Maximize2 className="h-5 w-5" />
    },
    {
      title: 'Compress Image',
      desc: 'Reduce file size easily without quality degradation.',
      href: '/compress-to-20kb',
      badge: 'Fast',
      badgeColor: 'bg-rose-50 text-rose-600 border border-rose-200',
      iconBg: 'bg-rose-100 text-rose-600',
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      title: 'JPG to PDF',
      desc: 'Convert JPG photos to clean, multi-page PDF documents.',
      href: '/jpg-to-pdf',
      badge: 'Popular',
      badgeColor: 'bg-amber-50 text-amber-600 border border-amber-200',
      iconBg: 'bg-amber-100 text-amber-600',
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: 'PDF to JPG',
      desc: 'Convert PDF documents to high-resolution JPG images.',
      href: '/image-converter',
      badge: 'Free',
      badgeColor: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
      iconBg: 'bg-emerald-100 text-emerald-600',
      icon: <FileImage className="h-5 w-5" />
    },
    {
      title: 'Merge PDF',
      desc: 'Combine multiple PDF documents into one single file.',
      href: '/jpg-to-pdf',
      badge: 'Popular',
      badgeColor: 'bg-rose-50 text-rose-600 border border-rose-200',
      iconBg: 'bg-rose-100 text-rose-600',
      icon: <Layers className="h-5 w-5" />
    },
    {
      title: 'Typing Test',
      desc: 'Test & improve your typing speed.',
      href: '/blog',
      badge: 'New',
      badgeColor: 'bg-purple-50 text-purple-600 border border-purple-200',
      iconBg: 'bg-purple-100 text-purple-600',
      icon: <Keyboard className="h-5 w-5" />
    }
  ];

  // Tool categories matching screenshot
  const categories = [
    { title: 'Image Tools', count: '20+ Tools', icon: <ImageIcon className="h-5 w-5 text-blue-600" />, href: '/image-resizer' },
    { title: 'PDF Tools', count: '15+ Tools', icon: <FileText className="h-5 w-5 text-rose-600" />, href: '/jpg-to-pdf' },
    { title: 'Calculator Tools', count: '25+ Tools', icon: <Calculator className="h-5 w-5 text-emerald-600" />, href: '/image-resizer' },
    { title: 'Text Tools', count: '18+ Tools', icon: <Type className="h-5 w-5 text-purple-600" />, href: '/blog' },
    { title: 'SEO Tools', count: '12+ Tools', icon: <BarChart2 className="h-5 w-5 text-amber-600" />, href: '/compress-to-50kb' },
    { title: 'Developer Tools', count: '15+ Tools', icon: <Code2 className="h-5 w-5 text-indigo-600" />, href: '/image-converter' },
    { title: 'Unit Converter', count: '22+ Tools', icon: <ArrowLeftRight className="h-5 w-5 text-pink-600" />, href: '/image-resizer' },
    { title: 'Other Tools', count: 'More Tools', icon: <Grid className="h-5 w-5 text-cyan-600" />, href: '/#popular-tools' }
  ];

  // Blog posts matching screenshot
  const blogPosts = [
    {
      title: 'How to Resize an Image Online for Free',
      tag: 'Image Tools',
      date: 'Oct 11, 2026',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80',
      slug: 'best-image-dimensions-for-online-forms'
    },
    {
      title: 'How to Compress an Image Without Losing Quality',
      tag: 'Image Tools',
      date: 'Oct 12, 2026',
      image: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=600&q=80',
      slug: 'how-to-compress-photo-to-50kb'
    },
    {
      title: 'JPG vs PNG: Which Image Format Should You Use?',
      tag: 'Design & Formats',
      date: 'Oct 11, 2026',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      slug: 'jpg-vs-png-vs-webp'
    },
    {
      title: 'US Passport Photo Size: Complete Guide',
      tag: 'Passport & Visa',
      date: 'Oct 10, 2026',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      slug: 'best-image-dimensions-for-online-forms'
    },
    {
      title: 'How to Make a 2x2 Photo Online',
      tag: 'Passport & Visa',
      date: 'Oct 09, 2026',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      slug: 'how-to-compress-photo-to-50kb'
    },
    {
      title: 'How to Reduce Image File Size',
      tag: 'Image Tools',
      date: 'Oct 08, 2026',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      slug: 'how-to-compress-photo-to-50kb'
    }
  ];

  // 12 FAQs matching screenshot exactly
  const allFaqs = [
    {
      category: 'overview',
      categoryTag: 'OVERVIEW',
      question: '1. What is PhotoKB?',
      answer: 'PhotoKB is a free, all-in-one in-browser suite of online tools designed to resize, compress, and convert images and documents (JPG, PNG, WEBP, PDF) with zero server wait times and complete client-side privacy.'
    },
    {
      category: 'pricing',
      categoryTag: 'PRICING & LIMITS',
      question: '2. Is PhotoKB free to use?',
      answer: 'Yes! PhotoKB is 100% free with no hidden charges, subscriptions, or watermarks. All tools can be used without limits.'
    },
    {
      category: 'resizing',
      categoryTag: 'RESIZING',
      question: '3. How can I resize an image online?',
      answer: 'Upload your image in the hero resizer above or open our Image Resizer tool. Enter your desired width and height in pixels (px), centimeters (cm), or inches (in), and click "Resize" to download immediately.'
    },
    {
      category: 'compression',
      categoryTag: '100KB TOOL',
      question: '4. How do I compress an image to 100KB?',
      answer: 'Go to our "Resize Image in KB" or "Compress to 100 KB" tool, select your file, and PhotoKB\'s smart binary-search canvas engine automatically scales compression to reach exactly 100 KB or less.'
    },
    {
      category: 'compression',
      categoryTag: 'JPG & PNG',
      question: '5. Can I compress JPG and PNG images with PhotoKB?',
      answer: 'Yes, PhotoKB supports JPG, JPEG, PNG, WEBP, and BMP images. You can compress, optimize, and convert seamlessly between these formats.'
    },
    {
      category: 'compression',
      categoryTag: 'IMAGE QUALITY',
      question: '6. Does PhotoKB reduce image quality when compressing photos?',
      answer: 'PhotoKB uses bicubic downsampling and progressive quantization that eliminates imperceptible sensor noise while preserving sharp edges, colors, and facial clarity.'
    },
    {
      category: 'resizing',
      categoryTag: 'EXACT PIXELS',
      question: '7. Can I resize an image to exact pixel dimensions?',
      answer: 'Yes! You can specify exact custom width and height in pixels (e.g. 1200x630, 600x600, or 1920x1080) with or without locking aspect ratio.'
    },
    {
      category: 'formats',
      categoryTag: 'FORMAT CONVERTER',
      question: '8. Can I convert images between JPG, PNG, and WebP?',
      answer: 'Yes, our free Image Converter allows instantaneous two-way conversion between JPG, PNG, and next-generation WebP without uploading to a server.'
    },
    {
      category: 'formats',
      categoryTag: 'PASSPORT PHOTO',
      question: '9. Can I create a 2x2-inch US passport photo online?',
      answer: 'Yes, our US Passport Photo Resizer automatically crops and formats your portrait to official 2x2 inch (600x600 px at 300 DPI) US Department of State and USCIS standards.'
    },
    {
      category: 'general',
      categoryTag: 'PRIVACY & SERVER',
      question: '10. Are my images uploaded to a server?',
      answer: 'No. Never. PhotoKB executes 100% locally inside your web browser using HTML5 Canvas. Your sensitive files and private identity documents never leave your device.'
    },
    {
      category: 'general',
      categoryTag: 'MOBILE & TABLET',
      question: '11. Can I use PhotoKB on my phone or tablet?',
      answer: 'Yes, PhotoKB is fully responsive and optimized for all modern mobile, tablet, and desktop browsers on iOS, Android, macOS, and Windows.'
    },
    {
      category: 'general',
      categoryTag: 'NO SOFTWARE NEEDED',
      question: '12. Do I need to install software to use PhotoKB?',
      answer: 'No software, plugin, or app installation is required. Everything runs immediately inside your browser with zero setup.'
    }
  ];

  const filteredFaqs = activeFaqCategory === 'all'
    ? allFaqs
    : allFaqs.filter(faq => {
      if (activeFaqCategory === 'resizing') return faq.category === 'resizing';
      if (activeFaqCategory === 'compression') return faq.category === 'compression';
      if (activeFaqCategory === 'formats') return faq.category === 'formats';
      if (activeFaqCategory === 'general') return faq.category === 'general' || faq.category === 'overview' || faq.category === 'pricing';
      return true;
    });

  return (
    <>
      <SeoSchema
        type="website"
        title="Free Online Image Resizer & PDF Tools | PhotoKB"
        description="Fast, 100% private in-browser image compression, US passport 2x2 photo resizing, and file conversion with zero server wait times."
        faqs={allFaqs}
      />

      {/* Hero Section matching screenshot */}
      <section className="pt-5 pb-6 sm:pt-6 sm:pb-7 bg-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Free Online Image Resizer Tools
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Fast, 100% private in-browser image compression, US passport 2x2 photo resizing, and file conversion with zero server wait times.
          </p>

          {/* Upload Box */}
          <div className="mt-4 mx-auto max-w-2xl rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/20 p-4 sm:p-5 transition-colors hover:border-blue-400">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            {previewUrl ? (
              <div className="flex flex-col items-center">
                <img
                  src={previewUrl}
                  alt="Selected"
                  className="max-h-40 rounded-xl object-contain border border-slate-200 shadow-sm"
                />
                <p className="mt-2 text-xs font-semibold text-slate-700">{selectedImage?.name}</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1 text-xs font-bold text-blue-600 hover:underline"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-sm font-bold text-slate-700">
                  Select Or Drag & Drop Images Here
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 rounded-xl bg-blue-600 px-6 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-700"
                >
                  Select Images
                </button>
              </div>
            )}
          </div>

          {/* Dimensions & Resize Action Bar */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1.5">
              <span>Width:</span>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none"
              />
              <span className="text-slate-400">px</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span>Height:</span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1 text-center text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none"
              />
              <span className="text-slate-400">px</span>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={handleResize}
              className="rounded-xl bg-blue-600 px-5 py-1 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? 'Resizing...' : 'Resize'}
            </button>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section id="popular-tools" className="border-t border-slate-100 bg-slate-50/50 py-6 sm:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Popular Tools
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Most used tools to make your work easier and faster.
              </p>
            </div>

            <Link
              href="/#popular-tools"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-blue-600 shadow-sm hover:bg-blue-50"
            >
              View All Tools
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 3x3 Grid */}
          <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-sm transition-all hover:border-blue-400 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${tool.iconBg}`}>
                      {tool.icon}
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-sm font-extrabold text-slate-900 group-hover:text-blue-600">
                    {tool.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-2.5 flex justify-end">
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Tools by Category */}
      <section className="py-6 sm:py-7 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Browse Tools by Category
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Find the right tool quickly from our categorized collection.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group flex flex-col items-center rounded-xl border border-slate-200 bg-white p-2.5 text-center shadow-sm transition-all hover:border-blue-400 hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 shadow-inner group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="mt-1.5 text-xs font-bold text-slate-800 group-hover:text-blue-600">
                  {cat.title}
                </h3>
                <span className="mt-0.5 text-[10px] font-semibold text-slate-400">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PhotoKB? */}
      <section className="py-6 sm:py-7 bg-slate-50/60 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Why Choose PhotoKB?
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Simple, fast and reliable online tools for your everyday needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-center">
            {/* 4 Points on Left */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:col-span-8">
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">Fast & Easy to Use</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Get results in seconds with 0 learning curve.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">100% Free</h3>
                  <p className="mt-0.5 text-xs text-slate-500">No hidden charges, trial periods or paywalls.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">Safe & Secure</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Your files stay private and never touch a remote server.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">Works on All Devices</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Desktop, Mobile & Tablet compatible everywhere.</p>
                </div>
              </div>
            </div>

            {/* Right Card: Made for USA Users */}
            <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 text-center shadow-md">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-0.5 text-[10px] font-extrabold text-rose-600 border border-rose-200">
                🇺🇸 Made for USA Users
              </span>
              <h3 className="mt-2.5 text-sm sm:text-base font-black text-slate-900">
                High-Speed Client Engine
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Compliant with strict US privacy standards. Zero data harvested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Dark Navy Ribbon */}
      <section className="bg-[#0B132B] py-4 sm:py-5 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-black">
                <Users className="h-4 w-4 text-blue-400" />
                <span>5M+</span>
              </div>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Happy Users</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-black">
                <Settings className="h-4 w-4 text-emerald-400" />
                <span>50+</span>
              </div>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Online Tools</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-black">
                <Cloud className="h-4 w-4 text-cyan-400" />
                <span>100%</span>
              </div>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-400">Free to Use</p>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-black">
                <Star className="h-4 w-4 text-amber-400 fill-current" />
                <span>4.9<span className="text-xs text-slate-400">/5</span></span>
              </div>
              <p className="mt-0.5 text-[10px] font-semibold text-slate-400">User Ratings</p>
            </div>
          </div>
        </div>
      </section>

      {/* How PhotoKB Works? */}
      <section className="py-6 sm:py-7 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            How PhotoKB Works?
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Get your results in just 3 simple steps.
          </p>

          <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                1
              </div>
              <div className="mt-2.5 flex justify-center text-blue-600">
                <UploadCloud className="h-5 w-5" />
              </div>
              <h3 className="mt-2 text-xs sm:text-sm font-bold text-slate-900">Upload File</h3>
              <p className="mt-0.5 text-xs text-slate-500">Upload your file or enter details in the tool interface.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                2
              </div>
              <div className="mt-2.5 flex justify-center text-blue-600">
                <Settings className="h-5 w-5" />
              </div>
              <h3 className="mt-2 text-xs sm:text-sm font-bold text-slate-900">Process Online</h3>
              <p className="mt-0.5 text-xs text-slate-500">Our tool processes your request instantly inside your browser.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                3
              </div>
              <div className="mt-2.5 flex justify-center text-blue-600">
                <Download className="h-5 w-5" />
              </div>
              <h3 className="mt-2 text-xs sm:text-sm font-bold text-slate-900">Download Result</h3>
              <p className="mt-0.5 text-xs text-slate-500">Get your result and use it anywhere for free without watermarks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts (6 Cards) */}
      <section className="py-6 sm:py-7 bg-slate-50/60 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Latest Blog Posts
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Tips, guides and useful information to help you get the most out of our tools.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-blue-600 shadow-sm hover:bg-blue-50"
            >
              View All Posts
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <article
                key={i}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">
                    {post.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-600">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-400">
                    <span>{post.date}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions with Filter Tabs */}
      <section className="py-6 sm:py-7 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl mx-auto">
              Transparent and accurate answers on our in-browser privacy architecture, precise KB compression algorithms, and official document standards.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            {[
              { id: 'all', label: 'All Questions', count: 12 },
              { id: 'resizing', label: 'Resizing', count: 3 },
              { id: 'compression', label: 'Compression', count: 3 },
              { id: 'formats', label: 'Formats & Passport', count: 3 },
              { id: 'general', label: 'General & Platform', count: 3 }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFaqCategory(tab.id)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${activeFaqCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {tab.label} <span className="opacity-75">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* 12 Accordion items */}
          <div className="mt-4 space-y-2">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-start justify-between p-3.5 sm:p-4 text-left transition-colors hover:bg-slate-50/50"
                  >
                    <div>
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-black text-blue-600 uppercase tracking-wide">
                        {faq.categoryTag}
                      </span>
                      <div className="mt-1 text-xs sm:text-sm font-bold text-slate-900">
                        {faq.question}
                      </div>
                    </div>
                    <ChevronDown
                      className={`ml-4 mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 px-3.5 sm:px-4 pt-2 pb-3.5 text-xs leading-relaxed text-slate-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Newsletter Box matching screenshot */}
          <div className="mt-5 sm:mt-6 rounded-2xl border border-blue-200 bg-blue-50/30 p-4 sm:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                  <Send className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Get the latest tools, updates and useful tips directly in your inbox.
                  </p>
                </div>
              </div>

              {subscribed ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Thank you for subscribing!
                </span>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                  className="flex w-full md:w-auto items-center gap-2"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full md:w-60 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors shrink-0"
                  >
                    <Send className="h-3 w-3" />
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
