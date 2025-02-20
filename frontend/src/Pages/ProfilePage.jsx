import { useEffect, useState } from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Camera } from "lucide-react";

const ProfilePage = () => {
    const { authUser, UpdateProfile } = UseAuthStore();
    const [selectedImage, setSelectedImage] = useState(null);

    // Reload once when the profile page is opened for the first time
    useEffect(() => {
        const hasReloaded = sessionStorage.getItem("profileReloaded");
        if (!hasReloaded) {
            sessionStorage.setItem("profileReloaded", "true");
            window.location.reload();
        }
    }, []);

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

            // Reload page after update
            setTimeout(() => {
                window.location.reload();
            }, 500); // Wait 1/2 second before reloading for a smooth transition
        };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 p-6">
            <div className="relative w-full max-w-md p-6 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 text-center transition-all duration-300 hover:scale-105">

                {/* Profile Image */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                    <img
                        src={selectedImage || authUser.profilePic || "./images.png"}
                        alt="Profile"
                        className="w-full h-full rounded-full border-4 border-white object-cover hover:opacity-90 transition"
                    />
                    <label htmlFor="profilePicInput" className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-all cursor-pointer">
                        <Camera className="w-6 h-6 text-gray-600" />
                        <input
                            id="profilePicInput"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                {/* User Details */}
                <h1 className="text-3xl font-extrabold text-white">{authUser.fullname}</h1>
                <p className="text-gray-200 text-sm mt-1">📧 {authUser.email}</p>

                {/* Member Since */}
                <p className="text-sm text-gray-300 mt-2">
                    📅 Member since: {new Date(authUser.createdAt).toLocaleDateString()}
                </p>

            </div>
        </div>
    );
};

export default ProfilePage;
