import { Outlet } from "react-router-dom";
import React from "react";
import Header from "../header/Header";

const Layout = () => {
    return (
        <div className="layout-container">
            {/*<Background />*/}
            <Header />
            {/*<NavBar/>*/}

            <Outlet />
        </div>

    );
};

export default Layout;
