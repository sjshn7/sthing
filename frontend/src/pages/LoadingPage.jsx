import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { calculateMbti, mbtiDescriptions } from '../utils/mbti'

const messages = [
  '성격 분석 중...',
  '뒤집힌 세계의 문이 열리고 있어요...',
  '당신의 기묘한 이야기를 찾고 있어요...',
]

const BULB_COLORS = ['#e90101', '#f5a623', '#4caf50', '#2196f3', '#9c27b0', '#ff69b4', '#00bcd4', '#ffeb3b']

export default function LoadingPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [msgIdx, setMsgIdx] = useState(0)
  // StrictMode에서 useEffect가 두 번 실행되는 것을 방지
  const hasSaved = useRef(false)

  useEffect(() => {
    if (hasSaved.current) return
    hasSaved.current = true
    const msgTimer = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % messages.length)
    }, 1000)

    const minDelay = new Promise(resolve => setTimeout(resolve, 2500))

    async function analyzeAndSave() {
      const mbti = calculateMbti(state.answers)
      const description = mbtiDescriptions[mbti]

      const saveRes = await fetch('http://localhost:8080/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mbti, description }),
      })
      const saved = await saveRes.json()

      return { mbti, description, shareId: saved.shareId }
    }

    Promise.all([analyzeAndSave(), minDelay])
      .then(([result]) => {
        clearInterval(msgTimer)
        navigate('/result', { state: { answers: state.answers, ...result } })
      })
      .catch(err => {
        console.error('저장 실패:', err)
        const mbti = calculateMbti(state.answers)
        const description = mbtiDescriptions[mbti]
        clearInterval(msgTimer)
        navigate('/result', { state: { answers: state.answers, mbti, description } })
      })

    return () => clearInterval(msgTimer)
  }, [])

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-hidden">

      {/* 배경 비네트 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0d0000_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10 px-8">

        {/* 전구 불빛 */}
        <div className="flex gap-4">
          {BULB_COLORS.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 8px 3px ${color}`,
                animation: `bulbFlicker 1.6s ${i * 0.18}s infinite`,
              }}
            />
          ))}
        </div>

        {/* 메시지 */}
        <p
          key={msgIdx}
          className="text-gray-400 text-sm tracking-widest"
          style={{ animation: 'fadeIn 0.4s ease-in' }}
        >
          {messages[msgIdx]}
        </p>

      </div>

      <p className="absolute bottom-5 text-gray-700 text-xs tracking-widest z-10">
        HAWKINS, INDIANA · 1983
      </p>

      <style>{`
        @keyframes bulbFlicker {
          0%, 100% { opacity: 1; }
          45% { opacity: 0.15; }
          50% { opacity: 0.9; }
          55% { opacity: 0.15; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}
