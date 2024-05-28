import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import Spinner2 from "../../components/spinner/Spinner2";
import GoogleLoginButton from "../../components/google/GoogleLoginButton";
import {handleGoogleLoginSuccess, handleGoogleLoginFailure} from "../../services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [twoFactor, setTwoFactor] = useState(false);
    const [token, setToken] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            alert("Please enter both email and password.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:443/api/v1/auth/signin",
                {
                    email: email,
                    password: password,
                }
            );
            setAccessToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);

            if (response.data.isTwoFactor === true) {
                setIsLoading(false);
                setTwoFactor(true);
            } else {
                localStorage.setItem("access_token", response.data.accessToken);
                localStorage.setItem("refresh_token", response.data.refreshToken);
                window.location.href = "/explore";
            }

        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.message);
        }

    };

    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        try {
          const response =  await axios.patch(
                "http://localhost:443/api/v1/auth/two-factor/confirm",
                {
                    token: token
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            if (response) {
                setError(response.data.token);
            }
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            window.location.href = "/explore";
        } catch (error) {
            setError("Please input a valid token");
        }
    }

    const handleGoogleSuccess = async (credentials) => {
      try {
          await handleGoogleLoginSuccess(credentials);
          window.location.reload();
      } catch (error) {
          setError(error.response.data.message);
      }
    }

    return (
        <div className="login-container">
            <h2>Log In</h2>
            {twoFactor ? (
                <form onSubmit={handleTokenSubmit}>
                    <label>Two-Factor Authentication Token:</label>
                    <input
                        type="text"
                        placeholder="Enter your 2FA token"
                        value={token}
                        onChange={handleTokenChange}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Submit</button>
                </form>
            ) : (
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

                    {isLoading && (
                        <div className="spinner-overlay">
                            <Spinner2 />
                        </div>
                    )}
                </form>

            )}

            <div className="options">

                <Link to="/forgot-password">Forgot Password?</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
            <div className={"google-button"}>
                <GoogleLoginButton
                    onSuccess={handleGoogleSuccess}
                    onFailure={handleGoogleLoginFailure}
                />
            </div>
        </div>
    );
};

export default Login;