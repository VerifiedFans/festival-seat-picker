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

  // 📝 Force window exposure every time the state updates
  useEffect(() => {
    window.daySelection = daySelection;
    window.totalPrice = totalPrice;
    console.log("📝 Exposed to Window:");
    console.log("window.daySelection ->", window.daySelection);
    console.log("window.totalPrice ->", window.totalPrice);
  }, [daySelection, totalPrice]);

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
      const daysSelected = Object.keys(updatedSelection).filter(
        (day) => updatedSelection[day] && day !== "all"
      ).length;

      const pricePerSeat = updatedSelection.all ? 100 : 35 * daysSelected;
      setTotalPrice(pricePerSeat * selectedSeats.length);

      // 🔎 Expose the state to the window
      window.daySelection = JSON.parse(JSON.stringify(updatedSelection));
      window.totalPrice = pricePerSeat * selectedSeats.length;

      console.log("🔄 State Updated:", window.daySelection, window.totalPrice);

      return updatedSelection;
    });
  };

  return (
    <div>
      <h2>Select Days</h2>
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
      <br />
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
      <br />
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
      <br />
      <label>
        <input
          type="checkbox"
          value="all"
          onChange={handleDayChange}
          checked={daySelection.all}
        />
        All 3 Days ($100)
      </label>
      <br />
      <strong>Total Price: ${totalPrice}</strong>
    </div>
  );
}
