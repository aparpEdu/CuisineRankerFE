import {Link, Outlet, Route} from "react-router-dom";
import React, {useState} from "react";
import Logo from "../logo/Logo";
import NavigationBar from "../nav_bar/NavigationBar";

const Layout = ({ showHeader = true }) => {
    const [currentPage, setCurrentPage] = useState("EXPLORE");

    const setPageToExplore = (page) => {
        setCurrentPage(page);
    };

    const accessToken = localStorage.getItem("access_token");

    return (
        <div className="layout-container">
           <Link to={"/explore"} onClick={() => {setCurrentPage("EXPLORE")}}> <Logo/> </Link>
            {accessToken && <NavigationBar currentPage={currentPage} onChange={setPageToExplore} />}
            <Outlet />
        </div>
    );
};

export default Layout;
