import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 3000,
});

const authInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 3000,
});

authInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("token") || "";

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

export { instance as $http, authInstance as $authHttp };
