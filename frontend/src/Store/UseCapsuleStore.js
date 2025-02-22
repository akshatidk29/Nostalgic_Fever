import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";

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
            formData.append("upload_preset", "Nostalgic_Fever"); // Cloudinary preset
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
                console.error("Cloudinary Upload Error:", error);
            }
        }
        return uploadedUrls;
    },

    // Create a new capsule
    createCapsule: async (capsuleData) => {
        try {
            set({ loading: true, error: null });

            // Upload images and videos separately
            const imageUrls = capsuleData.images.length ? await UseCapsuleStore.getState().uploadFiles(capsuleData.images, "image") : [];
            const videoUrls = capsuleData.videos.length ? await UseCapsuleStore.getState().uploadFiles(capsuleData.videos, "video") : [];

            const payload = {
                title: capsuleData.title,
                content: capsuleData.content,
                isPrivate: capsuleData.isPrivate,
                openDate: capsuleData.openDate,
                images: imageUrls,
                videos: videoUrls,
            };

            const response = await axiosInstance.post("/Capsule/CreateCapsule", payload);
            set((state) => ({ capsules: [response.data.capsule, ...state.capsules], loading: false }));
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to create capsule", loading: false });
            throw error;
        }
    },

    // Get user's private capsules
    getUserCapsules: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get("/Capsule/MyCapsules");
            set({ capsules: response.data.capsules, loading: false });
            return response.data.capsules || []; // ✅ Always return an array
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to fetch capsules", loading: false });
            return []; // ✅ Return an empty array if there's an error
        }
    },

    // Get public capsules
    getPublicCapsules: async () => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get("/Capsule/PublicCapsule");
            set({ publicCapsules: response.data.capsules || [], loading: false });
            return response.data.capsules || []; // ✅ Always return an array
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to fetch public capsules", loading: false });
            return []; // ✅ Return an empty array if there's an error
        }
    },


    // Get a specific capsule by ID
    getCapsuleById: async (capsuleId) => {
        try {
            set({ loading: true, error: null });
            const response = await axiosInstance.get(`/Capsule/${capsuleId}`);
            set({ loading: false });
            return response.data.capsule;
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to fetch capsule", loading: false });
            throw error;
        }
    },
}));
