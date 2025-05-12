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

  // ✅ Detect if seats are VIP or GA and separate them
  useEffect(() => {
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

    setVipSeats(vip);
    setGaSeats(ga);

    // ✅ Calculate Prices
    setTotalVipPrice(vip.length * 130); // $130 per VIP seat
    setTotalGaPrice(0); // Start with $0 for GA
  }, [selectedSeats]);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Day Selection Logic
  const handleDayChange = (event) => {
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
        setTotalGaPrice(35 * updatedDays.length * gaSeats.length);
      }
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      seats: selectedSeats.join(", "),
      days: selectedDays.join(", "),
      total_vip_price: totalVipPrice,
      total_ga_price: totalGaPrice,
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

      {gaSeats.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <h3>🎟️ General Admission Days</h3>
          <label>
            <input
              type="checkbox"
              value="Thursday"
              onChange={handleDayChange}
              checked={selectedDays.includes("Thursday")}
              disabled={allDays}
            />
            Thursday ($35 per seat)
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Friday"
              onChange={handleDayChange}
              checked={selectedDays.includes("Friday")}
              disabled={allDays}
            />
            Friday ($35 per seat)
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="Saturday"
              onChange={handleDayChange}
              checked={selectedDays.includes("Saturday")}
              disabled={allDays}
            />
            Saturday ($35 per seat)
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="all"
              onChange={handleDayChange}
              checked={allDays}
            />
            3-Night General Admission Special ($100 per seat)
          </label>
        </div>
      )}

      <div style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
        <strong>VIP Total Price:</strong> ${totalVipPrice}
        <br />
        <strong>GA Total Price:</strong> ${totalGaPrice}
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
