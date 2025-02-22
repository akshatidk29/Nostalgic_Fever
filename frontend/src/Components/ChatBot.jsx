import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatbaseWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "Y2dayMQT3MxcULq0VC-4N";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);
  }, []);

  return null;
};

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (window.chatbase) {
      window.chatbase(isChatOpen ? "close" : "open");
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.closest(".chat-modal")) return;
    setIsChatOpen(false);
  };

  useEffect(() => {
    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isChatOpen]);

  return (
    <>
      <ChatbaseWidget />
      <motion.div
        drag
        dragConstraints={{ left: 0, right: window.innerWidth - 60, top: 0, bottom: window.innerHeight - 60 }}
        className="fixed bottom-10 right-10 cursor-pointer z-50"
      >
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 0, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="p-4 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white transition duration-300"
        >
          💬 Chat
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-10 bg-white shadow-2xl rounded-2xl p-4 w-80 h-96 z-50 border border-gray-300 chat-modal"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h3 className="text-lg font-semibold">Chat with us</h3>
              <button onClick={toggleChat} className="text-gray-500 hover:text-gray-700">✖</button>
            </div>
            <div className="h-full overflow-y-auto">
              {/* Chatbot iframe or embedded chat will go here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;