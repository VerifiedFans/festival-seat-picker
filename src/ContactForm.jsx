import React, { useState, useEffect } from "react";

export default function ContactForm({ selectedSeats, selectedDaysData, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gaDays: selectedDaysData?.selectedDays || "all",  // Use data from CheckoutForm or default to "all"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(selectedDaysData?.totalPrice || 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔄 Calculate ticket pricing
  useEffect(() => {
    let vipCount = selectedSeats.filter(seat => seat.startsWith("101") || seat.startsWith("102") || seat.startsWith("103") || seat.startsWith("104")).length;
    let gaCount = selectedSeats.length - vipCount;

    // Handle both single day and multiple day selections
    let gaPrice;
    if (formData.gaDays === "all") {
      gaPrice = 100;
    } else if (formData.gaDays.includes(",")) {
      // Count the number of days if multiple days are selected
      const dayCount = formData.gaDays.split(",").length;
      gaPrice = dayCount * 35;
    } else {
      // Single day selected
      gaPrice = 35;
    }

    setTotalPrice(vipCount * 130 + gaCount * gaPrice);
  }, [formData.gaDays, selectedSeats]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, phone, address, gaDays } = formData;

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
          gaDays,
          totalPrice,
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

      {/* Display selected days (read-only) */}
      <div style={{ marginBottom: "1rem" }}>
        <h4>Selected Days:</h4>
        <p style={{ fontWeight: "bold" }}>
          {formData.gaDays === "all" ? "All Three Days" : 
           formData.gaDays.includes(",") ? formData.gaDays.split(",").join(", ") : 
           formData.gaDays}
        </p>
      </div>

      <p><strong>Total Price:</strong> ${totalPrice}</p>

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
