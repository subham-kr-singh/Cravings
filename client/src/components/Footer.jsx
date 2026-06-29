import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-(--text-color) text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary-color)">
                <IoRestaurant className="text-2xl text-white" />
              </div>

              <span className="text-3xl font-bold">Craving</span>
            </Link>

            <p className="mt-5 leading-7 text-gray-300">
              Discover your favorite restaurants, order delicious meals, and
              enjoy lightning-fast delivery right to your doorstep.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-(--primary-color)">
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-(--primary-color)">
                <FaInstagram />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-(--primary-color)">
                <FaTwitter />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-(--primary-color)">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Company</h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to="/about" className="hover:text-(--accent-color)">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-(--accent-color)">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-(--accent-color)">
                  Careers
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-(--accent-color)">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to="/" className="hover:text-(--accent-color)">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/restaurants" className="hover:text-(--accent-color)">
                  Restaurants
                </Link>
              </li>

              <li>
                <Link to="/login" className="hover:text-(--accent-color)">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-(--accent-color)">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Contact</h3>

            <div className="space-y-3 text-gray-300">
              <p>📍 Bhopal, Madhya Pradesh</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@craving.com</p>

              <button className="mt-4 rounded-xl bg-(--primary-color) px-6 py-3 font-medium transition hover:bg-(--secondary-color)">
                Download App
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© 2026 Craving. All rights reserved.</p>

            <div className="flex gap-6">
              <Link to="/" className="hover:text-(--accent-color)">
                Privacy Policy
              </Link>

              <Link to="/" className="hover:text-(--accent-color)">
                Terms of Service
              </Link>

              <Link to="/" className="hover:text-(--accent-color)">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
