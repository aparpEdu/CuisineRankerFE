import React from 'react';
import './Dashboard.css';
import cookies from '../../assets/cookies.png'
import {Link} from "react-router-dom";
const Dashboard = () => {
    return (
        <div className="dashboard">
            <Link to={"/recipes"}>
            <div className="action-item">

                <img src={cookies} alt="Action 1" />
                <span className="action-text">My Recipes</span>
            </div>
            </Link>
            <div className="action-item">
                <img src={cookies} alt="Action 2" />
                <span className="action-text">W.I.P</span>
            </div>
            <div className="action-item">
                <img src={cookies} alt="Action 3" />
                <span className="action-text">W.I.P</span>
            </div>
            <div className="action-item">
                <img src={cookies} alt="Action 3" />
                <span className="action-text">W.I.P</span>
            </div>






        </div>
    );
};

export default Dashboard;