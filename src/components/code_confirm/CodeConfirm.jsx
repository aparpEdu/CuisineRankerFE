import React, { useState } from "react";
import "./CodeConfirm.css"
const CodeConfirm = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

    const handleConfirmationCodeChange = (e) => {
        setConfirmationCode(e.target.value);
    };

    const handleConfirmCode = () => {
        setIsCodeConfirmed(true);
    };

    return (
        <div className="code-confirmation-container">
            {isCodeConfirmed ? (
                <div>
                    <h2>Code Confirmed!</h2>
                    <p>Your account has been successfully confirmed.</p>
                </div>
            ) : (
                <div>
                    <h2>Manual Confirmation</h2>
                    <p>
                        Enter the confirmation code you received in your email to
                        confirm your account.
                    </p>
                    <input
                        type="text"
                        placeholder="Confirmation Code"
                        value={confirmationCode}
                        onChange={handleConfirmationCodeChange}
                    />
                    <button onClick={handleConfirmCode}>Confirm Code</button>
                </div>
            )}
        </div>
    );
};

export default CodeConfirm;
