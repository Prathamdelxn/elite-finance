"use client";

import { useState, useEffect } from 'react';
import { Star, User, Calendar, Filter, X, Plus, MessageCircle, TrendingUp, Award } from 'lucide-react';

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    feedback: '',
    category: 'general'
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback');
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      } else {
        console.error('Failed to fetch feedbacks');
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newFeedback = await response.json();
        console.log("adsf",newFeedback);
        // setFeedbacks([newFeedback, ...feedbacks]);
        setFormData({
          name: '',
          email: '',
          rating: 5,
          feedback: '',
          category: 'general'
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFeedback(null);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : 0;

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter === 'all') return true;
    return feedback.category === filter;
  });

  const getCategoryStats = () => {
    const categories = ['friendly', 'helpful', 'insightful'];
    return categories.map(cat => ({
      name: cat,
      count: feedbacks.filter(f => f.category === cat).length
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent"></div>
          <p className="mt-4 text-emerald-600 font-medium">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-50 via-emerald-50 to-green-50">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full text-emerald-600 text-sm font-medium mb-4 md:mb-6 border border-emerald-500/30">
              <MessageCircle className="w-4 h-4 mr-2" />
              Customer Insights
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
              Your Voice <span className="text-emerald-600">Matters</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Discover what our community is saying and share your own experience with us
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-10 md:-mt-20">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16">
          {/* Rating Summary Card */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group hover:border-emerald-500/50 col-span-2 md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1 md:mb-2">
                {averageRating}
              </div>
              <div className="flex mb-2 md:mb-3">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                {feedbacks.length} {feedbacks.length === 1 ? 'Review' : 'Reviews'}
              </p>
            </div>
          </div>

          {/* Category Stats */}
          {getCategoryStats().map(({ name, count }, index) => (
            <div 
              key={name}
              className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-emerald-500/50"
              onClick={() => setFilter(name)}
            >
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform ${
                  index === 0 ? 'bg-gradient-to-br from-emerald-400 to-emerald-500' :
                  index === 1 ? 'bg-gradient-to-br from-emerald-500 to-teal-500' :
                  'bg-gradient-to-br from-teal-500 to-cyan-500'
                }`}>
                  <TrendingUp className="w-5 md:w-6 h-5 md:h-6 text-white" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1 md:mb-2">
                  {count}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Feedback CTA */}
        <div className="mb-8 md:mb-12 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 text-sm md:text-base"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Share Your Experience
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-8 md:mb-12 flex justify-center overflow-x-auto pb-2">
          <div className="inline-flex rounded-xl md:rounded-2xl bg-white p-1 md:p-2 shadow-md border border-gray-200 whitespace-nowrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-100'
              }`}
            >
              All ({feedbacks.length})
            </button>
            {getCategoryStats().map(({ name, count }) => (
              <button
                key={name}
                onClick={() => setFilter(name)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                  filter === name
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-100'
                }`}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-16">
          {filteredFeedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-md border border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer hover:border-emerald-500/50"
              onClick={() => openModal(feedback)}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center">
                  {renderStars(feedback.rating)}
                  <span className="ml-2 text-xs md:text-sm font-semibold text-emerald-600">
                    {feedback.rating}/5
                  </span>
                </div>
                <span className="px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 text-xs rounded-full font-semibold uppercase tracking-wide border border-emerald-500/20">
                  {feedback.category}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4 md:mb-6 line-clamp-4 leading-relaxed text-sm md:text-base">
                "{feedback.feedback}"
              </p>
              
              <div className="flex items-center pt-4 border-t border-gray-200">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-white font-bold text-sm md:text-lg">
                    {feedback.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-emerald-600 text-sm md:text-base">{feedback.name}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-12 md:py-20">
            <div className="mx-auto w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center mb-4 md:mb-6 border border-gray-200">
              <Filter className="w-8 h-8 md:w-12 md:h-12 text-emerald-500" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-emerald-600 mb-2 md:mb-3">No feedback found</h3>
            <p className="text-gray-500 max-w-md mx-auto text-base md:text-lg px-4">
              There are no feedback items matching your selected filter. Try a different category or be the first to share your experience.
            </p>
          </div>
        )}
      </div>

      {/* Feedback Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl md:rounded-3xl p-6 md:p-8 w-full max-w-md md:max-w-lg relative shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-emerald-600 hover:bg-gray-100 rounded-full p-1 md:p-2 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <div className="text-center mb-6 md:mb-8">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1 md:mb-2">Share Your Feedback</h2>
              <p className="text-gray-500 text-sm md:text-base">We'd love to hear about your experience</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm md:text-base font-semibold text-emerald-600 mb-1 md:mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white text-gray-900 placeholder-gray-400 text-sm md:text-base"
                />
              </div>
              
              <div>
                <label className="block text-sm md:text-base font-semibold text-emerald-600 mb-1 md:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white text-gray-900 placeholder-gray-400 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-semibold text-emerald-600 mb-1 md:mb-2">
                  Rating *
                </label>
                <div className="flex gap-1 md:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="p-1 md:p-2 transition-transform hover:scale-125 rounded-lg hover:bg-gray-100"
                    >
                      <Star
                        className={`w-6 h-6 md:w-8 md:h-8 ${
                          star <= formData.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-base font-semibold text-emerald-600 mb-1 md:mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white text-gray-900 text-sm md:text-base"
                >
                  <option value="general">General</option>
                  <option value="friendly">Friendly</option>
                  <option value="helpful">Helpful</option>
                  <option value="insightful">Insightful</option>
                </select>
              </div>

              <div>
                <label className="block text-sm md:text-base font-semibold text-emerald-600 mb-1 md:mb-2">
                  Feedback *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.feedback}
                  onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white resize-none text-gray-900 placeholder-gray-400 text-sm md:text-base"
                  placeholder="What was your experience like?"
                />
              </div>

              <div className="pt-2 md:pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 md:py-4 px-4 rounded-lg md:rounded-xl hover:shadow-md transition-all font-semibold transform hover:scale-105 hover:from-emerald-600 hover:to-teal-600 text-sm md:text-base"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feedback Detail Modal */}
      {showModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl md:rounded-3xl p-6 md:p-8 w-full max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-xl border border-gray-200">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-emerald-600 hover:bg-gray-100 rounded-full p-1 md:p-2 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <div className="mb-6 md:mb-8">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-emerald-600 mb-1 md:mb-2">Feedback Details</h2>
              <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
            </div>
            
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 gap-4">
                <div className="flex items-center">
                  {renderStars(selectedFeedback.rating)}
                  <span className="ml-2 md:ml-3 text-lg md:text-xl font-semibold text-emerald-600">
                    {selectedFeedback.rating}/5
                  </span>
                </div>
                <span className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 text-xs md:text-sm rounded-full font-semibold uppercase tracking-wide border border-emerald-500/20 self-start sm:self-auto">
                  {selectedFeedback.category}
                </span>
              </div>
              
              <div className="prose prose-sm md:prose-lg text-gray-700 max-w-none">
                <p className="whitespace-pre-line text-base md:text-lg leading-relaxed">"{selectedFeedback.feedback}"</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 md:pt-8">
              <div className="flex items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4 md:mr-6">
                  <span className="text-white font-bold text-base md:text-xl">
                    {selectedFeedback.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-emerald-600 text-base md:text-lg">{selectedFeedback.name}</p>
                  {selectedFeedback.email && (
                    <p className="text-gray-500 text-sm md:text-base">{selectedFeedback.email}</p>
                  )}
                  <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2 flex items-center">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackSection;