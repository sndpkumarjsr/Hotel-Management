import React from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    auth: () => void;
    userType: 'user' | 'admin';
}

const LoginForm: React.FC<LoginFormProps> = ({ email, password, setEmail, setPassword, auth, userType }) => {
    return (
        <div className="main1">
            <div className="login_border main">
                <h1 className="Login_heading head">{userType === 'admin' ? 'Admin Login' : 'User Login'}</h1>
                <label>
                    <input type="email" name="email" value={email} placeholder="Email" className="input" onChange={(e)=>{setEmail(e.target.value)}} />
                </label>
                <label>
                    <input type="password" name="password" value={password} placeholder="Password" className="input" onChange={(e)=>{setPassword(e.target.value)}} />
                </label>
                <button className="btn" onClick={auth}>{userType === 'admin' ? 'Admin Login' : 'User Login'}</button>
                <label>
                    {(userType === 'admin' )?<>
                    </>:<>
                    <Link to={'/forget-pass'}>Forget Password</Link>
                    </>}
                </label>
                <label>
                    {(userType === 'admin')? <>
                    </>:<>
                    <Link to={'/sign-up'}>Create New Account</Link>
                    </>}
                </label>
            </div>
        </div>
    );
}

export default LoginForm;
