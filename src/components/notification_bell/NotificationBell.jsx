import React, {useEffect, useState} from "react";
import './NotificationBell.css'
import Bell from '../../assets/nottif-bell.svg'
import api from  '../../services/api'
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const NotificationBell = () => {
    const [show, setShow] = useState(false);
    const [counter, setCounter] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/websocket');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
        });

        fetchUser();

        document.addEventListener("keydown", handleKeyDown);
        fetchNotifications();

        stompClient.onConnect = (frame) => {
            stompClient.subscribe('/user/' + email + '/topic/notifications', (message) => {
                fetchNotifications();
            });
        };

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

    const mapNotifications = ({notifications}) => {

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
                            <p className={"notification-container__title__close"}>X</p>
                        </div>
                        <div className={"notification-container__message"}>
                            <p>{notification.message}</p>
                        </div>
                    </div>
                    ))}
                    {/*<div className={"notification-container"}>*/}
                    {/*    <div className={"notification-container__title"}>*/}
                    {/*        <p>Title</p>*/}
                    {/*        <p className={"notification-container__title__close"}>X</p>*/}
                    {/*    </div>*/}
                    {/*    <div className={"notification-container__message"}>*/}
                    {/*        <p>Message</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </dialog>
            </div>
        </div>
    );
}

export default NotificationBell