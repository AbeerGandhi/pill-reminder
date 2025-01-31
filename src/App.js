import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [medicines, setMedicines] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("Tablet");
    const [quantity, setQuantity] = useState("");
    const [time, setTime] = useState("");

    // Load saved medicines from local storage
    useEffect(() => {
        const savedMedicines = JSON.parse(localStorage.getItem("medicines")) || [];
        setMedicines(savedMedicines);
    }, []);

    // Save medicines to local storage
    useEffect(() => {
        localStorage.setItem("medicines", JSON.stringify(medicines));
    }, [medicines]);

    // Request permission to show notifications
    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    }, []);

    // Function to show notification
    const showNotification = (medicineName) => {
        if (Notification.permission === "granted") {
            new Notification("Pill Reminder", {
                body: `Time to take your medicine: ${medicineName}`,
                icon: "https://media.istockphoto.com/id/1223736534/vector/medicine-icon-vector-illustration-medicine-vector-illustration-template-medicine-icon-design.jpg?s=612x612&w=0&k=20&c=6KbGouxosnFUXGPA_3z1BJZs7W99Q4T4HNGzM6u-H6Y=",
            });
        }
    };

    // Function to schedule notification with more precise checking
    const scheduleNotification = (medicineName, medicineTime) => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const selectedTime = new Date(now.toDateString() + " " + medicineTime);

            // Calculate the difference in milliseconds
            const timeDiff = selectedTime - now;

            // If the current time matches or is just a second before, trigger the notification
            if (timeDiff <= 1000 && timeDiff >= 0) {
                showNotification(medicineName);
                clearInterval(intervalId); // Stop checking after notification is shown
            }
        }, 100); // Check every 100 milliseconds (faster checking)
    };

    // Function to add medicine
    const addMedicine = (e) => {
        e.preventDefault();
        if (!name || !quantity || !time) return;

        const newMedicine = { name, type, quantity: parseInt(quantity), time };
        setMedicines([...medicines, newMedicine]);

        // Schedule notification
        scheduleNotification(name, time);

        setName("");
        setQuantity("");
        setTime("");
    };

    // Function to delete medicine
    const deleteMedicine = (index) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <h1>Pill Reminder</h1>
            <form onSubmit={addMedicine}>
                <input
                    type="text"
                    placeholder="Medicine Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                </select>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <button type="submit">Add Medicine</button>
            </form>
        
            <div className="medicine-list">
                {medicines.length > 0 ? (
                    medicines.map((med, index) => (
                        <div key={index} className="medicine-item">
                            <span>{med.name} ({med.type}) - {med.quantity} to take at {med.time}</span>
                            <button className="delete-btn" onClick={() => deleteMedicine(index)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No medicines added.</p>
                )}
            </div>
        </div>
    );
}

export default App;
