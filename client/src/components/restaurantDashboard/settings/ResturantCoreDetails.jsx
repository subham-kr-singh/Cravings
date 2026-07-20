import React, { useState, useEffect } from "react";
import { MdEdit, MdSave, MdClose, MdAdd, MdDelete } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/api.config.js";
import toast from "react-hot-toast";

/* ─── style helpers (same vars as index.css) ───────────────────────────── */
const fieldBase =
  "w-full px-3 py-2 text-sm rounded-lg border outline-none transition-all duration-200 text-[var(--text-color)]";
const fieldActive =
  "border-[var(--secondary-color)] bg-white focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20";
const fieldDisabled =
  "border-[var(--border-color)] bg-[var(--background-color)] cursor-not-allowed opacity-70";

const inputCls = (editing) => `${fieldBase} ${editing ? fieldActive : fieldDisabled}`;

/* ─── reusable components ───────────────────────────────────────────────── */
const SectionCard = ({ children }) => (
  <div className="bg-white rounded-xl border border-[var(--border-color)] shadow-sm p-5 space-y-4">
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-color)] pb-3 gap-2">
    <div>
      <h3 className="font-bold text-base text-[var(--primary-color)]">{title}</h3>
      {subtitle && <p className="text-xs text-[var(--text-light)] mt-0.5">{subtitle}</p>}
    </div>
    <div>{children}</div>
  </div>
);

const SaveCancelBtns = ({ onSave, onCancel, isLoading }) => (
  <div className="flex gap-2">
    <button onClick={onSave} disabled={isLoading}
      className="flex items-center gap-1.5 bg-[var(--primary-color)] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 disabled:opacity-50">
      <MdSave /> {isLoading ? "Saving…" : "Save"}
    </button>
    <button onClick={onCancel} disabled={isLoading}
      className="flex items-center gap-1.5 border border-[var(--border-color)] text-[var(--text-color)] px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-[var(--surface-color)]">
      <MdClose /> Cancel
    </button>
  </div>
);

const EditBtn = ({ onClick, label = "Edit" }) => (
  <button onClick={onClick}
    className="flex items-center gap-1.5 bg-[var(--primary-color)] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90">
    <MdEdit /> {label}
  </button>
);

