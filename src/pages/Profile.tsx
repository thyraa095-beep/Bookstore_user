import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

export default function Profile() {
  const { user, loading, logout } = useAuth();

  if (loading) return <Spinner size="lg" />;
  if (!user) return <Navigate to="/login" replace />;

  const infoRows = [
    { label: 'Full name', value: user.full_name },
    { label: 'Email', value: user.email },
    { label: 'Username', value: user.username },
    { label: 'Role', value: user.role },
    { label: 'Member since', value: new Date(user.created_at).toLocaleDateString() },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-10 text-white">
          <div className="flex items-center gap-5">
            <span className="h-20 w-20 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-3xl font-bold">
              {user.full_name?.charAt(0).toUpperCase() || 'U'}
            </span>
            <div>
              <h1 className="text-2xl font-bold">{user.full_name}</h1>
              <p className="text-indigo-100 text-sm">{user.email}</p>
              <span className="mt-2 inline-block text-xs font-semibold bg-white/20 px-3 py-1 rounded-full capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Account details</h2>
          <dl className="divide-y divide-slate-100 border border-slate-200 rounded-xl">
            {infoRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                <dt className="text-sm text-slate-500">{row.label}</dt>
                <dd className="text-sm font-medium text-slate-900">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/forgot-password"
              className="flex-1 text-center border border-slate-300 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition"
            >
              Change password
            </Link>
            <button
              onClick={logout}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
