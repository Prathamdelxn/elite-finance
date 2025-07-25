'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AdminNav from './AdminNav';
import { useRouter } from 'next/navigation';
import UserProfileCard from './UserProfileCard';

const DEFAULT_ADMIN = {
  name: 'Admin User',
  title: 'Administrator',
  imageUrl: '',
  description: 'Experienced administrator focused on system security and operational efficiency.',
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const [adminData, setAdminData] = useState(DEFAULT_ADMIN);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!pathname.startsWith('/admin')) {
      fetchAdminData();
    }
  }, [pathname]);

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch admin data');
      }
      
      console.log('Sidebar: Fetched admin data:', data);
      setAdminData(data || DEFAULT_ADMIN);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a function to refresh admin data
  const refreshAdminData = () => {
    setLoading(true);
    fetchAdminData();
  };

  // Listen for storage events to refresh when admin data is updated
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'adminDataUpdated') {
        console.log('Sidebar: Admin data updated, refreshing...');
        refreshAdminData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  if (pathname.startsWith('/admin')) {
    return <AdminNav />;
  }

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#F1F8E9] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-300"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-600 absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <p className="text-base font-medium text-orange-800">Loading profile</p>
            <div className="flex space-x-1 mt-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#F1F8E9] flex flex-col overflow-hidden">
      {/* Admin Login Button for mobile menu */}
      <div className="p-4 border-b border-gray-200 flex justify-end md:justify-center">
        <button
          onClick={() => router.push('/signin')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
        >
          Admin Login
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        {/* Overlay for mobile */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-gray-600/50 z-30 md:hidden transition-opacity duration-300"
            onClick={toggleMobileMenu}
          ></div>
        )}
      </div>
    </div>
  );
}