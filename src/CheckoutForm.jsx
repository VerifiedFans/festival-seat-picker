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

    setDaySelection((prev) => {
      const updatedSelection = { ...prev };
      
      // Handle "All 3 Days" special case
      if (value === "all") {
        if (checked) {
          // If "All 3 Days" is checked, uncheck individual days
          updatedSelection.Thursday = false;
          updatedSelection.Friday = false;
          updatedSelection.Saturday = false;
          updatedSelection.all = true;
        } else {
          updatedSelection.all = false;
        }
      } else {
        // Handle individual day selection
        updatedSelection[value] = checked;
        
        // Check if all three individual days are selected
        const allDaysSelected = 
          updatedSelection.Thursday && 
          updatedSelection.Friday && 
          updatedSelection.Saturday;
        
        if (allDaysSelected) {
          // Switch to "All 3 Days" option
          updatedSelection.Thursday = false;
          updatedSelection.Friday = false;
          updatedSelection.Saturday = false;
          updatedSelection.all = true;
        } else {
          updatedSelection.all = false;
        }
      }

      // Calculate the price based on selection
      let pricePerSeat;
      if (updatedSelection.all) {
        pricePerSeat = 100; // Price for all 3 days
      } else {
        // Count selected days
        const selectedDaysCount = [
          updatedSelection.Thursday,
          updatedSelection.Friday,
          updatedSelection.Saturday
        ].filter(Boolean).length;
        pricePerSeat = 35 * selectedDaysCount;
      }
      
      const newTotalPrice = pricePerSeat * selectedSeats.length;
      setTotalPrice(newTotalPrice);
      
      // 🔴 Direct exposure
      window.daySelection = JSON.parse(JSON.stringify(updatedSelection));
      window.totalPrice = newTotalPrice;
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
