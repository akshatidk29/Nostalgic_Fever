import React, { useEffect } from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, CheckAuth, Logout } = UseAuthStore();

  useEffect(() => {
    CheckAuth();
  }, [CheckAuth]);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Text-Based Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        Krachhack
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <Link to="/About" className="hover:text-indigo-600">About</Link>
        <Link to="/Contact" className="hover:text-indigo-600">Contact</Link>
      </div>

      {/* User Section (Only show if logged in) */}
      {authUser && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Hello, {authUser.fullname}</span>

          {/* Profile Button */}
          <Link
            to="/Profile"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
          >
            Profile
          </Link>

          {/* Logout Button */}
          <button
            onClick={Logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
