const API_URL = 'http://localhost:3001';

export const getTodos = async () => {
    const response = await(fetch(API_URL));
    return response.json();
}

export const createTodo = async (title: string) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });
    return response.json();
}

export const toggleTodo = async ( id: number, completed: boolean,) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
    });
    return response.json();
}

export const deleteTodo = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return response.ok;
}