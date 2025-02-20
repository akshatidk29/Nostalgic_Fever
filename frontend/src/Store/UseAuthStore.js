import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";

export const UseAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,


    // ✅ Persistent Login
    CheckAuth: async () => {
        set({ isCheckingAuth: true }); // Ensure loading state
        try {
            const res = await axiosInstance.get("/Auth/Check");
            if (res.data) {
                set({ authUser: res.data });
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            console.error("Error in CheckAuth:", error.response?.data?.message || error.message);
            set({ authUser: null });
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
        } catch (error) {
            console.error("Error in Logout:", error.response?.data?.message || error.message);
        } finally {
            set({ isLoggingOut: false });
        }
    },

    UpdateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/User/UploadPic", data)
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in Update Profile", error);
        }
    }
}));
