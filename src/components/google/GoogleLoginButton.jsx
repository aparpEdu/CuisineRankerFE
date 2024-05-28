import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const GoogleLoginButton = ({onSuccess, onFailure}) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    return (
      <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
              theme={"filled_black"}
              size={"large"}
              text={"continue_with"}
              shape={"circle"}
              onSuccess={onSuccess}
              onFailure={onFailure}
              />
      </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;