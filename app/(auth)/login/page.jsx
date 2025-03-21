'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 토큰이 있는 경우 대시보드로 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  const handleForgotPassword = () => {
    alert('연구개발팀에 문의해주세용용용')
    // router.push('/forgot-password')
  }

  const handleRegister = () => {
    alert('연구개발팀에 문의해주세용용용')
    // router.push('/register')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    // 폼 데이터 가져오기
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const response = await fetch('https://3.36.248.207/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,  // 백엔드에서 username으로 받기 때문에
          password: password,
        }),
      })

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.detail || '로그인에 실패했습니다')
      }
      
      // 토큰과 사용자 정보 저장
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user_id', data.user_id)
      
      // 로그인 성공 시 홈으로 이동
      router.push('/dashboard')
      
    } catch (error) {
      console.error('로그인 에러:', error)
      setError(error.message || '로그인에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* 로고 */}
          <div className="flex justify-center mb-8">
            <Image
              src="/biocom_logo.png"
              width={110}
              height={32}
              alt="Biocom Logo"
              className="h-8 w-auto"
            />
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
            로그인
          </h2>
          
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off" noValidate>
            {/* 이메일 입력 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일 주소
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="off"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 forget-password" onClick={handleForgotPassword}>
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="off"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="비밀번호"
                />
              </div>
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* 로그인 버튼 */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                         text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </div>
          </form>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center text-sm text-gray-600">
          계정이 없으신가요?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 register" onClick={handleRegister}>
            회원가입
          </a>
        </div>
      </div>
    </div>
  )
}
