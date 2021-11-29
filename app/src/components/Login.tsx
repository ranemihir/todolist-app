import React from 'react';

const apiUrl = process.env.REACT_APP_API_URL;


export const Login = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-5">
                    <a className='btn btn-primary my-5' href={apiUrl + '/auth/google/'}>
                        <i className="bi bi-google me-3"></i>
                        <span>Sign In with Google</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
