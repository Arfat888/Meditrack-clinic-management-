import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Doctors.css";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load data when component mounts
  useEffect(() => {
    loadDoctors();
    loadSpecialties();
  }, []);

  // Get all doctors from backend (with JWT auth)
  const loadDoctors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/doctors", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Unauthorized or failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error loading doctors:", error);
      alert("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  // Get all specialties from backend (with JWT auth)
  const loadSpecialties = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/doctors/specialties", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Unauthorized or failed to fetch specialties");
      }
      const data = await response.json();
      setSpecialties(data);
    } catch (error) {
      console.error("Error loading specialties:", error);
    }
  };

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      filterSpecialty === "" || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  // Go to appointments page
  const bookAppointment = () => {
    navigate("/appointments");
  };

  if (loading) {
    return (
      <div className="doctors-page">
        <div className="loading">
          <h2>Loading doctors... 👨‍⚕️</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="doctors-page">
      <h1 className="doctors-title">Our Doctors</h1>

      {/* Search and Filter */}
      <div className="doctors-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="specialty-filter"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctors Cards */}
      <div className="doctors-container">
        {filteredDoctors.length ? (
          filteredDoctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <div className="doctor-image-container">
                <img src={doc.image_url} alt={doc.name} className="doctor-img" />
              </div>

              <div className="doctor-info">
                <h3 className="doctor-name">{doc.name}</h3>
                <p className="doctor-specialty">{doc.specialty}</p>

                <div className="doctor-details">
                  <div className="detail-item">
                    <span className="detail-icon">👨‍⚕️</span>
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{doc.experience}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <span className="detail-label">Contact:</span>
                    <span className="detail-value">{doc.contact}</span>
                  </div>

                  <div className="detail-item availability">
                    <span className="detail-icon">🕒</span>
                    <span className="detail-label">Available:</span>
                    <span className="detail-value">{doc.availability}</span>
                  </div>
                </div>

                <div className="doctor-actions">
                  <button className="view-profile-btn">👤 View Profile</button>
                  <button
                    className="book-appointment-btn"
                    onClick={bookAppointment}
                  >
                    📅 Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-doctors">
            <p>No doctors found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="doctors-stats">
        <div className="stat-card">
          <span className="stat-number">{filteredDoctors.length}</span>
          <span className="stat-label">Doctors Available</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{specialties.length}</span>
          <span className="stat-label">Specialties</span>
        </div>
      </div>
    </div>
  );
}
