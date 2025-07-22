"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HeroAdAdmin() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentAds, setCurrentAds] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentAds();
  }, []);

  const fetchCurrentAds = async () => {
    try {
      const response = await fetch('/api/hero-ad');
      const data = await response.json();
      setCurrentAds(Array.isArray(data.heroAdImages) ? data.heroAdImages : []);
    } catch (error) {
      console.error('Failed to fetch current ads:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file first');
      return;
    }
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('heroAd', selectedFile);
    try {
      const response = await fetch('/api/hero-ad', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('Advertisement uploaded successfully!');
        setSelectedFile(null);
        setPreview(null);
        e.target.reset();
        fetchCurrentAds();
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imgPath) => {
    if (!window.confirm('Are you sure you want to delete this advertisement?')) return;
    try {
      const response = await fetch('/api/hero-ad', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagePath: imgPath }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('Advertisement deleted successfully!');
        fetchCurrentAds();
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('Delete failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Hero Section Advertisement Manager
          </h1>

          {/* Current Advertisements Display */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Current Advertisements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentAds.length > 0 ? (
                currentAds.map((img, idx) => (
                  <div key={img} className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center">
                    <Image
                      src={img}
                      alt={`Hero Advertisement ${idx + 1}`}
                      width={800}
                      height={400}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <button
                      onClick={() => handleDelete(img)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow hover:bg-red-700 transition"
                      title="Delete Advertisement"
                    >
                      &#10005;
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 col-span-full text-center">
                  <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-lg">No advertisements currently set</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Upload New Advertisement
            </h2>
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Advertisement Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Supported formats: JPG, PNG, GIF. Max size: 5MB
                </p>
              </div>

              {/* Preview */}
              {preview && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <Image
                      src={preview}
                      alt="Preview"
                      width={400}
                      height={200}
                      className="mx-auto rounded-lg object-cover"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={uploading || !selectedFile}
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
                  uploading || !selectedFile
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                } transition duration-200`}
              >
                {uploading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  'Update Advertisement'
                )}
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={`mt-4 p-4 rounded-lg ${
                message.includes('success') 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Back to Site Button */}
          <div className="flex justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Back to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}