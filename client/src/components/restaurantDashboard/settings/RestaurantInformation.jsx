import React, { useState, useEffect } from "react";
import {
  MdEdit, MdSave, MdClose, MdOutlineAddAPhoto,
  MdOutlineLockReset, MdPerson, MdRestaurant,
  MdGavel, MdCheckCircle
} from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/api.config.js";
import toast from "react-hot-toast";
import PasswordChangeModal from "../../commonModels/PasswordChangeModel.jsx";

/* ─────────────────────────────────────────────
   Style constants  (only index.css variables)
───────────────────────────────────────────── */
const BASE_INPUT =
  "w-full px-4 py-2.5 text-sm rounded-xl border-2 outline-none transition-all duration-200 font-medium text-[var(--text-color)] placeholder:text-[var(--text-light)] placeholder:font-normal";
const ACTIVE_INPUT =
  "border-[var(--secondary-color)] bg-white focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(190,26,26,0.12)]";
const DISABLED_INPUT =
  "border-[var(--border-color)] bg-[var(--surface-color)] cursor-not-allowed opacity-60 select-none";

const iCls = (editing) => `${BASE_INPUT} ${editing ? ACTIVE_INPUT : DISABLED_INPUT}`;

/* ─────────────────────────────────────────────
   Tiny shared components
───────────────────────────────────────────── */
const Label = ({ children, required }) => (
  <label className="block text-xs font-bold tracking-wide uppercase text-[var(--text-color)] mb-1.5">
    {children}
    {required && <span className="text-[var(--primary-color)] ml-0.5">*</span>}
  </label>
);

const Field = ({ label, required, children, col }) => (
  <div className={col}>
    <Label required={required}>{label}</Label>
    {children}
  </div>
);

/* section wrapper */
const Section = ({ icon: Icon, title, badge, children }) => (
  <div className="bg-white rounded-2xl border border-[var(--border-color)] shadow-sm overflow-hidden">
    {/* section title bar */}
    <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--border-color)] bg-[var(--surface-color)]">
      <span className="p-2 bg-[var(--primary-color)]/10 rounded-xl">
        <Icon className="text-xl text-[var(--primary-color)]" />
      </span>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-[var(--text-color)]">{title}</h3>
      </div>
      {badge}
    </div>
    {/* form body */}
    <div className="px-6 py-6">{children}</div>
  </div>
);

/* primary action button */
const PrimaryBtn = ({ onClick, disabled, loading, icon: Icon, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 disabled:opacity-40 transition-all shadow-sm">
    {loading ? (
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    ) : (
      Icon && <Icon className="text-base" />
    )}
    {loading ? "Saving…" : children}
  </button>
);

const OutlineBtn = ({ onClick, disabled, icon: Icon, children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center gap-2 border-2 border-[var(--border-color)] text-[var(--text-color)] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--surface-color)] active:scale-95 disabled:opacity-40 transition-all">
    {Icon && <Icon className="text-base" />}
    {children}
  </button>
);

