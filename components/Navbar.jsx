'use client'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          <div className="flex items-center gap-3">
            {/* User profile */}
            <a href="#" className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <span className="w-9 h-9 bg-red-300 text-white flex items-center justify-center text-sm font-medium">
                JS
              </span>
              <div className="hidden xl:block">
                <div className="text-sm font-medium">사용자 이름</div>
                <div className="text-xs text-gray-500">관리자</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
} 