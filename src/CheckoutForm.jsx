import React, { useState, useEffect } from "react";

export default function CheckoutForm({ selectedSeats, onConfirm }) {
  const [ticketType, setTicketType] = useState("");
  const [daySelection, setDaySelection] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    // Determine if seats are VIP or GA
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

  const handleDayChange = (event) => {
    const { value, checked } = event.target;
    let updatedDays = [...daySelection];

    if (checked) {
      updatedDays.push(value);
    } else {
      updatedDays = updatedDays.filter((day) => day !== value);
    }

    if (updatedDays.length > 2 && value !== "all") {
      setError("You can only pick up to 2 individual days, or all 3 days.");
    } else {
      setError("");
      setDaySelection(updatedDays);
    }

    // 🔄 Calculate price
    if (updatedDays.includes("all")) {
      setTotalPrice(100 * selectedSeats.length);
    } else {
      setTotalPrice(35 * updatedDays.length * selectedSeats.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      onConfirm();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Checkout</h2>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Selected Seats:</strong> {selectedSeats.join(", ")}
      </div>

      {ticketType === "VIP" && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>VIP Tickets:</strong> All 3 Days Access
          <br />
          <strong>Total Price:</strong> ${totalPrice}
        </div>
      )}

      {ticketType === "GA" && (
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <strong>Select Days (Pick up to 2 days, or All 3):</strong>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Thursday"
                  onChange={handleDayChange}
                  disabled={daySelection.includes("all")}
                />
                Thursday ($35)
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Friday"
                  onChange={handleDayChange}
                  disabled={daySelection.includes("all")}
                />
                Friday ($35)
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Saturday"
                  onChange={handleDayChange}
                  disabled={daySelection.includes("all")}
                />
                Saturday ($35)
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="all"
                  onChange={handleDayChange}
                  disabled={
                    daySelection.length > 0 && !daySelection.includes("all")
                  }
                />
                All 3 Days ($100)
              </label>
            </div>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div style={{ marginBottom: "1rem" }}>
            <strong>Total Price:</strong> ${totalPrice}
          </div>
        </div>
      )}

      <button
        type="submit"
        style={buttonStyle}
        disabled={error.length > 0 || totalPrice === 0}
      >
        Continue to Payment
      </button>
    </form>
  );
}

const buttonStyle = {
  padding: "0.5rem 1.5rem",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 4,
  width: "100%",
  fontSize: "1rem",
};
