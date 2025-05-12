import React, { useState } from "react";
import SeatPicker from "./SeatPicker";

export default function ContactForm() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [vipSeats, setVipSeats] = useState([]);
  const [gaSeats, setGaSeats] = useState([]);
  const [vipPrice, setVipPrice] = useState(0);
  const [gaPrice, setGaPrice] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
    const vip = seats.filter((s) => s.startsWith("10"));
    const ga = seats.filter((s) => s.startsWith("20"));
    setVipSeats(vip);
    setGaSeats(ga);
    setVipPrice(vip.length * 130);
    setGaPrice(ga.length * 35); // Default to 1-day GA
    setGrandTotal(vip.length * 130 + ga.length * 35);
  };

  return (
    <div>
      <SeatPicker onSeatSelect={handleSeatSelect} />
      <h3>VIP Seats: {vipSeats.length} | Total: ${vipPrice}</h3>
      <h3>GA Seats: {gaSeats.length} | Total: ${gaPrice}</h3>
      <h3>Grand Total: ${grandTotal}</h3>
    </div>
  );
}
