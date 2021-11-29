import React from 'react';

const apiUrl = process.env.API_URL;


export const Login = () => {
    const onLogin = async () => {
        await fetch(apiUrl + '/')
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-5">
                    <button className='btn btn-primary my-5'>
                        <i className="bi bi-google me-3"></i>
                        <span>Sign In with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
