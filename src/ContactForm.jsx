import React, { useState, useEffect } from "react";

export default function ContactForm({ selectedSeats, onConfirm }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [vipSeats, setVipSeats] = useState([]);
  const [gaSeats, setGaSeats] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [totalVipPrice, setTotalVipPrice] = useState(0);
  const [totalGaPrice, setTotalGaPrice] = useState(0);
  const [allDays, setAllDays] = useState(false);

  useEffect(() => {
    if (!selectedSeats || selectedSeats.length === 0) {
      console.log("No seats selected, clearing state.");
      setVipSeats([]);
      setGaSeats([]);
      setTotalVipPrice(0);
      setTotalGaPrice(0);
      return;
    }

    const vip = selectedSeats.filter((seat) =>
      ["101", "102", "103", "104"].some((sec) => seat.includes(sec))
    );
    const ga = selectedSeats.filter(
      (seat) => !["101", "102", "103", "104"].some((sec) => seat.includes(sec))
    );

    setVipSeats(vip);
    setGaSeats(ga);
    setTotalVipPrice(vip.length * 130);
    setTotalGaPrice(0);
  }, [selectedSeats]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDayChange = (event) => {
    const { value, checked } = event.target;

    if (value === "all") {
      setAllDays(checked);
      setSelectedDays(checked ? ["Thursday", "Friday", "Saturday"] : []);
      setTotalGaPrice(checked ? 100 * gaSeats.length : 0);
    } else {
      const updatedDays = checked
        ? [...selectedDays, value]
        : selectedDays.filter((day) => day !== value);

      setAllDays(updatedDays.length === 3);
      setSelectedDays(updatedDays);
      setTotalGaPrice(35 * gaSeats.length * updatedDays.length);
    }
  };

  const grandTotal = totalVipPrice + totalGaPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      seats: selectedSeats.join(", "),
      days: selectedDays.join(", "),
      total_vip_price: totalVipPrice,
      total_ga_price: totalGaPrice,
      grand_total: grandTotal,
    };

    await fetch("https://formspree.io/f/mkgrbrrb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />
      <textarea
        name="address"
        placeholder="Full Address"
        value={formData.address}
        onChange={handleChange}
      />

      <div>
        <strong>VIP Seats: {vipSeats.length} | Total: </strong> ${totalVipPrice}
        <br />
        <strong>GA Seats: {gaSeats.length} | Total: </strong> ${totalGaPrice}
        <br />
        <strong>Grand Total: </strong> ${grandTotal}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
