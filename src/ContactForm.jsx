import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    const vip = selectedSeats.filter((seat) =>
      ["101", "102", "103", "104"].some((section) => seat.startsWith(section))
    );
    const ga = selectedSeats.filter((seat) =>
      ["201", "202", "203", "204"].some((section) => seat.startsWith(section))
    );

    setVipSeats(vip);
    setGaSeats(ga);

    // Calculate VIP Total
    const vipPrice = vip.length * 130;
    setVipTotal(vipPrice);

    // Calculate GA Total
    const gaPrice = ga.length * 35;
    setGaTotal(gaPrice);

    // Calculate Grand Total
    setGrandTotal(vipPrice + gaPrice);
  }, [selectedSeats]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your submission, ${formData.name}!`);
    // Here you would integrate with Formspree or another backend API
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Your Info</h2>

      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <textarea
        name="address"
        placeholder="Full Address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <div style={{ marginTop: 20 }}>
        <h3>🟢 VIP Seats:</h3>
        <p>
          {vipSeats.length} selected | Total: ${vipTotal}
        </p>
        <p>{vipSeats.join(", ")}</p>

        <h3>🔵 GA Seats:</h3>
        <p>
          {gaSeats.length} selected | Total: ${gaTotal}
        </p>
        <p>{gaSeats.join(", ")}</p>

        <h3>💲 Grand Total: ${grandTotal}</h3>
      </div>

      <button type="submit" style={{ marginTop: 20 }}>
        Submit
      </button>
    </form>
  );
}
