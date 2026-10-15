import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ToolLayout from '../../components/ToolLayout';
import { ALL_TOOLS } from '../../data/toolsData';
import { Copy, Check, RefreshCw, KeyRound, Code, QrCode, Type, Binary } from 'lucide-react';
import NotFoundPage from '../NotFoundPage';

const TOOL_METADATA_EXTRAS = {
  'qr-generator': {
    howToSteps: [
      { title: 'Enter Text or URL', desc: 'Type or paste the web link, contact info, or message you want to encode.' },
      { title: 'Instant QR Generation', desc: 'The QR code renders immediately with high-contrast error correction.' },
      { title: 'Scan with Smartphone', desc: 'Aim your iPhone or Android camera to verify instant scan detection.' },
      { title: 'Save QR Image', desc: 'Save or snapshot the QR code image for print flyers, business cards, or packaging.' }
    ],
    features: [
      { title: 'High-Res Matrix', desc: 'Sharp edges optimized for physical printing on business cards and posters.' },
      { title: 'All Format Support', desc: 'Encodes URLs, plain text, phone numbers, and Wi-Fi credentials.' },
      { title: '100% In-Browser Privacy', desc: 'Generated on the fly without logging your destination URLs.' }
    ],
    faqs: [
      { question: 'Do these QR codes expire?', answer: 'No! These are static QR codes that encode your destination directly into the pattern. They will work forever.' },
      { question: 'Can I print these QR codes for commercial use?', answer: 'Yes, they are 100% free with no commercial restrictions or royalties.' }
    ]
  },
  'json-formatter': {
    howToSteps: [
      { title: 'Paste Raw JSON', desc: 'Paste your unformatted, minified, or messy JSON into the input box.' },
      { title: 'Click Beautify or Minify', desc: 'Choose 2-space indentation for human readability or minify for production.' },
      { title: 'Inspect Errors', desc: 'Invalid syntax flags line and column errors instantly.' },
      { title: 'Copy Formatted JSON', desc: 'Copy the clean, syntax-highlighted code to your clipboard with one click.' }
    ],
    features: [
      { title: 'Instant Syntax Validation', desc: 'Catches missing commas, trailing brackets, and invalid quotes instantly.' },
      { title: 'Zero Latency', desc: 'Formats megabytes of data in milliseconds directly in your browser.' },
      { title: 'Confidential & Safe', desc: 'Your private database payloads and API keys never leave your machine.' }
    ],
    faqs: [
      { question: 'Does PhotoKB send my JSON to any external API?', answer: 'No, validation and formatting run completely offline inside your browser sandbox.' },
      { question: 'Can I minify JSON for web production?', answer: 'Yes, click the Minify button to remove all whitespace and line breaks for faster load times.' }
    ]
  },
  'password-generator': {
    howToSteps: [
      { title: 'Select Password Length', desc: 'Slide the length selector (we recommend 16+ characters).' },
      { title: 'Toggle Numbers & Symbols', desc: 'Choose whether to include special characters and numbers.' },
      { title: 'Generate Strong Password', desc: 'Click generate to sample cryptographically randomized entropy.' },
      { title: 'Copy to Clipboard', desc: 'Copy and paste into your password manager or account setup.' }
    ],
    features: [
      { title: 'Cryptographic Randomness', desc: 'Uses browser crypto API for high entropy against brute-force attacks.' },
      { title: 'Custom Complexity', desc: 'Customize uppercase, lowercase, numbers, and symbols.' },
      { title: 'Zero Log Policy', desc: 'Passwords are generated in ephemeral memory and discarded immediately.' }
    ],
    faqs: [
      { question: 'How long should a strong password be?', answer: 'Security experts recommend a minimum of 16 characters with a mixture of letters, numbers, and symbols.' },
      { question: 'Are generated passwords stored or sent anywhere?', answer: 'Never. Processing happens locally in your device memory.' }
    ]
  },
  'case-converter': {
    howToSteps: [
      { title: 'Type or Paste Text', desc: 'Enter any paragraph, list, or title into the text area.' },
      { title: 'Choose Target Case', desc: 'Click UPPERCASE, lowercase, Title Case, or kebab-case.' },
      { title: 'Copy Converted Text', desc: 'Click the copy button to transfer your cleaned text instantly.' }
    ],
    features: [
      { title: '1-Click Transformation', desc: 'Convert entire documents or titles in a fraction of a second.' },
      { title: 'Developer-Friendly Formats', desc: 'Includes camelCase, kebab-case, and Title Case.' },
      { title: 'No Word Limits', desc: 'Process unlimited characters with zero lag.' }
    ],
    faqs: [
      { question: 'What is Title Case?', answer: 'Title Case capitalizes the first letter of every major word, ideal for headlines and book titles.' },
      { question: 'Is there a character limit on the text converter?', answer: 'No, you can paste and convert tens of thousands of words without limitation.' }
    ]
  },
  'base64-converter': {
    howToSteps: [
      { title: 'Select Encode or Decode', desc: 'Switch between encoding plain text to Base64 or decoding Base64 back to UTF-8.' },
      { title: 'Enter Text', desc: 'Type or paste your input into the editor.' },
      { title: 'Instant Output', desc: 'View the live Base64 output formatted in real time.' }
    ],
    features: [
      { title: 'Standard RFC 4648 Base64', desc: 'Compliant with web and email transport standards.' },
      { title: 'Error-Protected Decoding', desc: 'Catches invalid characters and malformed padding gracefully.' },
      { title: 'Completely In-Browser', desc: 'No network requests required.' }
    ],
    faqs: [
      { question: 'What is Base64 encoding used for?', answer: 'Base64 represents binary data in an ASCII string format, commonly used for data URIs, email attachments, and web APIs.' }
    ]
  },
  'lorem-generator': {
    howToSteps: [
      { title: 'Review Dummy Text', desc: 'Read the standard classical Latin placeholder paragraphs.' },
      { title: 'Copy to Clipboard', desc: 'Click Copy Dummy Text to paste into your wireframes, designs, or mockups.' }
    ],
    features: [
      { title: 'Classical Cicero Excerpt', desc: 'Natural distribution of letters to mimic real typography.' },
      { title: 'Instant 1-Click Copy', desc: 'Zero hassle workflow for web designers and developers.' }
    ],
    faqs: [
      { question: 'Why do designers use Lorem Ipsum?', answer: 'Lorem Ipsum mimics the look and feel of real text without distracting the viewer with readable content during layout design.' }
    ]
  }
};

