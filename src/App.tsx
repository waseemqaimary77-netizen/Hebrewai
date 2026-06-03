import { useState } from 'react';
import { HebrewWords } from './data';
import { MultipleChoiceQuiz } from './components/MultipleChoiceQuiz';
import { SpellingPractice } from './components/SpellingPractice';
import { WordList } from './components/WordList';
import { Bookmark, HelpCircle, Award, Brain } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'spelling' | 'list'>('quiz');
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);

  const handleSelectWord = (id: number) => {
    setSelectedWordId(id);
    setActiveTab('spelling');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 selection:bg-indigo-500 selection:text-white" dir="rtl">
      {/* Decorative Top Accent Bar */}
      <div className="h-2 bg-gradient-to-r from-amber-400 via-indigo-600 to-emerald-500" />

      {/* Hero Welcome banner */}
      <header className="bg-white border-b border-slate-200 py-6 px-4 mb-8 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-650 rounded-2xl flex items-center justify-center border border-indigo-250 shrink-0">
              <Brain size={28} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>لعبة الذكاء الاصطناعي لحفظ العبرية 🎓</span>
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-semibold mt-0.5">
                تعلم وحفظ وفهم 29 كلمة عبرية بسرعة البرق مع قصص مضحكة ورسوم كرتونية AI!
              </p>
            </div>
          </div>

          {/* Core Master Progress indicators */}
          <div className="bg-indigo-50/70 border border-indigo-100/50 rounded-2xl p-3 flex items-center gap-4 text-xs font-semibold">
            <div className="text-center">
              <span className="block text-lg font-black text-indigo-700 font-mono">29</span>
              <span className="text-slate-500">مجموع الكلمات</span>
            </div>
            <div className="w-px h-8 bg-indigo-200/60" />
            <div className="text-center">
              <span className="block text-lg font-black text-amber-700 font-mono">9</span>
              <span className="text-amber-800 flex items-center gap-0.5">🌟 أساسية</span>
            </div>
            <div className="w-px h-8 bg-indigo-200/60" />
            <div className="text-center">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                نشط الآن
              </span>
              <span className="block text-slate-400 font-mono mt-0.5">دراسة سريعة</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        {/* Play/Study Modes Selector Tabs Bar */}
        <div className="flex justify-center mb-8 border-b border-slate-200">
          <div className="grid grid-cols-3 w-full max-w-xl bg-slate-200/60 p-1 rounded-2xl border border-slate-200/30">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-3 rounded-xl font-extrabold text-xs md:text-sm flex flex-col md:flex-row items-center justify-center gap-1.5 transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/20'
              }`}
            >
              <HelpCircle size={16} />
              <span>ضع دائرة</span>
            </button>

            <button
              onClick={() => setActiveTab('spelling')}
              className={`py-3 rounded-xl font-extrabold text-xs md:text-sm flex flex-col md:flex-row items-center justify-center gap-1.5 transition-all ${
                activeTab === 'spelling'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/20'
              }`}
            >
              <Award size={16} />
              <span>اختبر كتابتك ✍️</span>
            </button>

            <button
              onClick={() => setActiveTab('list')}
              className={`py-3 rounded-xl font-extrabold text-xs md:text-sm flex flex-col md:flex-row items-center justify-center gap-1.5 transition-all ${
                activeTab === 'list'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/20'
              }`}
            >
              <Bookmark size={15} />
              <span>معجم الكلمات</span>
            </button>
          </div>
        </div>

        {/* Dynamic Workspace Container rendering corresponding tab */}
        <div className="animate-fade-in">
          {activeTab === 'quiz' && (
            <div>
              <div className="max-w-2xl mx-auto text-center mb-4 text-xs md:text-sm font-semibold text-slate-500">
                اختبار الذكاء التفاعلي يساعدك على المطابقة السريعة وحفظ شكل وطبيعة الكلمات العبرية:
              </div>
              <MultipleChoiceQuiz words={HebrewWords} />
            </div>
          )}

          {activeTab === 'spelling' && (
            <div>
              <div className="max-w-2xl mx-auto text-center mb-4 text-xs md:text-sm font-semibold text-slate-500 bg-amber-50/50 border border-amber-200/50 rounded-2xl p-3">
                🎯 خصصنا هذا القسم لمساعدتك على إتقان طريقة كتابة الكلمات العبرية الأساسية الـ 9 حرفاً بحرف مزوداً بلوحة مفاتيح عبرية متكاملة!
              </div>
              <SpellingPractice words={HebrewWords} selectedWordId={selectedWordId} />
            </div>
          )}

          {activeTab === 'list' && (
            <div>
              <div className="max-w-4xl mx-auto text-center mb-6 text-sm text-slate-500 bg-indigo-50/50 border border-indigo-200/30 rounded-2xl p-3">
                قائمة المعجم الكاملة للـ 29 كلمة، يمكنك الاستماع لنطق الكلمات، أو النقر على أي من الكلمات الأساسية الـ 9 للذهاب مباشرة إلى وضع الكتابة والتدرب عليها!
              </div>
              <WordList words={HebrewWords} onWordSelect={handleSelectWord} />
            </div>
          )}
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
        <p>مصمم بعناية فائقة لمساعدتك على إتقان العبرية بسرعة باستخدام تقنيات الربط المكتسب والذكاء البصري 🧠🎨</p>
        <p className="mt-1">جميع الروابط والوسائط تعمل بشكل كامل وآمن 100%.</p>
      </footer>
    </div>
  );
}
