import React from 'react';

const stats = [
  { value: '500+', label: 'Book titles' },
  { value: '120+', label: 'Services offered' },
  { value: '2,000+', label: 'Happy students' },
  { value: '24/7', label: 'Online access' },
];

const values = [
  {
    title: 'Affordable education',
    description:
      'We believe IT education should be within reach for every Cambodian student, with fair prices and local payment options.',
    icon: '💸',
  },
  {
    title: 'Quality content',
    description:
      'Every book and service is carefully selected and reviewed by IT professionals who understand the local market.',
    icon: '⭐',
  },
  {
    title: 'Flexible learning',
    description:
      'Study at your own pace — on your phone, tablet or computer, anytime and anywhere.',
    icon: '🕐',
  },
  {
    title: 'Local support',
    description:
      'Our Khmer-speaking team is here to help you with anything from choosing a book to technical support.',
    icon: '🤝',
  },
];

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">About Book Store</h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-lg">
            A Cambodian online bookstore built to make IT education affordable
            and accessible for everyone.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our story</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Traditional learning is often limited by time and location, and many
            existing platforms are too expensive — especially for students in
            Cambodia. We started <strong>Book Store</strong> to change that.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            We offer IT books, courses and professional services on one
            affordable web platform, with support for local <strong>QR code
            payment</strong> so anyone can pay easily.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Whether you are a beginner learning your first programming language
            or a professional looking to sharpen your skills, we are here to
            support your learning journey.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=700&q=60"
          alt="Book store"
          className="rounded-2xl shadow-lg w-full object-cover"
        />
      </section>

      {/* Stats */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold">{s.value}</div>
              <div className="text-indigo-100 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Our values</h2>
        <p className="text-center text-slate-500 mb-12">What we stand for.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
