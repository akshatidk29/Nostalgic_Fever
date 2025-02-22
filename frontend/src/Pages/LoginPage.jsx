import { useState } from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { Login, isLoggingIn } = UseAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError(""); // Clear errors before submission
    await Login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 p-6">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 text-center transition-all duration-300 hover:scale-105">

        {/* Brand Name */}
        <h2 className="text-4xl font-extrabold text-indigo-300">Nostalgic Fever</h2>
        <p className="text-indigo-200 mt-1">Welcome back! Please login</p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div>
            <label className="block text-indigo-200 font-medium text-left">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 bg-transparent border border-indigo-300 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-indigo-200 font-medium text-left">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 bg-transparent border border-indigo-300 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center shadow-lg hover:shadow-indigo-500/25"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <Loader className="animate-spin mr-2" size={20} /> : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-indigo-300 mt-4">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-yellow-300 hover:underline transition">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
