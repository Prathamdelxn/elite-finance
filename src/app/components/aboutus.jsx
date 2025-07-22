// 'use client';

// import React, { useState } from 'react';
// import {
//   Instagram,
//   Linkedin,
//   Twitter,
//   Target,
//   Users,
//   TrendingUp,
//   Shield,
//   ArrowRight,
//   Sparkles,
//   Building2,
//   Award
// } from 'lucide-react';

// const AboutUs = () => {
//   const [activeCard, setActiveCard] = useState(null);

//   const features = [
//     {
//       icon: <Target className="w-8 h-8" />,
//       title: "Tailored Solutions",
//       description: "Personalized loan solutions, debt management, and credit repair services designed for your unique needs.",
//       color: "from-emerald-400 to-teal-600",
//       bgColor: "bg-emerald-50"
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Expert Guidance",
//       description: "Professional finance advisory, business coaching, and public speaking to empower your decisions.",
//       color: "from-purple-400 to-violet-600",
//       bgColor: "bg-purple-50"
//     },
//     {
//       icon: <TrendingUp className="w-8 h-8" />,
//       title: "Financial Growth",
//       description: "Helping individuals and businesses achieve financial freedom with sustainable strategies.",
//       color: "from-orange-400 to-red-500",
//       bgColor: "bg-orange-50"
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Trusted Partnership",
//       description: "Leading financial consultancy firm based in Pune, India, committed to your success.",
//       color: "from-blue-400 to-indigo-600",
//       bgColor: "bg-blue-50"
//     }
//   ];

//   const stats = [
//     { number: "500+", label: "Happy Clients", icon: <Users className="w-5 h-5" /> },
//     { number: "₹10Cr+", label: "Loans Processed", icon: <TrendingUp className="w-5 h-5" /> },
//     { number: "5+", label: "Years Experience", icon: <Award className="w-5 h-5" /> },
//     { number: "24/7", label: "Support Available", icon: <Shield className="w-5 h-5" /> }
//   ];

//   return (
//     <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
//       </div>

//       {/* Grid Pattern */}
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=\'60\'%20height=\'60\'%20viewBox=\'0%200%2060%2060\'%20xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%20fill=\'none\'%20fill-rule=\'evenodd\'%3E%3Cg%20fill=\'%239C92AC\'%20fill-opacity=\'0.05\'%3E%3Ccircle%20cx=\'30\'%20cy=\'30\'%20r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {/* Header */}
//         <div className="text-center mb-20">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 border border-emerald-400/20 rounded-full px-6 py-2 mb-8">
//             <Sparkles className="w-4 h-4 text-emerald-400" />
//             <span className="text-emerald-300 text-sm font-medium">About BTech Loan_Wala</span>
//           </div>
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//             <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Transforming Your</span><br />
//             <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Financial Journey</span>
//           </h1>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Empowering individuals and businesses with innovative financial solutions, expert guidance, and personalized strategies for sustainable growth.
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
//               <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl mb-4">
//                 {stat.icon}
//               </div>
//               <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
//               <div className="text-gray-400 text-sm">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
//           {/* Story */}
//           <div className="space-y-8">
//             <div className="relative">
//               <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-3xl blur-xl"></div>
//               <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
//                 <div className="flex items-center gap-3 mb-6">
//                   <Building2 className="w-8 h-8 text-emerald-400" />
//                   <h2 className="text-2xl font-bold text-white">Our Story</h2>
//                 </div>
//                 <div className="space-y-6 text-gray-300 leading-relaxed">
//                   <p className="text-lg">
//                     I am the <span className="font-semibold text-emerald-400">Founder and CEO of BTech Loan_Wala</span>,
//                     a pioneering financial consultancy firm revolutionizing the financial landscape in Pune, India.
//                   </p>
//                   <div className="bg-gradient-to-r from-emerald-400/10 to-teal-400/10 border-l-4 border-emerald-400 p-6 rounded-r-2xl">
//                     <blockquote className="text-lg font-medium text-white mb-3">
//                       "Engineered Solutions for Your Financial Needs"
//                     </blockquote>
//                     <p className="text-gray-400">
//                       This philosophy drives our commitment to blending cutting-edge innovation with deeply personalized service.
//                     </p>
//                   </div>
//                   <p className="text-lg">
//                     As a <span className="text-emerald-400 font-medium">Finance Advisor</span>,
//                     <span className="text-teal-400 font-medium"> Business Coach</span>, and
//                     <span className="text-cyan-400 font-medium"> Public Speaker</span>, I'm passionate about empowering others to unlock their financial potential and achieve lasting success.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Social Links */}
//             <div className="flex justify-center lg:justify-start gap-4">
//               {[
//                 { icon: <Instagram className="w-6 h-6" />, color: "from-pink-500 to-rose-500", hoverColor: "hover:text-pink-400" },
//                 { icon: <Linkedin className="w-6 h-6" />, color: "from-blue-500 to-blue-600", hoverColor: "hover:text-blue-400" },
//                 { icon: <Twitter className="w-6 h-6" />, color: "from-sky-400 to-sky-500", hoverColor: "hover:text-sky-400" }
//               ].map((social, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="group relative p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-110"
//                 >
//                   <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
//                   <div className={`text-gray-400 ${social.hoverColor} transition-colors duration-300`}>
//                     {social.icon}
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Features */}
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">Why Choose Us?</h3>
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group relative cursor-pointer"
//                 onMouseEnter={() => setActiveCard(index)}
//                 onMouseLeave={() => setActiveCard(null)}
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl`}></div>
//                 <div className="relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20 hover:bg-white/10 transition-all duration-500 hover:scale-105">
//                   <div className="flex items-start gap-4">
//                     <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg flex-shrink-0`}>
//                       <div className="text-white">{feature.icon}</div>
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
//                         {feature.title}
//                       </h4>
//                       <p className="text-gray-400 leading-relaxed">{feature.description}</p>
//                     </div>
//                     <ArrowRight className={`w-5 h-5 text-gray-600 group-hover:text-emerald-400 transition-all duration-300 ${activeCard === index ? 'translate-x-1' : ''}`} />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CTA */}
//         <div className="text-center">
//           <div className="relative inline-block group">
//             <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
//             <div className="relative bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-6 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 cursor-pointer group-hover:scale-105">
//               <div className="flex items-center justify-center gap-3">
//                 <div>
//                   <p className="text-xl font-bold text-white">Ready to Transform Your Financial Future?</p>
//                   <p className="text-emerald-100 mt-1">Let's connect and build your success story together</p>
//                 </div>
//                 <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;


