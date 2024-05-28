import React, {useState, useEffect} from "react";
import "./FriendRequestMenu.css"
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';

const FriendRequestMenu = ({onClose}) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [isFriendRequestSelected, setIsFriendRequestSelected] = useState(true);

    useEffect(() => {
        fetchFriendRequests();
    }, [isFriendRequestSelected]);


    const fetchFriendRequests = async () => {
        try {
            const friend_requests_response = await api.get("/users/friends/requests");
            const sent_friend_requests_response = await api.get("/users/friends/requests/sent");
            setFriendRequests(friend_requests_response.data.friendships);
            setSentRequests(sent_friend_requests_response.data.friendships);
        } catch (error) {
            console.error("Error fetching friends requests", error);
        }
    }

    const handleAcceptFriendRequest = async (requestId) => {
        try {
            await api.patch(`/users/friends/${requestId}`);
            notifySuccess("Successfully accepted friend request");
            await fetchFriendRequests();
        } catch (error) {
            notifyError(error.response.data.message);
        }
    }

    const handleCancelFriendRequest = async (requestId) => {
        try {
            await api.delete(`/users/friends/requests/${requestId}/cancel`);
            notifySuccess("Successfully canceled friend request");
            await fetchFriendRequests();

        } catch (error) {
            notifyError(error.response.data.message);
        }
    }

    const handleRejectFriendRequest = async (requestId) => {
        try {
            await api.delete(`/users/friends/${requestId}/reject`);
            notifySuccess("Successfully rejected friend request");
            await fetchFriendRequests();
        } catch (error) {
            notifyError(error.response.data.message);
        }
    }

    const notifySuccess = (message) => {
        toast.success(message);
    }

    const notifyError = (message) => {
        toast.error(message);
    }

    return (
       <div className={"friend-request-menu-container"}>
           <div className={"friend-request-menu-container_header"}>
               <h3>Friend Requests</h3>
               <button className={"close-button"} onClick={onClose}>X</button>
           </div>
           <div className={"friend-request-menu-container_selector"}>
               <span
                onClick={() => setIsFriendRequestSelected(true)}
                className={isFriendRequestSelected ? 'active' : ''}
               >
                   Friend invitations
               </span>
               <span
                   onClick={() => setIsFriendRequestSelected(false)}
                   className={!isFriendRequestSelected ? 'active' : ''}
               >
                   Sent requests</span>
           </div>
           <div className={"friend-request-menu-container_body"}>
               {isFriendRequestSelected ? (
               <div className={"friend-request-menu-container_body_invitations"}>
                   {friendRequests.map((request) => (
                       <div key={request} className={"request-box"}>
                           <div className={"request-box_pic"}>
                               <img src={request.friendImage} alt="Profile Picture"/>
                           </div>
                           <p>{request.friendName}</p>
                           <button onClick={() => handleAcceptFriendRequest(request.id)}>Accept</button>
                           <button onClick={() => handleRejectFriendRequest(request.id)} style={{backgroundColor : "#f33939"}}>Reject</button>
                       </div>
                   ))}
               </div>
                   ) : (
               <div className={"riend-request-menu-container_body_sent-requests"}>
                   {sentRequests.map((request) => (
                       <div key={request} className={"request-box"}>
                           <div className={"request-box_pic"}>
                               <img src={request.friendImage} alt="Profile Picture"/>
                           </div>
                           <p>{request.friendName}</p>
                           <button onClick={() => handleCancelFriendRequest(request.id)} style={{backgroundColor : "#f33939"}}>Cancel</button>
                       </div>
                   ))}
               </div>
               )}
           </div>
           <ToastContainer/>
       </div>
    );
}

export default FriendRequestMenu;