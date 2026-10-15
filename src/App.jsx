import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';

// Layout & Global Components (Synchronous for instant shell rendering)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import ScrollToTop from './components/ScrollToTop';

// Core Home Page (Synchronous for fastest first contentful paint)
import HomePage from './pages/HomePage';

// Lazy-loaded Secondary Pages
const AllToolsPage = lazy(() => import('./pages/AllToolsPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Lazy-loaded Tool Pages
const ImageResizer = lazy(() => import('./pages/tools/ImageResizer'));
const CompressImage = lazy(() => import('./pages/tools/CompressImage'));
const JpgToPdf = lazy(() => import('./pages/tools/JpgToPdf'));
const PdfToJpg = lazy(() => import('./pages/tools/PdfToJpg'));
const MergePdf = lazy(() => import('./pages/tools/MergePdf'));
const SplitPdf = lazy(() => import('./pages/tools/SplitPdf'));
const AgeCalculator = lazy(() => import('./pages/tools/AgeCalculator'));
const TypingTest = lazy(() => import('./pages/tools/TypingTest'));
const WordCounter = lazy(() => import('./pages/tools/WordCounter'));
const UnitConverter = lazy(() => import('./pages/tools/UnitConverter'));
const MetaTagGenerator = lazy(() => import('./pages/tools/MetaTagGenerator'));
const PercentageCalculator = lazy(() => import('./pages/tools/PercentageCalculator'));
const UsPassportPhotoResizer = lazy(() => import('./pages/tools/UsPassportPhotoResizer'));
const ResizeImageInKb = lazy(() => import('./pages/tools/ResizeImageInKb'));
const InchesToPixelsResizer = lazy(() => import('./pages/tools/InchesToPixelsResizer'));
const GenericToolPage = lazy(() => import('./pages/tools/GenericToolPage'));

// Lightweight loading indicator for split route transitions
function PageFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 space-y-2.5">
      <div className="w-8 h-8 border-3 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
      <span className="text-xs font-semibold text-slate-400">Loading PhotoKB...</span>
    </div>
  );
}

// Redirect helper for legacy /tools/:id links
function LegacyToolRedirect() {
  const { toolId } = useParams();
  return <Navigate to={`/${toolId}`} replace />;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
        {/* Navigation Header */}
        <Navbar onOpenSearch={() => setSearchOpen(true)} />

        {/* Global Search Dialog */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Dynamic Page Router */}
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomePage onOpenSearch={() => setSearchOpen(true)} />} />
            <Route path="/tools" element={<AllToolsPage />} />
            <Route path="/all-tools" element={<AllToolsPage />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            {/* Core Static Brand Pages */}
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/about" element={<Navigate to="/about-us" replace />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/terms-and-conditions/*" element={<TermsPage />} />
            <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />

            {/* Direct Tool Routes (without /tools/ prefix) */}
            <Route path="/image-resizer" element={<ImageResizer />} />
            <Route path="/compress-image" element={<CompressImage />} />
            <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
            <Route path="/split-pdf" element={<SplitPdf />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/typing-test" element={<TypingTest />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/meta-tag-generator" element={<MetaTagGenerator />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />

            {/* Dedicated High-Traffic USA Tools & Blog Internal Link Aliases */}
            <Route path="/us-passport-photo-resizer" element={<UsPassportPhotoResizer />} />
            <Route path="/us-visa-photo-tool" element={<UsPassportPhotoResizer />} />
            <Route path="/2x2-photo-maker" element={<UsPassportPhotoResizer />} />
            <Route path="/resize-image-in-kb" element={<ResizeImageInKb />} />
            <Route path="/compress-image-to-50kb" element={<ResizeImageInKb />} />
            <Route path="/compress-image-to-100kb" element={<ResizeImageInKb />} />
            <Route path="/image-compress-to-100kb" element={<ResizeImageInKb />} />
            <Route path="/compress-image-to-200kb" element={<ResizeImageInKb />} />
            <Route path="/compress-image-to-500kb" element={<ResizeImageInKb />} />
            <Route path="/image-compressor" element={<CompressImage />} />
            <Route path="/jpg-compressor" element={<CompressImage />} />
            <Route path="/png-compressor" element={<CompressImage />} />
            <Route path="/image-format-converter" element={<ImageResizer />} />
            <Route path="/inches-to-pixels-photo-resizer" element={<InchesToPixelsResizer />} />

            {/* Automatic redirects for any legacy /tools/:id URLs */}
            <Route path="/tools/:toolId" element={<LegacyToolRedirect />} />

            {/* Direct Catch-all for remaining individual tools */}
            <Route path="/:toolId" element={<GenericToolPage />} />

            {/* Dedicated 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
