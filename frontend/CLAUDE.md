# 기묘한 이야기 성격 테스트

Vite + React + Tailwind CSS v4 프론트엔드 프로젝트.

## 페이지 흐름

`/` (IntroPage) → `/test` (TestPage) → `/loading` (LoadingPage) → `/result` (ResultPage)

페이지 간 데이터는 react-router `state`로 전달한다.
- TestPage → LoadingPage: `{ answers: [{ id, value, idx }] }`
- LoadingPage → ResultPage: `{ answers, mbti, description }`

## 디자인 공통 규칙

모든 페이지에 아래 패턴을 적용한다.

**배경**
```jsx
<div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-x-clip">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0d0000_100%)] pointer-events-none" />
```

**하단 고정 텍스트** (모든 페이지 공통)
```jsx
<p className="absolute bottom-5 text-gray-700 text-xs tracking-widest z-10">
  HAWKINS, INDIANA · 1983
</p>
```

**색상**
- 배경: `#080808`
- 강조(빨강): `#e90101`
- 어두운 빨강 배경: `#1a0000`
- 비네트 끝: `#0d0000`

**한국어 타이틀 스타일** (Black Han Sans + 윤곽선)
```jsx
style={{ fontFamily: "'Black Han Sans', sans-serif", color: '#000', WebkitTextStroke: '1px #색상' }}
```

## 데이터 구조

- `src/data/questions.js` — 질문 배열 + `mbtiToCharacter` 매핑
- `src/data/characters.js` — `mbtiCharacters`: MBTI → `{ name, image }` 매핑

질문 배열은 E/I → S/N → T/F → J/P 순서로 4문항씩 사이클링된다.
질문의 `id`가 MBTI 분석의 기준이므로 id는 변경하지 않는다.

## 환경 변수 (`.env.local`)

```
VITE_ANTHROPIC_API_KEY=  # Claude API 키
VITE_KAKAO_APP_KEY=      # 카카오 JavaScript 키
```

## Claude API 연동

- 모델: `claude-haiku-4-5-20251001`
- LoadingPage에서 호출, 최소 2.5초 로딩 유지 (`Promise.all`)
- 브라우저 직접 호출 → `anthropic-dangerous-direct-browser-access: true` 헤더 필요
- 응답 형식: `{ mbti: string, description: string }` JSON만 반환

## 카카오 공유

- Kakao JS SDK는 `index.html` `<body>` 하단에 script 태그로 로드
- ResultPage `useEffect`에서 `Kakao.init()` 호출 (중복 방지 위해 `isInitialized()` 체크)

---

# 백엔드

Spring Boot 3.5 + JPA + MySQL + Java 21 + Lombok. 패키지: `sthing.backend`

## 프로파일 구조

```
application.properties          # 공통 설정, profiles.active=local
application-local.properties    # 로컬 DB URL, secret import
application-secret.properties   # DB 계정/비밀번호 (gitignore)
```

새로 클론 시 `application-secret.properties`는 직접 생성해야 한다.

## Entity 설계 원칙

- `@Setter` 없이 메서드로만 상태 변경 (캡슐화)
- Soft delete: 실제 DELETE 대신 `deleted = true`, `deletedAt` 기록
- `shareId` (UUID): 공유 링크에 노출되는 ID — 순차 id 노출 방지용
- 자동 생성 값(`shareId`, `createdAt`)은 `@PrePersist`에서 처리

## 구현 예정 기능

**일반 API**
- `POST /api/results` — 테스트 결과 저장
- `GET /api/results/{shareId}` — 공유 링크로 결과 조회 (viewCount 증가)

**관리자 API** (JWT 인증 필요)
- 로그인/로그아웃
- 대시보드 통계 (총 참여자, 오늘 참여자, MBTI별 분포, 일별 추이)
- 결과 목록 조회 (페이지네이션, MBTI/날짜 필터)
- 결과 soft delete

**기술 포인트** (포트폴리오용)
- JWT 인증/인가
- DTO 분리 (Entity 직접 반환 금지)
- 전역 예외 처리 (`@ControllerAdvice`)
- Swagger (OpenAPI) 문서화
- CORS 설정 (프론트: `localhost:5173`)
