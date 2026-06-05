import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions } from '../data/questions'
import demogorgon from '../assets/demo.png'
import hawkins from '../assets/hawkins.png'

export default function TestPage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [selected, setSelected] = useState(null)

  const total = questions.length
  const question = questions[current]
  const progress = ((current) / total) * 100

  function handleSelect(idx, value) {
    setSelected({ idx, value })
  }

  function handleNext() {
    if (selected === null) return
    const newAnswers = [...answers]
    newAnswers[current] = { id: question.id, value: selected.value, idx: selected.idx }
    setAnswers(newAnswers)

    if (current + 1 >= total) {
      navigate('/loading', { state: { answers: newAnswers.filter(Boolean) } })
    } else {
      setSelected(newAnswers[current + 1] ?? null)
      setCurrent(current + 1)
    }
  }

  function handlePrev() {
    if (current === 0) return
    const newAnswers = [...answers]
    if (selected !== null) {
      newAnswers[current] = { id: question.id, value: selected.value, idx: selected.idx }
      setAnswers(newAnswers)
    }
    setSelected(newAnswers[current - 1] ?? null)
    setCurrent(current - 1)
  }

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-x-clip">

      {/* 배경 비네트 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0d0000_100%)] pointer-events-none" />

      {/* 진행 바 */}
      <div className="w-full max-w-[480px] relative z-10 h-16 flex items-center px-8">
        {/* 트랙 */}
        <div className="absolute left-[12px] right-14 h-2 bg-[#4a1010] rounded-full">
          <div
            className="h-full bg-[#e90101] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 데모고르곤 — 채워지는 바 끝에 위치 */}
        <img
          src={demogorgon}
          alt="Demogorgon"
          className="absolute h-9 w-9 object-contain transition-all duration-500"
          style={{ left: `calc(15px + (100% - 68px) * ${progress / 100} - 18px)` }}
        />

        {/* 호킨스 표지판 — 오른쪽 고정 */}
        <img
          src={hawkins}
          alt="Welcome to Hawkins"
          className="absolute right-2 h-9 w-9 object-contain"
        />
      </div>

      {/* 콘텐츠 */}
      <div className="w-full flex flex-col items-center z-10">
        <div className="w-full max-w-[350px] flex flex-col px-8 gap-3">

          {/* 문항 번호 */}
          <p className="text-gray-600 text-xs tracking-widest mb-4">
            <span className="text-[#e90101]">{current + 1}</span> / {total}
          </p>

          {/* 질문 */}
          <h2 className="text-white text-lg font-medium leading-relaxed mb-5">
            {question.question}
          </h2>

          {/* 선택지 */}
          <div className="flex flex-col gap-3 mb-12">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx, option.value)}
                className={`w-full text-left px-5 py-4 border rounded-lg text-sm leading-relaxed transition-all duration-200
                ${selected?.idx === idx
                    ? 'border-[#e90101] text-white bg-[#1a0000]'
                    : 'border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                  }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          {/* 하단 버튼 */}
          <div className="flex gap-3">
            {current > 0 && (
              <button
                onClick={handlePrev}
                className="w-1/2 py-3 border border-white text-white text-sm rounded-full hover:border-gray-600 hover:text-gray-400 transition-all duration-200"
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={selected === null}
              className={`${current > 0 ? 'w-1/2' : 'w-full'} py-3 text-sm rounded-full transition-all duration-200
              ${selected !== null
                  ? 'border-2 border-[#e90101] text-[#e90101] hover:bg-[#1a0000]'
                  : 'border-2 border-white text-white cursor-not-allowed'
                }`}
            >
              {current + 1 === total ? '결과 보기' : '다음'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
