import React, { useState, useEffect } from "react";

export default function CheckoutForm({ selectedSeats, onConfirm }) {
  // Using an array to track selected days
  const [selectedDays, setSelectedDays] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Update price whenever selections change
  useEffect(() => {
    calculatePrice();
    
    // For debugging
    window.selectedDays = [...selectedDays];
    window.totalPrice = totalPrice;
    console.log("Selected Days:", window.selectedDays);
    console.log("Total Price:", window.totalPrice);
  }, [selectedDays]);

  // Calculate the price based on selected days
  const calculatePrice = () => {
    let price = 0;
    
    if (selectedDays.length === 0) {
      price = 0;
    } else if (selectedDays.length === 3 || selectedDays.includes("all")) {
      // If all 3 days or "all" option selected, charge package price
      price = 100 * selectedSeats.length;
    } else {
      // Otherwise charge per day
      price = 35 * selectedDays.length * selectedSeats.length;
    }
    
    setTotalPrice(price);
    return price;
  };

  // Handle checkbox changes
  const handleDayToggle = (day) => {
    // Special handling for "all" option
    if (day === "all") {
      if (selectedDays.includes("all")) {
        // Deselect "all"
        setSelectedDays([]);
      } else {
        // Select only "all"
        setSelectedDays(["all"]);
      }
      return;
    }
    
    // If "all" is currently selected, replace it with the clicked day
    if (selectedDays.includes("all")) {
      setSelectedDays([day]);
      return;
    }
    
    // Handle regular day selection/deselection
    setSelectedDays(prev => {
      if (prev.includes(day)) {
        // Remove day if already selected
        return prev.filter(d => d !== day);
      } else {
        // Add day if not selected
        const newSelection = [...prev, day];
        
        // If all three individual days are now selected, switch to "all"
        if (
          newSelection.includes("Thursday") && 
          newSelection.includes("Friday") && 
          newSelection.includes("Saturday") &&
          !newSelection.includes("all")
        ) {
          return ["all"];
        }
        
        return newSelection;
      }
    });
  };

  // Check if a day is selected
  const isDaySelected = (day) => {
    return selectedDays.includes(day);
  };

  // Check if individual days should be disabled
  const shouldDisableDay = (day) => {
    return day !== "all" && selectedDays.includes("all");
  };

  return (
    <div>
      <h2>Select Days</h2>
      <div>
        <label style={{ display: "block", margin: "8px 0" }}>
          <input
            type="checkbox"
            onChange={() => handleDayToggle("Thursday")}
            checked={isDaySelected("Thursday")}
            disabled={shouldDisableDay("Thursday")}
          />
          {" "}Thursday ($35)
        </label>
        
        <label style={{ display: "block", margin: "8px 0" }}>
          <input
            type="checkbox"
            onChange={() => handleDayToggle("Friday")}
            checked={isDaySelected("Friday")}
            disabled={shouldDisableDay("Friday")}
          />
          {" "}Friday ($35)
        </label>
        
        <label style={{ display: "block", margin: "8px 0" }}>
          <input
            type="checkbox"
            onChange={() => handleDayToggle("Saturday")}
            checked={isDaySelected("Saturday")}
            disabled={shouldDisableDay("Saturday")}
          />
          {" "}Saturday ($35)
        </label>
        
        <label style={{ display: "block", margin: "8px 0" }}>
          <input
            type="checkbox"
            onChange={() => handleDayToggle("all")}
            checked={isDaySelected("all")}
          />
          {" "}All 3 Days ($100)
        </label>
      </div>
      
      <div style={{ marginTop: "15px" }}>
        <strong>Total Price: ${totalPrice}</strong>
      </div>
      
      {/* Optional: Add a continue button to pass data to ContactForm */}
      <button 
        onClick={() => {
          if (onConfirm) {
            let daySelection = selectedDays.includes("all") ? "all" : selectedDays.join(",");
            onConfirm({ 
              selectedDays: daySelection,
              totalPrice 
            });
          }
        }}
        style={{
          padding: "0.5rem 1.5rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 4,
          width: "100%",
          fontSize: "1rem",
          marginTop: "15px",
          cursor: "pointer"
        }}
        disabled={selectedDays.length === 0}
      >
        Continue
      </button>
    </div>
  );
}
