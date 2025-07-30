'use client';
import { useEffect, useState } from 'react';
import { Clock, MessageCircle, Video, Package, CreditCard, PiggyBank, Shield, Sparkles, ArrowRight, Star, Zap, X } from 'lucide-react';

const iconMap = { PiggyBank, MessageCircle, Shield, CreditCard, Package };

const ServicesSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    question: '',
    serviceName: '',
    serviceCategory: '',
    salary: '',
    address: '',
    pincode: '',
    serviceSector: '',
    companyName: '',
    alternatePhone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const filters = ['All', '1:1 Call', 'Priority DM', 'Package'];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        } else {
          console.error('Failed to fetch services');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = activeFilter === 'All'
    ? services
    : services.filter((s) => s.category === activeFilter);

  const handleConnectClick = (service) => {
    // setSelectedService(service);
    // setFormData(prev => ({
    //   ...prev,
    //   serviceName: service.title,
    //   serviceCategory: service.category
    // }));
    // setShowForm(true);
    // setSubmitSuccess(false);
    // setFormErrors({});
    window.open('https://forms.gle/kXosiFdufon6unQa6', '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.question.trim()) errors.question = 'Question is required';
    if (!formData.salary.trim()) errors.salary = 'Salary is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.pincode.trim()) errors.pincode = 'Pincode is required';
    if (!formData.serviceSector.trim()) errors.serviceSector = 'Service sector is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form but keep service info
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: '',
          question: '',
          salary: '',
          address: '',
          pincode: '',
          serviceSector: '',
          companyName: '',
          alternatePhone: '',
          serviceName: selectedService.title,
          serviceCategory: selectedService.category
        });
        setTimeout(() => {
          setShowForm(false);
        }, 2000);
      } else {
        console.error('Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.04),transparent_70%)]"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
       {/* Light Theme Header */}
       <div className="flex justify-center">
         <div className="inline-flex items-center gap-3 mx-auto bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200/50 mb-8 hover:bg-white/90 transition-all duration-300 shadow-lg shadow-slate-200/50">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <Star className="w-2 h-2 text-emerald-300 fill-emerald-300" />
          </div>
       <span className="text-sm font-semibold text-slate-700">Premium Services</span>
       <Zap className="w-4 h-4 text-blue-500" />
      </div>
     </div>
        {/* <div className="text-center mb-20">
          
          
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Elevate Your
            <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Unlock premium features and personalized services designed to accelerate your journey to success
          </p>
        </div> */}

        {/* Light Theme Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map((filter, index) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] overflow-hidden group ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-white/80 text-slate-700 hover:text-slate-900 shadow-sm hover:shadow-md border border-slate-200/50 hover:border-slate-300/50 hover:bg-white/90'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="relative z-10">{filter}</span>
              
              {activeFilter !== filter && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50/50 to-slate-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          ))}
        </div>

        {/* Light Theme Loader */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-slate-600 text-lg font-medium">Loading premium services...</p>
          </div>
        )}

        {/* Light Theme Services Grid with Unique Card Design */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => {
                const Icon = iconMap[service.icon] || Package;
                return (
                  <div
                    key={service._id || service.id}
                    className="group relative bg-white rounded-3xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg overflow-hidden"
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    {/* Card Content */}
                    <div className="p-6">
                      {/* Badge */}
                      {service.badge && (
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                          service.badge === 'Best Deal' ? 'bg-purple-100 text-purple-700' :
                          service.badge === 'Popular' ? 'bg-blue-100 text-blue-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          {service.badge}
                        </div>
                      )}

                      {/* Title and Multiplier */}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                          {service.title}
                        </h3>
                        {service.multiplier && (
                          <div className="bg-gray-100 text-gray-600 text-sm font-medium px-2 py-1 rounded-md ml-2">
                            {service.multiplier}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Subtitle Section */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="text-gray-500 font-medium text-sm">
                          {service.subtitle}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {service.subtitleType}
                        </div>
                      </div>

                      {/* Bottom Section with Icon and Price */}
                      <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Icon className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {service.category}
                            </div>
                            <div className="text-xs text-gray-500">
                              {service.category === 'Package' ? '1 products' : 'Service'}
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleConnectClick(service)}
                          className="flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-sm"
                        >
                          <span>Connect us</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Light Theme Empty State */}
            {filteredServices.length === 0 && (
              <div className="text-center py-20">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-white/90 rounded-2xl border border-slate-200/50 shadow-sm"></div>
                  <Package className="w-12 h-12 text-slate-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">No services found</h3>
                <p className="text-slate-600 text-lg max-w-md mx-auto">
                  Try selecting a different category to explore our comprehensive range of premium services.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Contact Form Modal - Light Theme */}
      {/*
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg md:rounded-2xl border border-slate-200/50 w-full max-w-xs sm:max-w-md md:max-w-2xl mx-2 relative overflow-hidden shadow-xl flex flex-col max-h-[95vh]">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-emerald-50/20 rounded-lg md:rounded-2xl"></div>
            <div className="relative z-10 p-3 sm:p-6 md:p-8 overflow-y-auto flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-slate-900">Service Enquiry</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="p-1 rounded-full hover:bg-slate-100 transition-colors duration-200"
                  aria-label="Close form"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              {submitSuccess ? (
                <div className="text-center py-4 sm:py-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-emerald-50 rounded-full mb-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 mb-1">Enquiry Submitted!</h4>
                  <p className="text-slate-600 text-sm sm:text-base">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="service">
                      Service
                    </label>
                    <input
                      type="text"
                      id="service"
                      name="service"
                      value={selectedService?.title || ''}
                      readOnly
                      className="w-full bg-slate-100 border border-slate-200 rounded-md md:rounded-lg px-3 py-2 text-slate-600 cursor-not-allowed text-xs sm:text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border ${formErrors.name ? 'border-red-400' : 'border-slate-200'} rounded-md md:rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base`}
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border ${formErrors.email ? 'border-red-400' : 'border-slate-200'} rounded-md md:rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="phone">
                      Phone Number *
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-slate-500 text-xs sm:text-sm md:text-base">+91</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          // Allow only numbers and limit to 10 digits
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleInputChange({
                            target: {
                              name: 'phone',
                              value: value
                            }
                          });
                        }}
                        className={`w-full bg-slate-50 border ${formErrors.phone ? 'border-red-400' : 'border-slate-200'} rounded-md md:rounded-lg pl-11 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base`}
                        placeholder="99XXXXXXXX"
                      />
                    </div>
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="alternatePhone">
                      Alternate Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-slate-500 text-xs sm:text-sm md:text-base">+91</span>
                      <input
                        type="tel"
                        id="alternatePhone"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={(e) => {
                          // Allow only numbers and limit to 10 digits
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleInputChange({
                            target: {
                              name: 'alternatePhone',
                              value: value
                            }
                          });
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-md md:rounded-lg pl-11 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                        placeholder="99XXXXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="city">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border ${formErrors.city ? 'border-red-400' : 'border-slate-200'} rounded-md md:rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base`}
                      placeholder="Your city"
                    />
                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="pincode">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={(e) => {
                        // Allow only numbers and limit to 6 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        handleInputChange({
                          target: {
                            name: 'pincode',
                            value: value
                          }
                        });
                      }}
                      className={`w-full bg-slate-50 border ${formErrors.pincode ? 'border-red-400' : 'border-slate-200'} rounded-md md:rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base`}
                      placeholder="6 digits"
                    />
                    {formErrors.pincode && <p className="text-red-500 text-xs mt-1">{formErrors.pincode}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="salary">
                      Salary (Monthly) *
                    </label>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={(e) => {
                        // Allow only numbers
                        const value = e.target.value.replace(/\D/g, '');
                        handleInputChange({
                          target: {
                            name: 'salary',
                            value: value
                          }
                        });
                      }}
                      className={`w-full bg-slate-50 border ${formErrors.salary ? 'border-red-400' : 'border-slate-200'} rounded-md md:rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base`}
                      placeholder="In rupees"
                    />
                    {formErrors.salary && <p className="text-red-500 text-xs mt-1">{formErrors.salary}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="serviceSector">
                      Service Sector *
                    </label>
                    <select
                      id="serviceSector"
                      name="serviceSector"
                      value={formData.serviceSector}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-50 border ${formErrors.serviceSector ? 'border-red-400' : 'border-slate-200'} rounded-md md:rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base`}
                    >
                      <option value="">Select sector</option>
                      <option value="Private">Private</option>
                      <option value="Government">Government</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.serviceSector && <p className="text-red-500 text-xs mt-1">{formErrors.serviceSector}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="companyName">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md md:rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                      placeholder="Optional"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="address">
                      Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full bg-slate-50 border ${formErrors.address ? 'border-red-400' : 'border-slate-200'} rounded-md md:rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base`}
                      placeholder="Your full address"
                    ></textarea>
                    {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-700 text-xs sm:text-sm md:text-base font-medium mb-1" htmlFor="question">
                      Your Question *
                    </label>
                    <textarea
                      id="question"
                      name="question"
                      value={formData.question}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full bg-slate-50 border ${formErrors.question ? 'border-red-400' : 'border-slate-200'} rounded-md md:rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs sm:text-sm md:text-base`}
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                    {formErrors.question && <p className="text-red-500 text-xs mt-1">{formErrors.question}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-md md:rounded-lg font-medium sm:font-semibold transition-all duration-300 hover:shadow-md hover:shadow-emerald-500/20 flex items-center justify-center gap-1 text-xs sm:text-sm md:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-1 h-3 w-3 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Enquiry'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;