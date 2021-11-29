import { useEffect, useState } from 'react';
import { User } from '../../../types';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { GoogleSignIn } from './GoogleSignIn';


export const App = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const currentUserData = await (await fetch('/currentuser')).json();
                console.log(currentUserData);
                setCurrentUser(currentUserData);
            } catch (err) {
                console.error(err);
            }
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
                <Route path='/login' element={<GoogleSignIn />} />
            </Routes>
        </Router>
    );
};