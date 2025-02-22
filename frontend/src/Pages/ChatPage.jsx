import React, { useEffect } from "react";
import { UseChatStore } from "../Store/UseChatStore";
import ChatSidebar from "../Components/ChatSidebar";
import ChatWindow from "../Components/ChatWindow";

const ChatPage = () => {
    const { getUsers } = UseChatStore();

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="flex h-screen pt-32 bg-gray-900 text-white">
            <ChatSidebar />
            <ChatWindow />
        </div>
    );
};

export default ChatPage;
