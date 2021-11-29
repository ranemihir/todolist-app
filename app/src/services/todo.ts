export async function create(text: string) {
    try {
        const res = await fetch('/create', {
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
        const res = await fetch('/todolist', {
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
        const res = await fetch('/delete', {
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