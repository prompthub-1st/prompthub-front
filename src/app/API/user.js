export async function fetchUsers(id, password) {
    const formData = new URLSearchParams();

    formData.append("id", id);
    formData.append("password", password);

    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("로그인 실패");
    }
    return res;
}

export async function logout() {

    const res = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("로그아웃 실패");
    }

    return res;
}
