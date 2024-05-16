import React, {useState} from 'react';
import "./AddFriend.css"
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFriend = ({onClose}) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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
        } catch (error) {
            console.error('Error adding friend:', error);
        }

    }

    const notifySuccess = () => toast.success("Friendship Request sent!");

    return (
        <div className={"add-friend-container"}>
            <div className={"add-friend-container_header"}>
                <h3>Add Friend</h3>
                <button className={"close-button"} onClick={onClose}>
                    X
                </button>
            </div>
            <div className={"add-friend-container_search"}>
                <input onChange={onSearch} placeholder={"Search for available users"} type="text" className="add-friend-container-search"/>
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
            <ToastContainer/>
        </div>
    );

}

export default AddFriend;