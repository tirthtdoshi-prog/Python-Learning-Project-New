import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  Edit2,
  Save,
  GraduationCap,
  Shield,
  Lock,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const ProfileView: React.FC = () => {
  const { currentUser, chapters, updateProfile, setActiveView } = useAcademy();

  if (!currentUser) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [mobile, setMobile] = useState(currentUser.mobileNumber);

  const completedCount = currentUser.completedChapterIds.length;
  const totalChapters = chapters.length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, mobile);
    setIsEditing(false);
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Profile Header Card */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-extrabold shadow-sm ${
            currentUser.role === 'admin'
              ? 'bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-700 border-4 border-purple-200'
              : 'bg-gradient-to-br from-sky-100 to-blue-100 text-sky-700 border-4 border-sky-200'
          }`}>
            {currentUser.role === 'admin' ? (
              <Shield className="w-12 h-12 text-purple-600" />
            ) : (
              <span>
                {currentUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            )}
          </div>
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px]">
            ✓
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{currentUser.name}</h1>
              <p className="text-xs text-sky-600 font-medium">
                {currentUser.role === 'admin' ? 'Academy Administrator' : 'Enrolled Student'}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 self-center sm:self-auto"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Contact Details */}
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {currentUser.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {currentUser.mobileNumber || 'Not provided'}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Joined {currentUser.joinedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <form
          onSubmit={handleSaveProfile}
          className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4"
        >
          <h3 className="text-sm font-bold text-slate-800">Edit Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Mobile Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </form>
      )}

      {/* Learning Statistics Grid */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-4">
          Learning Statistics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <span className="text-2xl font-bold text-slate-800">{completedCount}</span>
            <span className="text-xs text-slate-500 block mt-0.5">Chapters Done</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <span className="text-2xl font-bold text-sky-600">
              {Math.round((completedCount / totalChapters) * 100)}%
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">Overall Progress</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <span className="text-2xl font-bold text-purple-600">
              {Object.keys(currentUser.quizScores).length}
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">Quizzes Taken</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            <span className="text-2xl font-bold text-amber-600">
              {currentUser.certificates.length}
            </span>
            <span className="text-xs text-slate-500 block mt-0.5">Certificates</span>
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-800">
              Academy Credential & Certificate
            </h3>
          </div>
          <button
            onClick={() => setActiveView('certificates')}
            className="text-xs text-sky-600 hover:text-sky-700 font-semibold"
          >
            {completedCount < totalChapters && currentUser.role !== 'admin'
              ? 'View Lock Requirements →'
              : 'Go to Certificate Vault →'}
          </button>
        </div>

        {completedCount < totalChapters && currentUser.role !== 'admin' ? (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Certificate Locked ({completedCount}/{totalChapters} Chapters Cleared)
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Complete all 18 levels on the learning roadmap to unlock and claim your accredited certificate.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveView('learning_path')}
              className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs shrink-0 cursor-pointer"
            >
              Resume Roadmap →
            </button>
          </div>
        ) : currentUser.certificates.length === 0 ? (
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs">
            <p className="text-emerald-800 font-semibold">
              🎉 All 18 chapters cleared! Your certificate is unlocked and ready to claim.
            </p>
            <button
              onClick={() => setActiveView('certificates')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold"
            >
              Claim Now
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {currentUser.certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-800">{cert.courseName}</h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    ID: {cert.certificateId} · Issued {cert.completionDate}
                  </span>
                </div>
                <button
                  onClick={() => setActiveView('certificates')}
                  className="px-3 py-1 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 text-[11px]"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
