import { useNavigate } from 'react-router-dom'
import stLogo from '../assets/st-logo.png'

export default function IntroPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-hidden">

      {/* 배경 비네트 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0d0000_100%)] pointer-events-none" />

      {/* 콘텐츠 컨테이너 */}
      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center px-6 py-12">

        {/* 로고 */}
        <img
          src={stLogo}
          alt="Stranger Things"
          className="w-full max-w-[360px] object-contain mb-8 -translate-y-[70px]"
        />

        {/* 서브타이틀 */}
        <div className="text-center mb-8 -translate-y-[50px]">
          <h2
            className="text-2xl sm:text-3xl font-black leading-snug tracking-normal"
            style={{
              fontFamily: "'Black Han Sans', sans-serif",
              color: '#000',
              WebkitTextStroke: '1px #e90101',
            }}
          >
            기묘한 이야기<br />성격 테스트
          </h2>
          <p className="text-gray-400 text-sm tracking-wider mt-3">
            20문항으로 알아보는 나의 캐릭터
          </p>
        </div>

        {/* 참여자 수 */}
        <p className="text-gray-400 text-sm mb-8 -translate-y-[20px]">
          <span className="text-[#e90101] font-medium">12,847</span>명이 이미 참여했어요
        </p>

        {/* 시작 버튼 */}
        <button
          onClick={() => navigate('/test')}
          className="w-70 h-15 mt-4 px-4 py-10 border-4 border-[#e90101] text-[#e90101] text-sm tracking-[0.2em] rounded-full transition-all duration-300 hover:border-white hover:text-white active:scale-95"
        >
          테스트 시작하기
        </button>

      </div>

      {/* 하단 장식 */}
      <p className="absolute bottom-5 text-gray-700 text-xs tracking-widest z-10">
        HAWKINS, INDIANA · 1983
      </p>
    </div>
  )
}
