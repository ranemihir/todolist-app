const apiUrl = process.env.REACT_APP_API_URL as string;


export async function create(text: string) {
    try {
        const res = await fetch(apiUrl + '/create', {
            method: 'POST',
            body: JSON.stringify({
                text
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

export async function getTodos() {
    try {
        const res = await fetch(apiUrl + '/todolist', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json() as { _id: string, text: string; }[];

        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function del(_id: string) {
    try {
        const res = await fetch(apiUrl + '/delete', {
            method: 'POST',
            body: JSON.stringify({
                _id
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