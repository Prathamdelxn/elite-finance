// 'use client'
// import React, { useEffect, useState } from 'react'
// import AdminNav from '../components/AdminNav'
// import { useRouter } from 'next/navigation'
// export default function Layout({ children }) {
//     const router=useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen)
//   }

//   useEffect(()=>{
//     const data=localStorage.getItem('user');
//     console.log("sdf",data)
//     const user=JSON.parse(data);
//     if(user?.role!="Elite-Owner"){
//         router.push("/signin")
//     }

//   },[])

//   return (
//     <div className='flex w-full min-h-screen'>
//       {/* Mobile menu button */}
//       <button
//         onClick={toggleSidebar}
//         className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
//         aria-label="Toggle menu"
//       >
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           {isSidebarOpen ? (
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           ) : (
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           )}
//         </svg>
//       </button>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           fixed lg:relative h-full  lg:translate-x-0 z-30
//           w-64 lg:w-80 xl:w-72 2xl:w-80
//           transform transition-transform duration-300 ease-in-out
//           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//         `}
//       >
//         <AdminNav />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 min-w-0">
//         <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-slate-200 min-h-screen">
//           {children}
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'
import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import { useRouter } from 'next/navigation'

export default function Layout({ children }) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        const data = localStorage.getItem('user');
        console.log("sdf", data)
        const user = JSON.parse(data);
        if (user?.role != "Elite-Owner") {
            router.push("/signin")
        }
    }, [])

    return (
        <div className='flex w-full min-h-screen'>
            {/* Mobile menu button */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
                aria-label="Toggle menu"
               // Added margin to account for potential header
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isSidebarOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0  bg-opacity-50 z-20 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed lg:relative h-full lg:translate-x-0 z-30
                    w-64 lg:w-80 xl:w-72 2xl:w-80
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <AdminNav />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0 pt-16 lg:pt-0"> {/* Added pt-16 for mobile */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-slate-200 min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    )
}