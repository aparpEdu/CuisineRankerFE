import React, {useState} from 'react';
import "./AddFriend.css"
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFriend = ({onClose}) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchActive, setIsSearchActive] = useState(true);
    const [friendshipToken, setFriendshipToken] = useState("");

    const onSearch = async (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
        try {
            const response = await api.get(`/users/search?name=${searchTerm}`);
            const usersData = response.data.users;
            console.log(usersData);
            setUsers(usersData);
            console.log(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    const handleAddFriend = async (userId) => {
        setSearchTerm("");
        try {
            await api.post(`users/friends/${userId}`);
            notifySuccess();
            setUsers([]);
        } catch (error) {
            console.error('Error adding friend:', error);
        }

    }

    const notifyError = (error) => {
        toast.error(error);
    }

    const notifySuccessToken = () => {
        toast.success("Successfully added!");
    }

    const handleTokenChange = (e) => {
        setFriendshipToken(e.target.value);
    }

    const handleAddFriendWithToken = async () => {
        if (!friendshipToken) {
            notifyError("Friendship token cannot be empty");
            return;
        }
        try {
            const requestBody = {
                value: friendshipToken,
            };
            console.log("Sending request body:", requestBody);

            await api.patch("/users/friends/token", requestBody);
            notifySuccessToken();
        } catch (error) {
            notifyError(error.response?.data?.message || "Error adding friend with token");
            console.error('Error adding friend with token:', error);
        }
    };

    const notifySuccess = () => toast.success("Friendship Request sent!");

    return (
        <div className={"add-friend-container"}>
            <div className={"add-friend-container_header"}>
                <h3>Add Friend</h3>
                <button className={"close-button"} onClick={onClose}>
                    X
                </button>
            </div>
            <div className={"add-friend-container_selector"}>
                  <span
                      onClick={() => setIsSearchActive(true)}
                      className={isSearchActive ? 'active' : ''}
                  >
                    Search
                </span>
                <span
                    onClick={() => setIsSearchActive(false)}
                    className={!isSearchActive ? 'active' : ''}
                >
                    By friend code
                </span>
            </div>

            {isSearchActive ? (
                <div>
                    <div className={"add-friend-container_search"}>
                        <input
                            onChange={onSearch}
                            value={searchTerm}
                            placeholder="Search for available users"
                            type="text"
                        />
                    </div>
                    <div className={"add-friend-container_users"}>
                        {users.map((user) => (
                            <div key={user.id} className={"user-box"}>
                                <div className={"user-box_pic"}><img src={user.profilePicURL} alt="Profile"/></div>
                                <p>{user.name}</p>
                                <button onClick={() => handleAddFriend(user.id)}>Add Friend</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={"add-friend-container_token"}>
                    <input
                        placeholder="Enter your friend's friendship token"
                        type="text"
                        onChange={handleTokenChange}
                    />
                    <button onClick={handleAddFriendWithToken}>Add Friend</button>
                </div>
            )}

            <ToastContainer/>
        </div>
    );

}

export default AddFriend;