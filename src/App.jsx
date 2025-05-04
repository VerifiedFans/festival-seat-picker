import React, { useState } from "react";
import SeatPicker from "./SeatPicker";
import ContactForm from "./ContactForm";

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleContinue = (seats) => {
    setSelectedSeats(seats);
    setStep(2);
  };

  const handleSubmitContactInfo = (contactInfo) => {
    console.log("Selected Seats:", selectedSeats);
    console.log("Contact Info:", contactInfo);
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {step === 1 && <SeatPicker onContinue={handleContinue} />}
      {step === 2 && <ContactForm onSubmit={handleSubmitContactInfo} />}
      {step === 3 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">✅ Thank You!</h2>
          <p>We’ve received your reservation info.</p>
        </div>
      )}
    </div>
  );
}
