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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800">Krachhack</h2>
        <p className="text-gray-500 text-center mt-1">Create your account</p>

        <form onSubmit={handleSignup} className="mt-6">
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-400"
              placeholder="Enter your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

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
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition-all flex items-center justify-center"
            disabled={isSigningUp}
          >
            {isSigningUp ? <Loader className="animate-spin mr-2" size={20} /> : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link to="/Login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
