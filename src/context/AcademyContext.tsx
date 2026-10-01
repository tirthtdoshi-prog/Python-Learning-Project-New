import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Chapter, Announcement, Certificate, Quiz, Assignment } from '../types';
import { INITIAL_CHAPTERS, INITIAL_ANNOUNCEMENTS } from '../data/chaptersData';

export type ActiveView =
  | 'dashboard'
  | 'learning_path'
  | 'chapter'
  | 'video_library'
  | 'practice'
  | 'quizzes'
  | 'assignments'
  | 'projects'
  | 'interview'
  | 'resources'
  | 'achievements'
  | 'planner'
  | 'journal'
  | 'community'
  | 'certificates'
  | 'profile'
  | 'admin';

interface AcademyContextType {
  // Auth state
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (emailOrUser: string, pass: string) => boolean;
  register: (name: string, email: string, mobile: string, pass: string) => boolean;
  logout: () => void;
  demoStudentLogin: () => void;
  demoAdminLogin: () => void;

  // Navigation
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currentChapterId: string;
  setCurrentChapterId: (id: string) => void;
  openChapter: (id: string) => void;
  goToNextChapter: () => void;
  goToPrevChapter: () => void;

  // Curriculum Data
  chapters: Chapter[];
  announcements: Announcement[];
  students: User[];

  // Student progress actions
  completeChapter: (id: string) => void;
  recordQuizScore: (quizId: string, scorePercent: number) => void;
  savePracticeCode: (chapterId: string, code: string) => void;
  submitAssignment: (chapterId: string, code: string) => void;
  claimCertificate: () => Certificate | null;
  updateProfile: (name: string, mobile: string, avatar?: string) => void;

