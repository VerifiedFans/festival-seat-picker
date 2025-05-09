import React, { useState, useEffect } from "react";

export default function CheckoutForm({ selectedSeats, onConfirm }) {
  const [daySelection, setDaySelection] = useState({
    Thursday: false,
    Friday: false,
    Saturday: false,
    all: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // Recalculate price whenever selections change
  useEffect(() => {
    calculatePrice();
    
    // Expose to window for debugging
    window.daySelection = JSON.parse(JSON.stringify(daySelection));
    window.totalPrice = totalPrice;
    console.log("window.daySelection →", window.daySelection);
    console.log("window.totalPrice →", window.totalPrice);
  }, [daySelection]);

  // Simple price calculation function
  const calculatePrice = () => {
    let price = 0;
    
    if (daySelection.all) {
      price = 100 * selectedSeats.length;
    } else {
      const dayCount = [
        daySelection.Thursday,
        daySelection.Friday,
        daySelection.Saturday
      ].filter(Boolean).length;
      
      price = 35 * dayCount * selectedSeats.length;
    }
    
    setTotalPrice(price);
    return price;
  };

  // Handle checkbox changes
  const handleDayChange = (event) => {
    const { value, checked } = event.target;
    console.log(`🟢 Checkbox Clicked → ${value}: ${checked}`);

    if (value === "all") {
      // When "All 3 Days" is clicked
      if (checked) {
        setDaySelection({
          Thursday: false,
          Friday: false,
          Saturday: false,
          all: true
        });
      } else {
        setDaySelection({
          ...daySelection,
          all: false
        });
      }
    } else {
      // When individual day is clicked
      const newSelection = {
        ...daySelection,
        [value]: checked
      };
      
      // If all three days are selected, switch to "all"
      if (
        newSelection.Thursday && 
        newSelection.Friday && 
        newSelection.Saturday
      ) {
        newSelection.Thursday = false;
        newSelection.Friday = false;
        newSelection.Saturday = false;
        newSelection.all = true;
      }
      
      setDaySelection(newSelection);
    }
  };

  return (
    <div>
      <h2>Select Days</h2>
      <div>
        <label style={{ display: "block", margin: "8px 0" }}>
          <input
            type="checkbox"
            value="Thursday"
            onChange={handleDayChange}
            checked={daySelection.Thursday}
            disabled={daySelection.all}
          />
          {" "}Thursday ($35)
        </label>
        
        <label style={{ display: "block", margin: "8px 0" }}>
          <input
            type="checkbox"
            value="Friday"
            onChange={handleDayChange}
            checked={daySelection.Friday}
            disabled={daySelection.all}
          />
          {" "}Friday ($35)
        </label>
        
        <label style={{ display: "block", margin: "8px 0" }}>
          <input
            type="checkbox"
            value="Saturday"
            onChange={handleDayChange}
            checked={daySelection.Saturday}
            disabled={daySelection.all}
          />
          {" "}Saturday ($35)
        </label>
        
        <label style={{ display: "block", margin: "8px 0" }}>
          <input
            type="checkbox"
            value="all"
            onChange={handleDayChange}
            checked={daySelection.all}
          />
          {" "}All 3 Days ($100)
        </label>
      </div>
      
      <div style={{ marginTop: "15px" }}>
        <strong>Total Price: ${totalPrice}</strong>
      </div>
    </div>
  );
}
