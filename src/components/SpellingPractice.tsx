import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { Check, AlertCircle, Sparkles, Volume2, HelpCircle, Delete, RotateCcw, AlertTriangle } from 'lucide-react';

interface SpellingPracticeProps {
  words: Word[];
  selectedWordId?: number | null;
}

export const SpellingPractice: React.FC<SpellingPracticeProps> = ({ words, selectedWordId }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  // Filter study subset strictly for the first 9 words as requested
  const activeWords = words.filter(w => w.id <= 9);

  // Sync when a word is selected from the glossary list (only if it is part of the first 9)
  useEffect(() => {
    if (selectedWordId && selectedWordId <= 9) {
      const idx = activeWords.findIndex(w => w.id === selectedWordId);
      if (idx !== -1) {
        setCurrentIdx(idx);
        setInputValue('');
        setIsChecked(false);
        setIsCorrect(false);
        setShowHint(false);
      }
    }
  }, [selectedWordId, words]);

  const currentWord = activeWords[currentIdx];

  const handleCharClick = (char: string) => {
    if (isChecked) return;
    setInputValue(prev => prev + char);
  };

  const handleBackspace = () => {
    if (isChecked) return;
    setInputValue(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (isChecked) return;
    setInputValue('');
  };

  // Speaks Word using native TTS
  const handleSpeak = (wordToSpeak: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordToSpeak);
      utterance.lang = 'he-IL';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCheck = () => {
    if (isChecked || !inputValue.trim()) return;
    
    // Normalize both strings to compare cleanly (ignoring vowels since writing is usually plain script)
    const normalizedInput = inputValue.trim().replace(/[\u0591-\u05C7]/g, ''); // strip vowels
    const normalizedTarget = currentWord.hebrew.trim().replace(/[\u0591-\u05C7]/g, ''); // strip vowels
    
    const correct = normalizedInput === normalizedTarget;
    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      setStreak(prev => prev + 1);
      if (!completed.includes(currentWord.id)) {
        setCompleted(prev => [...prev, currentWord.id]);
      }
      handleSpeak(currentWord.hebrew);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < activeWords.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0); // circular sequence
    }
    setInputValue('');
    setIsChecked(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  // Hebrew Keyboard layout array matching physical keys structure
  const row1 = ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'];
  const row2 = ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'];
  const row3 = ['ז', 'ס', 'ب', 'ה', 'נ', 'م', 'צ', 'ת', 'ץ']; // Note letter forms. Wait, let's fix standard Hebrew characters:
  // Hebrew letters: ש,ד,ג,כ,ע,י,ח,ל,ך,ף,   ז,ס,ב,ה,נ,م? Oh! 'ب' and 'م' are Arabic letters in some keys.
  // Standard Hebrew: 'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ' (using standard 'מ' and 'ב').
  const coreRow3 = ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4" id="spelling-practice-dashboard">
      <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-md">
        {/* Spelling Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
            الكلمة {currentIdx + 1} من {activeWords.length}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded-full">
              متسلسلة الإتقان: {streak} 🔥
            </span>
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded-full">
              أتممت: {completed.length}/{activeWords.length} 📊
            </span>
          </div>
        </div>

        {/* Target Translation Visual */}
        <div className="text-center p-6 bg-slate-50 border border-slate-100/80 rounded-2xl mb-6">
          <h2 className="text-sm font-semibold text-slate-400 mb-1">اكتب الكلمة العبرية التي تعني:</h2>
          <span className="text-3xl font-extrabold text-indigo-950 font-sans tracking-tight">
            ({currentWord.arabic})
          </span>
        </div>

        {/* Input area */}
        <div className="relative mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => !isChecked && setInputValue(e.target.value)}
            disabled={isChecked}
            dir="rtl"
            placeholder="اكتب الحروف العبرية هنا..."
            className={`w-full text-center text-3xl font-extrabold py-4 px-6 rounded-2xl border-3 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all ${
              isChecked
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 focus:ring-emerald-50'
                  : 'border-rose-500 bg-rose-50 text-rose-950 focus:ring-rose-50'
                : 'border-slate-250 focus:border-indigo-600'
            }`}
          />
          {inputValue && !isChecked && (
            <button
              onClick={handleClear}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
              title="مسح الحقل"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>

        {/* Spelling Feedback details */}
        {isChecked && (
          <div className={`rounded-2xl p-4 mb-6 ${
            isCorrect ? 'bg-emerald-50/70 border border-emerald-100 text-emerald-990' : 'bg-rose-50/70 border border-rose-100 text-rose-990'
          }`}>
            <div className="flex items-center gap-2 mb-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <Check size={18} className="bg-emerald-600 text-white rounded-full p-0.5" />
                  <span>أحسنت! كتابة دقيقة وممتازة 🌟</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} className="text-rose-600 animate-bounce" />
                  <span>تحتاج تركيز أكثر، الحل الصحيح هو:</span>
                </>
              )}
            </div>
            
            <div className="flex flex-col gap-1.5 pl-1">
              <p className="text-lg">
                الكتابة الصحيحة بالعبرية: <span className="font-extrabold text-2xl text-slate-900 underline">{currentWord.hebrew}</span>
              </p>
              <p className="text-xs text-slate-500">
                اللفظ الصوتي: <span className="font-mono text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">/{currentWord.pronunciation}/</span>
              </p>
              
              {/* Prompt Mnemonic Reminder */}
              <div className="bg-white/80 border border-slate-100 rounded-xl p-3 mt-2 text-xs text-slate-800 leading-relaxed font-semibold">
                💡 <span className="text-amber-800 font-bold">تذكار للفظ:</span> {currentWord.mnemonic}
              </div>
            </div>
          </div>
        )}

        {/* Hint Section */}
        {showHint && !isChecked && (
          <div className="bg-amber-50/80 border border-amber-200/50 rounded-2xl p-4 mb-6 text-sm text-amber-900">
            <h3 className="font-bold flex items-center gap-1 mb-1 text-xs md:text-sm">
              <HelpCircle size={15} />
              <span>مساعد الكتابة الذكي:</span>
            </h3>
            <p className="text-xs md:text-sm font-semibold">
              اللفظ الصوتي هو: <strong>/{currentWord.pronunciation}/</strong>
            </p>
            <p className="text-xs md:text-sm font-semibold mt-1">
              يبدأ الحرف الأول بـ: <strong className="text-xl text-indigo-800">"{currentWord.hebrew.charAt(0)}"</strong> ويحتوي الكشف على {currentWord.hebrew.length} أحرف.
            </p>
          </div>
        )}

        {/* virtual Keyboard for Hebrew Characters */}
        {!isChecked && (
          <div className="bg-slate-100/80 rounded-2xl p-4 mb-6 border border-slate-200" dir="ltr">
            <div className="flex justify-between items-center mb-2.5 text-slate-500 font-bold text-xs" dir="rtl">
              <span>لوحة الحروف العبرية الافتراضية ⌨️</span>
              <span className="text-xs text-slate-400 font-medium">انقر لإدخال الحرف</span>
            </div>
            
            {/* Rows list */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-center gap-1.5">
                {row1.map(char => (
                  <button
                    key={char}
                    onClick={() => handleCharClick(char)}
                    className="w-10 h-11 bg-white hover:bg-slate-50 active:scale-90 border border-slate-200/80 rounded-lg text-lg font-bold text-slate-800 shadow-sm flex items-center justify-center transition-all"
                  >
                    {char}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-center gap-1.5">
                {row2.map(char => (
                  <button
                    key={char}
                    onClick={() => handleCharClick(char)}
                    className="w-10 h-11 bg-white hover:bg-slate-50 active:scale-90 border border-slate-200/80 rounded-lg text-lg font-bold text-slate-800 shadow-sm flex items-center justify-center transition-all"
                  >
                    {char}
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-1.5">
                {coreRow3.map(char => (
                  <button
                    key={char}
                    onClick={() => handleCharClick(char)}
                    className="w-10 h-11 bg-white hover:bg-slate-50 active:scale-90 border border-slate-200/80 rounded-lg text-lg font-bold text-slate-800 shadow-sm flex items-center justify-center transition-all"
                  >
                    {char}
                  </button>
                ))}
              </div>

              {/* Backspace & Clear key inside layout */}
              <div className="flex justify-center gap-2 mt-1">
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 active:scale-95 font-bold rounded-lg text-xs transition-all flex items-center gap-1 shadow-sm"
                >
                  <RotateCcw size={13} />
                  <span>مسح</span>
                </button>
                <button
                  onClick={handleBackspace}
                  className="px-6 py-2 bg-slate-300 hover:bg-slate-400 text-slate-800 active:scale-95 font-bold rounded-lg text-xs transition-all flex items-center gap-1 shadow-sm"
                >
                  <Delete size={14} />
                  <span>حذف حرف</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Action buttons */}
        <div className="flex justify-between gap-3 pt-4 border-t border-slate-100">
          {!isChecked ? (
            <>
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-97 py-3 px-5 rounded-xl font-bold text-xs md:text-sm transition-all"
              >
                {showHint ? 'إخفاء التلميح 💡' : 'عرض تلميح ذكي 💡'}
              </button>
              
              <button
                onClick={handleCheck}
                disabled={!inputValue.trim()}
                className={`py-3 px-6 rounded-xl font-bold text-xs md:text-sm transition-all shadow-sm ${
                  inputValue.trim()
                    ? 'bg-slate-900 text-white hover:bg-slate-800 active:scale-97'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                تأكيد الكتابة والتحقق
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleSpeak(currentWord.hebrew)}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-150 py-3 px-5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-1.5 transition-colors"
              >
                <Volume2 size={16} />
                <span>استمع للنطق 🔊</span>
              </button>
              
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white hover:bg-indigo-700 active:scale-97 py-3 px-6 rounded-xl font-bold text-xs md:text-sm flex items-center gap-1 shadow-md transition-all self-end"
              >
                <span>الكلمة التالية</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
