// Spring Boot + MyBatis 사용 시
export async function fetchUsers(id, password) {
    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            loginId: id,
            password: password
        }),
        credentials: "include"
    });

    const result = await res.json();

    if (!result.message && result.success === false) {
        throw new Error(result.message);
    }

    return result.data;
}


// Servlet 사용 시

// export async function fetchUsers(id, password) {
//     const formData = new URLSearchParams();

//     formData.append("id", id);
//     formData.append("password", password);

//     const res = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         body: formData,
//         credentials: "include"
//     });

//     const result = await res.json();

//     if (!result.success) {
//         throw new Error(result.message);
//     }
//     return result.data;
// }

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

export async function fetchMe() {
    const res = await fetch("http://localhost:8080/auth/me", {
        method: "GET",
        credentials: "include"
    });

    const result = await res.json();

    if (!result.success) {
        throw new Error(result.message);
    }

    return result.data;
}