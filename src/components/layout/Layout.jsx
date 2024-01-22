import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../header/Header";

const Layout = ({ showHeader = true }) => {
    return (
        <div className="layout-container">
            {/*{showHeader && <Header />}*/}
            <Outlet />
        </div>
    );
};

export default Layout;
