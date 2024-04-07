import React, {useState} from "react";
import "./Settings.css"
import SettingsNavBar from "../../components/settings_nav_bar/SettingsNavBar";
import GeneralSettings from "../../components/general_settings/GeneralSettings";
import ChangePassword from "../../components/change_password/ChangePassword";
import EmailSettings from "../../components/email_settings/EmailSettings";
import AdvancedSettings from "../../components/advanced_settings/AdvancedSettings";


const Settings = () => {

    const [openedTab, setOpenedTab] = useState("General")

    const renderSelectedComponent = () => {
        switch (openedTab) {
            case "General":
                return <GeneralSettings />;
            case "Password":
                return <ChangePassword />;
            case "Email":
                return <EmailSettings />;
            case "Advanced":
                return <AdvancedSettings />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="page-title">
                <h2>Settings</h2>
            </div>

            <div className="settings-container">
                {renderSelectedComponent()}
                <SettingsNavBar setOpenedTab={setOpenedTab} />
            </div>
        </div>
    );
};


export default Settings;