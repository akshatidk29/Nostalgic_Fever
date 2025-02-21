import { useEffect, useState } from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Camera, Pencil, Lock, Archive } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const { authUser, UpdateProfile, CheckAuth } = UseAuthStore();
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch latest user data when the profile page is opened
    useEffect(() => {
        CheckAuth(); 
    }, [CheckAuth]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImage(base64Image);

            // Update Profile
            await UpdateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-indigo-900 p-6">
            <div className="relative w-full max-w-lg p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 text-center transition-all duration-300 hover:scale-105">

                {/* Profile Image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <img
                        src={selectedImage || authUser?.profilePic || "./images.png"}
                        alt="Profile"
                        className="w-full h-full rounded-full border-4 border-indigo-400 object-cover hover:opacity-90 transition"
                    />
                    <label htmlFor="profilePicInput" className="absolute bottom-2 right-2 bg-indigo-600 p-2 rounded-full shadow-md hover:scale-110 transition-all cursor-pointer">
                        <Camera className="w-6 h-6 text-white" />
                        <input
                            id="profilePicInput"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                {/* User Info */}
                <h1 className="text-3xl font-bold text-indigo-300">{authUser?.fullname}</h1>
                <p className="text-gray-300 text-sm mt-1">📧 {authUser?.email}</p>
                <p className="text-sm text-gray-400 mt-2">📅 Member since: {new Date(authUser?.createdAt).toLocaleDateString()}</p>

                {/* Profile Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link 
                        to="/timeline" 
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-all shadow-md"
                    >
                        <Archive className="w-5 h-5 mr-2" /> View Capsules
                    </Link>
                    <Link 
                        to="/edit-profile" 
                        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all shadow-md"
                    >
                        <Pencil className="w-5 h-5 mr-2" /> Edit Profile
                    </Link>
                    <Link 
                        to="/change-password" 
                        className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-all shadow-md col-span-2"
                    >
                        <Lock className="w-5 h-5 mr-2" /> Change Password
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
