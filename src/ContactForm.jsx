import React, { useState } from "react";
import "./ContactForm.css";

export default function ContactForm({ selectedSeats }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [vipSeats, setVipSeats] = useState([]);
  const [gaSeats, setGaSeats] = useState([]);
  const [vipTotal, setVipTotal] = useState(0);
  const [gaTotal, setGaTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Splitting seats into VIP and GA
  React.useEffect(() => {
    const vip = selectedSeats.filter((seat) =>
      ["101", "102", "103", "104"].some((sec) => seat.startsWith(sec))
    );
    const ga = selectedSeats.filter((seat) =>
      ["201", "202", "203", "204"].some((sec) => seat.startsWith(sec))
    );

    setVipSeats(vip);
    setGaSeats(ga);

    // VIP Pricing
    const newVipTotal = vip.length * 130;
    setVipTotal(newVipTotal);

    // GA Pricing
    const newGaTotal = ga.length * 35;
    setGaTotal(newGaTotal);

    // Grand Total
    setGrandTotal(newVipTotal + newGaTotal);
  }, [selectedSeats]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://formspree.io/f/mkgrbrrb",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          vipSeats: vipSeats.join(", "),
          gaSeats: gaSeats.join(", "),
          vipTotal: vipTotal,
          gaTotal: gaTotal,
          grandTotal: grandTotal,
        }),
      }
    );

    if (response.ok) {
      alert("Thank you! Your ticket request has been received.");
    } else {
      alert("There was a problem submitting your ticket request.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Your Info</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        type="tel"
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

      {/* Display Selected Seats and Totals */}
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <h3>🎟️ Ticket Summary</h3>
        <p>VIP Seats: {vipSeats.length} | Total: ${vipTotal}</p>
        <p>GA Seats: {gaSeats.length} | Total: ${gaTotal}</p>
        <p style={{ fontWeight: "bold" }}>Grand Total: ${grandTotal}</p>
      </div>

      <button type="submit" style={buttonStyle}>
        Submit
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
