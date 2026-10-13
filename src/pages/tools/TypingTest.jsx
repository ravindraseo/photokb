import React, { useState, useEffect, useRef } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Keyboard, RotateCcw, Award, CheckCircle, Zap, Timer } from 'lucide-react';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog near the riverbank on a sunny summer afternoon. Learning to type accurately and swiftly unlocks true digital productivity for developers and creators alike.",
  "Technology continues to evolve rapidly, transforming how we work, communicate, and solve difficult problems across the globe. Fast and precise keyboard skills remain an invaluable asset in the modern workplace.",
  "Success in software development requires continuous dedication, curiosity, and relentless attention to detail. Every line of code written is an opportunity to craft elegant and robust digital experiences."
];

export default function TypingTest() {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [targetText, setTargetText] = useState(SAMPLE_TEXTS[0]);
  const [userInput, setUserInput] = useState('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTest = () => {
    setIsActive(true);
    setIsFinished(false);
    setTimeLeft(duration);
    setUserInput('');
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (!isActive && !isFinished) {
      setIsActive(true);
    }
    setUserInput(val);

    // Calculate mistakes and accuracy
    let errs = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== targetText[i]) {
        errs++;
      }
    }
    setMistakes(errs);

    const totalTyped = val.length;
    const acc = totalTyped > 0 ? Math.max(0, Math.round(((totalTyped - errs) / totalTyped) * 100)) : 100;
    setAccuracy(acc);

    const timeElapsed = (duration - timeLeft) / 60;
    if (timeElapsed > 0.05) {
      const wordsCount = (totalTyped - errs) / 5;
      const currentWpm = Math.max(0, Math.round(wordsCount / timeElapsed));
      setWpm(currentWpm);
    }

    if (val.length >= targetText.length) {
      setIsActive(false);
      setIsFinished(true);
    }
  };

  const resetTest = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(duration);
    setUserInput('');
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    const nextIdx = (SAMPLE_TEXTS.indexOf(targetText) + 1) % SAMPLE_TEXTS.length;
    setTargetText(SAMPLE_TEXTS[nextIdx]);
  };

  const getRank = (score) => {
    if (score >= 80) return { title: 'Pro Typist 🚀', color: 'text-purple-600', badge: 'Top 5%' };
    if (score >= 60) return { title: 'Fast & Fluent ⚡', color: 'text-blue-600', badge: 'Above Average' };
    if (score >= 40) return { title: 'Solid Typist 👍', color: 'text-emerald-600', badge: 'Average' };
    return { title: 'Developing Typist 🎯', color: 'text-amber-600', badge: 'Practice Daily' };
  };

  const rank = getRank(wpm);

  return (
    <ToolLayout
      title="Online Typing Speed Test"
      subtitle="Test your typing speed and accuracy in Words Per Minute (WPM). Improve muscle memory with real-time feedback and dynamic performance analytics."
      category="Text Tools"
      categorySlug="text-tools"
      currentToolId="typing-test"
      howToSteps={[
        { title: 'Choose Duration', desc: 'Pick between 30-second sprint, standard 60-second test, or 2-minute endurance.' },
        { title: 'Start Typing', desc: 'Click into the typing box and begin typing the prompt paragraph displayed on screen.' },
        { title: 'Monitor Live Metrics', desc: 'See real-time WPM, accuracy percentage, and mistake highlights as you type.' },
        { title: 'Review Results', desc: 'Compare your speed against global standards and repeat to level up.' }
      ]}
      features={[
        { title: 'Live Character Validation', desc: 'Instant visual highlights for every accurate keystroke and typo.' },
        { title: 'Standard WPM Formula', desc: 'Calculates standard 5-keystroke net Words Per Minute.' },
        { title: 'Zero Lag', desc: 'Runs 100% in your browser with zero input stutter.' }
      ]}
      faqs={[
        { question: 'What is an average typing speed?', answer: 'The average typing speed is around 40 WPM. Professional typists, programmers, and transcriptionists often average 65-90+ WPM.' },
        { question: 'How is WPM calculated?', answer: 'WPM is computed as (Total Characters - Typos) / 5 divided by minutes elapsed.' }
      ]}
    >
      <div className="space-y-6">
        {/* Top Controls & Timer Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Test Duration:</span>
            {[30, 60, 120].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => {
                  setDuration(sec);
                  setTimeLeft(sec);
                  resetTest();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  duration === sec
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-slate-700">
              <Timer className="w-5 h-5 text-blue-600" />
              <span className="font-mono text-2xl font-black">{timeLeft}s</span>
            </div>
            <button
              type="button"
              onClick={resetTest}
              className="p-2 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors"
              title="Restart Test"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-center">
            <span className="text-xs font-semibold text-blue-700 uppercase">Speed (WPM)</span>
            <p className="text-3xl font-black text-blue-700 mt-1">{wpm}</p>
          </div>
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-center">
            <span className="text-xs font-semibold text-emerald-700 uppercase">Accuracy</span>
            <p className="text-3xl font-black text-emerald-700 mt-1">{accuracy}%</p>
          </div>
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 text-center">
            <span className="text-xs font-semibold text-rose-700 uppercase">Mistakes</span>
            <p className="text-3xl font-black text-rose-700 mt-1">{mistakes}</p>
          </div>
          <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 text-center">
            <span className="text-xs font-semibold text-purple-700 uppercase">Characters</span>
            <p className="text-3xl font-black text-purple-700 mt-1">{userInput.length}</p>
          </div>
        </div>

        {/* Text Prompt Box */}
        <div className="bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-2xl font-mono text-base sm:text-lg leading-relaxed tracking-wide select-none shadow-inner border border-slate-800">
          {targetText.split('').map((char, index) => {
            let color = 'text-slate-400';
            let bg = '';
            if (index < userInput.length) {
              if (userInput[index] === char) {
                color = 'text-emerald-400 font-bold';
              } else {
                color = 'text-rose-400 font-bold bg-rose-950/60 rounded px-0.5';
              }
            } else if (index === userInput.length) {
              bg = 'border-b-2 border-blue-400 animate-pulse text-white';
            }
            return (
              <span key={index} className={`${color} ${bg}`}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Input Textarea */}
        {!isFinished ? (
          <div>
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              disabled={isFinished}
              placeholder="Click here and start typing the text above..."
              className="w-full h-32 p-4 bg-white border-2 border-blue-300 focus:border-blue-600 rounded-2xl font-mono text-base text-slate-800 focus:outline-none shadow-sm resize-none"
            />
          </div>
        ) : (
          /* Finished Result Modal Card */
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
            <Award className="w-16 h-16 mx-auto text-yellow-300 animate-bounce" />
            <h3 className="text-2xl sm:text-3xl font-black">Test Completed!</h3>
            <p className="text-base text-blue-100">
              You scored <span className="text-2xl font-black text-white">{wpm} WPM</span> with <span className="text-2xl font-black text-white">{accuracy}% accuracy</span>.
            </p>
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-sm font-bold">
              Level: {rank.title} ({rank.badge})
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={resetTest}
                className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 shadow-lg transition-transform active:scale-95"
              >
                Try Again with New Text
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
