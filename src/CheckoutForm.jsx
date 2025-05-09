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
    console.log("🔄 Running useEffect to expose window variables.");
    
    // Directly attach to the window object
    window.daySelection = JSON.parse(JSON.stringify(daySelection));
    window.totalPrice = totalPrice;
    // Debugging logs to verify
    console.log("window.daySelection →", window.daySelection);
    console.log("window.totalPrice →", window.totalPrice);
  }, [daySelection, totalPrice]);

  const handleDayChange = (event) => {
    const { value, checked } = event.target;
    console.log(`🟢 Checkbox Clicked → ${value}: ${checked}`);

    if (value === "all") {
      // Handle "All 3 Days" selection
      const newSelection = {
        Thursday: false,
        Friday: false,
        Saturday: false,
        all: checked
      };
      setDaySelection(newSelection);
      
      // Update price
      const pricePerSeat = checked ? 100 : 0;
      const newTotalPrice = pricePerSeat * selectedSeats.length;
      setTotalPrice(newTotalPrice);
      
      // Update window variables
      window.daySelection = JSON.parse(JSON.stringify(newSelection));
      window.totalPrice = newTotalPrice;
    } else {
      // Handle individual day selection
      const newSelection = { 
        ...daySelection,
        [value]: checked,
        // Always ensure "all" is unchecked when changing individual days
        all: false
      };
      
      // Check if all three days are selected
      if (
        value !== "all" &&
        newSelection.Thursday &&
        newSelection.Friday &&
        newSelection.Saturday
      ) {
        // Switch to "All 3 Days" option
        newSelection.Thursday = false;
        newSelection.Friday = false;
        newSelection.Saturday = false;
        newSelection.all = true;
      }
      
      setDaySelection(newSelection);
      
      // Calculate price
      let totalDays = 0;
      if (newSelection.all) {
        totalDays = 3; // Special package price
      } else {
        if (newSelection.Thursday) totalDays++;
        if (newSelection.Friday) totalDays++;
        if (newSelection.Saturday) totalDays++;
      }
      
      const pricePerSeat = newSelection.all ? 100 : 35 * totalDays;
      const newTotalPrice = pricePerSeat * selectedSeats.length;
      setTotalPrice(newTotalPrice);
      
      // Update window variables
      window.daySelection = JSON.parse(JSON.stringify(newSelection));
      window.totalPrice = newTotalPrice;
    }
    
    console.log("🔄 State Updated:", window.daySelection, window.totalPrice);
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
