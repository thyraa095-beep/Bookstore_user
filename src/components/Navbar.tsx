import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkClass = ({ isActive }: { isActive: boolean }): string =>
  `px-3 py-2 text-sm font-medium rounded-lg transition ${
    isActive
      ? 'text-white bg-indigo-600'
      : 'text-slate-200 hover:text-white hover:bg-slate-700'
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
              B
            </span>
            <span className="text-white font-bold text-lg tracking-tight">
              Book<span className="text-indigo-400">Store</span>
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/services" className={linkClass}>Services</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </div>

          {/* Desktop auth area */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-full bg-slate-800 pl-1 pr-4 py-1 hover:bg-slate-700 transition"
                >
                  <span className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user.full_name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                  <span className="text-sm text-white font-medium max-w-[140px] truncate">
                    {user.full_name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium rounded-lg bg-slate-700 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white hover:text-indigo-300 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-200 p-2 rounded-lg hover:bg-slate-700"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-700 px-4 pb-4 pt-2 space-y-1">
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>Products</NavLink>
          <NavLink to="/services" className={linkClass} onClick={() => setOpen(false)}>Services</NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Contact</NavLink>
          <div className="pt-3 border-t border-slate-700 flex gap-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
