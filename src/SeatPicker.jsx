import React, { useState } from "react";

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
        };
      }
    });
  });

  return { seats, rows: allRows };
};

export default function SeatPicker({ onContinue }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { seats, rows } = generateGASeats();

  const handleClick = (id) => {
    if (!seats[id].available) return;
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getColor = (id) => {
    if (!seats[id].available) return "gray";
    if (selectedSeats.includes(id)) return "orange";
    return "blue";
  };

  const renderSection = (section) => {
    return (
      <div key={section} style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "0.5rem", color: "#333" }}>
          Section {section}
        </h3>
        {rows.map((row) => (
          <div
            key={`${section}-${row}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <span style={{ width: 30, textAlign: "right", marginRight: 8 }}>
              {row}
            </span>
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
    <div
      style={{
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "1rem",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        🎟 Select General Admission Seats
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {["201", "202", "203", "204"].map((section) => (
          <div key={section}>{renderSection(section)}</div>
        ))}
      </div>

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
