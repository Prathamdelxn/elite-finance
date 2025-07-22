'use client'
import ServicesSection from './components/category';
import FeedbackSection from '@/app/components/feedback';
import AboutUs from './components/aboutus';
import HeroSection from './components/herosection';
import { useEffect, useState } from 'react';
export default function Home() {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [adminData, setData] = useState({

  });


  const fetchData = async () => {
    const res = await fetch('/api/admin');
    const data = await res.json();
    console.log("dasf", data);
    setData(data)

  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <main>
       <div className="flex min-h-screen w-full">
       
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="fixed left-4 top-4 z-50 rounded bg-slate-800 p-2 text-white md:hidden"
          >
            ☰ Menu
          </button>

          
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

      
          <div
            className={`fixed inset-y-0 left-0 z-40 w-full max-w-xs bg-slate-50 p-4 transition-transform duration-300 md:relative md:z-auto md:block md:w-[30%] md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center w-full">
              
                <div className="text-center mb-4">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-white shadow-lg border-4 border-white">
                      <img
                        src={adminData.imageUrl || "https://i.pinimg.com/736x/4e/00/9a/4e009ad7cf2c339c46ef5d1644798755.jpg"}
                        width={160}
                        height={160}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />

                    </div>
                  </div>
                </div>

               
                <div className="flex justify-center items-center space-x-3 mb-4">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-md text-center min-w-[50px]">
                    <div className="text-xl font-bold text-gray-800">
                      8
                    </div>
                    <div className="text-xs text-gray-600">Bookings</div>
                  </div>

                  <div className="bg-red-500 rounded-lg px-3 py-2 shadow-md text-center min-w-[70px] relative">
                    <div className="text-white">
                      <div className="flex items-center justify-center mb-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      <div className="text-xs font-semibold">People's</div>
                      <div className="text-xs font-semibold">Choice</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg px-3 py-2 shadow-md text-center min-w-[50px]">
                    <div className="text-xl font-bold text-gray-800">
                      8
                    </div>
                    <div className="text-xs text-gray-600">Bookings</div>
                  </div>
                </div>

                
                <div className="text-center mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {adminData.name}
                  </h1>
                  <p className="text-sm font-semibold text-gray-800">
                    {adminData.title}
                  </p>
                </div>

                
                <div className="text-center">
                  <p className="text-xs text-gray-700 italic leading-relaxed px-2">
                    {adminData.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full ">
            <div className="h-screen overflow-y-auto">
              <div className="p-4 md:pt-4 pt-20"><HeroSection/>
      <ServicesSection/>
      <FeedbackSection/>
      <AboutUs/></div>
            </div>
          </div>
        </div> 
      
    </main>
  );
}
