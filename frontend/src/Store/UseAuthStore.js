import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";
import { io } from "socket.io-client";
import { UseChatStore } from "./UseChatStore";

// ✅ Dynamically Set WebSocket URL Based on Current Host
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

    // ✅ Persistent Login
    CheckAuth: async () => {
        set({ isCheckingAuth: true });

        try {
            console.log("Checking Auth...");
            const res = await axiosInstance.get("/Auth/Check");

            if (res.data) {
                console.log("User Authenticated:", res.data);
                get().connectSocket();
                set({ authUser: res.data });
            } else {
                console.log("No User Found");
                set({ authUser: null });
            }
        } catch (error) {
            console.error("Error in CheckAuth:", error.response?.status);
            if (error.response?.status === 401) {
                console.log("Unauthorized User - Logging Out");
                set({ authUser: null });
            }
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // ✅ Signup Function
    Signup: async (fullname, email, password) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/Auth/Signup", { fullname, email, password });
            if (res.data) {
                set({ authUser: res.data });
                get().connectSocket();
            }
        } catch (error) {
            console.error("Error in Signup:", error.response?.data?.message || error.message);
            set({ authUser: null });
        } finally {
            set({ isSigningUp: false });
        }
    },

    // ✅ Login Function
    Login: async (email, password) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/Auth/Login", { email, password });
            if (res.data) {
                set({ authUser: res.data });
                get().connectSocket();
            }
        } catch (error) {
            console.error("Error in Login:", error.response?.data?.message || error.message);
            set({ authUser: null });
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // ✅ Logout Function
    Logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axiosInstance.post("/Auth/Logout");
            set({ authUser: null });
            get().disconnectSocket();
        } catch (error) {
            console.error("Error in Logout:", error.response?.data?.message || error.message);
        } finally {
            set({ isLoggingOut: false });
        }
    },

    // ✅ Profile Update
    UpdateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/User/UploadPic", data);
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in Update Profile", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    // ✅ Connect WebSocket for Both Local & LAN
    connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser) return;
        if (socket?.connected) return;

        console.log("🟢 Connecting to WebSocket at:", socketBaseURL);
        const newSocket = io(socketBaseURL, {
            transports: ["websocket"],
            query: { userId: authUser._id }
        });

        newSocket.on("connect", () => {
            console.log("🔵 Client Connected to Socket Server:", newSocket.id);
            UseChatStore.getState().subscribeToMessages(); // ✅ Ensure messages are received
        });

        newSocket.on("disconnect", () => console.log("❌ Client Disconnected"));
        newSocket.on("connect_error", (error) => console.error("⚠️ Connection Error:", error));

        newSocket.on("getOnlineUsers", (userIds) => {
            console.log("🟢 Online Users Received:", userIds);
            set({ onlineUsers: userIds });
        });

        set({ socket: newSocket });
    },

    // ✅ Disconnect WebSocket
    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            socket.disconnect();
            console.log("❌ Socket Disconnected");
            set({ socket: null });
        }
    },
}));