'use client';

import React, { useState } from 'react';
import {
  Instagram,
  Linkedin,
  Facebook,
  Target,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  Sparkles,
  Building2,
  Award
} from 'lucide-react';

const AboutUs = () => {
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Tailored Solutions",
      description: "Personalized loan solutions, debt management, and credit repair services designed for your unique needs.",
      color: "from-emerald-400 to-teal-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Guidance",
      description: "Professional finance advisory, business coaching, and public speaking to empower your decisions.",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Financial Growth",
      description: "Helping individuals and businesses achieve financial freedom with sustainable strategies.",
      color: "from-teal-400 to-emerald-500",
      bgColor: "bg-teal-50"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trusted Partnership",
      description: "Leading financial consultancy firm based in Pune, India, committed to your success.",
      color: "from-teal-500 to-emerald-600",
      bgColor: "bg-teal-50"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients", icon: <Users className="w-5 h-5" /> },
    { number: "₹10Cr+", label: "Loans Processed", icon: <TrendingUp className="w-5 h-5" /> },
    { number: "5+", label: "Years Experience", icon: <Award className="w-5 h-5" /> },
    { number: "24/7", label: "Support Available", icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-200 to-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=\'60\'%20height=\'60\'%20viewBox=\'0%200%2060%2060\'%20xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%20fill=\'none\'%20fill-rule=\'evenodd\'%3E%3Cg%20fill=\'%239C92AC\'%20fill-opacity=\'0.05\'%3E%3Ccircle%20cx=\'30\'%20cy=\'30\'%20r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 border border-emerald-400/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-600 text-sm font-medium">About BTech Loan_Wala</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">Transforming Your</span><br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Financial Journey</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Empowering individuals and businesses with innovative financial solutions, expert guidance, and personalized strategies for sustainable growth.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white backdrop-blur-sm border border-gray-200 hover:bg-emerald-50 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl mb-4 text-white">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Story */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-8 h-8 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
                </div>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    I am the <span className="font-semibold text-emerald-600">Founder and CEO of BTech Loan_Wala</span>,
                    a pioneering financial consultancy firm revolutionizing the financial landscape in Pune, India.
                  </p>
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 p-6 rounded-r-2xl">
                    <blockquote className="text-lg font-medium text-gray-900 mb-3">
                      "Engineered Solutions for Your Financial Needs"
                    </blockquote>
                    <p className="text-gray-600">
                      This philosophy drives our commitment to blending cutting-edge innovation with deeply personalized service.
                    </p>
                  </div>
                  <p className="text-lg">
                    As a <span className="text-emerald-600 font-medium">Finance Advisor</span>,
                    <span className="text-teal-600 font-medium"> Business Coach</span>, and
                    <span className="text-cyan-600 font-medium"> Public Speaker</span>, I'm passionate about empowering others to unlock their financial potential and achieve lasting success.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4">
  {[
    {
      icon: <Instagram className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      hoverColor: "hover:text-pink-500",
      href: "https://www.instagram.com/elite_financial_solutions_pune?igsh=MWhjZnFjbmptNXI4cg=="
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:text-blue-500",
      href: "https://www.facebook.com/gaurav.khond.2025?mibextid=ZbWKwL"
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      color: "from-blue-600 to-indigo-600",
      hoverColor: "hover:text-blue-600",
      href: "https://www.facebook.com/gaurav.khond.2025?mibextid=ZbWKwL"
    }
  ].map((social, index) => (
    <a
      key={index}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-4 bg-white rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:scale-110 shadow-sm"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      <div className={`text-gray-500 ${social.hoverColor} transition-colors duration-300`}>
        {social.icon}
      </div>
    </a>
  ))}
</div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center lg:text-left">Why Choose Us?</h3>
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-all duration-500 blur-xl`}></div>
                <div className="relative bg-white p-6 rounded-2xl border border-gray-200 hover:border-emerald-300 transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl shadow-sm flex-shrink-0`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                    <ArrowRight className={`w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-all duration-300 ${activeCard === index ? 'translate-x-1' : ''}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6 rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer group-hover:scale-105">
              <div className="flex items-center justify-center gap-3">
                <div>
                  <p className="text-xl font-bold text-white">Ready to Transform Your Financial Future?</p>
                  <p className="text-emerald-100 mt-1">Let's connect and build your success story together</p>
                </div>
                <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;