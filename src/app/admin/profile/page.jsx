// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ProfilePage = () => {
//   const [admin, setAdmin] = useState({
//     name: '',
//     title: '',
//     imageUrl: '',
//     description: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');

//   useEffect(() => {
//     const fetchAdmin = async () => {
//       try {
//         const response = await axios.get('/api/admin');
//         if (response.data) {
//           setAdmin(response.data);
//           setImagePreview(response.data.imageUrl);
//         }
//       } catch (error) {
//         toast.error('Failed to fetch admin data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAdmin();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAdmin((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const requiredFields = ['name', 'title', 'description'];
//     const emptyField = requiredFields.find(field => !admin[field]);
//     if (emptyField) {
//       toast.error(`Please fill in the ${emptyField} field.`);
//       return;
//     }
    
//     setSaving(true);
//     try {
//       let imageUrl = admin.imageUrl;

//       if (imageFile) {
//         const formData = new FormData();
//         formData.append('file', imageFile);
//         const response = await axios.post('/api/upload', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         imageUrl = response.data.url;
//       }

//       const { _id, ...updateData } = { ...admin, imageUrl };
//       const response = await axios.put('/api/admin', updateData);
//       toast.success('Profile updated successfully!');
//       setAdmin(response.data);
//       setImagePreview(response.data.imageUrl);
//       setImageFile(null);
//       // Notify other tabs/windows to refresh admin data
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('adminDataUpdated', Date.now().toString());
//       }

//     } catch (error) {
//       toast.error('Failed to update profile');
//       console.error('Failed to update profile', error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <ToastContainer />
//       <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
//       <form onSubmit={handleUpdate} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Profile Image</label>
//           <div className="mt-2 flex items-center space-x-4">
//             <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
//               {imagePreview ? (
//                 <Image src={imagePreview} alt="Profile preview" layout="fill" className="object-cover" />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
//               )}
//             </div>
//             <div>
//               <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
//               <p className="mt-1 text-sm text-gray-500">Recommended: Square image, at least 400x400px</p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             value={admin.name}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">Designation (Title)</label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             value={admin.title}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//           <textarea
//             name="description"
//             id="description"
//             rows="5"
//             value={admin.description}
//             onChange={handleChange}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           ></textarea>
//         </div>
//         <button type="submit" disabled={saving} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
//           {saving ? 'Saving...' : 'Update Profile'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage; 
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const [admin, setAdmin] = useState({
    name: '',
    title: '',
    imageUrl: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get('/api/admin');
        if (response.data) {
          setAdmin(response.data);
          setImagePreview(response.data.imageUrl);
        }
      } catch (error) {
        toast.error('Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'title', 'description'];
    const emptyField = requiredFields.find(field => !admin[field]);
    if (emptyField) {
      toast.error(`Please fill in the ${emptyField} field.`);
      return;
    }
    
    setSaving(true);
    try {
      let imageUrl = admin.imageUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const response = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = response.data.url;
      }

      const { _id, ...updateData } = { ...admin, imageUrl };
      const response = await axios.put('/api/admin', updateData);
      toast.success('Profile updated successfully!');
      setAdmin(response.data);
      setImagePreview(response.data.imageUrl);
      setImageFile(null);
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminDataUpdated', Date.now().toString());
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Failed to update profile', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl">Loading...</div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <ToastContainer />
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Admin Profile</h1>
      
      <form onSubmit={handleUpdate} className="space-y-4 md:space-y-6">
        {/* Profile Image Section */}
        <div className="space-y-2">
          <label className="block text-sm md:text-base font-medium text-gray-700">Profile Image</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100">
              {imagePreview ? (
                <Image 
                  src={imagePreview} 
                  alt="Profile preview" 
                  layout="fill" 
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1 w-full">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="block w-full text-sm text-gray-500
                  file:mr-2 file:py-1.5 file:px-3 
                  file:rounded-md file:border-0 
                  file:text-xs sm:file:text-sm file:font-medium
                  file:bg-indigo-50 file:text-indigo-700 
                  hover:file:bg-indigo-100"
              />
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={admin.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-indigo-500 focus:ring-indigo-500 
              text-sm md:text-base p-2 md:p-2.5"
          />
        </div>

        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm md:text-base font-medium text-gray-700">
            Designation (Title)
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={admin.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-indigo-500 focus:ring-indigo-500 
              text-sm md:text-base p-2 md:p-2.5"
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm md:text-base font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="5"
            value={admin.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-indigo-500 focus:ring-indigo-500 
              text-sm md:text-base p-2 md:p-2.5"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={saving} 
          className="w-full sm:w-auto inline-flex justify-center 
            py-2 px-4 border border-transparent shadow-sm 
            text-sm md:text-base font-medium rounded-md 
            text-white bg-indigo-600 hover:bg-indigo-700 
            disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;