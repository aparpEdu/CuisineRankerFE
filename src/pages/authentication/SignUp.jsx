import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import Success from  "../../components/email_confirm/EmailConfirm"
import Spinner2 from "../../components/spinner/Spinner2";
const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [matchingPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setIsLoading(false);
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:443/api/v1/auth/signup",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    matchingPassword,
                }
            );
            setIsRegistered(true);
            console.log("Registration successful:", response.data);
        } catch (error) {
            console.error("Registration failed:", error.message);
            alert("Registration failed. Please check your details.");
        }
    };

    const validateInputs = () => {
        const errors = {};

        if (!firstName.trim()) {
            errors.firstName = "Please enter a first name.";
        } else if (!/^[A-Za-z'-. ]{1,50}$/.test(firstName)) {
            errors.firstName = "Please enter a valid first name.";
        }

        if (!lastName.trim()) {
            errors.lastName = "Please enter a last name.";
        } else if (!/^[A-Za-z'-. ]{1,50}$/.test(lastName)) {
            errors.lastName = "Please enter a valid last name.";
        }

        if (!email.trim()) {
            errors.email = "Please enter an email address.";
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!password.trim()) {
            errors.password = "Please enter a password.";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        }

        if(!matchingPassword.trim()){
            errors.matchingPassword = "Please enter a matching password"
        }

          if (password !== matchingPassword) {
            errors.matchingPassword = "Passwords do not match.";
        }

        setErrors(errors);
        return errors;
    };

    return (
        <>

            {isRegistered ? (
                <Success />
            ) : (
                <div className="login-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}

                <label>Last Name:</label>
                <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}

                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}

                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}

                <label>Confirm Password:</label>
                <input
                    type="password"
                    placeholder="Confirm your password"
                    value={matchingPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {errors.matchingPassword && <span className="error">{errors.matchingPassword}</span>}

                <button type="submit">Sign Up</button>
            </form>

            <div className="options">
                <Link to="/">Already a registered user? Sign in here.</Link>
            </div>
                    {isLoading && (
                        <div className="spinner-overlay">
                            <Spinner2 />
                        </div>
                    )}
                </div>

                )}
        </>
    );
};

export default Signup;
