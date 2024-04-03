import React, {useState} from 'react';
import "../nav_bar/NavigationBar.css"
import Star from "../../assets/star.svg"
import {Link} from "react-router-dom";

const SettingsNavBar = ({ setOpenedTab }) => {
    const [currentPage, setCurrentPage] = useState("General");

    const handlePageClick = (page) => {
        setCurrentPage(page);
        setOpenedTab(page);
    };

    return (
        <>
            <nav className={`sidebar-settings`}>
                <ul className="nav-items-settings">
                    <li
                        className={`nav-item ${currentPage === "General" ? "active" : ""}`}
                    >
                        <Link to={"/settings"} onClick={() => handlePageClick("General")}>
                            General
                        </Link>
                        {currentPage === "General" && (
                            <span className="arrow">
                <img src={Star} alt={"star"} />{" "}
              </span>
                        )}
                    </li>
                    <li
                        className={`nav-item ${
                            currentPage === "Password" ? "active" : ""
                        }`}
                        onClick={() => handlePageClick("Password")}
                    >
                        <Link to={"#"}>Password</Link>
                        {currentPage === "Password" && (
                            <span className="arrow">
                <img src={Star} alt={"star"} />
              </span>
                        )}
                    </li>
                    <li className={`nav-item ${currentPage === "Email" ? "active" : ""}`}>
                        <Link to={"#"} onClick={() => handlePageClick("Email")}>
                            Email
                        </Link>
                        {currentPage === "Email" && (
                            <span className="arrow">
                <img src={Star} alt={"star"} />
              </span>
                        )}
                    </li>
                    <li className={`nav-item ${currentPage === "Advanced" ? "active" : ""}`}>
                        <Link to={"#"} onClick={() => handlePageClick("Advanced")}>
                            Advanced
                        </Link>
                        {currentPage === "Advanced" && (
                            <span className="arrow">
                <img src={Star} alt={"star"} />
              </span>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default SettingsNavBar;