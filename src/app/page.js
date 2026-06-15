'use client'

import CategoryFilter from "@/components/home/CategoryFilter";
import PromptList from "@/components/home/PromptList";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchMe, logout as logoutApi } from "./API/user";
import styles from "./page.module.css";

export default function Home() {

  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {

    const getUser = async () => {

      try {

        const me = await fetchMe();

        login(me);

      } catch {

        logout();

      }
    };

    getUser();

  }, []);

  const handleLogout = async () => {

    try {

      await logoutApi();

      logout();

    } catch (e) {

      console.error(e);

    }
  };

  return (
    <div className={styles.container}>

      <section className={styles.header}>
        <h1 className={styles.title}>Prompt Hub</h1>
      </section>

      <section className={styles.userSection}>

        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {user ? `${user.nickname}님` : '로그인 전'}
          </span>
        </div>

        <div className={styles.userActions}>

          {!user && (
            <button
              className="secondary"
              onClick={() => router.push("/login")}
            >
              로그인
            </button>
          )}

          {user && (
            <>
              <button
                className="secondary"
                onClick={handleLogout}
              >
                로그아웃
              </button>

              <button
                className="primary"
                onClick={() => router.push("/mypage")}
              >
                마이페이지
              </button>
            </>
          )}

        </div>

      </section>

      {user && (
        <section className={styles.uploadSection}>
          <Link href="/upload">
            <button className={styles.uploadButton}>
              ✨ 프롬프트 업로드
            </button>
          </Link>
        </section>
      )}

      <section className={styles.promptsSection}>
        <CategoryFilter />
        <PromptList />
      </section>

    </div>
  );
}




// 기존

// 'use client'

// import CategoryFilter from "@/components/home/CategoryFilter"
// import PromptList from "@/components/home/PromptList"
// import { useUserStore } from "@/store/useUserStore"
// import Link from "next/link";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { fetchUsers } from "./API/user";
// import styles from "./page.module.css";

// export default function Home() {
//   const { user, logout } = useUserStore();
//   const login = useUserStore((state) => state.login)
//   const router = useRouter();

//   useEffect(() => {

//     const getUser = async () => {
//       if (!user) {
//         try {
//           const data = await fetchUsers();
//           if (data)
//             login(data);
//         } catch (error) {
//           console.error('유저불러오기실패', error)
//         }
//       }
//       getUser();
//     }
//   }, []);

//   return (
//     <div className={styles.container}>
//       <section className={styles.header}>
//         <h1 className={styles.title}>Prompt Hub</h1>
//       </section>

//       <section className={styles.userSection}>
//         <div className={styles.userInfo}>
//           <span className={styles.userName}>
//             {user ? `${user.name}님` : '로그인 전'}
//           </span>
//         </div>
//         <div className={styles.userActions}>
//           <button className="secondary" onClick={() => login({ id: 1, name: 'user1' })}>
//             로그인
//           </button>
//           <button className="secondary" onClick={logout}>
//             로그아웃
//           </button>
//           {user && (
//             <button className="primary" onClick={() => router.push('/mypage')}>
//               마이페이지
//             </button>
//           )}
//         </div>
//       </section>

//       {user && (
//         <section className={styles.uploadSection}>
//           <Link href="/upload">
//             <button className={styles.uploadButton}>
//               ✨ 프롬프트 업로드
//             </button>
//           </Link>
//         </section>
//       )}

//       <section className={styles.promptsSection}>
//         <CategoryFilter />
//         <PromptList />
//       </section>
//     </div>
//   )
// }