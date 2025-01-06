import { Link } from "react-router-dom";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const {authUser , logout} = useAuthStore();    

    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-20 backdrop-blur-0 bg-base-100/80">
            <div className="container mx-auto px-4 h-11 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-primary" />
                        </div>
                        <h1 className="text-lg font-bold">GupShup</h1>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
                        <Settings className="w-4 h-4" />
                        <span className="hidden sm:inline">Settings</span>
                    </Link>

                    {authUser && (
                        <>
                            <Link to="/profile" className="btn btn-sm gap-2">
                                <User className="w-5 h-5" />
                                <span className="hidden sm:inline">Profile</span>
                            </Link>

                            <button className="btn btn-sm gap-2" onClick={logout}>
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
export default Navbar;