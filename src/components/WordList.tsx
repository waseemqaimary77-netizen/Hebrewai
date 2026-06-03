import React, { useState } from 'react';
import { Word } from '../types';
import { Play, Volume2, Sparkles, Filter, CheckCircle } from 'lucide-react';

interface WordListProps {
  words: Word[];
  onWordSelect: (id: number) => void;
}

export const WordList: React.FC<WordListProps> = ({ words, onWordSelect }) => {
  const [filterType, setFilterType] = useState<'all' | 'first9' | 'transport' | 'clothing' | 'people'>('all');

  // Filter list
  const filteredWords = words.filter(word => {
    switch (filterType) {
      case 'first9':
        return word.id <= 9;
      case 'transport':
        return word.category === 'الشارع والمواصلات';
      case 'clothing':
        return word.category === 'الملابس';
      case 'people':
        return word.category === 'حالات وأشخاص';
      default:
        return true;
    }
  });

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation(); // Avoid triggering card selection
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'he-IL';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4" id="vocabulary-study-list">
      {/* Filtering Pills Row */}
      <div className="flex flex-wrap items-center gap-2 mb-6 bg-slate-100 rounded-2xl p-2 border border-slate-200/50">
        <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
          <Filter size={14} />
          <span>تصفية المعاني:</span>
        </span>
        <button
          onClick={() => setFilterType('all')}
          className={`py-1.5 px-3.5 rounded-xl font-bold text-xs transition-all ${
            filterType === 'all' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          الكل (29)
        </button>
        <button
          onClick={() => setFilterType('first9')}
          className={`py-1.5 px-3.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 ${
            filterType === 'first9' 
              ? 'bg-amber-500 text-white shadow-sm' 
              : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50/50'
          }`}
        >
          ⭐ الأساسية الـ 9
        </button>
        <button
          onClick={() => setFilterType('transport')}
          className={`py-1.5 px-3.5 rounded-xl font-bold text-xs transition-all ${
            filterType === 'transport' 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-indigo-900 hover:bg-indigo-50/50'
          }`}
        >
          الشارع والمواصلات
        </button>
        <button
          onClick={() => setFilterType('clothing')}
          className={`py-1.5 px-3.5 rounded-xl font-bold text-xs transition-all ${
            filterType === 'clothing' 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-indigo-900 hover:bg-indigo-50/50'
          }`}
        >
          الملابس والزي
        </button>
        <button
          onClick={() => setFilterType('people')}
          className={`py-1.5 px-3.5 rounded-xl font-bold text-xs transition-all ${
            filterType === 'people' 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-indigo-900 hover:bg-indigo-50/50'
          }`}
        >
          حالات وأشخاص
        </button>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.map(word => (
          <div
            key={word.id}
            onClick={() => word.id <= 9 && onWordSelect(word.id)}
            className={`rounded-2xl border p-4 transition-all duration-300 bg-white border-slate-180 flex flex-col justify-between min-h-[140px] group relative ${
              word.id <= 9 
                ? 'cursor-pointer hover:shadow-md hover:border-indigo-200' 
                : 'cursor-default border-slate-150'
            }`}
          >
            {/* Word Index Indicator */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-slate-400 text-xs font-semibold">
                #{word.id}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                word.id <= 9 
                  ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {word.id <= 9 ? '⭐ أساسية' : 'توسعة'}
              </span>
            </div>

            {/* Main Word Presentation */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={(e) => handleSpeak(e, word.hebrew)}
                  className="p-1 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  title="استماع للنطق"
                >
                  <Volume2 size={15} />
                </button>
                <h3 className="text-2xl font-extrabold text-slate-900 select-none">
                  {word.hebrew}
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-mono tracking-wide mt-0.5">
                /{word.pronunciation}/
              </p>
            </div>

            {/* Translation description row */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400 capitalize bg-slate-50 px-2 py-1 rounded">
                {word.category}
              </span>
              <span className="text-indigo-900 font-bold ml-1">
                {word.arabic}
              </span>
            </div>
            
            {/* Hover visual aid indicator */}
            {word.id <= 9 && (
              <span className="absolute top-1.5 left-1.5 text-xs text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                تدرب ✍️
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