  // Admin actions
  addChapter: (chap: Chapter) => void;
  editChapter: (chap: Chapter) => void;
  deleteChapter: (id: string) => void;
  resetToDefaultCurriculum: () => void;
  addAnnouncement: (ann: Announcement) => void;
  editAnnouncement: (ann: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  updateStudent: (student: User) => void;
  deleteStudent: (id: string) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

// Local Storage Keys for 100% Free Client-Side Persistence
export const PLA_STORAGE_KEYS = {
  USER: 'pla_academy_current_user_v2',
  CHAPTERS: 'pla_academy_chapters_v2',
  STUDENTS: 'pla_academy_students_v2',
  ANNOUNCEMENTS: 'pla_academy_announcements_v2',
  ACTIVE_VIEW: 'pla_academy_active_view_v2',
  CURRENT_CHAPTER: 'pla_academy_current_chapter_v2',
};

const SEED_STUDENT: User = {
  id: 'stu-101',
  name: 'Maya Patel',
  email: 'maya.student@academy.edu',
  mobileNumber: '+91 98765 43210',
  avatar: '',
  role: 'student',
  completedChapterIds: ['step-1', 'step-2', 'step-3', 'step-4'],
  quizScores: {
    'quiz-1': 100,
    'quiz-2': 100,
    'quiz-3': 100,
  },
  submittedAssignments: {
    'step-1': { code: 'print("Hello from Maya")', date: '2026-09-28' },
  },
  savedPractices: {
    'step-1': '# Welcome practice\nprint("Hello Maya!")',
  },
  certificates: [],
  joinedDate: 'September 2026',
};

const SEED_STUDENT_2: User = {
  id: 'stu-102',
  name: 'Rohan Sharma',
  email: 'rohan.s@gmail.com',
  mobileNumber: '+91 98220 12345',
  avatar: '',
  role: 'student',
  completedChapterIds: ['step-1', 'step-2', 'step-3', 'step-4', 'step-5', 'step-6'],
  quizScores: { 'quiz-1': 100, 'quiz-2': 100 },
  submittedAssignments: {},
  savedPractices: {},
  certificates: [],
  joinedDate: 'September 2026',
};

const SEED_STUDENT_3: User = {
  id: 'stu-103',
  name: 'Ananya Verma',
  email: 'ananya.v@school.org',
  mobileNumber: '+91 97110 54321',
  avatar: '',
  role: 'student',
  completedChapterIds: ['step-1', 'step-2', 'step-3'],
  quizScores: { 'quiz-1': 95 },
  submittedAssignments: {},
  savedPractices: {},
  certificates: [],
  joinedDate: 'September 2026',
};

const SEED_ADMIN: User = {
  id: 'admin-1',
  name: 'Tirth Doshi',
  email: 'tirth@academy.edu',
  mobileNumber: '+91 99988 77665',
  avatar: '',
  role: 'admin',
  completedChapterIds: INITIAL_CHAPTERS.map((c) => c.id),
  quizScores: {},
  submittedAssignments: {},
  savedPractices: {},
  certificates: [],
  joinedDate: 'August 2026',
};

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Current User (Auth & Progress State) - Loads from localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(PLA_STORAGE_KEYS.USER) || localStorage.getItem('pla_soft_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn('Error reading currentUser from localStorage:', e);
      return null;
    }
  });

  // 2. Active Navigation View
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    try {
      const saved = localStorage.getItem(PLA_STORAGE_KEYS.ACTIVE_VIEW) as ActiveView;
      if (saved) return saved;
    } catch (e) {}
    return 'dashboard';
  });

  // 3. Current Selected Chapter ID
  const [currentChapterId, setCurrentChapterId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(PLA_STORAGE_KEYS.CURRENT_CHAPTER);
      if (saved) return saved;
    } catch (e) {}
    return 'step-1';
  });

  // 4. Chapters & Course Content (100% LocalStorage Persistence)
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    try {
      const saved = localStorage.getItem(PLA_STORAGE_KEYS.CHAPTERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse chapters from localStorage:', e);
    }
    return INITIAL_CHAPTERS;
  });

  // 5. Announcements (Notice Board Persistence)
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(PLA_STORAGE_KEYS.ANNOUNCEMENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_ANNOUNCEMENTS;
  });

  // 6. Registered Students (Directory Persistence)
  const [students, setStudents] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(PLA_STORAGE_KEYS.STUDENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [SEED_STUDENT, SEED_STUDENT_2, SEED_STUDENT_3];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AUTOMATIC REAL-TIME SYNCHRONIZATION TO LOCALSTORAGE
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(PLA_STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(PLA_STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error('Failed to sync currentUser to localStorage:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(PLA_STORAGE_KEYS.CHAPTERS, JSON.stringify(chapters));
    } catch (e) {
      console.error('Failed to sync chapters to localStorage:', e);
    }
  }, [chapters]);

  useEffect(() => {
    try {
      localStorage.setItem(PLA_STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to sync students to localStorage:', e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(PLA_STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.error('Failed to sync announcements to localStorage:', e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(PLA_STORAGE_KEYS.ACTIVE_VIEW, activeView);
    } catch (e) {}
  }, [activeView]);

  useEffect(() => {
    try {
      localStorage.setItem(PLA_STORAGE_KEYS.CURRENT_CHAPTER, currentChapterId);
    } catch (e) {}
  }, [currentChapterId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const login = (emailOrUser: string, pass: string): boolean => {
    const trimmedUser = emailOrUser.trim().toLowerCase();

    // Check Super Admin credentials (username: tirth, password: tirth999)
    if (
      (trimmedUser === 'tirth' || trimmedUser === 'tirth@academy.edu') &&
      pass === 'tirth999'
    ) {
      setCurrentUser(SEED_ADMIN);
      setActiveView('admin');
      showToast('Welcome back, Admin Tirth! Academy management unlocked.');
      return true;
    }

    // Check student credentials
    const matched = students.find(
      (s) => s.email.toLowerCase() === trimmedUser || s.name.toLowerCase() === trimmedUser
    );
    if (matched) {
      setCurrentUser(matched);
      setActiveView('dashboard');
      showToast(`Welcome back, ${matched.name}! Happy studying.`);
      return true;
    }

    // If new student credentials supplied for testing
    if (trimmedUser && pass) {
      const newUser: User = {
        id: `stu-${Date.now()}`,
        name: emailOrUser.split('@')[0] || 'Student',
        email: emailOrUser.includes('@') ? emailOrUser : `${emailOrUser}@student.edu`,
        mobileNumber: '+91 98765 00000',
        avatar: '',
        role: 'student',
        completedChapterIds: ['step-1'],
        quizScores: {},
        submittedAssignments: {},
        savedPractices: {},
        certificates: [],
        joinedDate: 'September 2026',
      };
      setStudents((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
      setActiveView('dashboard');
      showToast(`Welcome to Python Learning Academy, ${newUser.name}!`);
      return true;
    }

    return false;
  };

  const register = (name: string, email: string, mobile: string, pass: string): boolean => {
    if (!name.trim() || !email.trim() || !pass.trim()) return false;

    const newUser: User = {
      id: `stu-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      mobileNumber: mobile.trim() || '+91 90000 00000',
      avatar: '',
      role: 'student',
      completedChapterIds: [],
      quizScores: {},
      submittedAssignments: {},
      savedPractices: {},
      certificates: [],
      joinedDate: 'September 2026',
    };

    setStudents((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setActiveView('dashboard');
    showToast(`Account created successfully! Welcome, ${newUser.name}.`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('dashboard');
    showToast('Logged out safely. See you soon!');
  };

  const demoStudentLogin = () => {
    setCurrentUser(SEED_STUDENT);
    setActiveView('dashboard');
    showToast('Signed in as student Maya Patel.');
  };

  const demoAdminLogin = () => {
    setCurrentUser(SEED_ADMIN);
    setActiveView('admin');
    showToast('Signed in as Super Administrator Tirth.');
  };

  const openChapter = (id: string) => {
    setCurrentChapterId(id);
    setActiveView('chapter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextChapter = () => {
    const idx = chapters.findIndex((c) => c.id === currentChapterId);
    if (idx >= 0 && idx < chapters.length - 1) {
      openChapter(chapters[idx + 1].id);
    } else {
      showToast('You have reached the final chapter! Visit Certificates to celebrate.');
      setActiveView('certificates');
    }
  };

  const goToPrevChapter = () => {
    const idx = chapters.findIndex((c) => c.id === currentChapterId);
    if (idx > 0) {
      openChapter(chapters[idx - 1].id);
    }
  };

  const completeChapter = (id: string) => {
    if (!currentUser) return;
    if (currentUser.completedChapterIds.includes(id)) {
      showToast('Chapter already completed! Reviewing notes always helps.');
      return;
    }

    const updated = [...currentUser.completedChapterIds, id];
    const updatedUser = { ...currentUser, completedChapterIds: updated };
    setCurrentUser(updatedUser);
    setStudents((prev) => prev.map((s) => (s.id === updatedUser.id ? updatedUser : s)));
    showToast('🌸 Wonderful progress! Chapter marked as completed.');
  };

  const recordQuizScore = (quizId: string, scorePercent: number) => {
    if (!currentUser) return;
    const updatedScores = { ...currentUser.quizScores, [quizId]: scorePercent };
    const updatedUser = { ...currentUser, quizScores: updatedScores };
    setCurrentUser(updatedUser);
    setStudents((prev) => prev.map((s) => (s.id === updatedUser.id ? updatedUser : s)));
    showToast(`Quiz completed! You scored ${scorePercent}%.`);
  };

  const savePracticeCode = (chapterId: string, code: string) => {
    if (!currentUser) return;
    const updatedPractices = { ...currentUser.savedPractices, [chapterId]: code };
    const updatedUser = { ...currentUser, savedPractices: updatedPractices };
    setCurrentUser(updatedUser);
    setStudents((prev) => prev.map((s) => (s.id === updatedUser.id ? updatedUser : s)));
    showToast('Practice code saved to your student workbook.');
  };

  const submitAssignment = (chapterId: string, code: string) => {
    if (!currentUser) return;
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const updatedAssignments = {
      ...currentUser.submittedAssignments,
      [chapterId]: { code, date: dateStr },
    };
    const updatedUser = { ...currentUser, submittedAssignments: updatedAssignments };
    setCurrentUser(updatedUser);
    setStudents((prev) => prev.map((s) => (s.id === updatedUser.id ? updatedUser : s)));
    showToast('Assignment submitted successfully for instructor review!');
  };

  const claimCertificate = (): Certificate | null => {
    if (!currentUser) return null;

    // Must complete all chapters to unlock certificate (Admin can also test)
    const isAllClear = currentUser.completedChapterIds.length >= chapters.length;
    if (!isAllClear && currentUser.role !== 'admin') {
      showToast(
        `🔒 Certificate is locked! Complete all ${chapters.length} chapters to unlock. (${currentUser.completedChapterIds.length}/${chapters.length} done)`
      );
      return null;
    }

    const already = currentUser.certificates.find((c) => c.courseName.includes('Python'));
    if (already) return already;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      studentName: currentUser.name,
      courseName: 'Python Programming Mastery & Academy Capstone',
      completionDate: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      certificateId: `PLA-PY-${Math.floor(100000 + Math.random() * 900000)}`,
      scorePercent: 98,
    };

    const updatedUser = {
      ...currentUser,
      certificates: [...currentUser.certificates, newCert],
    };
    setCurrentUser(updatedUser);
    setStudents((prev) => prev.map((s) => (s.id === updatedUser.id ? updatedUser : s)));
    showToast('🎉 Congratulations! Your verified Certificate has been unlocked and generated.');
    return newCert;
  };

  const updateProfile = (name: string, mobile: string, avatar?: string) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      name,
      mobileNumber: mobile,
      avatar: avatar || currentUser.avatar,
    };
    setCurrentUser(updatedUser);
    setStudents((prev) => prev.map((s) => (s.id === updatedUser.id ? updatedUser : s)));
    showToast('Profile information updated.');
  };

  // Admin CRUD
  const addChapter = (chap: Chapter) => {
    setChapters((prev) => [...prev, chap]);
    showToast(`Chapter "${chap.title}" added to curriculum.`);
  };

  const editChapter = (chap: Chapter) => {
    setChapters((prev) => prev.map((c) => (c.id === chap.id ? chap : c)));
    showToast(`Chapter "${chap.title}" updated.`);
  };

  const deleteChapter = (id: string) => {
    setChapters((prev) => {
      const remaining = prev.filter((c) => c.id !== id);
      return remaining.map((c, idx) => ({
        ...c,
        stepNumber: idx + 1,
      }));
    });
    if (currentChapterId === id) {
      setCurrentChapterId('step-1');
    }
    showToast('Chapter removed from curriculum.');
  };

  const resetToDefaultCurriculum = () => {
    setChapters(INITIAL_CHAPTERS);
    try {
      localStorage.setItem(PLA_STORAGE_KEYS.CHAPTERS, JSON.stringify(INITIAL_CHAPTERS));
    } catch (e) {}
    showToast('Curriculum reset to default 18-step master template.');
  };

  const addAnnouncement = (ann: Announcement) => {
    setAnnouncements((prev) => [ann, ...prev]);
    showToast('Notice published to student notice boards.');
  };

  const editAnnouncement = (ann: Announcement) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === ann.id ? ann : a)));
    showToast('Notice updated.');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast('Notice deleted.');
  };

  const updateStudent = (student: User) => {
    setStudents((prev) => prev.map((s) => (s.id === student.id ? student : s)));
    if (currentUser?.id === student.id) {
      setCurrentUser(student);
    }
    showToast(`Student record for ${student.name} updated.`);
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast('Student record removed.');
  };

  return (
    <AcademyContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        register,
        logout,
        demoStudentLogin,
        demoAdminLogin,
        activeView,
        setActiveView,
        currentChapterId,
        setCurrentChapterId,
        openChapter,
        goToNextChapter,
        goToPrevChapter,
        chapters,
        announcements,
        students,
        completeChapter,
        recordQuizScore,
        savePracticeCode,
        submitAssignment,
        claimCertificate,
        updateProfile,
        addChapter,
        editChapter,
        deleteChapter,
        resetToDefaultCurriculum,
        addAnnouncement,
        editAnnouncement,
        deleteAnnouncement,
        updateStudent,
        deleteStudent,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
