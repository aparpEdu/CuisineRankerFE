import React from "react";
import "./Login.css";

const Login = () => {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" />

                <label>Password:</label>
                <input type="password" placeholder="Enter your password" />

                <button type="submit">Sign In</button>
            </form>

            <div className="options">
                <a href="#">Forgot Password?</a>
                <span> | </span>
                <a href="#">Sign Up</a>
            </div>
        </div>
    );
};

export default Login;
