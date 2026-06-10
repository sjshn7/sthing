import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../utils/auth'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [adminId, setAdminId] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, pw }),
      })

      if (!res.ok) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.')
        return
      }

      const data = await res.json()
      setToken(data.token)
      navigate('/admin/dashboard')
    } catch {
      setError('서버에 연결할 수 없습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-16">

      <div className="w-full max-w-3xl">

        {/* 제목 영역 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">관리자 로그인</h1>
          <p className="text-sm text-slate-400 mt-2">기묘한 이야기 성격 테스트</p>
        </div>

        {/* 폼 카드 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-12 min-h-96 flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4 py-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-slate-600">아이디</label>
              <input
                type="text"
                value={adminId}
                onChange={e => setAdminId(e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                placeholder="아이디를 입력하세요"
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-slate-600">비밀번호</label>
              <input
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-sky-400 hover:bg-sky-500 text-white rounded-xl py-3 text-sm font-semibold transition-colors disabled:opacity-50 mt-2 w-1/2"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
