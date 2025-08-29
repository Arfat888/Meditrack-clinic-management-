import db from "../config/database.js";

// Get all patients
export const getAllPatients = (req, res) => {
  const sql = "SELECT id, name, age, gender, contact, doctor, medical_condition as `condition`, appointment_date as `date` FROM patients";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.json({ error: "Failed to get patients" });
    }
    res.json(results);
  });
};

// Add new patient
export const addPatient = (req, res) => {
  const { name, age, gender, contact, doctor, condition, date } = req.body;
  
  const sql = "INSERT INTO patients (name, age, gender, contact, doctor, medical_condition, appointment_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
  db.query(sql, [name, age, gender, contact, doctor, condition, date], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.json({ error: "Failed to add patient" });
    }
    res.json({ message: "Patient added successfully!" });
  });
};

// Delete patient
export const deletePatient = (req, res) => {
  const patientId = req.params.id;
  
  const sql = "DELETE FROM patients WHERE id = ?";
  db.query(sql, [patientId], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.json({ error: "Failed to delete patient" });
    }
    res.json({ message: "Patient deleted successfully!" });
  });
};