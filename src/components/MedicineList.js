import React, { useEffect } from "react";

const MedicineList = ({ medicines, setMedicines }) => {
  useEffect(() => {
    const today = new Date().toDateString();
    const lastUpdate = localStorage.getItem("lastUpdate");

    if (lastUpdate !== today) {
      const updatedMeds = medicines.map((med) =>
        med.quantity > 0 ? { ...med, quantity: med.quantity - 1 } : med
      );
      setMedicines(updatedMeds);
      localStorage.setItem("medicines", JSON.stringify(updatedMeds));
      localStorage.setItem("lastUpdate", today);
    }
  }, [medicines, setMedicines]);

  const handleDelete = (index) => {
    const newMeds = medicines.filter((_, i) => i !== index);
    setMedicines(newMeds);
    localStorage.setItem("medicines", JSON.stringify(newMeds));
  };

  return (
    <div>
      <h3>Medicine List</h3>
      {medicines.length === 0 ? <p>No medicines added</p> : null}
      {medicines.map((med, index) => (
        <div key={index} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
          <p><strong>{med.name}</strong> ({med.type})</p>
          <p>Quantity: {med.quantity}</p>
          <p>Time: {med.time}</p>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MedicineList;
