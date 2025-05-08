import React, { useState, useEffect } from "react";

export default function CheckoutForm({ selectedSeats, onConfirm }) {
  const [daySelection, setDaySelection] = useState({
    Thursday: false,
    Friday: false,
    Saturday: false,
    all: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // 📝 Force window exposure every time the state updates
  useEffect(() => {
    window.daySelection = daySelection;
    window.totalPrice = totalPrice;
    console.log("📝 Exposed to Window:");
    console.log("window.daySelection ->", window.daySelection);
    console.log("window.totalPrice ->", window.totalPrice);
  }, [daySelection, totalPrice]);

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

      console.log("🔄 State Updated:", updatedSelection, pricePerSeat * selectedSeats.length);

      // 🔴 Here is the direct exposure
      window.daySelection = updatedSelection;
      window.totalPrice = pricePerSeat * selectedSeats.length;

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
