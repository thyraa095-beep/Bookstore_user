import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../api/client';

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl =
    product.image_url ||
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=60';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={product.name}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-slate-500 mt-1 flex-1 line-clamp-2">
          {product.description || 'No description available.'}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">
            ${Number(product.price).toFixed(2)}
          </span>
          <span className="text-xs text-slate-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <Link
          to={`/products/${product.id}`}
          className="mt-4 text-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
