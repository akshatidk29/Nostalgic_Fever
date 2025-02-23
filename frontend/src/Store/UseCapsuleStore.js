import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";
import { toast } from "react-hot-toast";

export const UseCapsuleStore = create((set) => ({
    capsules: [],
    publicCapsules: [],
    loading: false,
    error: null,

    uploadFiles: async (files, resourceType = "image") => {
        const uploadedUrls = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "Nostalgic_Fever");
            formData.append("folder", "capsules");
            formData.append("resource_type", resourceType);
            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dexlyroio/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`Upload failed: ${response.statusText}`);
                }
                const data = await response.json();
                uploadedUrls.push(data.secure_url);
            } catch (error) {
                toast.error("Failed to upload file. Try again!");
                console.error("Cloudinary Upload Error:", error);
            }
        }
        return uploadedUrls;
    },

    createCapsule: async (capsuleData) => {
        try {
            set({ loading: true, error: null });
            toast.loading("Creating capsule...");

            const imageUrls = capsuleData.images.length
                ? await UseCapsuleStore.getState().uploadFiles(capsuleData.images, "image")
                : [];
            const videoUrls = capsuleData.videos.length
                ? await UseCapsuleStore.getState().uploadFiles(capsuleData.videos, "video")
                : [];

            const payload = {
                title: capsuleData.title,
                content: capsuleData.content,
                isPrivate: capsuleData.isPrivate,
                openDate: capsuleData.openDate,
                images: imageUrls,
                videos: videoUrls,
            };

            const response = await axiosInstance.post("/Capsule/CreateCapsule", payload);
            set((state) => ({
                capsules: [response.data.capsule, ...state.capsules],
                loading: false
            }));
            toast.success("Capsule created successfully!");
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to create capsule", loading: false });
            toast.error("Failed to create Capsule. Try Again!");
            throw error;
        }
    },

    getUserCapsules: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get("/Capsule/MyCapsules");
            set({ capsules: response.data.capsules || [], loading: false });
            return response.data.capsules;
        } catch (error) {
            set({ error: "Failed to fetch capsules", loading: false });
            return [];
        }
    },

    getPublicCapsules: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get("/Capsule/PublicCapsule");
            set({ publicCapsules: response.data.capsules || [], loading: false });
            return response.data.capsules;
        } catch (error) {
            set({ error: "Failed to fetch public capsules", loading: false });
            toast.error("Failed to load Capsules.");
            return [];
        }
    },

    likeCapsule: async (capsuleId) => {
        try {
            const response = await axiosInstance.post(`/Capsule/Like/${capsuleId}`);
            set(state => ({
                capsules: state.capsules.map(capsule =>
                    capsule._id === capsuleId ? { ...capsule, likes: response.data.likes } : capsule
                ),
                publicCapsules: state.publicCapsules.map(capsule =>
                    capsule._id === capsuleId ? { ...capsule, likes: response.data.likes } : capsule
                )
            }));
            toast.success("Capsule liked!");
            return response.data;
        } catch (error) {
            toast.error("Failed to like.");
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
                    capsule._id === capsuleId ? { ...capsule, comments: response.data.comments } : capsule
                ),
                publicCapsules: state.publicCapsules.map(capsule =>
                    capsule._id === capsuleId ? { ...capsule, comments: response.data.comments } : capsule
                )
            }));
            toast.success("Comment added!");
            return response.data;
        } catch (error) {
            toast.error("Failed to add comment.");
            console.error("Error adding comment:", error);
            throw error;
        }
    }
}));
