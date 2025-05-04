
import React, { useState } from "react";

// VIP configuration
const vipConfig = {
  "101": [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9],
  "102": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  "103": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  "104": [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9],
};

// Generate GA seating
const generateGASeats = () => {
  const baseRows = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const extraRows = ["AA", "BB", "CC", "DD", "EE", "FF"];
  const allRows = [...baseRows, ...extraRows];
  const seatsPerRow = 12;
  const sections = ["201", "202", "203", "204"];
  const seats = {};

  sections.forEach((section) => {
    allRows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const id = `${section}-${row}${i}`;
        seats[id] = {
          section,
          row,
          seat: i,
          id,
          available: true,
          type: "GA",
        };
      }
    });
  });

  return { seats, rows: allRows };
};

// Generate VIP seating
const generateVIPSeats = () => {
  const seats = {};
  Object.entries(vipConfig).forEach(([section, seatCounts]) => {
    seatCounts.forEach((count, rowIndex) => {
      const rowLabel = String.fromCharCode(65 + rowIndex);
      for (let i = 1; i <= count; i++) {
        const id = `${section}-${rowLabel}${i}`;
        seats[id] = {
          section,
          row: rowLabel,
          seat: i,
          id,
          available: true,
          type: "VIP",
        };
      }
    });
  });
  return seats;
};

export default function SeatPicker({ onContinue }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { seats: gaSeats, rows: gaRows } = generateGASeats();
  const vipSeats = generateVIPSeats();
  const allSeats = { ...vipSeats, ...gaSeats };

  const handleClick = (id) => {
    if (!allSeats[id].available) return;
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getColor = (id) => {
    if (!allSeats[id].available) return "gray";
    if (selectedSeats.includes(id)) return "orange";
    return allSeats[id].type === "VIP" ? "green" : "blue";
  };

  const renderVIPSection = (section) => {
    const seatCounts = vipConfig[section];
    return (
      <div
        key={section}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 1rem",
          minWidth: "220px",
        }}
      >
        <h4 style={{ marginBottom: "0.25rem" }}>VIP {section}</h4>
        {seatCounts.map((count, rowIdx) => {
          const row = String.fromCharCode(65 + rowIdx);
          const totalWidth = 220;
          const seatWidth = 20;
          const totalSeatWidth = count * seatWidth;
          const pad = (totalWidth - totalSeatWidth) / 2;

          return (
            <div
              key={`${section}-${row}`}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "4px",
                width: totalWidth,
                paddingLeft: pad,
              }}
            >
              {Array.from({ length: count }).map((_, i) => {
                const id = `${section}-${row}${i + 1}`;
                return (
                  <span
                    key={id}
                    title={id}
                    onClick={() => handleClick(id)}
                    style={{
                      display: "inline-block",
                      width: 16,
                      height: 16,
                      margin: "0 2px",
                      backgroundColor: getColor(id),
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderGASection = (section) => {
    return (
      <div key={section} style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "0.5rem", color: "#333" }}>Section {section}</h3>
        {gaRows.map((row) => (
          <div key={`${section}-${row}`} style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
            <span style={{ width: 30, textAlign: "right", marginRight: 8 }}>{row}</span>
            {Array.from({ length: 12 }).map((_, idx) => {
              const id = `${section}-${row}${idx + 1}`;
              return (
                <span
                  key={id}
                  title={id}
                  onClick={() => handleClick(id)}
                  style={{
                    display: "inline-block",
                    width: 16,
                    height: 16,
                    margin: "0 2px",
                    backgroundColor: getColor(id),
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ maxHeight: "80vh", overflowY: "auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>🎟 Select Your Seats</h2>

      {/* LED + Stage header */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <span style={{ backgroundColor: "gray", padding: "0.25rem 1rem", margin: "0 1rem" }}>LED WALL</span>
        <span style={{ backgroundColor: "darkgray", padding: "0.25rem 1rem", margin: "0 1rem" }}>STAGE</span>
        <span style={{ backgroundColor: "gray", padding: "0.25rem 1rem", margin: "0 1rem" }}>LED WALL</span>
      </div>

      {/* VIP Layout */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "nowrap",
          marginBottom: "2rem",
        }}
      >
        {["101", "102", "103", "104"].map(renderVIPSection)}
      </div>

      {/* GA Layout */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
        {["201", "202", "203", "204"].map(renderGASection)}
      </div>

      {/* Selected Seats + Continue */}
      {selectedSeats.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <p>Selected: {selectedSeats.join(", ")}</p>
          <button
            onClick={() => onContinue(selectedSeats)}
            style={{
              padding: "0.5rem 1.5rem",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 4,
              marginTop: 8,
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
