import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  BookOpen,
  Target,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface StudyGoal {
  id: string;
  text: string;
  timeframe: 'daily' | 'weekly';
  completed: boolean;
}

export const StudyPlannerView: React.FC = () => {
  const { setActiveView, showToast } = useAcademy();

  const [goals, setGoals] = useState<StudyGoal[]>([
    { id: 'g-1', text: 'Solve 2 Code Output Practice Questions in Practice Lab', timeframe: 'daily', completed: true },
    { id: 'g-2', text: 'Review Level 8 (Loops) Notes & write custom while loop', timeframe: 'daily', completed: false },
    { id: 'g-3', text: 'Attempt Level 9 Quiz and score 90%+', timeframe: 'weekly', completed: false },
    { id: 'g-4', text: 'Build CLI Task Tracker in Project Studio', timeframe: 'weekly', completed: false },
  ]);

  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalTimeframe, setNewGoalTimeframe] = useState<'daily' | 'weekly'>('daily');

  const handleToggle = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;

    const newGoal: StudyGoal = {
      id: `goal-${Date.now()}`,
      text: newGoalText.trim(),
      timeframe: newGoalTimeframe,
      completed: false,
    };
    setGoals((prev) => [newGoal, ...prev]);
    setNewGoalText('');
    showToast('New study goal added to your planner!');
  };

  const handleDelete = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-sky-50 border border-emerald-200/80 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-emerald-800 border border-emerald-200 mb-2 shadow-2xs">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Study Planner & Schedules</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#333333]">
            Study Planner & Goals
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#4F6FAF]">
            Set daily Python study goals, plan your weekly milestones, and build consistent learning habits.
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

      {/* 2. Add Goal Form */}
      <form
        onSubmit={handleAddGoal}
        className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center gap-3"
      >
        <input
          type="text"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          placeholder="Enter a new learning goal (e.g. Master Dictionary methods)..."
          className="flex-1 w-full px-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-400 focus:bg-white"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={newGoalTimeframe}
            onChange={(e) => setNewGoalTimeframe(e.target.value as any)}
            className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none"
          >
            <option value="daily">Daily Goal</option>
            <option value="weekly">Weekly Milestone</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Goal</span>
          </button>
        </div>
      </form>

      {/* 3. Daily & Weekly Goals Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Goals */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-[#333333] flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>Daily Study Targets</span>
            </h3>
            <span className="text-xs font-bold text-sky-600">
              {goals.filter((g) => g.timeframe === 'daily' && g.completed).length} /{' '}
              {goals.filter((g) => g.timeframe === 'daily').length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {goals
              .filter((g) => g.timeframe === 'daily')
              .map((goal) => (
                <div
                  key={goal.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                    goal.completed
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-500 line-through'
                      : 'bg-slate-50/60 border-slate-200 text-slate-800'
                  }`}
                >
                  <label className="flex items-center gap-2.5 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => handleToggle(goal.id)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-medium">{goal.text}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleDelete(goal.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Weekly Milestones */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-[#333333] flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              <span>Weekly Milestones</span>
            </h3>
            <span className="text-xs font-bold text-purple-600">
              {goals.filter((g) => g.timeframe === 'weekly' && g.completed).length} /{' '}
              {goals.filter((g) => g.timeframe === 'weekly').length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {goals
              .filter((g) => g.timeframe === 'weekly')
              .map((goal) => (
                <div
                  key={goal.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                    goal.completed
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-500 line-through'
                      : 'bg-slate-50/60 border-slate-200 text-slate-800'
                  }`}
                >
                  <label className="flex items-center gap-2.5 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => handleToggle(goal.id)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="font-medium">{goal.text}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleDelete(goal.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
