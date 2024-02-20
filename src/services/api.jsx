import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:443/api/v1',
});


api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axios.post('http://localhost:443/api/v1/auth/refresh-token', {
                    refreshToken: refreshToken,
                });


                localStorage.setItem('access_token', response.data.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem("user_data");

                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
