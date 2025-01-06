import Navbar from "./components/Navbar";
import {Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/Homepage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";


import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import {Toaster} from "react-hot-toast";  

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();
  useEffect(() => {
    checkAuth();

  },[checkAuth]);

  console.log("authUser",authUser);
  if( isCheckingAuth && !authUser) 
     return (
    <div className="flex items-center justify-center h-screen ">
       <Loader  className="size-10 animate-spin min-h-96  "/>
    </div>
  )
  
  return (
    <div data-theme={theme}>
      
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to = "/login"/>} />
        <Route path="/signup" element={ <SignUpPage/>} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
        <Route path="/settings" element={authUser ? <SettingsPage/> : <Navigate to = "/login"/>} />
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to = "/login"/>} />

      </Routes>

      <Toaster/>
    </div>
  );
}

export default App;