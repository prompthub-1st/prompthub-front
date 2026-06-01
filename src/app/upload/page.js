'use client'

import { createPrompt, fetchAllData, fetchCategories } from "@/api/promptService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function UploadPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 서버에서 카테고리 목록 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const categories = Array.isArray(data) ? data: data?.data ?? [];

  // 입력 폼 상태
  const [ form, setForm ] = useState({
    title: '',
    description: '',
    content: '',
    categoryId: ''
  });

  // 전송 로직
  const mutation = useMutation({
    mutationFn: createPrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts', 'all' ] });
      router.push('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 (카테고리 선택 여부 등)
    if (!form.categoryId) return alert("카테고리를 선택해주세요!");
    const requestData = {
      ...form,
      userId: 1
    }
    mutation.mutate(requestData);
  };

  if (isLoading) return <div className={styles.loading}>카테고리 불러오는 중...</div>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>프롬프트 업로드</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <label className={styles.label}>카테고리 선택</label>
          <div className={styles.categoryContainer}>
            {categories.map((cat) => (
              <button
                key={cat.categoryId}
                type="button"
                className={`${styles.categoryButton} ${form.categoryId === String(cat.categoryId) ? styles.selected : ''}`}
                onClick={() => setForm({ ...form, categoryId: String(cat.categoryId) })}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <label htmlFor="title" className={styles.label}>프롬프트 제목</label>
          <input
            id="title"
            className={styles.input}
            placeholder="제목을 입력하세요"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className={styles.section}>
          <label htmlFor="description" className={styles.label}>프롬프트 소개</label>
          <textarea
            id="description"
            className={styles.textarea}
            placeholder="프롬프트 소개를 입력하세요"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className={styles.section}>
          <label htmlFor="content" className={styles.label}>프롬프트 내용</label>
          <textarea
            id="content"
            className={styles.textarea}
            placeholder="프롬프트 내용을 입력하세요"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            style={{ minHeight: '200px' }}
          />
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '등록 중...' : '프롬프트 등록하기'}
          </button>
        </div>
      </form>
    </div>
  )
}



// ============================================
// 백엔드 연동 전 코드
// ============================================

// 'use client'

// import { createPrompt, fetchAllData } from "@/api/promptService";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import styles from "./page.module.css";

// export default function UploadPage() {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   // 서버에서 카테고리 목록 가져오기
//   const { data, isLoading } = useQuery({
//     queryKey: ['prompts', 'all'],
//     queryFn: fetchAllData,
//   });

//   // 입력 폼 상태
//   const [ form, setForm ] = useState({
//     title: '',
//     description: '',
//     content: '',
//     categoryId: ''
//   });

//   // 전송 로직
//   const mutation = useMutation({
//     mutationFn: createPrompt,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['prompts', 'all' ] });
//       router.push('/');
//     }
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // 유효성 검사 (카테고리 선택 여부 등)
//     if (!form.categoryId) return alert("카테고리를 선택해주세요!");
//     const requestData = {
//       ...form,
//       userId: 1
//     }
//     mutation.mutate(requestData);
//   };

//   if (isLoading) return <div className={styles.loading}>카테고리 불러오는 중...</div>

//   const categories = data?.categories || [];

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>프롬프트 업로드</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.section}>
//           <label className={styles.label}>카테고리 선택</label>
//           <div className={styles.categoryContainer}>
//             {categories.map((cat) => (
//               <button
//                 key={cat.id}
//                 type="button"
//                 className={`${styles.categoryButton} ${form.categoryId === String(cat.id) ? styles.selected : ''}`}
//                 onClick={() => setForm({ ...form, categoryId: String(cat.id) })}
//               >
//                 {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className={styles.section}>
//           <label htmlFor="title" className={styles.label}>프롬프트 제목</label>
//           <input
//             id="title"
//             className={styles.input}
//             placeholder="제목을 입력하세요"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />
//         </div>
//         <div className={styles.section}>
//           <label htmlFor="description" className={styles.label}>프롬프트 소개</label>
//           <textarea
//             id="description"
//             className={styles.textarea}
//             placeholder="프롬프트 소개를 입력하세요"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//           />
//         </div>
//         <div className={styles.section}>
//           <label htmlFor="content" className={styles.label}>프롬프트 내용</label>
//           <textarea
//             id="content"
//             className={styles.textarea}
//             placeholder="프롬프트 내용을 입력하세요"
//             value={form.content}
//             onChange={(e) => setForm({ ...form, content: e.target.value })}
//             style={{ minHeight: '200px' }}
//           />
//         </div>
//         <div className={styles.actions}>
//           <button
//             type="button"
//             className={styles.cancelButton}
//             onClick={() => router.back()}
//           >
//             취소
//           </button>
//           <button
//             type="submit"
//             className={styles.submitButton}
//             disabled={mutation.isPending}
//           >
//             {mutation.isPending ? '등록 중...' : '프롬프트 등록하기'}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }