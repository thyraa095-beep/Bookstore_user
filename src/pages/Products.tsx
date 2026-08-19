import React, { useEffect, useState } from 'react';
import api, { Product } from '../api/client';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api
      .getProducts()
      .then((data) => setProducts(data.items || []))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold">Books &amp; products</h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl">
            From beginner guides to advanced references — find the book that fits your level.
          </p>
          <div className="mt-8 max-w-lg">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search by title..."
              className="w-full rounded-xl border-0 bg-white/10 backdrop-blur text-white placeholder-slate-400 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            {products.length === 0
              ? 'No products yet. Check back soon!'
              : 'No products match your search.'}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
