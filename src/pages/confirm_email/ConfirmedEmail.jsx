import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Success from '../../components/successfull_email_confirm/SuccessfullEmailConfirmation';

const ConfirmedEmail = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get('value');
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                if (value) {
                    await axios.patch(`http://localhost:443/api/v1/auth/confirm-email?value=${value}`);
                    setIsConfirmed(true);
                } else {
                    console.error('Value is undefined.');
                }

            } catch (error) {
                console.error('Error confirming email:', error);
            }
        };

        confirmEmail();
    }, [value]);
    return (
        <div>
            {isConfirmed && <Success />}
        </div>
    );
};

export default ConfirmedEmail;
