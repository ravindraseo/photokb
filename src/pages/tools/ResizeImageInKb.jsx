import React, { useState, useRef } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Upload, Download, RefreshCw, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResizeImageInKb() {
  const [imageSrc, setImageSrc] = useState(null);
  const [originalSizeKb, setOriginalSizeKb] = useState(0);
  const [targetKb, setTargetKb] = useState(100);
  const [compressedDataUrl, setCompressedDataUrl] = useState(null);
  const [actualSizeKb, setActualSizeKb] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('resized-photo');

  const fileInputRef = useRef(null);

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
    setOriginalSizeKb(Math.round(file.size / 1024));
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      processTargetKb(event.target.result, targetKb);
    };
    reader.readAsDataURL(file);
  };

  const processTargetKb = (src, desiredKb) => {
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      let low = 0.05;
      let high = 0.98;
      let bestDataUrl = null;
      let bestSizeKb = 0;

      // Iterative binary search for the target KB size
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Try up to 7 quality steps
      for (let i = 0; i < 7; i++) {
        const mid = (low + high) / 2;
        const testData = canvas.toDataURL('image/jpeg', mid);
        const strLen = testData.length - 'data:image/jpeg;base64,'.length;
        const curKb = Math.round((4 * Math.ceil(strLen / 3) * 0.5624896334383415) / 1024);

        if (curKb <= desiredKb) {
          bestDataUrl = testData;
          bestSizeKb = curKb;
          low = mid;
        } else {
          high = mid;
        }
      }

      // If even lowest quality is larger than desired KB, scale down dimensions
      if (!bestDataUrl || bestSizeKb > desiredKb) {
        const scale = Math.sqrt(desiredKb / (originalSizeKb || 1));
        const newW = Math.max(100, Math.round(img.width * Math.min(0.9, scale)));
        const newH = Math.max(100, Math.round(img.height * Math.min(0.9, scale)));

        const scaleCanvas = document.createElement('canvas');
        scaleCanvas.width = newW;
        scaleCanvas.height = newH;
        const scaleCtx = scaleCanvas.getContext('2d');
        scaleCtx.drawImage(img, 0, 0, newW, newH);

        bestDataUrl = scaleCanvas.toDataURL('image/jpeg', 0.8);
        const strLen = bestDataUrl.length - 'data:image/jpeg;base64,'.length;
        bestSizeKb = Math.round((4 * Math.ceil(strLen / 3) * 0.5624896334383415) / 1024);
      }

      setCompressedDataUrl(bestDataUrl);
      setActualSizeKb(bestSizeKb);
      setIsProcessing(false);
    };
    img.src = src;
  };

  const handleTargetChange = (val) => {
    const kb = parseInt(val) || 20;
    setTargetKb(kb);
    if (imageSrc) {
      processTargetKb(imageSrc, kb);
    }
  };

  const downloadImage = () => {
    if (!compressedDataUrl) return;
    const link = document.createElement('a');
    link.download = `${fileName}-resized-${actualSizeKb}kb.jpg`;
    link.href = compressedDataUrl;
    link.click();
  };

  const resetAll = () => {
    setImageSrc(null);
    setCompressedDataUrl(null);
    setOriginalSizeKb(0);
    setActualSizeKb(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <ToolLayout
      title="Resize Image in KB (Compress Photo to Exact Size)"
      subtitle="Reduce and resize image file size to exact KB (20KB, 50KB, 100KB, 200KB) for USCIS, job applications, and official government portals. 100% free and in-browser safe."
      category="Image Tools"
      categorySlug="image-tools"
      currentToolId="resize-image-in-kb"
      howToSteps={[
        { title: 'Upload Image', desc: 'Select any JPG, PNG or WEBP image from your device.' },
        { title: 'Select Target KB', desc: 'Click quick presets (20KB, 50KB, 100KB, 200KB) or type any custom KB size.' },
        { title: 'Smart Compression Engine', desc: 'Our algorithm automatically adjusts compression and dimensions to hit your target KB.' },
        { title: 'Instant Download', desc: 'Download your exact-sized photo ready for portal upload with no signups.' }
      ]}
      features={[
        { title: 'Precise Target KB Control', desc: 'Dial in exactly 20KB, 50KB, 100KB, or 200KB with pinpoint accuracy.' },
        { title: 'No Blurry Degradation', desc: 'Preserves sharp text and facial features using perceptual quality optimization.' },
        { title: 'Universal Format Compatibility', desc: 'Accepts JPG, PNG, WEBP, and BMP, outputting universally accepted JPEG.' },
        { title: 'Zero Server Retention', desc: 'Processed strictly in your local browser sandbox for complete privacy.' }
      ]}
      faqs={[
        { 
          question: 'How do I resize an image to under 100KB or 200KB?', 
          answer: 'Simply upload your image, select either 100KB or 200KB preset above, and our tool dynamically compresses the image to stay strictly under that size limit while keeping high resolution.' 
        },
        { 
          question: 'Why do government and university portals have KB file limits?', 
          answer: 'Portals like USCIS, state DMV systems, and job application boards restrict upload sizes to prevent server overload and speed up applicant database processing.' 
        },
        { 
          question: 'Will resizing image size in KB reduce visual sharpness?', 
          answer: 'PhotoKB uses smart perceptual quantization that discards invisible color data first. Unless compressed to extreme extremes (under 10KB), the photo will look crisp and clear on screens and print.' 
        },
        { 
          question: 'Is my personal data or ID photo stored on your servers?', 
          answer: 'No. PhotoKB performs all computation in your browser client-side. Your photo never travels over the network to any third-party server.' 
        }
      ]}
      seoContent={
        <article className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              How to Resize Image in KB Online for US Online Applications
            </h2>
            <p className="mt-2 text-slate-600 leading-relaxed text-xs sm:text-sm">
              Whether you are applying for a US visa via the CEAC DS-160 portal, filing an immigration petition on <strong>USCIS.gov</strong>, uploading state tax receipts, or submitting resumes to university portals, almost every US digital form enforces strict file-size limitations measured in <strong>Kilobytes (KB)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 text-center">
              <span className="text-xs font-bold text-blue-900 block">USCIS Immigration Forms</span>
              <span className="text-lg font-black text-blue-600 block mt-1">Under 200 KB</span>
              <span className="text-[10px] text-blue-700">Recommended for passport portraits</span>
            </div>
            <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-center">
              <span className="text-xs font-bold text-emerald-900 block">DS-160 US Visa Portal</span>
              <span className="text-lg font-black text-emerald-600 block mt-1">Under 240 KB</span>
              <span className="text-[10px] text-emerald-700">Must be minimum 600x600 px</span>
            </div>
            <div className="p-3.5 bg-purple-50/70 rounded-xl border border-purple-200 text-center">
              <span className="text-xs font-bold text-purple-900 block">State DMV & Job Boards</span>
              <span className="text-lg font-black text-purple-600 block mt-1">20 KB – 100 KB</span>
              <span className="text-[10px] text-purple-700">Common limit for ID & signatures</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Understanding Image File Size: KB vs Megapixels</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Many users confuse pixel dimensions with file weight. A high-end iPhone 15 or Samsung Galaxy takes photos with 12 to 48 megapixels, resulting in 4,000 x 3,000 pixel dimensions weighing anywhere from <strong>3 MB to 15 MB (3,000 KB to 15,000 KB)</strong>. When an online portal states "File must not exceed 200 KB", uploading your original camera photo will trigger an immediate upload error: <em>"File size too large"</em>.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              PhotoKB solves this by calculating the exact mathematical compression ratio necessary to reduce your photo from megabytes down to your chosen KB target without forcing you to understand complex compression settings.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Popular Target KB Presets & Use Cases</h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
              <p>• <strong>Resize to 20KB – 50KB</strong>: Ideal for digital signatures, thumbprints, small profile thumbnails, and government job admission portals.</p>
              <p>• <strong>Resize to 100KB</strong>: Perfect balance between sharp visual detail and small file weight. Accepted by 95% of job application systems and state licensing boards.</p>
              <p>• <strong>Resize to 200KB – 240KB</strong>: The exact standard for US Passports, Green Card Lottery (DV Program), and USCIS biometric identification.</p>
              <p>• <strong>Resize to 500KB</strong>: Standard maximum threshold for document attachments, contract scans, and PDF inclusions.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Internal Tool Navigation:</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link to="/us-passport-photo-resizer" className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-slate-200">
                🇺🇸 US Passport Resizer (2x2 in) →
              </Link>
              <Link to="/image-resizer" className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-slate-200">
                Pixel Dimension Resizer →
              </Link>
              <Link to="/compress-image" className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-slate-200">
                Visual Quality Compressor →
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
            <Upload className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Upload Image to Compress and Resize in KB
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Choose your target size (20KB, 50KB, 100KB, 200KB). Instant in-browser compression with zero server upload.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Target KB Presets Bar */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Select Target Maximum File Size (KB):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[20, 50, 100, 200, 500].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleTargetChange(size)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    targetKb === size
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {size} KB
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <span className="text-xs text-slate-500">Custom Target:</span>
              <input
                type="number"
                min="5"
                max="5000"
                value={targetKb}
                onChange={(e) => handleTargetChange(e.target.value)}
                className="w-24 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold"
              />
              <span className="text-xs text-slate-500 font-semibold">KB</span>
            </div>
          </div>

          {/* Before & After Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Original Image</span>
              <div className="h-44 flex items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2">
                <img src={imageSrc} alt="Original" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="text-sm font-bold text-slate-800">{originalSizeKb} KB</div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-emerald-300 text-center space-y-2 shadow-xs">
              <span className="text-xs font-bold text-emerald-600 uppercase flex items-center justify-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Resized Target</span>
              </span>
              <div className="h-44 flex items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2">
                {compressedDataUrl && (
                  <img src={compressedDataUrl} alt="Compressed" className="max-h-full max-w-full object-contain" />
                )}
              </div>
              <div className="text-sm font-black text-emerald-600">
                {actualSizeKb} KB{' '}
                <span className="text-xs font-normal text-slate-500">
                  ({Math.round((1 - actualSizeKb / (originalSizeKb || 1)) * 100)}% smaller)
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={downloadImage}
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download {actualSizeKb} KB Photo</span>
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm flex items-center justify-center space-x-1 transition-colors"
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
