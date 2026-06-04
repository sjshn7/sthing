import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, removeToken } from '../../utils/auth'

const MBTI_LIST = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ']

export default function AdminResultsPage() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [page, setPage] = useState(0)
  const [mbtiFilter, setMbtiFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }

  function buildUrl() {
    const params = new URLSearchParams()
    params.set('page', page)
    if (mbtiFilter) params.set('mbti', mbtiFilter)
    if (dateFilter) params.set('date', dateFilter)
    return `http://localhost:8080/api/admin/results?${params.toString()}`
  }

  function fetchResults() {
    setLoading(true)
    fetch(buildUrl(), {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => {
        if (res.status === 401) { removeToken(); navigate('/admin/login'); return null }
        return res.json()
      })
      .then(json => { if (json) setData(json) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchResults() }, [page, mbtiFilter, dateFilter])

  function handleDelete(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return
    fetch(`http://localhost:8080/api/admin/results/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => {
        if (!res.ok) throw new Error()
        showToast('삭제되었습니다.')
        // 현재 페이지 마지막 항목 삭제 시 이전 페이지로 이동
        if (data.content.length === 1 && page > 0) {
          setPage(p => p - 1) // useEffect가 자동으로 refetch
        } else {
          fetchResults()
        }
      })
      .catch(() => showToast('삭제에 실패했습니다.', 'error'))
  }

  function handleLogout() {
    removeToken()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* 토스트 */}
      {toast && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg text-sm shadow-lg text-white
          ${toast.type === 'error' ? 'bg-rose-500' : 'bg-slate-700'}`}>
          {toast.message}
        </div>
      )}

      {/* 헤더 */}
      <header className="bg-white border-b border-slate-200 py-4" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-base font-bold text-slate-800">결과 목록</h1>
              <p className="text-xs text-slate-500">기묘한 이야기 성격 테스트</p>
            </div>
            <button onClick={() => navigate('/admin/dashboard')} className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
              ← 대시보드
            </button>
          </div>
          <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-rose-500 transition-colors">
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto w-full px-20 py-8 flex flex-col gap-6">

        {/* 필터 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4">
          <select
            value={mbtiFilter}
            onChange={e => { setMbtiFilter(e.target.value); setPage(0) }}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400 transition-all"
          >
            <option value="">전체 MBTI</option>
            {MBTI_LIST.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={e => { setDateFilter(e.target.value); setPage(0) }}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-400 transition-all"
          />

          {(mbtiFilter || dateFilter) && (
            <button
              onClick={() => { setMbtiFilter(''); setDateFilter(''); setPage(0) }}
              className="text-sm text-slate-500 hover:text-rose-500 transition-colors"
            >
              필터 초기화
            </button>
          )}

          {data && (
            <span className="ml-auto text-sm text-slate-500">총 {data.totalElements.toLocaleString()}개</span>
          )}
        </div>

        {/* 테이블 */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-3 text-slate-500 font-medium w-16">ID</th>
                <th className="text-left px-6 py-3 text-slate-500 font-medium w-20">MBTI</th>
                <th className="text-left px-6 py-3 text-slate-500 font-medium">설명</th>
                <th className="text-left px-6 py-3 text-slate-500 font-medium w-20">조회수</th>
                <th className="text-left px-6 py-3 text-slate-500 font-medium w-40">작성일</th>
                <th className="text-left px-6 py-3 text-slate-500 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="text-center py-12 text-slate-400">불러오는 중...</td></tr>
              )}
              {!loading && data?.content.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-slate-400">데이터 없음</td></tr>
              )}
              {!loading && data?.content.map(item => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-500">{item.id}</td>
                  <td className="px-6 py-4 font-mono font-semibold text-slate-700">{item.mbti}</td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{item.description}</td>
                  <td className="px-6 py-4 text-slate-500">{item.viewCount}</td>
                  <td className="px-6 py-4 text-slate-500">{item.createdAt.slice(0, 10)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs text-rose-400 hover:text-rose-600 transition-colors"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 — 결과가 있으면 항상 표시 */}
        {data && data.totalPages > 0 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => p - 1)}
              disabled={page === 0}
              className="px-4 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              이전
            </button>
            <span className="text-sm text-slate-500">{page + 1} / {data.totalPages}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= data.totalPages - 1}
              className="px-4 py-2 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              다음
            </button>
          </div>
        )}

      </main>
    </div>
  )
}
