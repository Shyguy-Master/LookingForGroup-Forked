import React from 'react';
import "../styles.css";

const Login = () =>{
    return(
        <div className="centerContainer">
        <div className="flexRowContainer">
            <div className="flexRow4">
                <h1>   Welcome!!</h1>
                <h2>Don't have an account?</h2>
                <button className="button" type="button" onClick={() => ('/SignUp')}>Sign Up</button>
            </div>

            <div className="flexRow3">
                <form id="signupForm" action="Homepage.html">
                    <h1>Login</h1>
                    <input type="text" id="username email" name="username" placeholder="Username/Email" /><br/>
                    <input type="password" id="password" name="password" placeholder="Password" /><br/>
                    <button className="button" type="submit" role="button">Login</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Login