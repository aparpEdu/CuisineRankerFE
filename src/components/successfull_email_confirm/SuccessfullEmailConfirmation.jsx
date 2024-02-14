import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessfullEmailConfirmation.css';

const SuccessfulEmailConfirmation = () => {

    return (
        <div className="container">
            <h2>Successful Email Confirmation</h2>
            <p>Your email has been successfully confirmed.</p>
            <Link to="/">Return to Home</Link>
        </div>
    );
};

export default SuccessfulEmailConfirmation;