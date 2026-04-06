import './App.css';

import { Route, Routes } from 'react-router-dom';

import { NavBar } from './components/NavBar';
import { CourseDetail } from './pages/CourseDetail';
import { Home } from './pages/Home';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
      <footer className="text-center py-8 text-xs text-gray-300">
        CTEC data is for Northwestern students only · Not affiliated with Northwestern
        University
      </footer>
    </div>
  );
}
