'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Login() {
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    // 추후 백엔드 연동 시 여기에 로그인 로직 추가
    router.push('/home')
  }

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
        </div>
        <a href=".">
            <img src="/biocom_logo.png" width="110" height="32" alt="Tabler" className="navbar-brand-image" />
          </a>
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">로그인</h2>
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="mb-3">
                <label className="form-label">이메일 주소</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="your@email.com" 
                  autoComplete="off"
                />
              </div>
              
              <div className="mb-2">
                <label className="form-label">
                  비밀번호
                  <span className="form-label-description">
                    <a href="/forgot-password">비밀번호를 잊으셨나요?</a>
                  </span>
                </label>
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="비밀번호" 
                  autoComplete="off"
                />
              </div>
              
              <div className="mb-2">
                <label className="form-check">
                  <input type="checkbox" className="form-check-input"/>
                  <span className="form-check-label">이 브라우저에 로그인 정보 저장</span>
                </label>
              </div>
              
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="text-center text-muted mt-3">
          계정이 없으신가요? <a href="/register" tabIndex="-1">회원가입</a>
        </div>
      </div>
    </div>
  )
}
