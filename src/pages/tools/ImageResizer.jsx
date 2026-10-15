import React, { useState, useRef } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Upload, Download, RefreshCw, Image as ImageIcon, Lock, Unlock, Check } from 'lucide-react';

export default function ImageResizer() {
  const [imageSrc, setImageSrc] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState(800);
  const [targetHeight, setTargetHeight] = useState(600);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [resizedDataUrl, setResizedDataUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('resized-image');

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      loadFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      loadFile(file);
    }
  };

  const loadFile = (file) => {
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setTargetWidth(img.width);
        setTargetHeight(img.height);
        const ratio = img.width / img.height;
        setAspectRatio(ratio);
        setImageSrc(event.target.result);
        processResize(img, img.width, img.height, format, quality);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val) => {
    const width = parseInt(val) || 0;
    setTargetWidth(width);
    if (lockAspectRatio && aspectRatio) {
      setTargetHeight(Math.round(width / aspectRatio));
    }
  };

  const handleHeightChange = (val) => {
    const height = parseInt(val) || 0;
    setTargetHeight(height);
    if (lockAspectRatio && aspectRatio) {
      setTargetWidth(Math.round(height * aspectRatio));
    }
  };

  const processResize = (imgObj, w, h, fmt, q) => {
    if (!imgObj && !imageSrc) return;
    setIsProcessing(true);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    
    // high quality smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const source = imgObj || new Image();
    const doDraw = (image) => {
      ctx.drawImage(image, 0, 0, w, h);
      const output = canvas.toDataURL(fmt, q);
      setResizedDataUrl(output);
      setIsProcessing(false);
    };

    if (imgObj) {
      doDraw(imgObj);
    } else {
      source.onload = () => doDraw(source);
      source.src = imageSrc;
    }
  };

  const applyResize = () => {
    processResize(null, targetWidth, targetHeight, format, quality);
  };

  const downloadImage = () => {
    if (!resizedDataUrl) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const link = document.createElement('a');
    link.download = `${fileName}-resized-${targetWidth}x${targetHeight}.${ext}`;
    link.href = resizedDataUrl;
    link.click();
  };

  const handlePreset = (presetW, presetH) => {
    setTargetWidth(presetW);
    setTargetHeight(presetH);
    processResize(null, presetW, presetH, format, quality);
  };

  return (
    <ToolLayout
      title="Online Image Resizer"
      subtitle="Resize JPG, PNG, WEBP and GIF images by pixel dimensions, percentages, or official US Passport (2x2 inches / 600x600 px) & Visa presets. 100% free and client-side safe."
      category="Image Tools"
      categorySlug="image-tools"
      currentToolId="image-resizer"
      howToSteps={[
        { title: 'Upload Image', desc: 'Drag and drop your JPG or PNG image, or click the file upload zone.' },
        { title: 'Choose Dimensions or US Presets', desc: 'Type custom width and height or pick 1-click US Passport (2x2 in / 600x600 px), Visa, DMV, or social presets.' },
        { title: 'Lock Ratio & Format', desc: 'Keep aspect ratio locked to avoid distortion, then choose JPG, PNG or WEBP format.' },
        { title: 'Download Resized Image', desc: 'Hit download to save the processed image instantly with zero server lag.' }
      ]}
      features={[
        { title: 'US Passport & Visa Ready', desc: 'One-click 2x2 inch (600x600 px at 300 DPI) compliant with U.S. Department of State specifications.' },
        { title: 'Zero Quality Loss', desc: 'Uses advanced bicubic canvas interpolation for razor-sharp downscaling.' },
        { title: 'Aspect Ratio Lock', desc: 'Maintains proportional dimensions automatically so photos never look squished.' },
        { title: '100% Client-Side Privacy', desc: 'Your photos stay in your browser memory and never upload to external servers.' }
      ]}
      faqs={[
        { question: 'What is the official US Passport photo size in pixels?', answer: 'The U.S. Department of State requires a 2 x 2 inch (51 x 51 mm) photo. In digital format at 300 DPI, this is exactly 600 x 600 pixels in JPEG format under 240 KB.' },
        { question: 'Will resizing reduce image quality?', answer: 'Scaling down actually concentrates pixel density and keeps sharpness intact. Scaling up can introduce slight pixelation if scaled beyond the camera resolution.' },
        { question: 'What formats can I upload?', answer: 'You can upload JPG, JPEG, PNG, WEBP, GIF, BMP, and SVG files.' },
        { question: 'Is there a file limit or watermark?', answer: 'No! PhotoKB is completely free forever with zero watermarks and no limits.' }
      ]}
    >
      {!imageSrc ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-3xl p-10 sm:p-16 text-center bg-blue-50/30 hover:bg-blue-50/60 cursor-pointer transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Choose an image or drag & drop here
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Supports JPG, PNG, WEBP, GIF up to 50MB. Instant in-browser processing.
          </p>
          <button 
            type="button"
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/25 group-hover:bg-blue-700"
          >
            Select Image from Computer
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            
            {/* Dimensions */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Resize Dimensions (Pixels)
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <span className="text-[11px] text-slate-500">Width</span>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-blue-600"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setLockAspectRatio(!lockAspectRatio)}
                  title={lockAspectRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
                  className={`mt-4 p-2 rounded-lg border transition-colors ${
                    lockAspectRatio ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-slate-100 border-slate-300 text-slate-500'
                  }`}
                >
                  {lockAspectRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>

                <div className="flex-1">
                  <span className="text-[11px] text-slate-500">Height</span>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-blue-600"
                  />
                </div>
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                Original: {originalDimensions.width} × {originalDimensions.height} px
              </div>
            </div>

            {/* Format & Quality */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Output Format & Quality
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: 'JPEG', value: 'image/jpeg' },
                  { label: 'PNG', value: 'image/png' },
                  { label: 'WEBP', value: 'image/webp' }
                ].map((fmt) => (
                  <button
                    key={fmt.value}
                    type="button"
                    onClick={() => {
                      setFormat(fmt.value);
                      processResize(null, targetWidth, targetHeight, fmt.value, quality);
                    }}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                      format === fmt.value 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>

              {format !== 'image/png' && (
                <div>
                  <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                    <span>Quality</span>
                    <span className="font-bold">{Math.round(quality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) => {
                      const q = parseFloat(e.target.value);
                      setQuality(q);
                      processResize(null, targetWidth, targetHeight, format, q);
                    }}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  <span>🇺🇸 Official US Document Presets</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePreset(600, 600)}
                    className="px-2.5 py-2 text-xs bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 rounded-lg text-blue-900 font-semibold text-left transition-colors"
                  >
                    US Passport (2×2 in) <span className="text-[10px] text-blue-600 block">600×600 px • 300 DPI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset(600, 600)}
                    className="px-2.5 py-2 text-xs bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 rounded-lg text-blue-900 font-semibold text-left transition-colors"
                  >
                    US Visa / Green Card <span className="text-[10px] text-blue-600 block">600×600 px • State.gov</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset(400, 514)}
                    className="px-2.5 py-2 text-xs bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 rounded-lg text-blue-900 font-semibold text-left transition-colors"
                  >
                    US DMV / State ID <span className="text-[10px] text-blue-600 block">400×514 px</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset(2550, 3300)}
                    className="px-2.5 py-2 text-xs bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 rounded-lg text-blue-900 font-semibold text-left transition-colors"
                  >
                    US Letter Paper <span className="text-[10px] text-blue-600 block">8.5×11 in • 300 DPI</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Popular Social Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePreset(1080, 1080)}
                    className="px-2.5 py-1.5 text-xs bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium text-left"
                  >
                    Instagram Square <span className="text-[10px] text-slate-400 block">1080×1080</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset(1200, 630)}
                    className="px-2.5 py-1.5 text-xs bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium text-left"
                  >
                    Facebook Post <span className="text-[10px] text-slate-400 block">1200×630</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset(1920, 1080)}
                    className="px-2.5 py-1.5 text-xs bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium text-left"
                  >
                    Full HD 1080p <span className="text-[10px] text-slate-400 block">1920×1080</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreset(800, 800)}
                    className="px-2.5 py-1.5 text-xs bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium text-left"
                  >
                    Avatar / Profile <span className="text-[10px] text-slate-400 block">800×800</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={applyResize}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center space-x-2 shadow-md shadow-blue-500/20"
              >
                <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>Apply Resize</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageSrc(null);
                  setResizedDataUrl(null);
                }}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-sm font-bold"
              >
                Choose Another Image
              </button>
            </div>

            <button
              type="button"
              onClick={downloadImage}
              disabled={!resizedDataUrl}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Download Resized Image</span>
            </button>
          </div>

          {/* Image Preview Window */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-900/5">
            <div className="text-xs font-bold text-slate-600 mb-2 flex items-center justify-between">
              <span>Output Preview ({targetWidth} × {targetHeight} px)</span>
              <span className="text-emerald-600 font-semibold flex items-center">
                <Check className="w-3.5 h-3.5 mr-1" /> Ready for download
              </span>
            </div>
            <div className="max-h-[500px] overflow-auto flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] rounded-xl p-4">
              {resizedDataUrl ? (
                <img
                  src={resizedDataUrl}
                  alt="Resized photo output preview"
                  className="max-h-[460px] object-contain rounded-lg shadow-md border border-slate-200"
                />
              ) : (
                <div className="text-slate-400 text-sm">Rendering preview...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
