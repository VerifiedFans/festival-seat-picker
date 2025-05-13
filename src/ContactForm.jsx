import React, { useState, useEffect } from "react";

export default function ContactForm({ selectedSeats }) {
  // 🎟️ **Form Data State**
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vipSeats, setVipSeats] = useState([]);
  const [gaSeats, setGaSeats] = useState([]);
  const [vipTotal, setVipTotal] = useState(0);
  const [gaTotal, setGaTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // 🎯 **Handle Seat Categorization**
  useEffect(() => {
    const vip = selectedSeats.filter((seat) => seat.startsWith("10"));
    const ga = selectedSeats.filter((seat) => seat.startsWith("20"));

    setVipSeats(vip);
    setGaSeats(ga);

    const vipPrice = vip.length * 130;
    const gaPrice = ga.length * 35;

    setVipTotal(vipPrice);
    setGaTotal(gaPrice);
    setGrandTotal(vipPrice + gaPrice);
  }, [selectedSeats]);

  // 🔄 **Form Data Change Handler**
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📝 **Form Submission Logic**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/mkgrbrrb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          vipSeats: vipSeats.join(", "),
          gaSeats: gaSeats.join(", "),
          vipTotal,
          gaTotal,
          grandTotal,
        }),
      });

      if (response.ok) {
        alert("Ticket Request Submitted Successfully!");
      } else {
        throw new Error("Submission Failed");
      }
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🖌️ **Render Form**
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Your Info</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        style={inputStyle}
      />
      <textarea
        name="address"
        placeholder="Full Address"
        value={formData.address}
        onChange={handleChange}
        style={textareaStyle}
      />

      <h3>VIP Seats: {vipSeats.length} | Total: ${vipTotal}</h3>
      <p>{vipSeats.join(", ")}</p>

      <h3>GA Seats: {gaSeats.length} | Total: ${gaTotal}</h3>
      <p>{gaSeats.join(", ")}</p>

      <h3>Grand Total: ${grandTotal}</h3>

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
