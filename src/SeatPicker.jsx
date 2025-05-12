import React, { useState, useEffect } from "react";

export default function SeatPicker({ onSeatSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 🎟️ **Generating Seats:**
  const generateSeats = (section, rows, seatsPerRow, offsetX = 0, offsetY = 0, curve = false) => {
    const seatArray = [];
    rows.forEach((row, rowIndex) => {
      for (let i = 0; i < seatsPerRow[rowIndex]; i++) {
        const xPosition = offsetX + (curve ? Math.sin(rowIndex * 0.2) * 20 : 20) * i;
        const yPosition = offsetY + 20 * rowIndex;
        seatArray.push({
          id: `${section}-${row}${i + 1}`,
          section,
          row,
          x: xPosition,
          y: yPosition,
          available: true,
        });
      }
    });
    return seatArray;
  };

  // 🎟️ **VIP Sections (Curved Layout for 101 & 104)**
  const vipSeats = [
    ...generateSeats("101", "ABCDEFGHIJKLM".split(""), [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9], 100, 50, true),
    ...generateSeats("102", "ABCDEFGHIJKL".split(""), [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 300, 50),
    ...generateSeats("103", "ABCDEFGHIJKL".split(""), [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 600, 50),
    ...generateSeats("104", "ABCDEFGHIJKLM".split(""), [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9], 800, 50, true),
  ];

  // 🎟️ **GA Sections (Straight Rows)**
  const gaSeats = [];
  const gaRows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").concat(["AA", "BB", "CC", "DD", "EE", "FF"]);
  gaRows.forEach((row, index) => {
    for (let i = 1; i <= 48; i++) {
      gaSeats.push({
        id: `GA-${row}${i}`,
        section: "GA",
        row,
        x: 50 + (i - 1) * 15,
        y: 400 + index * 15,
        available: true,
      });
    }
  });

  const allSeats = [...vipSeats, ...gaSeats];

  // 🎯 **Handle Click Logic**
  const handleSeatClick = (seatId) => {
    console.log("🪑 Clicked seat:", seatId);

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  useEffect(() => {
    console.log("🚀 Sending selected seats to parent:", selectedSeats);
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);

  const getColor = (id) => {
    if (selectedSeats.includes(id)) return "orange";
    const seat = allSeats.find((s) => s.id === id);
    if (!seat?.available) return "gray";
    return seat.section === "GA" ? "blue" : "green";
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎟 Seat Picker Preview</h2>
      <svg width="1200" height="1200">
        {/* 🎭 **Stage** */}
        <rect x="100" y="0" width="1000" height="30" fill="gray" />
        <text x="550" y="20" fill="white">
          STAGE
        </text>

        {/* 🎯 **Section Labels** */}
        <text x="150" y="45" fill="green">VIP 101</text>
        <text x="400" y="45" fill="green">VIP 102</text>
        <text x="700" y="45" fill="green">VIP 103</text>
        <text x="950" y="45" fill="green">VIP 104</text>

        <text x="400" y="390" fill="blue">General Admission</text>

        {/* 🟢 **Render All Seats** */}
        {allSeats.map((seat) => (
          <circle
            key={seat.id}
            cx={seat.x}
            cy={seat.y}
            r="5"
            fill={getColor(seat.id)}
            onClick={() => handleSeatClick(seat.id)}
          />
        ))}
      </svg>
    </div>
  );
}
