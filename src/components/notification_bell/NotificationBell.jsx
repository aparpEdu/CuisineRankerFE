import React, {useEffect, useState} from "react";
import './NotificationBell.css'
import Bell from '../../assets/nottif-bell.svg'
import api from  '../../services/api'
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import error from "../../pages/error/Error";

const NotificationBell = () => {
    const [show, setShow] = useState(false);
    const [counter, setCounter] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [email, setEmail] = useState("");


    useEffect(() => {
        fetchUser();
        fetchNotifications();

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [show]);

    useEffect(() => {
        if (!email) return;

        const socket = new SockJS('http://localhost:443/websocket');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => console.log(str),
        });

        stompClient.onConnect = () => {
            console.log(`Connected to server for email: ${email}`);
            stompClient.subscribe(`/user/${email}/topic/notifications`, (message) => {
                console.log('Notification received:', message.body);
                fetchNotifications();
            });
        };
        console.log()

        stompClient.activate();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, [email]);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setShow(false);
        }
    }

    const fetchNotifications = async () => {
        try {
            const response = await api.get("notifications");
            setNotifications(response.data.notifications);
            setCounter(response.data.totalElements);
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    }

    const fetchUser = async  () => {
        try {
            const response = await api.get("users");
            setEmail(response.data.email);
        } catch (error) {
            console.error("Error fetching user", error);
        }
    }

    const dismissNotification = async (notification) => {
        try {
            const confirmDismiss = window.confirm("Are you sure?");
            if (confirmDismiss) {
               await api.delete("notifications/" + notification.id);
            }

        } catch (e) {
            console.error("Error dismissing notification", error);
        }
    }

    const getHighestTimeMetric = (notification) => {
        if (notification.yearsSince) return `${notification.yearsSince} years ago`;
        if (notification.monthsSince) return `${notification.monthsSince} months ago`;
        if (notification.weeksSince) return `${notification.weeksSince} weeks ago`;
        if (notification.daysSince) return `${notification.daysSince} days ago`;
        if (notification.hoursSince) return `${notification.hoursSince} hours ago`;
        if (notification.minutesSince) return `${notification.minutesSince} minutes ago`;
        return "Just now";
    }

    return (
        <div className={"bell-container"}>
            <img src={Bell} alt="Notification Bell" onClick={() => setShow(!show)} />
            <div className={"bell-container__counter__container"}>
            <div className={"bell-container__counter"}>
                <p>{counter}</p>
            </div>
            </div>
            <div className={"bell-container__menu__box"}>
                <dialog open={show}>
                    {notifications.map((notification) => (
                    <div className={"notification-container"}>
                        <div className={"notification-container__title"}>
                            <p>{notification.title}</p>
                            <p className={"notification-container__title__close"} onClick={()  => dismissNotification(notification)}>X</p>
                        </div>
                        <div className={"notification-container__message"}>
                            <p>{notification.message}</p>
                            <p className={"notification-container__time"}>{getHighestTimeMetric(notification)}</p>
                        </div>
                    </div>
                    ))}
                </dialog>
            </div>
        </div>
    );
}

export default NotificationBell