import React, { useState, useEffect } from "react";

export default function SeatPicker({ onSeatSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 🎟️ **Generating Seats:**
  const generateSeats = (section, rows, seatsPerRow, curved = false) => {
    const seatArray = [];
    rows.forEach((row, rowIndex) => {
      for (let i = 1; i <= seatsPerRow[rowIndex]; i++) {
        seatArray.push({
          id: `${section}-${row}${i}`,
          section,
          row,
          available: true,
        });
      }
    });
    return seatArray;
  };

  // 🎟️ **VIP Sections (Curved Layout for 101 & 104)**
  const vipSeats = [
    ...generateSeats("101", "ABCDEFGHIJKLM".split(""), [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9]),
    ...generateSeats("102", "ABCDEFGHIJKL".split(""), [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]),
    ...generateSeats("103", "ABCDEFGHIJKL".split(""), [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]),
    ...generateSeats("104", "ABCDEFGHIJKLM".split(""), [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9]),
  ];

  // 🎟️ **GA Sections**
  const gaSeats = [];
  const gaRows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").concat(["AA", "BB", "CC", "DD", "EE", "FF"]);
  gaRows.forEach((row) => {
    for (let i = 1; i <= 48; i++) {
      gaSeats.push({
        id: `GA-${row}${i}`,
        section: "GA",
        row,
        available: true,
      });
    }
  });

  const allSeats = [...vipSeats, ...gaSeats];

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
    const seat = allSeats.find((s) => s.id === id);
    if (!seat?.available) return "gray";
    return seat.section === "GA" ? "blue" : "green";
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎟 Seat Picker Preview</h2>
      <svg width="1000" height="1000">
        <rect x="0" y="0" width="1000" height="30" fill="gray" />
        <text x="450" y="20" fill="white">
          STAGE
        </text>

        {/* 🟢 **Render All Seats** */}
        {allSeats.map((seat, index) => (
          <circle
            key={seat.id}
            cx={50 + (index % 48) * 20}
            cy={50 + Math.floor(index / 48) * 20}
            r="5"
            fill={getColor(seat.id)}
            onClick={() => handleSeatClick(seat.id)}
          />
        ))}
      </svg>
    </div>
  );
}
