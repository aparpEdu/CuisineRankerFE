import {Outlet, Route} from "react-router-dom";
import React from "react";
import Logo from "../logo/Logo";
import NavigationBar from "../nav_bar/NavigationBar";
import RouteGuard from "../../guards/RouteGuard";

const Layout = ({ showHeader = true }) => {
    return (
        <div className="layout-container">
            <Logo />
            <RouteGuard><NavigationBar /></RouteGuard>
            <Outlet />
        </div>
    );
};

export default Layout;
