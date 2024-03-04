import {Link, Outlet, Route} from "react-router-dom";
import React, {useState} from "react";
import Logo from "../logo/Logo";
import NavigationBar from "../nav_bar/NavigationBar";
import RouteGuard from "../../guards/RouteGuard";

const Layout = ({ showHeader = true }) => {
    const [currentPage, setCurrentPage] = useState("EXPLORE");

    const setPageToExplore = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className="layout-container">
           <Link to={"/explore"} onClick={() => {setCurrentPage("EXPLORE")}}> <Logo/> </Link>

            <RouteGuard>
                <NavigationBar currentPage={currentPage} onChange={setPageToExplore}/>
            </RouteGuard>
            <Outlet />
        </div>
    );
};

export default Layout;
