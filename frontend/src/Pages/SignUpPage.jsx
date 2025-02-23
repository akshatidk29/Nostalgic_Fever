import { useState } from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Loader, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedScene from "../Components/AnimatedScene";

const SignUpPage = () => {
  const { Signup, isSigningUp } = UseAuthStore();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Handle user signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) return;
    await Signup(fullname, email, password);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full px-12">
      {/* ✅ Animated Background */}
      <div className="absolute inset-0 -z-10">
        <AnimatedScene />
      </div>

      <div className="w-full max-w-6xl flex items-center justify-between gap-16">
        
        {/* ✅ Left Side: Signup Heading */}
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <div className="text-left">
            <h1 className="text-8xl font-extrabold text-blue-900 leading-tight">
              Sign Up
            </h1>
            <h2 className="text-6xl font-semibold text-blue-900 leading-tight">
              for an Exciting
            </h2>
            <h1 className="text-7xl font-extrabold text-blue-900 leading-tight">
              Journey.
            </h1>
          </div>
        </div>

        {/* ✅ Right Side: Signup Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center border border-white/30 bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl">
          <h2 className="text-6xl mb-3 font-bold text-blue-900 text-center">Nostalgic Fever</h2>
          <p className="text-gray-500 mt-2 text-center">Create your account</p>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">

            {/* ✅ Full Name Input */}
            <div>
              <label className="block text-gray-500 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 bg-white/20 border border-gray-300 rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>

            {/* ✅ Email Input */}
            <div>
              <label className="block text-gray-500 font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 bg-white/20 border border-gray-300 rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* ✅ Password Input with Toggle */}
            <div className="relative">
              <label className="block text-gray-500 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-2 bg-white/20 border border-gray-300 rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* ✅ Signup Button */}
            <button
              type="submit"
              className="w-full border mt-6 border-black font-semibold py-3 rounded-2xl shadow-lg transition-all"
              disabled={isSigningUp}
            >
              {isSigningUp ? <Loader className="animate-spin mr-2 inline-block" size={20} /> : "Sign Up"}
            </button>
          </form>

          {/* ✅ Login Link */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/Login" className="text-blue-900 hover:underline transition">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
