import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { ArrowLeftRight, Check, Copy } from 'lucide-react';

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [valFrom, setValFrom] = useState(1);
  const [unitFrom, setUnitFrom] = useState('meter');
  const [unitTo, setUnitTo] = useState('foot');

  const conversions = {
    length: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.34,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254
    },
    weight: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      pound: 0.453592,
      ounce: 0.0283495,
      ton: 1000
    },
    speed: {
      mps: 1, // meters per sec
      kph: 0.277778, // km/h
      mph: 0.44704, // miles per hour
      knot: 0.514444
    }
  };

  const getConvertedValue = () => {
    const table = conversions[category];
    if (!table || !table[unitFrom] || !table[unitTo]) return 0;
    const baseValue = Number(valFrom) * table[unitFrom];
    const targetValue = baseValue / table[unitTo];
    return parseFloat(targetValue.toFixed(6));
  };

  const result = getConvertedValue();

  return (
    <ToolLayout
      title="Universal Unit Converter"
      subtitle="Convert length, weight, and speed units instantly with high precision. Standard US and Metric systems supported."
      category="Unit Converter"
      categorySlug="unit-converter"
      currentToolId="unit-converter"
    >
      <div className="space-y-6">
        {/* Category selector */}
        <div className="flex space-x-2 border-b border-slate-200 pb-3">
          {['length', 'weight', 'speed'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                const keys = Object.keys(conversions[cat]);
                setUnitFrom(keys[0]);
                setUnitTo(keys[1] || keys[0]);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                category === cat ? 'bg-pink-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">From</label>
            <input
              type="number"
              value={valFrom}
              onChange={(e) => setValFrom(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-lg font-bold text-slate-800 mb-3"
            />
            <select
              value={unitFrom}
              onChange={(e) => setUnitFrom(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold uppercase"
            >
              {Object.keys(conversions[category]).map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">To</label>
            <div className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-lg font-black text-pink-600 mb-3 overflow-hidden text-ellipsis">
              {result}
            </div>
            <select
              value={unitTo}
              onChange={(e) => setUnitTo(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold uppercase"
            >
              {Object.keys(conversions[category]).map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-100 text-sm font-semibold text-pink-800">
          {valFrom} {unitFrom} = <span className="font-bold underline">{result} {unitTo}</span>
        </div>
      </div>
    </ToolLayout>
  );
}
