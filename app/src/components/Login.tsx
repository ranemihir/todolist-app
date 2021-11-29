import React from 'react';

const apiUrl = process.env.REACT_APP_API_URL;


export const Login = () => {
    const onLogin = async () => {
        const res = await fetch(apiUrl + '/auth/google');
        console.log(res);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-5">
                    <button className='btn btn-primary my-5' onClick={onLogin}>
                        <i className="bi bi-google me-3"></i>
                        <span>Sign In with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
