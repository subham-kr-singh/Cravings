import React from "react";
import { Link } from "react-router-dom";
import { IoRestaurant } from "react-icons/io5";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-(--border-color) bg-(--background-color)">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--primary-color)">
            <IoRestaurant className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-bold text-(--text-color)">Craving</h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
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

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <button className="rounded-lg border border-(--primary-color) px-5 py-2 font-medium text-(--primary-color) transition hover:bg-(--primary-color) hover:text-white">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="rounded-lg bg-(--primary-color) px-5 py-2 font-medium text-white transition duration-300 hover:bg-(--secondary-color)">
              Register
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
