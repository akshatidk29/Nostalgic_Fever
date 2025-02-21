import React from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Link } from "react-router-dom";
import { User } from "lucide-react"; // Profile Icon

const Navbar = () => {
  // Get authUser and Logout function from Zustand store
  const { authUser, isCheckingAuth, Logout } = UseAuthStore();

  // Show a loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <nav className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-[1000]">
        <div className="text-white">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold text-indigo-300 tracking-wide">
        Nostalgic <span className="text-indigo-400">Fever</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8">
        {[
          { name: "Home", path: "/" },
          { name: "HowToUse", path: "/HowToUse" },
          { name: "About", path: "/About" },
          { name: "Contact", path: "/Contact" }
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="relative text-lg font-medium text-indigo-300 hover:text-cyan-600 transition duration-300 group"
          >
            {item.name}
            {/* Yellow underline animation */}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* User Section */}
      {authUser ? (
        <div className="flex items-center space-x-4">
          {/* Greeting */}
          <span className="text-indigo-300 font-medium">Hello, {authUser.fullname}</span>

          {/* Profile Icon */}
          <Link
            to="/Profile"
            className="text-indigo-300 hover:text-white transition-all"
          >
            <User className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
          </Link>

          {/* Logout Button */}
          <button
            onClick={Logout}
            className="px-5 py-2 text-lg font-medium text-red-200 bg-red-600/50 hover:bg-red-500 transition-all rounded-full shadow-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        // Login/Signup Buttons
        <div className="flex items-center space-x-4">
          <Link
            to="/Login"
            className="px-5 py-2 text-lg font-medium text-indigo-200 bg-indigo-700/50 hover:bg-indigo-500 transition-all rounded-full shadow-lg"
          >
            Login
          </Link>
          <Link
            to="/Signup"
            className="px-5 py-2 text-lg font-medium text-green-200 bg-green-700/50 hover:bg-green-500 transition-all rounded-full shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
