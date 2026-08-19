import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { Product } from '../api/client';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getProduct(Number(id))
      .then(setProduct)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner size="lg" />;

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <Alert>{error || 'Product not found.'}</Alert>
        <Link to="/products" className="text-indigo-600 font-semibold hover:underline">
          ← Back to products
        </Link>
      </div>
    );
  }

  const imageUrl =
    product.image_url ||
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&q=60';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/products" className="text-indigo-600 font-semibold hover:underline text-sm">
        ← Back to products
      </Link>

      <div className="mt-6 grid md:grid-cols-2 gap-10">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-extrabold text-indigo-600">
              ${Number(product.price).toFixed(2)}
            </span>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                product.stock > 0
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Description</h2>
            <p className="text-slate-600 leading-relaxed">
              {product.description || 'No description available for this product.'}
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              disabled={product.stock <= 0}
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white font-semibold py-3.5 rounded-xl transition"
            >
              Add to cart
            </button>
            <button className="flex-1 bg-slate-900 hover:bg-slate-700 text-white font-semibold py-3.5 rounded-xl transition">
              Buy now
            </button>
          </div>

          <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
            💳 Pay with KHQR / ABA / Wing / ACLEDA at checkout.
          </div>
        </div>
      </div>
    </div>
  );
}
