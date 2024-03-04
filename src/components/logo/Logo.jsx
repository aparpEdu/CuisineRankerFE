import React from "react";
import logo from "../../assets/logo.svg"

const Logo = () => {
    return (
        <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
        </div>
    );
};

export default Logo;