import React, { useState } from "react";

const sections = {
  VIP: {
    101: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11] },
    102: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
    103: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
    104: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11] },
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
  };

  const renderSeats = (section, row, seatCount, sectionName) => {
    return Array.from({ length: seatCount }, (_, i) => {
      const seatId = `${section}-${row}${i + 1}`;
      const isSelected = selectedSeats.includes(seatId);
      return (
        <circle
          key={seatId}
          cx={50 + i * 25}
          cy={50}
          r={10}
          fill={isSelected ? "orange" : sectionName === "VIP" ? "green" : "blue"}
          onClick={() => toggleSeat(seatId)}
          style={{ cursor: "pointer" }}
        />
      );
    });
  };

  const renderVIPSection = (sectionNum) => {
    const section = sections.VIP[sectionNum];
    return (
      <g key={`VIP-${sectionNum}`}>
        {section.rows.map((row, idx) =>
          renderSeats(sectionNum, row, section.seats[idx], "VIP")
        )}
      </g>
    );
  };

  const renderGASection = (sectionNum) => {
    const section = sections.GA[sectionNum];
    return (
      <g key={`GA-${sectionNum}`}>
        {section.rows.map((row) =>
          renderSeats(sectionNum, row, section.seats, "GA")
        )}
      </g>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🎟 Seat Picker Preview</h2>
      <svg width="1000" height="800" style={{ border: "1px solid #ccc" }}>
        <rect x="0" y="0" width="1000" height="50" fill="gray" />
        <text x="450" y="30" fill="white">STAGE</text>

        {/* LED Walls */}
        <rect x="0" y="50" width="100" height="50" fill="lightgray" />
        <text x="20" y="80" fill="black">LED Wall</text>
        <rect x="900" y="50" width="100" height="50" fill="lightgray" />
        <text x="920" y="80" fill="black">LED Wall</text>

        {/* VIP Sections */}
        {renderVIPSection(101)}
        {renderVIPSection(102)}
        {renderVIPSection(103)}
        {renderVIPSection(104)}

        {/* GA Sections */}
        {renderGASection(201)}
        {renderGASection(202)}
        {renderGASection(203)}
        {renderGASection(204)}
      </svg>
      <div>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
      </div>
    </div>
  );
}
