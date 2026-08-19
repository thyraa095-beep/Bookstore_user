import React, { useState } from 'react';
import api, { ContactCreate } from '../api/client';
import Alert from '../components/Alert';

export default function Contact() {
  const [form, setForm] = useState<ContactCreate>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const update =
    <K extends keyof ContactCreate>(key: K, value: ContactCreate[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.submitContact(form);
      setSuccess('Thank you! Your message has been sent. We will reply soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

  return (
    <div>
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Contact us</h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            Questions about a book, a service or an order? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h2>
          {success && <Alert type="success">{success}</Alert>}
          {error && <Alert type="error">{error}</Alert>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Your name</label>
              <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required className={inputClass} placeholder="Sokha Chan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required className={inputClass} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input type="text" value={form.subject} onChange={(e) => update('subject', e.target.value)} required className={inputClass} placeholder="How can we help?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea value={form.message} onChange={(e) => update('message', e.target.value)} required rows={5} className={inputClass} placeholder="Write your message here..." />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition">
              {loading ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Get in touch</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            <div className="p-6 flex gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <div className="font-semibold text-slate-900">Address</div>
                <div className="text-sm text-slate-500 mt-1">#123 Street 271, Phnom Penh, Cambodia</div>
              </div>
            </div>
            <div className="p-6 flex gap-4">
              <span className="text-2xl">📞</span>
              <div>
                <div className="font-semibold text-slate-900">Phone</div>
                <div className="text-sm text-slate-500 mt-1">+855 12 345 678 (9:00 - 18:00)</div>
              </div>
            </div>
            <div className="p-6 flex gap-4">
              <span className="text-2xl">📧</span>
              <div>
                <div className="font-semibold text-slate-900">Email</div>
                <div className="text-sm text-slate-500 mt-1">hello@bookstore.kh</div>
              </div>
            </div>
            <div className="p-6 flex gap-4">
              <span className="text-2xl">📱</span>
              <div>
                <div className="font-semibold text-slate-900">QR Payment</div>
                <div className="text-sm text-slate-500 mt-1">We support KHQR, ABA, Wing and ACLEDA.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