/* ═════════════════════════════════════════════
   MAIN COMPONENT
═════════════════════════════════════════════ */
const RestaurantInformation = () => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  /* ───── Profile ───── */
  const [editingProfile, setEditingProfile] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
  });

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      const fd = new FormData();
      fd.append("fullName", profileForm.fullName);
      fd.append("email", (user?.email || "").toLowerCase());
      fd.append("phone", profileForm.phone);
      if (profilePic) fd.append("displayPic", profilePic);

      const res = await api.put("/user/edit-profile", fd);
      setUser(res.data.data);
      sessionStorage.setItem("cravingUser", JSON.stringify(res.data.data));
      setEditingProfile(false);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelProfile = () => {
    setProfileForm({ fullName: user?.fullName || "", phone: user?.phone || "" });
    setProfilePicPreview(null);
    setProfilePic(null);
    setEditingProfile(false);
  };

  /* ───── Restaurant ───── */
  const [editingRestaurant, setEditingRestaurant] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  const [isFetchingRestaurant, setIsFetchingRestaurant] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const BLANK_REST = {
    restaurantName: "", description: "", restaurantType: "",
    cuisineTypes: "", contactEmail: "", contactPhone: "",
    openingTime: "", closingTime: "", legalName: "", companyType: "",
  };
  const [restForm, setRestForm] = useState(BLANK_REST);

  const fillRestForm = (d) =>
    setRestForm({
      restaurantName: d?.restaurantName || "",
      description: d?.description || "",
      restaurantType: d?.restaurantType || "",
      cuisineTypes: d?.cuisineTypes?.join(", ") || "",
      contactEmail: d?.contactDetails?.email || "",
      contactPhone: d?.contactDetails?.phone || "",
      openingTime: d?.servingHours?.openingTime || "",
      closingTime: d?.servingHours?.closingTime || "",
      legalName: d?.legalName || "",
      companyType: d?.companyType || "",
    });

  useEffect(() => {
    if (restaurantData) fillRestForm(restaurantData);
  }, [restaurantData]);

  const fetchRestaurantData = async () => {
    if (!user?._id) return;
    try {
      setIsFetchingRestaurant(true);
      setFetchError("");
      const res = await api.get(`/restaurant/get-resturant-data?id=${user._id}`);
      setRestaurantData(res.data.data);
    } catch (err) {
      setFetchError(err.response?.data?.message || "Could not load saved data.");
    } finally {
      setIsFetchingRestaurant(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchRestaurantData();
  }, [user?._id]);

  const rc = (e) => setRestForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSaveRestaurant = async () => {
    try {
      setIsLoading(true);
      const payload = {
        restaurantName: restForm.restaurantName,
        description: restForm.description,
        restaurantType: restForm.restaurantType,
        cuisineTypes: restForm.cuisineTypes.split(",").map((c) => c.trim()).filter(Boolean),
        contactDetails: { email: restForm.contactEmail, phone: restForm.contactPhone },
        servingHours: { openingTime: restForm.openingTime, closingTime: restForm.closingTime },
        legalName: restForm.legalName,
        companyType: restForm.companyType,
      };
      const res = await api.put(`/restaurant/update-restaurant-details?id=${user?._id}`, payload);
      setRestaurantData(res.data.data);
      setEditingRestaurant(false);
      toast.success("Restaurant info updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRestaurant = () => {
    if (restaurantData) fillRestForm(restaurantData);
    else setRestForm(BLANK_REST);
    setEditingRestaurant(false);
  };

  /* ───── Render ───── */
  return (
    <div className="space-y-6 pb-8">

      {/* ══ 1. PROFILE SECTION ══════════════════════════════ */}
      <Section
        icon={MdPerson}
        title="Personal Profile"
        badge={
          !editingProfile ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPasswordOpen(true)}
                className="flex items-center gap-1.5 border-2 border-[var(--primary-color)] text-[var(--primary-color)] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[var(--primary-color)] hover:text-white transition-all">
                <MdOutlineLockReset className="text-sm" /> Password
              </button>
              <PrimaryBtn onClick={() => setEditingProfile(true)} icon={MdEdit}>Edit</PrimaryBtn>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <OutlineBtn onClick={handleCancelProfile} disabled={isLoading} icon={MdClose}>Cancel</OutlineBtn>
              <PrimaryBtn onClick={handleSaveProfile} disabled={isLoading} loading={isLoading} icon={MdSave}>Save</PrimaryBtn>
            </div>
          )
        }
      >
        {/* avatar + form */}
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="relative shrink-0 group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-[var(--primary-color)] shadow-lg">
              <img
                src={
                  profilePicPreview ||
                  user?.photo?.url ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "U")}&background=be1a1a&color=fff&size=128`
                }
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {editingProfile && (
              <label
                htmlFor="profilePicInput"
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <MdOutlineAddAPhoto className="text-white text-2xl" />
                <input
                  id="profilePicInput" type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) { setProfilePicPreview(URL.createObjectURL(f)); setProfilePic(f); }
                  }}
                />
              </label>
            )}
            {editingProfile && (
              <span className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-[var(--primary-color)] rounded-lg text-white shadow-md pointer-events-none">
                <MdOutlineAddAPhoto className="text-sm" />
              </span>
            )}
          </div>

          {/* Fields */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Full Name" required>
              <input
                type="text" name="fullName" value={profileForm.fullName}
                onChange={(e) => setProfileForm((p) => ({ ...p, fullName: e.target.value }))}
                disabled={!editingProfile} placeholder="Your full name"
                className={iCls(editingProfile)}
              />
            </Field>
            <Field label="Email Address">
              <div className="relative">
                <input
                  type="email" value={user?.email || ""} disabled
                  className={`${BASE_INPUT} ${DISABLED_INPUT} pr-10`}
                />
                <MdCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
              </div>
              <p className="text-[10px] text-[var(--text-light)] mt-1">Email cannot be changed</p>
            </Field>
            <Field label="Phone Number">
              <input
                type="tel" name="phone" value={profileForm.phone}
                onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))}
                disabled={!editingProfile} placeholder="+91 98765 43210"
                className={iCls(editingProfile)}
              />
            </Field>
          </div>
        </div>
      </Section>

      {/* ══ 2. RESTAURANT INFO SECTION ══════════════════════ */}
      <Section
        icon={MdRestaurant}
        title="Restaurant Details"
        badge={
          <div className="flex items-center gap-2">
            {isFetchingRestaurant && (
              <div className="w-4 h-4 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin" />
            )}
            {fetchError && !isFetchingRestaurant && (
              <button onClick={fetchRestaurantData}
                className="text-xs text-[var(--primary-color)] font-bold underline">Retry</button>
            )}
            {!editingRestaurant ? (
              <PrimaryBtn onClick={() => setEditingRestaurant(true)} icon={MdEdit}>Edit</PrimaryBtn>
            ) : (
              <>
                <OutlineBtn onClick={handleCancelRestaurant} disabled={isLoading} icon={MdClose}>Cancel</OutlineBtn>
                <PrimaryBtn onClick={handleSaveRestaurant} disabled={isLoading} loading={isLoading} icon={MdSave}>Save</PrimaryBtn>
              </>
            )}
          </div>
        }
      >
        {/* status banner */}
        {fetchError && !isFetchingRestaurant && (
          <div className="mb-4 flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-4 py-3 text-xs font-medium">
            <span>⚠</span>
            <span>{fetchError} — You can still fill in and save below.</span>
          </div>
        )}

        {/* grid of fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Field label="Restaurant Name" required>
            <input type="text" name="restaurantName" value={restForm.restaurantName}
              onChange={rc} disabled={!editingRestaurant}
              placeholder="e.g. Spice Garden" className={iCls(editingRestaurant)} />
          </Field>

          <Field label="Type">
            <select name="restaurantType" value={restForm.restaurantType}
              onChange={rc} disabled={!editingRestaurant}
              className={iCls(editingRestaurant)}>
              <option value="">Select type…</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
              <option value="jain">Jain</option>
              <option value="vegan">Vegan</option>
              <option value="both">Both</option>
            </select>
          </Field>

          <Field label="Cuisine Types">
            <input type="text" name="cuisineTypes" value={restForm.cuisineTypes}
              onChange={rc} disabled={!editingRestaurant}
              placeholder="Indian, Chinese, Italian…" className={iCls(editingRestaurant)} />
            <p className="text-[10px] text-[var(--text-light)] mt-1">Comma-separated</p>
          </Field>

          <Field label="Contact Email">
            <input type="email" name="contactEmail" value={restForm.contactEmail}
              onChange={rc} disabled={!editingRestaurant}
              placeholder="restaurant@email.com" className={iCls(editingRestaurant)} />
          </Field>

          <Field label="Contact Phone">
            <input type="tel" name="contactPhone" value={restForm.contactPhone}
              onChange={rc} disabled={!editingRestaurant}
              placeholder="+91 98765 43210" className={iCls(editingRestaurant)} />
          </Field>

          {/* time picker pair */}
          <div>
            <Label>Serving Hours</Label>
            <div className="flex items-center gap-2">
              <input type="time" name="openingTime" value={restForm.openingTime}
                onChange={rc} disabled={!editingRestaurant}
                className={iCls(editingRestaurant)} />
              <span className="text-[var(--text-light)] font-bold text-sm">–</span>
              <input type="time" name="closingTime" value={restForm.closingTime}
                onChange={rc} disabled={!editingRestaurant}
                className={iCls(editingRestaurant)} />
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <Field label="Description">
              <textarea name="description" rows={3} value={restForm.description}
                onChange={rc} disabled={!editingRestaurant}
                placeholder="Tell customers what makes your restaurant special…"
                className={`${iCls(editingRestaurant)} resize-none`} />
            </Field>
          </div>
        </div>

        {/* ── Legal sub-section ─────────────────── */}
        <div className="mt-6 pt-5 border-t-2 border-dashed border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-4">
            <MdGavel className="text-[var(--primary-color)]" />
            <span className="text-xs font-bold text-[var(--text-color)] uppercase tracking-wide">
              Legal Information
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Legal / Business Name">
              <input type="text" name="legalName" value={restForm.legalName}
                onChange={rc} disabled={!editingRestaurant}
                placeholder="Registered legal name" className={iCls(editingRestaurant)} />
            </Field>
            <Field label="Company Type">
              <input type="text" name="companyType" value={restForm.companyType}
                onChange={rc} disabled={!editingRestaurant}
                placeholder="e.g. Pvt Ltd, Sole Proprietor" className={iCls(editingRestaurant)} />
            </Field>
          </div>
        </div>
      </Section>

      {/* Password modal */}
      {isPasswordOpen && (
        <PasswordChangeModal open={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} />
      )}
    </div>
  );
};

export default RestaurantInformation;
