import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Code2,
  Terminal,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface InterviewQnA {
  id: string;
  category: 'Core Python' | 'Data Structures' | 'OOP' | 'Advanced' | 'Viva & College';
  question: string;
  answer: string;
  codeSnippet?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const INTERVIEW_QUESTIONS: InterviewQnA[] = [
  {
    id: 'iq-1',
    category: 'Core Python',
    question: 'How is memory managed in Python?',
    answer:
      'Memory in Python is managed by the Python Memory Manager through a private heap space allocated to Python objects. Python employs an automated Garbage Collector based primarily on reference counting and a cyclic garbage collector to detect and collect circular reference loops.',
    codeSnippet: `import sys\nx = [1, 2, 3]\nprint(sys.getrefcount(x))  # Displays reference count`,
    difficulty: 'Intermediate',
  },
  {
    id: 'iq-2',
    category: 'Core Python',
    question: 'What is the Global Interpreter Lock (GIL) and why does it exist?',
    answer:
      'The GIL is a mutex used by CPython to ensure only one native thread executes Python bytecode at any single moment. It guarantees thread-safe memory management without requiring fine-grained locks across all CPython C-extensions.',
    difficulty: 'Advanced',
  },
  {
    id: 'iq-3',
    category: 'Core Python',
    question: 'What is the difference between mutable and immutable data types in Python?',
    answer:
      'Mutable types (such as lists, dictionaries, and sets) allow their content or elements to be modified in-place after creation without changing their memory address. Immutable types (such as integers, floats, strings, and tuples) cannot be altered in-place; any modification creates a completely new object in memory.',
    codeSnippet: `# Immutable (int):\na = 10\nprint(id(a))\na += 1\nprint(id(a)) # New memory address\n\n# Mutable (list):\nl = [1, 2]\nprint(id(l))\nl.append(3)\nprint(id(l)) # Same memory address`,
    difficulty: 'Beginner',
  },
  {
    id: 'iq-4',
    category: 'Data Structures',
    question: 'What is the difference between a List and a Tuple in Python?',
    answer:
      'Lists are mutable (enclosed in square brackets `[]`), can grow or shrink dynamically, and are slightly slower due to over-allocation. Tuples are immutable (enclosed in parentheses `()`), hashable (if their elements are hashable), and memory efficient.',
    codeSnippet: `my_list = [1, 2, 3]\nmy_tuple = (1, 2, 3)\nmy_list[0] = 99  # Valid\n# my_tuple[0] = 99 -> Raises TypeError`,
    difficulty: 'Beginner',
  },
  {
    id: 'iq-5',
    category: 'Data Structures',
    question: 'How do Python dictionaries maintain order since Python 3.7+?',
    answer:
      'Since Python 3.7, dictionaries are officially guaranteed to preserve key insertion order. This is implemented via a compact array-backed hash table layout where hashes and keys are inserted sequentially into an index table.',
    difficulty: 'Intermediate',
  },
  {
    id: 'iq-6',
    category: 'OOP',
    question: 'What are the four core pillars of Object-Oriented Programming in Python?',
    answer:
      'The four pillars are: 1. Encapsulation (bundling data and methods, private attributes prefixed with `__`), 2. Abstraction (hiding implementation complexity using ABC modules), 3. Inheritance (subclasses inheriting fields and behaviors from base classes), and 4. Polymorphism (methods behaving differently according to object context).',
    codeSnippet: `class Animal:\n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof!"`,
    difficulty: 'Beginner',
  },
  {
    id: 'iq-7',
    category: 'OOP',
    question: 'What is the difference between __init__ and __new__ in Python?',
    answer:
      '`__new__` is the static method that actually creates and returns a new instance of the class in memory. `__init__` is the initializer method called subsequently to set up attributes on that newly created instance.',
    difficulty: 'Advanced',
  },
  {
    id: 'iq-8',
    category: 'Advanced',
    question: 'What are Python Generators and the yield keyword?',
    answer:
      'Generators are iterators that produce sequence items lazily on demand instead of loading everything into memory at once. When `yield` is evaluated, the generator function pauses execution, saves its local state, and returns the yielded value.',
    codeSnippet: `def fibonacci_gen(limit):\n    a, b = 0, 1\n    for _ in range(limit):\n        yield a\n        a, b = b, a + b\n\nfor num in fibonacci_gen(5):\n    print(num, end=" ")`,
    difficulty: 'Intermediate',
  },
  {
    id: 'iq-9',
    category: 'Viva & College',
    question: 'Why does Python not require variable declaration before assignment?',
    answer:
      'Python is dynamically typed. Variable names are simply references (tags or pointers) bound to objects in memory. The type belongs to the object itself, not the variable name.',
    difficulty: 'Beginner',
  },
  {
    id: 'iq-10',
    category: 'Viva & College',
    question: 'What is the difference between `==` and `is` in Python?',
    answer:
      '`==` evaluates value equality (whether the contents or values of two objects are equal). `is` evaluates identity equality (whether both references point to the exact same object in memory, checking `id(a) == id(b)`).',
    codeSnippet: `a = [1, 2]\nb = [1, 2]\nprint(a == b)  # True (same values)\nprint(a is b)  # False (different list objects in memory)`,
    difficulty: 'Beginner',
  },
];

export const InterviewCenterView: React.FC = () => {
  const { setActiveView } = useAcademy();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('iq-1');

  const categories = [
    'All',
    'Core Python',
    'Data Structures',
    'OOP',
    'Advanced',
    'Viva & College',
  ];

  const filtered = INTERVIEW_QUESTIONS.filter((q) => {
    const matchesCat = selectedCat === 'All' || q.category === selectedCat;
    const matchesSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-50 via-white to-sky-50 border border-teal-200/80 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-teal-800 border border-teal-200 mb-2 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-teal-600" />
            <span>Placement & Exam Preparation</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#333333]">
            Interview & Viva Center
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#4F6FAF]">
            Master technical interview questions, conceptual college viva tests, and software engineering placement topics.
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

      {/* 2. Filters & Search */}
      <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search interview questions, keywords (e.g. GIL, memory, OOP, generators)..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-400 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedCat === cat
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Question Accordion List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 select-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-sky-50 text-sky-700 border border-sky-100">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        item.difficulty === 'Beginner'
                          ? 'text-emerald-600'
                          : item.difficulty === 'Intermediate'
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#333333]">
                    {item.question}
                  </h3>
                </div>

                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/40 space-y-3 text-xs leading-relaxed text-slate-700 animate-fadeIn">
                  <p className="mt-3 font-sans">{item.answer}</p>

                  {item.codeSnippet && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                      <div className="px-3 py-1.5 bg-slate-800 text-[10px] font-mono text-slate-300 flex items-center gap-1.5">
                        <Code2 className="w-3 h-3 text-sky-400" />
                        <span>Code Illustration</span>
                      </div>
                      <pre className="p-3.5 bg-slate-900 text-sky-200 font-mono text-[11px] overflow-x-auto">
                        {item.codeSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
