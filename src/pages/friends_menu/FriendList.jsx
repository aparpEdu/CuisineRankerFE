import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './FriendList.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddFriend from "../../components/add_friend/AddFriend";
import FriendToken from "../../components/friend_token/FriendToken";
import FriendRequestMenu from "../../components/friend_request_menu/FriendRequestMenu";

const FriendList = () => {
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddFriendWindow, setShowAddFriendWindow] = useState(false);
    const [showFriendshipTokenWindow, setShowFriendshipTokenWindow] = useState(false);
    const [showRequestsWindow, setShowRequestsWindow] = useState(false);
    const [requests, setRequests] = useState(0);

    useEffect(() => {
        fetchFriends();
        fetchRequests();
    },  [searchTerm, showAddFriendWindow, showFriendshipTokenWindow, showRequestsWindow]);

    const fetchFriends = async () => {
        try {
            const response = await api.get('users/friends');
            const friendsData = response.data.friendships;
            filterFriends(friendsData);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await api.get('users/friends/requests');
            setRequests(response.data.totalElements);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    const handleOpenAddFriendWindow = () => {
        setShowAddFriendWindow(!showAddFriendWindow);
    }

    const handleOpenFriendshipTokenWindow = () => {
        setShowFriendshipTokenWindow(!showFriendshipTokenWindow);
    }

    const handleOpenRequestsWindow = () => {
        setShowRequestsWindow(!showRequestsWindow);
    }

    const filterFriends = (data) => {
        const filtered = data.filter((friend) =>
            friend.friendName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFriends(filtered);
    };

    const handleRemoveFriend = async (friendId, friendName) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to remove this friend?");
            if (confirmDelete) {
                await api.delete(`users/friends/${friendId}`);
                await fetchFriends();
                toast.success('Removed ' + friendName + ' from friend list!');
            }

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

    return (
        <div className={"friend-menu"}>
            <div className={"friends-top"}>
            <input
                type="text"
                placeholder="Search Friends"
                value={searchTerm}
                onChange={handleSearch}
            />
            <button onClick={handleOpenAddFriendWindow}>Add Friend</button>
            <button id={"friendship-token"} onClick={handleOpenFriendshipTokenWindow}>Get Friendship Token</button>
            <button style={{backgroundColor: "#f7931b"}} onClick={handleOpenRequestsWindow}>Friend Requests <span>{requests}</span></button>
        </div>
            {showFriendshipTokenWindow && (
                <FriendToken onClose={handleOpenFriendshipTokenWindow} />
            )}
            {showAddFriendWindow && (
                <AddFriend onClose={handleOpenAddFriendWindow}/>
            )}
            {showRequestsWindow && (
                <FriendRequestMenu onClose={handleOpenRequestsWindow} />
            )}
            <div className={"friend-list"}>
                <ToastContainer />
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
                            <button onClick={() => handleRemoveFriend(friend.id, friend.friendName)}>
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
