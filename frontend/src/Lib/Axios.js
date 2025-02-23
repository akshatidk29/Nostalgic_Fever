import axios from "axios";

const isLocal = window.location.hostname === "localhost";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/Api" : "/Api",
    withCredentials: true,
});
