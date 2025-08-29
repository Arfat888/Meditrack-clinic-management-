import React, { useState, useEffect } from 'react';

const Home = () => {
  const [patientsCount, setPatientsCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const doctorsCount = 7; 

  // Load counts when page loads
  useEffect(() => {
    fetchPatientCount();
    fetchAppointmentCount();
  }, []);

  // Common headers with JWT token
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  });

  // Get patient count from backend
  const fetchPatientCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/patients", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch patients");
      const data = await response.json();
      setPatientsCount(data.length);
    } catch (error) {
      console.error("Error fetching patients count:", error);
      setPatientsCount(0);
    }
  };

  // Get appointment count from backend
  const fetchAppointmentCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/appointments", {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointmentsCount(data.length);
    } catch (error) {
      console.error("Error fetching appointments count:", error);
      setAppointmentsCount(0);
    }
  };

  return (
    <div className="home-wrapper">
      <div className="cards">
        <div className="card">
          <div className="card-title">Total Patients</div>
          <div className="card-value">{patientsCount}</div>
        </div>
        <div className="card">
          <div className="card-title">Appointments</div>
          <div className="card-value">{appointmentsCount}</div>
        </div>
        <div className="card">
          <div className="card-title">Doctors</div>
          <div className="card-value">{doctorsCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
