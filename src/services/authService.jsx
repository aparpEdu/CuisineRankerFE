import axios from "axios";


export const handleGoogleLoginSuccess = async (credentials) => {
    const token = credentials.credential;

    try {
        const response = await axios.post("http://localhost:443/api/v1/oauth2/code/google", {
            value : token
        })

        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("refresh_token", response.data.refreshToken);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const handleGoogleLoginFailure =  (error) => {
    console.error(error);
    window.location.href = "/explore";
};