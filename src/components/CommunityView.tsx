import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Sparkles,
  Send,
  HelpCircle,
  Calendar,
  Bell,
  Heart,
  Share2,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

interface Post {
  id: string;
  author: string;
  role: string;
  avatarInitials: string;
  title: string;
  content: string;
  tag: string;
  likes: number;
  repliesCount: number;
  timeAgo: string;
}

export const CommunityView: React.FC = () => {
  const { currentUser, setActiveView, showToast, announcements } = useAcademy();

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'post-1',
      author: 'Maya Patel',
      role: 'Student',
      avatarInitials: 'MP',
      title: 'How do you handle nested list comprehensions cleanly in Python?',
      content:
        'When transposing a matrix, is `[[row[i] for row in matrix] for i in range(4)]` considered pythonic, or should I write out a standard double loop for clarity?',
      tag: 'Code Review',
      likes: 6,
      repliesCount: 3,
      timeAgo: '2 hours ago',
    },
    {
      id: 'post-2',
      author: 'Rohan Sharma',
      role: 'Student',
      avatarInitials: 'RS',
      title: 'Level 16 OOP: Encapsulation vs Private Attributes with double underscores',
      content:
        'I discovered Python actually does name mangling on `__var` -> `_ClassName__var`! Really interesting mechanism to prevent accidental overriding.',
      tag: 'Discovery',
      likes: 12,
      repliesCount: 5,
      timeAgo: 'Yesterday',
    },
  ]);

  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [tag, setTag] = useState('Question');

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionTitle.trim() || !questionBody.trim() || !currentUser) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: currentUser.name,
      role: currentUser.role === 'admin' ? 'Administrator' : 'Student',
      avatarInitials: currentUser.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      title: questionTitle.trim(),
      content: questionBody.trim(),
      tag,
      likes: 0,
      repliesCount: 0,
      timeAgo: 'Just now',
    };

    setPosts([newPost, ...posts]);
    setQuestionTitle('');
    setQuestionBody('');
    showToast('Your question has been posted to the academy community!');
  };

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* 1. Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-50 via-white to-sky-50 border border-purple-200/80 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-bold text-purple-800 border border-purple-200 mb-2 shadow-2xs">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>Python Academy Student Community</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#333333]">
            Discussion Forum & Events
          </h1>

          <p className="mt-1 text-xs sm:text-sm text-[#4F6FAF]">
            Collaborate with peers, ask debugging questions, share solutions, and stay tuned for academy live sessions.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Ask Question & Forum Feed (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ask Question Box */}
          <form
            onSubmit={handlePostQuestion}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4"
          >
            <h3 className="font-extrabold text-sm text-[#333333] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-500" />
              <span>Ask a Question or Share with the Academy</span>
            </h3>

            <input
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder="What is your question or discussion topic?..."
              className="w-full px-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-400 focus:bg-white"
            />

            <textarea
              rows={3}
              value={questionBody}
              onChange={(e) => setQuestionBody(e.target.value)}
              placeholder="Provide background, error message, or code details..."
              className="w-full p-4 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-sky-400 focus:bg-white resize-y"
            />

            <div className="flex items-center justify-between">
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-50 border border-slate-200 text-slate-700"
              >
                <option value="Question">Question</option>
                <option value="Code Review">Code Review</option>
                <option value="Discovery">Discovery</option>
                <option value="Career Prep">Career Prep</option>
              </select>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Question</span>
              </button>
            </div>
          </form>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center border border-sky-200">
                      {post.avatarInitials}
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-800 block">
                        {post.author}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {post.role} • {post.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                    {post.tag}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-[#333333]">
                  {post.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {post.content}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <button
                    type="button"
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
                    <span>{post.likes} Likes</span>
                  </button>

                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                    <span>{post.repliesCount} Responses</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Events & Announcements (1 col) */}
        <div className="space-y-6">
          {/* Upcoming Learning Events */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#333333] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>Upcoming Learning Events</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                <span className="font-bold text-emerald-900 block">
                  Weekly Python Code Jam
                </span>
                <p className="text-[11px] text-slate-600">
                  Saturday 4:00 PM • Live coding challenge on Level 12 (Dictionaries)
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 text-xs space-y-1">
                <span className="font-bold text-sky-900 block">
                  OOP Mentorship Q&A
                </span>
                <p className="text-[11px] text-slate-600">
                  Wednesday 6:00 PM • Deep dive into classes, inheritance, and Python architecture
                </p>
              </div>
            </div>
          </div>

          {/* Academy Notice Board */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#333333] flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Academy Announcements</span>
            </h3>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{ann.title}</span>
                    <span className="text-[10px] text-slate-400">{ann.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
