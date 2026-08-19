import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { Product } from '../api/client';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const features = [
  { title: 'Buy IT Books', description: 'Programming, web, mobile and more — affordable prices.', icon: '📚' },
  { title: 'Expert Services', description: 'Web design, tutoring and IT consulting from real experts.', icon: '🛠️' },
  { title: 'Learn Anywhere', description: 'Study at your own pace, anytime and anywhere in Cambodia.', icon: '🌏' },
  { title: 'QR Payment', description: 'Pay easily with local KHQR payment methods.', icon: '📱' },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProducts()
      .then((data) => setProducts(data.items || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <p className="inline-block bg-indigo-600/20 text-indigo-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            🇰🇭 Cambodia's affordable IT book store
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Books &amp; services for
            <span className="text-indigo-400"> every developer</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-lg">
            Discover quality IT books, online courses and professional services —
            learn anytime, anywhere, and pay easily with QR.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition"
            >
              Browse Books
            </Link>
            <Link
              to="/services"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-center text-3xl font-bold text-slate-900 mb-4">
          Why choose us?
        </h2>
        <p className="text-center text-slate-500 mb-12">
          Everything you need for IT education in one place.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Featured books</h2>
              <p className="text-slate-500 mt-1">Hand-picked for developers.</p>
            </div>
            <Link to="/products" className="text-indigo-600 font-semibold hover:text-indigo-500 transition">
              View all →
            </Link>
          </div>

          {loading ? (
            <Spinner />
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No products yet. Add some in the admin panel!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl px-8 py-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">Start learning today</h2>
          <p className="mt-4 text-indigo-100 max-w-xl mx-auto">
            Create a free account and unlock your IT learning journey.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition">
              Create account
            </Link>
            <Link to="/contact" className="bg-white/10 border border-white/30 font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
