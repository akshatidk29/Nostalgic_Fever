import React from "react";
import { UseChatStore } from "../Store/UseChatStore";

const ChatSidebar = () => {
    const { users, isUsersLoading, setSelectedUser, selectedUser } = UseChatStore();

    return (
        <div className="w-1/4 border-r border-gray-700 p-4 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Users</h2>
            {isUsersLoading ? (
                <p>Loading users...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selectedUser?._id === user._id ? "bg-indigo-600" : "hover:bg-gray-800"
                                }`}
                            onClick={() => setSelectedUser(user)}
                        >
                            {/* User Profile Image */}
                            <img
                                src={user.profilePic || "images.png"} // Use Cloudinary image or placeholder
                                alt={user.fullname}
                                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400"
                            />
                            {/* User Name */}
                            <span className="text-white">{user.fullname}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ChatSidebar;
