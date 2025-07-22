'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Package } from 'lucide-react';

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/services/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Service not found');
        return res.json();
      })
      .then(data => setService(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Package className="w-12 h-12 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      {service.badge && (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${service.badgeColor}`}>{service.badge}</span>
      )}
      <p className="text-lg text-gray-700 mb-4">{service.description}</p>
      <div className="mb-4">
        <span className="font-semibold">Category:</span> {service.category}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Price:</span> <span className="text-2xl font-bold text-orange-600">{service.price}</span>
      </div>
      {service.features && service.features.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Features:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {service.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      {service.subtitle && (
        <div className="mb-2">
          <span className="font-semibold">Subtitle:</span> {service.subtitle}
        </div>
      )}
      {service.subtitleType && (
        <div className="mb-2">
          <span className="font-semibold">Type:</span> {service.subtitleType}
        </div>
      )}
      {service.multiplier && (
        <div className="mb-2">
          <span className="font-semibold">Multiplier:</span> {service.multiplier}
        </div>
      )}
    </div>
  );
} 