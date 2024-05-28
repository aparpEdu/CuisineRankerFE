import React, {useEffect, useState} from 'react';
import api from "../../services/api";
import "./FriendToken.css"


const FriendToken = ({onClose}) => {
    const [token, setToken] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect( () => {
        const fetchToken = async () => {
            try {
                const response = await api.post("/users/friends/token");
                setToken(response.data.value);
            } catch (error) {
                console.log(error);
            }
        }
        fetchToken();
    }, []);

    const handleTokenClick = () => {
        navigator.clipboard.writeText(token)
            .then(() => {
                setCopied(true);
                console.log('Copied to clipboard:', token);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    }

    return (
        <div className={"friend-token-container"}>
            <div className={"friend-token-container_header"}>
                <h3>Friendship Token</h3>
                <button className={"close-button"} onClick={onClose}>
                    X
                </button>
            </div>
            <div className={"friend-token-container_body"}>
                    <input onClick={handleTokenClick} type="text" value={token} className="friend-token-input" disabled={false}/>
                    {copied && <span style={{ marginLeft: '5px' }}>Copied!</span>}
                    <p>You can share this friend token to someone who you would like to add you ass a friend</p>
                    <p>Your friend can add you by clicking "Add Friend" -> "By token"</p>
            </div>
        </div>
    );
};

export default FriendToken;