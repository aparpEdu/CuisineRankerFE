import React, { useState } from "react";
import "./Profile.css";
import {Link} from "react-router-dom";
import GearIcon from "../assets/cogwheel.svg"

const Profile = () => {
    const [level, setLevel] = useState(5);
    const [experience, setExperience] = useState(70);

    const handleSignOut = () => {
        console.log("Signing out...");
    };

    return (
        <div className="profile-container">
            <div className="profile-section">
                <div className="profile-picture-container">
                    <div className="profile-picture">
                        <div className="level-circle">{level}</div>
                        {}
                    </div>
                </div>
                <div className="profile-info-container">
                    <div className="profile-info">
                        <div className="name">First Name Last Name</div>
                        <div className="email">email@example.com</div>
                    </div>
                </div>
                <div className="experience-bar-container">
                    <div className="experience-label">Experience</div>
                    <div className="experience-bar">
                        <div
                            className="experience-fill"
                            style={{ width: `${experience}%` }}
                        ></div>
                    </div>
                </div>
                <button className="sign-out-button" onClick={handleSignOut}>
                    Sign Out
                </button>
                <Link to="/settings">
                    <div className="gear-icon">
                        <img src={GearIcon} alt="Gear Icon" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
