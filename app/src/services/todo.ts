import { User } from "../../../types";

const apiUrl = process.env.REACT_APP_API_URL as string;


export async function create(text: string, currentUser: User) {
    try {
        const headers = new Headers();
        headers.set('token_id', currentUser.tokenId);
        headers.set('_id', currentUser._id as string);
        headers.set('Content-Type', 'application/json');

        const res = await fetch(apiUrl + '/create', {
            method: 'POST',
            body: JSON.stringify({
                text
            }),
            headers
        });

        const data = await res.json();

        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function getTodos(currentUser: User) {
    try {
        const headers = new Headers();
        headers.set('token_id', currentUser.tokenId);
        headers.set('_id', currentUser._id as string);
        headers.set('Content-Type', 'application/json');

        const res = await fetch(apiUrl + '/todolist', {
            method: 'GET',
            headers
        });

        const data = await res.json();

        if (data) {
            return data.todos;
        }

        return [];
    } catch (err) {
        console.error(err);
    }
}

export async function del(_id: string, currentUser: User) {
    try {
        const headers = new Headers();
        headers.set('token_id', currentUser.tokenId);
        headers.set('_id', currentUser._id as string);
        headers.set('Content-Type', 'application/json');

        await fetch(apiUrl + `/delete/${_id}`, {
            method: 'POST',
            headers
        });
    } catch (err) {
        console.error(err);
    }
}