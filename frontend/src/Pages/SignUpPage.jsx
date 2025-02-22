import { useState } from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { Signup, isSigningUp } = UseAuthStore();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError(""); // Clear any previous errors
    await Signup(fullname, email, password);
  };

  return (
    <div className="flex items-center pt-32 justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 p-6">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 text-center transition-all duration-300 hover:scale-105">

        {/* Brand Name */}
        <h2 className="text-4xl font-extrabold text-indigo-300">Nostalgic Fever</h2>
        <p className="text-indigo-200 mt-1">Create your account</p>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div>
            <label className="block text-indigo-200 font-medium text-left">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 bg-transparent border border-indigo-300 rounded-lg text-white placeholder-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

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
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center shadow-lg hover:shadow-indigo-500/25"
            disabled={isSigningUp}
          >
            {isSigningUp ? <Loader className="animate-spin mr-2" size={20} /> : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-indigo-300 mt-4">
          Already have an account?{" "}
          <Link to="/Login" className="text-yellow-300 hover:underline transition">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
