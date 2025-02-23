import React, { useEffect, useState } from "react";
import { Send, X } from "lucide-react";
import { UseChatStore } from "../Store/UseChatStore";
import { UseAuthStore } from "../Store/UseAuthStore";

const ChatWindow = () => {
    const { messages, getMessages, sendMessage, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = UseChatStore();
    const { onlineUsers, authUser, CheckAuth } = UseAuthStore();
    const [messageText, setMessageText] = useState("");
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
            subscribeToMessages();
            return () => unsubscribeFromMessages();
        }
    }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (CheckAuth) CheckAuth(); // ✅ Ensure function is not undefined before calling
    }, []);

    const handleSendMessage = () => {
        if (!messageText.trim()) return;
        sendMessage({ text: messageText });
        setMessageText("");
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return "Invalid Date";
        const date = new Date(timestamp);
        return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    };

    const isOnline = onlineUsers.includes(selectedUser?._id);

    if (!selectedUser) {
        return (
            <div className="w-3/4 flex items-center justify-center text-gray-500">
                Select a user to start chatting.
            </div>
        );
    }

    return (
        <div
            className="w-3/5 border m-4 ml-0 mt-0 border-blue-900 bg-gray-100 rounded-xl flex flex-col h-85/100 relative bg-cover bg-center"
            style={{ backgroundImage: "url('Chat_BG.jpeg')" }}
        >
            {/* ✅ Chat Header */}
            <div className="p-4 border-b border-black  rounded-t-xl flex items-center space-x-3 cursor-pointer bg-white  " onClick={() => setShowProfile(true)}>
                <img src={selectedUser.profilePic || "Profile.png"} alt={selectedUser.fullname} className="w-15 h-15 rounded-full object-cover border-2 border-blue-500 shadow-md" />
                <div className="flex flex-col">
                    <span className="text-gray-900 font-bold">{selectedUser.fullname}</span>
                    <span className="text-xs text-gray-600">{isOnline ? "Active Now" : "Last seen recently"}</span>
                </div>
            </div>

            {/* ✅ Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto backdrop-blur-xs">
                {isMessagesLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="space-y-4 ">
                        {messages.map((msg, index) => {
                            const isSentByMe = msg.senderId !== selectedUser._id;

                            return (
                                <div key={index} className={`flex items-end  ${isSentByMe ? "justify-end" : "justify-start"} space-x-3`}>

                                    {/* ✅ Received Message (Left) */}
                                    {!isSentByMe && (
                                        <>
                                            <img
                                                src={selectedUser.profilePic || "Profile.png"}
                                                alt="User"
                                                className="w-12 h-12 object-cover rounded-full border-2 border-blue-400 shadow-md"
                                            />
                                            <div className="flex flex-col items-start">
                                                <div className="p-3 rounded-2xl max-w-xs break-words bg-blue-200 text-gray-900 rounded-bl-none">
                                                    {msg.text}
                                                </div>
                                                <span className="text-xs text-gray-500 mt-1">{formatTime(msg.createdAt)}</span>
                                            </div>
                                        </>
                                    )}

                                    {/* ✅ Sent Message (Right) */}
                                    {isSentByMe && (
                                        <>
                                            <div className="flex flex-col items-end ">
                                                <div className="p-3 rounded-2xl max-w-xs break-words bg-blue-600 text-white rounded-br-none">
                                                    {msg.text}
                                                </div>
                                                <span className="text-xs text-gray-500 mt-1">{formatTime(msg.createdAt)}</span>
                                            </div>
                                            <img
                                                src={authUser.profilePic || "Profile.png"}
                                                alt="You"
                                                className="w-12 h-12  object-cover rounded-full border-2 border-blue-500 shadow-md"
                                            />
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>



            {/* ✅ Message Input */}
            <div className="shadow-lg rounded-xl backdrop-blur-xs">
                <div className="flex items-center rounded-b-xl border-t-1 border-black  bg-white  px-6 pr-24 py-2 ">
                    <button onClick={handleSendMessage} className="ml-2 mr-12 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors">
                        <Send className="w-8 h-6 text-white" />
                    </button>

                    <input
                        type="text"
                        className="flex-1 h-15  bg-transparent text-gray-900 outline-none"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                </div>
            </div>

            {/* ✅ Profile Modal */}
            {
                showProfile && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                        <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center relative border border-blue-900">
                            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors" onClick={() => setShowProfile(false)}>
                                <X className="w-6 h-6" />
                            </button>

                            <img src={selectedUser.profilePic || "Profile.png"} alt={selectedUser.fullname} className="w-40 h-40 rounded-full mx-auto border-4 border-blue-500 shadow-xl" />
                            <h2 className="text-xl font-bold text-gray-900 mt-4">{selectedUser.fullname}</h2>
                            <p className="text-gray-600 mt-2">{selectedUser.email}</p>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ChatWindow;
