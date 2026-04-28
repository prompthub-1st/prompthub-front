# 🚀 Prompt Hub

AI 프롬프트를 공유하고 나만의 최적화된 프롬프트를 관리하는 커뮤니티 플랫폼

</br>

## 💡 서비스 소개

### 서비스 배경

프롬프트 엔지니어링의 중요성: LLM 활용 능력이 핵심이 된 시대에 검증된 프롬프트를 찾고 공유하는 공간이 필요합니다.

### 학습 및 성장

백엔드(Spring Boot)와 프론트엔드(React/Next.js) 기술을 아우르는 풀스택 역량을 강화하기 위한 프로젝트입니다.

※ 2026.04.28. 현재 프론트엔드와 Json-Server Mock API를 활용하여 프로젝트를 구현하였습니다.

</br></br>

## ✨ 주요 기능

- 프롬프트 공유 및 관리: 카테고리별 프롬프트 업로드, 수정, 삭제(CRUD) 기능.
- 데이터 정규화 기반 구조: 유저, 카테고리, 프롬프트 간의 관계형 설계를 통한 데이터 무결성 확보.
- 실시간 필터링: 카테고리별/검색어별 프롬프트 목록 필터링.
- 마이페이지: 내가 작성한 프롬프트를 한눈에 모아보고 관리하는 개인화 공간.

</br></br>

## 🛠 기술 스택 (2026.04.28.)

| Category           | Technologies                                                 |
| ------------------ | ------------------------------------------------------------ |
| Frontend           | Next.js 14 (App Router), React, TanStack Query (v5), Zustand |
| Backend            | JSON Server (Mock API)                                       |
| Language / Runtime | JavaScript (ES6+), , Node.js                                 |
| DevOps / Tooling   | Git, npm                                                     |

</br></br>

## 🏗 아키텍처 & 데이터 전략

### 1️⃣ 상태 관리의 이원화 (Client vs Server State)

데이터의 성격에 따라 관리 도구를 분리하여 효율적인 데이터 흐름을 설계했습니다.

- **Client State (Zustand)**: 유저 인증 세션 및 UI 전역 상태를 관리합니다. `persist` 미들웨어를 통해 새로고침 후에도 로그인 상태가 유지되는 견고한 인증 시스템을 구축했습니다.
- **Server State (TanStack Query)**: 프롬프트 및 카테고리 등 서버 데이터를 관리합니다. `fetchAllData` 전략으로 초기 로딩 시 마스터 데이터를 캐싱하여, 페이지 전환 시 추가 # 🚀 Prompt Hub
  AI 프롬프트를 공유하고 나만의 최적화된 프롬프트를 관리하는 커뮤니티 플랫폼

</br>

## 💡 서비스 소개

### 서비스 배경

프롬프트 엔지니어링의 중요성: LLM 활용 능력이 핵심이 된 시대에 검증된 프롬프트를 찾고 공유하는 공간이 필요합니다.

### 학습 및 성장

백엔드(Spring Boot)와 프론트엔드(React/Next.js) 기술을 아우르는 풀스택 역량을 강화하기 위한 프로젝트입니다.

※ 2026.04.28. 현재 프론트엔드와 Json-Server Mock API를 활용하여 프로젝트를 구현하였습니다.

</br></br>

## ✨ 주요 기능

- 프롬프트 공유 및 관리: 카테고리별 프롬프트 업로드, 수정, 삭제(CRUD) 기능.
- 데이터 정규화 기반 구조: 유저, 카테고리, 프롬프트 간의 관계형 설계를 통한 데이터 무결성 확보.
- 실시간 필터링: 카테고리별/검색어별 프롬프트 목록 필터링.
- 마이페이지: 내가 작성한 프롬프트를 한눈에 모아보고 관리하는 개인화 공간.

</br></br>

## 🛠 기술 스택 (2026.04.28.)

