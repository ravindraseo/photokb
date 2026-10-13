import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Calendar, Clock, Sparkles, Award, Star, Heart } from 'lucide-react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateAgeDetails = () => {
    if (!birthDate) return null;
    const bDate = new Date(birthDate);
    const tDate = new Date(targetDate);

    if (isNaN(bDate.getTime()) || isNaN(tDate.getTime())) return null;
    if (tDate < bDate) return { error: 'Target date must be after birth date' };

    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = Math.abs(tDate.getTime() - bDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Next birthday calculation
    const currentYear = tDate.getFullYear();
    let nextBday = new Date(currentYear, bDate.getMonth(), bDate.getDate());
    if (nextBday < tDate) {
      nextBday = new Date(currentYear + 1, bDate.getMonth(), bDate.getDate());
    }
    const daysUntilNextBday = Math.ceil((nextBday.getTime() - tDate.getTime()) / (1000 * 60 * 60 * 24));
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextBdayDayName = dayNames[nextBday.getDay()];

    // Western Zodiac
    const getZodiac = (month, day) => {
      const dates = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
      const signs = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
      return day < dates[month] ? signs[month] : signs[month + 1];
    };
    const zodiac = getZodiac(bDate.getMonth(), bDate.getDate());

    // Chinese Zodiac
    const chineseZodiacs = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    const chineseZodiac = chineseZodiacs[(bDate.getFullYear() - 4) % 12];

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysUntilNextBday,
      nextBdayDayName,
      zodiac,
      chineseZodiac
    };
  };

  const results = calculateAgeDetails();

  return (
    <ToolLayout
      title="Exact Age Calculator"
      subtitle="Calculate your precise age in years, months, weeks, days, hours, and minutes. Discover your upcoming birthday countdown and astrological signs."
      category="Calculator Tools"
      categorySlug="calculator-tools"
      currentToolId="age-calculator"
      howToSteps={[
        { title: 'Select Date of Birth', desc: 'Pick your exact birth date using the calendar picker.' },
        { title: 'Choose Target Date', desc: 'Defaults to today, or pick any past/future reference date.' },
        { title: 'View Comprehensive Breakdown', desc: 'Inspect exact chronological years, months, and total elapsed units.' }
      ]}
      features={[
        { title: 'To-The-Second Precision', desc: 'Accounts for leap years and exact calendar month day variances.' },
        { title: 'Upcoming Birthday Radar', desc: 'Counts down days and reveals the exact day of the week for your next birthday.' },
        { title: 'Astrological Profiles', desc: 'Includes Western Sun Sign and Chinese Lunar Zodiac animal.' }
      ]}
      faqs={[
        { question: 'Does this handle leap years correctly?', answer: 'Yes! The calculator accounts for leap years (e.g. February 29th) with full calendar astronomical precision.' },
        { question: 'Can I calculate age at a future date?', answer: 'Absolutely. Simply change the "Age at the Date of" field to any date in the future.' }
      ]}
    >
      <div className="space-y-8">
        {/* Date Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 focus:outline-blue-600 shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Age at the Date of
            </label>
            <div className="relative">
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-base font-semibold text-slate-800 focus:outline-blue-600 shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Results Showcase */}
        {results && !results.error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Big Primary Age Box */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-8 text-white shadow-xl shadow-teal-500/20 text-center relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold block mb-2">
                  Chronological Age
                </span>
                <div className="text-4xl sm:text-6xl font-black tracking-tight flex flex-wrap items-center justify-center gap-3">
                  <span>{results.years} <span className="text-xl sm:text-2xl font-light text-emerald-100">years</span></span>
                  <span>{results.months} <span className="text-xl sm:text-2xl font-light text-emerald-100">months</span></span>
                  <span>{results.days} <span className="text-xl sm:text-2xl font-light text-emerald-100">days</span></span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 mt-4">
                  Born on {new Date(birthDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Next Birthday & Astrological Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Next Birthday</div>
                  <div className="text-lg font-bold text-slate-800">In {results.daysUntilNextBday} days</div>
                  <div className="text-[11px] text-slate-400">Falls on a {results.nextBdayDayName}</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Sun Zodiac Sign</div>
                  <div className="text-lg font-bold text-slate-800">{results.zodiac}</div>
                  <div className="text-[11px] text-slate-400">Western Astrological Sign</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold">Chinese Zodiac</div>
                  <div className="text-lg font-bold text-slate-800">Year of the {results.chineseZodiac}</div>
                  <div className="text-[11px] text-slate-400">Eastern Lunar Calendar</div>
                </div>
              </div>
            </div>

            {/* Total Units Breakdown */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider text-slate-500">
                Lifetime Elapsed Units
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Total Months', val: results.totalMonths.toLocaleString() },
                  { label: 'Total Weeks', val: results.totalWeeks.toLocaleString() },
                  { label: 'Total Days', val: results.totalDays.toLocaleString() },
                  { label: 'Total Hours', val: results.totalHours.toLocaleString() },
                  { label: 'Total Minutes', val: results.totalMinutes.toLocaleString() },
                  { label: 'Total Seconds', val: results.totalSeconds.toLocaleString() }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 text-center shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">{item.label}</span>
                    <span className="text-base font-black text-slate-800 mt-1 block truncate" title={item.val}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {results?.error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-semibold">
            {results.error}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
