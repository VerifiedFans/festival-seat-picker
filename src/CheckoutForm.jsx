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

  useEffect(() => {
    // 📝 Detect if seats are VIP or GA
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
    console.log(`Clicked: ${value} - ${checked}`);

    if (value === "all") {
      // If "All 3 Days" is clicked
      setDaySelection({
        Thursday: false,
        Friday: false,
        Saturday: false,
        all: checked,
      });
      setTotalPrice(checked ? 100 * selectedSeats.length : 0);
    } else {
      // If individual days are clicked
      setDaySelection((prev) => {
        const newSelection = { ...prev, [value]: checked };

        // Calculate the total selected days
        const selectedDays = Object.values(newSelection).filter(Boolean).length;

        if (newSelection.Thursday && newSelection.Friday && newSelection.Saturday) {
          return {
            Thursday: false,
            Friday: false,
            Saturday: false,
            all: true,
          };
        }

        // Update price
        const price = selectedDays * 35 * selectedSeats.length;
        setTotalPrice(price);

        return {
          ...newSelection,
          all: false,
        };
      });
    }
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
