import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";
import { io } from "socket.io-client";
import { UseChatStore } from "./UseChatStore";

const isLocal = window.location.hostname === "localhost";
const socketBaseURL = isLocal ? "http://localhost:5001" : "http://192.168.53.158:5001";

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
            }
        } catch {
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
            }
        } catch {
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
        } catch {} finally {
            set({ isLoggingOut: false });
        }
    },

    UpdateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/User/UploadPic", data);
            set({ authUser: res.data });
        } catch {} finally {
            set({ isUpdatingProfile: false });
        }
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