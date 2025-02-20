import axios from "axios"

const isLocal = window.location.hostname === "localhost";

export const axiosInstance = axios.create({
    baseURL: isLocal
        ? "http://localhost:5001/Api"
        : "http://192.168.211.158:5001/Api",  // Replace with your actual LAN IP
    withCredentials: true,
});
