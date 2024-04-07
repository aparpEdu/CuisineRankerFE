import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import '../../components/successfull_email_confirm/SuccessfullEmailConfirmation.css'
import api from "../../services/api";
import Spinner2 from "../../components/spinner/Spinner2";
const ConfirmChangeEmail = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const value = new URLSearchParams(location.search).get('value');

    useEffect(() => {
        const changeEmail = async () => {
            setIsLoading(true);
            try {
                if (value) {
                    await api.patch(`/auth/change-email/confirm?value=${value}`);
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("user_data");
                    setIsLoading(false);
                    setIsConfirmed(true);
                } else {
                    console.error('Value is undefined.');
                }
            } catch (error) {
                setIsLoading(false);
                setError(error.data.message);
                console.error('Error confirming change:', error);
            }
        };

        changeEmail();
    }, [value]);

    return (
        <div>
            {isLoading ? (
                <div className="spinner-overlay">
                    <Spinner2 />
                </div>
            ) : (
                <div>
                    {isConfirmed ? (
                        <div className="container">
                            <h2>Email changed</h2>
                            <p>Your email has been successfully changed.</p>
                            <p>Please Sign in again to resume</p>
                            <Link to="/">Sign in</Link>
                        </div>
                    ) : (
                        <div className="container">
                            <h2>Something Went wrong</h2>
                            <p>{error ? error : "Your email has not been changed."}</p>
                            <Link to="/">Return to Home</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ConfirmChangeEmail;