import React from "react";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 py-4 px-6 flex items-center justify-between border-t border-gray-600">
      {/* Copyright */}
      <p className="text-lg text-gray-200">© {new Date().getFullYear()} Nostalgic Fever. All rights reserved.</p>

      {/* GitHub Icon */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-200 hover:text-white transition-transform transform hover:scale-150"
      >
        <Github className="w-6 h-6" />
      </a>
    </footer>
  );
};

export default Footer;
