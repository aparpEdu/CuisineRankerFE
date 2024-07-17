import React, {useState} from "react";
import './NotificationBell.css'
import Bell from '../../assets/nottif-bell.svg'

const NotificationBell = () => {
    const [show, setShow] = useState(false);
    const [counter, setCounter] = useState(0);

    return (
        <div className={"bell-container"}>
            <img src={Bell} alt="Notification Bell"/>
            <div className={"bell-container__counter__container"}>
            <div className={"bell-container__counter"}>
                <p>{counter}</p>
            </div>
            </div>
        </div>
    );
}

export default NotificationBell