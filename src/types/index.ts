export type UserRole = 'student' | 'admin';

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true_false' | 'fill_blank';
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

export interface Quiz {
  id: string;
  chapterId: string;
  chapterStep: number;
  title: string;
  timeLimitSeconds: number;
  questions: QuizQuestion[];
}

export interface CodeExample {
  title: string;
  code: string;
  explanation: string;
}

export interface Assignment {
  title: string;
  problemStatement: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
}

export interface Chapter {
  id: string;
  stepNumber: number; // 1 to 16
  title: string;
  subtitle: string;
  durationMinutes: number;
  videoUrl: string;
  videoTitle: string;
  notes: string;
  examples: CodeExample[];
  practiceTemplate: string;
  practiceExpectedOutput?: string;
  assignment: Assignment;
  quiz: Quiz;
}

export interface Certificate {
  id: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  scorePercent: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Notice' | 'Exam' | 'Holiday' | 'Update';
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  avatar: string;
  role: UserRole;
  completedChapterIds: string[];
  quizScores: Record<string, number>; // quizId -> score %
  submittedAssignments: Record<string, { code: string; date: string }>;
  savedPractices: Record<string, string>; // chapterId -> code
  certificates: Certificate[];
  joinedDate: string;
}
