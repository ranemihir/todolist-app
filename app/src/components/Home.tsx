import { useEffect, useState } from 'react';
import { User } from '../../../types';
import * as todoService from '../services/todo';


export const Home = (props: { currentUser: User | null, onLogout: () => void; }) => {
    const { currentUser, onLogout } = props;
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<{ _id: string, text: string; }[]>([]);

    useEffect(() => {
        try {
            (async () => {
                const todosData: { _id: string, text: string; }[] = await todoService.getTodos(currentUser as User) || [];
                console.log(todosData);
                setTodos(todosData);
            })();
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleCreate = async () => {
        try {
            const todoItem: { _id: string, text: string; } = await todoService.create(todo, currentUser as User);

            const newTodos = [todoItem].concat(todos);
            setTodos(newTodos);

            setTodo('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event: any) => {
        setTodo(event.target.value);
    };

    const handleDelete = async (_id: string) => {
        try {
            await todoService.del(_id, currentUser as User);
            const newTodos = todos.filter((todoItem: { _id: string, text: string; }, index: number) => todoItem._id !== _id);
            setTodos(newTodos);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container-fluid">
                    <span className='d-flex flex-row align-items-center'>
                        <i className="bi bi-check-circle-fill text-primary" style={{ fontSize: '1.4rem' }}></i>
                        <a className="navbar-brand ms-2" href="/"><b>TodoList</b></a>
                    </span>

                    {currentUser && currentUser != null &&
                        <div className="d-flex flex-row align-items-center float-end">
                            <img src={currentUser.photoUrl} className="img-thumbnail rounded-circle shadow-sm me-2" alt={currentUser.firstName + ' thumbnail'} width='48' />
                            <div className="d-flex flex-column">
                                <div>{currentUser.firstName + ' ' + currentUser.lastName}</div>
                                <small className="text-muted text-decoration-none" onClick={onLogout} style={{ cursor: 'pointer' }}>Sign Out</small>
                            </div>
                        </div>
                    }
                </div>
            </nav>
            <div className="container">
                <div className="row justify-content-center pt-5">
                    <div className='col-8'>
                        <div className="d-flex mt-5 mx-1 mb-2">
                            <input onChange={handleChange} value={todo} className="form-control me-2 border border-2 rounded-pill px-3" type="search" placeholder="Write Something..." aria-label="Search" />
                            <button className="btn btn-primary rounded-pill shadow-sm" onClick={handleCreate}>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className='col-8'>
                        {
                            (todos.length > 0) ?
                                todos.map((todoItem: { _id: string, text: string; }, i: number) => (
                                    <div key={i} className="alert alert-warning border-2 rounded-pill px-4 d-flex flex-row justify-content-between shadow-sm">
                                        <span>{todoItem.text}</span>
                                        <button type="button" className="btn ms-3 p-0" onClick={() => handleDelete(todoItem._id)}>
                                            <i className="bi bi-x-circle-fill text-danger"></i>
                                        </button>
                                    </div>
                                ))
                                :
                                <p className='text-muted text-center fst-italic mt-4'>No Todo Items</p>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

