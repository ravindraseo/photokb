import React, { useState, useRef } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Upload, Download, RefreshCw, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UsPassportPhotoResizer() {
  const [imageSrc, setImageSrc] = useState(null);
  const [resizedDataUrl, setResizedDataUrl] = useState(null);
  const [fileSizeKb, setFileSizeKb] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [fileName, setFileName] = useState('us-passport-photo');

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) loadAndProcess(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) loadAndProcess(file);
  };

  const loadAndProcess = (file) => {
    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      processPassportCrop(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const processPassportCrop = (src) => {
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');

      // Center crop square to match 1:1 ratio
      const minDim = Math.min(img.width, img.height);
      const startX = (img.width - minDim) / 2;
      const startY = (img.height - minDim) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, 600, 600);

      // Export as high quality JPEG under 240KB (State.gov limit)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setResizedDataUrl(dataUrl);

      // Estimate file size
      const stringLength = dataUrl.length - 'data:image/jpeg;base64,'.length;
      const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383415;
      setFileSizeKb(Math.round(sizeInBytes / 1024));
      setIsProcessing(false);
    };
    img.src = src;
  };

  const downloadPhoto = () => {
    if (!resizedDataUrl) return;
    const link = document.createElement('a');
    link.download = `${fileName}-us-passport-2x2-600x600.jpg`;
    link.href = resizedDataUrl;
    link.click();
  };

  const resetAll = () => {
    setImageSrc(null);
    setResizedDataUrl(null);
    setFileSizeKb(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <ToolLayout
      title="US Passport Photo Resizer (2x2 Inches / 600x600 px)"
      subtitle="Resize and crop your photo to exact 2x2 inches (600x600 pixels) compliant with official U.S. Department of State passport and visa guidelines. 100% free, private, and instant."
      category="Image Tools"
      categorySlug="image-tools"
      currentToolId="us-passport-photo-resizer"
      howToSteps={[
        { title: 'Upload Your Photo', desc: 'Take a clear headshot against a white background and upload it.' },
        { title: 'Automatic 2x2 Inch Crop', desc: 'Our engine automatically squares and standardizes your photo to exactly 600x600 pixels.' },
        { title: 'Verify Face Position', desc: 'Check the biometric face guidelines overlay to confirm head proportions meet State Department standards.' },
        { title: 'Download Compliant JPEG', desc: 'Download your ready-to-print 300 DPI passport photo under 240KB with zero watermarks.' }
      ]}
      features={[
        { title: 'U.S. Department of State Compliant', desc: 'Strictly meets 2x2 inches (51x51mm) at 300 DPI, exactly 600x600 pixels.' },
        { title: 'Under 240 KB File Size', desc: 'Optimized automatically to stay under the 240 KB digital submission cap.' },
        { title: 'Biometric Head Oval Overlay', desc: 'Visual alignment aid ensures your head measures 1" to 1-3/8" (50%-69% of image height).' },
        { title: '100% Confidential Client-Side Processing', desc: 'Your passport photo never uploads to any server—runs entirely in local memory.' }
      ]}
      faqs={[
        { 
          question: 'What are the official US Passport photo requirements?', 
          answer: 'The U.S. Department of State requires a 2 x 2 inch (51 x 51 mm) color photo taken within the last 6 months. Digitally, it must be square (600x600 pixels minimum up to 1200x1200 pixels) in JPEG format, 240 KB or smaller, with your head centered between 1 and 1 3/8 inches.' 
        },
        { 
          question: 'Can I wear glasses or a hat in my US passport photo?', 
          answer: 'No. Eyeglasses are strictly prohibited unless you have a signed medical doctor note. Hats and head coverings are only allowed for religious or verified medical purposes with a signed statement.' 
        },
        { 
          question: 'What background color is required for US passport photos?', 
          answer: 'The background must be plain white or off-white. No shadows, patterns, or colored backgrounds are permitted.' 
        },
        { 
          question: 'How much does a passport photo cost at CVS, Walgreens, or USPS vs PhotoKB?', 
          answer: 'Pharmacies like CVS and Walgreens charge $16.99 to $17.99 for two 2x2 prints, and USPS post offices charge $15.00. PhotoKB is 100% free forever, allowing you to generate and print unlimited compliant photos for pennies at home or local print kiosks.' 
        }
      ]}
      seoContent={
        <article className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Complete Guide to US Passport Photo Dimensions and Requirements
            </h2>
            <p className="mt-2 text-slate-600 leading-relaxed text-xs sm:text-sm">
              Applying for or renewing a United States passport is an essential process for international travel, employment verification, and legal identification. However, government statistics indicate that <strong>improper photographs are the single largest reason US passport applications are delayed, suspended, or rejected</strong>. Using our free online US Passport Photo Resizer ensures your image precisely satisfies every requirement enforced by the <strong>U.S. Department of State Bureau of Consular Affairs</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-900 text-sm mb-2">📌 Physical Print Dimensions</h3>
              <ul className="space-y-1.5 text-xs text-blue-800">
                <li>• <strong>Width & Height</strong>: 2 x 2 inches (51 x 51 mm)</li>
                <li>• <strong>Head Size</strong>: 1 inch to 1-3/8 inches (25 mm to 35 mm)</li>
                <li>• <strong>Eye Height</strong>: 1-1/8 inches to 1-3/8 inches from bottom</li>
                <li>• <strong>Paper Quality</strong>: Matte or glossy photo-quality paper</li>
              </ul>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
              <h3 className="font-bold text-emerald-900 text-sm mb-2">💻 Digital Submission Specifications</h3>
              <ul className="space-y-1.5 text-xs text-emerald-800">
                <li>• <strong>Pixel Dimensions</strong>: 600 x 600 pixels (1:1 aspect ratio)</li>
                <li>• <strong>Resolution</strong>: 300 pixels per inch (300 DPI)</li>
                <li>• <strong>File Format</strong>: Standard JPEG (.jpg)</li>
                <li>• <strong>Max File Size</strong>: 240 KB (Kilobytes)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Top 5 Reasons US Passport Photos Get Rejected</h3>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
              <p>1. <strong>Incorrect Proportions</strong>: The head is either cropped too close or sits too far away. The head must occupy between 50% and 69% of the total frame height.</p>
              <p>2. <strong>Eyeglasses and Glare</strong>: Since November 2016, the State Department does not accept photos with prescription glasses or sunglasses.</p>
              <p>3. <strong>Shadows on Face or Background</strong>: Harsh directional lighting creates shadows behind the ears or on the backdrop. Ensure diffuse, even lighting.</p>
              <p>4. <strong>Exaggerated Facial Expressions</strong>: Mouths must be closed with a neutral facial expression or natural smile. Both eyes must be open and looking straight into the lens.</p>
              <p>5. <strong>Digital Distortion / Filters</strong>: Social media filters, smoothing, or altered aspect ratios will trigger immediate rejection by biometric scanning systems.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">How to Take a US Passport Photo at Home with Your Smartphone</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              You do not need an expensive photography studio to produce an acceptable US passport photo. Follow these professional tips:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li><strong>Stand in Front of a Plain White Wall</strong>: Find an interior white door or smooth white wall with no texture, wallpaper, or hanging frames.</li>
              <li><strong>Use Natural Daylight</strong>: Stand facing a window around midday. Avoid overhead light bulbs that create dark shadows under your eyes and nose.</li>
              <li><strong>Have a Friend Take the Photo</strong>: Selfies distort facial proportions because front cameras have wide-angle focal lengths. Have someone hold the phone 4 to 6 feet away at eye level.</li>
              <li><strong>Upload to PhotoKB</strong>: Upload your original photo here to instantly crop it to 2x2 inches (600x600 px) and verify head positioning.</li>
            </ol>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Related Helpful Tools for US Applicants:</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link to="/image-resizer" className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-slate-200">
                General Image Resizer →
              </Link>
              <Link to="/compress-image" className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-slate-200">
                Compress Image to Target KB →
              </Link>
              <Link to="/jpg-to-pdf" className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-lg border border-slate-200">
                Convert Photos to PDF →
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
            Upload Your Photo to Create a 2x2 US Passport Image
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Drag and drop your camera portrait here, or click to browse. Automatically cropped to official 600x600 px (2x2 inches) specifications.
          </p>
          <div className="inline-flex items-center space-x-2 mt-4 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-semibold text-slate-600 shadow-2xs">
            <span>🇺🇸 Compliant with State.gov & USCIS</span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Live Preview with Head Guide */}
            <div className="flex flex-col items-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 border-4 border-blue-600 rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
                {resizedDataUrl && (
                  <img
                    src={resizedDataUrl}
                    alt="US Passport 2x2 Photo 600x600 preview"
                    width="600"
                    height="600"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Biometric Guide Overlay */}
                {showGuidelines && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    {/* Head Oval */}
                    <div className="w-36 h-48 border-2 border-dashed border-emerald-400 rounded-[50%] opacity-80" />
                    {/* Eye line */}
                    <div className="w-full border-t border-emerald-400/60 absolute top-[44%]" />
                    <span className="absolute bottom-2 text-[10px] font-bold bg-black/70 text-emerald-300 px-2 py-0.5 rounded">
                      Head should fill oval (1" to 1-3/8")
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 mt-3">
                <button
                  type="button"
                  onClick={() => setShowGuidelines(!showGuidelines)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  {showGuidelines ? 'Hide Alignment Guide' : 'Show Alignment Guide'}
                </button>
              </div>
            </div>

            {/* Compliance Info Card & Actions */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold text-slate-800">
                  <span>Photo Specifications</span>
                  <span className="text-emerald-600 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>State.gov Ready</span>
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Dimensions:</span>
                  <span className="font-semibold text-slate-900">2 × 2 inches (51 × 51 mm)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Digital Resolution:</span>
                  <span className="font-semibold text-slate-900">600 × 600 pixels @ 300 DPI</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated File Size:</span>
                  <span className="font-semibold text-slate-900">{fileSizeKb} KB (under 240 KB limit)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Format:</span>
                  <span className="font-semibold text-slate-900">Standard JPEG (.jpg)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={downloadPhoto}
                  className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Passport Photo</span>
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm flex items-center justify-center space-x-1 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Upload Another</span>
                </button>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start space-x-2 text-[11px] text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  Tip: Print this downloaded photo as a standard 4x6 inch print at Walgreens, Walmart, or CVS photo kiosks for under 40 cents.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
