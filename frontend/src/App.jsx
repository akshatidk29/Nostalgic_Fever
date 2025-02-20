import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import HomePage from "./Pages/HomePage"
import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/LoginPage"
import AboutPage from "./Pages/AboutPage"
import ContactPage from "./Pages/ContactPage"
import ProfilePage from "./Pages/ProfilePage"

import { Loader } from "lucide-react"
import { UseAuthStore } from "./Store/UseAuthStore"
import { useEffect } from "react"

function App() {
  const { authUser, CheckAuth, isCheckingAuth } = UseAuthStore()

  useEffect(() => {
    CheckAuth();
  }, [CheckAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/Login" />} />
          <Route path="/Profile" element={authUser ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path="/Signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/Login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Contact" element={<ContactPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
