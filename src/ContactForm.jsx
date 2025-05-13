import React, { useState } from "react";
import SeatPicker from "./SeatPicker";

export default function ContactForm() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with seats: ", selectedSeats);
    alert(`You have selected: ${selectedSeats.join(", ")}`);
  };

  return (
    <div>
      <SeatPicker onSelect={handleSeatSelect} />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="tel" placeholder="Phone Number" required />
        <textarea placeholder="Full Address" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
