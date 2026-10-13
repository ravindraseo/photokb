import React, { useState, useRef } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Upload, Download, Zap, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CompressImage() {
  const [imageSrc, setImageSrc] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(0.75);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [fileName, setFileName] = useState('compressed-image');
  const [imgElement, setImgElement] = useState(null);
  const fileInputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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
    setOriginalSize(file.size);
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImgElement(img);
        setImageSrc(e.target.result);
        compress(img, quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const compress = (img, q) => {
    if (!img) return;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          setCompressedSize(blob.size);
          const url = URL.createObjectURL(blob);
          setCompressedUrl(url);
        }
      },
      'image/jpeg',
      q
    );
  };

  const handleQualityChange = (newQ) => {
    setQuality(newQ);
    if (imgElement) {
      compress(imgElement, newQ);
    }
  };

  const downloadImage = () => {
    if (!compressedUrl) return;
    const link = document.createElement('a');
    link.download = `${fileName}-compressed.jpg`;
    link.href = compressedUrl;
    link.click();
  };

  const savedPercentage = originalSize > 0 && compressedSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <ToolLayout
      title="Compress Image Online"
      subtitle="Reduce image file size by up to 80% without losing visible quality. Ideal for websites, email attachments, and online applications."
      category="Image Tools"
      categorySlug="image-tools"
      currentToolId="compress-image"
      howToSteps={[
        { title: 'Upload Your Image', desc: 'Drag and drop your photo or click to choose a JPG or PNG from your computer.' },
        { title: 'Tune Compression', desc: 'Move the slider to find the sweet spot between low file size and sharp visuals.' },
        { title: 'Check Saved Space', desc: 'Inspect the live file size counter and reduction percentage in real time.' },
        { title: 'Download Result', desc: 'Click download to save your lightweight, high-performance compressed image.' }
      ]}
      features={[
        { title: 'Smart Visual Preservation', desc: 'Removes redundant metadata and imperceptible color nuances while keeping lines sharp.' },
        { title: 'Live Size Comparison', desc: 'Instantly view exact byte count and savings percentage as you tweak the slider.' },
        { title: '100% In-Browser', desc: 'No files are sent across the web. Entire compression happens on your device.' }
      ]}
      faqs={[
        { question: 'What is the optimal compression level?', answer: 'We recommend 75% to 80% quality. This typically slashes 60%-75% of file size while visually looking virtually identical to the original.' },
        { question: 'Does this compress PNGs too?', answer: 'Yes! It seamlessly optimizes PNGs by rendering and packing them into high-efficiency JPEGs.' }
      ]}
    >
      {!imageSrc ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-rose-300 hover:border-rose-500 rounded-3xl p-10 sm:p-16 text-center bg-rose-50/30 hover:bg-rose-50/60 cursor-pointer transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-20 h-20 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Select an image to compress
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Supports JPG, JPEG, PNG, WEBP files. No size limits.
          </p>
          <button
            type="button"
            className="mt-6 px-6 py-3 bg-rose-600 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-500/25 group-hover:bg-rose-700"
          >
            Upload Photo
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <span className="text-xs font-semibold text-slate-500">Original Size</span>
              <p className="text-2xl font-black text-slate-800 mt-1">{formatSize(originalSize)}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <span className="text-xs font-semibold text-emerald-700">Compressed Size</span>
              <p className="text-2xl font-black text-emerald-700 mt-1">{formatSize(compressedSize)}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
              <span className="text-xs font-semibold text-blue-700">Space Saved</span>
              <p className="text-2xl font-black text-blue-700 mt-1">-{savedPercentage}%</p>
            </div>
          </div>

          {/* Quality Slider Control */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-slate-800">Compression Quality Level</span>
                <p className="text-xs text-slate-500">Lower quality yields a smaller file size; higher quality retains more fine texture.</p>
              </div>
              <span className="text-lg font-black text-rose-600 px-3 py-1 bg-rose-50 rounded-lg border border-rose-200">
                {Math.round(quality * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.95"
              step="0.05"
              value={quality}
              onChange={(e) => handleQualityChange(parseFloat(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setImageSrc(null);
                setCompressedUrl(null);
              }}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-sm font-bold"
            >
              Upload Another Photo
            </button>

            <button
              type="button"
              onClick={downloadImage}
              className="px-7 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold flex items-center space-x-2 shadow-lg shadow-rose-500/25 transition-all"
            >
              <Download className="w-5 h-5" />
              <span>Download Compressed Image ({formatSize(compressedSize)})</span>
            </button>
          </div>

          {/* Preview */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-100/50">
            <h3 className="text-xs font-bold text-slate-600 mb-3">Live Result Preview</h3>
            <div className="max-h-[500px] overflow-auto flex items-center justify-center rounded-xl p-4 bg-white border border-slate-200">
              {compressedUrl && (
                <img
                  src={compressedUrl}
                  alt="Compressed result"
                  className="max-h-[460px] object-contain rounded-lg shadow-sm"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
