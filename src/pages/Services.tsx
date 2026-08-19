import React, { useEffect, useState } from 'react';
import api, { Service } from '../api/client';
import ServiceCard from '../components/ServiceCard';
import Spinner from '../components/Spinner';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getServices()
      .then((data) => setServices(data.items || []))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Our services</h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            Professional IT services delivered by experienced instructors and developers.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No services available yet. Check back soon!
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
