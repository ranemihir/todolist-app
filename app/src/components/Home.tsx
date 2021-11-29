import { useState } from 'react';
import { User } from '../../../types';

const apiUrl = process.env.API_URL;


export const Home = (props: { currentUser: User | null, onLogout: () => {}; }) => {
    const { currentUser, onLogout } = props;
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<string[]>([]);

    const handleAdd = () => {
        setTodos(todos.concat(todo));
        setTodo('');
    };

    const handleChange = (event: any) => {
        setTodo(event.target.value);
    };

    const handleDelete = (i: number) => {
        setTodos(todos.splice(i, 1));
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {currentUser && currentUser != null &&
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/"><b>Todolist</b></a>
                        <div className="d-flex flex-row align-items-center float-end">
                            <img src={currentUser.photoUrl} className="img-thumbnail rounded-circle shadow-sm me-2" alt={currentUser.firstName + ' thumbnail'} width='48' />
                            <div className="d-flex flex-column">
                                <div>{currentUser.firstName + ' ' + currentUser.lastName}</div>
                                <span className="text-muted text-decoration-none" onClick={onLogout}><small>Sign Out</small></span>
                            </div>
                        </div>
                    </div>
                }
            </nav>
            <div className="container">
                <div className="row justify-content-center pt-5">
                    <div className="d-flex mt-5 mx-3">
                        <input onChange={handleChange} value={todo} className="form-control me-2 border-secondary" type="search" placeholder="Write Something..." aria-label="Search" style={{ fontWeight: 500, letterSpacing: 1 }} />
                        <button className="btn btn-primary" style={{ fontWeight: 500, letterSpacing: 1 }} onClick={handleAdd}>
                            Add
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center pt-5">
                    {todos.map((todoText: string, i: number) => (
                        <div className="alert alert-warning">
                            <span>{todoText}</span>
                            <button type="button" className="btn ms-3" onClick={() => handleDelete(i)}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

