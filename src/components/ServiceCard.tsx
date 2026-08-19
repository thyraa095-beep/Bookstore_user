import React from 'react';
import { Service } from '../api/client';

export default function ServiceCard({ service }: { service: Service }) {
  const imageUrl =
    service.image_url ||
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=60';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition">
      <img src={imageUrl} alt={service.title} className="h-44 w-full object-cover" loading="lazy" />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-900 line-clamp-1">{service.title}</h3>
        <p className="text-sm text-slate-500 mt-1 flex-1 line-clamp-2">
          {service.description || 'No description available.'}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">${Number(service.price).toFixed(2)}</span>
          {service.duration && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
              {service.duration}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
