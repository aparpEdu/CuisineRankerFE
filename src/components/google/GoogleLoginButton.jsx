import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const GoogleLoginButton = ({onSuccess, onFailure}) => {
    return (
      <GoogleOAuthProvider clientId={"678012927517-d9qbbllemir1dqg3g426a4lu9ghf0dm6.apps.googleusercontent.com"}>
          <GoogleLogin
              onSuccess={onSuccess}
              onFailure={onFailure}
              />
      </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;