'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'

export default function Navbar() {
  const [user, setUser] = useState({
    name: '',
    role: ''
  })
  const router = useRouter()

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')
    
    // console.log('토큰:', token);
    // console.log('사용자 ID:', userId);
    
    if (token && userId) {
      try {
        // jwt-decode 라이브러리 사용
        const decoded = jwtDecode(token);
        // console.log('디코딩된 토큰:', decoded);
        
        setUser({
          name: `${decoded.name || ''} (${decoded.sub})`,
          role: decoded.role == 'P' ? '사용자' : '관리자'
        })
      } catch (error) {
        console.error('토큰 디코딩 오류:', error)
        
        // 디코딩 실패 시 기본값 설정
        setUser({
          name: userId,
          role: '사용자'
        })
      }
    }
  }, [])

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          <div className="flex items-center gap-3">
            {/* User profile */}
            <div className="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <span className="w-9 h-9 bg-red-300 text-white flex items-center justify-center text-sm font-medium">
                {user.name ? user.name.substring(0, 2).toUpperCase() : 'JS'}
              </span>
              <div className="hidden xl:block">
                <div className="text-sm font-medium">{user.name || '사용자 이름'}</div>
                <div className="text-xs text-gray-500">{user.role || '관리자'}</div>
              </div>
            </div>
            
            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 