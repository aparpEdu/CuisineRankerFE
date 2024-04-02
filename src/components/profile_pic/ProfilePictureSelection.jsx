import React, { useState, useEffect } from "react";
import api from '../../services/api'
import "./ProfilePictureSelection.css";

const ProfilePictureSelection = ({ onSelect, onClose, selectedProfilePic }) => {
    const [profilePics, setProfilePics] = useState([]);

    useEffect(() => {
        const fetchProfilePics = async () => {
            try {
                const response = await api.get("users/pictures");
                setProfilePics(response.data);
            } catch (error) {
                console.error("Error fetching profile pics:", error);
            }
        };

        fetchProfilePics();
    }, []);

    return (
        <div className="profile-picture-selection">
            <div className="profile-picture-selection-header">
                <h3>Profile Picture:</h3>
                <button className="close-button" onClick={onClose}>
                    X
                </button>
            </div>
            <div className="profile-pics-container">
                {profilePics.map((pic) => (
                    <div
                        key={pic.id}
                        className={`profile-pic ${pic.url === selectedProfilePic ? "selected" : ""}`}
                        onClick={() => onSelect(pic.url, pic.id)}
                    >
                        <img src={pic.url} alt={`Profile Pic ${pic.name}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePictureSelection;