# 🚀 Prompt Hub

AI 프롬프트를 공유하고 나만의 최적화된 프롬프트를 관리하는 커뮤니티 플랫폼

</br>

## ✅ 로컬 실행 시 준비사항

### 현재 버전 (Spring Boot + MyBatis)

```bash
# 1. 프론트엔드 의존성 설치 및 실행
npm install
npm run dev

# 2. 백엔드 서버 실행
# 백엔드 레포지토리: https://github.com/prompthub-1st/prompthub-backend
# 실행 후 http://localhost:8080 에서 API 서버가 동작합니다.
```

### 과거 버전 (json-server)

초기 프로토타입 테스트 시 json-server를 사용하려면:

```bash
npx json-server --watch db.json --port 3003
# API: src/api/promptService.js 파일에서 BASE_URL을 localhost:3003으로 변경 필요
```

</br></br>

## 💡 서비스 소개

### 서비스 배경

프롬프트 엔지니어링의 중요성: LLM 활용 능력이 핵심이 된 시대에 검증된 프롬프트를 찾고 공유하는 공간이 필요합니다.

### 학습 및 성장

백엔드(Spring Boot)와 프론트엔드(React/Next.js) 기술을 아우르는 풀스택 역량을 강화하기 위한 프로젝트입니다.

</br></br>

## ✨ 주요 기능

- 프롬프트 공유 및 관리: 카테고리별 프롬프트 업로드, 수정, 삭제(CRUD) 기능
- 사용자 인증: 세션 기반 로그인/로그아웃 (Spring Security + MyBatis)
- 데이터 정규화 기반 구조: 유저, 카테고리, 프롬프트 간의 관계형 설계를 통한 데이터 무결성 확보
- 실시간 필터링: 카테고리별/검색어별 프롬프트 목록 필터링
- 마이페이지: 내가 작성한 프롬프트를 한눈에 모아보고 관리하는 개인화 공간

</br></br>

## 🛠 기술 스택

| Category           | Technologies                                                 |
| ------------------ | ------------------------------------------------------------ |
| Frontend           | Next.js 14 (App Router), React, TanStack Query (v5), Zustand |
| Backend            | Spring Boot 3.x, MyBatis, MySQL                              |
| Language / Runtime | JavaScript (ES6+), Java 17, Node.js                          |
| DevOps / Tooling   | Git, npm, Maven/Gradle                                       |

</br></br>

## 📈 프로젝트 발전 과정

이 프로젝트는 단계적으로 백엔드를 발전시키며 풀스택 개발 역량을 키워나갔습니다.

### 1단계: 프론트엔드 + JSON Server (2026.04 초반)

**목적**: UI/UX와 프론트엔드 로직 구현에 집중

- **백엔드**: JSON Server (Mock API)
- **데이터**: `db.json` 파일 기반
- **통신**: REST API (GET, POST, PUT, DELETE)
- **특징**:
  - 빠른 프로토타이핑
  - 프론트엔드 상태 관리 패턴 확립 (TanStack Query + Zustand)
  - 클라이언트 사이드 데이터 조인 로직 구현

### 2단계: Servlet + JDBC (2026.04 중반)

**목적**: 전통적인 Java 웹 기술 학습 및 데이터베이스 연동

- **백엔드**: Java Servlet
- **데이터베이스**: MySQL + JDBC
- **통신**: `application/x-www-form-urlencoded`
- **특징**:
  - 세션 기반 인증 구현
  - SQL 직접 작성 및 Connection 관리
  - DAO 패턴 학습

**주요 변경 사항**:
```javascript
// Servlet 방식 (Form Data)
const formData = new URLSearchParams();
formData.append("id", id);
formData.append("password", password);

fetch("http://localhost:8080/auth/login", {
  method: "POST",
  body: formData,
  credentials: "include"
});
```

### 3단계: Spring Boot + MyBatis (2026.04 후반 ~ 현재)

**목적**: 현대적인 Spring 생태계와 ORM 프레임워크 학습

- **백엔드**: Spring Boot 3.x + MyBatis
- **데이터베이스**: MySQL + MyBatis
- **통신**: JSON (RESTful API)
- **특징**:
  - Spring Security 기반 인증
  - MyBatis XML Mapper를 통한 SQL 관리
  - DTO 기반 데이터 전송
  - 트랜잭션 관리 자동화

**주요 변경 사항**:
```javascript
// Spring Boot + MyBatis 방식 (JSON)
const res = await fetch("http://localhost:8080/api/prompts/list", {
  credentials: 'include'
});
const data = await res.json();
```

**API 엔드포인트 예시**:
- `GET /api/prompts/list` - 전체 프롬프트 조회
- `GET /api/prompts/detail?id={id}` - 상세 조회
- `POST /api/prompts/create` - 프롬프트 생성
- `POST /api/prompts/update` - 프롬프트 수정
- `POST /api/prompts/delete` - 프롬프트 삭제
- `POST /auth/login` - 로그인
- `POST /auth/logout` - 로그아웃
- `GET /auth/me` - 현재 사용자 정보

