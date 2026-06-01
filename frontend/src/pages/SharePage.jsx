import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mbtiCharacters } from '../data/characters'

export default function SharePage() {
  const { shareId } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8080/api/results/${shareId}`)
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => setResult(data))
      .catch(() => setError(true))
  }, [shareId])

  const character = result?.mbti ? mbtiCharacters[result.mbti] : null

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-x-clip py-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0d0000_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[380px] flex flex-col items-center px-8 gap-6">
        {error ? (
          <p className="text-gray-400 text-sm">결과를 찾을 수 없습니다.</p>
        ) : !result ? (
          <p className="text-gray-400 text-sm tracking-widest">불러오는 중...</p>
        ) : (
          <>
            <p className="text-gray-300 text-xs tracking-widest">이 사람의 캐릭터는</p>

            {character && (
              <img
                src={character.image}
                alt={character.name}
                className="w-52 h-52 object-contain drop-shadow-[0_0_24px_rgba(233,1,1,0.4)]"
              />
            )}

            <p
              className="text-2xl font-black"
              style={{
                fontFamily: "'Black Han Sans', sans-serif",
                color: '#000',
                WebkitTextStroke: '1px #9e0202',
              }}
            >
              {character?.name ?? '알 수 없음'}
            </p>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e90101] to-transparent opacity-40" />

            {result.description && (
              <p className="text-gray-300 text-sm leading-7 text-center">
                {result.description}
              </p>
            )}
          </>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 border-2 border-[#e90101] text-[#e90101] text-sm rounded-full hover:bg-[#1a0000] transition-all duration-200"
        >
          나도 해보기
        </button>
      </div>

      <p className="absolute bottom-5 text-gray-700 text-xs tracking-widest z-10">
        HAWKINS, INDIANA · 1983
      </p>
    </div>
  )
}
