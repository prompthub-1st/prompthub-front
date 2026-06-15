
'use client'

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { fetchUsers, fetchMe, logout } from "@/app/API/user";
import styles from "./page.module.css";

export default function LoginPage() {

    const router = useRouter();

    const user = useUserStore((state) => state.user);
    const login = useUserStore((state) => state.login);
    const storeLogout = useUserStore((state) => state.logout);

    const handleLogin = async () => {

        try {

            await fetchUsers(
                "user1",
                "hashed_pw_1"
            );

            const me = await fetchMe();

            login(me);

            router.push("/");

        } catch (e) {

            console.error(e);

            alert("로그인 실패");
        }
    };

    const handleLogout = async () => {

        try {

            await logout();

            storeLogout();

        } catch (e) {

            console.error(e);

        }
    };

    return (
        <div className={styles.container}>

            <div className={styles.card}>

                <h1 className={styles.title}>
                    로그인
                </h1>

                {user ? (
                    <>
                        <p>userId : {user.userId}</p>
                        <p>nickname : {user.nickname}</p>
                    </>
                ) : (
                    <p>로그인 안됨</p>
                )}

                <button
                    className={styles.button}
                    onClick={handleLogin}
                >
                    로그인
                </button>

                <button
                    className={styles.button}
                    onClick={handleLogout}
                >
                    로그아웃
                </button>

            </div>

        </div>
    );
}








// 기존

// 'use client'
// import { useUserStore } from "@/store/useUserStore";
// import { fetchUsers, fetchMe } from "@/app/API/user";
// import { logout } from "@/app/API/user";
// import styles from "./page.module.css";

// export default function LoginPage() {
//     const { user, loading, fetchUser } = useUserStore();

//     //데이터 가져오기
//     // useEffect(() => {
//     //     console.log('useEffect실행됨')
//     //     fetchUser();
//     // }, [fetchUser]);


//     const login = useUserStore((state) => state.login);

//     // 로그인 테스트
//     const handleLogin = async () => {
//         console.log("handleLogin 실행됨");
//         try {
//             const userData = await fetchUsers("user1", "hashed_pw_1");
//             console.log("로그인 요청 성공");
//         } catch (e) {
//             console.log(e);
//         }
//     }

//     // 로그아웃 테스트
//     const handleLogout = async () => {
//         try {
//             await logout();
//             console.log("로그아웃 성공");
//         } catch (e) {
//             console.log(e);
//         }
//     }

//     if (loading) return <h1 className={styles.loading}>데이터 로딩중 ...</h1>;

//     return (
//         <div className={styles.container}>
//             <div className={styles.card}>
//                 <h1 className={styles.title}>로그인</h1>
//                 {user ? (
//                     <div className={styles.userInfo}>
//                         <span className={styles.userLabel}>사용자 ID</span>
//                         <h3 className={styles.userId}>{user.id}</h3>
//                         <span className={styles.userLabel}>사용자 이름</span>
//                         <p className={styles.userName}>{user.name}</p>
//                     </div>
//                 ) : (
//                     <p className={styles.message}>유저 정보가 없습니다.</p>
//                 )}

//                 <button className={styles.button} onClick={() => fetchUser()}>
//                     데이터 다시 불러오기
//                 </button>

//                 <button className={styles.button} onClick={handleLogin}>
//                     목업 로그인 테스트
//                 </button>

//                 <button className={styles.button} onClick={handleLogout}>
//                     로그아웃
//                 </button>

//             </div>
//         </div>
//     )
// }