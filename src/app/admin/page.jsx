'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    feedback: 0,
    profileViews: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const [servicesRes, feedbackRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/feedback'),
        ]);

        const services = await servicesRes.json();
        const feedback = await feedbackRes.json();

        setStats({
          services: services.length || 0,
          feedback: feedback.length || 0,
          profileViews: 0, // This would come from analytics
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Services Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              🛠️
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Total Services</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.services}</p>
            </div>
          </div>
        </div>

        {/* Feedback Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              💬
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Total Feedback</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.feedback}</p>
            </div>
          </div>
        </div>

        {/* Profile Views Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              👥
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Profile Views</h2>
              <p className="text-2xl font-semibold text-gray-900">{stats.profileViews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/admin/services/new"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              Add New Service
            </a>
            <a
              href="/admin/profile/edit"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Edit Profile
            </a>
            <a
              href="/admin/feedback"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              View Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
