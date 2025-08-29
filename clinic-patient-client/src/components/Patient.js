import React, { useState, useEffect } from "react";
import "./Patient.css";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    doctor: "",
    condition: "",
    date: ""
  });

  // Fetch all patients
  const fetchPatients = async () => {
    const token = localStorage.getItem("token");
    
    const response = await fetch("http://localhost:5000/patients", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    
    const data = await response.json();
    setPatients(data);
  };

  // Load patients when page loads
  useEffect(() => {
    fetchPatients();
    
  }, []);

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new patient
  const handleAdd = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    
    const response = await fetch("http://localhost:5000/patients", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const result = await response.json();

    if (response.ok) {
      alert("Patient added successfully!");
      setForm({ name: "", age: "", gender: "", contact: "", doctor: "", condition: "", date: "" });
      fetchPatients();
    } else {
      alert(result.error);
    }
  };

  // Delete patient
  const handleDelete = async (id) => {
    const patient = patients.find(p => p.id === id);
    if (!window.confirm(`Delete ${patient.name}?`)) return;

    const token = localStorage.getItem("token");
    
    const response = await fetch(`http://localhost:5000/patients/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();

    if (response.ok) {
      alert("Patient deleted successfully!");
      fetchPatients();
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="patients-container">
      <h1 className="patients-title">Patients</h1>

      {/* Add Patient Form */}
      <form className="patient-form" onSubmit={handleAdd}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          required
          min="1"
          max="100"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact"
          required
        />

        <input
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          placeholder="Doctor Assigned"
          required
        />

        <textarea
          name="condition"
          value={form.condition}
          onChange={handleChange}
          placeholder="Condition / Notes"
          rows="3"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
        />

        <button type="submit">Add Patient</button>
      </form>

      {/* Patients Table */}
      <table className="patients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Doctor</th>
            <th>Condition</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.length ? (
            patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.contact}</td>
                <td>{p.doctor}</td>
                <td>{p.condition || "N/A"}</td>
                <td>{p.date}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", color: "#777" }}>
                No patients added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}