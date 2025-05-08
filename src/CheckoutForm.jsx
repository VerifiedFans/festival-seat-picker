import React, { useState, useEffect } from "react";

export default function CheckoutForm({ selectedSeats, onConfirm }) {
  const [ticketType, setTicketType] = useState("");
  const [daySelection, setDaySelection] = useState({
    Thursday: false,
    Friday: false,
    Saturday: false,
    all: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // 📝 Expose state to the window for debugging
  window.daySelection = daySelection;
  window.totalPrice = totalPrice;

  console.log("Initialized State:", window.daySelection, window.totalPrice);

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

  // 📝 Logic to handle day changes
  const handleDayChange = (event) => {
    const { value, checked } = event.target;

    setDaySelection((prev) => {
      const updatedSelection = { ...prev, [value]: checked };

      // 🔄 If all three individual days are checked, flip to "All 3 Days"
      if (
        updatedSelection.Thursday &&
        updatedSelection.Friday &&
        updatedSelection.Saturday
      ) {
        updatedSelection.Thursday = false;
        updatedSelection.Friday = false;
        updatedSelection.Saturday = false;
        updatedSelection.all = true;
      } else {
        updatedSelection.all = false;
      }

      // 🔄 Calculate the price
      const totalDaysSelected = Object.values(updatedSelection).filter(Boolean).length;
      const pricePerSeat = updatedSelection.all ? 100 : 35 * totalDaysSelected;
      setTotalPrice(pricePerSeat * selectedSeats.length);

      // 🔎 Debugging
      window.daySelection = updatedSelection;
      window.totalPrice = pricePerSeat * selectedSeats.length;

      console.log("Updated State:", window.daySelection, window.totalPrice);

      return updatedSelection;
    });
  };

  // 📝 Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
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
            <strong>Select Days:</strong>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Thursday"
                  onChange={handleDayChange}
                  checked={daySelection.Thursday}
                  disabled={daySelection.all}
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
                  checked={daySelection.Friday}
                  disabled={daySelection.all}
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
                  checked={daySelection.Saturday}
                  disabled={daySelection.all}
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
                  checked={daySelection.all}
                  disabled={
                    daySelection.Thursday ||
                    daySelection.Friday ||
                    daySelection.Saturday
                  }
                />
                All 3 Days ($100)
              </label>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong>Total Price:</strong> ${totalPrice}
          </div>
        </div>
      )}

      <button
        type="submit"
        style={buttonStyle}
        disabled={totalPrice === 0}
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
