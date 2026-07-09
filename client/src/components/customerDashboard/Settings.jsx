import React, { useState, useEffect } from "react";
import { MdEdit, MdOutlineAddAPhoto } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/api.config";
import toast from "react-hot-toast";

const Setting = () => {
  const { user, setUser } = useAuth();

  // Baseline data from context
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo?.url || "https://via.placeholder.com/150",
  });

  // Working text fields state
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // State hooks for visual editing toggles & image files
  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Sync state if context changes asynchronously
  useEffect(() => {
    if (!user) return;

    setProfileData({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      photo: user.photo?.url || "https://via.placeholder.com/150",
    });

    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [user]);

  // Handle typing inside text fields
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle local image file selection
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePic(file);
    profilePicPreview && URL.revokeObjectURL(profilePicPreview);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  // Submit modern profile data payload via multipart/form-data
  const handleSaveProfile = async () => {
    try {
      setIsSavingProfile(true);

      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email.toLowerCase());
      payload.append("phone", formData.phone);

      if (profilePic) {
        payload.append("displayPic", profilePic);
      }
      const response = await api.put("/user/edit-profile", payload);
      const updatedUser = response.data.data;

      // Update local baseline tracking
      setProfileData({
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        photo: updatedUser.photo?.url || "https://via.placeholder.com/150",
      });

      // Clear structural image stage states
      setProfilePic(null);
      setProfilePicPreview(null);

      // Sync global state configurations
      setUser(updatedUser);
      sessionStorage.setItem("UserData", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");
      setEditingProfile(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Discard changes and revert working state to baseline data values
  const handleCancelProfile = () => {
    setFormData({
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
    });
    setProfilePic(null);
    setProfilePicPreview(null);
    setEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-(--background-color) p-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-(--border-color) bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-(--border-color) p-6">
          <div>
            <h1 className="text-3xl font-bold text-(--text-color)">
              Profile Settings
            </h1>
            <p className="mt-1 text-(--text-light)">
              Manage your account information.
            </p>
          </div>

          {!editingProfile ? (
            <button
              onClick={() => setEditingProfile(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-(--primary-color) px-5 py-2.5 text-white transition hover:bg-(--secondary-color)">
              <MdEdit className="text-lg" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
                className="rounded-lg bg-(--primary-color) px-5 py-2.5 text-white transition hover:bg-(--secondary-color) disabled:cursor-not-allowed disabled:opacity-60">
                {isSavingProfile ? "Saving..." : "Save"}
              </button>

              <button
                onClick={handleCancelProfile}
                className="rounded-lg border border-(--primary-color) px-5 py-2.5 text-(--primary-color) transition hover:bg-(--primary-color) hover:text-white">
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Body Layout */}
        <div className="grid gap-10 p-8 md:grid-cols-[250px_1fr]">
          {/* Avatar Area */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={profilePicPreview || profileData.photo}
                alt="Profile"
                className="h-48 w-48 rounded-full border-4 border-(--primary-color) object-cover"
              />

              {editingProfile && (
                <>
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-2 right-2 cursor-pointer rounded-full border border-(--border-color) bg-(--surface-color) p-3 transition hover:bg-(--accent-color)">
                    <MdOutlineAddAPhoto className="text-2xl text-(--text-color)" />
                  </label>
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </>
              )}
            </div>
          </div>

          {/* Form Fields Area */}
          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-medium text-(--text-color)">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleProfileChange}
                disabled={!editingProfile}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-(--text-color) transition-all outline-none ${
                  editingProfile
                    ? "border-(--secondary-color) focus:border-(--primary-color)"
                    : "border-gray-200 bg-gray-50/50"
                }`}
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-(--text-color)">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleProfileChange}
                disabled={true}
                className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-400 cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-(--text-color)">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleProfileChange}
                disabled={!editingProfile}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-(--text-color) transition-all outline-none ${
                  editingProfile
                    ? "border-(--secondary-color) focus:border-(--primary-color)"
                    : "border-gray-200 bg-gray-50/50"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
