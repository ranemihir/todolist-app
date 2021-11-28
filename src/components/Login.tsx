import * as React from "react";

export const Login = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-5">
                    <a className='btn btn-primary my-5' href='/api/auth/google'>
                        <i className="bi bi-google me-3"></i>
                        <span>Sign In with Google</span>
                    </a>
                </div>
            </div>
        </div>
    );
};