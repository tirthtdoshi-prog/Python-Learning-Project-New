import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Search,
  Bookmark,
  Library,
  Sparkles,
  Layers,
  Code2,
  Terminal,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface BuiltInDoc {
  name: string;
  signature: string;
  category: 'Functions' | 'Methods' | 'Types' | 'Modules';
  desc: string;
  example: string;
}

const BUILT_INS: BuiltInDoc[] = [
  {
    name: 'print()',
    signature: 'print(*objects, sep=" ", end="\\n", file=None, flush=False)',
    category: 'Functions',
    desc: 'Prints objects to the text stream file, separated by sep and followed by end.',
    example: 'print("Hello", "World", sep=" - ") # Hello - World',
  },
  {
    name: 'len()',
    signature: 'len(s) -> int',
    category: 'Functions',
    desc: 'Returns the number of items in a container (string, list, tuple, dictionary, set).',
    example: 'len(["apple", "banana"]) # Returns 2',
  },
  {
    name: 'enumerate()',
    signature: 'enumerate(iterable, start=0)',
    category: 'Functions',
    desc: 'Returns an enumerate object producing pairs containing a count (from start) and the values obtained from iterating over iterable.',
    example: 'for i, val in enumerate(["a", "b"]): print(i, val)',
  },
  {
    name: 'zip()',
    signature: 'zip(*iterables, strict=False)',
    category: 'Functions',
    desc: 'Iterates over several iterables in parallel, producing tuples with an item from each one.',
    example: 'list(zip([1, 2], ["a", "b"])) # [(1, "a"), (2, "b")]',
  },
  {
    name: 'map()',
    signature: 'map(function, iterable, *iterables)',
    category: 'Functions',
    desc: 'Returns an iterator that applies function to every item of iterable, yielding the results.',
    example: 'list(map(lambda x: x * 2, [1, 2, 3])) # [2, 4, 6]',
  },
  {
    name: 'filter()',
    signature: 'filter(function, iterable)',
    category: 'Functions',
    desc: 'Constructs an iterator from those elements of iterable for which function returns True.',
    example: 'list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])) # [2, 4]',
  },
  {
    name: 'dict.get()',
    signature: 'dict.get(key, default=None)',
    category: 'Methods',
    desc: 'Returns the value for key if key is in the dictionary, else default. Never raises KeyError.',
    example: 'user.get("theme", "light") # Safe lookup',
  },
  {
    name: 'list.append()',
    signature: 'list.append(object)',
    category: 'Methods',
    desc: 'Appends object to the end of the list in-place.',
    example: 'items.append("new item")',
  },
];

export const ResourceLibraryView: React.FC = () => {
  const { setActiveView, showToast } = useAcademy();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'dictionary' | 'cheatsheets' | 'downloads' | 'links'>('dictionary');

  const filteredDocs = BUILT_INS.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.desc.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadCheatSheet = (title: string) => {
    showToast(`Downloading "${title}" reference sheet... (PDF generated)`);
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-50 via-white to-purple-50 border border-blue-200/80 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-sky-800 border border-sky-200 mb-2 shadow-2xs">
            <Library className="w-3.5 h-3.5 text-sky-600" />
            <span>Python Academy Resource Library</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#333333]">
            Resource & Reference Library
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#4F6FAF]">
            Built-in Python dictionary, downloadable cheat sheets, official documentation links, and handbook references.
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

      {/* 2. Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('dictionary')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'dictionary'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          📖 Python Built-in Dictionary
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('cheatsheets')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'cheatsheets'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          📋 Quick Revision Cheat Sheets
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('downloads')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'downloads'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          📥 Download Center
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('links')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'links'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          🌐 Reference Websites
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* A. Python Dictionary Tab */}
      {activeTab === 'dictionary' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Python built-in functions, methods (e.g. print, len, map, dict.get)..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-400 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-extrabold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-100">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                <p className="font-mono text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 break-all">
                  {item.signature}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {item.desc}
                </p>

                <div className="p-2.5 bg-slate-900 rounded-xl text-sky-200 font-mono text-[11px] overflow-x-auto">
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* B. Cheat Sheets Tab */}
      {activeTab === 'cheatsheets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-[#333333]">
              🐍 Python Syntax & Operators Quick Cheat Sheet
            </h3>
            <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-700 space-y-1 leading-relaxed">
              <p>• Arithmetic: +, -, *, /, // (floor div), % (modulo), ** (power)</p>
              <p>• Comparisons: ==, !=, &lt;, &gt;, &lt;=, &gt;=</p>
              <p>• Logical: and, or, not</p>
              <p>• Identity & Membership: is, is not, in, not in</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-[#333333]">
              📦 Data Structures Complexity & Methods
            </h3>
            <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-700 space-y-1 leading-relaxed">
              <p>• list: append(), pop(), sort(), reverse() [O(1) append, O(n) search]</p>
              <p>• dict: keys(), values(), items(), get() [O(1) average lookup]</p>
              <p>• set: add(), remove(), union(), intersection() [O(1) lookup]</p>
              <p>• tuple: count(), index() [Immutable, memory compact]</p>
            </div>
          </div>
        </div>
      )}

      {/* C. Downloads Tab */}
      {activeTab === 'downloads' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Complete Python Handbook PDF', size: '2.4 MB', pages: '45 Pages' },
            { title: '18 Chapters Revision Mind-Maps', size: '1.8 MB', pages: '18 Maps' },
            { title: 'Python Coding Formulas & Cheat Sheet', size: '920 KB', pages: '6 Pages' },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <FileText className="w-8 h-8 text-sky-500 mb-2" />
                <h4 className="font-extrabold text-xs text-[#333333]">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  {item.size} • {item.pages}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDownloadCheatSheet(item.title)}
                className="mt-4 w-full py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* D. Reference Links */}
      {activeTab === 'links' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Python Official Documentation (docs.python.org)', url: 'https://docs.python.org/3/' },
            { name: 'PEP 8 – Style Guide for Python Code', url: 'https://peps.python.org/pep-0008/' },
            { name: 'Python Package Index (PyPI)', url: 'https://pypi.org/' },
            { name: 'Python Enhancement Proposals (PEPs)', url: 'https://peps.python.org/' },
          ].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-sky-300 flex items-center justify-between text-xs font-bold text-slate-700 hover:text-sky-700 transition-colors"
            >
              <span>{link.name}</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
