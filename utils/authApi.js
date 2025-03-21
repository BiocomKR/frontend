import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 백엔드 url(로컬)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 토큰을 포함한 API 요청 함수
 * @param {string} endpoint - API 엔드포인트 경로
 * @param {Object} options - fetch 옵션
 * @returns {Promise} - fetch 응답 Promise
 */
export async function fetchWithToken(endpoint, options = {}) {
  // 토큰 가져오기 (클라이언트 사이드에서만 실행)
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    
    // 기본 헤더 설정
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {})
    };
    // 토큰이 있으면 Authorization 헤더 추가
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    // URL 생성
    const url = endpoint.startsWith('http') 
        ? endpoint 
        : `${API_BASE_URL}${endpoint}`;
    
    // fetch 요청 실행
    const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors'
    });
    
    // 응답 상태 확인
    if (!response.ok) {
        const errorText = await response.text();
        console.error("API 응답 에러:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // JSON 응답 반환
    return await response.json();
    }

// HTTP 메서드별 헬퍼 함수
export const api = {
    get: (endpoint, options = {}) => 
        fetchWithToken(endpoint, { ...options, method: 'GET' }),
        
    post: (endpoint, data, options = {}) => 
        fetchWithToken(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data)
        }),
        
    put: (endpoint, data, options = {}) => 
        fetchWithToken(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data)
        }),
        
    delete: (endpoint, options = {}) => 
        fetchWithToken(endpoint, { ...options, method: 'DELETE' })
};