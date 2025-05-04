import React, { useState } from "react";

export default function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md w-full">
      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded mt-2">
        Submit
      </button>
    </form>
  );
}
