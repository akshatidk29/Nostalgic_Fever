import axios from "axios";

const isLocal = window.location.hostname === "localhost";

export const axiosInstance = axios.create({
    baseURL: isLocal
        ? "http://localhost:5001/Api"
        : "http://192.168.143.158:5001/Api",
    withCredentials: true,
});
