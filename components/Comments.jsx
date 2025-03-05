'use client'

import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function Comments({ chartId }) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')

    // 사용자 정보 가져오기
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
        try {
            const decoded = jwtDecode(token)
            setUserId(decoded.sub || '')
            setUserName(decoded.name || decoded.sub || '')
        } catch (error) {
            console.error('토큰 디코딩 오류:', error)
        }
        }
    }, [])

    // 댓글 목록 가져오기
    useEffect(() => {
        if (chartId) {
            fetchComments()
        }
    }, [chartId])

    const fetchComments = async () => {
        try {
            setIsLoading(true)
            setError(null)
        
            const token = localStorage.getItem('token')
            
            const response = await fetch(`http://localhost:8000/api/user/get_all_comments?chart_id=${chartId}&page_id=Questionnaire`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            })
        
            if (!response.ok) {
                throw new Error('댓글을 불러오는데 실패했습니다')
            }
        
            const data = await response.json()
            setComments(data)
        } catch (error) {
            console.error('댓글 조회 오류:', error)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!newComment.trim()) return
        
        try {
            setIsLoading(true)
            setError(null)
            
            const token = localStorage.getItem('token')
            
            const commentData = {
                content: newComment,
                user_id: userId,
                chart_id: chartId,
                page_id: 'Questionnaire',
                status: 'A'
            }
            
            const response = await fetch('http://localhost:8000/api/user/create_comment', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(commentData)
            })
            
            if (!response.ok) {
                throw new Error('댓글 등록에 실패했습니다')
            }
            
            // 댓글 등록 성공 후 목록 새로고침
            setNewComment('')
            fetchComments()
        } catch (error) {
            console.error('댓글 등록 오류:', error)
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="mt-8 border rounded-lg p-4 bg-white shadow">
        <h3 className="text-lg font-semibold mb-4">댓글</h3>
        
        {/* 댓글 목록 */}
        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
            {isLoading && comments.length === 0 ? (
            <p className="text-gray-500 text-center py-4">댓글을 불러오는 중...</p>
            ) : comments.length > 0 ? (
            comments.map((comment) => (
                <div key={comment.comment_id} className="border-b pb-3">
                <div className="flex justify-between items-start">
                    <div className="font-medium">{comment.user_id}</div>
                    <div className="text-xs text-gray-500">{formatDate(comment.created_at)}</div>
                </div>
                <p className="mt-1 text-gray-700">{comment.content}</p>
                </div>
            ))
            ) : (
            <p className="text-gray-500 text-center py-4">등록된 댓글이 없습니다</p>
            )}
            
            {error && (
            <div className="text-red-500 text-center py-2">{error}</div>
            )}
        </div>
        
        {/* 댓글 입력 폼 */}
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex items-start">
            <div className="flex-grow">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="w-full border rounded-lg p-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                />
            </div>
            <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isLoading || !newComment.trim()}
            >
                {isLoading ? '등록 중...' : '등록'}
            </button>
            </div>
        </form>
        </div>
    )
}
