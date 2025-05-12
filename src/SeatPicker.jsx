import React, { useState, useEffect } from "react";

export default function SeatPicker({ onSeatSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = {
    "101-A1": { section: "VIP", available: true },
    "101-A2": { section: "VIP", available: true },
    "102-B5": { section: "VIP", available: true },
    "203-C15": { section: "GA", available: true },
    "203-C16": { section: "GA", available: true },
    "202-D7": { section: "GA", available: true },
  };

  const handleSeatClick = (seatId) => {
    console.log("🪑 Clicked seat:", seatId);

    if (selectedSeats.includes(seatId)) {
      // If the seat is already selected, remove it
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      // If the seat is not selected, add it
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  useEffect(() => {
    console.log("🚀 Sending selected seats to parent:", selectedSeats);
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);

  const getColor = (id) => {
    if (selectedSeats.includes(id)) return "orange";
    if (!seats[id].available) return "gray";
    return seats[id].section === "VIP" ? "green" : "blue";
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎟 Seat Picker Preview</h2>
      <svg width="500" height="300">
        <rect x="0" y="0" width="500" height="30" fill="gray" />
        <text x="220" y="20" fill="white">
          STAGE
        </text>

        {/* VIP Section */}
        <circle
          cx="100"
          cy="60"
          r="12"
          fill={getColor("101-A1")}
          onClick={() => handleSeatClick("101-A1")}
        />
        <circle
          cx="140"
          cy="60"
          r="12"
          fill={getColor("101-A2")}
          onClick={() => handleSeatClick("101-A2")}
        />
        <circle
          cx="180"
          cy="60"
          r="12"
          fill={getColor("102-B5")}
          onClick={() => handleSeatClick("102-B5")}
        />

        {/* General Admission Section */}
        <circle
          cx="100"
          cy="120"
          r="12"
          fill={getColor("203-C15")}
          onClick={() => handleSeatClick("203-C15")}
        />
        <circle
          cx="140"
          cy="120"
          r="12"
          fill={getColor("203-C16")}
          onClick={() => handleSeatClick("203-C16")}
        />
        <circle
          cx="180"
          cy="120"
          r="12"
          fill={getColor("202-D7")}
          onClick={() => handleSeatClick("202-D7")}
        />
      </svg>
    </div>
  );
}
