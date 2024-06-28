import React, {useState} from "react";
import api from "../../services/api";
import Spinner2 from "../spinner/Spinner2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../general_settings/GeneralSettings.css'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [matchingPassword, setMatchingPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateInputs();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            setIsLoading(true);
            await api.patch("/auth/change-password", {
                oldPassword: oldPassword,
                newPassword: newPassword,
                matchingPassword: matchingPassword
            });
            setIsLoading(false);
            toast.success("Password changed successfully.");
        } catch (e) {
            setIsLoading(false);
            toast.error(e.response.data.message);
        }
    };


    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleMatchingPasswordChange = (e) => {
        setMatchingPassword(e.target.value);
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
    <div >
            <form onSubmit={handleSubmit} className= "general-settings-container">
                    <label className={"settings-label"} htmlFor="oldPassword">Old Password:</label>
                    <input
                        className={"settings-input"}
                        type="password"
                        id="oldPassword"
                        onChange={handleOldPasswordChange}
                    />
                    <label className={"settings-label"} htmlFor="newPassword">New Password:</label>
                    <input
                        className={"settings-input"}
                        type="password"
                        id="newPassword"
                        onChange={handleNewPasswordChange}
                    />
                {errors.password && <span >{errors.password}</span>}
                    <label className={"settings-label"} htmlFor="matchingPassword">Confirm Password:</label>
                    <input
                        className={"settings-input"}
                        type="password"
                        id="matchingPassword"
                        onChange={handleMatchingPasswordChange}
                    />
                {errors.matchingPassword && <span >{errors.matchingPassword}</span>}
                <button type="submit" className="button-save">SAVE CHANGES</button>
                {isLoading && (
                    <div className="spinner-overlay">
                        <Spinner2 />
                    </div>
                )}
            </form>
        <ToastContainer />
    </div>
  );
};

export default ChangePassword;