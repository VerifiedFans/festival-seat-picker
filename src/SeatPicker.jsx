import React, { useState } from "react";

const sections = {
  VIP: {
    101: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11], curve: true },
    102: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], curve: false },
    103: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], curve: false },
    104: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11], curve: true },
  },
  GA: {
    201: { rows: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...["AA", "BB", "CC", "DD", "EE", "FF"]], seats: 12 },
    202: { rows: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...["AA", "BB", "CC", "DD", "EE", "FF"]], seats: 12 },
    203: { rows: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...["AA", "BB", "CC", "DD", "EE", "FF"]], seats: 12 },
    204: { rows: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...["AA", "BB", "CC", "DD", "EE", "FF"]], seats: 12 },
  },
};

export default function SeatPicker({ onSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
    onSelect([...selectedSeats, seat]);
  };

  const renderSeats = (section, row, seatCount, sectionName, curve, offsetX, offsetY) => {
    return Array.from({ length: seatCount }, (_, i) => {
      const seatId = `${section}-${row}${i + 1}`;
      const isSelected = selectedSeats.includes(seatId);

      const xPos = curve
        ? offsetX + 20 * Math.sin(i / seatCount * Math.PI)
        : offsetX + i * 20;

      const yPos = curve
        ? offsetY + 20 * Math.cos(i / seatCount * Math.PI)
        : offsetY;

      return (
        <circle
          key={seatId}
          cx={xPos}
          cy={yPos}
          r={8}
          fill={isSelected ? "orange" : sectionName === "VIP" ? "green" : "blue"}
          onClick={() => toggleSeat(seatId)}
          style={{ cursor: "pointer" }}
        />
      );
    });
  };

  const renderVIPSection = (sectionNum, offsetX, offsetY) => {
    const section = sections.VIP[sectionNum];
    return (
      <g key={`VIP-${sectionNum}`}>
        {section.rows.map((row, idx) =>
          renderSeats(
            sectionNum,
            row,
            section.seats[idx],
            "VIP",
            section.curve,
            offsetX,
            offsetY + idx * 20
          )
        )}
      </g>
    );
  };

  const renderGASection = (sectionNum, offsetX, offsetY) => {
    const section = sections.GA[sectionNum];
    return (
      <g key={`GA-${sectionNum}`}>
        {section.rows.map((row, idx) =>
          renderSeats(sectionNum, row, section.seats, "GA", false, offsetX, offsetY + idx * 15)
        )}
      </g>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🎟 Seat Picker Preview</h2>
      <svg width="1200" height="1000" style={{ border: "1px solid #ccc" }}>
        <rect x="400" y="20" width="400" height="50" fill="gray" />
        <text x="550" y="50" fill="white">STAGE</text>

        {/* LED Walls */}
        <rect x="300" y="20" width="100" height="50" fill="lightgray" />
        <text x="320" y="50" fill="black">LED Wall</text>
        <rect x="800" y="20" width="100" height="50" fill="lightgray" />
        <text x="820" y="50" fill="black">LED Wall</text>

        {/* VIP Sections */}
        {renderVIPSection(101, 50, 100)}
        {renderVIPSection(102, 350, 100)}
        {renderVIPSection(103, 700, 100)}
        {renderVIPSection(104, 1000, 100)}

        {/* GA Sections */}
        {renderGASection(201, 100, 400)}
        {renderGASection(202, 400, 400)}
        {renderGASection(203, 700, 400)}
        {renderGASection(204, 1000, 400)}
      </svg>
      <div>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
      </div>
    </div>
  );
}