| Category           | Technologies                                                 |
| ------------------ | ------------------------------------------------------------ |
| Frontend           | Next.js 14 (App Router), React, TanStack Query (v5), Zustand |
| Backend            | JSON Server (Mock API)                                       |
| Language / Runtime | JavaScript (ES6+), , Node.js                                 |
| DevOps / Tooling   | Git, npm                                                     |

</br></br>

## 🏗 아키텍처 & 데이터 전략

### 1️⃣ 상태 관리의 이원화 (Client vs Server State)

데이터의 성격에 따라 관리 도구를 분리하여 효율적인 데이터 흐름을 설계했습니다.

- **Client State (Zustand)**: 유저 인증 세션 및 UI 전역 상태를 관리합니다. `persist` 미들웨어를 통해 새로고침 후에도 로그인 상태가 유지되는 견고한 인증 시스템을 구축했습니다.
- **Server State (TanStack Query)**: 프롬프트 및 카테고리 등 서버 데이터를 관리합니다. `fetchAllData` 전략으로 초기 로딩 시 마스터 데이터를 캐싱하여, 페이지 전환 시 추가 네트워크 비용을 0에 가깝게 최적화했습니다.

</br>

### 2️⃣ 데이터 정규화 및 클라이언트 사이드 조인

- **무결성 보장**: `prompts`, `users`, `categories`를 독립된 엔티티로 정규화하여 데이터 중복을 방지했습니다.
- **동적 매칭**: 클라이언트 단에서 외래키(FK)인 `userId`와 `categoryId`를 기반으로 데이터를 실시간 조인하여 렌더링하는 효율적인 관계형 구조를 채택했습니다.

</br>

### 3️⃣ Hydration 안정성 확보

- Next.js의 SSR 환경에서 서버와 클라이언트 간 상태 불일치를 방지하기 위해 `mounted` 플래그를 도입했습니다. 이를 통해 전역 유저 상태가 준비된 시점에 안전하게 렌더링을 시작하여 하이드레이션 에러를 원천 차단했습니다.

</br></br>

## 🗂 데이터 모델 (ERD)

```erDiagram
    USER ||--o{ PROMPT : "writes"
    CATEGORY ||--o{ PROMPT : "categorizes"

    USER {
        string id PK
        string name
    }
    CATEGORY {
        string id PK
        string name
    }
    PROMPT {
        string id PK
        string title
        string description
        string content
        string userId FK
        string categoryId FK
    }
```

</br></br>

## 👥 팀 구성 (Collaboration)

| 이름   | 주요 구현 페이지 및 기능 | 핵심 기능                                                                                                          |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| 김서원 | 목록 / 상세 / 수정       | • 프롬프트 수정 및 삭제 기능 <br> • 카테고리별 실시간 필터링 <br> • 전역 데이터 패칭 및 캐싱 처리                  |
| 박은서 | 로그인 / 마이페이지      | • 유저 로그인/로그아웃 및 세션 유지 <br> • 내가 쓴 프롬프트 목록 조회 <br> • 페이지 마운트 상태 관리 및 리다이렉션 |

비용을 0에 가깝게 최적화했습니다.

</br>

### 2️⃣ 데이터 정규화 및 클라이언트 사이드 조인

- **무결성 보장**: `prompts`, `users`, `categories`를 독립된 엔티티로 정규화하여 데이터 중복을 방지했습니다.
- **동적 매칭**: 클라이언트 단에서 외래키(FK)인 `userId`와 `categoryId`를 기반으로 데이터를 실시간 조인하여 렌더링하는 효율적인 관계형 구조를 채택했습니다.

</br>

### 3️⃣ Hydration 안정성 확보

- Next.js의 SSR 환경에서 서버와 클라이언트 간 상태 불일치를 방지하기 위해 `mounted` 플래그를 도입했습니다. 이를 통해 전역 유저 상태가 준비된 시점에 안전하게 렌더링을 시작하여 하이드레이션 에러를 원천 차단했습니다.

</br></br>

## 🗂 데이터 모델 (ERD)

