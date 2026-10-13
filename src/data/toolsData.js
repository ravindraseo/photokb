export const CATEGORIES = [
  {
    id: 'image-tools',
    name: 'Image Tools',
    iconName: 'Image',
    count: '20+ Tools',
    color: 'blue',
    bgLight: 'bg-blue-50 text-blue-600 border-blue-200',
    description: 'Compress, resize, convert and edit images online instantly without quality loss.'
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    iconName: 'FileText',
    count: '15+ Tools',
    color: 'rose',
    bgLight: 'bg-rose-50 text-rose-600 border-rose-200',
    description: 'Convert, merge, split, compress, and edit PDF documents in seconds.'
  },
  {
    id: 'calculator-tools',
    name: 'Calculator Tools',
    iconName: 'Calculator',
    count: '25+ Tools',
    color: 'emerald',
    bgLight: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    description: 'Calculate age, loan EMI, BMI, discounts, percentages, and financial metrics.'
  },
  {
    id: 'text-tools',
    name: 'Text Tools',
    iconName: 'Type',
    count: '10+ Tools',
    color: 'purple',
    bgLight: 'bg-purple-50 text-purple-600 border-purple-200',
    description: 'Word counters, text diff checkers, case converters, lorem generator, and clean formatting.'
  },
  {
    id: 'seo-tools',
    name: 'SEO Tools',
    iconName: 'BarChart2',
    count: '10+ Tools',
    color: 'amber',
    bgLight: 'bg-amber-50 text-amber-600 border-amber-200',
    description: 'Meta tag generator, robots.txt builder, keyword density, and SERP simulator.'
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    iconName: 'Code2',
    count: '15+ Tools',
    color: 'sky',
    bgLight: 'bg-sky-50 text-sky-600 border-sky-200',
    description: 'JSON formatters, base64 encoder/decoder, URL encoder, CSS generators, and hashes.'
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    iconName: 'ArrowLeftRight',
    count: '10+ Tools',
    color: 'pink',
    bgLight: 'bg-pink-50 text-pink-600 border-pink-200',
    description: 'Fast conversion for length, weight, speed, temperature, area, and digital storage.'
  },
  {
    id: 'other-tools',
    name: 'Other Tools',
    iconName: 'LayoutGrid',
    count: 'More Tools',
    color: 'green',
    bgLight: 'bg-green-50 text-green-600 border-green-200',
    description: 'QR Code generators, password makers, timezone converters, and daily utility helpers.'
  }
];

