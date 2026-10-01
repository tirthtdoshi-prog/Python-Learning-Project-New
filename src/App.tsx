/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { AuthPages } from './components/AuthPages';
import { Navbar } from './components/Navbar';
import { StudentHomeDashboard } from './components/StudentHomeDashboard';
import { LearningPathView } from './components/LearningPathView';
import { ChapterPageView } from './components/ChapterPageView';
import { PracticeSection } from './components/PracticeSection';
import { QuizSection } from './components/QuizSection';
import { AssignmentsView } from './components/AssignmentsView';
import { CertificateView } from './components/CertificateView';
import { ProfileView } from './components/ProfileView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { VideoLibraryView } from './components/VideoLibraryView';
import { ProjectStudioView } from './components/ProjectStudioView';
import { InterviewCenterView } from './components/InterviewCenterView';
import { ResourceLibraryView } from './components/ResourceLibraryView';
import { AchievementCenterView } from './components/AchievementCenterView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { LearningJournalView } from './components/LearningJournalView';
import { CommunityView } from './components/CommunityView';
import { EducationalBackground } from './components/EducationalBackground';
import { Toast } from './components/Toast';

const AcademyApp: React.FC = () => {
  const { isAuthenticated, activeView } = useAcademy();

  // FIRST PAGE: If user is not signed in, show the Login Page first per requirement
  if (!isAuthenticated) {
    return (
      <>
        <EducationalBackground />
        <AuthPages />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50/15 via-sky-50/25 to-purple-50/25 text-slate-800 antialiased selection:bg-sky-200 selection:text-sky-900 relative">
      {/* Educational Ambient Background with floating elements */}
      <EducationalBackground />

      {/* Top Header Navigation (replaces left slide/side part) */}
      <Navbar />

      {/* Main Viewport */}
      <main className="flex-1 overflow-y-auto w-full">
        {activeView === 'dashboard' && <StudentHomeDashboard />}
        {activeView === 'learning_path' && <LearningPathView />}
        {activeView === 'chapter' && <ChapterPageView />}
        {activeView === 'video_library' && <VideoLibraryView />}
        {activeView === 'practice' && <PracticeSection />}
        {activeView === 'quizzes' && <QuizSection />}
        {activeView === 'assignments' && <AssignmentsView />}
        {activeView === 'projects' && <ProjectStudioView />}
        {activeView === 'interview' && <InterviewCenterView />}
        {activeView === 'resources' && <ResourceLibraryView />}
        {activeView === 'achievements' && <AchievementCenterView />}
        {activeView === 'planner' && <StudyPlannerView />}
        {activeView === 'journal' && <LearningJournalView />}
        {activeView === 'community' && <CommunityView />}
        {activeView === 'certificates' && <CertificateView />}
        {activeView === 'profile' && <ProfileView />}
        {activeView === 'admin' && <AdminDashboardView />}
      </main>

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AcademyProvider>
      <AcademyApp />
    </AcademyProvider>
  );
}
