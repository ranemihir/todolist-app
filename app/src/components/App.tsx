import { useEffect, useState } from 'react';
import { User } from '../../../types';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { Login } from './Login';

const apiUrl = process.env.REACT_APP_API_URL;

export const App = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            const currentUserData = await (await fetch(apiUrl + '/currentuser')).json();
            console.log(currentUserData);
            setCurrentUser(currentUserData);
        })();
    }, []);

    const onLogout = async () => {
        await fetch(apiUrl + '/auth/google/logout');
        setCurrentUser(null);
    };

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home currentUser={currentUser} onLogout={onLogout} />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    );
};