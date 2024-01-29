import React, { useState } from "react";
import "./CodeConfirm.css"
import axios from "axios";
import {Link} from "react-router-dom";
const CodeConfirm = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

    const handleConfirmationCodeChange = (e) => {
        setConfirmationCode(e.target.value);
    };

    const handleConfirmCode = async () => {
        try {
            await axios.patch(`http://localhost:443/api/v1/auth/confirm-email?value=${confirmationCode}`);
            setIsCodeConfirmed(true);
        } catch (error) {
            console.error('Error confirming code:', error);
        }
    };

    return (
        <div className="code-confirmation-container">
            {isCodeConfirmed ? (
                <div>
                    <h2>Code Confirmed!</h2>
                    <p>Your account has been successfully confirmed.</p>
                    <p><Link to={"/"}>Return Home</Link></p>
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
                    <button onClick={handleConfirmCode}>Confirm</button>
                </div>
            )}
        </div>
    );
};

export default CodeConfirm;
