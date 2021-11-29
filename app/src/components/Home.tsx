import { useState } from 'react';
import { User } from '../../../types';

// const apiUrl = process.env.REACT_APP_API_URL;


export const Home = (props: { currentUser: User | null, onLogout: () => {}; }) => {
    const { currentUser, onLogout } = props;
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<string[]>([]);

    const handleCreate = () => {
        setTodos(todos.concat(todo));
        setTodo('');
    };

    const handleChange = (event: any) => {
        setTodo(event.target.value);
    };

    const handleDelete = (i: number) => {
        const newTodos = todos.filter((val: string, index: number) => index !== i);
        setTodos(newTodos);
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
                                <span className="text-muted text-decoration-none" onClick={onLogout}><small>Sign Out</small></span>
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
                                todos.map((todoText: string, i: number) => (
                                    <div className="alert alert-warning border-2 rounded-pill px-4 d-flex flex-row justify-content-between shadow-sm">
                                        <span>{todoText}</span>
                                        <button type="button" className="btn ms-3 p-0" onClick={() => handleDelete(i)}>
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

