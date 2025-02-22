import React from "react";
import { UseChatStore } from "../Store/UseChatStore";
import { UseAuthStore } from "../Store/UseAuthStore";

const ChatSidebar = () => {
    const { users, isUsersLoading, setSelectedUser, selectedUser } = UseChatStore();
    const { onlineUsers } = UseAuthStore();

    return (
        <div className="w-1/4 border-r border-gray-700 p-4 overflow-y-auto bg-gray-900">
            <h2 className="text-lg font-bold text-white mb-4">Users</h2>
            {isUsersLoading ? (
                <p className="text-gray-400">Loading users...</p>
            ) : (
                <ul>
                    {users.map((user) => {
                        const isOnline = onlineUsers.includes(user._id); // Check if user is online
                        return (
                            <li
                                key={user._id}
                                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selectedUser?._id === user._id ? "bg-indigo-600" : "hover:bg-gray-800"
                                    }`}
                                onClick={() => setSelectedUser(user)}
                            >
                                {/* Profile Image with Green Dot for Online Users */}
                                <div className="relative">
                                    <img
                                        src={user.profilePic || "images.png"} // Use Cloudinary image or placeholder
                                        alt={user.fullname}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400"
                                    />
                                    {isOnline && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                                    )}
                                </div>
                                {/* User Name */}
                                <span className="text-white">{user.fullname}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ChatSidebar;
