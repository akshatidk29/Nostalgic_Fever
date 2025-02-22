import { create } from "zustand";
import { axiosInstance } from "../Lib/Axios.js";

export const UseAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: false,
    isUpdatingProfile: false,
    onlineUsers:[],

    // ✅ Persistent Login
    CheckAuth: async () => {
        set((state) => ({ ...state, isCheckingAuth: true }));

        try {
            console.log("Checking Auth...");
            const res = await axiosInstance.get("/Auth/Check");

            if (res.data) {
                console.log("User Authenticated:", res.data);

                // ❌ Prevent Unnecessary State Updates
                set((state) => {
                    if (!state.authUser) {
                        return { ...state, authUser: res.data };
                    }
                    return state; // No change = No extra re-render
                });
            } else {
                console.log("No User Found");
                set((state) => ({ ...state, authUser: null }));
            }
        } catch (error) {
            console.error("Error in CheckAuth:", error.response?.status);

            if (error.response?.status === 401) {
                console.log("Unauthorized User - Logging Out");
                set((state) => {
                    if (state.authUser) {
                        return { ...state, authUser: null };
                    }
                    return state;
                });
            }
        } finally {
            set((state) => ({ ...state, isCheckingAuth: false }));
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
