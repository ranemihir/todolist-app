import { User } from "../../../types";

const apiUrl = process.env.REACT_APP_API_URL as string;

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
        await fetch(apiUrl + "/logout", {
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
        const res = await fetch(apiUrl + '/currentuser', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (!data) {
            return false;
        }

        return data;
    } catch (err) {
        console.error(err);
        return false;
    }
}