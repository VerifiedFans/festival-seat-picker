import React, { useState } from "react";

export default function SeatPicker({ onContinue }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleClick = (id) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const seats = ["A1", "A2", "A3", "B1", "B2", "B3"]; // simplify to start

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">🎟 Select Your Seats</h2>
      <svg width="300" height="120">
        <rect x="0" y="0" width="300" height="30" fill="gray" />
        <text x="150" y="20" textAnchor="middle" fill="white">STAGE</text>
        {seats.map((id, idx) => (
          <circle
            key={id}
            cx={50 + (idx % 3) * 50}
            cy={60 + Math.floor(idx / 3) * 40}
            r="12"
            fill={selectedSeats.includes(id) ? "orange" : "blue"}
            onClick={() => handleClick(id)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </svg>
      {selectedSeats.length > 0 && (
        <>
          <p className="mt-4">Selected: {selectedSeats.join(", ")}</p>
          <button
            onClick={() => onContinue(selectedSeats)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
}
