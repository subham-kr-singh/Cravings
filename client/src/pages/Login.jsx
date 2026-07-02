import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api.config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setIsLogin, isLogin, setUser } = useAuth();
  const Navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };

    setLoginData({
      email: "",
      password: "",
    });

    try {
      const res = await api.post("/auth/login", payload);

      toast.success(res.data.message);
      setIsLogin(true);
      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      Navigate("/user/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Invalid email or password.";

      toast.error(errorMessage);
    }
  };

  return (
    <section className="flex min-h-screen bg-(--background-color)">
      {/* LEFT */}
      <div
        className="relative flex w-1/2 items-end bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80')",
        }}>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 p-16 text-white">
          <h1 className="text-5xl font-bold">
            Delicious Food,
            <br />
            Delivered Fast.
          </h1>

          <p className="mt-5 max-w-md text-lg text-gray-200">
            Fresh meals from your favourite restaurants delivered to your
            doorstep.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-1/2 items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-(--primary-color)">
            Welcome Back
          </h2>

          <p className="mt-2 text-(--text-light)">Login to continue</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label className="mb-2 block font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-(--border-color) px-4 py-3 outline-none transition-all focus:border-(--primary-color)"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Password</label>

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-(--border-color) px-4 py-3 outline-none transition-all focus:border-(--primary-color)"
              />
            </div>

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 text-(--text-light)">
                <input type="checkbox" className="accent-(--primary-color)" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-(--primary-color) hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button className="w-full rounded-xl bg-(--primary-color) py-3 font-semibold text-white transition hover:bg-(--secondary-color)">
              Login
            </button>

            <p className="text-center text-(--text-light)">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-(--primary-color)">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
