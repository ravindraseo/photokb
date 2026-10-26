/**
 * Core client-side image compression and processing engine.
 * 100% in-browser using HTML5 Canvas API - ultra fast, zero server upload, 100% private.
 */

export interface CompressionOptions {
  maxSizeKB?: number;
  quality?: number; // 0 to 1
  maxWidth?: number;
  maxHeight?: number;
  format?: 'image/jpeg' | 'image/png' | 'image/webp';
  exactSizeToleranceKB?: number; // e.g. +/- 2 KB
  preserveAspectRatio?: boolean;
}

export interface CompressionResult {
  blob: Blob;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  originalWidth: number;
  originalHeight: number;
  compressedWidth: number;
  compressedHeight: number;
  format: string;
  savedPercent: number;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function loadImage(fileOrUrl: File | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('Failed to load image: ' + e));

    if (typeof fileOrUrl === 'string') {
      img.src = fileOrUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrUrl);
    }
  });
}

/**
 * Compresses an image to an exact target file size in KB using binary search.
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const img = await loadImage(file);
  const originalWidth = img.naturalWidth || img.width;
  const originalHeight = img.naturalHeight || img.height;
  const originalSize = file.size;

  let targetWidth = originalWidth;
  let targetHeight = originalHeight;

  if (options.maxWidth && targetWidth > options.maxWidth) {
    const scale = options.maxWidth / targetWidth;
    targetWidth = Math.round(targetWidth * scale);
    targetHeight = Math.round(targetHeight * scale);
  }

  if (options.maxHeight && targetHeight > options.maxHeight) {
    const scale = options.maxHeight / targetHeight;
    targetWidth = Math.round(targetWidth * scale);
    targetHeight = Math.round(targetHeight * scale);
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas 2D context could not be created');
  }

  // Draw white background for transparency fallback if converting to JPEG
  const format = options.format || (file.type === 'image/png' ? 'image/png' : 'image/jpeg');
  if (format === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // If fixed target size in KB is requested (e.g. 20 KB, 50 KB, 100 KB):
  if (options.maxSizeKB && options.maxSizeKB > 0) {
    const targetBytes = options.maxSizeKB * 1024;
    const targetFormat = format === 'image/png' ? 'image/jpeg' : format; // PNG cannot adjust quality via toBlob

    let minQuality = 0.05;
    let maxQuality = 0.98;
    let bestBlob: Blob | null = null;
    let bestQuality = 0.8;

    // Binary search for quality
    for (let i = 0; i < 7; i++) {
      const midQuality = (minQuality + maxQuality) / 2;
      const currentBlob = await getCanvasBlob(canvas, targetFormat, midQuality);

      if (currentBlob.size <= targetBytes) {
        bestBlob = currentBlob;
        bestQuality = midQuality;
        minQuality = midQuality; // Try higher quality
      } else {
        maxQuality = midQuality; // Need lower quality
      }
    }

    // If still larger than target even at lowest quality, scale down dimensions
    if (!bestBlob || bestBlob.size > targetBytes) {
      let scale = 0.9;
      while (scale > 0.2) {
        const scaledWidth = Math.max(80, Math.round(targetWidth * scale));
        const scaledHeight = Math.max(80, Math.round(targetHeight * scale));

        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        if (targetFormat === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, scaledWidth, scaledHeight);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        const testBlob = await getCanvasBlob(canvas, targetFormat, 0.7);
        if (testBlob.size <= targetBytes) {
          bestBlob = testBlob;
          targetWidth = scaledWidth;
          targetHeight = scaledHeight;
          break;
        }
        scale -= 0.15;
      }
    }

    const finalBlob = bestBlob || (await getCanvasBlob(canvas, targetFormat, 0.5));
    const dataUrl = await blobToDataUrl(finalBlob);
    const compressedSize = finalBlob.size;
    const savedPercent = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));

    return {
      blob: finalBlob,
      dataUrl,
      originalSize,
      compressedSize,
      originalWidth,
      originalHeight,
      compressedWidth: targetWidth,
      compressedHeight: targetHeight,
      format: targetFormat,
      savedPercent,
    };
  }

  // Standard quality compression
  const quality = options.quality !== undefined ? options.quality : 0.82;
  const finalBlob = await getCanvasBlob(canvas, format, quality);
  const dataUrl = await blobToDataUrl(finalBlob);
  const compressedSize = finalBlob.size;
  const savedPercent = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));

  return {
    blob: finalBlob,
    dataUrl,
    originalSize,
    compressedSize,
    originalWidth,
    originalHeight,
    compressedWidth: targetWidth,
    compressedHeight: targetHeight,
    format,
    savedPercent,
  };
}

function getCanvasBlob(canvas: HTMLCanvasElement, format: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob conversion failed'));
      },
      format,
      quality
    );
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
