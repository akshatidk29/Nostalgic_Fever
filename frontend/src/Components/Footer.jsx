import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-300 py-8 px-10 border-t mt-44 border-gray-700">
      <div className="max-w-7xl  grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left Section - Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-white">Nostalgic Fever</h2>
          <p className="text-gray-400 mt-2">
            Preserve today’s moments, unlock tomorrow’s memories.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="text-center">
          <h3 className="text-3xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/Timeline" className="hover:text-white transition">Timeline</Link></li>
            <li><Link to="/About" className="hover:text-white transition">About</Link></li>
            <li><Link to="/Contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Right Section - Newsletter & Socials */}
        <div className="text-right">
          <h3 className="text-3xl font-semibold text-white">Stay Updated</h3>
          <p className="text-gray-400 text-sm mt-2">
            Subscribe to our newsletter for the latest updates.
          </p>

        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-5">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Nostalgic Fever. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform transform hover:scale-125">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform transform hover:scale-125">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform transform hover:scale-125">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:contact@nostalgicfever.com" className="text-gray-400 hover:text-white transition-transform transform hover:scale-125">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
