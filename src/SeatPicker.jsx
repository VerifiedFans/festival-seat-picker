import React, { useState } from "react";
import "./SeatPicker.css";

const SeatPicker = ({ onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const sections = {
    VIP: {
      101: { rows: "ABCDEFGHIJKLMN", seats: [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9] },
      104: { rows: "ABCDEFGHIJKLMN", seats: [3, 5, 7, 9, 11, 13, 15, 17, 17, 15, 13, 11, 9] },
      102: { rows: "ABCDEFGHIJKL", seats: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
      103: { rows: "ABCDEFGHIJKL", seats: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
    },
    GA: {
      201: { rows: "ABCDEFGHIJKLMNOPQRSTUVWXYZAAABACADAEAF", seats: 12 },
      202: { rows: "ABCDEFGHIJKLMNOPQRSTUVWXYZAAABACADAEAF", seats: 12 },
      203: { rows: "ABCDEFGHIJKLMNOPQRSTUVWXYZAAABACADAEAF", seats: 12 },
      204: { rows: "ABCDEFGHIJKLMNOPQRSTUVWXYZAAABACADAEAF", seats: 12 },
    },
  };

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
    onSeatSelect(seatId);
  };

  const renderSection = (sectionName, sectionData, isVIP = false) => {
    return Object.keys(sectionData).map((section) => (
      <div key={section} className={`section ${isVIP ? "vip" : "ga"}`}>
        <h4>{`Section ${section}`}</h4>
        {sectionData[section].rows.split("").map((row, rowIndex) => (
          <div key={row} className="row">
            {Array.from(
              { length: isVIP ? sectionData[section].seats[rowIndex] : sectionData[section].seats },
              (_, seatIndex) => {
                const seatId = `${section}-${row}${seatIndex + 1}`;
                return (
                  <div
                    key={seatId}
                    className={`seat ${selectedSeats.includes(seatId) ? "selected" : ""}`}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {seatIndex + 1}
                  </div>
                );
              }
            )}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="seat-picker">
      <div className="stage">
        <div className="led-wall">LED Wall</div>
        <div className="stage-text">STAGE</div>
        <div className="led-wall">LED Wall</div>
      </div>

      <div className="vip-sections">
        {renderSection("VIP", sections.VIP, true)}
      </div>

      <div className="ga-sections">
        {renderSection("GA", sections.GA, false)}
      </div>

      <div className="selected-seats">
        <h4>Selected Seats:</h4>
        {selectedSeats.join(", ")}
      </div>
    </div>
  );
};

export default SeatPicker;
