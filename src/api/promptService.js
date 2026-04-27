const BASE_URL = 'http://localhost:3003';

// 전체 목록을 가져오는 서비스
export const fetchAllData = async () => {
  const [promptsRes, usersRes, categoriesRes] = await Promise.all([
    fetch(`${BASE_URL}/prompts`),
    fetch(`${BASE_URL}/users`),
    fetch(`${BASE_URL}/categories`)
  ]);

  if (!promptsRes.ok || !usersRes.ok || !categoriesRes.ok) {
    throw new Error('데이터 로드 실패');
  }
  
  return {
    prompts: await promptsRes.json(),
    users: await usersRes.json(),
    categories: await categoriesRes.json()
  };
};


// 특정 아이디의 상세 정보 1개를 가져오는 서비스
export const fetchPromptById = async (id) => {
  const res = await fetch(`${BASE_URL}/prompts/${id}?_expand=user&_expand=category`);
  if (!res.ok) throw new Error("데이터를 불러오지 못했습니다.");
  return res.json();
};

// 새 프롬프트를 등록하는 서비스
export const createPrompt = async (data) => {
  const res = await fetch(`${BASE_URL}/prompts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('네트워크 응답에 문제가 있습니다.');

  return res.json();
};

// 수정하기 (PUT)
export const updatePrompt = async ({ id, ...updateData }) => {
  const res = await fetch(`${BASE_URL}/prompts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  });
  return res.json();
};

// 삭제하기 (DELETE)
export const deletePrompt = async (id) => {
  await fetch(`${BASE_URL}/prompts/${id}`, {
    method: 'DELETE',
  });
};