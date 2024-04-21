import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './FriendList.css'

const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchFriends();
    },  [searchTerm]);

    const fetchFriends = async () => {
        try {
            const response = await api.get('users/friends');
            const friendsData = response.data.friendships;
            setFriends(friendsData);
            filterFriends(friendsData);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };


    const filterFriends = (data) => {
        const filtered = data.filter((friend) =>
            friend.friendName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFriends(filtered);
    };

    const handleRemoveFriend = async (friendId) => {
        try {
            await api.delete(`users/friends/${friendId}`);
            fetchFriends();
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    const handleBlockFriend = async (friendId) => {
        try {
            await api.put(`users/friends/${friendId}/block`);
            fetchFriends();
        } catch (error) {
            console.error('Error blocking friend:', error);
        }
    };

    const handleAddFriend = async () => {

    };

    return (
        <div className={"friend-menu"}>
            <div className={"friends-top"}>
            <input
                type="text"
                placeholder="Search Friends"
                value={searchTerm}
                onChange={handleSearch}
            />
            <button onClick={handleAddFriend}>Add Friend</button>
        </div>
            <div className={"friend-list"}>
                {filteredFriends.map((friend) => (
                    <div key={friend.id} className="friend-container">
                        <div className="profile-pic">
                            <img src={friend.friendImage} alt="Profile"/>
                        </div>
                        <div className="friend-details">
                            <p>{friend.friendName}</p>
                            <p style={{color:"cornsilk"}}>Friends since: {friend.updatedAtFormatted}</p>
                        </div>
                        <div className="action-buttons">
                            <button onClick={() => handleRemoveFriend(friend.id)}>
                                Remove
                            </button>
                            <button style={{backgroundColor: "darkred"}} onClick={() => handleBlockFriend(friend.id)}>
                                Block
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendList;
