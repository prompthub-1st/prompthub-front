

const BASE_URL = 'http://localhost:8080/api/prompts';

// 전체 목록
export const fetchAllData = async () => {
  const res = await fetch(`${BASE_URL}/list`, {
    credentials: 'include'
  });

  if (!res.ok) {
    throw new Error('데이터 로드 실패');
  }

  return await res.json();
};

// 상세 조회
export const fetchPromptById = async (id) => {
  const res = await fetch(
    `${BASE_URL}/detail?id=${id}`,
    {
      credentials: 'include'
    }
  );

  if (!res.ok) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }

  return await res.json();
};

// 등록
export const createPrompt = async (data) => {
  const body = new URLSearchParams();

  body.append("title", data.title);
  body.append("description", data.description);
  body.append("content", data.content);
  body.append("categoryId", data.categoryId);

  const res = await fetch(
    `${BASE_URL}/create`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }
  );

  const result = await res.text();

  if (!res.ok) {
    throw new Error(result);
  }

  return result;
};

// 수정
export const updatePrompt = async ({
  promptId,
  categoryId,
  title,
  description,
  content
}) => {

  const body = new URLSearchParams();

  body.append("promptId", promptId);
  body.append("categoryId", categoryId);
  body.append("title", title);
  body.append("description", description);
  body.append("content", content);

  const res = await fetch(
    `${BASE_URL}/update`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }
  );

  const result = await res.text();

  if (!res.ok) {
    throw new Error(result);
  }

  return result;
};

// 삭제
export const deletePrompt = async (promptId) => {

  const body = new URLSearchParams();

  body.append("promptId", promptId);

  const res = await fetch(
    `${BASE_URL}/delete`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }
  );

  const result = await res.text();

  if (!res.ok) {
    throw new Error(result);
  }

  return result;
};

// 카테고리
export const fetchCategories = async () => {
  const res = await fetch("http://localhost:8080/api/categories", {
    credentials: "include"
  });

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "카테고리 실패");
  }

  return (json.data ?? []).map(c => ({
    id: c.categoryId,
    name: c.name
  }));
};


// =========================================
// 백엔드 연동 전 코드 (json-server 와 연동)
// =========================================


// const BASE_URL = 'http://localhost:3003';


// 전체 목록을 가져오는 서비스
// export const fetchAllData = async () => {
//   const [promptsRes, usersRes, categoriesRes] = await Promise.all([
//     fetch(`${BASE_URL}/prompts`),
//     fetch(`${BASE_URL}/users`),
//     fetch(`${BASE_URL}/categories`)
//   ]);

//   if (!promptsRes.ok || !usersRes.ok || !categoriesRes.ok) {
//     throw new Error('데이터 로드 실패');
//   }
  
//   return {
//     prompts: await promptsRes.json(),
//     users: await usersRes.json(),
//     categories: await categoriesRes.json()
//   };
// };


// 특정 아이디의 상세 정보 1개를 가져오는 서비스
// export const fetchPromptById = async (id) => {
//   const res = await fetch(`${BASE_URL}/prompts/${id}?_expand=user&_expand=category`);
//   if (!res.ok) throw new Error("데이터를 불러오지 못했습니다.");
//   return res.json();
// };




// 새 프롬프트를 등록하는 서비스
// export const createPrompt = async (data) => {
//   const res = await fetch(`${BASE_URL}/prompts`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) throw new Error('네트워크 응답에 문제가 있습니다.');

//   return res.json();
// };




// 수정하기 (PUT)
// export const updatePrompt = async ({ id, ...updateData }) => {
//   const res = await fetch(`${BASE_URL}/prompts/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updateData),
//   });
//   return res.json();
// };




// 삭제하기 (DELETE)
// export const deletePrompt = async (id) => {
//   await fetch(`${BASE_URL}/prompts/${id}`, {
//     method: 'DELETE',
//   });
// };
