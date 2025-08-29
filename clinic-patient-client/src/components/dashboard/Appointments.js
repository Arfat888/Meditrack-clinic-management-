import React, { useState, useEffect } from "react";
import "./Appointments.css";

// Doctor list
const doctors = [
  "Dr. Sami Aslam (Cardiologist)",
  "Dr. Ali Khan (Neurologist)",
  "Dr. Fatima Noor (Dermatologist)",
  "Dr. Zeeshan (Dermatologist)",
  "Dr. Yahya Aziz (General Physician)",
  "Dr. Sarah Ahmed (Dentist)",
  "Dr. Oun Rind (Physician)"
];

// Format date to YYYY-MM-DD
const formatDate = (date) => date ? date.split("T")[0] : "N/A";

export default function Appointments() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");

  const token = localStorage.getItem("token");

  // Load patients + appointments on first render
  useEffect(() => {
    fetchPatients();
    fetchAppointments();
  }, []);

  // Fetch patients
  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost:5000/patients", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(await res.json());
    } catch (err) {
      console.error("Error loading patients:", err);
    }
  };

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/appointments", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(await res.json());
    } catch (err) {
      console.error("Error loading appointments:", err);
    }
  };

  // Book new appointment
  const bookAppointment = async () => {
    if (!selectedPatientId || !doctor || !time) {
      return alert("Please fill all fields!");
    }

    const patient = patients.find(p => p.id === +selectedPatientId);

    const newAppointment = {
      patient_id: patient.id,
      patient_name: patient.name,
      doctor_name: doctor,
      appointment_time: time,
      appointment_date: formatDate(patient.date),
      condition_notes: patient.condition || ""
    };

    try {
      const res = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(newAppointment),
      });

      const result = await res.json();

      if (result.message) {
        alert("Appointment booked!");
        setSelectedPatientId("");
        setDoctor("");
        setTime("");
        fetchAppointments();
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      alert("Booking failed: " + err.message);
    }
  };

  // Update appointment status
  const updateStatus = async (id, status) => {
    const confirmText = status === "done" 
      ? "Mark this appointment as completed?" 
      : "Cancel this appointment?";
    if (!window.confirm(confirmText)) return;

    try {
      const res = await fetch(`http://localhost:5000/appointments/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      const result = await res.json();

      if (result.message) {
        alert(`Appointment ${status}!`);
        fetchAppointments();
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  return (
    <div className="appointments-container">
      <h1>Appointments</h1>

      {/* Patients Table */}
      <h2>Available Patients</h2>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Contact</th><th>Condition</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {patients.length ? patients.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.contact}</td>
              <td>{p.condition || "N/A"}</td>
              <td>{formatDate(p.date)}</td>
            </tr>
          )) : (
            <tr><td colSpan="5">No patients found</td></tr>
          )}
        </tbody>
      </table>

      {/* Appointment Form */}
      <h2>Book Appointment</h2>
      <div className="appointment-form">
        <select value={selectedPatientId} onChange={e => setSelectedPatientId(e.target.value)}>
          <option value="">Choose Patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <select value={doctor} onChange={e => setDoctor(e.target.value)}>
          <option value="">Choose Doctor</option>
          {doctors.map((d, i) => <option key={i} value={d}>{d}</option>)}
        </select>

        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        <button onClick={bookAppointment}>Book</button>
      </div>

      {/* Appointments Table */}
      <h2>All Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient</th><th>Doctor</th><th>Condition</th>
            <th>Time</th><th>Date</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length ? appointments.map(a => (
            <tr key={a.id}>
              <td>{a.patient_name}</td>
              <td>{a.doctor_name}</td>
              <td>{a.condition_notes || "N/A"}</td>
              <td>{a.appointment_time}</td>
              <td>{formatDate(a.appointment_date)}</td>
              <td>
                <span style={{ 
                  color: a.status === "scheduled" ? "#007bff" : 
                         a.status === "done" ? "#28a745" : "#dc3545",
                  fontWeight: "bold"
                }}>
                  {a.status.toUpperCase()}
                </span>
              </td>
              <td>
                {a.status === "scheduled" ? (
                  <>
                    <button className="markdone-btn" onClick={() => updateStatus(a.id, "done")}>Mark Done</button>
                    <button className="cancel-btn" onClick={() => updateStatus(a.id, "cancelled")}>Cancel</button>
                  </>
                ) : <span>-</span>}
              </td>
            </tr>
          )) : (
            <tr><td colSpan="7">No appointments yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
