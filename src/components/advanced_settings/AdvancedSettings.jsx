import React, {useEffect, useState} from "react";
import api from "../../services/api";


const AdvancedSettings = () => {
    const [error, setError] = useState("");
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/users");
                const { isTwoFactorEnabled, isSocial} = response.data;
                setIsTwoFactorEnabled(isTwoFactorEnabled);
                setIsDisabled(isSocial);
            } catch (error) {
                setError(error.data.message);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = async () => {
        try {
            setError("")
            setIsTwoFactorEnabled(!isTwoFactorEnabled);
            setIsDisabled(true);
            await api.patch("/auth/two-factor")
            setIsDisabled(false);
        } catch (error) {
            setIsTwoFactorEnabled(false);
            setIsDisabled(false);
            setError(error.response.data.message);
        }


    };
    return (
        <div>
            <div className="form-group">
                <label className={"switch-label"}>Two-Factor Authentication</label>
                <label className="switch">
                    <input type="checkbox"  checked={isTwoFactorEnabled}
                           onChange={handleCheckboxChange}
                           disabled={isDisabled}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
            {error && <p className="error-switch" >{error}</p>}
        </div>
    );
}

export default AdvancedSettings;