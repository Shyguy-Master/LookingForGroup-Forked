import "./pages.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as paths from "../../constants/routes";

const Login = (props) => {
    const navigate = useNavigate(); // Hook for navigation

    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle the login button click
    const handleLogin = () => {
        // Check if the email and password are not empty
        if (email === '' || password === '') {
            setError('Please fill in all information');
        } else {
            // Navigate to the home page
            navigate(paths.routes.HOME);
        }
    };

    return (
        <div className="background-cover">
            <div className="login-signup-container">
                <div className="directory column">
                    <h1>Welcome!</h1>
                    <p>Don't have an account?</p>
                    <button onClick={() => navigate(paths.routes.SIGNUP)}>Sign Up</button>
                </div>
                <div className="login-form column">
                    <h2>Log In</h2>
                    <div className="login-form-inputs">
                    <div className="error">{error}</div>
                        <input
                            className="login-input"
                            type="text"
                            placeholder="School Email or Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button id="forgot-password">Forgot Password</button>
                        
                        <div className="mobile-signup">
                            <p>No account? </p>
                            <p id="signup-btn-mobile" onClick={() => navigate(paths.routes.SIGNUP)}>Sign Up</p>
                        </div>
                    </div>
                    <button id="main-loginsignup-btn" onClick={handleLogin}>Log In</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
