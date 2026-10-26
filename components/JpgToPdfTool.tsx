'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import jsPDF from 'jspdf';

interface ImageItem {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  width: number;
  height: number;
}

export function JpgToPdfTool() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');
  const [margin, setMargin] = useState<number>(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setImages((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              name: file.name,
              size: file.size,
              dataUrl,
              width: img.width,
              height: img.height,
            },
          ]);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    setImages((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    try {
      const pdf = new jsPDF({
        orientation: orientation === 'portrait' ? 'p' : 'l',
        unit: 'mm',
        format: pageSize,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage(pageSize, orientation === 'portrait' ? 'p' : 'l');

        const item = images[i];
        const availWidth = pageWidth - margin * 2;
        const availHeight = pageHeight - margin * 2;

        const imgRatio = item.width / item.height;
        const availRatio = availWidth / availHeight;

        let renderWidth = availWidth;
        let renderHeight = availHeight;

        if (imgRatio > availRatio) {
          renderHeight = availWidth / imgRatio;
        } else {
          renderWidth = availHeight * imgRatio;
        }

        const posX = margin + (availWidth - renderWidth) / 2;
        const posY = margin + (availHeight - renderHeight) / 2;

        pdf.addImage(item.dataUrl, 'JPEG', posX, posY, renderWidth, renderHeight);
      }

      pdf.save('photokb_document.pdf');
      setPdfGenerated(true);
      setTimeout(() => setPdfGenerated(false), 4000);
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Error creating PDF. Please try with fewer images.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full">
      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-rose-300 bg-rose-50/40 p-6 sm:p-7 text-center transition-all hover:border-rose-500 hover:bg-rose-50/80 dark:border-rose-900/60 dark:bg-slate-900 dark:hover:border-rose-500"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-500/30 transition-transform group-hover:scale-110">
          <FileText className="h-8 w-8" />
        </div>
        <h3 className="mt-3 text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          Drop your images here or <span className="text-rose-600 underline dark:text-rose-400">browse files</span>
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Select single or multiple JPG, PNG, WEBP files to merge into a single PDF
        </p>
      </div>

      {/* Settings & Selected Images */}
      {images.length > 0 && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Layout Controls */}
          <div className="grid grid-cols-1 gap-4 border-b border-slate-100 pb-6 sm:grid-cols-3 dark:border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Orientation
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as any)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="portrait">Portrait (Vertical)</option>
                <option value="landscape">Landscape (Horizontal)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Page Size
              </label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as any)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="a4">A4 (Standard International)</option>
                <option value="letter">US Letter</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Margin (mm)
              </label>
              <select
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value={0}>No Margin (Edge-to-edge)</option>
                <option value={10}>Small Margin (10 mm)</option>
                <option value={20}>Standard Margin (20 mm)</option>
              </select>
            </div>
          </div>

          {/* List of uploaded files with reorder */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Pages ({images.length} images added)
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-rose-600 hover:underline dark:text-rose-400"
              >
                + Add More Images
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {images.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-800"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-900">
                    <img
                      src={item.dataUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-1 left-1 rounded bg-slate-950/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="mt-2 truncate text-xs font-medium text-slate-700 dark:text-slate-300">
                    {item.name}
                  </div>

                  {/* Actions overlay */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="rounded p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30 dark:hover:bg-slate-700"
                        title="Move Up"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveDown(index)}
                        disabled={index === images.length - 1}
                        className="rounded p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30 dark:hover:bg-slate-700"
                        title="Move Down"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeImage(item.id)}
                      className="rounded p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
            {pdfGenerated ? (
              <span className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                PDF Downloaded Successfully!
              </span>
            ) : (
              <span className="text-xs text-slate-500">
                100% In-browser generation • No watermark • High resolution
              </span>
            )}

            <button
              type="button"
              disabled={isGenerating || images.length === 0}
              onClick={generatePdf}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/25 transition-all hover:bg-rose-700 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Generate & Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
