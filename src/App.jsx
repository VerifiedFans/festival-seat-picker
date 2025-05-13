import React, { useState } from "react";
import FestivalSeatPicker from "./SeatPicker";
import ContactForm from "./ContactForm";

export default function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <div>
      <FestivalSeatPicker onSelect={setSelectedSeats} />
      <ContactForm selectedSeats={selectedSeats} />
    </div>
  );
}
