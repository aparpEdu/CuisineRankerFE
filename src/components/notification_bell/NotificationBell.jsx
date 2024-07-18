import React, {useEffect, useState} from "react";
import './NotificationBell.css'
import Bell from '../../assets/nottif-bell.svg'

const NotificationBell = () => {
    const [show, setShow] = useState(false);
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setShow(false);
        }
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
                    <div className={"notification-container"}>
                        <div className={"notification-container__title"}>
                            <p>Title</p>
                            <p className={"notification-container__title__close"}>X</p>
                        </div>
                        <div className={"notification-container__message"}>
                            <p>Message</p>
                        </div>
                    </div>
                    <div className={"notification-container"}>
                        <div className={"notification-container__title"}>
                            <p>Title</p>
                            <p className={"notification-container__title__close"}>X</p>
                        </div>
                        <div className={"notification-container__message"}>
                            <p>Message</p>
                        </div>
                    </div>
                    <div className={"notification-container"}>
                        <div className={"notification-container__title"}>
                            <p>Title</p>
                            <p className={"notification-container__title__close"}>X</p>
                        </div>
                        <div className={"notification-container__message"}>
                            <p>Message</p>
                        </div>
                    </div>
                    <div className={"notification-container"}>
                        <div className={"notification-container__title"}>
                            <p>Title</p>
                            <p className={"notification-container__title__close"}>X</p>
                        </div>
                        <div className={"notification-container__message"}>
                            <p>Message</p>
                        </div>
                    </div>
                    <div className={"notification-container"}>
                        <div className={"notification-container__title"}>
                            <p>Title</p>
                            <p className={"notification-container__title__close"}>X</p>
                        </div>
                        <div className={"notification-container__message"}>
                            <p>Message</p>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
}

export default NotificationBell