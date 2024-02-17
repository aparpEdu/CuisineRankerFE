import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../header/Header";
import Logo from "../logo/Logo";

const Layout = ({ showHeader = true }) => {
    return (
        <div className="layout-container">
            {/*{showHeader && <Header />}*/}
            <Logo />
            <Outlet />
        </div>
    );
};

export default Layout;
