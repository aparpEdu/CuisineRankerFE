import React, {useEffect, useState} from "react";
import api from "../../services/api";
import Spinner2 from "../spinner/Spinner2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../general_settings/GeneralSettings.css';


const EmailSettings = () =>{
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [statusColor, setStatusColor] = useState("");
    const [isVerified, setVerified] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            setIsLoading(true);

            await api.post("/auth/change-email", {
                oldEmail: oldEmail,
                newEmail: newEmail
            });
            setIsLoading(false);
            toast.info("Additional confirmation needed. Email was sent to " + oldEmail);
        } catch (e) {
            setIsLoading(false);
            toast.error(e.response.data.message);
        }

    };

    const handleVerifyEmail =  async () => {
        try {
            setIsLoading(true);
            await api.post(`/auth/confirm-email/resend?email=${email}`);
            setIsLoading(false);
            toast.info("Email Confirmation was sent to your email!")
        } catch (e) {
            toast.error("Email Confirmation could not be sent. Please try again.");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/users');
                const verified = response.data.isVerified;
                const email = response.data.email;
                setEmail(email);
                if (verified) {
                    setStatus("Verified");
                    setStatusColor("lime");
                    setVerified(true);
                } else {
                    setStatus("Unverified");
                    setStatusColor("red")
                    setVerified(false);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    const handleOldEmailChange = (e) => {
        setOldEmail(e.target.value);
    };

    const handleNewEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const validateInputs = () => {

        const errors = {};
        if (!oldEmail.trim()) {
            errors.oldEmail = "Please enter your current email address.";
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(oldEmail)) {
            errors.oldEmail = "Please enter a valid email address.";
        }

        if (!newEmail.trim()) {
            errors.newEmail = "Please enter a new email address.";
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newEmail)) {
            errors.newEmail = "Please enter a valid email address.";
        }

        if (newEmail === oldEmail) {
            errors.newEmail = "Please input a new email address";
        }

        setErrors(errors);
        return errors;
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="category-title">
                    <p>Change Email</p>
                </div>
                <div className="form-group">
                    <label className="settings-label" htmlFor="oldEmail">Current Email:</label>
                    <input
                        className="settings-input"
                        type="email"
                        id="oldEmail"
                        onChange={handleOldEmailChange}
                    />
                </div>
                {errors.oldEmail && <span className="error-message">{errors.oldEmail}</span>}
                <div className="form-group">
                    <label className="settings-label" htmlFor="newEmail">New Email:</label>
                    <input
                        className="settings-input"
                        type="email"
                        id="newEmail"
                        onChange={handleNewEmailChange}
                    />
                </div>
                {errors.newEmail && <span className="error-message">{errors.newEmail}</span>}
                <button type="submit" className="button-save">SAVE CHANGES</button>
                {isLoading && (
                    <div className="spinner-overlay">
                        <Spinner2 />
                    </div>
                )}
            </form>
            <div>
            <div className="category-title">
                <p>Email Confirmation</p>
            </div>
                <label className="settings-label">STATUS:</label><span style={{color: `${statusColor}`}}>{status}</span>
                <button className="button-resend" disabled={isVerified} onClick={handleVerifyEmail}>Verify</button>
            </div>
        <ToastContainer />
        </div>
    );
};
export default EmailSettings;