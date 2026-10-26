'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqAccordion({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about photo compression, dimensions, and government portal guidelines.'
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <HelpCircle className="h-3.5 w-3.5" />
            Got Questions?
          </div>
          {title && (
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl dark:text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="mx-auto mt-5 max-w-3xl space-y-2.5">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between p-4 text-left text-sm font-bold text-slate-900 transition-colors hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`ml-4 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-4 pt-2.5 pb-4 text-xs sm:text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
