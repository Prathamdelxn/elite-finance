'use client';

import { useState, useEffect } from 'react';

export default function TestAdminPage() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      console.log('Test page: Fetched admin data:', data);
      setAdminData(data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const updateAdminData = async () => {
    try {
      const testData = {
        name: 'Test Admin ' + Date.now(),
        title: 'Test Title',
        imageUrl: '',
        details: 'Test Details',
        description: 'Test Description'
      };

      const res = await fetch('/api/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const result = await res.json();
      console.log('Test page: Update result:', result);

      if (res.ok) {
        // Refresh the data
        await fetchAdminData();
      }
    } catch (err) {
      console.error('Error updating admin data:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Data Test</h1>
      
      <button
        onClick={updateAdminData}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Admin Data
      </button>

      <button
        onClick={fetchAdminData}
        className="mb-4 ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Refresh Data
      </button>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Current Admin Data:</h2>
        <pre className="text-sm">{JSON.stringify(adminData, null, 2)}</pre>
      </div>
    </div>
  );
} 