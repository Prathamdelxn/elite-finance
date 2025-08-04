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
import React, { useState, useEffect, useRef } from 'react';
import { Edit3, Save, X, ExternalLink, Building2, Loader2, Plus, Trash2, Upload } from 'lucide-react';

export default function CompanyCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCompany, setNewCompany] = useState({
    title: '',
    sitelink: '',
    imageFile: null,
    imagePreview: ''
  });
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/top/fetch');
      const data = await res.json();
      setCompanies(data?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (company) => {
    setCurrentCompany(company);
    setEditData({...company});
    setEditImagePreview(company.image || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', editData.title);
      formData.append('sitelink', editData.sitelink);
      if (editImageFile) {
        formData.append('image', editImageFile);
      }

      const response = await fetch(`/api/top/update/${currentCompany._id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCompanies(companies.map(company => 
          company._id === currentCompany._id ? data.data : company
        ));
        setIsEditing(false);
        setCurrentCompany(null);
        setEditImageFile(null);
        setEditImagePreview('');
        alert('Company updated successfully!');
      } else {
        console.error('Failed to update company:', data.message);
        alert(`Failed to update company: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating company:', error);
      alert('Failed to update company. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAdd = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', newCompany.title);
      formData.append('sitelink', newCompany.sitelink);
      if (newCompany.imageFile) {
        formData.append('image', newCompany.imageFile);
      }

      const response = await fetch('/api/top/create', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCompanies([...companies, data.data]);
        setShowAddForm(false);
        setNewCompany({
          title: '',
          sitelink: '',
          imageFile: null,
          imagePreview: ''
        });
        alert('Company added successfully!');
      } else {
        console.error('Failed to add company:', data.message);
        alert(`Failed to add company: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding company:', error);
      alert('Failed to add company. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`/api/top/delete/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCompanies(companies.filter(company => company._id !== id));
        if (currentCompany?._id === id) {
          setIsEditing(false);
          setCurrentCompany(null);
        }
        // Show success message
        alert('Company deleted successfully!');
      } else {
        console.error('Failed to delete company:', data.message);
        alert(`Failed to delete company: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      alert('Failed to delete company. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentCompany(null);
    setEditImageFile(null);
    setEditImagePreview('');
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewCompany({
      title: '',
      sitelink: '',
      imageFile: null,
      imagePreview: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    setNewCompany(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCompany(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImageFile(file);
        setEditImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewCompany(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeEditImage = () => {
    setEditImageFile(null);
    setEditImagePreview('');
    if (editFileInputRef.current) {
      editFileInputRef.current.value = '';
    }
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
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Top Clients Management
            </h1>
          </div>
          <p className="text-slate-600 text-lg">Manage your key business relationships</p>
        </div>

        {/* Add New Company Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add New Company
          </button>
        </div>

        {/* Add New Company Form */}
        {showAddForm && (
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Add New Company</h2>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="new-title">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="new-title"
                      name="title"
                      value={newCompany.title}
                      onChange={handleNewCompanyChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter company name"
                      disabled={isSaving}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="new-sitelink">
                      Website URL
                    </label>
                    <input
                      type="url"
                      id="new-sitelink"
                      name="sitelink"
                      value={newCompany.sitelink}
                      onChange={handleNewCompanyChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://example.com"
                      disabled={isSaving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company Logo
                    </label>
                    <div className="flex flex-col gap-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        disabled={isSaving}
                      />
                      <label
                        htmlFor="image-upload"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 cursor-pointer hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Upload Image</span>
                      </label>
                      
                      {newCompany.imagePreview && (
                        <div className="relative">
                          <div className="border border-slate-200 rounded-lg p-2">
                            <img 
                              src={newCompany.imagePreview} 
                              alt="Preview" 
                              className="w-full h-40 object-contain"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAdd}
                    disabled={isSaving || !newCompany.title}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Add Company
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancelAdd}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Company Form */}
        {isEditing && currentCompany && (
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Edit3 className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Edit Company</h2>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="edit-title">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="edit-title"
                      name="title"
                      value={editData.title || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter company name"
                      disabled={isSaving}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="edit-sitelink">
                      Website URL
                    </label>
                    <input
                      type="url"
                      id="edit-sitelink"
                      name="sitelink"
                      value={editData.sitelink || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://example.com"
                      disabled={isSaving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company Logo
                    </label>
                    <div className="flex flex-col gap-4">
                      <input
                        type="file"
                        ref={editFileInputRef}
                        onChange={handleEditImageUpload}
                        accept="image/*"
                        className="hidden"
                        id="edit-image-upload"
                        disabled={isSaving}
                      />
                      <label
                        htmlFor="edit-image-upload"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 cursor-pointer hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Upload New Image</span>
                      </label>
                      
                      {(editImagePreview || currentCompany.image) && (
                        <div className="relative">
                          <div className="border border-slate-200 rounded-lg p-2">
                            <img 
                              src={editImagePreview || currentCompany.image} 
                              alt="Preview" 
                              className="w-full h-40 object-contain"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={removeEditImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            </div>
          </div>
        )}

        {/* Companies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((company) => (
            <div key={company._id} className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {company.image ? (
                      <img 
                        src={company.image} 
                        alt={company.title} 
                        className="w-10 h-10 rounded-lg object-cover border-2 border-white/20"
                      />
                    ) : (
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-white truncate max-w-xs">{company.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(company)}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 hover:scale-110"
                      disabled={isSaving}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(company._id)}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 hover:scale-110"
                      disabled={isSaving}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="group">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Website
                    </h3>
                    {company.sitelink ? (
                      <a
                        href={company.sitelink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-lg transition-all duration-200 hover:gap-3 group"
                      >
                        <span className="border-b border-blue-200 group-hover:border-blue-400 truncate">
                          {company.sitelink}
                        </span>
                        <ExternalLink className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <p className="text-slate-400 text-lg">No website URL</p>
                    )}
                  </div>

                  {company.image && (
                    <div className="group">
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Company Logo
                      </h3>
                      <div className="mt-2">
                        <img 
                          src={company.image} 
                          alt={company.title} 
                          className="w-full h-40 object-contain rounded-lg border border-slate-200"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && !showAddForm && (
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden p-8 text-center">
            <Building2 className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Companies Found</h3>
            <p className="text-slate-500 mb-6">Add your first company to get started</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Company
            </button>
          </div>
        )}
      </div>
    </div>
  );
}