import React, { useState } from "react";

// VIP seat layout
const vipConfig = {
  "101": [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9],
  "102": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  "103": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  "104": [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9],
};

// GA seat layout
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

const generateVIPSeats = () => {
  const seats = {};
  Object.entries(vipConfig).forEach(([section, seatCounts]) => {
    seatCounts.forEach((count, rowIndex) => {
      const rowLabel = String.fromCharCode(65 + rowIndex); // A, B, C...
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
      <div key={section} style={{ marginBottom: "1.5rem" }}>
        <h3>VIP Section {section}</h3>
        {seatCounts.map((count, rowIdx) => {
          const row = String.fromCharCode(65 + rowIdx);
          const startPad = (20 - count) / 2; // center offset
          return (
            <div key={`${section}-${row}`} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
              <span style={{ width: 30, textAlign: "right", marginRight: 8 }}>{row}</span>
              <div style={{ display: "flex", gap: 4 }}>
                {Array.from({ length: Math.floor(startPad) }).map((_, i) => (
                  <span key={i} style={{ width: 16 }} />
                ))}
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
                        backgroundColor: getColor(id),
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    />
                  );
                })}
              </div>
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
    <div style={{ maxHeight: "80vh", overflowY: "scroll", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>🎟 Select Your Seats</h2>

      {/* LED walls */}
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <span style={{ backgroundColor: "gray", padding: "0.25rem 1rem", margin: "0 1rem", display: "inline-block" }}>
          LED WALL
        </span>
        <span style={{ backgroundColor: "darkgray", padding: "0.25rem 1rem", margin: "0 1rem", display: "inline-block" }}>
          STAGE
        </span>
        <span style={{ backgroundColor: "gray", padding: "0.25rem 1rem", margin: "0 1rem", display: "inline-block" }}>
          LED WALL
        </span>
      </div>

      {/* VIP Sections */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
        {["101", "102", "103", "104"].map(renderVIPSection)}
      </div>

      <hr style={{ margin: "2rem 0", borderColor: "#ccc" }} />

      {/* GA Sections */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
        {["201", "202", "203", "204"].map(renderGASection)}
      </div>

      {/* Continue */}
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
