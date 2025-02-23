import React from "react";
import { UseChatStore } from "../Store/UseChatStore";
import { UseAuthStore } from "../Store/UseAuthStore";

const ChatSidebar = () => {
    const { users, isUsersLoading, setSelectedUser, selectedUser } = UseChatStore();
    const { onlineUsers } = UseAuthStore();

    return (
        <div className="w-2/5 m-4 mr-2 mt-0 border border-blue-900 rounded-xl p-4 overflow-y-auto h-85/100 bg-white">
            <h2 className="text-2xl ml-4 semibold text-gray-900 mb-4">Users</h2>

            {isUsersLoading ? (
                <p className="text-gray-500">Loading users...</p>
            ) : (
                <ul>
                    {users.map((user) => {
                        const isOnline = onlineUsers.includes(user._id); // ✅ Check if user is online
                        return (
                            <li
                                key={user._id}
                                className={`flex items-center space-x-3 p-2 rounded-xl cursor-pointer transition ${selectedUser?._id === user._id ? "border border-blue-900" : "border border-gray-800"
                                    }`}
                                onClick={() => setSelectedUser(user)}
                            >
                                {/* ✅ Profile Image with Green Dot for Online Users */}
                                <div className="relative">
                                    <img
                                        src={user.profilePic || "Profile.png"} // ✅ Use Cloudinary image or placeholder
                                        alt={user.fullname}
                                        className="w-12 h-12 rounded-full object-cover border border-black"
                                    />
                                    {isOnline && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>

                                {/* ✅ Display User Name */}
                                <span className="text-xl text-gray-900">{user.fullname}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ChatSidebar;
