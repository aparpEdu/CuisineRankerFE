import React from "react";
import { Link, useRouteError } from "react-router-dom";
import "./Error.css";
import ChefSvg from "../../assets/chef.svg";

const Error = () => {
    const error = useRouteError();

    return (
        <div className="error-container">
            <img src={ChefSvg} alt="Chef illustration" className="chef-svg" />
            <h1>Oops! Something went wrong!</h1>
            <h2><i>{error.statusText || error.message}</i></h2>
            <Link to="/">
                <button className="go-home-button">Return</button>
            </Link>
        </div>
    );
};

export default Error;
