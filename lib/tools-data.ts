export interface ToolData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  subtitle: string;
  targetKB?: number;
  icon: string;
  category: 'compress' | 'resize' | 'convert' | 'document';
  youtubeId?: string;
  youtubeTitle?: string;
  features: string[];
  specs: { label: string; value: string }[];
  steps: { title: string; desc: string }[];
  useCases: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  relatedTools: { slug: string; name: string; desc: string }[];
}

export const TOOLS: Record<string, ToolData> = {
  'compress-to-20kb': {
    slug: 'compress-to-20kb',
    title: 'Compress Image to 20 KB Online Free',
    metaTitle: 'Compress Image to 20 KB Online Free - Exact 20KB Photo & Signature Resizer',
    metaDescription: 'Compress image to 20 KB online for free without losing quality. Ideal for government exam portals (SSC, UPSC, IBPS, State PSC), online admissions, and signature uploads.',
    keywords: [
      'compress image to 20 kb',
      'reduce image size to 20kb',
      'photo compressor 20kb',
      'signature resize 20kb',
      'ssc signature compressor',
      'online photo resizer in kb',
      'image converter 20kb online',
      'free photo compress 20kb'
    ],
    h1: 'Compress Image to 20 KB Online Free',
    subtitle: 'Reduce your photo and signature file size to exactly 20 KB or less in seconds without pixelation. Trusted for SSC, UPSC, IBPS, RRB & official online portals.',
    targetKB: 20,
    icon: 'Shrink',
    category: 'compress',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeTitle: 'How to Compress Photo and Signature to 20 KB for Online Forms',
    features: [
      'Exact 20 KB Target Size Algorithm',
      'Ideal for Signature & Photo Uploads',
      'High Contrast & Clear Resolution Kept',
      '100% In-Browser Privacy Protection',
      'Instant Batch Processing & Download'
    ],
    specs: [
      { label: 'Target Size', value: 'Under 20 KB (18-20 KB)' },
      { label: 'Supported Inputs', value: 'JPG, JPEG, PNG, WEBP, BMP' },
      { label: 'Output Format', value: 'Standard JPG / JPEG' },
      { label: 'Recommended Dimensions', value: '140 x 60 px (Signature) or 200 x 230 px (Photo)' },
      { label: 'Processing Speed', value: '< 0.3 Seconds' }
    ],
    steps: [
      { title: 'Upload Image or Signature', desc: 'Drag and drop your file into the 20 KB compressor box above or select it from your device.' },
      { title: 'Auto-Compression to 20 KB', desc: 'Our smart binary-search canvas engine automatically calculates optimal quality and dimensions to hit ≤ 20 KB.' },
      { title: 'Preview & Download', desc: 'Check the real-time preview side-by-side and click "Download Image" to save your portal-ready file.' }
    ],
    useCases: [
      { title: 'Government Job Applications', desc: 'Staff Selection Commission (SSC CGL/CHSL/MTS), UPSC CSE, State PSC forms requiring signatures between 10 KB - 20 KB.' },
      { title: 'Banking & Railway Exams', desc: 'IBPS PO/Clerk, SBI, RRB NTPC photo and thumb impression specifications.' },
      { title: 'College & University Admissions', desc: 'CUET, NEET, JEE registration portals needing ultra-lightweight scanned documents.' },
      { title: 'Passport & Identity Verification', desc: 'Aadhaar, PAN card correction forms and local authority service uploads.' }
    ],
    faqs: [
      {
        question: 'How do I compress an image to exactly 20 KB without blurriness?',
        answer: 'Our tool uses an intelligent iterative canvas optimization algorithm that scales compression quality and dimensions simultaneously. It ensures maximum possible clarity while strictly staying below the 20 KB boundary.'
      },
      {
        question: 'Is my uploaded photo or signature stored on your servers?',
        answer: 'No. PhotoKB processes 100% of your images locally in your web browser using HTML5 Canvas technology. Your sensitive personal documents and signatures never leave your device or touch any external server.'
      },
      {
        question: 'What is the required dimension for a 20 KB signature?',
        answer: 'Most examination boards (like SSC and IBPS) recommend dimensions of 140 pixels in width by 60 pixels in height (aspect ratio ~ 7:3) with a file size strictly between 10 KB and 20 KB.'
      },
      {
        question: 'Can I convert a PNG signature to 20 KB JPG?',
        answer: 'Yes! PhotoKB automatically converts PNG transparent signatures into clean white-background JPG files optimized to 20 KB, which is universally accepted by all portal uploaders.'
      }
    ],
    relatedTools: [
      { slug: 'compress-to-50kb', name: 'Compress to 50 KB', desc: 'For passport photos and identity documents' },
      { slug: 'image-resizer', name: 'Image Resizer', desc: 'Customize exact width & height in pixels, cm or inches' },
      { slug: 'jpg-to-pdf', name: 'JPG to PDF', desc: 'Combine multiple images into a single compact PDF' }
    ]
  },

  'compress-to-50kb': {
    slug: 'compress-to-50kb',
    title: 'Compress Image to 50 KB Online Free',
    metaTitle: 'Compress Image to 50 KB Online Free - SSC, UPSC, Job Photo Resizer',
    metaDescription: 'Compress image to 50 KB online for free without losing quality. Perfect for passport photos, SSC, UPSC, GATE, NEET, and visa application portals.',
    keywords: [
      'compress image to 50 kb',
      'reduce image size to 50kb',
      'photo compressor 50kb',
      'ssc photo resizer 50kb',
      'upsc photo compress 50kb',
      'passport photo 50 kb',
      'resize image in kb'
    ],
    h1: 'Compress Image to 50 KB Online Free',
    subtitle: 'Optimize passport photos and certificates to exactly 50 KB or less. Guaranteed clarity, sharp facial details, and instant download.',
    targetKB: 50,
    icon: 'Shrink',
    category: 'compress',
    youtubeId: 'dQw4w9WgXcQ',
    youtubeTitle: 'Step by Step Guide: How to Resize Photo to 50 KB for Online Forms',
    features: [
      'Exact 50 KB Precision Compression',
      'Optimized for Facial Detail & Document Clarity',
      'Accepted by All Indian & International Portals',
      'Zero Server Uploads - Completely Private',
      'One-Click Download with Original Aspect Ratio'
    ],
    specs: [
      { label: 'Target Size', value: 'Under 50 KB (40-50 KB)' },
      { label: 'Supported Inputs', value: 'JPG, PNG, WEBP, HEIC' },
      { label: 'Output Format', value: 'Optimized JPEG' },
      { label: 'Recommended Dimensions', value: '3.5 x 4.5 cm / 413 x 531 px' },
      { label: 'Processing Time', value: '< 0.4 Seconds' }
    ],
    steps: [
      { title: 'Drop Your Photo', desc: 'Select or drag your candidate photograph into the 50 KB tool window.' },
      { title: 'Smart Quality Balancing', desc: 'The compressor scales down heavy metadata while retaining high DPI and clear facial features.' },
      { title: 'Instant Verification & Download', desc: 'Verify the file weight counter (<50 KB) and click Download.' }
    ],
    useCases: [
      { title: 'SSC & UPSC Candidate Photos', desc: 'Standard photo upload specifications requiring 20 KB to 50 KB JPEG files.' },
      { title: 'NEET / JEE / GATE Examinations', desc: 'National Testing Agency (NTA) guidelines requiring 10 KB to 50 KB candidate photos.' },
      { title: 'Visa & Passport Applications', desc: 'Online visa submission portals demanding lightweight identity photos.' },
      { title: 'Web Uploads & Profile Avatars', desc: 'Lightweight web profile pictures that load instantaneously on mobile networks.' }
    ],
    faqs: [
      {
        question: 'Why do government portals reject photos larger than 50 KB?',
        answer: 'Government servers process millions of candidate records concurrently. Keeping file sizes under 50 KB ensures database efficiency, low bandwidth consumption, and fast retrieval during admit card generation.'
      },
      {
        question: 'Will compressing my photo to 50 KB make my face blurry?',
        answer: 'No. PhotoKB uses perceptual color quantization and progressive baseline JPEG encoding so key facial features, eyes, and contours remain crisp and legible.'
      },
      {
        question: 'Can I compress mobile camera photos that are 5 MB to 10 MB?',
        answer: 'Yes! PhotoKB seamlessly compresses large multi-megapixel smartphone photos (5 MB - 25 MB) down to under 50 KB within milliseconds.'
      }
    ],
    relatedTools: [
      { slug: 'compress-to-20kb', name: 'Compress to 20 KB', desc: 'For official signatures and thumb impressions' },
      { slug: 'passport-photo-maker', name: 'Passport Photo Maker', desc: 'Format photos to official 3.5x4.5cm or 2x2 inch standards' },
      { slug: 'image-converter', name: 'Image Converter', desc: 'Convert between JPG, PNG, and WebP' }
    ]
  },

  'compress-to-100kb': {
    slug: 'compress-to-100kb',
    title: 'Compress Image to 100 KB Online Free',
    metaTitle: 'Compress Image to 100 KB Online Free - Fast Document & Photo Optimizer',
    metaDescription: 'Compress image to 100 KB online without quality degradation. Ideal for scanned documents, certificates, email attachments, and web publishing.',
    keywords: [
      'compress image to 100 kb',
      'reduce image size to 100kb',
      'photo compressor 100kb',
      'online image optimizer 100kb',
      'compress certificate to 100kb'
    ],
    h1: 'Compress Image to 100 KB Online Free',
    subtitle: 'Optimize high-res photos, scanned certificates, and marksheets to under 100 KB. High fidelity, readable text, and fast download.',
    targetKB: 100,
    icon: 'Shrink',
    category: 'compress',
    features: [
      'Crisp Text Readability on Scanned Documents',
      'Optimized for Marksheets & Certificates',
      'Email Friendly & Fast Loading',
      'Batch File Processing Ready'
    ],
    specs: [
      { label: 'Target Size', value: 'Under 100 KB' },
      { label: 'Supported Inputs', value: 'JPG, PNG, WEBP' },
      { label: 'Output Format', value: 'Clean JPEG' },
      { label: 'Ideal Document Type', value: 'Certificates, IDs, Marksheets' }
    ],
    steps: [
      { title: 'Upload Document/Photo', desc: 'Drag and drop your scanned document or image.' },
      { title: 'Fast 100 KB Balancing', desc: 'Smart algorithm minimizes file size while keeping text razor sharp.' },
      { title: 'Download Instantly', desc: 'Save your file ready for any portal or email attachment.' }
    ],
    useCases: [
      { title: 'Academic Marksheets & Degrees', desc: 'University portals requiring scanned certificates under 100 KB.' },
      { title: 'Job Application Resumes & IDs', desc: 'PAN, Voter ID, and Driver License document uploads.' },
      { title: 'Website Optimization', desc: 'Blog illustrations and hero imagery for fast Core Web Vitals.' }
    ],
    faqs: [
      {
        question: 'Will scanned text remain readable after 100 KB compression?',
        answer: 'Yes, our algorithm protects high-contrast edges and fine text lines so scanned documents remain 100% legible for verification officers.'
      }
    ],
    relatedTools: [
      { slug: 'compress-to-50kb', name: 'Compress to 50 KB', desc: 'For candidate profile photos' },
      { slug: 'jpg-to-pdf', name: 'JPG to PDF', desc: 'Combine multiple certificates into one PDF' }
    ]
  },

  'compress-to-200kb': {
    slug: 'compress-to-200kb',
    title: 'Compress Image to 200 KB Online Free',
    metaTitle: 'Compress Image to 200 KB Online Free - HD Image & Document Resizer',
    metaDescription: 'Compress image to 200 KB online. Reduce large MB photos down to 200 KB with near-lossless visual quality for websites, social media, and online portals.',
    keywords: [
      'compress image to 200 kb',
      'reduce image size to 200kb',
      'image compressor 200kb',
      'hd photo compressor 200kb'
    ],
    h1: 'Compress Image to 200 KB Online Free',
    subtitle: 'Reduce megabyte-heavy camera photos to a clean 200 KB file with rich color reproduction and zero visible artifacting.',
    targetKB: 200,
    icon: 'Shrink',
    category: 'compress',
    features: [
      'Rich Color Depth Retention',
      'Near-Lossless Visual Compression',
      'Instant Conversion from 5-20 MB',
      'Completely Private Browser Engine'
    ],
    specs: [
      { label: 'Target Size', value: 'Under 200 KB' },
      { label: 'Supported Inputs', value: 'JPG, PNG, WEBP' },
      { label: 'Output Format', value: 'High Quality JPEG' }
    ],
    steps: [
      { title: 'Select Image', desc: 'Upload any high-resolution image from your camera or gallery.' },
      { title: 'Optimize to 200 KB', desc: 'Precision compression algorithm reduces heavy byte payload.' },
      { title: 'Download Result', desc: 'Save your optimized photo ready for web or official submissions.' }
    ],
    useCases: [
      { title: 'E-commerce Product Photos', desc: 'Fast loading product catalogs that do not compromise on detail.' },
      { title: 'Real Estate & Property Photos', desc: 'Sharp interior and exterior property listings.' }
    ],
    faqs: [
      {
        question: 'How much quality is lost when compressing from 10 MB to 200 KB?',
        answer: 'Visually, virtually none to the human eye. Unnecessary EXIF metadata, camera sensor noise, and redundant color profiles are cleaned up first.'
      }
    ],
    relatedTools: [
      { slug: 'image-resizer', name: 'Image Resizer', desc: 'Control exact width and height dimensions' },
      { slug: 'image-converter', name: 'Image Converter', desc: 'Convert JPG, PNG, and WebP formats' }
    ]
  },

  'image-resizer': {
    slug: 'image-resizer',
    title: 'Online Image Resizer - Resize by Pixels, CM & Inches',
    metaTitle: 'Free Online Image Resizer - Resize Image by Pixels, CM, MM & Inches',
    metaDescription: 'Resize image dimensions online for free. Change image width and height in pixels (px), centimeters (cm), millimeters (mm), or inches with aspect ratio lock.',
    keywords: [
      'image resizer online',
      'resize image by pixels',
      'resize photo in cm',
      'change image dimensions',
      'photo resize in inches',
      'free image resizer',
      'ssc photo resizer dimension'
    ],
    h1: 'Free Online Image Resizer',
    subtitle: 'Quickly resize any picture to custom dimensions in pixels, centimeters, or inches. Maintain aspect ratio or stretch to exact portal requirements.',
    icon: 'Maximize',
    category: 'resize',
    features: [
      'Unit Selector: Pixels (px), Centimeters (cm), Inches (in), Millimeters (mm)',
      'Aspect Ratio Lock / Unlock Toggle',
      'High-Definition Bicubic Resampling',
      'Live Dimension & File Size Feedback',
      'Preset Dimensions for Instagram, YouTube, Passport, SSC'
    ],
    specs: [
      { label: 'Units Supported', value: 'px, cm, mm, inch (at 300 DPI)' },
      { label: 'Max Resolution', value: 'Up to 8000 x 8000 px' },
      { label: 'Aspect Ratios', value: '1:1, 4:5, 16:9, 3:2, Custom' },
      { label: 'Privacy', value: '100% In-Browser' }
    ],
    steps: [
      { title: 'Upload Image', desc: 'Choose the photo you want to resize from your computer or phone.' },
      { title: 'Enter New Dimensions', desc: 'Type your desired width and height, choose units (px/cm/in), and toggle aspect ratio.' },
      { title: 'Apply & Download', desc: 'View the instant preview and click Download Resized Image.' }
    ],
    useCases: [
      { title: 'Exam Dimension Specifications', desc: 'Set exact 350x450 px or 200x230 px required by competitive exam forms.' },
      { title: 'Social Media Banners & Posts', desc: 'Resize for YouTube thumbnails (1280x720), Instagram posts (1080x1080), and LinkedIn banners.' },
      { title: 'Print & Framing Dimensions', desc: 'Convert digital photos to exact 4x6 inch, 5x7 inch, or A4 print layouts.' }
    ],
    faqs: [
      {
        question: 'How do I resize an image in centimeters (cm)?',
        answer: 'Select "cm" from our unit dropdown. PhotoKB calculates the exact pixel dimensions using standard 300 DPI print density so your image prints out at the exact physical size.'
      },
      {
        question: 'What happens if I unlock the aspect ratio?',
        answer: 'Unlocking the aspect ratio allows you to specify custom width and height independently, which is often required when government portals enforce strict fixed rectangular dimensions.'
      }
    ],
    relatedTools: [
      { slug: 'compress-to-50kb', name: 'Compress to 50 KB', desc: 'Combine dimension resize with 50 KB file cap' },
      { slug: 'passport-photo-maker', name: 'Passport Photo Maker', desc: 'Standardized biometric passport templates' }
    ]
  },

  'image-converter': {
    slug: 'image-converter',
    title: 'Free Online Image Converter - JPG, PNG, WEBP',
    metaTitle: 'Free Online Image Converter - Convert JPG, PNG, WEBP, AVIF Instantly',
    metaDescription: 'Convert images online between JPG, PNG, WebP, and other popular formats for free. Lightning-fast client-side conversion without quality loss.',
    keywords: [
      'image converter online',
      'convert jpg to png',
      'convert png to jpg',
      'webp to jpg converter',
      'jpg to webp converter',
      'free online photo converter'
    ],
    h1: 'Free Online Image Converter',
    subtitle: 'Convert between JPG, PNG, and WebP instantly right in your browser. Fast, free, and completely secure.',
    icon: 'RefreshCw',
    category: 'convert',
    features: [
      'Two-Way Conversions: JPG ⇄ PNG ⇄ WebP',
      'Preserve Transparency or Add Clean White Backing',
      'Batch Image Processing Supported',
      'No File Size Limits or Hidden Fees'
    ],
    specs: [
      { label: 'Supported Inputs', value: 'JPG, JPEG, PNG, WEBP, BMP, GIF' },
      { label: 'Supported Outputs', value: 'JPG, PNG, WEBP' },
      { label: 'Quality Options', value: 'High, Medium, Lossless' }
    ],
    steps: [
      { title: 'Add Files', desc: 'Select or drop your image into the converter.' },
      { title: 'Choose Target Format', desc: 'Select JPG, PNG, or WebP depending on your use case.' },
      { title: 'Convert & Download', desc: 'Download your newly converted image in one click.' }
    ],
    useCases: [
      { title: 'Web Development', desc: 'Convert heavy PNGs into modern lightweight WebP for lightning-fast page loading.' },
      { title: 'Official Documents', desc: 'Convert modern WebP or HEIC camera captures to standard universally compatible JPG.' }
    ],
    faqs: [
      {
        question: 'What is the difference between JPG and WebP?',
        answer: 'WebP is a modern format developed by Google that provides 25-34% smaller file sizes compared to JPEG at equivalent visual quality. However, older government portals still require standard JPG.'
      }
    ],
    relatedTools: [
      { slug: 'compress-to-20kb', name: 'Compress to 20 KB', desc: 'Compress converted JPGs for portal forms' },
      { slug: 'jpg-to-pdf', name: 'JPG to PDF', desc: 'Convert and save images as a single PDF' }
    ]
  },

  'passport-photo-maker': {
    slug: 'passport-photo-maker',
    title: 'Online Passport Size Photo Maker - 2x2 in & 3.5x4.5 cm',
    metaTitle: 'Online Passport Size Photo Maker - Official 2x2 inch & 3.5x4.5 cm Resizer',
    metaDescription: 'Create compliant passport size photos online for free. Presets for Indian Passport, US Visa (2x2 inch), UK, Canada, Schengen, and PAN card with custom background.',
    keywords: [
      'passport size photo maker online',
      '2x2 inch photo resizer',
      '3.5 x 4.5 cm photo maker',
      'online passport photo creator',
      'us visa photo maker',
      'indian passport photo size',
      'pan card photo resizer'
    ],
    h1: 'Online Passport Size Photo Maker',
    subtitle: 'Generate compliant passport, visa, and ID photos in seconds. Standard templates for India (3.5x4.5 cm), USA (2x2 in), UK, Schengen, and competitive exam standards.',
    icon: 'UserSquare2',
    category: 'resize',
    features: [
      'Official Country Presets: India, USA, UK, Schengen, Australia, Canada',
      'Background Color Selector (Clean White, Light Blue, Light Grey)',
      'Print Sheet Generation (6, 8, or 12 Photos on a 4x6 print paper)',
      'Sub-50 KB and Sub-100 KB File Compression Included'
    ],
    specs: [
      { label: 'India Standard', value: '3.5 x 4.5 cm (300 DPI: 413 x 531 px)' },
      { label: 'US Visa Standard', value: '2 x 2 inches (600 x 600 px)' },
      { label: 'Schengen / Europe', value: '35 x 45 mm' },
      { label: 'Compliance', value: 'ICAO Biometric Guidelines' }
    ],
    steps: [
      { title: 'Upload Headshot', desc: 'Upload a clear, front-facing portrait photo.' },
      { title: 'Choose Country / Preset', desc: 'Select India 3.5x4.5 cm, US 2x2 inch, or custom dimensions.' },
      { title: 'Download Single or Printable Sheet', desc: 'Get your digital passport photo or print-ready 4x6 sheet.' }
    ],
    useCases: [
      { title: 'Passport & Visa Applications', desc: 'DS-160 US Visa, Schengen travel visas, Indian passport renewal.' },
      { title: 'Govt Exam Admit Cards', desc: 'SSC, UPSC, Banking, and State civil service registration.' },
      { title: 'Driving License & PAN Card', desc: 'Official identity cards requiring standardized portrait dimensions.' }
    ],
    faqs: [
      {
        question: 'What is the standard passport photo size for India?',
        answer: 'The standard Indian passport photo dimension is 3.5 cm in width by 4.5 cm in height (35 mm x 45 mm), with a clean white or light background and head occupying 70-80% of the frame.'
      },
      {
        question: 'Can I print these passport photos at a local photo studio or printer?',
        answer: 'Yes! PhotoKB generates high-resolution 300 DPI print-ready images that can be printed directly on 4x6 or A4 photo paper.'
      }
    ],
    relatedTools: [
      { slug: 'compress-to-50kb', name: 'Compress to 50 KB', desc: 'Compress passport photo for online upload' },
      { slug: 'compress-to-20kb', name: 'Compress to 20 KB', desc: 'Resize signature to match passport application' }
    ]
  },

  'jpg-to-pdf': {
    slug: 'jpg-to-pdf',
    title: 'JPG to PDF Converter Online Free - Merge Images to PDF',
    metaTitle: 'JPG to PDF Converter Online Free - Convert & Merge Images to PDF Document',
    metaDescription: 'Convert JPG images to PDF document online for free. Combine multiple photos into a single PDF with custom page orientation, margins, and compression.',
    keywords: [
      'jpg to pdf converter',
      'convert image to pdf online',
      'merge photos to pdf',
      'free jpg to pdf tool',
      'combine images into one pdf',
      'scan to pdf free'
    ],
    h1: 'JPG to PDF Converter Online Free',
    subtitle: 'Merge single or multiple JPG, PNG, and WebP images into a single professional PDF document in seconds. 100% free, private, and no watermarks.',
    icon: 'FileText',
    category: 'document',
    features: [
      'Merge Multiple Images into One PDF',
      'Page Orientation: Portrait or Landscape',
      'Configurable Margins (None, Small, Normal)',
      'Rearrange Page Order Easily',
      'Instant Local Client-Side PDF Generation'
    ],
    specs: [
      { label: 'Page Formats', value: 'A4, Letter, Auto-Fit' },
      { label: 'Orientation', value: 'Portrait / Landscape' },
      { label: 'Max Files', value: 'Unlimited in Browser' },
      { label: 'Watermark', value: 'None (100% Clean)' }
    ],
    steps: [
      { title: 'Upload Pictures', desc: 'Select or drag your JPG or PNG images into the converter.' },
      { title: 'Customize Layout', desc: 'Choose page size (A4), orientation, and drag to reorder pages.' },
      { title: 'Generate & Download PDF', desc: 'Click "Create PDF" and instantly download your merged file.' }
    ],
    useCases: [
      { title: 'Official Application Portals', desc: 'Combine ID proof front and back, degree certificates, and marksheets into one PDF.' },
      { title: 'Assignments & Projects', desc: 'Merge photographed handwritten notes into a tidy digital document for teachers.' },
      { title: 'Invoices & Receipts', desc: 'Organize scanned receipts and bills for tax and accounting filing.' }
    ],
    faqs: [
      {
        question: 'Is there a limit on how many images I can convert to PDF?',
        answer: 'No! Because PhotoKB processes everything client-side inside your web browser, there are no file count or upload size limits.'
      },
      {
        question: 'Does this tool add watermarks or branding to my PDF?',
        answer: 'No, PhotoKB creates clean, professional PDFs without any watermarks or stamps.'
      }
    ],
    relatedTools: [
      { slug: 'compress-to-100kb', name: 'Compress to 100 KB', desc: 'Compress individual photos before merging' },
      { slug: 'image-converter', name: 'Image Converter', desc: 'Convert PNG or WebP files to JPG' }
    ]
  }
};
