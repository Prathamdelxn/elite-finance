'use client';

import { Linkedin, Star, Users, Award, ArrowRight, CheckCircle, Shield, Clock, TrendingUp, Sparkles, Zap, Trophy, ExternalLink, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Banknote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RazorpayPayment from './RazorpayPayment';
import UserProfileCard from './UserProfileCard';

export default function HeroSection() {
  // Static advertisement images
  const staticAdImages = [
    // { 
    //   id: 1, 
    //   src: 'https://via.placeholder.com/600x400/FF6B6B/FFFFFF?text=Personal+Loans+%7C+Quick+Approval',
    // },
  ];

  // Bank icons data
  const bankIcons = [
    { name: 'HDFC', logo: '/bank/HDFC.png' },
    { name: 'ICICI', logo: '/bank/icici-bank-vector-logo.png' },
    { name: 'Axis', logo: '/bank/Axis_Bank_Logo.svg.png' },
    { name: 'Kotak', logo: '/bank/images.png' },
    { name: 'YES Bank', logo: '/bank/yes.png' },
    { name: 'PNB', logo: '/bank/pnb.png' },
    { name: 'IndusInd', logo: '/bank/ind-card-1.jpg' },
    { name: 'Federal', logo: '/bank/fed.png' },
    { name: 'Fibe', logo: '/bank/Fibe_Logo.jpg' },
    { name: 'Finnable', logo: '/bank/finnable.png' },
    { name: 'Bajaj Finserv', logo: '/bank/Bajaj_Finserv_Logo.svg.png' },
    { name: 'IDFC First', logo: '/bank/idfc-first-bank8846.jpg' },
    { name: 'Bandhan', logo: '/bank/bandhan-bank3983.jpg' },
  ];

  const [adImages, setAdImages] = useState(staticAdImages);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
const [Id, setID] = useState('687f59b6d9c23041f0d75eb0');
const [topData,settopData]=useState();
  const [showContact, setShowContact] = useState(false);
  const [adminData, setAdminData] = useState({
    name: 'Admin User',
    title: 'Administrator',
    imageUrl: '',
    description: 'Experienced administrator focused on system security and operational efficiency.',
  });

  useEffect(() => {
    // Fetch admin data for mobile user card
    fetch('/api/admin')
      .then(res => res.json())
      .then(data => setAdminData(data || adminData))
      .catch(() => {});
  }, []);
  const fetchData = async () => {
    
    try {
      const res = await fetch(`/api/top/fetch/${Id}`);
      const data = await res.json();
      console.log(data);
      
      settopData(data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
     
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // Fetch the latest hero ads from the API
    const fetchAd = () => {
      fetch('/api/hero-ad')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.heroAdImages) && data.heroAdImages.length > 0) {
            const dynamicAds = data.heroAdImages.map((img, idx) => ({
              id: `dynamic-${idx}`,
              src: img,
              offer: ''
            }));
            setAdImages([...dynamicAds, ...staticAdImages]);
          } else {
            setAdImages(staticAdImages);
          }
        })
        .catch(() => setAdImages(staticAdImages));
    };
    fetchAd();
    const interval = setInterval(fetchAd, 10000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll advertisement images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [adImages.length]);

  const nextAd = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adImages.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex - 1 + adImages.length) % adImages.length);
  };

  const router = useRouter();

  return (
    <section className="relative w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* User Profile Card for mobile */}
      <div className="block md:hidden">
        <UserProfileCard adminData={adminData} />
      </div>
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic gradient orbs - Proper responsive sizes */}
        <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-300/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-10 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-gradient-to-br from-purple-300/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-10 right-1/4 w-36 h-36 sm:w-52 sm:h-52 lg:w-68 lg:h-68 bg-gradient-to-br from-emerald-300/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Floating geometric elements - Responsive positioning */}
        <div className="hidden sm:block absolute top-1/4 right-1/4 w-12 h-12 lg:w-16 lg:h-16 border-2 border-blue-300/40 rotate-45 animate-spin" style={{ animationDuration: '25s' }} />
        <div className="hidden sm:block absolute bottom-1/3 left-1/5 w-8 h-8 lg:w-12 lg:h-12 border-2 border-purple-300/40 rotate-12 animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      {/* Main Content Container */}
     <div className="relative w-full max-w-6xl mx-auto lg:ml-12 py-6 sm:py-8 lg:py-12 z-10">

        
        {/* Main Layout - Stack on mobile, row on larger screens */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8 ">
          
          {/* Advertisement Section - Full width on mobile, 2/3 on larger screens */}
          <div className="flex-1  lg:w-2/3">
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-xl lg:rounded-2xl shadow-xl overflow-hidden group hover:shadow-blue-500/25 transition-all duration-700 ">
              
              {/* Main Advertisement Carousel - Proper responsive heights */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden  ">
                <div 
                  className="flex transition-transform duration-1000 ease-in-out h-full "
                  style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
                >
                  {adImages.map((image, index) => (
                    <div key={image.id} className="w-full flex-shrink-0 relative group/slide">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-105"
                      />
                      
                      {/* Enhanced overlay - Responsive text sizes */}
                      <div className="absolute inset-0  flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                        <div className="text-white space-y-3 sm:space-y-4">
                          {/* Content can be added here if needed */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation buttons - Proper sizing */}
                <button 
                  onClick={prevAd}
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <button 
                  onClick={nextAd}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Progress Dots - Proper sizing */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
                  {adImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAdIndex(index)}
                      className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
                        index === currentAdIndex 
                          ? 'bg-white w-6 sm:w-8 shadow-lg' 
                          : 'bg-white/50 w-2 sm:w-3 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
             <div className="relative bg-gradient-to-r  from-blue-600 via-teal-600 to-violet-600 p-6 mt-16 rounded-xl shadow-xl text-white">
                <div className="flex items-center h-28 justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                      <Zap className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                       {topData?.title || "Instant Loan"}
                        <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                      </h2>
                      <p className="text-emerald-100 text-sm font-medium">Get approved in minutes, not days</p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <a href={topData?.sitelink} className="bg-white/20 cursor-pointer backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-sm font-bold">Click Here</span>
                    </a>
                  </div>
                </div>
              </div>
          </div>

          {/* Contact and LinkedIn Section - Full width on mobile, 1/3 on larger screens */}
          <div className="lg:w-1/3 flex flex-col gap-4 sm:gap-6">
            {/* Admin Login Button */}
            <button
              onClick={() => router.push('/signin')}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Admin Login
            </button>

            {/* Contact Information Card */}
            <div className="bg-white/95 backdrop-blur-xl  border border-gray-200/60 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 flex-1">
              <h3 className=" text-lg sm:text-xl font-bold text-gray-900 mb-4  flex items-center">
                <Banknote className="w-10 h-10 mr-5 text-blue-600" />
                Fast Loan 
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Phone className="w-4 h-4 mr-3 text-green-600 flex-shrink-0" />
                  {showContact ? (
                    <a href="tel:8669XXXXXX" className="font-semibold text-sm sm:text-base text-blue-600 underline hover:text-blue-800 transition-colors duration-200">
                      +91 8669XXXXXX
                    </a>
                  ) : (
                    <span className="font-semibold text-base md:text-lg">Hidden until payment</span>
                  )}
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className=" w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-base md:text-lg">khondgaurav055@elitepune.com</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-4 h-4 mr-3 text-red-600 flex-shrink-0" />
                  <span className="font-semibold text-base md:text-lg">Pune, Maharashtra</span>
                </div>
              </div>
              <div className="block mt-6">
                {showContact ? (
                  <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base" disabled>
                    <Phone className="w-4 h-4" />
                    +91 8669XXXXXX
                  </button>
                ) : (
                  <RazorpayPayment
                    amount={5000} // 50 INR in paise
                    currency="INR"
                    receipt="enquiry_fast_loan"
                    name="Elite Finance"
                    description="Fast Loan Enquiry Fee"
                    onSuccess={() => setShowContact(true)}
                    onFailure={() => {}}
                  />
                )}
              </div>
            </div>

            {/* LinkedIn Connection Card */}
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 flex-1">
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full w-fit mx-auto">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Follow Us</h3>
                  <p className="text-gray-600 text-sm">Get financial tips & updates</p>
                </div>
                
                <a 
                  href="https://www.facebook.com/gaurav.khond.2025?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm sm:text-base"
                >
                  <span>Connect</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                
                <div className="flex items-center justify-center gap-6 pt-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">1K+</span>

                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banking Partners Section - Bottom (Full Width) */}
        {/* <div className="bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-xl lg:rounded-2xl shadow-xl overflow-hidden">
  <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-8">
    <div className="text-center mb-6">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Our Banking Partners</h3>
      <p className="text-sm sm:text-base text-gray-600">Trusted by leading financial institutions</p>
    </div>

    <div className="relative overflow-hidden">
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:hidden gap-4">
        {bankIcons.slice(0, 12).map((bank, index) => (
          <div
            key={`grid-${index}`}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-12 h-12 flex items-center justify-center mx-auto">
              <img
                src={bank.logo}
                alt={bank.name}
                className="w-full h-full object-contain rounded-md group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="text-xs text-center mt-2 font-semibold text-gray-700 truncate">
              {bank.name}
            </div>
          </div>
        ))}
      </div>

     
      <div className="hidden md:block overflow-hidden">
        <div
          className="flex"
          style={{
            animation: 'marquee 30s linear infinite',
          }}
        >
          {bankIcons.concat(bankIcons).map((bank, index) => (
            <div
              key={`marquee-${index}`}
              className="flex-shrink-0 mx-4 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group min-w-[80px] max-w-[100px]"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mx-auto">
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-full h-full object-contain rounded-md group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-xs text-center mt-2 font-semibold text-gray-700 truncate">
                {bank.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div> */}

      </div>
    </section>
  );
}