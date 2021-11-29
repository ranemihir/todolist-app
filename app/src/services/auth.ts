import { User } from "../../../types";

const apiUrl = process.env.REACT_APP_API_URL as string;

export async function login(user: User) {
    try {
        const res = await fetch("/auth/google", {
            method: "POST",
            body: JSON.stringify({
                user: user
            }),
            credentials: 'include',
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

export async function logout(currentUser: User) {
    try {
        const headers = new Headers();
        headers.set('token_id', currentUser.tokenId);
        headers.set('_id', currentUser._id as string);
        headers.set('Content-Type', 'application/json');

        await fetch(apiUrl + "/logout", {
            headers
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

        if (data && data._id) {
            return data;
        }

        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}