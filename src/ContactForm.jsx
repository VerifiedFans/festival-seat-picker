import React, { useState, useEffect } from "react";

export default function ContactForm({ selectedSeats, onConfirm }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [ticketType, setTicketType] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allDays, setAllDays] = useState(false);

  // 📝 Detect if seats are VIP or GA
  useEffect(() => {
    if (
      selectedSeats.some(
        (seat) =>
          seat.includes("101") ||
          seat.includes("102") ||
          seat.includes("103") ||
          seat.includes("104")
      )
    ) {
      setTicketType("VIP");
      setTotalPrice(130 * selectedSeats.length);
    } else {
      setTicketType("GA");
      setTotalPrice(0); // Reset for GA
    }
  }, [selectedSeats]);

  // 📝 Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📝 Handle Day Selection (Fixed Logic)
  const handleDayChange = (event) => {
    const { value, checked } = event.target;

    if (value === "all") {
      if (checked) {
        setAllDays(true);
        setSelectedDays(["Thursday", "Friday", "Saturday"]);
        setTotalPrice(100 * selectedSeats.length);
      } else {
        setAllDays(false);
        setSelectedDays([]);
        setTotalPrice(0);
      }
    } else {
      // Toggle the day in the array
      const updatedDays = checked
        ? [...selectedDays, value]
        : selectedDays.filter((day) => day !== value);

      setSelectedDays(updatedDays);

      // 🔄 If all three days are selected, automatically switch to 3-Day Special
      if (
        updatedDays.includes("Thursday") &&
        updatedDays.includes("Friday") &&
        updatedDays.includes("Saturday")
      ) {
        setAllDays(true);
        setTotalPrice(100 * selectedSeats.length);
      } else {
        setAllDays(false);
        setTotalPrice(35 * updatedDays.length * selectedSeats.length);
      }
    }
  };

  // 📝 Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    console.log("Days Selected:", selectedDays);
    console.log("Total Price:", totalPrice);
    onConfirm();
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

      {/* 🟢 Display VIP Summary */}
      {ticketType === "VIP" && (
        <div style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "10px" }}>
          <h3>🎟️ VIP Ticket Summary</h3>
          <p>
            You have chosen <strong>{selectedSeats.length}</strong> VIP seat(s).<br />
            <strong>Total Price:</strong> ${130 * selectedSeats.length}
          </p>
        </div>
      )}

      {/* 🔵 Display GA Day Selection */}
      {ticketType === "GA" && (
        <div style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "10px" }}>
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
        <strong>Total Price:</strong> ${totalPrice}
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
