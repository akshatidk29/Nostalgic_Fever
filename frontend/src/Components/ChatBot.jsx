import { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "Y2dayMQT3MxcULq0VC-4N";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);
  }, []);

  return null; // No additional UI components, just the embedded script
};

export default ChatBot;
