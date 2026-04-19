import { isSignInWithEmailLink, sendSignInLinkToEmail } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../services/firebase';

const ACTION_CODE_SETTINGS = {
  url: window.location.origin + '/auth/verify',
  handleCodeInApp: true,
};

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      navigate('/auth/verify');
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email.toLowerCase().endsWith('@u.northwestern.edu')) {
      setError('Only @u.northwestern.edu email addresses can access CTECS.');
      return;
    }

    setLoading(true);
    try {
      await sendSignInLinkToEmail(auth, email, ACTION_CODE_SETTINGS);
      window.localStorage.setItem('emailForSignIn', email);
      setSent(true);
    } catch {
      setError('Failed to send sign-in link. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">CTEC Searcher</h1>
        <p className="text-sm text-gray-500 mb-8">
          Northwestern University Course Evaluations
        </p>

        {sent ? (
          <div className="text-center">
            <div className="text-4xl mb-4">📬</div>
            <p className="text-gray-700 font-medium mb-2">Check your inbox</p>
            <p className="text-sm text-gray-500">
              A sign-in link was sent to <span className="font-medium">{email}</span>.
              Click the link in your email to continue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Northwestern email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@u.northwestern.edu"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? 'Sending…' : 'Send sign-in link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
