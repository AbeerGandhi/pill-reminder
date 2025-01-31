import React, { useState } from "react";

const MedicineForm = ({ addMedicine }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type || !quantity || !time) return;

    addMedicine({ name, type, quantity: parseInt(quantity), time });
    setName("");
    setType("");
    setQuantity("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", textAlign: "center" }}>
      <input type="text" placeholder="Medicine Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} required />
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <button type="submit">Add Medicine</button>
    </form>
  );
};

export default MedicineForm;
