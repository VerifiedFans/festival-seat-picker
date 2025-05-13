import React, { useState, useEffect } from "react";

export default function SeatPicker({ onSeatSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 🎟️ **Generate VIP Sections**
  const generateSeats = (section, rows, seatsPerRow, offsetX, offsetY, curve = false) => {
    const seatArray = [];
    rows.forEach((row, rowIndex) => {
      for (let i = 0; i < seatsPerRow[rowIndex]; i++) {
        const angleOffset = curve ? Math.sin(rowIndex * 0.15) * 15 : 0;
        const xPosition = offsetX + (20 + angleOffset) * i;
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

  // 🎯 **Define VIP Sections**
  const vipSeats = [
    // 101 & 104 Curved
    ...generateSeats("101", "ABCDEFGHIJKLMN".split(""), [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9], 100, 50, true),
    ...generateSeats("104", "ABCDEFGHIJKLMN".split(""), [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9], 1100, 50, true),
    // 102 & 103 Triangular
    ...generateSeats("102", "ABCDEFGHIJKL".split(""), [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 400, 50),
    ...generateSeats("103", "ABCDEFGHIJKL".split(""), [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 800, 50),
  ];

  // 🎯 **Generate General Admission Sections**
  const generateGASection = (section, startRow, numRows, cols, offsetX, offsetY) => {
    const seatArray = [];
    for (let r = 0; r < numRows; r++) {
      const rowLabel =
        r < 26 ? String.fromCharCode(startRow.charCodeAt(0) + r) : "A" + String.fromCharCode(65 + (r - 26));
      for (let i = 1; i <= cols; i++) {
        seatArray.push({
          id: `${section}-${rowLabel}${i}`,
          section,
          row: rowLabel,
          x: offsetX + (i - 1) * 15,
          y: offsetY + r * 15,
          available: true,
        });
      }
    }
    return seatArray;
  };

  const gaSeats = [
    ...generateGASection("201", "A", 32, 12, 100, 400),
    ...generateGASection("202", "A", 32, 12, 400, 400),
    ...generateGASection("203", "A", 32, 12, 700, 400),
    ...generateGASection("204", "A", 32, 12, 1000, 400),
  ];

  const allSeats = [...vipSeats, ...gaSeats];

  // 🔄 **Handle Click Logic**
  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  useEffect(() => {
    onSeatSelect(selectedSeats);
  }, [selectedSeats, onSeatSelect]);

  const getColor = (id) => {
    if (selectedSeats.includes(id)) return "orange";
    const seat = allSeats.find((s) => s.id === id);
    if (!seat?.available) return "gray";
    return seat.section.startsWith("20") ? "blue" : "green";
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎟 Seat Picker Preview</h2>
      <svg width="1600" height="1000">
        <rect x="100" y="0" width="1200" height="30" fill="gray" />
        <text x="600" y="20" fill="white">
          STAGE
        </text>

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
