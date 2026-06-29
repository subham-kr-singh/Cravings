import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import api from "../config/api.config";

const Contact = () => {
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: contactData.fullName,
      email: contactData.email.toLowerCase(),
      phone: contactData.phone,
      subject: contactData.subject,
      message: contactData.message,
    };

    try {
      const res = await api.post("/public/contact", payload);

      alert(res.data.message || "Message sent successfully!");

      setContactData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section className="min-h-screen bg-(--background-color) py-20 px-5">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-(--primary-color)">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-(--text-light)">
            Have a question, feedback, or need assistance? We'd love to hear
            from you. Fill out the form below and we'll get back to you as soon
            as possible.
          </p>
        </div>

        <div className="grid gap-10 grid-cols-2">
          {/* Left Side */}
          <div className="rounded-3xl bg-(--surface-color) p-10 shadow-lg">
            <h2 className="mb-4 text-3xl font-bold text-(--primary-color)">
              Get In Touch
            </h2>

            <p className="mb-10 leading-7 text-(--text-light)">
              Our team is always ready to help. Reach us through any of the
              following methods or simply send us a message using the contact
              form.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--primary-color) text-white">
                  <FaEnvelope size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-(--text-color)">Email</h3>
                  <p className="text-(--text-light)">support@craving.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--primary-color) text-white">
                  <FaPhoneAlt size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-(--text-color)">Phone</h3>
                  <p className="text-(--text-light)">+91 98765 xxxxx</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--primary-color) text-white">
                  <FaMapMarkerAlt size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-(--text-color)">Address</h3>
                  <p className="text-(--text-light)">Bhopal, Madhya Pradesh</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--primary-color) text-white">
                  <FaClock size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-(--text-color)">
                    Working Hours
                  </h3>
                  <p className="text-(--text-light)">
                    Monday - Saturday
                    <br />
                    9:00 AM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="mb-8 text-3xl font-bold text-(--primary-color)">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block font-medium text-(--text-color)">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={contactData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-(--border-color) px-4 py-3 text-(--text-color) outline-none transition-all focus:border-(--primary-color) focus:ring-2 focus:ring-(--accent-color)"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-(--text-color)">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-(--border-color) px-4 py-3 text-(--text-color) outline-none transition-all focus:border-(--primary-color) focus:ring-2 focus:ring-(--accent-color)"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-(--text-color)">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={contactData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-(--border-color) px-4 py-3 text-(--text-color) outline-none transition-all focus:border-(--primary-color) focus:ring-2 focus:ring-(--accent-color)"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-(--text-color)">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={contactData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-(--border-color) px-4 py-3 text-(--text-color) outline-none transition-all focus:border-(--primary-color) focus:ring-2 focus:ring-(--accent-color)"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-(--text-color)">
                  Message
                </label>

                <textarea
                  rows={5}
                  name="message"
                  value={contactData.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-xl border border-(--border-color) px-4 py-3 text-(--text-color) outline-none transition-all focus:border-(--primary-color) focus:ring-2 focus:ring-(--accent-color)"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-(--primary-color) py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-(--secondary-color)">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
