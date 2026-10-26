'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  UploadCloud,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Sliders,
  Maximize2,
  Lock,
  Unlock,
  Check,
  Copy,
  ArrowRight,
  Info
} from 'lucide-react';
import { compressImage, formatFileSize, CompressionResult } from '@/lib/compressor';
import confetti from 'canvas-confetti';

interface ImageProcessorProps {
  defaultTargetKB?: number;
  defaultFormat?: 'image/jpeg' | 'image/png' | 'image/webp';
  toolMode?: 'compress' | 'resize' | 'convert' | 'passport';
  showSideHeroCard?: boolean;
}

export function ImageProcessor({
  defaultTargetKB = 50,
  defaultFormat = 'image/jpeg',
  toolMode = 'compress',
  showSideHeroCard = true,
}: ImageProcessorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [targetKB, setTargetKB] = useState<number>(defaultTargetKB);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>(defaultFormat);
  const [quality, setQuality] = useState<number>(85);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger compression
  const processImageFile = useCallback(
    async (uploadedFile: File, forcedTargetKB?: number) => {
      setIsProcessing(true);
      try {
        const kb = forcedTargetKB !== undefined ? forcedTargetKB : targetKB;
        const res = await compressImage(uploadedFile, {
          maxSizeKB: kb > 0 ? kb : undefined,
          quality: kb > 0 ? undefined : quality / 100,
          maxWidth: width > 0 ? width : undefined,
          maxHeight: height > 0 ? height : undefined,
          format: format,
        });
        setResult(res);

        // Gentle celebratory confetti if big savings achieved
        if (res.savedPercent >= 50) {
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#2563eb', '#38bdf8', '#4ade80']
            });
          } catch {
            // ignore if canvas unavailable
          }
        }
      } catch (err) {
        console.error('Compression error:', err);
      } finally {
        setIsProcessing(false);
      }
    },
    [targetKB, quality, width, height, format]
  );

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WEBP).');
      return;
    }
    setFile(selectedFile);

    // Read dimensions
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      setOriginalWidth(w);
      setOriginalHeight(h);
      setWidth(w);
      setHeight(h);
      processImageFile(selectedFile);
    };
    img.src = URL.createObjectURL(selectedFile);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (aspectRatioLocked && originalWidth > 0 && originalHeight > 0) {
      setHeight(Math.round((val / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (aspectRatioLocked && originalWidth > 0 && originalHeight > 0) {
      setWidth(Math.round((val / originalHeight) * originalWidth));
    }
  };

  const handleQuickKB = (kb: number) => {
    setTargetKB(kb);
    if (file) {
      processImageFile(file, kb);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.dataUrl;
    const ext = result.format.includes('png') ? 'png' : result.format.includes('webp') ? 'webp' : 'jpg';
    const baseName = file ? file.name.substring(0, file.name.lastIndexOf('.')) || 'image' : 'photo';
    a.download = `${baseName}_compressed_${Math.round(result.compressedSize / 1024)}kb.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyToClipboard = async () => {
    if (!result) return;
    try {
      const item = new ClipboardItem({ [result.blob.type]: result.blob });
      await navigator.clipboard.write([item]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Direct image copy not supported on this browser. Please use Download.');
    }
  };

  return (
    <div className="w-full">
      <div className={`grid gap-6 ${showSideHeroCard ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Left Side: Upload Zone & Controls */}
        <div className={`${showSideHeroCard ? 'lg:col-span-7' : 'w-full'} flex flex-col justify-center`}>
          {/* Main Drop Area */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-6 sm:p-7 text-center transition-all duration-300 ${
              isDragging
                ? 'border-blue-500 bg-blue-50/80 shadow-lg shadow-blue-500/10 dark:bg-blue-950/30'
                : 'border-blue-300/80 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/30 hover:border-blue-500 hover:bg-blue-50/40 hover:shadow-xl hover:shadow-blue-500/10 dark:border-blue-900/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 dark:hover:border-blue-500'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform group-hover:scale-110">
              <UploadCloud className="h-8 w-8 animate-pulse" />
            </div>

            <h3 className="mt-3 text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Drop your image here or <span className="text-blue-600 underline dark:text-blue-400">browse files</span>
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              JPG, PNG, WEBP • Fast, private & simple
            </p>

            {/* Quick target size badges (20 KB, 50 KB, 100 KB, 200 KB) */}
            <div
              className="mt-4 flex flex-wrap items-center justify-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Quick Size:
              </span>
              {[20, 50, 100, 200].map((kb) => (
                <button
                  key={kb}
                  type="button"
                  onClick={() => handleQuickKB(kb)}
                  className={`rounded-full px-3.5 py-1 text-xs font-extrabold transition-all ${
                    targetKB === kb
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-600'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/60 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
                  }`}
                >
                  {kb} KB
                </button>
              ))}
            </div>
          </div>

          {/* Controls Bar when an image is selected */}
          {file && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="max-w-[200px] truncate text-sm font-bold text-slate-900 sm:max-w-xs dark:text-white">
                      {file.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      Original: {formatFileSize(file.size)} • {originalWidth}x{originalHeight} px
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Change File
                </button>
              </div>

              {/* Advanced Custom Controls */}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {/* Target KB Input */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Target File Size (KB)
                  </label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="number"
                      min={5}
                      max={5000}
                      value={targetKB || ''}
                      onChange={(e) => setTargetKB(Number(e.target.value))}
                      placeholder="e.g. 50"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <span className="text-xs font-bold text-slate-400">KB</span>
                  </div>
                </div>

                {/* Output Format */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Output Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="image/jpeg">JPG / JPEG (Universal)</option>
                    <option value="image/webp">WebP (Next-Gen Web)</option>
                    <option value="image/png">PNG (Lossless)</option>
                  </select>
                </div>

                {/* Dimensions */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Dimensions (px)
                    </label>
                    <button
                      type="button"
                      onClick={() => setAspectRatioLocked(!aspectRatioLocked)}
                      className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1"
                      title={aspectRatioLocked ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
                    >
                      {aspectRatioLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                    </button>
                  </div>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={width || ''}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      placeholder="Width"
                      className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <input
                      type="number"
                      value={height || ''}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      placeholder="Height"
                      className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Re-compress Action Button */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => file && processImageFile(file)}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Apply & Recompress
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Hero Graphic Card / Compression Result Showcase */}
        {showSideHeroCard && (
          <div className="lg:col-span-5 flex flex-col justify-center">
            {result ? (
              /* Live Result Card */
              <div className="rounded-3xl border border-blue-200/80 bg-white/90 p-6 shadow-xl shadow-blue-500/10 backdrop-blur-md transition-all dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    Compression Complete
                  </span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {result.savedPercent}% Smaller!
                  </span>
                </div>

                {/* Preview Image */}
                <div className="mt-4 relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 aspect-video flex items-center justify-center dark:border-slate-800 dark:bg-slate-950">
                  <img
                    src={result.dataUrl}
                    alt="Compressed Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-mono text-white backdrop-blur-sm">
                    {result.compressedWidth} × {result.compressedHeight} px
                  </div>
                </div>

                {/* Stats Breakdown Bar */}
                <div className="mt-5 rounded-2xl bg-blue-50/70 p-4 border border-blue-100 dark:bg-slate-800/80 dark:border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Original Size</div>
                      <div className="font-extrabold text-slate-700 line-through dark:text-slate-300">
                        {formatFileSize(result.originalSize)}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-500" />
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Compressed</div>
                      <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                        {formatFileSize(result.compressedSize)}
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-blue-200/60 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(10, 100 - result.savedPercent))}%` }}
                    />
                  </div>
                </div>

                {/* Download Actions */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={downloadResult}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-xl"
                  >
                    <Download className="h-4 w-4" />
                    Download Image
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            ) : (
              /* Hero Demonstration Mockup (Exact match to the user's design image) */
              <div className="relative">
                {/* Floating graphic card */}
                <div className="rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900">
                  {/* Photo container */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-500 p-1">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900">
                      <img
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                        alt="Photo demonstration"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-xs font-semibold text-white drop-shadow">
                        photo.jpg
                      </div>
                    </div>
                  </div>

                  {/* Size Stat Pill & Progress */}
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-800/80 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-500 dark:text-slate-400">photo.jpg</span>
                      <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                        <span className="text-slate-400 line-through">2.4 MB</span>
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-600 dark:text-blue-400 font-black">48 KB</span>
                      </div>
                    </div>

                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div className="h-full w-[15%] rounded-full bg-blue-600 animate-pulse" />
                    </div>

                    {/* Format Pills */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                        JPG
                      </span>
                      <span className="rounded-md bg-pink-500 px-2.5 py-1 text-xs font-bold text-white">
                        PNG
                      </span>
                      <span className="rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white">
                        WEBP
                      </span>
                    </div>
                  </div>

                  {/* Checklist matching image */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span>Smaller file size without visible loss</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span>Same crisp image quality & colors</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span>Ready for web, portals & government forms</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span>100% Free & private in-browser engine</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
