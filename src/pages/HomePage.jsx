import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  CheckCircle, 
  Smartphone, 
  Upload, 
  Cpu, 
  Download, 
  Star, 
  Users, 
  FileText, 
  Cloud, 
  Heart, 
  Mail, 
  Send,
  Sparkles,
  Lock,
  Clock,
  Layers,
  Scissors,
  Calendar,
  Keyboard,
  Image as ImageIcon,
  Calculator,
  Type,
  BarChart2,
  Code2,
  ArrowLeftRight,
  LayoutGrid,
  Camera,
  Sliders,
  Ruler,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { ALL_TOOLS, CATEGORIES } from '../data/toolsData';
import { BLOG_POSTS } from '../data/blogData';
import SEOHead from '../components/SEOHead';

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'resizing', label: 'Resizing' },
  { id: 'compression', label: 'Compression' },
  { id: 'formats', label: 'Formats & Passport' },
  { id: 'general', label: 'General & Platform' },
];

const FAQ_ITEMS = [
  {
    id: 1,
    category: 'general',
    categoryLabel: 'Overview',
    question: '1. What is PhotoKB?',
    answer: 'PhotoKB is an online image utility platform designed to help users resize, compress, and convert images for different needs. You can use the available tools to adjust image dimensions, reduce file size, and prepare images for websites, documents, and online applications.'
  },
  {
    id: 2,
    category: 'general',
    categoryLabel: 'Pricing & Limits',
    question: '2. Is PhotoKB free to use?',
    answer: 'PhotoKB provides online image tools for resizing, compression, and conversion. Check the individual tool page for any usage limits or additional requirements.'
  },
  {
    id: 3,
    category: 'resizing',
    categoryLabel: 'Resizing',
    question: '3. How can I resize an image online?',
    answer: 'Open the Image Resizer tool, upload your image, enter the desired width and height, and adjust the aspect ratio if needed. Preview the result and download the resized image.'
  },
  {
    id: 4,
    category: 'compression',
    categoryLabel: '100KB Tool',
    question: '4. How do I compress an image to 100KB?',
    answer: 'Open the Compress Image to 100KB tool, select your image, and start compression. Review the resulting file size and image quality before downloading. Some images may need reduced dimensions to reach the target size.'
  },
  {
    id: 5,
    category: 'compression',
    categoryLabel: 'JPG & PNG',
    question: '5. Can I compress JPG and PNG images with PhotoKB?',
    answer: 'You can use the relevant JPG and PNG compression tools when available. The results depend on the image format, dimensions, compression settings, and the quality you want to preserve.'
  },
  {
    id: 6,
    category: 'compression',
    categoryLabel: 'Image Quality',
    question: '6. Does PhotoKB reduce image quality when compressing photos?',
    answer: 'Compression can affect image quality, particularly when reducing a large file to a very small size. PhotoKB users should preview the compressed image and check that important details remain clear before downloading.'
  },
  {
    id: 7,
    category: 'resizing',
    categoryLabel: 'Exact Pixels',
    question: '7. Can I resize an image to exact pixel dimensions?',
    answer: 'Yes, use the Image Resizer to enter custom width and height values in pixels. You can maintain the original aspect ratio to help prevent the image from looking stretched or distorted.'
  },
  {
    id: 8,
    category: 'formats',
    categoryLabel: 'Format Converter',
    question: '8. Can I convert images between JPG, PNG, and WebP?',
    answer: 'Use the Image Format Converter or a dedicated conversion tool to select a supported output format. Check transparency and image quality after conversion, as some formats handle these differently.'
  },
  {
    id: 9,
    category: 'formats',
    categoryLabel: 'Passport Photo',
    question: '9. Can I create a 2×2-inch US passport photo online?',
    answer: 'A 2×2 Photo Maker can help you crop and resize a photo to the required dimensions. Always verify the current US passport photo rules, including composition and background requirements, before using the result for an application.'
  },
  {
    id: 10,
    category: 'general',
    categoryLabel: 'Privacy & Server',
    question: '10. Are my images uploaded to a server?',
    answer: 'This depends on how the specific tool is implemented. If the tool processes images entirely in your browser, the image can remain on your device. PhotoKB should clearly state its actual processing and privacy practices on each relevant page.'
  },
  {
    id: 11,
    category: 'general',
    categoryLabel: 'Mobile & Tablet',
    question: '11. Can I use PhotoKB on my phone or tablet?',
    answer: 'A responsive PhotoKB interface can be used on supported mobile phones, tablets, laptops, and desktop computers through a modern web browser. The available experience may depend on the device and browser.'
  },
  {
    id: 12,
    category: 'general',
    categoryLabel: 'No Software Needed',
    question: '12. Do I need to install software to use PhotoKB?',
    answer: 'PhotoKB is designed as a browser-based image tools website, so supported tools can be accessed online without installing a separate desktop application.'
  }
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answer
    }
  }))
};

