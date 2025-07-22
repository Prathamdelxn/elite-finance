// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const navigation = [
//   { name: 'Dashboard', href: '/admin', icon: '📊' },
//   { name: 'Profile', href: '/admin/profile', icon: '👤' },
//   { name: 'Services', href: '/admin/services', icon: '🛠️' },
//   { name: 'Feedback', href: '/admin/feedback', icon: '💬' },
//   // { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
//   {name : 'Hero', href: '/admin/herosection', icon: '🏙️'}
// ];

// export default function AdminNav() {
//   const pathname = usePathname();

//   return (
//     <div className="flex flex-col h-full p-4 bg-slate-900 text-white">
//       <h1 className="text-xl font-bold text-white mb-4">Admin Panel</h1>
//       <nav className="flex-1 space-y-1">
//         {navigation.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
//                 isActive
//                   ? 'bg-orange-500 text-white'
//                   : 'text-slate-300 hover:bg-slate-700 hover:text-white'
//               }`}
//             >
//               <span className="mr-3">{item.icon}</span>
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>
//       {/* Logout Button at the bottom */}
//       <div className="mt-auto flex justify-center pt-4">
//         <button
//           onClick={() => {
//             localStorage.clear();
//             sessionStorage.clear();
//             window.location.href = '/';
//           }}
//           className="w-4/5 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition-all duration-200"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
    
//   );
// } 

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const navigation = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Profile', href: '/admin/profile', icon: '👤' },
  { name: 'Services', href: '/admin/services', icon: '🛠️' },
  { name: 'Feedback', href: '/admin/feedback', icon: '💬' },
  { name: 'Hero', href: '/admin/herosection', icon: '🏙️' },
  {name: 'Top Client', href:'/admin/top',icon:'📊'}
];

export default function AdminNav() {
  const router=useRouter();
  const pathname = usePathname();
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const generatedParticles = [...Array(6)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2
    }));
    setParticles(generatedParticles);
  }, []);

const handleLogout = () => {
   
    localStorage.removeItem('user');
    router.replace('/signin');
  };

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {/* Background with gradient and blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
          <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent"></div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 min-h-0">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl opacity-100"></div>
                )}
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                  isActive 
                    ? 'opacity-0' 
                    : 'opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/5 to-white/10'
                }`}></div>

                {/* Content */}
                <div className="relative z-10 flex items-center w-full">
                  <span className={`text-lg mr-3 transition-transform duration-300 ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                  
                  {/* Active dot indicator */}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </div>

                {/* Ripple effect on click */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-x-full group-active:translate-x-0 transition-transform duration-300"></div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User info section */}
        <div className="flex-shrink-0 mb-6 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">👤</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Admin User</p>
              <p className="text-slate-400 text-xs">Super Administrator</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex-shrink-0 relative">
          <button
            onClick={handleLogout}
            className="group relative w-full py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98] overflow-hidden"
          >
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            
            {/* Button content */}
            <div className="relative z-10 flex items-center justify-center space-x-2">
              <span className="text-lg">🚪</span>
              <span>Logout</span>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-red-400/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Footer decoration */}
        <div className="mt-4 text-center">
          <div className="inline-flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 200}ms`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles effect - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}