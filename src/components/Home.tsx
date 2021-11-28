import * as React from "react";
import { User } from "../types";
const { useState, useEffect } = React;


export const Home = (props: { currentUser: User, todos: string[]; }) => {
    const { currentUser } = props;

    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<string[]>(props.todos);

    const handleSubmit = async (event: any) => {
        setTodos((todosState) => todosState.concat(todo));
        setTodo('');
        event.preventDefault();
    };

    const handleChange = (event: any) => {
        setTodo(event.target.value);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {
                    currentUser && currentUser != null &&
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/"><b>Todolist</b></a>
                        <div className="d-flex flex-row align-items-center float-end">
                            <img src={currentUser.photoUrl} className="img-thumbnail rounded-circle shadow-sm me-2" alt={currentUser.firstName + ' thumbnail'} width='48' />
                            <div className="d-flex flex-column">
                                <div>{currentUser.firstName + ' ' + currentUser.lastName}</div>
                                <a className="text-muted" href='/auth/google/logout'></a>
                            </div>
                        </div>
                    </div>
                }
            </nav>
            <div className="container">
                <div className="row justify-content-center pt-5">
                    <form className="d-flex mt-5 mx-3" onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={todo} className="form-control me-2 border-secondary" type="search" placeholder="Write Something..." aria-label="Search" style={{ fontWeight: 500, letterSpacing: 1 }} />
                        <button className="btn btn-outline-primary" type="submit" style={{ fontWeight: 500, letterSpacing: 1 }}>
                            Add
                        </button>
                    </form>
                </div>
                <div className="row justify-content-center pt-5">
                    {
                        todos.map((todoText: string) => (
                            <div className="alert alert-warning">{todoText}</div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};