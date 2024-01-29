import "./EmailConfirm.css"
import React, { useState } from "react";
import CodeConfirm from "../code_confirm/CodeConfirm";

const EmailConfirm = () => {
    const [showCodeConfirmation, setShowCodeConfirmation] = useState(false);
    const handleShowCodeConfirmation = () => {
        setShowCodeConfirmation(true);
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
                        If you encounter any issues or didn't receive the email, you can manually
                        confirm your account by entering the confirmation code:
                        <button onClick={handleShowCodeConfirmation}>Click here</button>
                    </p>
                </>
            )}
        </div>
    );
};

export default EmailConfirm;