// 'use client'
// import React, { useState,useEffect } from 'react';
// import { Edit3, Save, X, ExternalLink, Building2 } from 'lucide-react';

// export default function CompanyCard() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [companyData, setCompanyData] = useState({
   
//   });
//   const [editData, setEditData] = useState({...companyData});

//   const handleEdit = () => {
//     setEditData({...companyData});
//     setIsEditing(true);
//   };
//   const [Id,setID]=useState('687f59b6d9c23041f0d75eb0');

//   const fetchData=async()=>{
//     const res= await fetch(`/api/top/fetch/${Id}`)
//     const data = await res.json();
//     console.log(data);
//     setCompanyData(data?.data)

//   }
// useState(()=>{
// fetchData();
// },[])
//   const handleSave = () => {
//     setCompanyData({...editData});
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
//               <Building2 className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//               Top Client Management
//             </h1>
//           </div>
//           <p className="text-slate-600 text-lg">Manage your key business relationships</p>
//         </div>

//         {/* Company Card */}
//         <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
//           {/* Card Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white/20 rounded-lg">
//                   <Building2 className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-white">Company Profile</h2>
//               </div>
//               {!isEditing && (
//                 <button
//                   onClick={handleEdit}
//                   className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 hover:scale-105"
//                 >
//                   <Edit3 className="w-4 h-4" />
//                   Edit
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Card Content */}
//           <div className="p-8">
//             {isEditing ? (
//               <div className="space-y-6">
//                 {/* Edit Form */}
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="name">
//                       Company Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={editData.title}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       placeholder="Enter company name"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="link">
//                       Website URL
//                     </label>
//                     <input
//                       type="url"
//                       id="link"
//                       name="link"
//                       value={editData.sitelink}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       placeholder="https://example.com"
//                     />
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={handleSave}
//                     className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
//                   >
//                     <Save className="w-4 h-4" />
//                     Save Changes
//                   </button>
//                   <button
//                     onClick={handleCancel}
//                     className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
//                   >
//                     <X className="w-4 h-4" />
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {/* Display Mode */}
//                 <div className="space-y-6">
//                   <div className="group">
//                     <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
//                       Company Name
//                     </h3>
//                     <p className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
//                       {companyData.title}
//                     </p>
//                   </div>
                  
//                   <div className="group">
//                     <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
//                       Website
//                     </h3>
//                     <a
//                       href={companyData.sitelink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-lg transition-all duration-200 hover:gap-3 group"
//                     >
//                       <span className="border-b border-blue-200 group-hover:border-blue-400">
//                         {companyData.sitelink}
//                       </span>
//                       <ExternalLink className="w-5 h-5 opacity-60 group-hover:opacity-100" />
//                     </a>
//                   </div>
//                 </div>

//                 {/* Stats or Additional Info */}
               
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'
import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, ExternalLink, Building2, Loader2 } from 'lucide-react';

export default function CompanyCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [editData, setEditData] = useState({...companyData});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [Id, setID] = useState('687f59b6d9c23041f0d75eb0');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/top/fetch/${Id}`);
      const data = await res.json();
      console.log(data);
      setCompanyData(data?.data);
      setEditData(data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    setEditData({...companyData});
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/top/update/${Id}`, {
        method: 'PUT', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editData.title,
          sitelink: editData.sitelink
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setCompanyData({...editData});
        setIsEditing(false);
        console.log('Data updated successfully:', updatedData);
      } else {
        console.error('Failed to update data');
        // You could add error handling here (e.g., show error message)
      }
    } catch (error) {
      console.error('Error updating data:', error);
      // You could add error handling here (e.g., show error message)
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData({...companyData});
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-slate-600">Loading company data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Top Client Management
            </h1>
          </div>
          <p className="text-slate-600 text-lg">Manage your key business relationships</p>
        </div>

        {/* Company Card */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">Company Profile</h2>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 hover:scale-105"
                  disabled={isSaving}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Card Content */}
          <div className="p-8">
            {isEditing ? (
              <div className="space-y-6">
                {/* Edit Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="title">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={editData.title || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter company name"
                      disabled={isSaving}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="sitelink">
                      Website URL
                    </label>
                    <input
                      type="url"
                      id="sitelink"
                      name="sitelink"
                      value={editData.sitelink || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://example.com"
                      disabled={isSaving}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Display Mode */}
                <div className="space-y-6">
                  <div className="group">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Company Name
                    </h3>
                    <p className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                      {companyData.title || 'No company name'}
                    </p>
                  </div>
                  
                  <div className="group">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Website
                    </h3>
                    {companyData.sitelink ? (
                      <a
                        href={companyData.sitelink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-lg transition-all duration-200 hover:gap-3 group"
                      >
                        <span className="border-b border-blue-200 group-hover:border-blue-400">
                          {companyData.sitelink}
                        </span>
                        <ExternalLink className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <p className="text-slate-400 text-lg">No website URL</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}