import "./EmailConfirm.css"
import React, { useState } from "react";
import CodeConfirm from "../code_confirm/CodeConfirm";
import axios from "axios";
import Spinner2 from "../spinner/Spinner2";

const EmailConfirm = ({email}) => {
    const [showCodeConfirmation, setShowCodeConfirmation] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const handleShowCodeConfirmation = () => {
        setShowCodeConfirmation(true);
    };

    const handleResendConfirmationMail = async () => {
        setIsLoading(true);
        try {
            await axios.post(`http://localhost:443/api/v1/auth/confirm-email/resend?email=${email}`);
            setError("");
            setSuccess("Successfully resent email confirmation");
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setSuccess("");
            setError(e.response.data.message);
        }

    };

    return (
        <div className="success-container">
            {showCodeConfirmation ? (
                <CodeConfirm />
            ) : (
                <>
                    <h2>Successful Registration!</h2>
                    <p>
                        Thank you for signing up! An email has been sent for confirmation.
                        If you haven't received an email, please check your spam folder.
                    </p>
                    <p>
                        If you wish to manually confirm your email, you can manually
                        do so by entering the confirmation code we've sent you:
                        <button onClick={handleShowCodeConfirmation}>Click here</button>
                    </p>
                    <p>
                        Did not receive your email? <button onClick={handleResendConfirmationMail}>Resend email</button>
                    </p>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "lime" }}>{success}</p>}
                    {isLoading && (
                        <div className="spinner-overlay">
                            <Spinner2 />
                        </div>
                    )}

                </>
            )}
        </div>
    );
};

export default EmailConfirm;