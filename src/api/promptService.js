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


// 특정 아이디의 상세 정보를 가져오는 서비스
export const fetchPromptById = async (id) => {};


// 새 프롬프트를 등록하는 서비스
export const createPrompt = async (data) => {};