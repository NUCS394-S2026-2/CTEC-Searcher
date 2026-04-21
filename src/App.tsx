import './App.css';

import { Route, Routes } from 'react-router-dom';

import { NavBar } from './components/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CourseDetail } from './pages/CourseDetail';
import { EmailLinkHandler } from './pages/EmailLinkHandler';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/verify" element={<EmailLinkHandler />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <NavBar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                </Routes>
                <footer className="text-center py-8 text-xs text-gray-300">
                  CTEC data is for Northwestern students only · Not affiliated with
                  Northwestern University
                </footer>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