</br></br>

## 🏗 아키텍처 & 데이터 전략

### 1️⃣ 상태 관리의 이원화 (Client vs Server State)

데이터의 성격에 따라 관리 도구를 분리하여 효율적인 데이터 흐름을 설계했습니다.

- **Client State (Zustand)**: 유저 인증 세션 및 UI 전역 상태를 관리합니다. `persist` 미들웨어를 통해 새로고침 후에도 로그인 상태가 유지되는 견고한 인증 시스템을 구축했습니다.
- **Server State (TanStack Query)**: 프롬프트 및 카테고리 등 서버 데이터를 관리합니다. 초기에는 `fetchAllData` 전략으로 마스터 데이터를 캐싱했으나, 현재는 백엔드에서 JOIN된 데이터를 제공받아 효율적으로 처리합니다.

</br>

### 2️⃣ 데이터 정규화 및 서버 사이드 조인

- **무결성 보장**: `prompts`, `users`, `categories`를 독립된 엔티티로 정규화하여 데이터 중복을 방지했습니다.
- **변화 과정**:
  - **초기 (JSON Server)**: 클라이언트에서 외래키(FK)를 기반으로 데이터를 조인
  - **현재 (Spring Boot + MyBatis)**: MyBatis의 ResultMap을 활용해 서버에서 JOIN 쿼리 수행 후 완성된 데이터 전달

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



</br><br></br>

# ⭐️ 주요 기능 상세 설명

## 1. 로그인 기능

📌 구현 방식

- **초기 (JSON Server)**: 하드코딩된 사용자 정보로 테스트
- **현재 (Spring Boot + MyBatis)**: 실제 데이터베이스 기반 인증
- 전역 상태 관리 라이브러리 Zustand를 사용하여 로그인 상태 저장
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

## 2. 마이페이지(내 프롬프트 조회)

📌 구현 방식

- 로그인된 사용자의 `userId`를 기준으로 데이터 요청
- 팀원이 만든 `PromptCard` 컴포넌트를 재사용
- 사용자별 프롬프트만 필터링해서 출력
  <br></br>

📌 핵심 데이터 요청

**초기 (JSON Server)**:
<pre>
<code>
fetch(`http://localhost:3003/prompts?userId=${Number(userId)}`)
👉 userId를 기준으로 해당 사용자 데이터만 조회
</code></pre>

**현재 (Spring Boot + MyBatis)**:
<pre>
<code>
fetch(`http://localhost:8080/api/prompts/list`, { credentials: 'include' })
👉 세션 기반으로 서버에서 자동으로 사용자 프롬프트 필터링
</code></pre>

📌 데이터 흐름

1. 로그인 → user 저장 (Zustand)
2. 마이페이지 진입
3. 세션 정보를 통해 서버에서 사용자 프롬프트 조회
4. TanStack Query로 데이터 캐싱
5. 화면에 렌더링
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

<br></br>

## 3. 프롬프트 수정 및 삭제 (UD)

📌 **구현 방식**
* **데이터 일관성 유지**: 수정 요청 시 기존 `userId`를 명시적으로 포함하여 작성자 데이터 유실 방지

* **상태 동기화**: `useMutation`의 `onSuccess`를 활용해 삭제/수정 즉시 캐시를 무효화하여 최신 데이터 유지

* **사용자 권한 방어**: 수정 페이지 진입 및 요청 시 현재 로그인 유저와 작성자 ID를 대조하는 보안 로직 적용

<br><br>

📌 **핵심 코드 (Mutation을 통한 데이터 업데이트)**

**초기 (JSON Server)**:
```js
const payload = {
  ...formData,
  userId: loginUser.id  // 작성자 정보 유지
};

mutation.mutate(payload);
```

