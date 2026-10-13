import React, { useState, useRef } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Upload, Download, Trash2, ArrowUp, ArrowDown, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function JpgToPdf() {
  const [images, setImages] = useState([]);
  const [orientation, setOrientation] = useState('portrait');
  const [pageSize, setPageSize] = useState('a4');
  const [margin, setMargin] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImages(prev => [
            ...prev,
            {
              id: Math.random().toString(36).substring(7),
              name: file.name,
              dataUrl: e.target.result,
              width: img.width,
              height: img.height,
              size: (file.size / 1024).toFixed(1) + ' KB'
            }
          ]);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const moveImage = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= images.length) return;
    const list = [...images];
    const temp = list[index];
    list[index] = list[newIdx];
    list[newIdx] = temp;
    setImages(list);
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: pageSize
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();
        const item = images[i];

        const availW = pageWidth - (margin * 2);
        const availH = pageHeight - (margin * 2);

        const imgRatio = item.width / item.height;
        const pageRatio = availW / availH;

        let renderW, renderH;
        if (imgRatio > pageRatio) {
          renderW = availW;
          renderH = availW / imgRatio;
        } else {
          renderH = availH;
          renderW = availH * imgRatio;
        }

        const x = margin + (availW - renderW) / 2;
        const y = margin + (availH - renderH) / 2;

        doc.addImage(item.dataUrl, 'JPEG', x, y, renderW, renderH);
      }

      doc.save('PhotoKB-Converted-Document.pdf');
    } catch (err) {
      console.error(err);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ToolLayout
      title="Convert JPG to PDF Online"
      subtitle="Easily convert JPG, PNG, and WebP images to high-resolution, standardized PDF documents. Combine multiple images into a single file with one click."
      category="PDF Tools"
      categorySlug="pdf-tools"
      currentToolId="jpg-to-pdf"
      howToSteps={[
        { title: 'Upload Images', desc: 'Select or drag & drop multiple JPG, PNG or WEBP photos.' },
        { title: 'Reorder Pages', desc: 'Use arrow buttons to adjust page sequence or delete unwanted photos.' },
        { title: 'Choose Page Setup', desc: 'Customize page size (A4 / Letter), orientation, and margins.' },
        { title: 'Download Unified PDF', desc: 'Click Generate PDF to instantly download your consolidated PDF file.' }
      ]}
      features={[
        { title: 'Multi-Image Merging', desc: 'Batch merge hundreds of photos into a single organized PDF.' },
        { title: 'Flexible Page Sizing', desc: 'Standard A4 and US Letter document layout presets.' },
        { title: 'High Resolution Retention', desc: 'Crisp image fidelity preserved with zero artificial downscaling.' }
      ]}
      faqs={[
        { question: 'Is there a limit on how many photos I can convert?', answer: 'No limit! You can convert as many photos as you want at once.' },
        { question: 'Are my uploaded pictures stored anywhere?', answer: 'No! Everything is rendered directly in your browser. Your images never leave your computer.' }
      ]}
    >
      <div className="space-y-6">
        {/* Upload Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-3xl p-8 sm:p-12 text-center bg-amber-50/30 hover:bg-amber-50/60 cursor-pointer transition-all group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFiles(e.target.files)}
            multiple
            accept="image/*"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            Click to upload JPG / PNG photos or drag them here
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            You can select multiple files at once. Each image becomes a separate PDF page.
          </p>
        </div>

        {/* Selected Images List & Options */}
        {images.length > 0 && (
          <div className="space-y-6">
            {/* Options Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-blue-600"
                >
                  <option value="portrait">Portrait (Vertical)</option>
                  <option value="landscape">Landscape (Horizontal)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Page Format
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-blue-600"
                >
                  <option value="a4">A4 (Standard)</option>
                  <option value="letter">US Letter</option>
                  <option value="legal">Legal</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Page Margin
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-blue-600"
                >
                  <option value={0}>No Margin (Edge-to-Edge)</option>
                  <option value={10}>Small Margin (10mm)</option>
                  <option value={20}>Standard Margin (20mm)</option>
                </select>
              </div>
            </div>

            {/* List of images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-700">
                  Total Images: {images.length} Page{images.length > 1 ? 's' : ''}
                </span>
                <button
                  type="button"
                  onClick={() => setImages([])}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative bg-white rounded-xl border border-slate-200 p-2 shadow-xs group hover:border-amber-400 transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-slate-100 mb-2">
                      <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-slate-900/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        #{idx + 1}
                      </div>
                    </div>

                    <div className="text-[11px] font-medium text-slate-700 truncate mb-2" title={img.name}>
                      {img.name}
                    </div>

                    {/* Order and delete controls */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => moveImage(idx, -1)}
                          disabled={idx === 0}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                          title="Move Left"
                        >
                          <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(idx, 1)}
                          disabled={idx === images.length - 1}
                          className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                          title="Move Right"
                        >
                          <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Convert Button */}
            <div className="flex items-center justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={generatePdf}
                disabled={isGenerating}
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-base font-bold flex items-center space-x-2 shadow-lg shadow-amber-500/25 transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download PDF ({images.length} Pages)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
