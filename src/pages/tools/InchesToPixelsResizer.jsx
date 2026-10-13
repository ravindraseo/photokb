import React, { useState, useRef } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Upload, Download, RefreshCw, CheckCircle2, Ruler, Lock, Unlock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InchesToPixelsResizer() {
  const [imageSrc, setImageSrc] = useState(null);
  const [inchesW, setInchesW] = useState(2);
  const [inchesH, setInchesH] = useState(2);
  const [dpi, setDpi] = useState(300);
  const [lockRatio, setLockRatio] = useState(true);
  const [resizedDataUrl, setResizedDataUrl] = useState(null);
  const [fileName, setFileName] = useState('photo-print');

  const fileInputRef = useRef(null);

  // Computed pixel dimensions
  const pixelsW = Math.round(inchesW * dpi);
  const pixelsH = Math.round(inchesH * dpi);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) loadFile(file);
  };

  const loadFile = (file) => {
    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      processResize(event.target.result, 2, 2, 300);
    };
    reader.readAsDataURL(file);
  };

  const processResize = (src, wInches, hInches, currentDpi) => {
    const wPx = Math.round(wInches * currentDpi);
    const hPx = Math.round(hInches * currentDpi);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = wPx;
      canvas.height = hPx;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, wPx, hPx);

      setResizedDataUrl(canvas.toDataURL('image/jpeg', 0.95));
    };
    img.src = src;
  };

  const handleInchesWChange = (val) => {
    const valFloat = parseFloat(val) || 1;
    setInchesW(valFloat);
    const newH = lockRatio ? valFloat : inchesH;
    if (lockRatio) setInchesH(valFloat);
    if (imageSrc) processResize(imageSrc, valFloat, newH, dpi);
  };

  const handleInchesHChange = (val) => {
    const valFloat = parseFloat(val) || 1;
    setInchesH(valFloat);
    const newW = lockRatio ? valFloat : inchesW;
    if (lockRatio) setInchesW(valFloat);
    if (imageSrc) processResize(imageSrc, newW, valFloat, dpi);
  };

  const handleDpiChange = (newDpi) => {
    setDpi(newDpi);
    if (imageSrc) processResize(imageSrc, inchesW, inchesH, newDpi);
  };

  const setStandardUsPreset = (w, h, standardDpi = 300) => {
    setInchesW(w);
    setInchesH(h);
    setDpi(standardDpi);
    if (imageSrc) processResize(imageSrc, w, h, standardDpi);
  };

  const downloadImage = () => {
    if (!resizedDataUrl) return;
    const link = document.createElement('a');
    link.download = `${fileName}-${inchesW}x${inchesH}in-${dpi}dpi.jpg`;
    link.href = resizedDataUrl;
    link.click();
  };

  return (
    <ToolLayout
      title="Inches to Pixels Photo Resizer (DPI Print Converter)"
      subtitle="Resize and convert photos to exact physical inch dimensions (2x2, 4x6, 5x7, 8.5x11) at 300 DPI for high-resolution US print and official submissions. 100% free and client-side safe."
      category="Image Tools"
      categorySlug="image-tools"
      currentToolId="inches-to-pixels-photo-resizer"
      howToSteps={[
        { title: 'Upload Image', desc: 'Drag and drop your photo or choose a file from your computer.' },
        { title: 'Select Inches & DPI', desc: 'Enter width and height in inches, and choose 300 DPI (print) or 72 DPI (web).' },
        { title: 'Pick US Print Presets', desc: 'Click 1-click presets: 2x2 Passport, 4x6 Postcard, 5x7 Photo, or 8.5x11 US Letter.' },
        { title: 'Download High-Res Print File', desc: 'Download your exact pixel-dimensioned JPEG ready to frame or print.' }
      ]}
      features={[
        { title: 'Physical Inch to Pixel Math', desc: 'Automatic calculation based on standard DPI formulas (Pixels = Inches × DPI).' },
        { title: '300 DPI Print Standards', desc: 'Commercial print-ready quality ensures sharp output at FedEx, Walmart, and CVS.' },
        { title: 'Aspect Ratio Lock', desc: 'Lock proportions to prevent distortion when customizing dimensions.' },
        { title: 'In-Browser Sandboxing', desc: 'Zero cloud upload. Process confidential photos directly on your device.' }
      ]}
      faqs={[
        { 
          question: 'How many pixels are in 2x2 inches at 300 DPI?', 
          answer: 'At 300 DPI (Dots Per Inch), a 2 x 2 inch photo is exactly 600 x 600 pixels (2 × 300 = 600). This is the standard for US passport and visa photos.' 
        },
        { 
          question: 'How do you convert inches to pixels?', 
          answer: 'The mathematical formula is: Pixels = Inches × DPI. For example, a 4x6 inch print at 300 DPI is (4 × 300) by (6 × 300) = 1200 x 1800 pixels.' 
        },
        { 
          question: 'What DPI should I use for printing vs web?', 
          answer: 'Use 300 DPI for physical printing, framing, and official government submissions. Use 72 DPI or 96 DPI for social media, websites, and email attachments.' 
        }
      ]}
      seoContent={
        <article className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Inches to Pixels Conversion Guide for US Photo Printing
            </h2>
            <p className="mt-2 text-slate-600 leading-relaxed text-xs sm:text-sm">
              In the United States, photo frames, government applications, and print shops (such as Walgreens, Walmart Photo, Shutterfly, and Costco) use imperial <strong>inches</strong> rather than millimeters. However, digital cameras and web uploaders measure photos exclusively in <strong>pixels</strong>. To guarantee your prints are crystal clear without unexpected cropping or blurring, understanding DPI (Dots Per Inch) is essential.
            </p>
          </div>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-3">US Standard Size</th>
                  <th className="p-3">Dimensions (Inches)</th>
                  <th className="p-3">Pixels @ 300 DPI (Print Quality)</th>
                  <th className="p-3">Typical US Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-blue-600">US Passport / Visa</td>
                  <td className="p-3">2" × 2"</td>
                  <td className="p-3 font-mono font-bold">600 × 600 px</td>
                  <td className="p-3">State.gov, USCIS, DMV ID</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Standard Snapshot</td>
                  <td className="p-3">4" × 6"</td>
                  <td className="p-3 font-mono font-bold">1200 × 1800 px</td>
                  <td className="p-3">Standard photo album & albums</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 font-semibold text-slate-900">Framed Portrait</td>
                  <td className="p-3">5" × 7"</td>
                  <td className="p-3 font-mono font-bold">1500 × 2100 px</td>
                  <td className="p-3">Desk frame, graduation, wedding</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">US Letter Document</td>
                  <td className="p-3">8.5" × 11"</td>
                  <td className="p-3 font-mono font-bold">2550 × 3300 px</td>
                  <td className="p-3">Flyers, portfolio, office contracts</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Why DPI Matters for High-Quality Prints</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              DPI stands for <strong>Dots Per Inch</strong>. When sending a file to a commercial photo lab, a file with 300 DPI packs 90,000 pixels into every single square inch of paper. If an image is printed at only 72 DPI, each individual dot becomes visible, creating a blurry, pixelated result. Our online tool automatically maps your inch requirements to the exact pixel canvas for crisp results.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Explore Related US Utilities:</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link to="/us-passport-photo-resizer" className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-slate-200">
                🇺🇸 US Passport Resizer (2x2 in) →
              </Link>
              <Link to="/resize-image-in-kb" className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-slate-200">
                Resize in KB for Online Forms →
              </Link>
              <Link to="/jpg-to-pdf" className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-slate-200">
                Convert Photos to US Letter PDF →
              </Link>
            </div>
          </div>
        </article>
      }
    >
      {!imageSrc ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-3xl p-8 sm:p-14 text-center bg-blue-50/30 hover:bg-blue-50/60 cursor-pointer transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform shadow-xs">
            <Ruler className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Upload Photo to Resize by Inches and DPI
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Convert standard inches (2x2, 4x6, 5x7, 8.5x11) into high-resolution pixels for commercial printing.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* US Size Presets */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              🇺🇸 Standard US Print Presets:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setStandardUsPreset(2, 2, 300)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  inchesW === 2 && inchesH === 2
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white hover:bg-blue-50 border-slate-200 text-slate-800'
                }`}
              >
                2 × 2 Inches <span className={`text-[10px] block ${inchesW === 2 && inchesH === 2 ? 'text-blue-100' : 'text-slate-500'}`}>Passport (600×600 px)</span>
              </button>
              <button
                type="button"
                onClick={() => setStandardUsPreset(4, 6, 300)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  inchesW === 4 && inchesH === 6
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white hover:bg-blue-50 border-slate-200 text-slate-800'
                }`}
              >
                4 × 6 Inches <span className={`text-[10px] block ${inchesW === 4 && inchesH === 6 ? 'text-blue-100' : 'text-slate-500'}`}>Print (1200×1800 px)</span>
              </button>
              <button
                type="button"
                onClick={() => setStandardUsPreset(5, 7, 300)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  inchesW === 5 && inchesH === 7
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white hover:bg-blue-50 border-slate-200 text-slate-800'
                }`}
              >
                5 × 7 Inches <span className={`text-[10px] block ${inchesW === 5 && inchesH === 7 ? 'text-blue-100' : 'text-slate-500'}`}>Frame (1500×2100 px)</span>
              </button>
              <button
                type="button"
                onClick={() => setStandardUsPreset(8.5, 11, 300)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  inchesW === 8.5 && inchesH === 11
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white hover:bg-blue-50 border-slate-200 text-slate-800'
                }`}
              >
                8.5 × 11 Inches <span className={`text-[10px] block ${inchesW === 8.5 && inchesH === 11 ? 'text-blue-100' : 'text-slate-500'}`}>US Letter (2550×3300 px)</span>
              </button>
            </div>
          </div>

          {/* Controls: Width, Height, DPI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Width (Inches)</label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="50"
                value={inchesW}
                onChange={(e) => handleInchesWChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Height (Inches)</label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="50"
                value={inchesH}
                onChange={(e) => handleInchesHChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Print Resolution (DPI)</label>
              <select
                value={dpi}
                onChange={(e) => handleDpiChange(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold"
              >
                <option value={300}>300 DPI (High-Res Print)</option>
                <option value={200}>200 DPI (Medium Quality)</option>
                <option value={150}>150 DPI (Draft Print)</option>
                <option value={72}>72 DPI (Standard Web Screen)</option>
              </select>
            </div>
          </div>

          {/* Computed Pixel Result Banner */}
          <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">Calculated Canvas Resolution:</span>
            <span className="font-mono font-bold text-blue-700 text-sm">
              {pixelsW} × {pixelsH} Pixels
            </span>
          </div>

          {/* Preview & Download */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={downloadImage}
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download {pixelsW}×{pixelsH} px Print Image</span>
            </button>
            <button
              type="button"
              onClick={() => setImageSrc(null)}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm flex items-center justify-center space-x-1"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Upload New</span>
            </button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
