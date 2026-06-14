# 🔦 당신은 어떤 기묘한 이야기 캐릭터인가요?
## 📖 프로젝트 소개
넷플릭스 시리즈 **기묘한 이야기(Stranger Things)** 의 16개 캐릭터 중 나와 가장 닮은 캐릭터를 찾아주는 성격 테스트 서비스입니다.
20개의 질문에 답변하면 E/I·S/N·T/F·J/P 각 지표별 응답을 집계해 MBTI 유형을 도출하고, 그에 맞는 캐릭터와 성격 설명을 확인할 수 있습니다. 결과는 링크복사, 카카오톡, X(트위터)로 공유할 수 있습니다.

Claude Code를 활용해 만든 바이브 코딩 1인 프로젝트입니다.
개발 기간: 2026.05.25 ~ 2026.06.13

🔗 **[https://sthing-character.site](https://sthing-character.site)**

---

## 🛠 기술 스택

**Frontend**
- React + Vite
- Tailwind CSS

**Backend**
- Spring Boot 3.5 + Java 21
- Spring Security + JWT
- JPA + MySQL

**Infrastructure**
- AWS EC2 (Spring Boot 서버)
- AWS RDS (MySQL)
- AWS S3 + CloudFront (정적 파일 배포)
- AWS ELB (HTTPS, 로드밸런서)
- AWS Route 53 (도메인)
- AWS ACM (SSL 인증서)

---

## ✔ 주요 기능
- MBTI 기반 성격 테스트(20문항)
- 카카오톡 / X(트위터) / 링크 공유 기능
- **관리자 대시보드** : 참여자 통계, MBTI(캐릭터) 분포, 결과 관리

---

## 아키텍처

                        ┌─────────────────────────────────┐
                        │             사용자               │
                        └──────────┬──────────────┬───────┘
                                   │              │
                    sthing-character.site    api.sthing-character.site
                                   │              │
                                   ▼              ▼
                          ┌─────────────┐  ┌─────────────┐
                          │ CloudFront  │  │     ELB     │
                          └──────┬──────┘  └──────┬──────┘
                                 │                │
                                 ▼                ▼
                          ┌─────────────┐  ┌─────────────┐
                          │  S3 Bucket  │  │     EC2     │
                          │  (React)    │  │ Spring Boot │
                          └─────────────┘  └──────┬──────┘
                                                  │
                                                  ▼
                                           ┌─────────────┐
                                           │  RDS MySQL  │
                                           └─────────────┘

---

## 프로젝트 구조

**Frontend**
src/
├── pages/
│   ├── IntroPage.jsx        # 메인 화면
│   ├── TestPage.jsx         # 테스트 진행
│   ├── LoadingPage.jsx      # MBTI 계산 + 결과 저장
│   ├── ResultPage.jsx       # 결과 확인 및 공유
│   ├── SharePage.jsx        # 공유 링크 결과 조회
│   └── admin/
│       ├── AdminLoginPage.jsx
│       ├── AdminDashboardPage.jsx
│       └── AdminResultsPage.jsx
├── components/
│   └── ProtectedRoute.jsx   # 관리자 페이지 인증 보호
├── data/
│   ├── questions.js         # 질문 목록 + MBTI 지표 매핑
│   └── characters.js        # MBTI → 캐릭터 매핑
└── utils/
├── mbti.js              # MBTI 계산 로직
└── auth.js              # JWT 토큰 관리



**Backend**
src/main/java/sthing/backend/
├── controller/              # HTTP 요청/응답
├── service/                 # 비즈니스 로직
├── repository/              # DB 접근 (JPA)
├── entity/                  # DB 테이블 매핑
├── dto/                     # 계층 간 데이터 전달
├── exception/               # 전역 예외 처리
├── config/                  # CORS, Swagger 설정
└── security/                # JWT 인증/인가

---

## 🔎 화면 구성

**테스트 화면**
<img width="1170" height="2080" alt="테스트 인트로" src="https://github.com/user-attachments/assets/49a39386-8041-4099-85d5-aee75e46b60c" />
<img width="1170" height="2080" alt="테스트 화면" src="https://github.com/user-attachments/assets/78f46c42-6035-42bb-938f-4f82a47fa3b0" />
<img width="1170" height="2080" alt="결과 로딩" src="https://github.com/user-attachments/assets/48028a77-4639-4ebd-901d-6aedcef6c262" />
<img width="1170" height="2080" alt="테스트 결과" src="https://github.com/user-attachments/assets/322a2ad3-0bbd-439a-9e1d-72ec7925b255" />


**관리자 화면**
<img width="1915" height="915" alt="관리자 대시보드" src="https://github.com/user-attachments/assets/8d277e37-3fe2-4370-a5e4-682aaea03224" />
<img width="1912" height="900" alt="관리자 결과목록" src="https://github.com/user-attachments/assets/66ef07b1-2c6a-4573-b5fb-ba8e5f167d98" />
