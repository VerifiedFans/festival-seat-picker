import React, { useState } from "react";
import SeatPicker from "./SeatPicker";
import ContactForm from "./ContactForm";
// 1. Add this state near the top of your component with your other useState calls
const [checkoutData, setCheckoutData] = useState(null);

// 2. Find where you're currently showing both forms,
// and replace that code with this:

{!checkoutData ? (
  // Show the checkout form first
  <CheckoutForm 
    selectedSeats={selectedSeats} 
    onConfirm={setCheckoutData} 
  />
) : (
  // Then show the contact form with the checkout data
  <ContactForm 
    selectedSeats={selectedSeats}
    selectedDaysData={checkoutData}
    onSuccess={handleFormSuccess} // Use your existing success handler
  />
)}export default function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [step, setStep] = useState("seats"); // seats → form → done

  const handleContinue = (seats) => {
    setSelectedSeats(seats);
    setStep("form");
  };

  const handleSuccess = () => {
    setStep("done");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {step === "seats" && <SeatPicker onContinue={handleContinue} />}
      {step === "form" && (
        <ContactForm selectedSeats={selectedSeats} onSuccess={handleSuccess} />
      )}
      {step === "done" && (
        <div style={{ textAlign: "center" }}>
          <h2>✅ Thanks for your request!</h2>
          <p>We’ll follow up by email or text soon.</p>
        </div>
      )}
    </div>
  );
}
