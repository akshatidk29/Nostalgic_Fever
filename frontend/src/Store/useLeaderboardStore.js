import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../Lib/Axios.js";

// ✅ Create Leaderboard Store using Zustand
const useLeaderboardStore = create((set) => ({
    leaderboard: [],
    loading: true,
    error: null,
    fetchLeaderboard: async () => {
        try {
            const response = await axiosInstance.get("/Game/Leaderboard");
            set({ leaderboard: response.data.leaderboard, loading: false, error: null });
        } catch (err) {
            set({ error: err.response?.data?.message || "Failed to load leaderboard", loading: false });
            toast.error("Failed to load leaderboard.");
        }
    }
}));

export default useLeaderboardStore;