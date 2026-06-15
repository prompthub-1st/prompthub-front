'use client'

import {
  fetchPromptById,
  fetchCategories,
  updatePrompt
} from "@/api/promptService";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./page.module.css";

export default function PromptEditPage() {

  const { promptId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    categoryId: ""
  });

  // 게시글 조회
  const {
    data: prompt,
    isLoading: promptLoading
  } = useQuery({
    queryKey: ["prompt", promptId],
    queryFn: () => fetchPromptById(promptId),
    enabled: !!promptId
  });

  // 카테고리 조회
  const {
    data: categories = [],
    isLoading: categoryLoading
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories
  });

  // 초기값 세팅
  useEffect(() => {

    if (!prompt) return;

    setFormData({
      title: prompt.title ?? "",
      description: prompt.description ?? "",
      content: prompt.content ?? "",
      categoryId: String(prompt.categoryId ?? "")
    });

  }, [prompt]);

  // 수정
  const mutation = useMutation({

    mutationFn: () =>
      updatePrompt({
        promptId,
        ...formData
      }),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["prompt", promptId]
      });

      alert("수정 완료");

      router.push(`/prompts/${promptId}`);
    }
  });

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.categoryId) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    mutation.mutate();
  };

  if (promptLoading || categoryLoading) {
    return (
      <div className={styles.loading}>
        불러오는 중...
      </div>
    );
  }

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>
        프롬프트 수정
      </h1>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >

        {/* 카테고리 */}

        <div className={styles.section}>
          <label className={styles.label}>
            카테고리
          </label>

          <div className={styles.categoryContainer}>

            {categories.map((cat) => (

              <button
                key={cat.categoryId}
                type="button"
                className={`${styles.categoryButton} ${
                  formData.categoryId === String(cat.categoryId)
                    ? styles.selected
                    : ""
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    categoryId: String(cat.categoryId)
                  })
                }
              >
                {cat.name}
              </button>

            ))}

          </div>
        </div>

        {/* 제목 */}

        <div className={styles.section}>
          <label
            htmlFor="title"
            className={styles.label}
          >
            제목
          </label>

          <input
            id="title"
            className={styles.input}
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value
              })
            }
          />
        </div>

        {/* 설명 */}

        <div className={styles.section}>
          <label
            htmlFor="description"
            className={styles.label}
          >
            설명
          </label>

          <textarea
            id="description"
            className={styles.textarea}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
            }
          />
        </div>

        {/* 내용 */}

        <div className={styles.section}>
          <label
            htmlFor="content"
            className={styles.label}
          >
            내용
          </label>

          <textarea
            id="content"
            className={styles.textarea}
            style={{ minHeight: "200px" }}
            value={formData.content}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value
              })
            }
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
            {mutation.isPending
              ? "저장 중..."
              : "수정 완료"}
          </button>

        </div>

      </form>

    </div>
  );
}

// ----------------------------------------------
// 백엔드 연동 전 코드
// ----------------------------------------------


// 'use client'

// import { fetchAllData, updatePrompt } from "@/api/promptService";
// import { useUserStore } from "@/store/useUserStore";
// import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams } from "next/navigation"
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import styles from "./page.module.css";

// export default function PromptEditPage() {
//   const { promptId } = useParams();
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const { user: loginUser } = useUserStore();


//   // 1. 폼 상태 관리
//   const [ formData, setFormData ] = useState({
//     title: '',
//     description: '',
//     content: '',
//     categoryId: ''
//   });

//   // 2. 기존 데이터 가져오기
//   const { data: allData, isLoading } = useQuery({
//     queryKey: ['prompts', 'all'],
//     queryFn: fetchAllData
//   });

//   // 3. 데이터를 가져온 후 폼에 초기값 세팅
//   useEffect(() => {
//     if (allData) {
//       const targetPrompt = allData.prompts.find(p => String(p.id) === String(promptId));
//       if (targetPrompt) {
//         if (loginUser && String(loginUser?.id) !== String(targetPrompt.userId)) {
//           alert("수정 권한이 없습니다.");
//           router.back();
//           return;
//         }
//         setFormData({
//           title: targetPrompt.title,
//           description: targetPrompt.description,
//           content: targetPrompt.content,
//           categoryId: String(targetPrompt.categoryId)
//         });
//       }
//     }
//   }, [allData, promptId, loginUser, router]);

//   // 4. 렌더링에 필요한 카테고리 목록 미리 추출
//   const categories = allData?.categories || [];

//   // 5. 수정 처리 로직
//   const mutation = useMutation({
//     mutationFn: (updatedData) => updatePrompt({ id: promptId, ...updatedData}),
//     onSuccess: () => {
//       // 수정 후 캐시 무효화 -> 상세 페이지나 리스트가 새 데이터를 부르도록 함
//       queryClient.invalidateQueries({ queryKey: ['prompts', 'all']});
//       alert("성공적으로 수정되었습니다.");
//       router.push(`/prompts/${promptId}`);
//     }
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.categoryId) return alert("카테고리를 선택해주세요!");
//     const payload = {
//       id: promptId,
//       ...formData,
//       userId: loginUser.id
//     };
//     mutation.mutate(payload);
//   };

//   if (isLoading) return <div className={styles.loading}>기본 정보를 불러오는 중...</div>

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>프롬프트 수정하기</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.section}>
//           <label className={styles.label}>카테고리 선택</label>
//           <div className={styles.categoryContainer}>
//             {categories.map((cat) => (
//               <button
//                 key={cat.id}
//                 type="button"
//                 className={`${styles.categoryButton} ${formData.categoryId === String(cat.id) ? styles.selected : ''}`}
//                 onClick={() => setFormData({ ...formData, categoryId: String(cat.id)})}>
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
//             value={formData.title}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           />
//         </div>
//         <div className={styles.section}>
//           <label htmlFor="description" className={styles.label}>프롬프트 소개</label>
//           <textarea
//             id="description"
//             className={styles.textarea}
//             placeholder="프롬프트 소개를 입력하세요"
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           />
//         </div>
//         <div className={styles.section}>
//           <label htmlFor="content" className={styles.label}>프롬프트 내용</label>
//           <textarea
//             id="content"
//             className={styles.textarea}
//             placeholder="프롬프트 내용을 입력하세요"
//             value={formData.content}
//             onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//             style={{ minHeight: '200px' }}
//           />
//         </div>
//         <div className={styles.actions}>
//           <button
//             type="button"
//             className={styles.cancelButton}
//             onClick={() => router.push('/')}
//           >
//             취소
//           </button>
//           <button
//             type="submit"
//             className={styles.submitButton}
//             disabled={mutation.isPending}
//           >
//             {mutation.isPending ? '저장 중...' : '수정 완료'}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }