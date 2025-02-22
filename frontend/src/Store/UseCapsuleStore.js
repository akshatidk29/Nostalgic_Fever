import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";

export const UseCapsuleStore = create((set) => ({
    capsules: [],
    publicCapsules: [],
    loading: false,
    error: null,

    // Keep existing uploadFiles and createCapsule functions...

    getUserCapsules: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get("/Capsule/MyCapsules");
            const capsules = response.data.capsules || [];
            set({ capsules, loading: false });
            return capsules;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to fetch capsules",
                loading: false
            });
            return [];
        }
    },

    getPublicCapsules: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get("/Capsule/PublicCapsule");
            const capsules = response.data.capsules || [];
            set({ publicCapsules: capsules, loading: false });
            return capsules;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to fetch public capsules",
                loading: false
            });
            return [];
        }
    },

    likeCapsule: async (capsuleId) => {
        try {
            const response = await axiosInstance.post(`/Capsule/Like/${capsuleId}`);

            // Update both capsules and publicCapsules arrays
            set(state => ({
                capsules: state.capsules.map(capsule =>
                    capsule._id === capsuleId
                        ? { ...capsule, likes: response.data.likes }
                        : capsule
                ),
                publicCapsules: state.publicCapsules.map(capsule =>
                    capsule._id === capsuleId
                        ? { ...capsule, likes: response.data.likes }
                        : capsule
                )
            }));
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addComment: async (capsuleId, commentText) => {
        try {
            const response = await axiosInstance.post(`/Capsule/Comment/${capsuleId}`, {
                content: commentText
            });

            set(state => ({
                capsules: state.capsules.map(capsule =>
                    capsule._id === capsuleId
                        ? { ...capsule, comments: response.data.comments }
                        : capsule
                ),
                publicCapsules: state.publicCapsules.map(capsule =>
                    capsule._id === capsuleId
                        ? { ...capsule, comments: response.data.comments }
                        : capsule
                )
            }));

            return response.data;
        } catch (error) {
            console.error("Error adding comment:", error);
            throw error;
        }
    }

}));