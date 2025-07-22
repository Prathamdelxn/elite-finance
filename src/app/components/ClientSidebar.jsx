'use client';

import dynamic from 'next/dynamic';

const AdminSidebar = dynamic(() => import('./sidebar').then(mod => mod.AdminSidebar), {
  ssr: false,
  loading: () => (
    <div className="w-1/3 h-screen fixed top-0 left-0 overflow-y-auto bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 border-r border-slate-200/60 shadow-2xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  ),
});

export default function ClientSidebar() {
  return <AdminSidebar />;
} 