export default function HomePage({ onOpenSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('all');
  const navigate = useNavigate();

  const toggleFaq = (id) => {
    setOpenFaqId((prevId) => (prevId === id ? null : id));
  };

  const filteredFaqs = selectedFaqCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === selectedFaqCategory);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/tools');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  // ==========================================
  // Hero Image Resizer Tool State & Handlers
  // ==========================================
  // Hero Image Resizer Tool State & Handlers
  // ==========================================
  const [heroItems, setHeroItems] = useState([]);
  const [heroResizedItems, setHeroResizedItems] = useState([]);
  const [heroWidth, setHeroWidth] = useState(1200);
  const [heroHeight, setHeroHeight] = useState(630);
  const [heroIsProcessing, setHeroIsProcessing] = useState(false);
  const heroFileInputRef = useRef(null);

  const handleHeroFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) loadHeroFiles(files);
  };

  const handleHeroDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) loadHeroFiles(files);
  };

  const loadHeroFiles = (fileList) => {
    const validFiles = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    const loaded = [];
    let processed = 0;

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          loaded.push({
            id: Math.random().toString(36).substring(2, 9),
            file,
            name: file.name,
            src: event.target.result,
            origWidth: img.width,
            origHeight: img.height,
          });
          processed++;
          if (processed === validFiles.length) {
            setHeroItems(loaded);
            setHeroResizedItems([]);
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleHeroResize = async () => {
    if (heroItems.length === 0) {
      heroFileInputRef.current?.click();
      return;
    }
    setHeroIsProcessing(true);

    const targetW = parseInt(heroWidth) || 1200;
    const targetH = parseInt(heroHeight) || 630;

    const resizedList = [];

    for (const item of heroItems) {
      const resizedDataUrl = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetW, targetH);
          const isPng = item.name.toLowerCase().endsWith('.png');
          resolve(canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', 0.92));
        };
        img.src = item.src;
      });

      resizedList.push({
        ...item,
        newWidth: targetW,
        newHeight: targetH,
        resizedUrl: resizedDataUrl
      });
    }

    setHeroResizedItems(resizedList);
    setHeroIsProcessing(false);
  };

  const handleHeroDownloadSingle = (item) => {
    if (!item.resizedUrl) return;
    const link = document.createElement('a');
    link.download = item.name.toLowerCase().endsWith('.png') || item.name.toLowerCase().endsWith('.jpg') || item.name.toLowerCase().endsWith('.jpeg') || item.name.toLowerCase().endsWith('.webp')
      ? `${item.name.replace(/\.[^/.]+$/, '')}-${item.newWidth}x${item.newHeight}${item.name.substring(item.name.lastIndexOf('.'))}`
      : `${item.name}-${item.newWidth}x${item.newHeight}.jpg`;
    link.href = item.resizedUrl;
    link.click();
  };

  const handleHeroDownloadAll = () => {
    if (heroResizedItems.length === 0) return;
    heroResizedItems.forEach((item, index) => {
      setTimeout(() => {
        handleHeroDownloadSingle(item);
      }, index * 250);
    });
  };

  const handleHeroReset = () => {
    setHeroItems([]);
    setHeroResizedItems([]);
    setHeroWidth(1200);
    setHeroHeight(630);
    if (heroFileInputRef.current) heroFileInputRef.current.value = '';
  };

  // High-traffic popular tools tailored for USA & Global users
  const popularTools = [
    {
      id: 'us-passport-photo-resizer',
      name: 'US Passport Photo Resizer',
      description: 'Resize & crop to 2x2 in (600x600 px) State.gov standards',
      route: '/us-passport-photo-resizer',
      icon: Camera,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-600',
      badge: '🇺🇸 US Official',
      badgeBg: 'bg-blue-50 text-blue-700',
      arrowBg: 'group-hover:bg-blue-600 group-hover:text-white text-blue-600 bg-blue-50'
    },
    {
      id: 'resize-image-in-kb',
      name: 'Resize Image in KB',
      description: 'Compress to exact 20KB, 50KB, 100KB, 200KB for USCIS & jobs',
      route: '/resize-image-in-kb',
      icon: Sliders,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-600',
      badge: 'Exact KB',
      badgeBg: 'bg-emerald-50 text-emerald-700',
      arrowBg: 'group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 bg-emerald-50'
    },
    {
      id: 'inches-to-pixels-photo-resizer',
      name: 'Inches to Pixels Resizer',
      description: 'Convert 2x2, 4x6, 5x7, 8.5x11 inches to 300 DPI print pixels',
      route: '/inches-to-pixels-photo-resizer',
      icon: Ruler,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-600',
      badge: '300 DPI',
      badgeBg: 'bg-purple-50 text-purple-700',
      arrowBg: 'group-hover:bg-purple-600 group-hover:text-white text-purple-600 bg-purple-50'
    },
    {
      id: 'image-resizer',
      name: 'Image Resizer',
      description: 'Resize images online with custom dimensions and ratios',
      route: '/image-resizer',
      icon: ImageIcon,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-600',
      badge: 'Popular',
      badgeBg: 'bg-blue-50 text-blue-700',
      arrowBg: 'group-hover:bg-blue-600 group-hover:text-white text-blue-600 bg-blue-50'
    },
    {
      id: 'compress-image',
      name: 'Compress Image',
      description: 'Reduce file size easily without quality degradation',
      route: '/compress-image',
      icon: Zap,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-500',
      badge: 'Fast',
      badgeBg: 'bg-rose-50 text-rose-700',
      arrowBg: 'group-hover:bg-rose-600 group-hover:text-white text-rose-600 bg-rose-50'
    },
    {
      id: 'jpg-to-pdf',
      name: 'JPG to PDF',
      description: 'Convert JPG photos to clean, multi-page PDF documents',
      route: '/jpg-to-pdf',
      icon: FileText,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-500',
      badge: 'Popular',
      badgeBg: 'bg-amber-50 text-amber-700',
      arrowBg: 'group-hover:bg-amber-600 group-hover:text-white text-amber-600 bg-amber-50'
    },
    {
      id: 'pdf-to-jpg',
      name: 'PDF to JPG',
      description: 'Convert PDF documents to high-resolution JPG images',
      route: '/pdf-to-jpg',
      icon: FileText,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-500',
      badge: 'Free',
      badgeBg: 'bg-emerald-50 text-emerald-700',
      arrowBg: 'group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 bg-emerald-50'
    },
    {
      id: 'merge-pdf',
      name: 'Merge PDF',
      description: 'Combine multiple PDF documents into one single file',
      route: '/merge-pdf',
      icon: Layers,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-600',
      badge: 'Popular',
      badgeBg: 'bg-rose-50 text-rose-700',
      arrowBg: 'group-hover:bg-rose-600 group-hover:text-white text-rose-600 bg-rose-50'
    },
    {
      id: 'typing-test',
      name: 'Typing Test',
      description: 'Test & improve your typing speed',
      route: '/typing-test',
      icon: Keyboard,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-600',
      badgeBg: 'bg-purple-50 text-purple-700',
      arrowBg: 'group-hover:bg-purple-600 group-hover:text-white text-purple-600 bg-purple-50'
    }
  ];

  const categoryIcons = {
    'image-tools': ImageIcon,
    'pdf-tools': FileText,
    'calculator-tools': Calculator,
    'text-tools': Type,
    'seo-tools': BarChart2,
    'developer-tools': Code2,
    'unit-converter': ArrowLeftRight,
    'other-tools': LayoutGrid
  };

  return (
    <div className="space-y-5 sm:space-y-7 pb-6 sm:pb-8 overflow-hidden">
      <SEOHead 
        title="PhotoKB - Free Online Image Resizer, PDF Tools & Calculators in USA"
        description="Fast, 100% free in-browser tools: US passport photo resizer 2x2, resize image in KB (20KB, 50KB, 100KB), image compression, JPG to PDF converter, and accurate calculators."
        canonical="/"
        schema={FAQ_SCHEMA}
      />

      {/* ========================================================
          1. HERO SECTION: IMAGE RESIZER TOOL
          ======================================================== */}
      <section className="py-5 sm:py-7 lg:py-8 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight text-center mb-1.5 sm:mb-2">
            Free Online Image Resizer &amp; PDF Tools
          </h1>
          <p className="text-center text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-3.5 sm:mb-4">
            Fast, 100% private in-browser image compression, US passport 2x2 photo resizing, and file conversion with zero server wait times.
          </p>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={heroFileInputRef}
            onChange={handleHeroFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />

          {/* Dotted Upload Box */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleHeroDrop}
            onClick={() => heroItems.length === 0 && heroFileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl sm:rounded-2xl p-5 sm:p-7 text-center bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col items-center justify-center min-h-[130px] sm:min-h-[150px]"
          >
            {heroItems.length === 0 ? (
              <>
                <p className="text-xs sm:text-sm font-bold text-slate-800 mb-3 tracking-wide">
                  Select Or Drag & Drop Images Here
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    heroFileInputRef.current?.click();
                  }}
                  className="px-6 py-2 bg-[#3b79c9] hover:bg-[#2d68b4] text-white rounded-full font-semibold text-xs sm:text-sm shadow-sm active:scale-95 transition-all"
                >
                  Select Images
                </button>
              </>
            ) : heroItems.length === 1 ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-white shadow-md border-2 border-white p-1">
                  <img src={heroItems[0].src} alt="Preview" className="w-full h-full object-contain" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-xs">
                  {heroItems[0].name}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-600">
                  Original: {heroItems[0].origWidth} X {heroItems[0].origHeight} px
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    heroFileInputRef.current?.click();
                  }}
                  className="text-xs font-bold text-[#3b79c9] hover:underline"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center -space-x-3 overflow-hidden p-1">
                  {heroItems.slice(0, 4).map((it) => (
                    <img
                      key={it.id}
                      src={it.src}
                      alt="Thumb"
                      className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md"
                    />
                  ))}
                  {heroItems.length > 4 && (
                    <div className="w-14 h-14 rounded-xl bg-[#3b79c9] text-white font-bold flex items-center justify-center text-xs border-2 border-white shadow-md">
                      +{heroItems.length - 4}
                    </div>
                  )}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  {heroItems.length} Images Selected
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    heroFileInputRef.current?.click();
                  }}
                  className="text-xs font-bold text-[#3b79c9] hover:underline"
                >
                  Change Images
                </button>
              </div>
            )}
          </div>

          {/* Width & Height Inputs Row */}
          <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center space-x-1.5">
              <label htmlFor="hero-width" className="text-xs sm:text-sm font-bold text-slate-900">
                Width:
              </label>
              <input
                id="hero-width"
                type="number"
                min="1"
                max="10000"
                value={heroWidth}
                onChange={(e) => setHeroWidth(e.target.value)}
                className="w-20 sm:w-24 px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs sm:text-sm font-semibold text-center text-slate-900 shadow-2xs focus:outline-[#3b79c9]"
              />
              <span className="text-xs sm:text-sm font-bold text-slate-600">px</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <label htmlFor="hero-height" className="text-xs sm:text-sm font-bold text-slate-900">
                Height:
              </label>
              <input
                id="hero-height"
                type="number"
                min="1"
                max="10000"
                value={heroHeight}
                onChange={(e) => setHeroHeight(e.target.value)}
                className="w-20 sm:w-24 px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs sm:text-sm font-semibold text-center text-slate-900 shadow-2xs focus:outline-[#3b79c9]"
              />
              <span className="text-xs sm:text-sm font-bold text-slate-600">px</span>
            </div>
          </div>

          {/* Action Button: Resize */}
          <div className="mt-3.5 sm:mt-4 flex flex-col items-center">
            <button
              type="button"
              onClick={handleHeroResize}
              disabled={heroIsProcessing}
              className="px-8 py-2 bg-[#3b79c9] hover:bg-[#2d68b4] text-white rounded-full font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              {heroIsProcessing ? 'Resizing...' : 'Resize'}
            </button>

            {/* Results: Download All Button & Table (Matching User Screenshot) */}
            {heroResizedItems.length > 0 && (
              <div className="mt-4 sm:mt-5 flex flex-col items-center w-full animate-fadeIn">
                {/* Red / Rust Download All Images Button */}
                <button
                  type="button"
                  onClick={handleHeroDownloadAll}
                  className="px-6 sm:px-8 py-2.5 bg-[#3b79c9] hover:bg-[#a53f3f] text-white font-bold text-sm sm:text-base rounded-xl shadow-md active:scale-95 transition-all inline-flex items-center justify-center space-x-2"
                >
                  <span>⬇ Download All Images</span>
                </button>

                {/* Table matching screenshot with mobile horizontal scroll */}
                <div className="mt-3.5 sm:mt-4 w-full max-w-4xl overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-xs">
                  <table className="w-full border-collapse text-left min-w-[550px] sm:min-w-full">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/50">
                        <th className="py-2.5 px-3 border-r border-slate-200 text-center font-bold text-slate-800 text-xs sm:text-sm w-12">
                          #
                        </th>
                        <th className="py-2.5 px-4 border-r border-slate-200 font-bold text-slate-800 text-xs sm:text-sm">
                          File Name
                        </th>
                        <th className="py-2.5 px-4 border-r border-slate-200 font-bold text-slate-800 text-xs sm:text-sm">
                          Original (px)
                        </th>
                        <th className="py-2.5 px-4 border-r border-slate-200 font-bold text-slate-800 text-xs sm:text-sm">
                          New (px)
                        </th>
                        <th className="py-2.5 px-4 text-center font-bold text-slate-800 text-xs sm:text-sm">
                          Download
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {heroResizedItems.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-3 border-r border-slate-200 text-center font-bold text-slate-800 text-xs sm:text-sm">
                            {idx + 1}.
                          </td>
                          <td className="py-2.5 px-4 border-r border-slate-200 font-bold text-slate-800 text-xs sm:text-sm truncate max-w-[160px] sm:max-w-none">
                            {item.name}
                          </td>
                          <td className="py-2.5 px-4 border-r border-slate-200 font-bold text-slate-800 text-xs sm:text-sm">
                            {item.origWidth} X {item.origHeight}
                          </td>
                          <td className="py-2.5 px-4 border-r border-slate-200 font-bold text-slate-800 text-xs sm:text-sm">
                            {item.newWidth} X {item.newHeight}
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleHeroDownloadSingle(item)}
                              className="px-4 py-1.5 bg-[#3b79c9] hover:bg-[#2e6bb5] text-white rounded font-bold text-xs shadow-xs transition-all inline-flex items-center space-x-1"
                            >
                              <span>Download</span>
                              <span>⬇</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Reset button */}
                <div className="mt-2.5 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleHeroReset}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline"
                  >
                    Clear / Reset
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>


      {/* ========================================================
          2. POPULAR TOOLS GRID
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2.5 sm:mb-3.5 gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Popular Tools
            </h2>
            <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">
              Most used tools to make your work easier and faster.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 rounded-lg px-2.5 py-1 transition-all bg-blue-50/50 hover:bg-blue-50 w-fit"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {popularTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link
                key={tool.id}
                to={tool.route}
                className="group bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${tool.iconBg} text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200`}>
                      <IconComponent className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex items-center space-x-1.5">
                      {tool.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tool.badgeBg}`}>
                          {tool.badge}
                        </span>
                      )}
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${tool.arrowBg}`}>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>


      {/* ========================================================
          3. BROWSE TOOLS BY CATEGORY
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-2.5 sm:mb-3.5">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Browse Tools by Category
          </h2>
          <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">
            Find the right tool quickly from our categorized collection.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => {
            const IconComp = categoryIcons[cat.id] || LayoutGrid;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group bg-white rounded-xl border border-slate-200 p-2 sm:p-2.5 text-center hover:border-blue-400 hover:shadow-2xs transition-all duration-200 flex flex-col items-center justify-center"
              >
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${cat.bgLight} border flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform`}>
                  <IconComp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <h3 className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                  {cat.name}
                </h3>
                <span className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>


      {/* ========================================================
          4. WHY CHOOSE PHOTOKB? (With USA Map ribbon badge)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 border border-blue-100/80 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
            
            {/* Left 4 points */}
            <div className="lg:col-span-8 space-y-3">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Why Choose PhotoKB?
                </h2>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">
                  Simple, fast and reliable online tools for your everyday needs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start space-x-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">Fast & Easy to Use</h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Get results in seconds with 0 learning curve.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">100% Free</h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">No hidden charges, trial periods or paywalls.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">Safe & Secure</h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Your files stay private and never touch a remote server.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">Works on All Devices</h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Desktop, Mobile & Tablet compatible everywhere.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right USA Ribbon Card */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-center w-full max-w-xs">
                {/* Ribbon */}
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-700 via-rose-600 to-red-600 text-white text-[10px] font-black shadow-xs mb-1.5">
                  <span>🇺🇸</span>
                  <span>Made for USA Users</span>
                </div>
                <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  High-Speed <br />
                  <span className="text-blue-600">Client Engine</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
                  Compliant with strict US privacy standards. Zero data harvested.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          5. STATS BANNER
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-[#0b132b] text-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            <div className="pt-1.5 md:pt-0">
              <div className="flex items-center justify-center space-x-1 mb-0.5">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xl sm:text-2xl font-black text-white">5M+</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Happy Users</p>
            </div>

            <div className="pt-1.5 md:pt-0">
              <div className="flex items-center justify-center space-x-1 mb-0.5">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                <span className="text-xl sm:text-2xl font-black text-white">50+</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Online Tools</p>
            </div>

            <div className="pt-1.5 md:pt-0">
              <div className="flex items-center justify-center space-x-1 mb-0.5">
                <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="text-xl sm:text-2xl font-black text-white">100%</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Free to Use</p>
            </div>

            <div className="pt-1.5 md:pt-0">
              <div className="flex items-center justify-center space-x-1 mb-0.5">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                <span className="text-xl sm:text-2xl font-black text-white">4.9<span className="text-xs text-slate-400">/5</span></span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">User Ratings</p>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          6. HOW PHOTOKB WORKS? (3 Simple Steps)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            How PhotoKB Works?
          </h2>
          <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">
            Get your results in just 3 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 relative">
          
          {/* Step 1 */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 text-center shadow-2xs relative">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center mx-auto mb-2 shadow-2xs">
              1
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
              <Upload className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">Upload File</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Upload your file or enter details in the tool interface.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 text-center shadow-2xs relative">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center mx-auto mb-2 shadow-2xs">
              2
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">Process Online</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Our tool processes your request instantly inside your browser.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 text-center shadow-2xs relative">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center mx-auto mb-2 shadow-2xs">
              3
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
              <Download className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">Download Result</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Get your result and use it anywhere for free without watermarks.
            </p>
          </div>

        </div>
      </section>


      {/* ========================================================
          7. LATEST BLOG POSTS
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2.5 sm:mb-3.5 gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Latest Blog Posts
            </h2>
            <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">
              Tips, guides and useful information to help you get the most out of our tools.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 rounded-lg px-2.5 py-1 transition-all bg-blue-50/50 hover:bg-blue-50 w-fit"
          >
            <span>View All Posts</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              {/* Featured Image */}
              <div className="h-36 sm:h-40 bg-slate-100 overflow-hidden relative">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.imageAlt || post.title}
                    width="400"
                    height="225"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 via-indigo-50 to-slate-100 flex items-center justify-center p-2.5">
                    <div className="w-10 h-10 rounded-lg bg-white shadow-2xs flex items-center justify-center text-blue-600 font-bold group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-bold text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-xs">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-2.5 text-[10px] sm:text-[11px] text-slate-400">
                  <span>{post.date}</span>
                  <div className="w-5 h-5 rounded-full bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* ========================================================
          16. FAQ SECTION (E-E-A-T OPTIMIZED & ACCESSIBLE)
          ======================================================== */}
      <section className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8" aria-labelledby="faq-section-heading">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 id="faq-section-heading" className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-xl mx-auto leading-relaxed">
            Transparent and accurate answers on our in-browser privacy architecture, precise KB compression algorithms, and official document standards.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 pt-1" role="tablist" aria-label="FAQ Categories">
            {FAQ_CATEGORIES.map((cat) => {
              const isSelected = selectedFaqCategory === cat.id;
              const count = cat.id === 'all' 
                ? FAQ_ITEMS.length 
                : FAQ_ITEMS.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedFaqCategory(cat.id);
                    setOpenFaqId(null);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-2xs shadow-blue-500/20 ring-2 ring-blue-600/30'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion Items */}
        <div className="space-y-2.5 sm:space-y-3" role="presentation">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            const buttonId = `faq-btn-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen 
                    ? 'border-blue-500 shadow-sm ring-1 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <h3 className="m-0 p-0 text-base font-semibold">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-start justify-between gap-3 font-semibold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {faq.categoryLabel}
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 mt-1 ${
                        isOpen ? 'rotate-180 bg-blue-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-500'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={`${isOpen ? 'block' : 'hidden'}`}
                >
                  <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50">
                    {/* Detailed Answer */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* ========================================================
          8. SUBSCRIBE TO NEWSLETTER
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 lg:p-6 border border-blue-200/80">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
            
            {/* Text & Icon */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                <Mail className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5">
                  Get the latest tools, updates and useful tips directly in your inbox.
                </p>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-blue-600 shadow-2xs"
                  aria-label="Email Address"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center space-x-1.5 shadow-2xs flex-shrink-0 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </div>
              {subscribed && (
                <div className="text-xs text-emerald-600 font-bold mt-1 text-center sm:text-left">
                  ✓ Thank you! You've successfully subscribed to PhotoKB updates.
                </div>
              )}
            </form>

          </div>
        </div>
      </section>

    </div>
  );
}

