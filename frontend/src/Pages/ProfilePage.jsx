import { useEffect, useState } from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Camera, Pencil, Lock, Archive } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedScene from "../Components/AnimatedScene";

const ProfilePage = () => {
    const { authUser, UpdateProfile, CheckAuth } = UseAuthStore();
    const [selectedImage, setSelectedImage] = useState(null);

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
            await UpdateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-12">
            {/* ✅ Animated Background */}
            <div className="absolute inset-0 -z-10">
                <AnimatedScene />
            </div>

            {/* ✅ Left Side: Big Heading */}
            <div className="flex-1 text-left">
                <h1 className="text-9xl font-bold text-blue-900 leading-tight">
                    Your <br /> Profile.
                </h1>
            </div>

            {/* ✅ Right Side: Profile Card */}
            <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-lg p-8 bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 text-center transition-all duration-300 hover:scale-105">

                    {/* ✅ Profile Image Section */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <img
                            src={selectedImage || authUser?.profilePic || "./Profile.png"}
                            alt="Profile"
                            className="w-full h-full rounded-full border-2 border-white object-cover hover:opacity-90 transition"
                        />
                        {/* ✅ Image Upload Button */}
                        <label htmlFor="profilePicInput" className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full shadow-md hover:scale-110 transition-all cursor-pointer">
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

                    {/* ✅ User Information */}
                    <h1 className="text-3xl font-bold text-blue-900">{authUser?.fullname}</h1>
                    <p className="text-blue-700 text-sm mt-1">{authUser?.email}</p>
                    <p className="text-sm text-gray-700 mt-2">Member since: {new Date(authUser?.createdAt).toLocaleDateString()}</p>

                    {/* ✅ Profile Actions */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            to="/Timeline"
                            className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-blue-900 py-3 rounded-lg font-medium transition-all shadow-xs hover:shadow-md"
                        >
                            <Archive className="w-5 h-5 mr-2" /> View Capsules
                        </Link>
                        <Link
                            to="/EditProfile"
                            className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-blue-900 py-3 rounded-lg font-medium transition-all shadow-xs hover:shadow-md"
                        >
                            <Pencil className="w-5 h-5 mr-2" /> Edit Profile
                        </Link>
                        <Link
                            to="/ChangePass"
                            className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-blue-900 py-3 rounded-lg font-medium transition-all shadow-xs hover:shadow-md col-span-2"
                        >
                            <Lock className="w-5 h-5 mr-2" /> Change Password
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
