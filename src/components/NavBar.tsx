import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../services/firebase';

export const NavBar = () => {
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut(auth);
    navigate('/login');
  }

  return (
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
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};
