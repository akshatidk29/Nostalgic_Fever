import { UseAuthStore } from "./Store/UseAuthStore";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import ProfilePage from "./Pages/ProfilePage";
import TimelinePage from "./Pages/TimelinePage";
import CreateCapsulePage from "./Pages/CreateCapsulePage";
import ChatPage from "./Pages/ChatPage";
import HowToUse from "./Pages/HowToUse";
import AllCapsulePage from "./Pages/AllCapsulePage";
import { Loader } from "lucide-react";
import ChatBot from "./Components/ChatBot";

function App() {
  // ✅ Extract Zustand state and functions separately
  const authUser = UseAuthStore((state) => state.authUser);
  const CheckAuth = UseAuthStore((state) => state.CheckAuth);
  const isCheckingAuth = UseAuthStore((state) => state.isCheckingAuth);
  const onlineUsers = UseAuthStore((state) => state.onlineUsers);

  console.log(onlineUsers);

  useEffect(() => {
    if (CheckAuth) CheckAuth(); // ✅ Ensure function is not undefined before calling
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <> <ChatBot />
      {/* <Navbar /> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/Signup" element={authUser ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/Login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/Login" />} />
        <Route path="/Timeline" element={authUser ? <TimelinePage /> : <Navigate to="/Login" />} />
        <Route path="/Profile" element={authUser ? <ProfilePage /> : <Navigate to="/Login" />} />
        <Route path="/CreateCapsule" element={authUser ? <CreateCapsulePage /> : <Navigate to="/Login" />} />
        <Route path="/Chat" element={authUser ? <ChatPage /> : <Navigate to="/Login" />} />
        <Route path="/All" element={authUser ? <AllCapsulePage /> : <Navigate to="/Login" />} />

        {/* Always Accessible */}
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/HowToUse" element={<HowToUse />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
