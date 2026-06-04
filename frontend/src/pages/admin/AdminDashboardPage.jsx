import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, removeToken } from '../../utils/auth'

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => {
        if (res.status === 401) {
          removeToken()
          navigate('/admin/login')
          return null
        }
        return res.json()
      })
      .then(json => { if (json) setData(json) })
      .catch(() => setError(true))
  }, [])

  function handleLogout() {
    removeToken()
    navigate('/admin/login')
  }

  const mbtiEntries = data ? Object.entries(data.mbtiDistribution).sort((a, b) => b[1] - a[1]) : []
  const mbtiMax = mbtiEntries.length > 0 ? mbtiEntries[0][1] : 1

  const trendEntries = data ? Object.entries(data.dailyTrend) : []
  const trendMax = trendEntries.length > 0 ? Math.max(...trendEntries.map(([, v]) => v)) : 1

  return (
    <div className="min-h-screen bg-slate-50">

      {/* 헤더 */}
      <header className="bg-white border-b border-slate-200 py-4 flex items-center justify-between" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-base font-bold text-slate-800">관리자 대시보드</h1>
            <p className="text-xs text-slate-500">기묘한 이야기 성격 테스트</p>
          </div>
          <button onClick={() => navigate('/admin/results')} className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
            결과 목록 →
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-rose-500 transition-colors"
        >
          로그아웃
        </button>
      </header>

      <main className="max-w-screen-2xl mx-auto w-full px-20 py-8 flex flex-col gap-6">

        {error && (
          <p className="text-sm text-rose-500">데이터를 불러오지 못했습니다.</p>
        )}

        {!data && !error && (
          <p className="text-sm text-slate-500">불러오는 중...</p>
        )}

        {data && (
          <>
            {/* 요약 카드 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm text-slate-500">총 참여자</p>
                <p className="text-4xl font-bold text-slate-800 mt-1">{data.totalCount.toLocaleString()}<span className="text-lg font-normal text-slate-500 ml-1">명</span></p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm text-slate-500">오늘 참여자</p>
                <p className="text-4xl font-bold text-rose-500 mt-1">{data.todayCount.toLocaleString()}<span className="text-lg font-normal text-slate-500 ml-1">명</span></p>
              </div>
            </div>

            {/* MBTI 분포 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-5">MBTI 분포</h2>
              {mbtiEntries.length === 0
                ? <p className="text-sm text-slate-500">데이터 없음</p>
                : (
                  <div className="flex flex-col gap-3">
                    {mbtiEntries.map(([mbti, count]) => (
                      <div key={mbti} className="flex items-center gap-3">
                        <span className="text-sm font-mono text-slate-600 w-12">{mbti}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(count / mbtiMax) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-500 w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>

            {/* 일별 추이 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-5">일별 추이 (최근 7일)</h2>
              {trendEntries.length === 0
                ? <p className="text-sm text-slate-500">데이터 없음</p>
                : (
                  <div className="flex flex-col gap-3">
                    {trendEntries.map(([date, count]) => (
                      <div key={date} className="flex items-center gap-3">
                        <span className="text-sm text-slate-500 w-24">{date}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(count / trendMax) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-500 w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          </>
        )}

      </main>
    </div>
  )
}
