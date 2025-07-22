// "use client";

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ServicesPage = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get('/api/services');
//         setServices(response.data);
//       } catch (error) {
//         toast.error('Failed to fetch services');
//         console.error('Failed to fetch services', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this service?')) {
//       try {
//         await axios.delete(`/api/services/delete-service`, { data: { id } });
//         setServices(services.filter(s => s._id !== id));
//         toast.success('Service deleted successfully!');
//       } catch (error) {
//         toast.error('Failed to delete service');
//         console.error('Failed to delete service', error);
//       }
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <ToastContainer />
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Manage Services</h1>
//         <Link href="/admin/services/new" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
//           Add New Service
//         </Link>
//       </div>
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {services.map(service => (
//               <tr key={service._id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{service.title}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{service.category}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">${service.price}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <Link href={`/admin/services/${service._id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">
//                     Edit
//                   </Link>
//                   <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-900">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ServicesPage; 
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        toast.error('Failed to fetch services');
        console.error('Failed to fetch services', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/services/delete-service`, { data: { id } });
        setServices(services.filter(s => s._id !== id));
        toast.success('Service deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete service');
        console.error('Failed to delete service', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Manage Services</h1>
        <Link 
          href="/admin/services/new" 
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors w-full sm:w-auto text-center"
        >
          Add New Service
        </Link>
      </div>
      
      {/* Mobile Cards View */}
      <div className="sm:hidden space-y-4">
        {services.map(service => (
          <div key={service._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{service.title}</h3>
                <p className="text-gray-600">{service.category}</p>
              </div>
              <span className="font-bold">₹{service.price}</span>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <Link 
                href={`/admin/services/${service._id}/edit`} 
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Edit
              </Link>
              <button 
                onClick={() => handleDelete(service._id)} 
                className="text-red-600 hover:text-red-900 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map(service => (
              <tr key={service._id}>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{service.title}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{service.category}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${service.price}</td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link 
                    href={`/admin/services/${service._id}/edit`} 
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(service._id)} 
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesPage;