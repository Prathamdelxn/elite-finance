'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import HeroSection from './herosection';

const AdminSidebar = dynamic(() => import('./sidebar'), {
  ssr: false,
  loading: () => (
    <div className="fixed left-0 top-0 w-full bg-gray-50 flex items-center justify-center h-screen z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  ),
});

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded bg-slate-900 text-white shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar: always visible on desktop, overlay on mobile */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-96 bg-slate-900 z-30">
        <AdminSidebar />
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-80 max-w-full h-full bg-slate-900 shadow-2xl">
            <AdminSidebar />
          </div>
          {/* Overlay to close sidebar */}
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)}></div>
        </div>
      )}

      {/* Main content: HeroSection always visible, children below */}
      <main className="flex-1 md:ml-96">
        {!pathname.startsWith('/admin') && pathname !== '/signin' && <HeroSection />}
        {children}
      </main>
    </div>
  );
} 