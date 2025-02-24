import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";
import { io } from "socket.io-client";
import { UseChatStore } from "./UseChatStore";
import { toast } from "react-hot-toast";

const socketBaseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const UseAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    CheckAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/Auth/Check");
            if (res.data) {
                get().connectSocket();
                set({ authUser: res.data });
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            if (error.response?.status === 401) {
                set({ authUser: null });
            }
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    Signup: async (fullname, email, password) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/Auth/Signup", { fullname, email, password });
            if (res.data) {
                set({ authUser: res.data });
                get().connectSocket();
                toast.success("Signup successful! Welcome to Nostalgic Fever.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Try again!");
            set({ authUser: null });
        } finally {
            set({ isSigningUp: false });
        }
    },

    Login: async (email, password) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/Auth/Login", { email, password });
            if (res.data) {
                set({ authUser: res.data });
                get().connectSocket();
                toast.success("Login successful! Welcome back.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials. Try again!");
            set({ authUser: null });
        } finally {
            set({ isLoggingIn: false });
        }
    },

    Logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axiosInstance.post("/Auth/Logout");
            set({ authUser: null });
            get().disconnectSocket();
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error("Logout failed. Try again!");
        } finally {
            set({ isLoggingOut: false });
        }
    },

    UpdateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/User/UploadPic", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile. Try again!");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    getUserById: async (userId) => {
        const response = await axiosInstance.get(`/User/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        return await response.json();
    },


    connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;

        const newSocket = io(socketBaseURL, {
            transports: ["websocket"],
            query: { userId: authUser._id },
        });

        newSocket.on("connect", () => {
            UseChatStore.getState().subscribeToMessages();
        });

        newSocket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });

        set({ socket: newSocket });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            socket.disconnect();
            set({ socket: null });
        }
    },
}));
