import React, { useState } from "react";
import SeatPicker from "./SeatPicker";
import ContactForm from "./ContactForm";

export default function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <div className="App">
      <h1>🎟 Singing in the Smokies Ticket Selector</h1>
      <SeatPicker onSeatSelect={setSelectedSeats} />
      <ContactForm selectedSeats={selectedSeats} />
    </div>
  );
}
