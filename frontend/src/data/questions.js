export const questions = [
  // 1라운드: E/I → S/N → T/F → J/P
  {
    id: 1,
    question: '곧 밝혀질 엄청난 비밀을 혼자만 미리 알고 있을 때 당신은?',
    options: [
      { text: '가장 믿을 수 있는 한 명한테만 조용히 털어놓는다', value: 'I' },
      { text: '믿든 안 믿든 주변 사람들한테 미리 언질을 준다', value: 'E' },
      { text: '혼자 끌어안고 때를 기다린다', value: 'I' },
      { text: '인터뷰로 다 폭로해버린다', value: 'E' },
    ],
  },
  {
    id: 6,
    question: '길을 걷다 수상한 장면을 목격했다. 당신은?',
    options: [
      { text: '혹시 모르니 눈에 보이는 것들을 최대한 자세히 기억해둔다', value: 'S' },
      { text: '그냥 지나치지만 계속 찜찜한 느낌이 떠나질 않는다', value: 'N' },
      { text: '직접 가까이 가서 확인한다', value: 'S' },
      { text: '멀리서 지켜보며 어떤 상황인지 추리하기 시작한다', value: 'N' },
    ],
  },
  {
    id: 11,
    question: '친구가 나한테 솔직한 피드백을 요청했다. 당신은?',
    options: [
      { text: '어떤 건 좋고 어떤 건 별로인지 구체적으로 알려준다', value: 'T' },
      { text: '솔직하되 좋은 말 위주로 골라서 전달한다', value: 'F' },
      { text: '대충 크게 고칠 부분만 짚어준다', value: 'T' },
      { text: '괜히 사이가 틀어질 수도 있으니 칭찬으로 넘어간다', value: 'F' },
    ],
  },
  {
    id: 16,
    question: '평소 계획을 세울 때 당신은?',
    options: [
      { text: '할 일을 세밀하고 구체적으로 정리한다', value: 'J' },
      { text: '큰 방향만 잡고 세부 사항은 상황에 따라 결정한다', value: 'P' },
      { text: '현실적인 목표와 기한을 먼저 설정한다', value: 'J' },
      { text: '계획을 잘 세우지 않는다', value: 'P' },
    ],
  },

  // 2라운드
  {
    id: 2,
    question: '낯선 사람과 단둘이 있게 됐다. 당신은?',
    options: [
      { text: '먼저 말을 걸고 분위기를 풀며 리드한다', value: 'E' },
      { text: '상대가 먼저 말 걸어오길 기다린다', value: 'I' },
      { text: '민망하지만 가벼운 인사로 아이스 브레이킹을 시도한다', value: 'E' },
      { text: '딴짓을 하며 제발 말 걸지 말라고 속으로 생각한다', value: 'I' },
    ],
  },
  {
    id: 9,
    question: '누군가 당신에게 뒤집힌 세계가 실제로 존재한다고 말했다. 당신은?',
    options: [
      { text: '무시한다', value: 'S' },
      { text: '왠지 그럴 것 같았다', value: 'N' },
      { text: '증거를 직접 확인해야 믿을 수 있다', value: 'S' },
      { text: '내가 지금 꿈을 꾸나? 라고 생각한다', value: 'N' },
    ],
  },
  {
    id: 13,
    question: '분명히 내가 맞는데 상대가 끝까지 인정하지 않는다. 당신은?',
    options: [
      { text: '인정할 때까지 논리적으로 설득한다', value: 'T' },
      { text: '관계가 틀어질까봐 적당히 넘어간다', value: 'F' },
      { text: '적당히 대화하다가 그냥 포기한다', value: 'F' },
      { text: '더 잘 설득할 방법을 다시 고민한다', value: 'T' },
    ],
  },
  {
    id: 20,
    question: '평소 나의 책상 상태는?',
    options: [
      { text: '늘 완벽하고 깔끔하게 정리되어 있다', value: 'J' },
      { text: '매번 주변 사람들에게 잔소리를 들을 정도로 더럽다', value: 'P' },
      { text: '남들이 보기엔 좀 어지럽지만 나만의 규칙이 있다', value: 'J' },
      { text: '물건이 많이 올라오진 않았지만 딱히 정리하지도 않는다', value: 'P' },
    ],
  },

  // 3라운드
  {
    id: 4,
    question: '여럿이 함께하는 자리에서 내 얘기가 화제가 됐다. 당신은?',
    options: [
      { text: '신나서 더 적극적으로 얘기한다', value: 'E' },
      { text: '관심받는 게 쑥스러워 빨리 화제를 돌리고 싶다', value: 'I' },
      { text: '나쁘지 않다. 자연스럽게 즐긴다', value: 'E' },
      { text: '나에 대해 얘기하는 게 불편하고 그 자리를 피하고 싶다', value: 'I' },
    ],
  },
  {
    id: 7,
    question: '새로운 걸 배울 때 당신은?',
    options: [
      { text: '단계별로 차근차근 익히는 게 좋다', value: 'S' },
      { text: '전체 개념을 먼저 파악하고 나서 세부사항을 본다', value: 'N' },
      { text: '실제로 직접 해보면서 익힌다', value: 'S' },
      { text: '왜 그런지 원리부터 이해해야 직성이 풀린다', value: 'N' },
    ],
  },
  {
    id: 12,
    question: '영화/드라마를 볼 때 당신에게 제일 중요한 것은?',
    options: [
      { text: '내용과 개연성', value: 'T' },
      { text: '등장인물의 감정선', value: 'F' },
      { text: '감독이나 작가의 의도와 메세지', value: 'T' },
      { text: '전체적인 감성과 분위기', value: 'F' },
    ],
  },
  {
    id: 17,
    question: '내가 없는 사이 팀원들이 멋대로 일을 진행했다. 당신은?',
    options: [
      { text: '왜 나한테 말하지 않았는지 이해가 안 된다', value: 'J' },
      { text: '결과만 좋으면 상관없다', value: 'P' },
      { text: '스트레스 받아 쓰러질 것 같다', value: 'J' },
      { text: '좀 당황스럽지만 크게 신경 쓰지 않는다', value: 'P' },
    ],
  },

  // 4라운드
  {
    id: 5,
    question: '힘든 일이 생겼을 때 당신은?',
    options: [
      { text: '혼자 있고 싶어서 모두와 연락을 끊는다', value: 'I' },
      { text: '친한 친구한테 전화해서 털어놓는다', value: 'E' },
      { text: '기분 전환할 사람을 찾아 약속을 잡는다', value: 'E' },
      { text: '취미 활동을 통해 기분을 전환한다', value: 'I' },
    ],
  },
  {
    id: 10,
    question: '누군가 나한테 거짓말을 하는 것 같다. 당신은?',
    options: [
      { text: '말의 앞뒤가 맞는지 구체적인 사실을 따져본다', value: 'S' },
      { text: '말을 듣는 순간 왠지 느낌적으로 알아챘다', value: 'N' },
      { text: '반박할 증거를 조용히 모은다', value: 'S' },
      { text: '왜 거짓말을 하는지 그 이유가 더 궁금하다', value: 'N' },
    ],
  },
  {
    id: 14,
    question: '사이가 나빴던 사람이 갑자기 도움을 요청해왔다. 당신은?',
    options: [
      { text: '왜 갑자기 도움을 요청하는지 의도를 먼저 파악한다', value: 'T' },
      { text: '과거는 과거다. 지금 힘들다면 일단 돕는다', value: 'F' },
      { text: '이 상황이 나에게 득이 되는지 따져본다', value: 'T' },
      { text: '예전에 있었던 일이 자꾸 마음에 걸려 거절한다', value: 'F' },
    ],
  },
  {
    id: 19,
    question: '여럿이 함께하는 상황에서 아무도 결정을 안 내리고 있다. 당신은?',
    options: [
      { text: '답답해서 내가 먼저 결론을 낸다', value: 'J' },
      { text: '누군가 나서겠지 싶어 기다린다', value: 'P' },
      { text: '제일 별로인 것부터 지워가며 선택지를 좁혀나간다', value: 'J' },
      { text: '그러거나 말거나 관심없고 나만의 할 일을 한다', value: 'P' },
    ],
  },

  // 5라운드
  {
    id: 3,
    question: '친구가 근처에 들렀으니 잠깐 만나자고 한다면?',
    options: [
      { text: '당연하지! 얼른 나간다', value: 'E' },
      { text: '고민되지만 결국 핑계를 댄다', value: 'I' },
      { text: '고민되지만 그래도 나간다', value: 'E' },
      { text: '안읽씹 하다가 뒤늦게 답장한다', value: 'I' },
    ],
  },
  {
    id: 8,
    question: '당신이 더 잘 기억하는 건?',
    options: [
      { text: '그날 있었던 구체적인 사실과 대화 내용', value: 'S' },
      { text: '전체적인 맥락과 흐름', value: 'N' },
      { text: '그 순간의 분위기와 주변 상황', value: 'S' },
      { text: '그 경험이 나에게 어떤 의미였는지', value: 'N' },
    ],
  },
  {
    id: 15,
    question: '친구가 "그 옷 너한테 안어울리는 것 같아" 라고 했을때 당신은?',
    options: [
      { text: '어떤 점이 문제인지 궁금하다', value: 'T' },
      { text: '나는 마음에 들기 때문에 상관없다', value: 'F' },
      { text: '어떤 의도로 말한건지 파악하려 한다', value: 'T' },
      { text: '상처받고 친구의 말이 계속 신경쓰인다', value: 'F' },
    ],
  },
  {
    id: 18,
    question: '세워둔 계획이 완전히 틀어졌을때 당신은?',
    options: [
      { text: '당황스럽지만 다시 계획을 세운다', value: 'J' },
      { text: '오히려 어떻게 흘러갈지 흥미롭다', value: 'P' },
      { text: '이미 플랜B가 있다', value: 'J' },
      { text: '유연하게 대처하는 편이라 크게 당황하지 않는다', value: 'P' },
    ],
  },
]

export const mbtiToCharacter = {
  ISFP: '일레븐',
  INFJ: '마이크',
  ISFJ: '윌',
  ENFJ: '루카스',
  ESFJ: '더스틴',
  ISTJ: '맥스',
  ESTJ: '낸시',
  INFP: '조나단',
  ESFP: '스티브',
  INTP: '로빈',
  ENFP: '조이스',
  ISTP: '호퍼',
  INTJ: '헨리',
  ENTP: '머레이',
  ENTJ: '브래너',
  ESTP: '빌리',
}