```erDiagram
    USER ||--o{ PROMPT : "writes"
    CATEGORY ||--o{ PROMPT : "categorizes"

    USER {
        string id PK
        string name
    }
    CATEGORY {
        string id PK
        string name
    }
    PROMPT {
        string id PK
        string title
        string description
        string content
        string userId FK
        string categoryId FK
    }
```

</br></br>

## 👥 팀 구성 (Collaboration)

| 이름   | 주요 구현 페이지 및 기능 | 핵심 기능                                                                                                          |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| 김서원 | 목록 / 상세 / 수정       | • 프롬프트 수정 및 삭제 기능 <br> • 카테고리별 실시간 필터링 <br> • 전역 데이터 패칭 및 캐싱 처리                  |
| 박은서 | 로그인 / 마이페이지      | • 유저 로그인/로그아웃 및 세션 유지 <br> • 내가 쓴 프롬프트 목록 조회 <br> • 페이지 마운트 상태 관리 및 리다이렉션 |

<br></br>

## 로그인 기능

📌 구현 방식

- 사용자 id, name은 테스트를 위해 하드코딩
- 전역 상태 관리 라이브러이 Zustand를 사용하여 로그인 상태 저장
- `persist`를 사용해 새로고침 시에도 로그인 상태 유지
  <br><br/>

📌 핵심 코드

<pre><code>
login: (user) => set({ user }), 
logout: () => set({ user: null }),

👉 사용자 정보를 전역 상태에 저장하고, 로그아웃 시 초기화
</code></pre>

<br><br/>
📌 상태 저장 구조

<pre><code>
persist(
  (set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
  }),
  { name: 'user-storage' }
)
👉 localStorage에 저장되어 페이지 이동/새로고침에도 유지됨
</code></pre>

<br><br/>
📌 조건부 렌더링 (로그인 상태 UI)

```jsx
{
  user ? (
    <div>
      <h3>{user.id}</h3>
      <p>{user.name}</p>
    </div>
  ) : (
    <p>유저 정보가 없습니다.</p>
  );
}
```

👉

로그인 상태 → 사용자 정보 표시<br>
비로그인 상태 → 안내 메시지 출력</br>
<br></br>
📌 추가 기능

- 로그아웃 시 user가 null이 되면서<br>
  👉 마이페이지 버튼이 보이지 않도록 처리</br>

<br></br>

## 2.마이페이지(내 프롬프트 조회)

📌 구현 방식

- 로그인된 사용자의 `userId`를 기준으로 데이터 요청
- 팀원이 만든 `PromptCard` 컴포넌트를 재사용
- 사용자별 프롬프트만 필터링해서 출력
  <br></br>

📌 핵심 데이터 요청

<pre>
<code>
fetch(`${BASE_URL}/prompts?userId=${Number(userId)}`)
👉 userId를 기준으로 해당 사용자 데이터만 조회
</code></pre>

📌 상태 관리 (프롬프트)

<pre>
<code>
set({ prompts: data })
👉 서버에서 받아온 데이터를 상태에 저장
</code></pre>

📌 데이터 흐름

1. 로그인 → user 저장 (Zustand)
2. 마이페이지 진입
3. userId 가져오기
4. API 요청 (/prompts?userId=...)
5. prompts 상태에 저장
6. 화면에 렌더링
   <br></br>

📌 핵심 로직 (중요 ⭐)

<pre><code>
useEffect(() => {
  if (!userId) return;
  if (prompts.length > 0) return;

  fetchPrompts(userId);
}, [userId]);

👉
userId 없으면 요청 안 함
이미 데이터 있으면 중복 요청 방지
userId 변경 시에만 fetch 실행
</code></pre>

<br></br>
📌 렌더링 (컴포넌트 재사용)

```jsx
{prompts.map((prompt) => (
  <PromptCard key={prompt.id} prompt={prompt} />
))}

👉
팀원이 만든 UI 컴포넌트를 재사용하여
데이터만 연결하는 방식으로 구현
```
