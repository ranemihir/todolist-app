import { useEffect, useState } from 'react';
import { User } from '../../../types';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { GoogleSignIn } from './GoogleSignIn';
import * as userService from '../services/auth';
import { Auth } from './Auth';
import { Anonymous } from './Anonymous';


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
                <Route path='/' element={
                    <Auth currentUser={currentUser}>
                        <Home currentUser={currentUser} onLogout={onLogout} />
                    </Auth>
                } />
                <Route path='/login' element={
                    <Anonymous currentUser={currentUser}>
                        <GoogleSignIn setCurrentUserState={setCurrentUserState} />
                    </Anonymous>
                } />
            </Routes>
        </Router>
    );
};