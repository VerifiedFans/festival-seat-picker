import React from "react";
import ContactForm from "./ContactForm";
import SeatPicker from "./SeatPicker";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎟️ Festival Seat Picker</h1>
      <SeatPicker />
      <ContactForm 
        selectedSeats={["GA-A1", "GA-B2"]} // Example, should come from SeatPicker
        onConfirm={() => alert("Form Submitted")}
      />
    </div>
  );
}

export default App;
