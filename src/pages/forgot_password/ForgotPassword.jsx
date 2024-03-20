import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css"
import {Link} from "react-router-dom";
import Spinner2 from "../../components/spinner/Spinner2";

const ForgotPassword  = () => {
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleInputEmail = async () => {
        setIsLoading(true);
        try {
            await axios.post(`http://localhost:443/api/v1/auth/forgot-password`, {
                email: email,
            });
            setIsSuccess(true);
        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.email);
            if(!error.response.data.email) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div>
            {isSuccess ? (
                <div className="container">
                    <h2>A link to reset your password was sent to your email</h2>
                    <p><Link to={"/"}>Return Home</Link></p>
                </div>
            ) : (
                <div className="container">
                    <h2>Forgot Password</h2>
                    <p>Please enter your registered email down below</p>
                    <input
                        type="text"
                        placeholder="example@example.com"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button onClick={handleInputEmail}>Confirm</button>
                    {isLoading && (
                        <div className="spinner-overlay">
                            <Spinner2 />
                        </div>
                    )}
                </div>
            )

            }
        </div>
    );

}

export default ForgotPassword;