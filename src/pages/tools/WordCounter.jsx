import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Type, Copy, Trash2, Check } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = text.trim() === '' ? 0 : (text.match(/[^.!?]+[.!?]+/g) || []).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter(p => p.trim() !== '').length;
  const readingTime = Math.ceil(words / 200);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Word & Character Counter"
      subtitle="Real-time word counter, character counter, sentence counter, and reading time estimator. Clean formatting with instant statistics."
      category="Text Tools"
      categorySlug="text-tools"
      currentToolId="word-counter"
      howToSteps={[
        { title: 'Paste or Type Content', desc: 'Type directly into the box or paste your article, essay, or tweet.' },
        { title: 'View Live Metrics', desc: 'Instantly inspect words, characters with/without spaces, sentences, and estimated reading time.' }
      ]}
    >
      <div className="space-y-6">
        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Words', val: words, color: 'text-blue-600' },
            { label: 'Characters', val: characters, color: 'text-emerald-600' },
            { label: 'Without Spaces', val: charactersNoSpaces, color: 'text-purple-600' },
            { label: 'Sentences', val: sentences, color: 'text-amber-600' },
            { label: 'Paragraphs', val: paragraphs, color: 'text-rose-600' },
            { label: 'Reading Time', val: `${readingTime} min`, color: 'text-indigo-600' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
              <p className={`text-2xl font-black ${item.color} mt-1`}>{item.val}</p>
            </div>
          ))}
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Type or paste your text here..."
            className="w-full p-5 bg-white border border-slate-300 rounded-2xl text-base text-slate-800 focus:outline-blue-600 shadow-xs"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setText('')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center space-x-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Text</span>
          </button>

          <button
            type="button"
            onClick={copyText}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-blue-500/20"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
