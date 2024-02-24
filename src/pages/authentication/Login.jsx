import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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

            localStorage.setItem("access_token", response.data.accessToken);
            localStorage.setItem("refresh_token", response.data.refreshToken);
            window.location.href = "/explore";

        } catch (error) {
            setError(error.response.data.message);
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Sign In</button>
            </form>

            <div className="options">
                <Link to= "/forgot-password">Forgot Password?</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
};

export default Login;