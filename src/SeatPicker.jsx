import React, { useState } from "react";

const vipSections = {
  101: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11], curved: true },
  102: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], curved: false },
  103: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], curved: false },
  104: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"], seats: [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11], curved: true },
};

const gaSections = {
  201: { rows: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...["AA", "BB", "CC", "DD", "EE", "FF"]], seats: 12 },
  202: { rows: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...["AA", "BB", "CC", "DD", "EE", "FF"]], seats: 12 },
  203: { rows: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...["AA", "BB", "CC", "DD", "EE", "FF"]], seats: 12 },
  204: { rows: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...["AA", "BB", "CC", "DD", "EE", "FF"]], seats: 12 },
};

export default function SeatPicker({ onSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
    onSelect([...selectedSeats, seat]);
  };

  const renderSeats = (section, row, seatCount, offsetX, offsetY, curved, flip) => {
    const radius = curved ? 150 + offsetY * 5 : 0;
    return Array.from({ length: seatCount }, (_, i) => {
      const seatId = `${section}-${row}${i + 1}`;
      const isSelected = selectedSeats.includes(seatId);

      const angle = curved ? ((i - seatCount / 2) * 10) / radius : 0;
      const xPos = offsetX + (curved ? radius * Math.sin(angle) : i * 20);
      const yPos = offsetY + (curved ? radius * Math.cos(angle) : 0);

      return (
        <circle
          key={seatId}
          cx={xPos}
          cy={yPos}
          r={8}
          fill={isSelected ? "orange" : "green"}
          onClick={() => toggleSeat(seatId)}
          style={{ cursor: "pointer" }}
        />
      );
    });
  };

  const renderVIPSection = (sectionNum, offsetX, offsetY) => {
    const section = vipSections[sectionNum];
    return (
      <g key={`VIP-${sectionNum}`}>
        {section.rows.map((row, idx) =>
          renderSeats(sectionNum, row, section.seats[idx], offsetX, offsetY + idx * 20, section.curved, sectionNum === 104)
        )}
      </g>
    );
  };

  const renderGASection = (sectionNum, offsetX, offsetY) => {
    const section = gaSections[sectionNum];
    return (
      <g key={`GA-${sectionNum}`}>
        {section.rows.map((row, idx) =>
          renderSeats(sectionNum, row, section.seats, offsetX, offsetY + idx * 15, false)
        )}
      </g>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🎟 Seat Picker Preview</h2>
      <svg width="1400" height="1200" style={{ border: "1px solid #ccc" }}>
        <rect x="500" y="20" width="400" height="50" fill="gray" />
        <text x="650" y="50" fill="white">STAGE</text>

        {/* LED Walls */}
        <rect x="400" y="20" width="100" height="50" fill="lightgray" />
        <text x="420" y="50" fill="black">LED Wall</text>
        <rect x="900" y="20" width="100" height="50" fill="lightgray" />
        <text x="920" y="50" fill="black">LED Wall</text>

        {/* VIP Sections */}
        {renderVIPSection(101, 100, 100)}
        {renderVIPSection(102, 500, 100)}
        {renderVIPSection(103, 800, 100)}
        {renderVIPSection(104, 1100, 100)}

        {/* GA Sections */}
        {renderGASection(201, 100, 500)}
        {renderGASection(202, 400, 500)}
        {renderGASection(203, 700, 500)}
        {renderGASection(204, 1000, 500)}
      </svg>
      <div>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
      </div>
    </div>
  );
}
