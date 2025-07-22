"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewServicePage = () => {
  const router = useRouter();
  const [service, setService] = useState({
    category: '',
    badge: '',
    badgeColor: '#000000',
    title: '',
    description: '',
    subtitle: '',
    subtitleType: '',
    icon: '',
    price: 0,
    multiplier: '',
    features: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...service,
        features: service.features.split(',').map(f => f.trim()),
      };
      await axios.post('/api/services/add-service', serviceData);
      toast.success('Service added successfully!');
      router.push('/admin/services');
    } catch (error) {
      toast.error('Failed to add service');
      console.error('Failed to add service', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Add New Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" name="category" id="category" value={service.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" id="title" value={service.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" value={service.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        {/* Subtitle */}
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input type="text" name="subtitle" id="subtitle" value={service.subtitle} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        {/* Subtitle Type */}
        <div>
          <label htmlFor="subtitleType" className="block text-sm font-medium text-gray-700">Subtitle Type</label>
          <input type="text" name="subtitleType" id="subtitleType" value={service.subtitleType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        {/* Icon */}
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon (e.g., URL or class name)</label>
          <input type="text" name="icon" id="icon" value={service.icon} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="price" id="price" value={service.price} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        {/* Multiplier */}
        <div>
          <label htmlFor="multiplier" className="block text-sm font-medium text-gray-700">Multiplier (e.g., /month)</label>
          <input type="text" name="multiplier" id="multiplier" value={service.multiplier} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        {/* Badge */}
        <div>
          <label htmlFor="badge" className="block text-sm font-medium text-gray-700">Badge</label>
          <input type="text" name="badge" id="badge" value={service.badge} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
        </div>
        {/* Badge Color */}
        <div>
          <label htmlFor="badgeColor" className="block text-sm font-medium text-gray-700">Badge Color</label>
          <input type="color" name="badgeColor" id="badgeColor" value={service.badgeColor} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        {/* Features */}
        <div>
          <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
          <textarea name="features" id="features" value={service.features} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Add Service</button>
      </form>
    </div>
  );
};

export default NewServicePage; 