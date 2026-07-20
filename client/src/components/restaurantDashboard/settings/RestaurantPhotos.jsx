import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineAddAPhoto, MdSave } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/api.config.js";
import toast from "react-hot-toast";

/* ─── reusable section card ─────────────────────────────────────────────── */
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

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const RestaurantPhotos = () => {
  const { user } = useAuth();

  const MAX_FILE_SIZE = 1024 * 1024; // 1 MB
  const MAX_GALLERY = 8;

  /* fetch state */
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);

  /* existing server images */
  const [existingCoverUrl, setExistingCoverUrl] = useState("");
  const [existingGalleryUrls, setExistingGalleryUrls] = useState([]);

  /* local new files */
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  /* errors */
  const [errors, setErrors] = useState({ cover: "", gallery: "" });

  /* ── fetch ──────────────────────────────────────────────────────────── */
  const fetchRestaurantData = async () => {
    if (!user?._id) return;
    try {
      setIsFetchLoading(true);
      const res = await api.get(`/restaurant/get-resturant-data?id=${user._id}`);
      setRestaurantData(res.data.data);
    } catch {
      /* silently ignore — user can still upload */
    } finally {
      setIsFetchLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchRestaurantData();
  }, [user?._id]);

  useEffect(() => {
    if (!restaurantData) return;
    setExistingCoverUrl(
      restaurantData?.coverImage?.url || restaurantData?.coverImage || ""
    );
    setExistingGalleryUrls(restaurantData?.galleryImages || restaurantData?.gallery || []);
  }, [restaurantData]);

  /* ── local previews ─────────────────────────────────────────────────── */
  const coverPreview = useMemo(
    () => (coverFile ? URL.createObjectURL(coverFile) : ""),
    [coverFile]
  );

  const galleryPreviews = useMemo(
    () =>
      galleryFiles.map((f) => ({
        file: f,
        url: URL.createObjectURL(f),
        key: `${f.name}-${f.lastModified}`,
      })),
    [galleryFiles]
  );

  useEffect(() => () => { if (coverPreview) URL.revokeObjectURL(coverPreview); }, [coverPreview]);
  useEffect(
    () => () => { galleryPreviews.forEach((p) => URL.revokeObjectURL(p.url)); },
    [galleryPreviews]
  );

  /* ── handlers ───────────────────────────────────────────────────────── */
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) { setCoverFile(null); return; }
    if (file.size >= MAX_FILE_SIZE) {
      setErrors((p) => ({ ...p, cover: "Cover must be under 1 MB." }));
      e.target.value = "";
      return;
    }
    setCoverFile(file);
    setErrors((p) => ({ ...p, cover: "" }));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const oversized = files.some((f) => f.size >= MAX_FILE_SIZE);
    if (oversized) {
      setErrors((p) => ({ ...p, gallery: "Each image must be under 1 MB." }));
      e.target.value = "";
      return;
    }

    const total = existingGalleryUrls.length + galleryFiles.length;
    if (total + files.length > MAX_GALLERY) {
      setErrors((p) => ({
        ...p,
        gallery: `You can have at most ${MAX_GALLERY} gallery images.`,
      }));
      return;
    }

    setGalleryFiles((prev) => [...prev, ...files]);
    setErrors((p) => ({ ...p, gallery: "" }));
    e.target.value = "";
  };

  const removeExistingGallery = (url) =>
    setExistingGalleryUrls((prev) => prev.filter((u) => u !== url));

  const removeLocalGallery = (idx) =>
    setGalleryFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const fd = new FormData();
      if (coverFile) fd.append("coverImage", coverFile);
      galleryFiles.forEach((f) => fd.append("galleryImages", f));
      fd.append("existingGalleryUrls", JSON.stringify(existingGalleryUrls));
      fd.append("existingCoverUrl", existingCoverUrl);

      const res = await api.put(
        `/restaurant/update-restaurant-photos?id=${user?._id}`,
        fd
      );
      setRestaurantData(res.data.data);
      setCoverFile(null);
      setGalleryFiles([]);
      toast.success("Photos updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save photos");
    } finally {
      setIsSaving(false);
    }
  };

  const totalGallery = existingGalleryUrls.length + galleryFiles.length;
  const activeCover = coverPreview || existingCoverUrl;

  /* ── render ─────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-color)] pb-3 gap-3">
        <div>
          <h3 className="font-bold text-base text-[var(--primary-color)]">Restaurant Gallery</h3>
          <p className="text-xs text-[var(--text-light)] mt-0.5">
            Upload a cover photo and up to {MAX_GALLERY} gallery images
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving || (!coverFile && !galleryFiles.length && !existingCoverUrl && !existingGalleryUrls.length)}
          className="flex items-center gap-1.5 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 disabled:opacity-40">
          <MdSave /> {isSaving ? "Saving…" : "Save Photos"}
        </button>
      </div>

      {isFetchLoading && (
        <div className="flex items-center gap-2 text-xs text-[var(--text-light)] bg-[var(--background-color)] px-3 py-2 rounded-lg border border-[var(--border-color)]">
          <div className="w-4 h-4 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin" />
          Loading existing photos…
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-6 items-start">

        {/* ── COVER PHOTO ─────────────────────────────────────────────── */}
        <SectionCard>
          <SectionHeader title="Cover Photo" subtitle="Main banner image (max 1 MB)">
            <span className="text-[11px] bg-[var(--accent-color)] text-[var(--text-color)] px-2 py-1 rounded-full font-semibold">
              1 photo
            </span>
          </SectionHeader>

          {/* upload button */}
          <div className="border border-dashed border-[var(--border-color)] bg-[var(--background-color)] rounded-lg p-4 flex flex-col items-center gap-2">
            <label
              htmlFor="coverInput"
              className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer hover:opacity-90">
              <MdOutlineAddAPhoto />
              {activeCover ? "Change Cover" : "Upload Cover"}
            </label>
            <input id="coverInput" type="file" accept="image/*"
              onChange={handleCoverChange} className="hidden" />
            <p className="text-xs text-[var(--text-light)] text-center">
              JPG, PNG, WEBP · Max 1 MB · Landscape preferred
            </p>
            {errors.cover && <p className="text-xs text-red-500">{errors.cover}</p>}
          </div>

          {/* preview */}
          {activeCover ? (
            <div className="rounded-lg overflow-hidden border border-[var(--border-color)] shadow-sm">
              <img src={activeCover} alt="Cover" className="w-full h-44 object-cover" />
              <div className="flex items-center justify-between px-3 py-2 bg-[var(--background-color)] text-xs">
                <span className="text-[var(--text-color)] font-medium truncate max-w-[200px]">
                  {coverFile ? coverFile.name : "Active Cover"}
                </span>
                {coverFile && (
                  <button onClick={() => setCoverFile(null)}
                    className="text-red-500 hover:text-red-700 font-semibold ml-2">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-[var(--border-color)] bg-[var(--background-color)] rounded-lg py-8 text-center">
              <MdOutlineAddAPhoto className="mx-auto text-3xl text-[var(--text-light)] mb-2" />
              <p className="text-xs text-[var(--text-light)]">No cover photo yet</p>
            </div>
          )}
        </SectionCard>

        {/* ── GALLERY ─────────────────────────────────────────────────── */}
        <SectionCard>
          <SectionHeader
            title="Gallery Photos"
            subtitle={`Additional restaurant photos (${totalGallery}/${MAX_GALLERY})`}>
            <label
              htmlFor="galleryInput"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                totalGallery >= MAX_GALLERY
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[var(--primary-color)] text-white cursor-pointer hover:opacity-90"
              }`}>
              <MdOutlineAddAPhoto />
              Add Images
              <input id="galleryInput" type="file" accept="image/*" multiple
                onChange={handleGalleryChange}
                disabled={totalGallery >= MAX_GALLERY}
                className="hidden" />
            </label>
          </SectionHeader>

          {errors.gallery && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {errors.gallery}
            </p>
          )}

          {totalGallery > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {/* existing server images */}
              {existingGalleryUrls.map((url, i) => (
                <div key={`server-${i}`}
                  className="rounded-lg overflow-hidden border border-[var(--border-color)] bg-[var(--background-color)] relative shadow-sm group">
                  <img src={url} alt={`Gallery ${i + 1}`} className="h-28 w-full object-cover" />
                  <button
                    onClick={() => removeExistingGallery(url)}
                    className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-white/90 text-red-500 shadow flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                    <IoMdClose />
                  </button>
                  <div className="px-2 py-1 text-[10px] text-center text-[var(--text-light)]">
                    Active
                  </div>
                </div>
              ))}

              {/* local pending previews */}
              {galleryPreviews.map((p, i) => (
                <div key={p.key}
                  className="rounded-lg overflow-hidden border-2 border-dashed border-[var(--secondary-color)] bg-[var(--background-color)] relative shadow-sm">
                  <img src={p.url} alt={`New ${i + 1}`} className="h-28 w-full object-cover" />
                  <button
                    onClick={() => removeLocalGallery(i)}
                    className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-white/90 text-red-500 shadow flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                    <IoMdClose />
                  </button>
                  <div className="px-2 py-1 text-[10px] text-center text-[var(--secondary-color)] font-semibold">
                    Pending
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[var(--border-color)] bg-[var(--background-color)] rounded-lg py-12 text-center">
              <MdOutlineAddAPhoto className="mx-auto text-3xl text-[var(--text-light)] mb-2" />
              <p className="text-xs text-[var(--text-light)]">No gallery photos added yet</p>
              <p className="text-[11px] text-[var(--text-light)] mt-1">
                Upload up to {MAX_GALLERY} photos to showcase your restaurant
              </p>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
};

export default RestaurantPhotos;
