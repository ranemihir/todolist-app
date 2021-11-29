import { User } from "../../../types";

export async function login(user: User) {
    try {
        const res = await fetch("/auth/google", {
            method: "POST",
            body: JSON.stringify({
                user: user
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function logout() {
    try {
        await fetch("/logout", {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (err) {
        console.error(err);
    }
}

export async function getCurrentUser() {
    try {
        const res = await fetch('/currentuser', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        return data;
    } catch (err) {
        console.error(err);
    }
}