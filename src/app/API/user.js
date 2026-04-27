export async function fetchUsers() {
    const res = await fetch('http://localhost:3003/users')

    if (!res.ok) {
        throw new Error('서버 응답 에러')
    }
    return res.json()
}