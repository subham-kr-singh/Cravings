import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoRestaurant, IoSearch } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isLogin, setIsLogin, setUser } = useAuth();

  const handleLogout = async () => {
    // Clear client-side state immediately for a responsive feel
    sessionStorage.removeItem("cravingUser"); // Updated to match the key in Setting component
    setIsLogin(false);
    setUser(null);
    navigate("/");

    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message || "Logged out successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong during logout.",
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-(--border-color) bg-(--background-color)">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 w-full gap-5">
        {/* Logo */}
        <Link
          to={isLogin ? "/user/dashboard" : "/"}
          className="flex items-center gap-3 shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--primary-color)">
            <IoRestaurant className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-(--text-color)">Craving</h1>
        </Link>

        {isLogin ? (
          <div className="flex flex-1 items-center justify-between gap-6 pl-4">
            {/* Search Bar Wrapper */}
            <div className="flex flex-1 items-center max-w-2xl rounded-3xl bg-zinc-100 px-4 py-2 border border-zinc-200">
              <IoSearch size={22} className="text-(--text-light) shrink-0" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines or dishes..."
                className="w-full bg-transparent px-3 text-(--text-color) outline-none placeholder:text-(--text-light)"
              />
            </div>

            {/* Right Side: Profile & Action */}
            <div className="flex items-center gap-4 shrink-0">
              {/* User Section Link */}
              <Link to="/user/dashboard">
                <button
                  className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-1.5 transition hover:border-(--primary-color)"
                  title="Go to Dashboard">
                  <img
                    src={user?.photo?.url || "https://via.placeholder.com/150"}
                    alt={user?.fullName || "User"}
                    className="h-11 w-11 rounded-full object-cover object-top border border-zinc-200"
                  />
                  <div className="hidden sm:flex flex-col items-start text-left">
                    <span className="font-medium text-sm text-(--text-color) line-clamp-1">
                      {user?.fullName}
                    </span>
                    <span className="text-xs text-(--text-light)">
                      User Dashboard
                    </span>
                  </div>
                </button>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="rounded-xl border border-zinc-200 p-3 text-(--text-color) transition hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                title="Logout">
                <FaPowerOff className="text-lg" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Navigation (Logged Out) */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="font-medium text-(--text-light) transition hover:text-(--primary-color)">
                Home
              </Link>
              <Link
                to="/restaurants"
                className="font-medium text-(--text-light) transition hover:text-(--primary-color)">
                Restaurants
              </Link>
              <Link
                to="/about"
                className="font-medium text-(--text-light) transition hover:text-(--primary-color)">
                About
              </Link>
              <Link
                to="/contact"
                className="font-medium text-(--text-light) transition hover:text-(--primary-color)">
                Contact
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="rounded-lg border border-(--primary-color) px-5 py-2 font-medium text-(--primary-color) transition hover:bg-(--primary-color) hover:text-white">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="rounded-lg bg-(--primary-color) px-5 py-2 font-medium text-white transition hover:bg-(--secondary-color)">
                  Register
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
