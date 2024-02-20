import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { Link } from "react-router-dom";
import {ReactComponent as GearIcon} from "../../assets/cogwheel.svg";
import api from '../../services/api'

const Profile = () => {
    const [level, setLevel] = useState(5);
    const [experience, setExperience] = useState(70);
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem("user_data");
        return storedUserData ? JSON.parse(storedUserData) : {};
    });

    const handleSignOut = async () => {
        try {
            await axios.post("http://localhost:443/api/v1/auth/signout");

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user_data");

            window.location.href = "/";
            console.log("Signing out...");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const response = await api.get('/users');
                const { name, email } = response.data;
                const newUserData = { name, email };


                setUserData(newUserData);

                localStorage.setItem("user_data", JSON.stringify(newUserData));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-section">
                <div className="profile-picture-container">
                    <div className="profile-picture">
                        <div className="level-circle">{level}</div>
                    </div>
                </div>
                <div className="profile-info-container">
                    <div className="profile-info">
                        <div className="name">{userData.name}</div>
                        <div className="email">{userData.email}</div>
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
                    <div className="gear-icon" style={{ color: '#B4BBCC' }}>
                        <GearIcon />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Profile;
