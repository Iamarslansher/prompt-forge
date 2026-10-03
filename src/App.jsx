import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CurriculumPage from './pages/CurriculumPage';
import ChapterReaderPage from './pages/ChapterReaderPage';
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import AchievementsPage from './pages/AchievementsPage';
import CertificatePage from './pages/CertificatePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Top Header Navbar */}
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Route Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />

            <Route path="/chapters" element={
              <ProtectedRoute>
                <CurriculumPage />
              </ProtectedRoute>
            } />

            <Route path="/chapters/:chapterId" element={
              <ProtectedRoute>
                <ChapterReaderPage />
              </ProtectedRoute>
            } />

            <Route path="/chapters/:chapterId/quiz" element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            } />

            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />

            <Route path="/achievements" element={
              <ProtectedRoute>
                <AchievementsPage />
              </ProtectedRoute>
            } />

            <Route path="/certificate" element={
              <ProtectedRoute>
                <CertificatePage />
              </ProtectedRoute>
            } />

            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Toast Notifications Container */}
      <ToastContainer />

    </div>
  );
}
