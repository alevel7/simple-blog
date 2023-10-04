import axios from "axios";

const BASE_URL = 'https://data-share-8a9408323960.herokuapp.com'
const api = axios.create({
    baseURL: BASE_URL
})

export default api;


api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    const path = window.location.pathname;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config
    }

    if (path.includes('/dashboard')) {
        window.location.href = '/';
    }
    return config;
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const path = window.location.pathname

    if (error.response.status > 400 && error.response.status < 404) {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
        window.location.href = "/"
    }
    return Promise.reject(error);
});