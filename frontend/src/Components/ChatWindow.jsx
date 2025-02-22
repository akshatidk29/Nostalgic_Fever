import React, { useEffect, useState } from "react";
import { Send, X } from "lucide-react";
import { UseChatStore } from "../Store/UseChatStore";
import { UseAuthStore } from "../Store/UseAuthStore";

const ChatWindow = () => {
    const { messages, getMessages, sendMessage, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = UseChatStore();
    const { onlineUsers } = UseAuthStore();
    const [messageText, setMessageText] = useState("");
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);

            subscribeToMessages();
            return () => unsubscribeFromMessages();
        }
    }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    const handleSendMessage = () => {
        if (!messageText.trim()) return;
        sendMessage({ text: messageText });
        setMessageText("");
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return "Invalid Date";
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) return "Invalid Date";

        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Check if the selected user is online
    const isOnline = onlineUsers.includes(selectedUser?._id);

    if (!selectedUser) {
        return (
            <div className="w-3/4 flex items-center justify-center text-gray-400">
                Select a user to start chatting.
            </div>
        );
    }

    return (
        <div className="w-3/4 flex flex-col h-full relative bg-gray-900">
            {/* Chat Header with Avatar */}
            <div
                className="p-4 border-b border-gray-700 bg-gray-800 flex items-center space-x-3 cursor-pointer shadow-lg"
                onClick={() => setShowProfile(true)}
            >
                <img
                    src={selectedUser.profilePic || "images.png"}
                    alt={selectedUser.fullname}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400 shadow-md"
                />
                <div className="flex flex-col">
                    <span className="text-white font-bold">{selectedUser.fullname}</span>
                    <span className="text-xs text-gray-400">
                        {isOnline ? "Active Now" : "Last seen recently"}
                    </span>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
                {isMessagesLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg, index) => {
                            const isSentByMe = msg.senderId !== selectedUser._id;
                            return (
                                <div
                                    key={index}
                                    className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex flex-col ${isSentByMe ? "items-end" : "items-start"}`}>
                                        <div
                                            className={`p-3 rounded-2xl max-w-xs break-words ${isSentByMe
                                                ? "bg-indigo-600 text-white rounded-br-none"
                                                : "bg-gray-700 text-gray-100 rounded-bl-none"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        <span className="text-xs text-gray-400 mt-1">
                                            {formatTime(msg.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700 bg-gray-800 shadow-lg">
                <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
                    <input
                        type="text"
                        className="flex-1 bg-transparent text-white outline-none"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 bg-indigo-600 p-2 rounded-full hover:bg-indigo-500 transition-colors"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            {/* Profile Modal */}
            {showProfile && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-80 text-center relative">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowProfile(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <img
                            src={selectedUser.profilePic || "images.png"}
                            alt={selectedUser.fullname}
                            className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-400 shadow-xl"
                        />
                        <h2 className="text-xl font-bold text-white mt-4">{selectedUser.fullname}</h2>
                        <p className="text-gray-400 mt-2">{selectedUser.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
