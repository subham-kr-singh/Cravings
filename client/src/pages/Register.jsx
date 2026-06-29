import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api.config.js";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    conformPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.conformPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      fullName: registerData.fullName,
      email: registerData.email.toLowerCase(),
      phone: registerData.phone,
      gender: registerData.gender,
      dob: registerData.dob,
      password: registerData.password,
      conformPassword: registerData.conformPassword,
    };

    try {
      const res = await api.post("/auth/register", payload);

      alert(res.data.message || "Registration successful!");

      setRegisterData({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        password: "",
        conformPassword: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section className="min-h-screen bg-(--background-color)">
      <div className="grid min-h-screen grid-cols-2">
        {/* ================= LEFT FORM ================= */}
        <div className="flex items-center justify-center px-16 py-12">
          <div className="w-full max-w-lg">
            <span className="rounded-full bg-(--surface-color) px-4 py-2 text-sm font-medium text-(--primary-color)">
              🍔 Join Craving
            </span>

            <h1 className="mt-6 text-4xl font-bold text-(--text-color)">
              Create Your Account
            </h1>

            <p className="mt-3 text-(--text-light) leading-7">
              Sign up to discover nearby restaurants, order your favourite
              meals, track deliveries, and enjoy exclusive offers.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={registerData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-(--border-color) bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color)"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={registerData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-(--border-color) bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color)"
                />
              </div>

              {/* Phone & Gender */}
              <div className="grid gap-5 grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="Enter your mobile number"
                    value={registerData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-(--border-color) bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color)"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={registerData.gender}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-(--border-color) bg-white px-4 py-3 text-(--text-color) outline-none transition-all focus:border-(--primary-color)">
                    <option value="">Select your gender</option>

                    <option value="male">Male</option>

                    <option value="female">Female</option>

                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              {/* Date of Birth */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dob"
                  value={registerData.dob}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-(--border-color) bg-white px-4 py-3 text-(--text-color) outline-none transition-all focus:border-(--primary-color)"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-(--border-color) bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color)"
                />

                <p className="mt-2 text-xs text-(--text-light)">
                  Use at least 8 characters with letters and numbers.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="conformPassword"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={registerData.conformPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-(--border-color) bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color)"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 accent-(--primary-color)"
                />

                <p className="text-sm leading-6 text-(--text-light)">
                  I agree to the{" "}
                  <span className="cursor-pointer font-semibold text-(--primary-color) hover:underline">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="cursor-pointer font-semibold text-(--primary-color) hover:underline">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-(--primary-color) py-3.5 text-lg font-semibold text-white transition-all duration-300 hover:bg-(--secondary-color) hover:shadow-lg">
                Create Account
              </button>

              {/* Login Link */}
              <p className="text-center text-(--text-light)">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-(--primary-color) hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* ================= RIGHT HERO ================= */}
        <div
          className="relative flex items-end bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
          }}>
          <div className="absolute inset-0 bg-black/55"></div>

          <div className="relative z-10 max-w-lg p-16 text-white">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-md">
              🍔 India's Favourite Food Delivery
            </span>

            <h2 className="mt-6 text-5xl font-bold leading-tight">
              Good Food,
              <br />
              Good Mood.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-200">
              Explore thousands of restaurants, discover new flavours, and enjoy
              lightning-fast delivery at your doorstep.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-3xl font-bold">1000+</h3>
                <p className="text-sm text-gray-300">Restaurants</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">4.8★</h3>
                <p className="text-sm text-gray-300">Customer Rating</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">30 Min</h3>
                <p className="text-sm text-gray-300">Avg. Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
