import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import Alert from '../components/Alert';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResetToken('');
    setLoading(true);
    try {
      const data = await api.forgotPassword(email);
      // Demo mode: the backend returns the reset token so the flow can be tested
      // without an email server.
      setResetToken(data.reset_token);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-2xl font-bold text-slate-900 text-center">Forgot password</h1>
          <p className="text-sm text-slate-500 text-center mt-2 mb-8">
            Enter your email and we'll generate a reset token.
          </p>

          {error && <Alert>{error}</Alert>}

          {resetToken ? (
            <div>
              <Alert type="success">Reset token generated successfully!</Alert>
              <label className="block text-sm font-medium text-slate-700 mb-1">Your reset token (demo mode)</label>
              <textarea readOnly value={resetToken} rows={3} className="w-full rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 px-4 py-2.5 text-xs break-all" />
              <button
                onClick={() => navigate(`/reset-password?token=${encodeURIComponent(resetToken)}`)}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition"
              >
                Continue to reset password →
              </button>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                In production this token would be emailed to you as a reset link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition">
                {loading ? 'Generating...' : 'Generate reset token'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            Remembered it?{' '}
            <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-500">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
