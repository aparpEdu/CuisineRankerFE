import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:443/api/v1/auth/signin",
                {
                    email: email,
                    password: password,
                }
            );

            console.log("Authentication successful:", response.data);
        } catch (error) {
            console.error("Authentication failed:", error.message);
            alert("Authentication failed. Please check your credentials.");
        }
    };

    return (
        <div className="login-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                />

                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <button type="submit">Sign In</button>
            </form>

            <div className="options">
                <a href="#">Forgot Password?</a>
                {/*<span> | </span>*/}
                <a href="#">Sign Up</a>
            </div>
        </div>
    );
};

export default Login;
