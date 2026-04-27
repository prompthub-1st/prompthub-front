'use client'
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function LoginPage() {
    const { user, loading, fetchUser } = useUserStore();

    //데이터 가져오기
    useEffect(() => {
        console.log('useEffect실행됨')
        fetchUser();
    }, [fetchUser]);

    if (loading) return <h1>데이터 로딩중 ...</h1>;

    return (
        <>
            {user ? (
                <div>
                    <h3>사용자 id : {user.id}</h3>
                    <p>사용자 이름 : {user.name}</p>
                </div>
            ) : (
                <p>유저 정보가 없습니다.</p>
            )}

            <button onClick={() => fetchUser()}>데이터 다시 불러오기</button>
        </>
    )
}