**현재 (Spring Boot + MyBatis)**:
```js
const body = new URLSearchParams();
body.append("promptId", promptId);
body.append("categoryId", categoryId);
body.append("title", title);
body.append("description", description);
body.append("content", content);

fetch(`http://localhost:8080/api/prompts/update`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body
});
```

<br><br>

📌 삭제 처리 (서버 상태 동기화)

```JavaScript
const mutation = useMutation({
  mutationFn: (id) => deletePrompt(id),
  onSuccess: () => {
    // 서버 데이터가 변경되었으므로 관련 쿼리를 무효화하여 UI 즉시 업데이트
    queryClient.invalidateQueries(["prompts"]);
    router.push("/");
  },
});
```

<br><br>

## 4. 데이터 아키텍처 및 서버 상태 관리

📌 구현 방식

* **데이터 정규화**: prompts, users, categories를 독립 엔티티로 분리하여 중복 없는 관계형 구조 설계

* **캐싱 최적화 변화**:
  - **초기**: fetchAllData로 마스터 데이터를 일괄 호출하고, 클라이언트에서 조인
  - **현재**: 백엔드에서 MyBatis ResultMap으로 JOIN된 데이터 제공

* **타입 안정성 확보**: 문자열과 숫자형이 혼재된 ID 값들을 명시적으로 형변환하여 렌더링 및 조인 오류 방지

<br><br>

📌 핵심 로직의 변화

**초기 (클라이언트 사이드 조인)**:
```JavaScript
const targetPrompt = allData?.prompts.find(
  (p) => String(p.id) === String(promptId)
);
const category = allData?.categories.find(c => c.id === targetPrompt.categoryId);
const author = allData?.users.find(u => u.id === targetPrompt.userId);
```

**현재 (서버 사이드 조인)**:
```JavaScript
// 백엔드에서 이미 JOIN된 데이터를 받음
const prompt = await fetchPromptById(id);
// prompt.categoryName, prompt.userName 등이 이미 포함됨
```

<br><br>

## 5. UI/UX 및 공통 컴포넌트 구현

📌 구현 방식

* 컴포넌트 재사용성: 리스트(PromptList)와 카드(PromptCard) 컴포넌트를 분리하여 유지보수성 향상

* 동적 라우팅 활용: Next.js의 Dynamic Routes를 통해 각 프롬프트 고유 ID에 맞는 상세 페이지 구현

* 조건부 렌더링: 카테고리 선택 상태에 따라 실시간으로 리스트가 필터링되도록 구현

<br><br>

📌 핵심 코드 (데이터 조인 및 렌더링)

**초기 (클라이언트 조인)**:
```JavaScript
const category = allData?.categories.find(c => c.id === targetPrompt.categoryId);
const author = allData?.users.find(u => u.id === targetPrompt.userId);

return (
  <div className={styles.detailContainer}>
    <h1>{targetPrompt.title}</h1>
    <p>분류: {category?.name}</p>
    <p>작성자: {author?.name}</p>
  </div>
);
```

**현재 (서버 조인)**:
```JavaScript
return (
  <div className={styles.detailContainer}>
    <h1>{prompt.title}</h1>
    <p>분류: {prompt.categoryName}</p>
    <p>작성자: {prompt.userName}</p>
  </div>
);
```

<br>

👉 초기에는 데이터 정규화 이슈로 클라이언트에서 조인을 수행했으나, Spring Boot + MyBatis 도입 후 서버에서 효율적으로 JOIN된 데이터를 제공받도록 개선했습니다.

<br><br>

## 🔄 코드 마이그레이션 예시

프로젝트의 발전 과정을 실제 코드로 비교할 수 있도록 주요 변경 사항을 정리했습니다.

### 로그인 API 호출

**1단계: JSON Server**
```javascript
// 하드코딩된 테스트 데이터
const user = { id: "1", name: "user1" };
login(user);
```

**2단계: Servlet + JDBC**
```javascript
const formData = new URLSearchParams();
formData.append("id", id);
formData.append("password", password);

fetch("http://localhost:8080/auth/login", {
  method: "POST",
  body: formData,
  credentials: "include"
});
```

**3단계: Spring Boot + MyBatis**
```javascript
const res = await fetch("http://localhost:8080/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    loginId: id,
    password: password
  }),
  credentials: "include"
});
```

### 프롬프트 생성 API

**1단계: JSON Server**
```javascript
fetch(`http://localhost:3003/prompts`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

**2단계~3단계: Spring Boot + MyBatis**
```javascript
const body = new URLSearchParams();
body.append("title", data.title);
body.append("description", data.description);
body.append("content", data.content);
body.append("categoryId", data.categoryId);

fetch(`http://localhost:8080/api/prompts/create`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body
});
```

</br></br>

## 📚 학습 성과

이 프로젝트를 통해 다음과 같은 기술과 개념을 학습했습니다:

### 프론트엔드
- Next.js App Router 기반 라우팅 및 SSR
- TanStack Query를 활용한 서버 상태 관리
- Zustand를 활용한 클라이언트 상태 관리
- 하이드레이션 에러 방지 기법

### 백엔드
- JSON Server를 활용한 빠른 프로토타이핑
- Java Servlet과 JDBC를 통한 전통적인 웹 개발
- Spring Boot 프레임워크 활용
- MyBatis를 활용한 SQL 매핑 및 데이터베이스 연동
- 세션 기반 인증 구현

### 데이터베이스
- 관계형 데이터 모델링 (정규화)
- SQL 쿼리 작성 및 최적화
- MyBatis ResultMap을 활용한 조인 처리

### 협업
- Git을 활용한 버전 관리
- 컴포넌트 기반 개발 및 코드 재사용
- API 설계 및 프론트엔드-백엔드 인터페이스 정의
