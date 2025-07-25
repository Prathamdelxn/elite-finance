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
      {/* Sidebar: always visible on desktop, overlay on mobile */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-96 bg-slate-900 z-30">
        <AdminSidebar />
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay to close sidebar */}
          <div className="absolute inset-0 bg-gray-500/50" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative w-full max-w-xs sm:max-w-sm h-full bg-slate-900 shadow-2xl z-10">
            <AdminSidebar />
          </div>
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