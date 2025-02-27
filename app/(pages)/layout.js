'use client'

import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default function PagesLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Navbar />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  )
} 