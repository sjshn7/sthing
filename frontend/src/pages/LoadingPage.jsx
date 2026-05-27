import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import stLogo from '../assets/st-logo.png'

const SYSTEM_PROMPT = `당신은 MBTI 성격 분석 전문가입니다.
사용자가 24개의 질문에 답변한 결과를 바탕으로 아래 두 가지를 반환해야 합니다.

[분석 기준]
각 질문의 선택지에는 다음과 같은 성향이 반영되어 있습니다.
- E(외향) vs I(내향): Q1~Q6
- S(감각) vs N(직관): Q7~Q12
- T(사고) vs F(감정): Q13~Q18
- J(판단) vs P(인식): Q19~Q23

각 축별로 더 많이 선택된 성향을 최종 유형으로 결정하세요.
동점일 경우 T>F, J>P, E>I, S>N 순으로 우선합니다.

[반환 형식]
반드시 아래 JSON 형식으로만 응답하세요.
다른 텍스트, 설명, 마크다운 코드블록은 절대 포함하지 마세요.

{
  "mbti": "MBTI 4자리 코드 (예: ISFP)",
  "description": "사용자의 답변을 바탕으로 이 사람의 성격을 2~3문장으로 설명. 따뜻하고 공감가는 톤으로 작성. 캐릭터 이름은 언급하지 말 것. 반드시 한국어로 작성."
}`

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

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % messages.length)
    }, 1000)

    const minDelay = new Promise(resolve => setTimeout(resolve, 2500))

    async function analyze() {
      const formattedAnswers = state.answers
        .map(a => `Q${a.id}: ${a.value}`)
        .join('\n')

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: `사용자 답변:\n${formattedAnswers}` }],
        }),
      })

      const data = await res.json()
      return JSON.parse(data.content[0].text)
    }

    Promise.all([analyze(), minDelay])
      .then(([result]) => {
        clearInterval(msgTimer)
        navigate('/result', { state: { answers: state.answers, ...result } })
      })
      .catch(err => {
        console.error('분석 실패:', err)
        clearInterval(msgTimer)
        navigate('/result', { state: { answers: state.answers, mbti: null, description: null } })
      })

    return () => clearInterval(msgTimer)
  }, [])

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-hidden">

      {/* 배경 비네트 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0d0000_100%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10 px-8">

        {/* 로고 */}
        <img
          src={stLogo}
          alt="Stranger Things"
          className="w-full max-w-[280px] object-contain opacity-80"
        />

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
