import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">B</span>
            <span className="text-white font-bold text-lg">Book<span className="text-indigo-400">Store</span></span>
          </div>
          <p className="text-sm leading-relaxed">
            Your affordable online bookstore for IT books, courses and services.
            Learn anytime, anywhere.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
            <li><Link to="/products" className="hover:text-indigo-400 transition">Products</Link></li>
            <li><Link to="/services" className="hover:text-indigo-400 transition">Services</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-indigo-400 transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-indigo-400 transition">Register</Link></li>
            <li><Link to="/forgot-password" className="hover:text-indigo-400 transition">Forgot password</Link></li>
            <li><Link to="/profile" className="hover:text-indigo-400 transition">My profile</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>📧 hello@bookstore.kh</li>
            <li>📞 +855 12 345 678</li>
            <li>📍 Phnom Penh, Cambodia</li>
            <li>💳 QR payment supported</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Book Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
