import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  LayoutGrid, 
  ChevronDown, 
  Menu, 
  X, 
  Image as ImageIcon, 
  FileText, 
  Calculator, 
  BarChart2, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ALL_TOOLS } from '../data/toolsData';
import PhotoKBLogo from './PhotoKBLogo';

export default function Navbar({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Tools', path: '/tools' },
    { 
      name: 'Image Tools', 
      path: '/category/image-tools',
      dropdown: [
        { name: 'US Passport Resizer', path: '/us-passport-photo-resizer', desc: 'Exact 600x600 px State.gov specs' },
        { name: 'Resize Image in KB', path: '/resize-image-in-kb', desc: 'Compress to 20KB, 50KB, 100KB, 200KB' },
        { name: 'Image Resizer', path: '/image-resizer', desc: 'Resize custom pixels and presets' },
        { name: 'Inches to Pixels', path: '/inches-to-pixels-photo-resizer', desc: 'Convert inches to print pixels' },
        { name: 'Compress Image', path: '/compress-image', desc: 'Reduce file size with no quality loss' },
        { name: 'View All Image Tools', path: '/category/image-tools', isAll: true }
      ]
    },
    { 
      name: 'PDF Tools', 
      path: '/category/pdf-tools',
      dropdown: [
        { name: 'JPG to PDF', path: '/jpg-to-pdf', desc: 'Convert pictures to clean PDF' },
        { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Extract pages as high-res images' },
        { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs into one' },
        { name: 'Split PDF', path: '/split-pdf', desc: 'Extract pages and split documents' },
        { name: 'View All PDF Tools', path: '/category/pdf-tools', isAll: true }
      ]
    },
    { 
      name: 'Calculator Tools', 
      path: '/category/calculator-tools',
      dropdown: [
        { name: 'Age Calculator', path: '/age-calculator', desc: 'Precise age in years, months & days' },
        { name: 'Percentage Calculator', path: '/percentage-calculator', desc: 'Discounts, tax & rate changes' },
        { name: 'View All Calculators', path: '/category/calculator-tools', isAll: true }
      ]
    },
    { 
      name: 'SEO Tools', 
      path: '/category/seo-tools',
      dropdown: [
        { name: 'Meta Tag Generator', path: '/meta-tag-generator', desc: 'Preview Google & Twitter cards' },
        { name: 'View All SEO Tools', path: '/category/seo-tools', isAll: true }
      ]
    },
    { name: 'Blog', path: '/blog' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Unified PhotoKB Logo */}
          <PhotoKBLogo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const hasDropdown = !!link.dropdown;

              return (
                <div 
                  key={link.name} 
                  className="relative"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                      active 
                        ? 'text-blue-600 bg-blue-50/80 shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{link.name}</span>
                    {hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 ml-0.5 text-slate-400 transition-transform ${
                        activeDropdown === link.name ? 'rotate-180 text-blue-600' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 w-60 pt-1.5 z-50 animate-fadeIn">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 overflow-hidden ring-1 ring-black/5">
                        {link.dropdown.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.path}
                            onClick={() => setActiveDropdown(null)}
                            className={`block p-2 rounded-lg text-xs transition-colors ${
                              item.isAll
                                ? 'bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 text-center mt-1'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="font-semibold text-slate-900">{item.name}</div>
                            {item.desc && <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-transparent hover:border-blue-100"
              title="Search tools (Ctrl+K)"
              aria-label="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* "All Tools" Button with Grid Icon */}
            <Link
              to="/tools"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/25 active:scale-95 transition-all"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>All Tools</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-3 sm:px-4 pt-3 pb-6 shadow-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const hasDropdown = !!link.dropdown;
              const isExpanded = !!mobileExpanded[link.name];

              return (
                <div key={link.name} className="border-b border-slate-100 last:border-b-0 pb-1">
                  <div className="flex items-center justify-between">
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex-1 px-3 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-colors ${
                        isActive(link.path)
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {hasDropdown && (
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(prev => ({ ...prev, [link.name]: !prev[link.name] }))}
                        className="p-2.5 text-slate-400 hover:text-slate-600 rounded-lg active:scale-95 transition-all"
                        aria-label={`Toggle ${link.name} sub-menu`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-blue-600' : ''}`} />
                      </button>
                    )}
                  </div>

                  {hasDropdown && isExpanded && (
                    <div className="pl-3 pr-2 py-1 space-y-1 bg-slate-50/80 rounded-xl mb-1.5 border border-slate-100 animate-fadeIn">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                            item.isAll
                              ? 'text-blue-600 font-bold hover:bg-blue-50'
                              : 'text-slate-700 hover:bg-white hover:text-blue-600'
                          }`}
                        >
                          <div>{item.name}</div>
                          {item.desc && <div className="text-[10px] text-slate-400 font-normal mt-0.5">{item.desc}</div>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              to="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-600/20 active:scale-95 transition-all text-sm"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Explore All Tools</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