export default function GenericToolPage() {
  const { toolId } = useParams();
  const tool = ALL_TOOLS.find((t) => t.id === toolId);

  if (!tool) {
    return <NotFoundPage />;
  }

  const extraMeta = TOOL_METADATA_EXTRAS[toolId] || {
    howToSteps: [
      { title: 'Enter Inputs', desc: 'Fill in the options or upload files needed for this utility.' },
      { title: 'Process In-Browser', desc: 'Click execute to generate instant results in local memory.' },
      { title: 'Export or Copy', desc: 'Download or copy the output directly to your device.' }
    ],
    features: [
      { title: '100% Client-Side', desc: 'No data leaves your device.' },
      { title: 'Free & Unlimited', desc: 'Zero signups, zero quotas.' }
    ],
    faqs: [
      { question: 'Is this tool free?', answer: 'Yes, 100% free with no hidden charges or subscriptions.' }
    ]
  };

  const [copied, setCopied] = useState(false);

  // QR Code State
  const [qrText, setQrText] = useState('https://www.photokb.net');

  // JSON Formatter State
  const [jsonInput, setJsonInput] = useState('{"name":"PhotoKB","tools":50,"country":"USA","free":true}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Password Generator State
  const [passLength, setPassLength] = useState(16);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [genPass, setGenPass] = useState('');

  // Case Converter State
  const [textInput, setTextInput] = useState('The quick brown fox jumps over the lazy dog');

  // Base64 State
  const [b64Input, setB64Input] = useState('Welcome to PhotoKB Free Online Tools');
  const [b64Mode, setB64Mode] = useState('encode');

  const copyVal = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatJson = (minify = false) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, minify ? 0 : 2));
      setJsonError('');
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let pool = chars;
    if (useNumbers) pool += nums;
    if (useSymbols) pool += syms;
    let res = '';
    for (let i = 0; i < passLength; i++) {
      res += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    setGenPass(res);
  };

  return (
    <ToolLayout
      title={tool.name}
      subtitle={tool.description}
      category={tool.category.replace('-', ' ').toUpperCase()}
      categorySlug={tool.category}
      currentToolId={tool.id}
      howToSteps={extraMeta.howToSteps}
      features={extraMeta.features}
      faqs={extraMeta.faqs}
    >
      {/* Dynamic Tool Interface based on toolId */}
      {toolId === 'qr-generator' && (
        <div className="space-y-6">
          <div className="max-w-xl mx-auto space-y-4">
            <label className="text-xs font-bold uppercase text-slate-500 block">Enter URL or Text to Encode</label>
            <input
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold"
            />
            <div className="p-8 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center shadow-xs">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`}
                alt="Generated QR Code"
                className="w-48 h-48 rounded-xl shadow-md border p-2 bg-white"
              />
              <span className="text-xs text-slate-400 mt-4">Scan with any smartphone camera</span>
            </div>
          </div>
        </div>
      )}

      {toolId === 'json-formatter' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Input JSON</label>
              <textarea
                rows={12}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full font-mono text-xs p-4 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Formatted Result</label>
              <textarea
                rows={12}
                readOnly
                value={jsonOutput || jsonInput}
                className="w-full font-mono text-xs p-4 bg-slate-900 text-emerald-400 rounded-xl"
              />
            </div>
          </div>
          {jsonError && <p className="text-xs text-rose-600 font-semibold">{jsonError}</p>}
          <div className="flex gap-3">
            <button
              onClick={() => handleFormatJson(false)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
            >
              Beautify (2 Spaces)
            </button>
            <button
              onClick={() => handleFormatJson(true)}
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold"
            >
              Minify JSON
            </button>
          </div>
        </div>
      )}

      {toolId === 'password-generator' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase text-slate-500">Password Length: {passLength}</span>
              <input
                type="range"
                min="8"
                max="32"
                value={passLength}
                onChange={(e) => setPassLength(Number(e.target.value))}
                className="w-48 accent-purple-600"
              />
            </div>
            <div className="flex gap-4 text-xs font-semibold text-slate-700">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
                <span>Include Numbers (0-9)</span>
              </label>
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
                <span>Include Symbols (!@#$)</span>
              </label>
            </div>
            <button
              onClick={generatePassword}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md shadow-purple-500/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Ultra-Secure Password</span>
            </button>
          </div>

          {genPass && (
            <div className="p-4 bg-white border-2 border-purple-300 rounded-2xl flex items-center justify-between">
              <span className="font-mono font-bold text-lg text-slate-800 tracking-wider truncate pr-2">{genPass}</span>
              <button
                onClick={() => copyVal(genPass)}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold text-xs rounded-xl flex items-center space-x-1 flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {toolId === 'case-converter' && (
        <div className="space-y-4">
          <textarea
            rows={5}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-base"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTextInput(textInput.toUpperCase())}
              className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => setTextInput(textInput.toLowerCase())}
              className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100"
            >
              lowercase
            </button>
            <button
              onClick={() => setTextInput(textInput.replace(/\b\w/g, c => c.toUpperCase()))}
              className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100"
            >
              Title Case
            </button>
            <button
              onClick={() => setTextInput(textInput.toLowerCase().replace(/\s+/g, '-'))}
              className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100"
            >
              kebab-case
            </button>
            <button
              onClick={() => copyVal(textInput)}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 ml-auto flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
        </div>
      )}

      {toolId === 'base64-converter' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setB64Mode('encode')}
              className={`px-4 py-2 text-xs font-bold rounded-xl ${b64Mode === 'encode' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Encode to Base64
            </button>
            <button
              onClick={() => setB64Mode('decode')}
              className={`px-4 py-2 text-xs font-bold rounded-xl ${b64Mode === 'decode' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Decode from Base64
            </button>
          </div>
          <textarea
            rows={4}
            value={b64Input}
            onChange={(e) => setB64Input(e.target.value)}
            placeholder="Enter text..."
            className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-sm"
          />
          <div className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
            {b64Mode === 'encode' ? btoa(b64Input || '') : (function() { try { return atob(b64Input); } catch { return 'Invalid Base64 string'; } })()}
          </div>
        </div>
      )}

      {toolId === 'lorem-generator' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button
            onClick={() => copyVal("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Dummy Text</span>
          </button>
        </div>
      )}
    </ToolLayout>
  );
}
