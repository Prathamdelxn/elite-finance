'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AdminNav from './AdminNav';

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
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg h-full flex flex-col justify-center">
          {/* Profile Image */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden bg-white shadow-lg border-4 border-white">
                <Image
                  src={adminData?.imageUrl || '/api/placeholder/160/160'}
                  alt={adminData?.name || 'Admin'}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Rating/Achievement Section */}
          <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
            {/* Left Rating */}
            <div className="bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-md text-center min-w-[50px] sm:min-w-[60px]">
              <div className="text-xl sm:text-2xl font-bold text-gray-800">8</div>
              <div className="text-xs text-gray-600">Bookings</div>
            </div>

            {/* Center Achievement */}
            <div className="bg-red-500 rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-md text-center min-w-[70px] sm:min-w-[80px] relative">
              <div className="text-white">
                <div className="flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="text-xs font-semibold">People's</div>
                <div className="text-xs font-semibold">Choice</div>
              </div>
            </div>

            {/* Right Rating */}
            <div className="bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-md text-center min-w-[50px] sm:min-w-[60px]">
              <div className="text-xl sm:text-2xl font-bold text-gray-800">8</div>
              <div className="text-xs text-gray-600">Bookings</div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              {adminData?.name || 'Admin User'}
            </h1>
            
            <div className="space-y-1 sm:space-y-2">
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
                {adminData?.title || 'Administrator'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed px-2">
              {adminData?.description || 'With years of expertise, we provide engineered solutions for individuals and businesses with customized services.'}
            </p>
          </div>

          {/* Error Display */}
          {/* {error && (
            <div className="mt-4 sm:mt-6">
              <div className="p-3 sm:p-4 bg-red-100 text-red-800 rounded-lg text-sm border border-red-200 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="min-w-0">
                  <p className="font-medium">Connection Error</p>
                  <p className="mt-1 opacity-90 break-words">{error}</p>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
}