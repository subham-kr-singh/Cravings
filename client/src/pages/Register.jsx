import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const Register = () => {
  const { userType } = useParams(); // Get userType from URL params (if needed)
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userType: userType || "customer",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Sync state when URL param changes
  React.useEffect(() => {
    if (userType && ["customer", "restaurant", "rider"].includes(userType)) {
      setFormData((prev) => ({ ...prev, userType }));
    }
  }, [userType]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUserTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      userType: newType,
    }));
    navigate(`/register/${newType}`, { replace: true });
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.dob) newErrors.dob = "Date of birth is required";
    if (!data.password || data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!data.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!data.agreeTerms)
      newErrors.agreeTerms = "You must agree to terms and conditions";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        ...formData,
        email: formData.email.toLowerCase(),
      });
      
      toast.success(res.data.message || "Registration successful!");
      
      setFormData({
        userType: "customer",
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred during registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-(--background-color)">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* ================= LEFT FORM ================= */}
        <div className="flex items-center justify-center px-8 py-12 lg:px-16 overflow-y-auto">
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
              
              {/* User Type Selection */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                  Register as
                </label>
                <div className="flex gap-5">
                  {["customer", "restaurant", "rider"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        checked={formData.userType === type}
                        onChange={handleUserTypeChange}
                        className="cursor-pointer accent-(--primary-color)"
                      />
                      <span className="capitalize text-sm text-(--text-color)">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

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
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color) ${
                    errors.fullName ? "border-red-500" : "border-(--border-color)"
                  }`}
                />
                {errors.fullName && <span className="text-red-500 text-xs mt-1 block">{errors.fullName}</span>}
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
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color) ${
                    errors.email ? "border-red-500" : "border-(--border-color)"
                  }`}
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
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
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color) ${
                      errors.phone ? "border-red-500" : "border-(--border-color)"
                    }`}
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-(--text-color) outline-none transition-all focus:border-(--primary-color) ${
                      errors.gender ? "border-red-500" : "border-(--border-color)"
                    }`}
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <span className="text-red-500 text-xs mt-1 block">{errors.gender}</span>}
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
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-(--text-color) outline-none transition-all focus:border-(--primary-color) ${
                    errors.dob ? "border-red-500" : "border-(--border-color)"
                  }`}
                />
                {errors.dob && <span className="text-red-500 text-xs mt-1 block">{errors.dob}</span>}
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
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color) ${
                    errors.password ? "border-red-500" : "border-(--border-color)"
                  }`}
                />
                {errors.password ? (
                  <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>
                ) : (
                  <p className="mt-2 text-xs text-(--text-light)">
                    Use at least 6 characters.
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-color)">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-(--text-color) placeholder:text-gray-400 outline-none transition-all focus:border-(--primary-color) ${
                    errors.confirmPassword ? "border-red-500" : "border-(--border-color)"
                  }`}
                />
                {errors.confirmPassword && <span className="text-red-500 text-xs mt-1 block">{errors.confirmPassword}</span>}
              </div>

              {/* Terms */}
              <div className="flex flex-col gap-1">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1 cursor-pointer accent-(--primary-color)"
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
                {errors.agreeTerms && <span className="text-red-500 text-xs ml-7">{errors.agreeTerms}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl py-3.5 text-lg font-semibold text-white transition-all duration-300 ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-(--primary-color) hover:bg-(--secondary-color) hover:shadow-lg"
                }`}
              >
                {loading ? "Registering..." : "Create Account"}
              </button>

              {/* Login Link */}
              <p className="text-center text-(--text-light)">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-(--primary-color) hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* ======================== RIGHT FORM ========================= */}
        <div
          className="relative hidden lg:flex items-end bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
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