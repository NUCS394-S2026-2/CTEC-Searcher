import { Link } from 'react-router-dom';

export const NavBar = () => (
  <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
    <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-black text-xs">NU</span>
        </div>
        <div>
          <h1 className="text-lg font-black text-gray-900 leading-none">CTEC Search</h1>
          <p className="text-xs text-gray-400 leading-none mt-0.5">
            Northwestern Course Evaluations
          </p>
        </div>
      </Link>
    </div>
  </header>
);
