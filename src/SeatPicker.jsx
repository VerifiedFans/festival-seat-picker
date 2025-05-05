import React, { useState } from "react";

// Unified VIP layout definition
const vipRows = [
  { row: "A", seats: [3, 8, 8, 3] },
  { row: "B", seats: [5, 9, 9, 5] },
  { row: "C", seats: [7, 10, 10, 7] },
  { row: "D", seats: [9, 11, 11, 9] },
  { row: "E", seats: [11, 12, 12, 11] },
  { row: "F", seats: [13, 13, 13, 13] },
  { row: "G", seats: [15, 14, 14, 15] },
  { row: "H", seats: [17, 15, 15, 17] },
  { row: "I", seats: [17, 16, 16, 17] },
  { row: "J", seats: [15, 17, 17, 15] },
  { row: "K", seats: [13, 18, 18, 13] },
  { row: "L", seats: [11, 19, 19, 11] },
  { row: "M", seats: [9, 18, 18, 9] },
];

const curvePadding = {
  "101": {
    A: 4, B: 5, C: 7, D: 9, E: 11, F: 13, G: 15, H: 16, I: 17, J: 18, K: 19, L: 20, M: 20,
  },
  "104": {
    A: 4, B: 5, C: 7, D: 9, E: 11, F: 13, G: 15, H: 16, I: 17, J: 18, K: 19, L: 20, M: 20,
  },
};

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

export default function SeatPicker({ onContinue }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { seats: gaSeats, rows: gaRows } = generateGASeats();

  const vipSeats = {};
  const vipSections = ["101", "102", "103", "104"];
  vipRows.forEach(({ row, seats }) => {
    seats.forEach((count, sectionIdx) => {
      const section = vipSections[sectionIdx];
      for (let i = 1; i <= count; i++) {
        const id = `${section}-${row}${i}`;
        vipSeats[id] = {
          section,
          row,
          seat: i,
          id,
          available: true,
          type: "VIP",
        };
      }
    });
  });

  const allSeats = { ...vipSeats, ...gaSeats };

  const handleClick = (id) => {
    if (!allSeats[id]?.available) return;
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getColor = (id) => {
    if (!allSeats[id]?.available) return "gray";
    if (selectedSeats.includes(id)) return "orange";
    return allSeats[id].type === "VIP" ? "green" : "blue";
  };

  const renderVIPUnified = () => {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>VIP Sections</h3>
        {vipRows.map(({ row, seats }) => {
          let seatElements = [];

          seats.forEach((count, i) => {
            const section = vipSections[i];
            const padLeft = section === "101" ? curvePadding["101"][row] : 0;
            const padRight = section === "104" ? curvePadding["104"][row] : 0;

            const seatRotation =
              section === "101"
                ? "rotate(-15deg)"
                : section === "104"
                ? "rotate(15deg)"
                : "none";

            const sectionSeats = [];

            for (let j = 1; j <= count; j++) {
              const id = `${section}-${row}${j}`;
              sectionSeats.push(
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
                    transform: seatRotation,
                  }}
                />
              );
            }

            if (padLeft)
              seatElements.push(
                <span key={`pad-left-${section}-${row}`} style={{ width: padLeft }} />
              );

            seatElements.push(...sectionSeats);

            if (padRight)
              seatElements.push(
                <span key={`pad-right-${section}-${row}`} style={{ width: padRight }} />
              );

            if (i < 3) {
              seatElements.push(
                <span key={`aisle-${row}-${i}`} style={{ width: 30 }} />
              );
            }
          });

          return (
            <div
              key={`vip-row-${row}`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <span style={{ width: 20, marginRight: 6 }}>{row}</span>
              {seatElements}
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
          <div
            key={`${section}-${row}`}
            style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
          >
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
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        🎟 Select Your Seats
      </h2>

      {/* LED + Stage */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <span style={{ backgroundColor: "gray", padding: "0.25rem 1rem", margin: "0 1rem" }}>
          LED WALL
        </span>
        <span style={{ backgroundColor: "darkgray", padding: "0.25rem 1rem", margin: "0 1rem" }}>
          STAGE
        </span>
        <span style={{ backgroundColor: "gray", padding: "0.25rem 1rem", margin: "0 1rem" }}>
          LED WALL
        </span>
      </div>

      {/* VIP Unified */}
      <div style={{ marginBottom: "2rem" }}>{renderVIPUnified()}</div>

      {/* GA Sections */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {["201", "202", "203", "204"].map(renderGASection)}
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
