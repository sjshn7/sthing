export const questions = [
  // 1라운드: E/I → S/N → T/F → J/P
  {
    id: 1,
    question: '당신이 선호하는 인간관계 형태는??',
    options: [
      { text: '정말 마음이 맞는 소수의 친구 몇 명과 깊은 소통을 하는 게 좋다', value: 'I' },
      { text: '친한 무리가 있지만, 새로운 사람들과의 모임도 크게 거부감 없다', value: 'E' },
      { text: '다양한 분야의 새로운 사람들을 만나며 인맥을 넓히는 게 즐겁다', value: 'E' },
      { text: '극소수의 영혼의 단짝 외에는 깊은 관계를 맺는 것 자체가 피곤하다', value: 'I' },
    ],
  },
  {
    id: 11,
    question: '친구가 나한테 솔직한 피드백을 요청한다면?',
    options: [
      { text: '어떤 건 좋고 어떤 건 별로인지 구체적으로 알려준다', value: 'T' },
      { text: '대충 크게 고칠 부분만 짚어준다', value: 'T' },
      { text: '솔직하되 좋은 말 위주로 골라서 전달한다', value: 'F' },
      { text: '괜히 사이가 틀어질 수도 있으니 칭찬으로 넘어간다', value: 'F' },
    ],
  },
  {
    id: 16,
    question: '친구와 12시 약속일 때 당신은?',
    options: [
      { text: '미리 11시 40분쯤 도착해서 기다린다', value: 'J' },
      { text: '늦지 않게 출발해서 11시 55분쯤 도착한다', value: 'J' },
      { text: '가끔 지각하지만 보통 12시 5분쯤 아슬아슬하게 도착한다', value: 'P' },
      { text: '매번 지각해서 친구들이 이미 나를 파악하고 있다', value: 'P' },
    ],
  },
  {
    id: 6,
    question: '멍 때릴 때 당신의 머릿속은?',
    options: [
      { text: '정말 아무 생각도 안한다', value: 'S' },
      { text: '오늘 했던 일이나 내일 할 일에 대해 생각한다', value: 'S' },
      { text: '생각이 꼬리를 물고 이어진다', value: 'N' },
      { text: '말도 안되는 공상을 한다', value: 'N' },
    ],
  },

  // 2라운드
  {
    id: 9,
    question: '평소 요리할 때 당신의 스타일은?',
    options: [
      { text: '적혀있는 계량,순서,시간을 그대로 지킨다', value: 'S' },
      { text: '대충 흝어보고 전체적인 흐름만 파악한 뒤 감으로 진행한다', value: 'N' },
      { text: '레시피를 기본으로 따르되 이전 경험을 바탕으로 진행한다', value: 'S' },
      { text: '레시피 따위 보지 않고 내 감대로 한다', value: 'N' },
    ],
  },
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
    id: 13,
    question: '친구의 생일 선물을 고르는 방법은?',
    options: [
      { text: '잘 쓰는게 제일 중요하기 때문에 필요한게 있는지 물어본다', value: 'T' },
      { text: '어떤 걸 주면 좋아할지 미리 관찰해서 준비한다', value: 'F' },
      { text: '서프라이즈로 내가 알아서 준비한다', value: 'F' },
      { text: '누구나 잘 쓸만한 무난한 것으로 준비한다', value: 'T' },
    ],
  },
  {
    id: 20,
    question: '평소 나의 책상 상태는?',
    options: [
      { text: '늘 완벽하고 깔끔하게 정리되어 있다', value: 'J' },
      { text: '남들이 보기엔 좀 어지럽지만 나만의 규칙이 있다', value: 'J' },
      { text: '물건이 많진 않지만 딱히 정리하지도 않는다', value: 'P' },
      { text: '매번 잔소리를 들을 정도로 더럽다', value: 'P' },
    ],
  },

  // 3라운드
  {
    id: 4,
    question: '여럿이 함께하는 자리에서 내 얘기가 화제가 됐다. 당신은?',
    options: [
      { text: '신나서 더 적극적으로 얘기한다', value: 'E' },
      { text: '나쁘지 않다. 자연스럽게 즐긴다', value: 'E' },
      { text: '관심받는 게 쑥스러워 빨리 화제를 돌리고 싶다', value: 'I' },
      { text: '나에 대해 얘기하는 게 불편하고 그 자리를 피하고 싶다', value: 'I' },
    ],
  },
  {
    id: 7,
    question: '새로운 걸 배울 때 당신은?',
    options: [
      { text: '실제로 직접 해보면서 익힌다', value: 'S' },
      { text: '단계별로 차근차근 익히는 게 좋다', value: 'S' },
      { text: '전체 개념을 먼저 파악하고 나서 세부사항을 본다', value: 'N' },
      { text: '일단 원리부터 이해해야 한다', value: 'N' },
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
      { text: '좀 당황스럽지만 이미 벌어진 일이니 어쩔 수 없다', value: 'P' },
    ],
  },

  // 4라운드
  {
    id: 19,
    question: '팀 프로젝트에서 아무도 결정을 안내리고 있을때 당신은?',
    options: [
      { text: '답답해서 내가 먼저 결론을 낸다', value: 'J' },
      { text: '누군가 나서겠지 싶어 기다린다', value: 'P' },
      { text: '제일 별로인 것부터 지워가며 선택지를 좁혀나간다', value: 'J' },
      { text: '그러거나 말거나 관심없고 나만의 할 일을 한다', value: 'P' },
    ],
  },
  {
    id: 14,
    question: '가장 엮이기 싫은 유형은?',
    options: [
      { text: '말만 번지르르하고 앞뒤가 안 맞는 사람', value: 'T' },
      { text: '자기 이익 때문에 남들을 이용하는 사람', value: 'F' },
      { text: '약속과 책임을 가볍게 여기는 사람', value: 'T' },
      { text: '아무렇지 않게 상처주는 사람', value: 'F' },
    ],
  },
  {
    id: 10,
    question: '새로운 지역을 여행하게 됐다. 가장 먼저 관심이 가는 것은?',
    options: [
      { text: '유명 관광지와 실제 볼거리', value: 'S' },
      { text: '그 지역만의 분위기', value: 'N' },
      { text: '맛집, 숙소, 교통 등', value: 'S' },
      { text: '그 지역이 가진 역사와 문화', value: 'N' },
    ],
  },
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

  // 5라운드
  {
    id: 15,
    question: '친구가 "그 옷 너한테 안어울리는 것 같아" 라고 했을때 당신은?',
    options: [
      { text: '어떤 점이 문제인지 궁금하다', value: 'T' },
      { text: '나는 마음에 들기 때문에 상관없다', value: 'F' },
      { text: '어떤 의도로 말한건지 파악하려 한다', value: 'T' },
      { text: '친구의 말이 계속 신경쓰인다', value: 'F' },
    ],
  },
  {
    id: 3,
    question: '친구가 근처에 들렀으니 잠깐 만나자고 한다면?',
    options: [
      { text: '안읽씹 하다가 뒤늦게 답장한다', value: 'I' },
      { text: '고민되지만 결국 핑계를 댄다', value: 'I' },
      { text: '고민되지만 그래도 나간다', value: 'E' },
      { text: '당연하지! 얼른 나간다', value: 'E' },
    ],
  },
  {
    id: 18,
    question: '세워둔 계획이 완전히 틀어졌을때 당신은?',
    options: [
      { text: '당황스럽지만 다시 계획을 세운다', value: 'J' },
      { text: '이미 플랜B가 있다', value: 'J' },
      { text: '유연하게 대처하는 편이라 크게 당황하지 않는다', value: 'P' },
      { text: '오히려 어떻게 흘러갈지 흥미롭다', value: 'P' },
    ],
  },
  {
    id: 8,
    question: '내가 좋아하는 대화 유형은?',
    options: [
      { text: '일상을 살아가며 내가 느낀 것들에 대한 이야기', value: 'N' },
      { text: '담백하고 소소한 일상사는 이야기', value: 'S' },
      { text: '꿀팁이나 실용적인 정보 공유하기', value: 'S' },
      { text: '철학적이고 깊은 주제에 대한 이야기', value: 'N' },
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
