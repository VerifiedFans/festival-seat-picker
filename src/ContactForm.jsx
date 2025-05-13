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
      ["101", "102", "103", "104"].some((sec) => seat.startsWith(sec))
    );
    const ga = selectedSeats.filter((seat) =>
      ["201", "202", "203", "204"].some((sec) => seat.startsWith(sec))
    );

    setVipSeats(vip);
    setGaSeats(ga);
    setVipTotal(vip.length * 130);
    setGaTotal(ga.length * 35);
    setGrandTotal(vip.length * 130 + ga.length * 35);
  }, [selectedSeats]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Form submitted with data: " + JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Your Info</h2>
      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
      <input name="address" placeholder="Full Address" onChange={handleChange} required />
      <div>
        <p>VIP Seats: {vipSeats.length} | Total: ${vipTotal}</p>
        <p>GA Seats: {gaSeats.length} | Total: ${gaTotal}</p>
        <p>Grand Total: ${grandTotal}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
