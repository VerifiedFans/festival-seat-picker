import React, { useState } from "react";
import SeatPicker from "./SeatPicker";
import ContactForm from "./ContactForm";
import "./App.css";

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
    );
  };

  return (
    <div className="app-container">
      <h1>🎟 Singing in the Smokies Ticket Selector</h1>
      
      {/* Seat Picker Section */}
      <div className="picker-container">
        <SeatPicker onSeatSelect={handleSeatSelect} />
      </div>

      {/* Divider */}
      <hr className="divider" />

      {/* Contact Form Section */}
      <div className="form-container">
        <ContactForm selectedSeats={selectedSeats} />
      </div>
    </div>
  );
};

export default App;
