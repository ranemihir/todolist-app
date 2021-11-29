import { useEffect, useState } from 'react';
import { User } from '../../../types';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { GoogleSignIn } from './GoogleSignIn';
import * as userService from '../services/auth';


export const App = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const setCurrentUserState = (user: User) => setCurrentUser(user);

    useEffect(() => {
        (async () => {
            try {
                const currentUserData = await userService.getCurrentUser();

                if (currentUserData) {
                    setCurrentUser(currentUserData);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const onLogout = async () => {
        await userService.logout();
        setCurrentUser(null);
    };

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home currentUser={currentUser} onLogout={onLogout} />} />
                <Route path='/login' element={<GoogleSignIn currentUser={currentUser} setCurrentUserState={setCurrentUserState} />} />
            </Routes>
        </Router>
    );
};