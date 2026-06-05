import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mbtiCharacters } from '../data/characters'

export default function SharePage() {
  const { shareId } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [error, setError] = useState(false)
  const [copied, setCopied] = useState(false)
  // StrictMode에서 useEffect가 두 번 실행되는 것을 방지 (링크접속수 중복 증가 방지)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true
    fetch(`http://localhost:8080/api/results/${shareId}`)
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => setResult(data))
      .catch(() => setError(true))
  }, [shareId])

  useEffect(() => {
    const key = import.meta.env.VITE_KAKAO_APP_KEY
    if (key && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(key)
    }
  }, [])

  const character = result?.mbti ? mbtiCharacters[result.mbti] : null
  const shareUrl = window.location.href

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleKakaoShare() {
    if (!window.Kakao?.Share) return
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `이 사람의 기묘한 이야기 캐릭터는 ${character?.name}!`,
        description: '당신의 캐릭터는 누구일까요?',
        imageUrl: `${window.location.origin}/og-image.png`,
        link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
      },
      buttons: [{ title: '나도 해보기', link: { mobileWebUrl: window.location.origin, webUrl: window.location.origin } }],
    })
  }

  function handleTwitterShare() {
    const text = `이 사람의 기묘한 이야기 캐릭터는 ${character?.name}!\n당신의 캐릭터는 누구일까요?`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
    )
  }

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

            {/* 공유 버튼 */}
            <div className="flex gap-5">
              <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center group-hover:border-gray-400 transition-all duration-200">
                  {copied
                    ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#e90101]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-gray-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  }
                </div>
                <span className="text-gray-500 text-xs">{copied ? '복사완료' : '링크 복사'}</span>
              </button>

              <button onClick={handleKakaoShare} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center group-hover:border-gray-400 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-gray-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.568 1.508 4.83 3.8 6.2l-.97 3.6 4.2-2.77c.94.18 1.93.27 2.97.27 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
                  </svg>
                </div>
                <span className="text-gray-500 text-xs">카카오톡</span>
              </button>

              <button onClick={handleTwitterShare} className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center group-hover:border-gray-400 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="text-gray-500 text-xs">X(트위터)</span>
              </button>
            </div>
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
