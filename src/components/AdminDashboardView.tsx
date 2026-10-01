import React, { useState } from 'react';
import {
  Shield,
  BookOpen,
  Users,
  Bell,
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  FileCheck2,
  CheckCircle2,
  Save,
  LogOut,
  Sparkles,
  Video,
  Upload,
  Play,
  Code2,
  Terminal,
  FileText,
  AlertCircle,
  X,
  ExternalLink,
  ChevronRight,
  ListPlus,
  Eye,
  Bold,
  Italic,
  List,
  Heading,
  Search,
  Check,
  RefreshCw,
  FileVideo,
  Layers,
  ArrowRight,
  Rocket,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { Chapter, Announcement, User, QuizQuestion, CodeExample } from '../types';
import { UniversalVideoPlayer } from './UniversalVideoPlayer';
import { PublishFreeModal } from './PublishFreeModal';

export const AdminDashboardView: React.FC = () => {
  const {
    currentUser,
    chapters,
    announcements,
    students,
    addChapter,
    editChapter,
    deleteChapter,
    resetToDefaultCurriculum,
    addAnnouncement,
    deleteAnnouncement,
    updateStudent,
    deleteStudent,
    openChapter,
    showToast,
  } = useAcademy();

  const [adminTab, setAdminTab] = useState<'chapters' | 'students' | 'notices' | 'assignments'>('chapters');
  const [searchQuery, setSearchQuery] = useState('');
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  // Structured Editing Panel State
  // Default to editing the first chapter if chapters exist
  const [editingChapterId, setEditingChapterId] = useState<string | null>(
    chapters.length > 0 ? chapters[0].id : null
  );
  const [editorSubTab, setEditorSubTab] = useState<'details' | 'content' | 'examples' | 'video' | 'mcqs' | 'assignment'>('details');
  const [markdownViewMode, setMarkdownViewMode] = useState<'write' | 'preview'>('write');

  // Pre-filled Form Fields
  const activeChapter = chapters.find((c) => c.id === editingChapterId) || chapters[0];

  const [formTitle, setFormTitle] = useState(activeChapter?.title || '');
  const [formSubtitle, setFormSubtitle] = useState(activeChapter?.subtitle || '');
  const [formDuration, setFormDuration] = useState(activeChapter?.durationMinutes || 25);
  
  // Video fields
  const [formVideoTitle, setFormVideoTitle] = useState(activeChapter?.videoTitle || '');
  const [formVideoUrl, setFormVideoUrl] = useState(activeChapter?.videoUrl || '');
  const [formVideoFileName, setFormVideoFileName] = useState('');

  // Content / Rich-Text Markdown
  const [formNotes, setFormNotes] = useState(activeChapter?.notes || '');

  // Code Example Snippets
  const [formExamples, setFormExamples] = useState<CodeExample[]>(
    activeChapter?.examples && activeChapter.examples.length > 0
      ? activeChapter.examples
      : [{ title: 'Code Demonstration', code: '# Python Code\nprint("Hello Python")', explanation: 'Execution output' }]
  );

  // Practical Console
  const [formPracticePrompt, setFormPracticePrompt] = useState('Write and test your code in the interactive console:');
  const [formPracticeTemplate, setFormPracticeTemplate] = useState(activeChapter?.practiceTemplate || '');
  const [formPracticeExpectedOutput, setFormPracticeExpectedOutput] = useState(activeChapter?.practiceExpectedOutput || '');

  // Coding Assignment
  const [formAssignmentTitle, setFormAssignmentTitle] = useState(activeChapter?.assignment?.title || '');
  const [formAssignmentProblem, setFormAssignmentProblem] = useState(activeChapter?.assignment?.problemStatement || '');
  const [formAssignmentStarter, setFormAssignmentStarter] = useState(activeChapter?.assignment?.starterCode || '');
  const [formAssignmentSolution, setFormAssignmentSolution] = useState(activeChapter?.assignment?.solutionCode || '');
  const [formAssignmentHints, setFormAssignmentHints] = useState<string[]>(activeChapter?.assignment?.hints || []);
  const [formNewHint, setFormNewHint] = useState('');

  // MCQs & Quiz
  const [formQuizQuestions, setFormQuizQuestions] = useState<QuizQuestion[]>(activeChapter?.quiz?.questions || []);

  // Announcements State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Notice' | 'Exam' | 'Holiday' | 'Update'>('Notice');

  // Student Edit State
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editStudentName, setEditStudentName] = useState('');

  // Delete Confirm State
  const [deleteConfirmChapterId, setDeleteConfirmChapterId] = useState<string | null>(null);

  // 1. SELECT CHAPTER TO EDIT (PRE-FILLS THE STRUCTURED EDITING PANEL)
  const handleSelectForEdit = (chap: Chapter) => {
    setEditingChapterId(chap.id);
    setEditorSubTab('details');
    setMarkdownViewMode('write');
    setFormTitle(chap.title);
    setFormSubtitle(chap.subtitle);
    setFormDuration(chap.durationMinutes);
    setFormVideoTitle(chap.videoTitle || `${chap.title} Lecture`);
    setFormVideoUrl(chap.videoUrl);
    setFormVideoFileName('');
    setFormNotes(chap.notes);
    setFormExamples(
      chap.examples && chap.examples.length > 0
        ? [...chap.examples]
        : [{ title: 'Code Snippet', code: '# Python Code\nprint("Hello")', explanation: 'Code explanation' }]
    );
    setFormPracticePrompt('Write and test your code in the interactive console:');
    setFormPracticeTemplate(chap.practiceTemplate);
    setFormPracticeExpectedOutput(chap.practiceExpectedOutput || '');
    setFormAssignmentTitle(chap.assignment?.title || `${chap.title} Assignment`);
    setFormAssignmentProblem(chap.assignment?.problemStatement || '');
    setFormAssignmentStarter(chap.assignment?.starterCode || '');
    setFormAssignmentSolution(chap.assignment?.solutionCode || '');
    setFormAssignmentHints(chap.assignment?.hints ? [...chap.assignment.hints] : []);
    setFormQuizQuestions(chap.quiz?.questions ? [...chap.quiz.questions] : []);
    showToast(`Loaded Level ${chap.stepNumber} into Structured Editing Panel.`);
  };

  // 2. CREATE NEW CHAPTER (LOADS BLANK TEMPLATE INTO EDITING PANEL)
  const handleSelectCreateNew = () => {
    const nextStep = chapters.length + 1;
    setEditingChapterId(null);
    setEditorSubTab('details');
    setMarkdownViewMode('write');
    setFormTitle('');
    setFormSubtitle('Fundamental concepts, syntax demonstrations, and exercises');
    setFormDuration(35);
    setFormVideoTitle(`Level ${nextStep} Video Lecture`);
    setFormVideoUrl('https://www.youtube.com/embed/_uQrJ0TkZlc');
    setFormVideoFileName('');
    setFormNotes(`### Level ${nextStep}: Concepts & Syntax\n\nWelcome to this lesson. Review the primary principles and syntax below.\n\n#### Key Rules:\n- Python statements execute sequentially.\n- Indentation defines code blocks.\n- Functions return values using the \`return\` keyword.`);
    setFormExamples([
      {
        title: 'Core Implementation Snippet',
        code: `# Level ${nextStep} Demonstration\ndef execute_task(data):\n    return [item.upper() for item in data]\n\nprint(execute_task(["python", "academy"]))`,
        explanation: 'Shows functional transformations and list processing.',
      },
    ]);
    setFormPracticePrompt('Write and execute a Python function in the interactive console below:');
    setFormPracticeTemplate(`# Interactive Console Practice\ndef greet(name: str):\n    return f"Hello, {name}!"\n\nprint(greet("Academy Learner"))`);
    setFormPracticeExpectedOutput('Hello, Academy Learner!');
    setFormAssignmentTitle(`Level ${nextStep} Practical Assignment`);
    setFormAssignmentProblem('Design and implement a clean, error-handled Python script solving the requirements of this milestone.');
    setFormAssignmentStarter(`# Level ${nextStep} Starter Code\ndef solution(input_data):\n    # Write your solution here\n    pass\n`);
    setFormAssignmentSolution(`def solution(input_data):\n    return f"Processed: {input_data}"`);
    setFormAssignmentHints(['Review the code examples tab for syntax patterns.', 'Make sure all edge cases are handled cleanly.']);
    setFormQuizQuestions([
      {
        id: `q-${nextStep}-1`,
        type: 'mcq',
        question: 'Which of the following is the standard Python 3 file extension?',
        options: ['.py', '.python', '.pyc', '.pt'],
        correctAnswer: '.py',
        explanation: 'Python source code files are conventionally saved with the .py extension.',
      },
      {
        id: `q-${nextStep}-2`,
        type: 'mcq',
        question: 'What keyword defines a function in Python?',
        options: ['def', 'func', 'function', 'fn'],
        correctAnswer: 'def',
        explanation: 'Functions in Python are defined with the def keyword.',
      },
    ]);
    showToast(`Authoring Step ${nextStep} in Structured Editing Panel.`);
  };

  // 3. VIDEO FILE-UPLOAD PLACEHOLDER HANDLER
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormVideoUrl(url);
      setFormVideoFileName(`${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
      showToast(`Video "${file.name}" uploaded and mounted in course player! 🎥`);
    }
  };

  // 4. RICH-TEXT MARKDOWN TOOLBAR HELPERS
  const insertMarkdown = (syntaxStart: string, syntaxEnd = '') => {
    setFormNotes((prev) => `${prev}\n${syntaxStart}Text${syntaxEnd}`);
  };

  // 5. MCQ QUESTIONS BUILDER
  const handleAddMCQ = () => {
    const newQ: QuizQuestion = {
      id: `q-mcq-${Date.now()}`,
      type: 'mcq',
      question: 'New Question: What will be the output or behavior of this code?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: 'Detailed explanation shown to students after submitting their answer.',
    };
    setFormQuizQuestions([...formQuizQuestions, newQ]);
  };

  const handleUpdateMCQ = (idx: number, field: keyof QuizQuestion, value: any) => {
    const updated = [...formQuizQuestions];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormQuizQuestions(updated);
  };

  const handleUpdateOption = (qIdx: number, optIdx: number, value: string) => {
    const updated = [...formQuizQuestions];
    const opts = [...(updated[qIdx].options || [])];
    opts[optIdx] = value;
    updated[qIdx] = { ...updated[qIdx], options: opts };
    setFormQuizQuestions(updated);
  };

  const handleDeleteMCQ = (idx: number) => {
    setFormQuizQuestions(formQuizQuestions.filter((_, i) => i !== idx));
  };

  // 6. CODE EXAMPLE SNIPPET HELPERS
  const handleAddExample = () => {
    setFormExamples([
      ...formExamples,
      {
        title: `Code Snippet #${formExamples.length + 1}`,
        code: `# Code Snippet #${formExamples.length + 1}\ndef example():\n    pass\n`,
        explanation: 'Brief explanation of key lines.',
      },
    ]);
  };

  const handleUpdateExample = (idx: number, field: keyof CodeExample, val: string) => {
    const updated = [...formExamples];
    updated[idx] = { ...updated[idx], [field]: val };
    setFormExamples(updated);
  };

  const handleDeleteExample = (idx: number) => {
    setFormExamples(formExamples.filter((_, i) => i !== idx));
  };

  // 7. ASSIGNMENT HINTS HELPERS
  const handleAddHint = () => {
    if (!formNewHint.trim()) return;
    setFormAssignmentHints([...formAssignmentHints, formNewHint.trim()]);
    setFormNewHint('');
  };

  const handleDeleteHint = (idx: number) => {
    setFormAssignmentHints(formAssignmentHints.filter((_, i) => i !== idx));
  };

  // 8. SAVE CHAPTER / UPDATE CONTENT
  const handleSaveCourseContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Please provide a chapter title.');
      return;
    }

    if (editingChapterId) {
      // UPDATE EXISTING
      const existing = chapters.find((c) => c.id === editingChapterId);
      if (!existing) return;

      const updated: Chapter = {
        ...existing,
        title: formTitle.trim(),
        subtitle: formSubtitle.trim(),
        durationMinutes: Number(formDuration) || 25,
        videoUrl: formVideoUrl.trim() || existing.videoUrl,
        videoTitle: formVideoTitle.trim() || formTitle.trim(),
        notes: formNotes.trim(),
        examples: formExamples,
        practiceTemplate: formPracticeTemplate,
        practiceExpectedOutput: formPracticeExpectedOutput.trim() || undefined,
        assignment: {
          title: formAssignmentTitle.trim() || `${formTitle} Assignment`,
          problemStatement: formAssignmentProblem.trim(),
          starterCode: formAssignmentStarter,
          solutionCode: formAssignmentSolution,
          hints: formAssignmentHints,
        },
        quiz: {
          ...existing.quiz,
          title: `${formTitle} Quiz`,
          questions: formQuizQuestions,
        },
      };

      editChapter(updated);
      showToast(`Chapter "${updated.title}" successfully updated!`);
    } else {
      // CREATE NEW
      const newStep = chapters.length + 1;
      const newId = `step-${newStep}`;

      const created: Chapter = {
        id: newId,
        stepNumber: newStep,
        title: formTitle.trim(),
        subtitle: formSubtitle.trim() || 'Curriculum Level',
        durationMinutes: Number(formDuration) || 30,
        videoUrl: formVideoUrl.trim() || 'https://www.youtube.com/embed/_uQrJ0TkZlc',
        videoTitle: formVideoTitle.trim() || `${formTitle} Lecture`,
        notes: formNotes.trim(),
        examples: formExamples,
        practiceTemplate: formPracticeTemplate,
        practiceExpectedOutput: formPracticeExpectedOutput.trim() || undefined,
        assignment: {
          title: formAssignmentTitle.trim() || `${formTitle} Assignment`,
          problemStatement: formAssignmentProblem.trim() || 'Complete the assignment prompt.',
          starterCode: formAssignmentStarter || '# Write code here:\n',
          solutionCode: formAssignmentSolution || 'print("Done")',
          hints: formAssignmentHints,
        },
        quiz: {
          id: `quiz-${newStep}`,
          chapterId: newId,
          chapterStep: newStep,
          title: `${formTitle} Quiz`,
          timeLimitSeconds: 180,
          questions: formQuizQuestions,
        },
      };

      addChapter(created);
      setEditingChapterId(newId);
      showToast(`Chapter "${created.title}" successfully added!`);
    }
  };

  const filteredChapters = chapters.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `step ${c.stepNumber}`.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* 1. TOP HEADER & METRICS */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-100/90 via-white to-sky-50 p-6 sm:p-8 border border-purple-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-200 shrink-0">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#333333]">
                Course Content Management & Editor
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-extrabold border border-purple-200">
                Administrator
              </span>
            </div>
            <p className="mt-1 text-xs text-[#4F6FAF]">
              Manage existing chapters with dedicated 'Edit' and 'Delete' controls, and update titles, subtitles, markdown notes, code snippets, and MCQs in the structured panel.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setPublishModalOpen(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>Publish Free / Export ZIP</span>
          </button>

          <button
            type="button"
            onClick={handleSelectCreateNew}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create New Chapter</span>
          </button>
        </div>
      </div>

      {/* 2. MANAGEMENT TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'chapters', label: `Chapters & Content Editor (${chapters.length})`, icon: BookOpen },
          { id: 'students', label: `Enrolled Students (${students.length})`, icon: Users },
          { id: 'notices', label: `Announcements (${announcements.length})`, icon: Bell },
          { id: 'assignments', label: 'Assignment Submissions', icon: FileCheck2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-xs font-bold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB: CHAPTERS MANAGEMENT (MASTER-DETAIL WORKSPACE) */}
      {adminTab === 'chapters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: LIST OF CURRENT CHAPTERS WITH INDIVIDUAL 'EDIT' AND 'DELETE' BUTTONS */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              {/* Local Storage Persistence Status Banner */}
              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-[11px] text-emerald-900 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>LocalStorage Active: Auto-Saved</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all chapters to the default 18-step template? Any custom chapters added will be reset.')) {
                      resetToDefaultCurriculum();
                    }
                  }}
                  className="text-[10px] text-emerald-700 hover:text-emerald-950 font-semibold underline cursor-pointer"
                >
                  Reset Template
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-[#333333]">
                    Current Chapters ({chapters.length})
                  </h3>
                  <p className="text-[11px] text-[#4F6FAF]">
                    Click 'Edit' to load any chapter into the editing panel.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSelectCreateNew}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter chapters by title..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Chapters List Cards */}
            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1">
              {filteredChapters.map((chap) => {
                const isSelected = editingChapterId === chap.id;
                return (
                  <div
                    key={chap.id}
                    className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                      isSelected
                        ? 'bg-purple-50/70 border-purple-400 ring-2 ring-purple-200 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-extrabold text-slate-700">
                            Step #{chap.stepNumber}
                          </span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-bold animate-pulse">
                              Active in Editor
                            </span>
                          )}
                        </div>

                        <h4 className="font-extrabold text-xs text-[#333333] pt-0.5 line-clamp-1">
                          {chap.title}
                        </h4>

                        <p className="text-[11px] text-[#4F6FAF] line-clamp-1">
                          {chap.subtitle}
                        </p>
                      </div>

                      <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                        {chap.durationMinutes}m
                      </span>
                    </div>

                    {/* Individual Edit & Delete Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                        <span>{chap.examples?.length || 0} Code Snippets</span>
                        <span>•</span>
                        <span>{chap.quiz?.questions?.length || 0} MCQs</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Preview */}
                        <button
                          type="button"
                          onClick={() => openChapter(chap.id)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title="Preview student view"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        {/* Individual Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleSelectForEdit(chap)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white shadow-2xs'
                              : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
                          }`}
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        {/* Individual Delete Button */}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmChapterId(chap.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-colors cursor-pointer"
                          title="Delete chapter"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: THE STRUCTURED EDITING PANEL */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden sticky top-20">
            {/* Panel Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-purple-50/70 via-white to-sky-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  {editingChapterId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-[#333333]">
                      Structured Chapter Editing Panel
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                      {editingChapterId ? 'Editing Existing' : 'New Chapter'}
                    </span>
                  </div>
                  <p className="text-xs text-[#4F6FAF]">
                    Pre-filled with title, subtitle, markdown notes, code snippets, video upload, and MCQs.
                  </p>
                </div>
              </div>

              {editingChapterId && (
                <button
                  type="button"
                  onClick={() => setDeleteConfirmChapterId(editingChapterId)}
                  className="text-rose-500 hover:text-rose-700 p-2 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete this chapter"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Panel Tab Selector */}
            <div className="px-6 py-2 border-b border-slate-200 bg-slate-50 flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
              {[
                { id: 'details', label: '1. Title & Subtitle', icon: BookOpen },
                { id: 'content', label: '2. Markdown Content', icon: FileText },
                { id: 'examples', label: `3. Code Snippets (${formExamples.length})`, icon: Code2 },
                { id: 'video', label: '4. Video Upload', icon: Video },
                { id: 'mcqs', label: `5. MCQs (${formQuizQuestions.length})`, icon: HelpCircle },
                { id: 'assignment', label: '6. Coding Assignment', icon: FileCheck2 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = editorSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setEditorSubTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Panel Form Body */}
            <form onSubmit={handleSaveCourseContent} className="p-6 sm:p-7 space-y-6 text-xs max-h-[640px] overflow-y-auto">
              {/* SUB-TAB 1: TITLE & SUBTITLE */}
              {editorSubTab === 'details' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="font-extrabold text-slate-700 block mb-1">
                      Chapter Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Object Oriented Programming in Python"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-purple-500 font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-slate-700 block mb-1">
                      Sub-Title / Tagline *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Classes, Instances, Inheritance, Encapsulation & Polymorphism"
                      value={formSubtitle}
                      onChange={(e) => setFormSubtitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">
                        Lecture Estimated Duration (Minutes)
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={300}
                        value={formDuration}
                        onChange={(e) => setFormDuration(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="font-extrabold text-slate-700 block mb-1">
                        Lecture Video Display Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. OOP Architecture Demonstration"
                        value={formVideoTitle}
                        onChange={(e) => setFormVideoTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: RICH-TEXT MARKDOWN CONTENT */}
              {editorSubTab === 'content' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-[#333333] block">
                        Rich-Text Markdown Chapter Notes
                      </span>
                      <span className="text-[11px] text-[#4F6FAF]">
                        Write structured study notes with headings, bold text, lists, and code blocks.
                      </span>
                    </div>

                    {/* Write vs Preview Toggle */}
                    <div className="p-1 rounded-xl bg-slate-100 border border-slate-200 flex items-center gap-1 font-bold">
                      <button
                        type="button"
                        onClick={() => setMarkdownViewMode('write')}
                        className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                          markdownViewMode === 'write'
                            ? 'bg-white text-purple-700 shadow-2xs'
                            : 'text-slate-600'
                        }`}
                      >
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setMarkdownViewMode('preview')}
                        className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                          markdownViewMode === 'preview'
                            ? 'bg-white text-purple-700 shadow-2xs'
                            : 'text-slate-600'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5 inline mr-1" />
                        Preview
                      </button>
                    </div>
                  </div>

                  {markdownViewMode === 'write' ? (
                    <div className="space-y-2">
                      {/* Markdown Formatting Toolbar */}
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => insertMarkdown('**', '**')}
                          className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold"
                          title="Bold"
                        >
                          <Bold className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown('*', '*')}
                          className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 italic"
                          title="Italic"
                        >
                          <Italic className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown('### ')}
                          className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold"
                          title="Heading 3"
                        >
                          <Heading className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown('- ')}
                          className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700"
                          title="Bullet List"
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkdown('```python\n# Code snippet\n', '\n```')}
                          className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]"
                          title="Code Block"
                        >
                          &lt;/&gt; Code
                        </button>
                      </div>

                      <textarea
                        rows={10}
                        required
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Write clear, comprehensive markdown notes for students..."
                        className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-purple-500 font-mono text-xs leading-relaxed resize-y"
                      />
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 min-h-[220px] text-xs leading-relaxed">
                      <div className="whitespace-pre-wrap font-sans text-slate-700">
                        {formNotes || 'No notes provided yet.'}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 3: CODE EXAMPLE SNIPPETS */}
              {editorSubTab === 'examples' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-[#333333] block">
                        Code Example Snippets ({formExamples.length})
                      </span>
                      <span className="text-[11px] text-[#4F6FAF]">
                        Provide clean syntax examples with line explanations for student reference.
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddExample}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Code Snippet</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formExamples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2.5 relative"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            placeholder="Snippet Title (e.g. Iterating with range())"
                            value={ex.title}
                            onChange={(e) => handleUpdateExample(idx, 'title', e.target.value)}
                            className="font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white w-2/3"
                          />

                          {formExamples.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteExample(idx)}
                              className="text-rose-500 hover:text-rose-700 text-xs font-semibold p-1 cursor-pointer"
                            >
                              Delete Snippet
                            </button>
                          )}
                        </div>

                        <textarea
                          rows={5}
                          value={ex.code}
                          onChange={(e) => handleUpdateExample(idx, 'code', e.target.value)}
                          placeholder="# Write clean Python snippet code..."
                          className="w-full p-3 rounded-xl bg-slate-900 text-emerald-200 font-mono text-xs focus:outline-none"
                        />

                        <input
                          type="text"
                          value={ex.explanation}
                          onChange={(e) => handleUpdateExample(idx, 'explanation', e.target.value)}
                          placeholder="Explain what this code snippet illustrates..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: VIDEO UPLOAD & STREAM */}
              {editorSubTab === 'video' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">100% Free Publishing Mode — Zero Cloud Storage Required!</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Upload video files directly from your computer (instant in-browser playback with zero cloud fees) or paste any free YouTube lecture link.
                      </p>
                    </div>
                  </div>

                  {/* File Upload Placeholder */}
                  <div className="relative rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/30 hover:bg-indigo-50/60 p-6 text-center transition-all">
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/quicktime"
                      onChange={handleVideoFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    <div className="space-y-2 pointer-events-none">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto shadow-xs">
                        <FileVideo className="w-6 h-6" />
                      </div>

                      <span className="font-extrabold text-sm text-indigo-950 block">
                        Upload Video File (MP4, WebM, MOV)
                      </span>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-indigo-200 text-indigo-800 text-xs font-bold shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose Local Video File</span>
                      </div>

                      {formVideoFileName && (
                        <div className="pt-1 text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Uploaded: {formVideoFileName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Or Free YouTube / Web Video Link
                    </label>
                    <input
                      type="text"
                      value={formVideoUrl}
                      onChange={(e) => setFormVideoUrl(e.target.value)}
                      placeholder="e.g. https://www.youtube.com/watch?v=... or local MP4"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-[11px]"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Works with YouTube URLs, unlisted YouTube videos, Vimeo, or direct video files.
                    </span>
                  </div>

                  {formVideoUrl && (
                    <div className="space-y-1">
                      <span className="font-bold text-slate-600 block text-[11px]">
                        Video Player Live Preview:
                      </span>
                      <UniversalVideoPlayer
                        videoUrl={formVideoUrl}
                        videoTitle={formVideoTitle || formTitle || 'Lecture Preview'}
                        chapter={activeChapter}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 5: MCQS STUDIO */}
              {editorSubTab === 'mcqs' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <span className="font-extrabold text-sm text-[#333333] block">
                        Multiple-Choice Questions ({formQuizQuestions.length})
                      </span>
                      <span className="text-[11px] text-[#4F6FAF]">
                        Select the correct radio option for each question.
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddMCQ}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Add MCQ</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formQuizQuestions.map((q, qIdx) => (
                      <div
                        key={q.id || qIdx}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-purple-700 text-xs">
                            Question #{qIdx + 1}
                          </span>

                          {formQuizQuestions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteMCQ(qIdx)}
                              className="text-rose-500 hover:text-rose-700 text-xs font-semibold"
                            >
                              Delete
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          required
                          value={q.question}
                          onChange={(e) => handleUpdateMCQ(qIdx, 'question', e.target.value)}
                          placeholder="Question prompt..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold"
                        />

                        {/* 4 Options with Radio */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(q.options || ['Option A', 'Option B', 'Option C', 'Option D']).map((opt, optIdx) => (
                            <div
                              key={optIdx}
                              className={`flex items-center gap-2 p-2 rounded-xl border ${
                                q.correctAnswer === opt
                                  ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-200'
                                  : 'bg-white border-slate-200'
                              }`}
                            >
                              <input
                                type="radio"
                                name={`radio-q-${qIdx}`}
                                checked={q.correctAnswer === opt}
                                onChange={() => handleUpdateMCQ(qIdx, 'correctAnswer', opt)}
                                className="text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                              />
                              <span className="font-bold text-slate-400 text-xs">
                                {String.fromCharCode(65 + optIdx)}:
                              </span>
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => handleUpdateOption(qIdx, optIdx, e.target.value)}
                                className="flex-1 text-xs focus:outline-none bg-transparent font-medium"
                              />
                            </div>
                          ))}
                        </div>

                        <input
                          type="text"
                          value={q.explanation}
                          onChange={(e) => handleUpdateMCQ(qIdx, 'explanation', e.target.value)}
                          placeholder="Explanation for students..."
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 6: CODING ASSIGNMENT */}
              {editorSubTab === 'assignment' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Assignment Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formAssignmentTitle}
                        onChange={(e) => setFormAssignmentTitle(e.target.value)}
                        placeholder="e.g. Bank Account Class Implementation"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Problem Statement *
                      </label>
                      <input
                        type="text"
                        required
                        value={formAssignmentProblem}
                        onChange={(e) => setFormAssignmentProblem(e.target.value)}
                        placeholder="Task prompt..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Starter Code</label>
                      <textarea
                        rows={4}
                        value={formAssignmentStarter}
                        onChange={(e) => setFormAssignmentStarter(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-900 text-rose-200 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Solution Code</label>
                      <textarea
                        rows={4}
                        value={formAssignmentSolution}
                        onChange={(e) => setFormAssignmentSolution(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-900 text-emerald-200 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Dynamic Hints */}
                  <div className="space-y-2">
                    <label className="font-bold text-slate-700 block text-xs">
                      Hints ({formAssignmentHints.length})
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter a helpful hint..."
                        value={formNewHint}
                        onChange={(e) => setFormNewHint(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddHint}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
                      >
                        + Add Hint
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {formAssignmentHints.map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 text-[11px] border border-rose-200 flex items-center gap-1.5"
                        >
                          <span>{h}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteHint(i)}
                            className="text-rose-500 hover:text-rose-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PANEL SAVE ACTION BUTTONS */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 sticky bottom-0 bg-white py-2">
                <button
                  type="button"
                  onClick={handleSelectCreateNew}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs"
                >
                  Clear & Create New
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingChapterId ? 'Save & Update Content' : 'Publish Course Chapter'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. DELETE CONFIRMATION DIALOG */}
      {deleteConfirmChapterId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-center space-y-4 animate-scaleUp">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-[#333333]">
                Confirm Chapter Deletion
              </h3>
              <p className="text-xs text-[#4F6FAF] mt-1">
                Are you sure you want to delete this chapter? This will remove its video lectures, practical console code, and quizzes from the curriculum.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmChapterId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteChapter(deleteConfirmChapterId);
                  if (editingChapterId === deleteConfirmChapterId) {
                    setEditingChapterId(chapters.length > 1 ? chapters[0].id : null);
                  }
                  setDeleteConfirmChapterId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                Yes, Delete Chapter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB: STUDENTS DIRECTORY */}
      {adminTab === 'students' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#333333]">
                Enrolled Students ({students.length})
              </h3>
              <p className="text-xs text-[#4F6FAF]">
                View student progress, completed chapters, and quiz scores.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Completed Levels</th>
                  <th className="p-4">Quizzes Taken</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      {editingStudentId === student.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editStudentName}
                            onChange={(e) => setEditStudentName(e.target.value)}
                            className="px-2 py-1 rounded border border-slate-200 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              updateStudent({ ...student, name: editStudentName });
                              setEditingStudentId(null);
                            }}
                            className="px-2 py-1 bg-purple-600 text-white rounded text-[11px]"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-[#333333] block">
                            {student.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {student.email}
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        student.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-sky-100 text-sky-700'
                      }`}>
                        {student.role}
                      </span>
                    </td>

                    <td className="p-4 text-slate-600 font-medium">
                      {student.completedChapterIds.length} of {chapters.length} Levels
                    </td>

                    <td className="p-4 text-slate-600">
                      {Object.keys(student.quizScores).length} Quizzes
                    </td>

                    <td className="p-4 text-right">
                      {student.role !== 'admin' && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStudentId(student.id);
                              setEditStudentName(student.name);
                            }}
                            className="p-1.5 text-slate-400 hover:text-purple-600"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteStudent(student.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. TAB: NOTICE BOARD */}
      {adminTab === 'notices' && (
        <div className="space-y-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!noticeTitle.trim() || !noticeContent.trim()) return;
              addAnnouncement({
                id: `ann-${Date.now()}`,
                title: noticeTitle.trim(),
                content: noticeContent.trim(),
                date: 'Today',
                category: noticeCategory,
              });
              setNoticeTitle('');
              setNoticeContent('');
            }}
            className="p-6 rounded-3xl bg-white border border-purple-200 shadow-xs space-y-4 text-xs"
          >
            <h3 className="font-extrabold text-sm text-[#333333]">
              Publish New Academy Announcement
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Notice Title (e.g. Final Capstone Deadline Extension)..."
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
              />

              <select
                value={noticeCategory}
                onChange={(e) => setNoticeCategory(e.target.value as any)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
              >
                <option value="Notice">Notice</option>
                <option value="Exam">Exam</option>
                <option value="Holiday">Holiday</option>
                <option value="Update">Update</option>
              </select>
            </div>

            <textarea
              rows={3}
              required
              placeholder="Announcement Content..."
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
            />

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Publish Notice
            </button>
          </form>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#333333] text-sm">{ann.title}</span>
                    <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      {ann.category}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">{ann.content}</p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteAnnouncement(ann.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB: ASSIGNMENTS OVERVIEW */}
      {adminTab === 'assignments' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-[#333333]">
            Student Assignment Code Submissions
          </h3>

          <div className="space-y-3">
            {students.flatMap((s) =>
              Object.entries(s.submittedAssignments).map(([chapterId, sub]) => {
                const chap = chapters.find((c) => c.id === chapterId);
                return (
                  <div
                    key={`${s.id}-${chapterId}`}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">
                        {s.name} • {chap?.title || chapterId}
                      </span>
                      <span className="text-[11px] text-slate-400">{sub.date}</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl text-sky-200 font-mono text-[11px] overflow-x-auto">
                      <pre>{sub.code}</pre>
                    </div>

                    <span className="text-[11px] text-emerald-600 font-bold">
                      ✓ Submitted & Verified
                    </span>
                  </div>
                );
              })
            )}

            {students.every((s) => Object.keys(s.submittedAssignments).length === 0) && (
              <p className="text-xs text-slate-500 text-center py-8">
                No assignment submissions yet. When students submit code from chapter decks, they will appear here.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 100% Free Publish / Export Modal */}
      <PublishFreeModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
      />
    </div>
  );
};
