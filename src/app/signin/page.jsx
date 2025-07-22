'use client'
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, Users, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router=useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
const handleSubmit = async () => {
  console.log(formData);
  try {
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to login");
    }

    const data = await res.json();
    console.log("Login Successful:", data);
    if(data.message=="Login successful"){

      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/admin")

    }

  } catch (err) {
    console.log("Internal server error:", err);
  }
};


  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex overflow-hidden" style={{ width: '100vw', height: '100vh' }}>
      {/* Left side - Sign in form */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              Welcome back
            </h2>
            <p className="text-gray-500 text-lg">Sign in to your account to continue your journey</p>
          </div>

          {/* Sign in form */}
          <div className="space-y-6">
           {/* Email field */}
<div className="group relative">
  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
    Email address
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full">
      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
    </div>
    <input
      id="email"
      name="email"
      type="email"
      required
      value={formData.email}
      onChange={handleInputChange}
      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
      placeholder="Enter your email address"
    />
  </div>
</div>

{/* Password field */}
<div className="group relative">
  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
    Password
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full">
      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
    </div>
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      required
      value={formData.password}
      onChange={handleInputChange}
      className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
      placeholder="Enter your password"
    />
    <button
      type="button"
      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors h-full"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
      ) : (
        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
      )}
    </button>
  </div>
</div>

           
            {/* Sign in button */}
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign in to your account
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
           

            {/* Sign up link */}
           
          </div>
        </div>
      </div>

      {/* Right side - Hero section */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-12 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-md text-center relative z-10">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <h3 className="text-3xl font-bold text-white mb-4">
            Secure & Trusted Platform
          </h3>
          <p className="text-blue-100 leading-relaxed text-lg mb-8">
            Join thousands of professionals who trust our platform for secure, efficient project management and collaboration.
          </p>
          
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Users className="w-6 h-6 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-sm text-blue-100">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Shield className="w-6 h-6 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-blue-100">Uptime</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <Clock className="w-6 h-6 text-white mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-blue-100">Support</div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-blue-100 text-sm">Trusted by leading teams</span>
          </div>
        </div>
      </div>
    </div>
  );
}