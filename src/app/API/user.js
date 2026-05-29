export async function fetchUsers(id, password) {
    const formData = new URLSearchParams();

    formData.append("id", id);
    formData.append("password", password);

    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    const result = await res.json();

    if (!result.success) {
        throw new Error(result.message);
    }
    return result.data;
}

export async function logout() {

    const res = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include"
    });

    const result = await res.json();

    if (!result.success) {
        throw new Error(result.message);
    }

    return result.data;
}
