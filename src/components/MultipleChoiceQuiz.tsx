import React, { useState, useEffect, useRef } from 'react';
import { Word, QuizQuestion } from '../types';
import { CheckCircle2, XCircle, RefreshCw, Award, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface MultipleChoiceQuizProps {
  words: Word[];
}

export const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ words }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredHistory, setAnsweredHistory] = useState<{ question: QuizQuestion; chosen: string; isCorrect: boolean }[]>([]);
  const timeoutRef = useRef<any>(null);

  // Always use all words for the quiz to avoid distinguishing between primary and secondary
  const activeWords = words;

  // Generate dynamic questions on initial load or reset
  const generateQuiz = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const quizLength = Math.min(activeWords.length, 10);
    const shuffledWords = [...activeWords].sort(() => 0.5 - Math.random());
    const selectedWordsForQuiz = shuffledWords.slice(0, quizLength);

    const generated: QuizQuestion[] = selectedWordsForQuiz.map((word, index) => {
      // 50% Hebrew -> Arabic, 50% Arabic -> Hebrew
      const isHebrewToArabic = Math.random() > 0.5;
      const questionId = `q-${index}`;
      
      let questionText = '';
      let correctAnswer = '';
      let options: string[] = [];

      if (isHebrewToArabic) {
        questionText = `ما هو معنى الكلمة العبرية "${word.hebrewWithVowels}" (${word.pronunciation})؟`;
        correctAnswer = word.arabic;
        
        // Choose distractors from other words in the main dataset
        const distractors = words
          .filter(w => w.id !== word.id)
          .map(w => w.arabic)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        
        options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
      } else {
        questionText = `أي الكلمات العبرية التالية تعني بالعربية "${word.arabic}"؟`;
        correctAnswer = `${word.hebrewWithVowels} (${word.pronunciation})`;
        
        const distractors = words
          .filter(w => w.id !== word.id)
          .map(w => `${w.hebrewWithVowels} (${w.pronunciation})`)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
          
        options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
      }

      return {
        id: questionId,
        wordId: word.id,
        word,
        questionType: 'multiple-choice',
        questionText,
        options,
        correctAnswer
      };
    });

    setQuestions(generated);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setAnsweredHistory([]);
  };

  useEffect(() => {
    generateQuiz();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleOptionClick = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(option);

    const currentQ = questions[currentIdx];
    const isCorrect = option === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      // Auto-advance to next question after 1.2 seconds for fluid answering speed
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, 1200);
    }

    setAnsweredHistory(prev => [
      ...prev,
      {
        question: currentQ,
        chosen: option,
        isCorrect
      }
    ]);

    setIsSubmitted(true);
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <RefreshCw className="animate-spin text-slate-400 mb-2" />
        <p>جاري تحضير أسئلة الاختبار التفاعلي...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4" id="multiple-choice-practice-dashboard">
      {!quizFinished ? (
        <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-md" id={`interactive-question-${currentIdx}`}>
          {/* Question Indicator */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
              السؤال {currentIdx + 1} من {questions.length}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              النقاط: {score}
            </span>
          </div>

          {/* Question Text card */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-extrabold text-slate-900 text-right leading-relaxed mb-1">
              {currentQuestion.questionText}
            </h2>
            <p className="text-xs text-slate-400 font-medium">اختر البديل الصحيح لحفظ المعنى فورياً:</p>
          </div>

          {/* Options grid panel */}
          <div className="grid grid-cols-1 gap-3.5 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOpt = option === currentQuestion.correctAnswer;
              
              let btnClass = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 text-slate-800 bg-white';
              let badgeElement = null;

              if (isSubmitted) {
                if (isCorrectOpt) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold shadow-sm';
                  badgeElement = <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />;
                } else if (isSelected) {
                  btnClass = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold';
                  badgeElement = <XCircle size={18} className="text-rose-600 shrink-0" />;
                } else {
                  btnClass = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnClass = 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold ring-2 ring-indigo-600/20 shadow-sm';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={isSubmitted}
                  className={`w-full text-right p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 text-sm md:text-base ${btnClass}`}
                >
                  <span className="font-semibold">{option}</span>
                  {badgeElement}
                </button>
              );
            })}
          </div>

          {/* Pedagogy helper - reveal mnemonic story if submitted, especially if wrong! */}
          {isSubmitted && (
            <div className="bg-amber-50/70 border border-amber-200/50 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-bold text-xs md:text-sm">
                <Sparkles size={16} className="text-amber-500 animate-bounce" />
                <span>شاحن الذاكرة البصري 🔋 {selectedAnswer === currentQuestion.correctAnswer ? 'إجابة متميزة!' : 'تلميح تذكاري مفيد:'}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-semibold">
                قرين اللفظ: <span className="text-indigo-700 underline font-extrabold">{currentQuestion.word.hebrew}</span> يُنطق كـ <span className="font-mono text-xs bg-slate-200/50 px-1 py-0.5 rounded">/{currentQuestion.word.pronunciation}/</span>. 
                <br />
                {currentQuestion.word.mnemonic}
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="flex justify-between items-center gap-3 pt-4 border-t border-slate-100">
            <div>
              {isSubmitted && selectedAnswer === currentQuestion.correctAnswer && (
                <span className="text-emerald-600 font-bold text-sm animate-pulse flex items-center gap-1">
                  ✓ رائعة! إجابة صحيحة، جاري الانتقال تلقائياً...
                </span>
              )}
              {!isSubmitted && (
                <span className="text-slate-400 text-xs font-semibold">
                  اختر الإجابة للتحقق والانتقال تلقائياً ⚡
                </span>
              )}
            </div>
            {isSubmitted && (
              <button
                onClick={handleNext}
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-97 text-white py-2.5 px-6 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all animate-fade-in"
              >
                <span>السؤال التالي</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary Area */
        <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-8 shadow-lg text-center" id="quiz-final-grading-board">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <Award size={36} />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">تهانينا! أكملت الاختبار بنجاح 🎉</h2>
          <p className="text-sm text-slate-500 mb-6">لقد أحرزت تقدماً عظيماً في ربط اللفظ العبري بالمعنى العربي!</p>

          {/* Grid score indicators */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
            <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
              <span className="block text-3xl font-extrabold text-indigo-700">{score}</span>
              <span className="text-xs text-indigo-900 font-semibold">الإجابات الصحيحة</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
              <span className="block text-3xl font-extrabold text-slate-700">
                {Math.round((score / questions.length) * 100)}%
              </span>
              <span className="text-xs text-slate-500 font-semibold">معدل الإتقان بالفوركس</span>
            </div>
          </div>

          {/* Retry buttons panel */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-6 border-t border-slate-150">
            <button
              onClick={generateQuiz}
              className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <RefreshCw size={15} />
              <span>إعادة الاختبار بنماذج عشوائية 🔄</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
