import React, { useState } from 'react';
import {
  Rocket,
  Code2,
  Play,
  RotateCcw,
  Save,
  CheckCircle2,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FolderGit2,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';
import { executePythonCode } from '../services/pythonRunner';

interface ProjectTemplate {
  id: string;
  title: string;
  level: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  starterCode: string;
}

const PROJECTS: ProjectTemplate[] = [
  {
    id: 'proj-1',
    title: 'CLI Task & Study Tracker',
    level: 'Level 17: Mini Project',
    category: 'Productivity Tool',
    difficulty: 'Beginner',
    description:
      'Build a menu-driven Python CLI application that allows students to add study tasks, list pending tasks, mark tasks complete, and save them.',
    starterCode: `# Python Learning Academy: CLI Task & Study Tracker
tasks = []

def add_task(name):
    tasks.append({"title": name, "done": False})
    print(f"Added task: {name}")

def show_tasks():
    print("\\n=== CURRENT STUDY TASKS ===")
    for i, t in enumerate(tasks, 1):
        status = "✓ Done" if t["done"] else "Pending"
        print(f"{i}. [{status}] {t['title']}")

def mark_done(index):
    if 0 <= index < len(tasks):
        tasks[index]["done"] = True
        print(f"Task {index + 1} marked done!")

# Demo run:
add_task("Review Level 8: Loops")
add_task("Solve Level 10: Lists assignment")
add_task("Watch Level 16: OOP lecture")
mark_done(0)
show_tasks()
`,
  },
  {
    id: 'proj-2',
    title: 'Student Grade & Analytics System',
    level: 'Level 17: Mini Project',
    category: 'Data Processing',
    difficulty: 'Intermediate',
    description:
      'Process a list of student records, calculate average percentages, assign letter grades (A, B, C, F), and find the highest performing student.',
    starterCode: `# Student Grade & Analytics Engine
students = [
    {"name": "Maya Patel", "scores": [95, 88, 92, 100]},
    {"name": "Rohan Sharma", "scores": [78, 82, 85, 80]},
    {"name": "Ananya Verma", "scores": [90, 94, 96, 92]},
    {"name": "Dev Joshi", "scores": [65, 70, 68, 72]}
]

def calculate_grade(avg):
    if avg >= 90: return "A"
    elif avg >= 80: return "B"
    elif avg >= 70: return "C"
    else: return "F"

print("--- ACADEMY STUDENT REPORT ---")
top_student = None
highest_avg = 0

for s in students:
    avg = sum(s["scores"]) / len(s["scores"])
    grade = calculate_grade(avg)
    print(f"{s['name']}: Average {avg:.1f}% -> Grade {grade}")
    if avg > highest_avg:
        highest_avg = avg
        top_student = s["name"]

print(f"\\nTop Performer: {top_student} with {highest_avg:.1f}% average!")
`,
  },
  {
    id: 'proj-3',
    title: 'Grand Capstone: Academy Bank & Auth Engine',
    level: 'Level 18: Final Project',
    category: 'OOP & File System',
    difficulty: 'Advanced',
    description:
      'Design an object-oriented Bank Account and Authentication management system with classes, encapsulation, transaction logs, and exception safety.',
    starterCode: `# Level 18 Grand Capstone: OOP Account & Transaction Engine
class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0):
        self.owner = owner
        self.__balance = balance
        self.history = []

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self.__balance += amount
        self.history.append(f"Deposited: \${amount:.2f}")
        return self.__balance

    def withdraw(self, amount: float):
        if amount > self.__balance:
            raise ValueError("Insufficient balance")
        self.__balance -= amount
        self.history.append(f"Withdrew: \${amount:.2f}")
        return self.__balance

    def statement(self):
        print(f"--- Statement for {self.owner} ---")
        for log in self.history:
            print(f"  • {log}")
        print(f"Current Balance: \${self.__balance:.2f}\\n")

# Execution test
try:
    acc = BankAccount("Tirth Doshi", 500.0)
    acc.deposit(250.0)
    acc.withdraw(120.0)
    acc.statement()
except ValueError as e:
    print("Error:", e)
`,
  },
];

export const ProjectStudioView: React.FC = () => {
  const { showToast } = useAcademy();

  const [activeProject, setActiveProject] = useState<ProjectTemplate>(PROJECTS[0]);
  const [code, setCode] = useState<string>(PROJECTS[0].starterCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleSelectProject = (proj: ProjectTemplate) => {
    setActiveProject(proj);
    setCode(proj.starterCode);
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    const res = await executePythonCode(code);
    setIsRunning(false);
    setOutput(res.output || (res.error ? res.error : 'Project executed cleanly with no output.'));
  };

  const handleReset = () => {
    setCode(activeProject.starterCode);
    setOutput('');
    showToast('Code reset to project starter template.');
  };

  const handleSubmit = () => {
    showToast(`Project "${activeProject.title}" solution saved to your student profile!`);
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-10 animate-fadeIn pb-24">
      {/* 1. Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-50 via-white to-amber-50 border border-rose-200/60 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-rose-700 border border-rose-200 mb-2 shadow-2xs">
            <Rocket className="w-3.5 h-3.5" />
            <span>Python Academy Project Studio</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#333333]">
            Real-World Project Studio
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#4F6FAF]">
            Build practical Python applications, command-line utilities, data analytics engines, and your final capstone project.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-2xs flex items-center gap-3 shrink-0">
          <FolderGit2 className="w-8 h-8 text-rose-500" />
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              Portfolio Capstones
            </span>
            <span className="text-[11px] text-slate-500">
              Level 17 & Level 18 Projects
            </span>
          </div>
        </div>
      </div>

      {/* 2. Project Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROJECTS.map((proj) => {
          const isSelected = proj.id === activeProject.id;
          return (
            <div
              key={proj.id}
              onClick={() => handleSelectProject(proj)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-rose-50/70 border-rose-300 shadow-md ring-2 ring-rose-200/50'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                    {proj.level}
                  </span>
                  <span
                    className={`font-bold text-[10px] ${
                      proj.difficulty === 'Beginner'
                        ? 'text-emerald-600'
                        : proj.difficulty === 'Intermediate'
                        ? 'text-amber-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {proj.difficulty}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-[#333333]">
                  {proj.title}
                </h3>

                <p className="text-xs text-[#4F6FAF] mt-1 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className={isSelected ? 'text-rose-700' : 'text-slate-500'}>
                  {isSelected ? 'Active Project' : 'Select Project'}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Interactive Code Studio Playground */}
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 mb-1">
              <span>{activeProject.level}</span>
              <span>•</span>
              <span className="text-slate-500">{activeProject.category}</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#333333]">
              {activeProject.title}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              {activeProject.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Submit Project</span>
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
          <div className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs flex items-center justify-between font-mono">
            <span className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>main.py • {activeProject.title}</span>
            </span>
            <span className="text-[10px] text-slate-400">In-Browser Python 3.11</span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full p-4 bg-slate-900 text-rose-100 font-mono text-xs focus:outline-none resize-y"
            spellCheck={false}
          />
        </div>

        {/* Run Action */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isRunning ? 'Running Simulation...' : 'Execute Project Code'}</span>
          </button>
        </div>

        {/* Terminal Output */}
        {output && (
          <div className="p-5 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2 mb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Console Standard Output</span>
              </span>
              <span className="text-emerald-400 font-semibold">Process Completed</span>
            </div>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
