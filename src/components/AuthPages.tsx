import React, { useState } from 'react';
import {
  BookOpen,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Shield,
  GraduationCap,
  ArrowRight,
  Code2,
  Heart,
  PenTool,
  Compass,
  KeyRound,
  Library,
  TreePine,
  Coffee,
  X,
  FileText,
  UserPlus,
  Bookmark,
} from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

type LoginMode = 'student' | 'admin' | 'register';

export const AuthPages: React.FC = () => {
  const {
    login,
    register,
    demoStudentLogin,
    demoAdminLogin,
    showToast,
  } = useAcademy();

  // Mode: 'student' (default login), 'admin' (admin portal), 'register' (student registration)
  const [loginMode, setLoginMode] = useState<LoginMode>('student');

  // Student login inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin login inputs
  const [adminUsername, setAdminUsername] = useState('tirth');
  const [adminPassword, setAdminPassword] = useState('tirth999');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Registration inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Registration success modal
  const [regSuccessModal, setRegSuccessModal] = useState(false);

  // Handle student login submit
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!email.trim()) {
      setLoginError('Please enter your student email address.');
      return;
    }
    if (!password) {
      setLoginError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ok = login(email, password);
      setIsSubmitting(false);
      if (!ok) {
        setLoginError('Invalid student credentials. Try the 1-click demo below.');
      }
    }, 600);
  };

  // Handle admin login submit
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);

    if (!adminUsername.trim() || !adminPassword) {
      setAdminError('Please provide both administrator username and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ok = login(adminUsername, adminPassword);
      setIsSubmitting(false);
      if (!ok) {
        setAdminError('Invalid credentials. Default admin login is tirth / tirth999.');
      }
    }, 600);
  };

  // Handle registration submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regName.trim()) {
      setRegError('Please provide your full student name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please provide a valid email address.');
      return;
    }
    if (regPassword.length < 4) {
      setRegError('Password must be at least 4 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const ok = register(regName, regEmail, regMobile, regPassword);
      setIsSubmitting(false);
      if (ok) {
        setRegSuccessModal(true);
      } else {
        setRegError('Registration could not be completed. Please try again.');
      }
    }, 700);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      showToast('Please enter a valid student email.');
      return;
    }
    setForgotSent(true);
    showToast(`Password recovery link sent to ${forgotEmail}`);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-[#FFFFFF] via-[#EAF6FF] to-[#F5F0FF] text-[#333333] overflow-x-hidden selection:bg-[#BFDFFF] selection:text-[#333333]">
      
      {/* 🌸 FULL-SCREEN EDUCATIONAL BACKGROUND DESIGN */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {/* Soft pastel ambient gradient glow orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#EAF6FF] opacity-80 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-28 w-96 h-96 rounded-full bg-[#F5F0FF] opacity-75 blur-3xl animate-float-reverse" />
        <div className="absolute -bottom-28 left-1/4 w-96 h-96 rounded-full bg-[#FFF4EC] opacity-70 blur-3xl animate-float-slow" />
        <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-[#F0FFF7] opacity-65 blur-3xl animate-float-reverse" />

        {/* Moving Soft Clouds */}
        <div className="absolute top-12 left-10 opacity-75 animate-cloud-drift">
          <svg width="140" height="60" viewBox="0 0 120 50" fill="none">
            <path
              d="M20 40H100C108 40 115 33 115 25C115 17 108 10 100 10C99 10 98 10 97 10C93 4 84 0 74 0C63 0 54 6 51 15C48 13 44 12 40 12C29 12 20 21 20 32C20 33 20 34 20 35C14 36 10 40 10 45"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </div>

        <div className="absolute top-1/2 right-12 opacity-70 animate-cloud-drift-rev">
          <svg width="125" height="52" viewBox="0 0 100 42" fill="none">
            <path
              d="M15 35H85C92 35 98 29 98 22C98 15 92 9 85 9C84 9 83 9 82 9C78 4 70 0 62 0C53 0 45 5 42 13C40 11 36 10 33 10C24 10 16 18 16 27C16 28 16 29 16 30C11 31 8 35 8 39"
              fill="white"
              fillOpacity="0.85"
            />
          </svg>
        </div>

        {/* Gentle Floating Particle Dots */}
        <div className="absolute top-28 left-[22%] w-3 h-3 rounded-full bg-[#BFDFFF] opacity-60 animate-gentle-pulse" />
        <div className="absolute top-64 left-[14%] w-2.5 h-2.5 rounded-full bg-[#FFF4EC] opacity-80 animate-float-slow" />
        <div className="absolute bottom-36 left-[30%] w-3.5 h-3.5 rounded-full bg-[#F5F0FF] opacity-70 animate-float-reverse" />
        <div className="absolute top-36 right-[24%] w-3 h-3 rounded-full bg-[#F0FFF7] opacity-75 animate-gentle-pulse" />
        <div className="absolute bottom-28 right-[18%] w-2.5 h-2.5 rounded-full bg-[#BFDFFF] opacity-70 animate-float-slow" />

        {/* 📚 Floating Open Books Animation (Top Left) */}
        <div className="absolute top-20 left-16 hidden lg:flex items-center gap-3 p-3.5 rounded-3xl bg-white/85 border border-[#BFDFFF] shadow-md shadow-sky-100/50 animate-book-float">
          <div className="w-10 h-10 rounded-2xl bg-[#EAF6FF] text-sky-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-left pr-2">
            <span className="text-[11px] font-bold text-[#333333] block">Python Core</span>
            <span className="text-[9px] text-[#4F6FAF] font-semibold block">Chapters & Lessons</span>
          </div>
        </div>

        {/* 🎓 Floating Graduation Cap & Knowledge Tree (Bottom Left) */}
        <div className="absolute bottom-20 left-16 hidden lg:flex items-center gap-3 p-3.5 rounded-3xl bg-white/85 border border-[#F5F0FF] shadow-md shadow-purple-100/50 animate-book-float-rev">
          <div className="w-10 h-10 rounded-2xl bg-[#F5F0FF] text-purple-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="text-left pr-2">
            <span className="text-[11px] font-bold text-[#333333] block">Knowledge Tree 🌿</span>
            <span className="text-[9px] text-purple-600 font-semibold block">Academic Excellence</span>
          </div>
        </div>

        {/* ✏️ Floating Study Notes & Pencil Sticker (Top Right) */}
        <div className="absolute top-24 right-16 hidden lg:flex items-center gap-3 p-3.5 rounded-3xl bg-white/85 border border-[#FFF4EC] shadow-md shadow-amber-100/50 animate-book-float-rev">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF4EC] text-amber-600 flex items-center justify-center">
            <PenTool className="w-5 h-5" />
          </div>
          <div className="text-left pr-2">
            <span className="text-[11px] font-bold text-[#333333] block">Study Table Notes</span>
            <span className="text-[9px] text-amber-600 font-semibold block"># Clean & Focused</span>
          </div>
        </div>

        {/* 🐍 Floating Python Programming Book Spine (Bottom Right) */}
        <div className="absolute bottom-24 right-16 hidden lg:flex items-center gap-3 p-3.5 rounded-3xl bg-white/85 border border-[#F0FFF7] shadow-md shadow-emerald-100/50 animate-book-float">
          <div className="w-10 h-10 rounded-2xl bg-[#F0FFF7] text-emerald-600 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="text-left pr-2">
            <span className="text-[11px] font-bold text-[#333333] block">Python 3.12</span>
            <span className="text-[9px] text-emerald-600 font-semibold block">Interactive IDE</span>
          </div>
        </div>
      </div>

      {/* 🏫 CENTER LOGIN SECTION: PREMIUM GLASSMORPHISM CARD */}
      <div className="relative z-10 w-full max-w-md my-auto">
        <div className="w-full p-7 sm:p-9 rounded-[32px] glass-card border border-white/90 shadow-2xl shadow-sky-100/80 transition-all duration-300">
          
          {/* TOP: ACADEMY LOGO */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#BFDFFF] via-white to-[#F5F0FF] border-2 border-white shadow-sm text-sky-600 mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>

            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#333333] block">
                Python Learning Academy
              </span>
              <span className="text-[11px] text-[#4F6FAF] font-semibold tracking-wide block">
                Learn Python Step by Step
              </span>
            </div>
          </div>

          {/* BELOW LOGO: SMALL EDUCATIONAL ILLUSTRATION */}
          <div className="my-4 flex justify-center">
            <div className="p-1.5 rounded-2xl bg-white/90 border border-[#BFDFFF]/60 shadow-xs max-w-[240px] flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-2xs shrink-0 border border-white">
                <img
                  src="/src/assets/images/academy_study_centerpiece_1790699150050.jpg"
                  alt="Educational study desk centerpiece"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left pr-2 truncate">
                <span className="text-[11px] font-bold text-[#333333] block truncate">
                  Calm Learning Space
                </span>
                <span className="text-[9px] text-[#4F6FAF] font-semibold block">
                  Notebook & Study Desk
                </span>
              </div>
            </div>
          </div>

          {/* HEADING & SUBHEADING */}
          <div className="text-center mb-5">
            <h1 className="text-2xl font-extrabold text-[#333333] tracking-tight">
              {loginMode === 'student' && 'Welcome Back'}
              {loginMode === 'admin' && 'Administrator Portal'}
              {loginMode === 'register' && 'Create Student Account'}
            </h1>
            <p className="text-xs text-[#4F6FAF] mt-1 font-medium">
              {loginMode === 'student' && 'Continue Your Learning Journey'}
              {loginMode === 'admin' && 'Enter enterprise academy credentials'}
              {loginMode === 'register' && 'Join our aesthetic learning community'}
            </p>
          </div>

          {/* ---------------- 1. STUDENT LOGIN FORM ---------------- */}
          {loginMode === 'student' && (
            <form onSubmit={handleStudentLogin} className="space-y-4">
              {/* Email Address */}
              <div>
                <label className="text-xs font-bold text-[#333333] block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setLoginError(null);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200/90 bg-white/95 text-xs text-[#333333] placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#333333]">Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-[11px] text-[#4F6FAF] hover:text-sky-600 font-semibold cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setLoginError(null);
                    }}
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200/90 bg-white/95 text-xs text-[#333333] placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Option */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200 cursor-pointer"
                  />
                  <span className="text-xs font-medium">Remember Me</span>
                </label>
              </div>

              {/* Error Notification */}
              {loginError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                  {loginError}
                </div>
              )}

              {/* LOGIN BUTTON: Rounded button with soft gradient & smooth hover */}
              <div className="pt-1 space-y-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-sky-200/80 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Logging In...</span>
                    </>
                  ) : (
                    <>
                      <span>LOGIN</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Helpers: Quick 1-Click Demo & Admin Access */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={demoStudentLogin}
                  className="text-[11px] font-semibold text-[#4F6FAF] hover:text-sky-600 flex items-center gap-1 cursor-pointer py-1 px-1.5 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-sky-500" />
                  <span>1-Click Demo (Maya)</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('admin');
                      setLoginError(null);
                    }}
                    className="text-[11px] font-bold text-purple-700 hover:text-purple-800 px-2 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-100 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3 text-purple-600" />
                    <span>Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode('register');
                      setLoginError(null);
                    }}
                    className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ---------------- 2. ADMIN LOGIN FORM ---------------- */}
          {loginMode === 'admin' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#F5F0FF] border border-purple-200 text-xs text-[#333333]">
                <div className="flex items-center gap-1.5 font-bold text-purple-800">
                  <Shield className="w-3.5 h-3.5 text-purple-600" />
                  <span>Academy Super Administrator</span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-slate-700">
                  User: <strong className="text-purple-700">tirth</strong> · Pass: <strong className="text-purple-700">tirth999</strong>
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-[#333333] block mb-1">
                  Admin Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => {
                      setAdminUsername(e.target.value);
                      setAdminError(null);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs text-[#333333] focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#333333] block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showAdminPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setAdminError(null);
                    }}
                    className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs text-[#333333] focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {adminError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
                  {adminError}
                </div>
              )}

              <div className="pt-1 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-600 hover:from-purple-600 hover:to-sky-700 text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-purple-200 transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>LOGIN AS ADMIN</span>
                </button>

                <button
                  type="button"
                  onClick={demoAdminLogin}
                  className="w-full py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold cursor-pointer"
                >
                  1-Click Auto Fill & Sign In
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('student');
                    setAdminError(null);
                  }}
                  className="text-xs text-[#4F6FAF] hover:text-sky-600 font-semibold cursor-pointer"
                >
                  ← Back to Student Login
                </button>
              </div>
            </form>
          )}

          {/* ---------------- 3. REGISTRATION FORM ---------------- */}
          {loginMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#333333] block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Patel"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 bg-white text-xs text-[#333333] focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#333333] block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 bg-white text-xs text-[#333333] focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#333333] block mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-2xl border border-slate-200 bg-white text-xs text-[#333333] focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#333333] block mb-1">Password</label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    placeholder="••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl border border-slate-200 bg-white text-xs text-[#333333] focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#333333] block mb-1">Confirm</label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    placeholder="••••"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl border border-slate-200 bg-white text-xs text-[#333333] focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {regError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
                  {regError}
                </div>
              )}

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-emerald-200 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  CREATE ACCOUNT
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('student');
                    setRegError(null);
                  }}
                  className="w-full py-2 rounded-2xl text-slate-600 hover:text-slate-800 text-xs font-semibold cursor-pointer"
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Quiet footer under the center card */}
        <div className="mt-4 text-center text-[11px] text-slate-400">
          <p>© 2026 Python Learning Academy · Calm, aesthetic educational environment</p>
        </div>
      </div>

      {/* 🔐 FORGOT PASSWORD MODAL */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm p-7 rounded-[28px] glass-card border border-white shadow-2xl relative">
            <button
              onClick={() => {
                setForgotModalOpen(false);
                setForgotSent(false);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-4 top-4 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-[#EAF6FF] text-sky-600 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-[#333333]">Recover Password</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Enter your student email and we'll dispatch a secure recovery link.
            </p>

            <form onSubmit={handleForgotSubmit} className="mt-4 space-y-3">
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-[#333333] focus:outline-none focus:border-sky-400"
              />

              {forgotSent ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Recovery link dispatched! Check your student inbox.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-200 cursor-pointer"
                >
                  Send Recovery Link
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 🎉 REGISTRATION SUCCESS MODAL */}
      {regSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm p-7 rounded-[28px] glass-card border border-emerald-200 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#333333]">Welcome to the Academy!</h3>
              <p className="text-xs text-slate-600 mt-1">
                Your student account has been created. Click below to enter your dashboard.
              </p>
            </div>

            <button
              onClick={() => {
                setRegSuccessModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-200 cursor-pointer"
            >
              Enter Academy Dashboard →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