export const ALL_TOOLS = [
  // High-Volume US Featured Tools
  {
    id: 'us-passport-photo-resizer',
    name: 'US Passport Photo Resizer',
    description: 'Resize & crop photos to official 2x2 inches (600x600 px) for US Passports and Visas.',
    category: 'image-tools',
    iconName: 'Camera',
    colorScheme: 'blue',
    badge: '🇺🇸 US Official',
    featured: true,
    route: '/us-passport-photo-resizer'
  },
  {
    id: 'resize-image-in-kb',
    name: 'Resize Image in KB',
    description: 'Compress and resize photos to exact KB (20KB, 50KB, 100KB, 200KB) for online applications.',
    category: 'image-tools',
    iconName: 'Sliders',
    colorScheme: 'emerald',
    badge: 'Exact KB',
    featured: true,
    route: '/resize-image-in-kb'
  },
  {
    id: 'inches-to-pixels-photo-resizer',
    name: 'Inches to Pixels Resizer',
    description: 'Convert physical inch dimensions (2x2, 4x6, 5x7, 8.5x11) into 300 DPI pixels for printing.',
    category: 'image-tools',
    iconName: 'Ruler',
    colorScheme: 'purple',
    badge: '300 DPI',
    featured: true,
    route: '/inches-to-pixels-photo-resizer'
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images online in seconds with custom width and height.',
    category: 'image-tools',
    iconName: 'Image',
    colorScheme: 'blue',
    badge: 'Popular',
    featured: true,
    route: '/image-resizer'
  },
  {
    id: 'compress-image',
    name: 'Compress Image',
    description: 'Reduce image size easily without losing visual clarity.',
    category: 'image-tools',
    iconName: 'Zap',
    colorScheme: 'pink',
    badge: 'Fast',
    featured: true,
    route: '/compress-image'
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert JPG to PDF instantly with high quality.',
    category: 'pdf-tools',
    iconName: 'FileCheck2',
    colorScheme: 'amber',
    badge: 'Popular',
    featured: true,
    route: '/jpg-to-pdf'
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Convert PDF to JPG for free with exact layout preservation.',
    category: 'pdf-tools',
    iconName: 'FileType2',
    colorScheme: 'emerald',
    badge: 'Free',
    featured: true,
    route: '/pdf-to-jpg'
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one clean document.',
    category: 'pdf-tools',
    iconName: 'Layers',
    colorScheme: 'rose',
    badge: 'Popular',
    featured: true,
    route: '/merge-pdf'
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Split PDF into multiple files or extract individual pages.',
    category: 'pdf-tools',
    iconName: 'Scissors',
    colorScheme: 'sky',
    badge: 'Free',
    featured: true,
    route: '/split-pdf'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate age accurately in years, months, days and seconds.',
    category: 'calculator-tools',
    iconName: 'Calendar',
    colorScheme: 'teal',
    badge: 'Exact',
    featured: true,
    route: '/age-calculator'
  },
  {
    id: 'typing-test',
    name: 'Typing Test',
    description: 'Test & improve your typing speed and accuracy live.',
    category: 'text-tools',
    iconName: 'Keyboard',
    colorScheme: 'indigo',
    badge: 'Interactive',
    featured: true,
    route: '/typing-test'
  },

  // Additional Tools
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    description: 'Count words, characters, sentences and calculate reading time.',
    category: 'text-tools',
    iconName: 'Type',
    colorScheme: 'purple',
    route: '/word-counter'
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to UPPERCASE, lowercase, Title Case, or camelCase.',
    category: 'text-tools',
    iconName: 'FileCode',
    colorScheme: 'blue',
    route: '/case-converter'
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert length, weight, temperature, and speed units instantly.',
    category: 'unit-converter',
    iconName: 'ArrowLeftRight',
    colorScheme: 'pink',
    route: '/unit-converter'
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate high-res QR codes for URLs, text, Wi-Fi and vCards.',
    category: 'other-tools',
    iconName: 'QrCode',
    colorScheme: 'green',
    route: '/qr-generator'
  },
  {
    id: 'meta-tag-generator',
    name: 'SEO Meta Tag Generator',
    description: 'Generate Google, Facebook Open Graph, and Twitter SEO tags.',
    category: 'seo-tools',
    iconName: 'Tags',
    colorScheme: 'amber',
    route: '/meta-tag-generator'
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Beautify, validate, format, and minify JSON data with instant errors.',
    category: 'developer-tools',
    iconName: 'Code',
    colorScheme: 'sky',
    route: '/json-formatter'
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate discounts, markups, tips and percentage changes effortlessly.',
    category: 'calculator-tools',
    iconName: 'Percent',
    colorScheme: 'emerald',
    route: '/percentage-calculator'
  },
  {
    id: 'password-generator',
    name: 'Strong Password Generator',
    description: 'Create ultra-secure, cryptographically random passwords.',
    category: 'other-tools',
    iconName: 'KeyRound',
    colorScheme: 'purple',
    route: '/password-generator'
  },
  {
    id: 'lorem-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Create placeholder dummy text for mockups and UI wireframes.',
    category: 'text-tools',
    iconName: 'FileText',
    colorScheme: 'blue',
    route: '/lorem-generator'
  },
  {
    id: 'base64-converter',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode strings and files to Base64 or decode back to UTF-8.',
    category: 'developer-tools',
    iconName: 'Binary',
    colorScheme: 'sky',
    route: '/base64-converter'
  }
];
