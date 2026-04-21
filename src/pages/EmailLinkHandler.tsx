import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../services/firebase';

export function EmailLinkHandler() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      navigate('/login');
      return;
    }

    let email = window.localStorage.getItem('emailForSignIn');

    if (!email) {
      email = window.prompt('Please enter your Northwestern email to confirm sign-in:');
    }

    if (!email) {
      setError('Email is required to complete sign-in.');
      return;
    }

    signInWithEmailLink(auth, email, window.location.href)
      .then(() => {
        window.localStorage.removeItem('emailForSignIn');
        navigate('/');
      })
      .catch(() => {
        setError('Sign-in link is invalid or expired. Please request a new one.');
      });
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-md text-center">
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="text-purple-700 text-sm font-medium hover:underline"
          >
            Back to sign-in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-sm text-gray-500">Signing you in…</p>
    </div>
  );
}