const Field = ({ label, children, span }) => (
  <div className={span}>
    <label className="block text-xs font-semibold text-[var(--text-color)] mb-1">{label}</label>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const ResturantCoreDetails = () => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  const [isFetchingRestaurant, setIsFetchingRestaurant] = useState(false);
  const [fetchError, setFetchError] = useState("");

  /* shared edit flags */
  const [editingAddress, setEditingAddress] = useState(false);
  const [editingBanking, setEditingBanking] = useState(false);
  const [editingSocial, setEditingSocial] = useState(false);

  /* ── Address form ─────────────────────────────────────────────────────── */
  const blankAddress = { address: "", city: "", state: "", pinCode: "", country: "", geoLat: "", geoLon: "" };
  const [addressForm, setAddressForm] = useState(blankAddress);

  /* ── Banking form ─────────────────────────────────────────────────────── */
  const blankBanking = { bankName: "", accountNumber: "", ifscCode: "", panCard: "", gst: "", fssai: "" };
  const [bankingForm, setBankingForm] = useState(blankBanking);

  /* ── Social links ─────────────────────────────────────────────────────── */
  const [socialLinks, setSocialLinks] = useState([]);

  /* ── fill forms from fetched data ─────────────────────────────────────── */
  const fillForms = (data) => {
    setAddressForm({
      address: data?.address || "",
      city: data?.city || "",
      state: data?.state || "",
      pinCode: data?.pinCode || "",
      country: data?.country || "",
      geoLat: data?.geoLocation?.lat || "",
      geoLon: data?.geoLocation?.lon || "",
    });
    setBankingForm({
      bankName: data?.bankDetails?.bankName || "",
      accountNumber: data?.bankDetails?.accountNumber || "",
      ifscCode: data?.bankDetails?.ifscCode || "",
      panCard: data?.bankDetails?.panCard || "",
      gst: data?.bankDetails?.gst || "",
      fssai: data?.bankDetails?.fssai || "",
    });
    setSocialLinks(data?.socialMediaLinks || []);
  };

  useEffect(() => {
    if (restaurantData) fillForms(restaurantData);
  }, [restaurantData]);

  const fetchRestaurantData = async () => {
    if (!user?._id) return;
    try {
      setIsFetchingRestaurant(true);
      setFetchError("");
      const res = await api.get(`/restaurant/get-resturant-data?id=${user._id}`);
      setRestaurantData(res.data.data);
    } catch (err) {
      setFetchError(err.response?.data?.message || "Failed to fetch restaurant data.");
    } finally {
      setIsFetchingRestaurant(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchRestaurantData();
  }, [user?._id]);

  /* ── save helpers ─────────────────────────────────────────────────────── */
  const handleSaveAddress = async () => {
    try {
      setIsLoading(true);
      const payload = {
        address: addressForm.address,
        city: addressForm.city,
        state: addressForm.state,
        pinCode: addressForm.pinCode,
        country: addressForm.country,
        geoLocation: { lat: Number(addressForm.geoLat) || 0, lon: Number(addressForm.geoLon) || 0 },
      };
      const res = await api.put(`/restaurant/update-restaurant-details?id=${user?._id}`, payload);
      setRestaurantData(res.data.data);
      setEditingAddress(false);
      toast.success("Address updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAddress = () => {
    if (restaurantData) fillForms(restaurantData);
    else setAddressForm(blankAddress);
    setEditingAddress(false);
  };

  const handleSaveBanking = async () => {
    try {
      setIsLoading(true);
      const payload = { bankDetails: { ...bankingForm } };
      const res = await api.put(`/restaurant/update-restaurant-details?id=${user?._id}`, payload);
      setRestaurantData(res.data.data);
      setEditingBanking(false);
      toast.success("Banking details updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update banking details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBanking = () => {
    if (restaurantData) fillForms(restaurantData);
    else setBankingForm(blankBanking);
    setEditingBanking(false);
  };

  const handleSaveSocial = async () => {
    try {
      setIsLoading(true);
      const res = await api.put(`/restaurant/update-restaurant-details?id=${user?._id}`, { socialMediaLinks: socialLinks });
      setRestaurantData(res.data.data);
      setEditingSocial(false);
      toast.success("Social links updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update social links");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSocial = () => {
    setSocialLinks(restaurantData?.socialMediaLinks || []);
    setEditingSocial(false);
  };

  /* ─── render ─────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">

      {/* fetch status */}
      {isFetchingRestaurant && (
        <div className="flex items-center gap-2 text-xs text-[var(--text-light)] bg-[var(--background-color)] px-3 py-2 rounded-lg border border-[var(--border-color)]">
          <div className="w-4 h-4 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin" />
          Loading saved data…
        </div>
      )}
      {fetchError && !isFetchingRestaurant && (
        <div className="flex items-center justify-between text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
          <span>{fetchError} — You can still fill the form and save.</span>
          <button onClick={fetchRestaurantData} className="underline font-semibold ml-2">Retry</button>
        </div>
      )}

      {/* ── ADDRESS ─────────────────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeader title="Location & Address" subtitle="Physical location of your restaurant">
          {!editingAddress
            ? <EditBtn onClick={() => setEditingAddress(true)} />
            : <SaveCancelBtns onSave={handleSaveAddress} onCancel={handleCancelAddress} isLoading={isLoading} />
          }
        </SectionHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Street Address" span="sm:col-span-2 md:col-span-2">
            <input type="text" name="address" value={addressForm.address}
              onChange={(e) => setAddressForm(p => ({ ...p, address: e.target.value }))}
              disabled={!editingAddress} placeholder="123 Main Street, Area"
              className={inputCls(editingAddress)} />
          </Field>
          <Field label="City">
            <input type="text" name="city" value={addressForm.city}
              onChange={(e) => setAddressForm(p => ({ ...p, city: e.target.value }))}
              disabled={!editingAddress} placeholder="Mumbai"
              className={inputCls(editingAddress)} />
          </Field>
          <Field label="State / Province">
            <input type="text" name="state" value={addressForm.state}
              onChange={(e) => setAddressForm(p => ({ ...p, state: e.target.value }))}
              disabled={!editingAddress} placeholder="Maharashtra"
              className={inputCls(editingAddress)} />
          </Field>
          <Field label="Pin / Zip Code">
            <input type="text" name="pinCode" value={addressForm.pinCode}
              onChange={(e) => setAddressForm(p => ({ ...p, pinCode: e.target.value }))}
              disabled={!editingAddress} placeholder="400001"
              className={inputCls(editingAddress)} />
          </Field>
          <Field label="Country">
            <input type="text" name="country" value={addressForm.country}
              onChange={(e) => setAddressForm(p => ({ ...p, country: e.target.value }))}
              disabled={!editingAddress} placeholder="India"
              className={inputCls(editingAddress)} />
          </Field>
        </div>

        {/* geo coordinates */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Latitude (GPS)">
            <input type="text" name="geoLat" value={addressForm.geoLat}
              onChange={(e) => setAddressForm(p => ({ ...p, geoLat: e.target.value }))}
              disabled={!editingAddress} placeholder="e.g. 28.6139"
              className={inputCls(editingAddress)} />
          </Field>
          <Field label="Longitude (GPS)">
            <input type="text" name="geoLon" value={addressForm.geoLon}
              onChange={(e) => setAddressForm(p => ({ ...p, geoLon: e.target.value }))}
              disabled={!editingAddress} placeholder="e.g. 77.2090"
              className={inputCls(editingAddress)} />
          </Field>
        </div>
      </SectionCard>

      {/* ── BANKING & DOCUMENTS ────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeader title="Banking & Documents" subtitle="Financial and regulatory details">
          {!editingBanking
            ? <EditBtn onClick={() => setEditingBanking(true)} />
            : <SaveCancelBtns onSave={handleSaveBanking} onCancel={handleCancelBanking} isLoading={isLoading} />
          }
        </SectionHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Field label="Bank Name">
            <input type="text" name="bankName" value={bankingForm.bankName}
              onChange={(e) => setBankingForm(p => ({ ...p, bankName: e.target.value }))}
              disabled={!editingBanking} placeholder="State Bank of India"
              className={inputCls(editingBanking)} />
          </Field>
          <Field label="Account Number">
            <input type="text" name="accountNumber" value={bankingForm.accountNumber}
              onChange={(e) => setBankingForm(p => ({ ...p, accountNumber: e.target.value }))}
              disabled={!editingBanking} placeholder="1234 5678 9012"
              className={inputCls(editingBanking)} />
          </Field>
          <Field label="IFSC / Routing Code">
            <input type="text" name="ifscCode" value={bankingForm.ifscCode}
              onChange={(e) => setBankingForm(p => ({ ...p, ifscCode: e.target.value }))}
              disabled={!editingBanking} placeholder="SBIN0001234"
              className={inputCls(editingBanking)} />
          </Field>
          <Field label="PAN Card Number">
            <input type="text" name="panCard" value={bankingForm.panCard}
              onChange={(e) => setBankingForm(p => ({ ...p, panCard: e.target.value }))}
              disabled={!editingBanking} placeholder="ABCDE1234F"
              className={inputCls(editingBanking)} />
          </Field>
          <Field label="GST Number">
            <input type="text" name="gst" value={bankingForm.gst}
              onChange={(e) => setBankingForm(p => ({ ...p, gst: e.target.value }))}
              disabled={!editingBanking} placeholder="27ABCDE1234F1Z5"
              className={inputCls(editingBanking)} />
          </Field>
          <Field label="FSSAI License Code">
            <input type="text" name="fssai" value={bankingForm.fssai}
              onChange={(e) => setBankingForm(p => ({ ...p, fssai: e.target.value }))}
              disabled={!editingBanking} placeholder="12345678901234"
              className={inputCls(editingBanking)} />
          </Field>
        </div>
      </SectionCard>

      {/* ── SOCIAL MEDIA LINKS ─────────────────────────────────────────── */}
      <SectionCard>
        <SectionHeader title="Social Media Links" subtitle="Connect your social presence">
          {!editingSocial ? (
            <EditBtn onClick={() => setEditingSocial(true)} />
          ) : (
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setSocialLinks(p => [...p, { platform: "", url: "" }])}
                className="flex items-center gap-1 text-xs bg-[var(--accent-color)] text-[var(--text-color)] px-3 py-1.5 rounded-lg font-semibold hover:opacity-90">
                <MdAdd /> Add Link
              </button>
              <SaveCancelBtns onSave={handleSaveSocial} onCancel={handleCancelSocial} isLoading={isLoading} />
            </div>
          )}
        </SectionHeader>

        {socialLinks.length === 0 ? (
          <p className="text-xs text-[var(--text-light)] py-4 text-center italic border border-dashed border-[var(--border-color)] rounded-lg">
            No social media links added yet.
            {!editingSocial && <span className="ml-1">Click <strong>Edit</strong> to add.</span>}
          </p>
        ) : (
          <div className="space-y-3">
            {socialLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-3 bg-[var(--background-color)] p-3 rounded-lg border border-[var(--border-color)]">
                <input
                  type="text" placeholder="Platform (e.g. Instagram)"
                  value={link.platform}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[i] = { ...updated[i], platform: e.target.value };
                    setSocialLinks(updated);
                  }}
                  disabled={!editingSocial}
                  className={`${inputCls(editingSocial)} flex-1`}
                />
                <input
                  type="url" placeholder="https://..."
                  value={link.url}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[i] = { ...updated[i], url: e.target.value };
                    setSocialLinks(updated);
                  }}
                  disabled={!editingSocial}
                  className={`${inputCls(editingSocial)} flex-[2]`}
                />
                {editingSocial && (
                  <button
                    onClick={() => setSocialLinks(p => p.filter((_, idx) => idx !== i))}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                    <MdDelete className="text-base" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default ResturantCoreDetails;
