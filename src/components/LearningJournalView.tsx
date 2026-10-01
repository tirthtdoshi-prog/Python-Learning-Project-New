import React, { useState } from 'react';
import {
  BookOpen,
  Edit3,
  Bookmark,
  Plus,
  Trash2,
  Sparkles,
  Calendar,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface JournalEntry {
  id: string;
  title: string;
  topic: string;
  content: string;
  date: string;
}

export const LearningJournalView: React.FC = () => {
  const { setActiveView, showToast } = useAcademy();

  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 'entry-1',
      title: 'Mastering List Comprehensions',
      topic: 'Level 10: Lists',
      content:
        'List comprehensions in Python offer a clean one-liner syntax: `[x**2 for x in range(10) if x % 2 == 0]`. Much faster and cleaner than writing standard for loops with `.append()`.',
      date: 'September 28, 2026',
    },
    {
      id: 'entry-2',
      title: 'Why Tuple Immutability Matters',
      topic: 'Level 11: Tuples',
      content:
        'Tuples can be used as dictionary keys because they are immutable and hashable. Lists cannot be used as dict keys because their contents can mutate.',
      date: 'September 29, 2026',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('Level 1: Python Introduction');
  const [newContent, setNewContent] = useState('');

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      title: newTitle.trim(),
      topic: newTopic,
      content: newContent.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setEntries([newEntry, ...entries]);
    setNewTitle('');
    setNewContent('');
    showToast('Journal reflection saved!');
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    showToast('Entry removed from journal.');
  };

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-50 via-white to-sky-50 border border-amber-200/80 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-amber-800 border border-amber-200 mb-2 shadow-2xs">
            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
            <span>Personal Notebook & Reflections</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#333333]">
            Personal Learning Journal
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#4F6FAF]">
            Capture personal study notes, write code takeaways, reflect on chapter breakthroughs, and bookmark topics.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveView('dashboard')}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 cursor-pointer"
        >
          ← Back to Learning Hub
        </button>
      </div>

      {/* 2. New Journal Entry Composer */}
      <form
        onSubmit={handleSaveEntry}
        className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4"
      >
        <h3 className="font-extrabold text-sm text-[#333333] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Write a Study Reflection or Topic Note</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Note Title (e.g. Understanding Python Decorators)..."
            className="w-full px-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-400 focus:bg-white"
          />

          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Chapter / Topic Tag (e.g. Level 8: Loops)..."
            className="w-full px-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-400 focus:bg-white"
          />
        </div>

        <textarea
          rows={3}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Record key concepts, 'aha!' moments, gotchas, or sample code you want to remember..."
          className="w-full p-4 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-400 focus:bg-white resize-y"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Reflection</span>
          </button>
        </div>
      </form>

      {/* 3. Saved Journal Entries */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-[#333333]">
          Journal Archive ({entries.length} Entries)
        </h2>

        <div className="space-y-4">
          {entries.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                    {item.topic}
                  </span>
                  <h3 className="text-base font-extrabold text-[#333333] mt-1">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
