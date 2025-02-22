import { create } from "zustand";
import toast from "react-hot-toast";
import { UseAuthStore } from "./UseAuthStore";
import { axiosInstance } from "../Lib/Axios.js";

// Zustand store to manage chat-related state
export const UseChatStore = create((set, get) => ({
    messages: [], // Stores chat messages
    users: [], // Stores the list of available users for chat
    selectedUser: null, // Currently selected chat user
    isUsersLoading: false, // Loading state for fetching users
    isMessagesLoading: false, // Loading state for fetching messages

    // Fetch users who can be messaged
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/Message/User");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    // Fetch messages for the selected user
    getMessages: async (userId) => {
        if (!userId) return;
        set({ isMessagesLoading: true });

        try {
            const res = await axiosInstance.get(`/Message/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    // Send a message to the selected user
    sendMessage: async (text) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) return;

        try {
            const res = await axiosInstance.post(`/Message/Send/${selectedUser._id}`, text);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    // Subscribe to real-time message updates via socket
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = UseAuthStore.getState().socket;
        socket.on("newMessage", (newMessage) => {
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    // Unsubscribe from real-time messages
    unsubscribeFromMessages: () => {
        const socket = UseAuthStore.getState().socket;
        socket.off("newMessage");
    },

    // Set the currently selected user for messaging
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
