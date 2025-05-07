import React, { useState } from "react";

export default function ContactForm({ selectedSeats, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "" // 🔥 Honeypot field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, phone, address, website } = formData;

    // 🐝 🔥 Honeypot Check
    if (website) {
      console.warn("Bot detected — honeypot field was filled out.");
      setError("Submission failed. Try again.");
      setLoading(false);
      return;
    }

    if (!name || !email || !phone || !address) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/mkgrbrrb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          seats: selectedSeats.join(", "),
        }),
      });

      const data = await response.json();

      if (data.ok) {
        onSuccess();
      } else {
        throw new Error("Formspree submission failed");
      }
    } catch (err) {
      console.error("Form error:", err);
      setError("Submission failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Your Info</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔥 Honeypot Field (Invisible to users, bots will fill it out) */}
      <input
        name="website"
        type="text"
        value={formData.website}
        onChange={handleChange}
        style={{ display: "none" }}
        autoComplete="off"
      />

      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <textarea
        name="address"
        placeholder="Full Address"
        value={formData.address}
        onChange={handleChange}
        required
        style={textareaStyle}
      />

      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: 12,
  padding: 10,
  fontSize: "1rem",
};

const textareaStyle = {
  ...inputStyle,
  height: 80,
};

const buttonStyle = {
  padding: "0.5rem 1.5rem",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 4,
  width: "100%",
  fontSize: "1rem",
};
