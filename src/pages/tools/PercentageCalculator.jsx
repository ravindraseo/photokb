import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Percent, ArrowRight } from 'lucide-react';

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [p1, setP1] = useState(15);
  const [total1, setTotal1] = useState(200);

  // Mode 2: X is what percentage of Y?
  const [num2, setNum2] = useState(25);
  const [total2, setTotal2] = useState(100);

  // Mode 3: Percentage increase/decrease from X to Y
  const [from3, setFrom3] = useState(50);
  const [to3, setTo3] = useState(75);

  const res1 = (p1 / 100) * total1;
  const res2 = total2 !== 0 ? ((num2 / total2) * 100).toFixed(2) : 0;
  const diff3 = to3 - from3;
  const res3 = from3 !== 0 ? ((diff3 / from3) * 100).toFixed(2) : 0;

  return (
    <ToolLayout
      title="Percentage Calculator"
      subtitle="Quickly compute percentages, markups, discounts, tips, and percentage changes between values."
      category="Calculator Tools"
      categorySlug="calculator-tools"
      currentToolId="percentage-calculator"
    >
      <div className="space-y-6">
        {/* Calc 1 */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
            <span>What is</span>
            <input
              type="number"
              value={p1}
              onChange={(e) => setP1(Number(e.target.value))}
              className="w-20 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold"
            />
            <span>% of</span>
            <input
              type="number"
              value={total1}
              onChange={(e) => setTotal1(Number(e.target.value))}
              className="w-24 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold"
            />
            <span>?</span>
          </div>
          <div className="text-xl font-black text-emerald-600 bg-white px-5 py-2 rounded-xl border border-emerald-200 shadow-xs">
            = {res1}
          </div>
        </div>

        {/* Calc 2 */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(Number(e.target.value))}
              className="w-20 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold"
            />
            <span>is what percent of</span>
            <input
              type="number"
              value={total2}
              onChange={(e) => setTotal2(Number(e.target.value))}
              className="w-24 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold"
            />
            <span>?</span>
          </div>
          <div className="text-xl font-black text-blue-600 bg-white px-5 py-2 rounded-xl border border-blue-200 shadow-xs">
            = {res2}%
          </div>
        </div>

        {/* Calc 3 */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
            <span>Percentage change from</span>
            <input
              type="number"
              value={from3}
              onChange={(e) => setFrom3(Number(e.target.value))}
              className="w-20 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold"
            />
            <span>to</span>
            <input
              type="number"
              value={to3}
              onChange={(e) => setTo3(Number(e.target.value))}
              className="w-24 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold"
            />
            <span>?</span>
          </div>
          <div className={`text-xl font-black bg-white px-5 py-2 rounded-xl border shadow-xs ${res3 >= 0 ? 'text-emerald-600 border-emerald-200' : 'text-rose-600 border-rose-200'}`}>
            = {res3 >= 0 ? `+${res3}%` : `${res3}%`}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
