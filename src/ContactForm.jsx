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
  const [warning, setWarning] = useState("");

  /**
   * 🚀 **Debugging Logs:** Added logs to monitor the flow of seat selection and price calculations.
   */
  useEffect(() => {
    console.log("🚀 Selected Seats Received in ContactForm:", selectedSeats);

    // ✅ Properly clear if no seats are selected
    if (!selectedSeats || selectedSeats.length === 0) {
      console.log("No seats selected, clearing state.");
      setVipSeats([]);
      setGaSeats([]);
      setTotalVipPrice(0);
      setTotalGaPrice(0);
      return;
    }

    // ✅ Separate VIP and GA seats every time `selectedSeats` changes
    const vip = selectedSeats.filter(
      (seat) =>
        seat.includes("101") ||
        seat.includes("102") ||
        seat.includes("103") ||
        seat.includes("104")
    );

    const ga = selectedSeats.filter(
      (seat) =>
        !seat.includes("101") &&
        !seat.includes("102") &&
        !seat.includes("103") &&
        !seat.includes("104")
    );

    console.log("🎯 VIP Seats Found:", vip);
    console.log("🎯 GA Seats Found:", ga);

    setVipSeats(vip);
    setGaSeats(ga);

    // ✅ Calculate Prices
    setTotalVipPrice(vip.length * 130); // $130 per VIP seat
    setTotalGaPrice(0); // Start with $0 for GA

    console.log("✅ Total VIP Price:", vip.length * 130);
    console.log("✅ Total GA Price (initial):", 0);
  }, [selectedSeats]);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Day Selection Logic
  const handleDayChange = (event) => {
    if (gaSeats.length === 0) {
      setWarning("You must select GA seats to pick days!");
      event.target.checked = false;
      return;
    } else {
      setWarning("");
    }

    const { value, checked } = event.target;

    if (value === "all") {
      if (checked) {
        setAllDays(true);
        setSelectedDays(["Thursday", "Friday", "Saturday"]);
        setTotalGaPrice(100 * gaSeats.length); // $100 per seat for all 3 days
      } else {
        setAllDays(false);
        setSelectedDays([]);
        setTotalGaPrice(0);
      }
    } else {
      const updatedDays = checked
        ? [...selectedDays, value]
        : selectedDays.filter((day) => day !== value);

      if (updatedDays.length === 3) {
        setAllDays(true);
        setSelectedDays(["Thursday", "Friday", "Saturday"]);
        setTotalGaPrice(100 * gaSeats.length);
      } else {
        setAllDays(false);
        setSelectedDays(updatedDays);
        // ✅ Corrected price calculation
        setTotalGaPrice(35 * gaSeats.length * updatedDays.length);
      }
    }
    console.log("✅ Updated Days:", selectedDays);
    console.log("✅ Updated GA Price:", totalGaPrice);
  };

  // ✅ Grand Total Calculation
  const grandTotal = totalVipPrice + totalGaPrice;

  // ✅ Handle form submission
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

    try {
      const response = await fetch("https://formspree.io/f/mkgrbrrb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        onConfirm();
      } else {
        alert("There was an error. Please try again.");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  // ✅ Add missing styles
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

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Your Info</h2>

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

      <div style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
        <strong>VIP Seats: {vipSeats.length} | Total: </strong> ${totalVipPrice}
        <br />
        <strong>GA Seats: {gaSeats.length} | Total: </strong> ${totalGaPrice}
        <hr />
        <strong>Grand Total: </strong> ${grandTotal}
      </div>

      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
}
