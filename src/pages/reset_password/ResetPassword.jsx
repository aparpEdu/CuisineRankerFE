import React, { useState } from "react";
import axios from "axios";
import "../authentication/Login.css"
import {Link, useLocation} from "react-router-dom";


const ResetPassword  = () => {
    const [newPassword, setNewPassword] = useState("");
    const [matchingPassword, setMatchingPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get('value');


    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setMatchingPassword(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.patch(
                `http://localhost:443/api/v1/auth/reset-password?value=${value}`,
                {
                    newPassword: newPassword,
                    matchingPassword: matchingPassword,
                }
            );

            setIsSuccess(true);

        } catch (error) {
            console.error("ERROR: ", error.message);
        }

    };

    const validateInputs = () => {
        const errors = {};
        if (!newPassword.trim()) {
            errors.password = "Please enter a password.";
        } else if (newPassword.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        }

        if(!matchingPassword.trim()){
            errors.matchingPassword = "Please enter a matching password"
        }

        if (newPassword !== matchingPassword) {
            errors.matchingPassword = "Passwords do not match.";
        }

        setErrors(errors);
        return errors;
    };

    return (
        <div>
            {isSuccess ? (
                <div className="container">
                    <h2>Your password was successfully reset</h2>
                    <p><Link to={"/"}>Return Home</Link></p>
                </div>
                ) : (
        <div className="login-container">
            <h2>Reset your password</h2>
            <form onSubmit={handleSubmit}>
            <label>Password:</label>
            <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}

            <label>Confirm Password:</label>
            <input
                type="password"
                placeholder="Confirm your new password"
                value={matchingPassword}
                onChange={handleConfirmPasswordChange}
            />
            {errors.matchingPassword && <span className="error">{errors.matchingPassword}</span>}

            <button type="submit">Change Password</button>
            </form>
        </div>
            )
            }
        </div>
    );

}

export default ResetPassword;