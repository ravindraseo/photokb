export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  excerpt: string;
  category: string;
  publishedDate: string;
  readTime: string;
  author: string;
  youtubeId?: string;
  youtubeTitle?: string;
  content: string; // Markdown / HTML-ready content
  tableOfContents: { id: string; title: string }[];
  faqs: { question: string; answer: string }[];
  relatedTools: { slug: string; name: string }[];
  relatedPosts: { slug: string; title: string }[];
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  'how-to-compress-photo-to-50kb': {
    slug: 'how-to-compress-photo-to-50kb',
    title: 'How to Compress a Photo to 50 KB for Online Forms (SSC, UPSC & Govt Portals)',
    metaTitle: 'How to Compress a Photo to 50 KB for Online Forms - Step-by-Step Guide',
    metaDescription: 'Learn how to easily compress your candidate photograph to 50 KB or less for SSC, UPSC, IBPS, and state government online portals without blurriness.',
    keywords: [
      'compress photo to 50kb',
      'photo compressor 50kb for online forms',
      'ssc photo resize 50kb',
      'upsc photo size reduction',
      'passport photo 50 kb free',
      'reduce image size in kb online'
    ],
    excerpt: 'Learn the exact methods to reduce your photo size to 50 KB without blurriness or rejection on official recruitment and entrance exam portals.',
    category: 'Image Compression',
    publishedDate: 'October 15, 2026',
    readTime: '6 min read',
    author: 'PhotoKB Tech Editorial Team',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeTitle: 'Step-by-Step Video: How to Compress Any Photo to 50 KB for Online Portals',
    tableOfContents: [
      { id: 'why-portals-demand-50kb', title: '1. Why Portals Enforce the 50 KB Limit' },
      { id: 'official-specifications', title: '2. Official Specifications Cheat Sheet' },
      { id: 'step-by-step-guide', title: '3. Step-by-Step Compression Guide' },
      { id: 'common-mistakes', title: '4. Common Upload Mistakes to Avoid' },
      { id: 'frequently-asked-questions', title: '5. Frequently Asked Questions' }
    ],
    content: `
## Why Online Examination Portals Enforce the 50 KB File Size Limit

Every competitive exam applicant in India and abroad has encountered the strict **"File size must be between 20 KB and 50 KB"** warning. When platforms like Staff Selection Commission (SSC), Union Public Service Commission (UPSC), National Testing Agency (NTA for NEET/JEE), or banking boards (IBPS/SBI) open their registration windows, millions of candidates submit forms simultaneously.

To ensure database scalability, prevent server crashes, and allow admit cards to render smoothly on slow 2G/3G mobile networks, automated portal filters immediately disqualify images exceeding 50 KB.

---

## Official Specifications Cheat Sheet for Major Portals

| Portal / Examination | Required Photo Size | Required Signature Size | Recommended Dimensions | Format |
| :--- | :--- | :--- | :--- | :--- |
| **SSC (CGL, CHSL, MTS, GD)** | 20 KB to 50 KB | 10 KB to 20 KB | 3.5 cm x 4.5 cm (Photo) / 4.0 cm x 2.0 cm (Sign) | JPG / JPEG |
| **UPSC (Civil Services, NDA, CDS)** | 20 KB to 50 KB | 10 KB to 20 KB | 350 x 350 px (Min) to 1000 x 1000 px | JPG / JPEG |
| **NTA (NEET, JEE Main, CUET)** | 10 KB to 50 KB | 4 KB to 30 KB | 3.5 cm x 4.5 cm (Passport size) | JPG / JPEG |
| **IBPS / SBI (Bank PO & Clerk)** | 20 KB to 50 KB | 10 KB to 20 KB | 200 x 230 px (Photo) / 140 x 60 px (Sign) | JPG / JPEG |
| **State PSCs (UPPSC, BPSC, MPPSC)** | 20 KB to 50 KB | 10 KB to 20 KB | Standard Biometric Passport Ratio | JPG / JPEG |

---

## Step-by-Step Guide: Compressing to 50 KB Without Blur or Rejection

### Step 1: Prepare a Clean Source Photo
Take a clear picture in bright, natural light against a plain white or off-white wall. Ensure both ears, shoulders, and facial contours are visible. Avoid harsh shadows, spectacles with flash reflections, or stylized social media selfie angles.

### Step 2: Use PhotoKB's Free 50 KB Compressor Tool
Open the dedicated [Compress Image to 50 KB](/compress-to-50kb) tool. Drag and drop your camera photo (even if it is 5 MB or 15 MB).

### Step 3: Automatic Dynamic Quality Balancing
PhotoKB leverages client-side HTML5 canvas technology to perform dynamic binary search compression. It automatically balances:
- Chrominance and luminance quantization
- Progressive baseline encoding
- Target file weight calibration to ~45 KB - 48 KB (safely within the 20 KB - 50 KB bracket)

### Step 4: Preview and Download
Inspect the side-by-side preview to verify facial clarity and sharp contrast. Click **"Download Image"** and upload it straight into your application form.

---

## 4 Common Mistakes That Lead to Photo Rejection

1. **Incorrect Signature Sizing:** Do not upload your signature as a 50 KB photo. Signatures have a tighter limit, usually 10 KB - 20 KB. Use our specialized [Compress Image to 20 KB](/compress-to-20kb) tool instead.
2. **Unsupported File Extensions:** Uploading PNG, WEBP, or HEIC files when the portal explicitly demands \`.jpg\` or \`.jpeg\`. Always convert via our [Free Image Converter](/image-converter).
3. **Stretching the Aspect Ratio:** Manually resizing width and height without locking aspect ratio causes faces to look distorted or unnaturally squashed. Use the [Passport Photo Maker](/passport-photo-maker) to maintain standardized 3.5 x 4.5 cm framing.
4. **Blurry Text or Signatures:** Taking a photo in low light with digital zoom introduces sensor noise that pixelates once compressed. Always scan or take the photograph under daylight.
`,
    faqs: [
      {
        question: 'What is the ideal file size for SSC online registration?',
        answer: 'SSC requires candidate photographs to be strictly between 20 KB and 50 KB, while signatures must be strictly between 10 KB and 20 KB in JPEG format.'
      },
      {
        question: 'Does compressing a photo to 50 KB reduce print quality on admit cards?',
        answer: 'Not if compressed using bicubic downsampling like PhotoKB. Our engine preserves 300 DPI density so the admit card printout remains sharp and legible.'
      },
      {
        question: 'Can I compress my signature to 20 KB on the same site?',
        answer: 'Yes! We have a dedicated tool specifically engineered for signatures: [Compress to 20 KB](/compress-to-20kb).'
      }
    ],
    relatedTools: [
      { slug: 'compress-to-50kb', name: 'Compress to 50 KB' },
      { slug: 'compress-to-20kb', name: 'Compress to 20 KB' },
      { slug: 'passport-photo-maker', name: 'Passport Photo Maker' }
    ],
    relatedPosts: [
      { slug: 'best-image-dimensions-for-online-forms', title: 'Best Image Dimensions for Online Forms and Social Media' },
      { slug: 'jpg-vs-png-vs-webp', title: 'JPG vs PNG vs WebP: What to Choose and Why' }
    ]
  },

  'best-image-dimensions-for-online-forms': {
    slug: 'best-image-dimensions-for-online-forms',
    title: 'Best Image Dimensions for Online Forms and Social Media Platforms (2026 Master Guide)',
    metaTitle: 'Best Image Dimensions for Online Forms & Social Media (2026 Cheat Sheet)',
    metaDescription: 'Complete reference guide for standard image dimensions in pixels, centimeters, and inches for government exam portals, passports, and social media networks.',
    keywords: [
      'best image dimensions for online forms',
      'government form photo dimensions',
      'passport photo size cm',
      'signature dimension in pixels',
      'exam photo aspect ratio',
      'social media image dimensions 2026'
    ],
    excerpt: 'A comprehensive cheat sheet of required image dimensions (pixels, centimeters, inches) for government applications, passports, and modern web platforms.',
    category: 'Image Dimensions',
    publishedDate: 'October 10, 2026',
    readTime: '7 min read',
    author: 'PhotoKB Tech Editorial Team',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeTitle: 'Mastering Image Dimensions: Pixels vs CM vs Inches Explained',
    tableOfContents: [
      { id: 'understanding-units', title: '1. Understanding Pixels, Centimeters & DPI' },
      { id: 'competitive-exams-dimensions', title: '2. Competitive Exams Dimensions Cheat Sheet' },
      { id: 'international-passport-sizes', title: '3. International Passport & Visa Dimensions' },
      { id: 'social-media-dimensions', title: '4. 2026 Social Media Image Dimensions' },
      { id: 'how-to-resize-accurately', title: '5. How to Resize Accurately with PhotoKB' }
    ],
    content: `
## Understanding Pixels, Centimeters & DPI

When submitting documents digitally or preparing graphics for the web, choosing the right physical dimensions and digital resolution is critical.

- **Pixels (px):** The fundamental unit of digital screens. A photo of 600x600 pixels contains 360,000 distinct color points.
- **Centimeters (cm) & Millimeters (mm):** Physical measurement units used for printed passports, identity cards, and official forms.
- **DPI (Dots Per Inch):** The link between digital pixels and physical print. For standard high-quality printing, **300 DPI** is universally required. For example, a 3.5 cm x 4.5 cm photo at 300 DPI equates to roughly **413 x 531 pixels**.

---

## Competitive Exams Dimensions Reference Table

| Exam Authority | Document Type | Dimensions (Pixels) | Dimensions (Physical) | Aspect Ratio |
| :--- | :--- | :--- | :--- | :--- |
| **SSC Portals** | Candidate Photograph | 350 x 450 px | 3.5 x 4.5 cm | 7 : 9 |
| **SSC Portals** | Signature | 140 x 60 px | 4.0 x 2.0 cm | 7 : 3 |
| **UPSC CSE / NDA** | Photograph | 350 x 350 px (Min) | Square | 1 : 1 |
| **UPSC CSE / NDA** | Signature | 350 x 350 px (Min) | Square or 7:3 | Flexible |
| **IBPS Banking** | Photograph | 200 x 230 px | 3.5 x 4.5 cm | 20 : 23 |
| **IBPS Banking** | Signature | 140 x 60 px | 3.5 x 1.5 cm | 7 : 3 |
| **NTA (NEET / JEE)** | Postcard Photo | 4 x 6 inches | 10.16 x 15.24 cm | 2 : 3 |

Need to resize to these exact dimensions? Use our [Online Image Resizer](/image-resizer) to set width and height in px, cm, or inches instantly.

---

## International Passport & Visa Photo Dimensions

| Country / Document | Dimensions (Inches / mm) | Pixels at 300 DPI | Background Requirement |
| :--- | :--- | :--- | :--- |
| **India Passport & OCI** | 3.5 x 4.5 cm (35 x 45 mm) | 413 x 531 px | Plain White / Off-White |
| **US Visa (DS-160) & Passport** | 2 x 2 inches (51 x 51 mm) | 600 x 600 px | Strict White |
| **Schengen Visa (Europe)** | 35 x 45 mm | 413 x 531 px | Light Grey or Plain White |
| **UK Visa & Passport** | 35 x 45 mm | 413 x 531 px | Cream or Light Grey |
| **Canada Passport** | 50 x 70 mm | 590 x 826 px | Pure White |

Format your biometric picture instantly using our [Passport Photo Maker](/passport-photo-maker).

---

## 2026 Social Media Image Dimensions Reference

- **YouTube Video Thumbnail:** 1280 x 720 px (16:9 ratio, min width 640 px)
- **Instagram Square Post:** 1080 x 1080 px (1:1 ratio)
- **Instagram Portrait Post:** 1080 x 1350 px (4:5 ratio)
- **Instagram Story / Reel:** 1080 x 1920 px (9:16 vertical)
- **LinkedIn Profile Photo:** 400 x 400 px
- **LinkedIn Company Banner:** 1128 x 191 px
- **Twitter / X Header:** 1500 x 500 px
`,
    faqs: [
      {
        question: 'How do I convert centimeters (cm) to pixels for online forms?',
        answer: 'Multiply centimeters by 118.11 for 300 DPI high resolution, or by 37.79 for standard 96 DPI web displays. Our [Image Resizer](/image-resizer) handles this unit conversion automatically.'
      },
      {
        question: 'What is the difference between aspect ratio and dimensions?',
        answer: 'Dimensions represent the absolute pixel width and height (e.g., 1920x1080 px), while aspect ratio is the proportional relationship between width and height (e.g., 16:9).'
      }
    ],
    relatedTools: [
      { slug: 'image-resizer', name: 'Image Resizer' },
      { slug: 'passport-photo-maker', name: 'Passport Photo Maker' },
      { slug: 'compress-to-50kb', name: 'Compress to 50 KB' }
    ],
    relatedPosts: [
      { slug: 'how-to-compress-photo-to-50kb', title: 'How to Compress a Photo to 50 KB for Online Forms' },
      { slug: 'jpg-vs-png-vs-webp', title: 'JPG vs PNG vs WebP: What to Choose and Why' }
    ]
  },

  'jpg-vs-png-vs-webp': {
    slug: 'jpg-vs-png-vs-webp',
    title: 'JPG vs PNG vs WebP: What to Choose and Why?',
    metaTitle: 'JPG vs PNG vs WebP: Complete Comparison & Format Decision Guide',
    metaDescription: 'Compare JPG, PNG, and WebP image formats. Learn about compression efficiency, transparency support, web performance, and official portal requirements.',
    keywords: [
      'jpg vs png vs webp',
      'difference between jpg and png',
      'webp image format advantages',
      'convert png to jpg for govt form',
      'best format for website speed',
      'lossy vs lossless image compression'
    ],
    excerpt: 'Detailed comparison of JPG, PNG, and WebP image formats. Learn which format is best for website speed, transparency, and government applications.',
    category: 'Image Formats',
    publishedDate: 'October 05, 2026',
    readTime: '5 min read',
    author: 'PhotoKB Tech Editorial Team',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeTitle: 'JPG vs PNG vs WebP Explained: Which Format Is Actually Best?',
    tableOfContents: [
      { id: 'quick-summary', title: '1. Quick Format Summary' },
      { id: 'technical-comparison', title: '2. Technical Comparison Matrix' },
      { id: 'when-to-use-each', title: '3. When to Use Which Format' },
      { id: 'converting-formats-easily', title: '4. Converting Formats Easily' }
    ],
    content: `
## Quick Format Summary: The Big Three

When handling images digitally, choosing between **JPEG (JPG)**, **PNG**, and **WebP** dramatically influences file size, visual clarity, loading speed, and portal acceptance.

1. **JPEG / JPG (Joint Photographic Experts Group):**
   - The universal standard for photos and camera imagery.
   - Utilizes lossy discrete cosine transform compression to remove visual data imperceptible to human eyes.
   - Universally accepted across 100% of websites, software, and government exam uploaders.
2. **PNG (Portable Network Graphics):**
   - Designed for graphics, logos, illustrations, and screenshots.
   - Employs lossless Deflate compression with full 8-bit alpha transparency support.
   - Produces significantly larger file weights when saving complex continuous-tone photographs.
3. **WebP (Developed by Google):**
   - Modern next-generation web format supporting both lossy and lossless modes, plus transparency and animation.
   - Generates files that are **25% to 34% smaller** than equivalent JPEGs.
   - Ideal for web design, eCommerce, and Core Web Vitals optimization.

---

## Technical Comparison Matrix

| Feature | JPEG (JPG) | PNG | WebP |
| :--- | :--- | :--- | :--- |
| **Compression Type** | Lossy | Lossless | Both Lossy & Lossless |
| **Transparency (Alpha)** | ❌ No | ✅ Yes | ✅ Yes |
| **Relative File Size** | Small | Large (for photos) | Smallest (25-34% lighter) |
| **Govt Portal Acceptance** | 100% Accepted | Rarely Accepted | Not Yet Widely Accepted |
| **Browser Compatibility** | 100% | 100% | 98.5%+ Modern Browsers |
| **Best For** | Photos, Forms, Resumes | Logos, Icons, Signatures | Modern Web & Apps |

---

## When to Use Which Format: Practical Rules

### Scenario 1: Submitting Online Applications & Government Forms
👉 **Always Choose JPG / JPEG.**
Almost every administrative recruitment portal (SSC, UPSC, State PSCs, US DS-160) specifically disallows PNG or WebP files. If your smartphone saved an image as PNG or WebP, convert it right away with our [Free Image Converter](/image-converter).

### Scenario 2: Web Design & SEO Speed Optimization
👉 **Always Choose WebP.**
Google PageSpeed Insights actively recommends serving images in next-gen formats like WebP or AVIF. Compressing your site assets into WebP drastically speeds up Largest Contentful Paint (LCP).

### Scenario 3: Document Merging & Archival
👉 **Use [JPG to PDF](/jpg-to-pdf).**
For certificates, diplomas, invoices, and multi-page receipts, combining JPG images into an indexed PDF ensures universal readability without compatibility friction.
`,
    faqs: [
      {
        question: 'Can I upload a PNG photo to SSC or UPSC portals?',
        answer: 'No. Most government portals strictly require JPEG/JPG files and will display an "Invalid file format" error if you upload a PNG. Convert it to JPG first using PhotoKB.'
      },
      {
        question: 'Does converting from PNG to JPG reduce image quality?',
        answer: 'When using high quality compression (quality 0.85+), there is no perceptible visual loss. However, transparent areas in PNG will be filled with a clean white background.'
      }
    ],
    relatedTools: [
      { slug: 'image-converter', name: 'Image Converter' },
      { slug: 'compress-to-50kb', name: 'Compress to 50 KB' },
      { slug: 'jpg-to-pdf', name: 'JPG to PDF' }
    ],
    relatedPosts: [
      { slug: 'how-to-compress-photo-to-50kb', title: 'How to Compress a Photo to 50 KB for Online Forms' },
      { slug: 'best-image-dimensions-for-online-forms', title: 'Best Image Dimensions for Online Forms and Social Media' }
    ]
  }
};
