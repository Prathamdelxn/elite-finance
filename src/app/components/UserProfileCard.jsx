import Image from 'next/image';

export default function UserProfileCard({ adminData }) {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col justify-center items-center py-4">
      {/* Profile Image */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="relative inline-block">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden bg-white shadow-lg border-4 border-white">
            <Image
              src={adminData?.imageUrl && adminData.imageUrl.trim() !== '' ? adminData.imageUrl : '/uploads/default-admin.jpg'}
              alt={adminData?.name || 'Admin'}
              width={160}
              height={160}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
      {/* Rating/Achievement Section */}
      <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
        {/* Left Rating */}
        <div className="bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-md text-center min-w-[50px] sm:min-w-[60px]">
          <div className="text-xl sm:text-2xl font-bold text-gray-800">200</div>
          <div className="text-xs text-gray-600">Customers</div>
        </div>
        {/* Center Achievement */}
        <div className="bg-red-500 rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-md text-center min-w-[70px] sm:min-w-[80px] relative">
          <div className="text-white">
            <div className="flex items-center justify-center mb-1">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="text-xs font-semibold">People's</div>
            <div className="text-xs font-semibold">Choice</div>
          </div>
        </div>
        {/* Right Rating */}
        <div className="bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-md text-center min-w-[50px] sm:min-w-[60px]">
          <div className="text-xl sm:text-2xl font-bold text-gray-800">320</div>
          <div className="text-xs text-gray-600">consultation
          </div>
        </div>
      </div>
      {/* Name and Title */}
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          {adminData?.name || 'Admin User'}
        </h1>
        <div className="space-y-1 sm:space-y-2">
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
            {adminData?.title || 'Administrator'}
          </p>
        </div>
      </div>
      {/* Description */}
      <div className="text-center">
        <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed px-2">
          {adminData?.description || 'With years of expertise, we provide engineered solutions for individuals and businesses with customized services.'}
        </p>
      </div>
    </div>
  );
} 



