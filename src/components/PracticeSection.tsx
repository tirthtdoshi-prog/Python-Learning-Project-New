import React, { useState } from 'react';
import {
  Code2,
  Play,
  RotateCcw,
  Save,
  CheckCircle2,
  Terminal,
  FileCode,
  Download,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { executePythonCode } from '../services/pythonRunner';

export const PracticeSection: React.FC = () => {
  const { chapters, currentUser, savePracticeCode, showToast } = useAcademy();

  const [selectedStep, setSelectedStep] = useState(1);
  const activeChapter =
    chapters.find((c) => c.stepNumber === selectedStep) || chapters[0];

  const [code, setCode] = useState(
    currentUser?.savedPractices[activeChapter.id] || activeChapter.practiceTemplate
  );
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleSelectChapter = (stepNum: number) => {
    setSelectedStep(stepNum);
    const chap = chapters.find((c) => c.stepNumber === stepNum) || chapters[0];
    setCode(currentUser?.savedPractices[chap.id] || chap.practiceTemplate);
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    const res = await executePythonCode(code);
    setIsRunning(false);
    setOutput(res.output || (res.error ? res.error : 'Code executed with no output.'));
  };

  const handleSave = () => {
    savePracticeCode(activeChapter.id, code);
  };

  const handleReset = () => {
    setCode(activeChapter.practiceTemplate);
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `step_${activeChapter.stepNumber}_practice.py`;
    a.click();
    showToast(`Downloaded step_${activeChapter.stepNumber}_practice.py`);
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-100/70 via-white to-purple-50 p-6 sm:p-8 border border-sky-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-semibold text-sky-700 border border-sky-200 shadow-xs mb-2">
            <Code2 className="w-3.5 h-3.5 text-sky-500" />
            <span>Interactive Python Lab</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Chapter-Wise Practice Lab
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Write, run, and save your Python code directly in your browser without setting up any local environment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .py</span>
          </button>
        </div>
      </div>

      {/* Chapter Selection Bar */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-2">
          Choose Chapter to Practice:
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {chapters.map((chap) => {
            const isSelected = chap.stepNumber === selectedStep;
            return (
              <button
                key={chap.id}
                onClick={() => handleSelectChapter(chap.stepNumber)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Step {chap.stepNumber}: {chap.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Editor & Output */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Step {activeChapter.stepNumber}: {activeChapter.title}
            </h3>
            <p className="text-xs text-slate-500">{activeChapter.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              title="Reset Code Template"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Practice</span>
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Editor Area */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/40">
            <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 text-[11px] font-mono text-slate-500">
              code_editor.py
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={14}
              spellCheck={false}
              className="w-full p-4 font-mono text-xs text-slate-800 bg-white focus:outline-none resize-none leading-relaxed flex-1"
            />
          </div>

          {/* Output Area */}
          <div className="lg:col-span-5 flex flex-col rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/70">
            <div className="px-4 py-2 bg-slate-100/70 border-b border-slate-200 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>Terminal Output</span>
              <button
                onClick={() => setOutput('')}
                className="text-[10px] text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-slate-700 whitespace-pre-wrap flex-1 overflow-y-auto leading-relaxed">
              {output || '# Click "Run Code" above to execute and inspect the output.'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
