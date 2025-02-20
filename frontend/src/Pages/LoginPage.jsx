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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800">Krachhack</h2>
        <p className="text-gray-500 text-center mt-1">Welcome back! Please login</p>

        <form onSubmit={handleLogin} className="mt-6">
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <Loader className="animate-spin mr-2" size={20} /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
