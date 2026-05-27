import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { mbtiCharacters } from '../data/characters'

export default function ResultPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { mbti, description } = state ?? {
    mbti: 'ISFP',
    description: '조용하지만 누구보다 강한 내면을 가진 당신은, 말보다 행동으로 마음을 전하는 사람입니다. 혼자만의 시간을 소중히 여기면서도, 진심으로 아끼는 사람을 위해서라면 무엇이든 할 수 있는 용기를 지니고 있어요.',
  }

  const character = mbti ? mbtiCharacters[mbti] : null
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const key = import.meta.env.VITE_KAKAO_APP_KEY
    if (key && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(key)
    }
  }, [])

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.origin).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleKakaoShare() {
    if (!window.Kakao?.Share) return
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `나의 기묘한 이야기 캐릭터는 ${character?.name}!`,
        description: '당신의 캐릭터는 누구일까요?',
        imageUrl: `${window.location.origin}/og-image.png`,
        link: { mobileWebUrl: window.location.origin, webUrl: window.location.origin },
      },
      buttons: [{ title: '나도 해보기', link: { mobileWebUrl: window.location.origin, webUrl: window.location.origin } }],
    })
  }

  function handleTwitterShare() {
    const text = `나의 기묘한 이야기 캐릭터는 ${character?.name}!\n당신의 캐릭터는 누구일까요?`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin)}`,
      '_blank',
    )
  }

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-x-clip py-10">

      {/* 배경 비네트 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0d0000_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[380px] flex flex-col items-center px-8 gap-6">

        {/* 상단 레이블 */}
        <p className="text-gray-300 text-xs tracking-widest">당신의 캐릭터는</p>

        {/* 캐릭터 이미지 */}
        {character && (
          <img
            src={character.image}
            alt={character.name}
            className="w-52 h-52 object-contain drop-shadow-[0_0_24px_rgba(233,1,1,0.4)]"
          />
        )}

        {/* 캐릭터 이름 */}
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

        {/* 구분선 */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e90101] to-transparent opacity-40" />

        {/* 성격 설명 */}
        {description && (
          <p className="text-gray-300 text-sm leading-7 text-center">
            {description}
          </p>
        )}

        {/* 공유 버튼 */}
        <div className="flex gap-5">
          {/* 링크 복사 */}
          <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center group-hover:border-gray-400 transition-all duration-200">
              {copied
                ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#e90101]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-gray-200 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              }
            </div>
            <span className="text-gray-500 text-xs">{copied ? '복사완료' : '링크 복사'}</span>
          </button>

          {/* 카카오톡 */}
          <button onClick={handleKakaoShare} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center group-hover:border-gray-400 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-gray-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.568 1.508 4.83 3.8 6.2l-.97 3.6 4.2-2.77c.94.18 1.93.27 2.97.27 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
              </svg>
            </div>
            <span className="text-gray-500 text-xs">카카오톡</span>
          </button>

          {/* X (트위터) */}
          <button onClick={handleTwitterShare} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-full border border-gray-500 flex items-center justify-center group-hover:border-gray-400 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="text-gray-500 text-xs">X(트위터)</span>
          </button>
        </div>

        {/* 다시 하기 버튼 */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 border-2 border-[#e90101] text-[#e90101] text-sm rounded-full hover:bg-[#1a0000] transition-all duration-200"
        >
          다시 하기
        </button>

      </div>

      <p className="absolute bottom-5 text-gray-700 text-xs tracking-widest z-10">
        HAWKINS, INDIANA · 1983
      </p>

    </div>
  )
}
