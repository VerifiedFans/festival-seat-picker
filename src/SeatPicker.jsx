import React, { useState } from "react";
import SeatPicker from "react-seat-picker";

export default function FestivalSeatPicker({ onSelect }) {
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const vipRows = [
    [{ id: "101-A1" }, { id: "101-A2" }, { id: "101-A3" }],
    [{ id: "101-B1" }, { id: "101-B2" }, { id: "101-B3" }, { id: "101-B4" }, { id: "101-B5" }],
    [{ id: "101-C1" }, { id: "101-C2" }, { id: "101-C3" }, { id: "101-C4" }, { id: "101-C5" }, { id: "101-C6" }, { id: "101-C7" }],
  ];

  const gaRows = Array.from({ length: 26 }, (_, index) => {
    return Array.from({ length: 12 }, (_, seatIndex) => ({
      id: `201-${String.fromCharCode(65 + index)}${seatIndex + 1}`,
    }));
  });

  const addSeatCallback = ({ row, number, id }, addCb) => {
    setLoading(true);
    console.log(`Added seat ${number}, row ${row}, id ${id}`);
    addCb(row, number, id);
    setLoading(false);

    const updatedSeats = [...selectedSeats, id];
    setSelectedSeats(updatedSeats);
    onSelect(updatedSeats);
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    setLoading(true);
    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    removeCb(row, number);
    setLoading(false);

    const updatedSeats = selectedSeats.filter((seat) => seat !== id);
    setSelectedSeats(updatedSeats);
    onSelect(updatedSeats);
  };

  return (
    <div>
      <h2>🎟 Singing in the Smokies Ticket Selector</h2>
      <h3>VIP Section</h3>
      <SeatPicker
        addSeatCallback={addSeatCallback}
        removeSeatCallback={removeSeatCallback}
        rows={vipRows}
        maxReservableSeats={10}
        alpha
        visible
        selectedByDefault
        loading={loading}
      />
      <h3>GA Section</h3>
      <SeatPicker
        addSeatCallback={addSeatCallback}
        removeSeatCallback={removeSeatCallback}
        rows={gaRows}
        maxReservableSeats={20}
        alpha
        visible
        selectedByDefault
        loading={loading}
      />
    </div>
  );
}
