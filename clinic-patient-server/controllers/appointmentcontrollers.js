import db from "../config/database.js";

// Get all appointments
export const getAllAppointments = (req, res) => {
  const sql = "SELECT id, patient_id, patient_name, doctor_name, appointment_time, appointment_date, condition_notes, status, created_at FROM appointments ORDER BY appointment_date DESC, appointment_time DESC";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.json({ error: "Failed to get appointments" });
    }
    res.json(results);
  });
};

// Add new appointment
export const addAppointment = (req, res) => {
  const { patient_id, patient_name, doctor_name, appointment_time, appointment_date, condition_notes } = req.body;
  
  const sql = "INSERT INTO appointments (patient_id, patient_name, doctor_name, appointment_time, appointment_date, condition_notes, status) VALUES (?, ?, ?, ?, ?, ?, 'scheduled')";
  
  db.query(sql, [patient_id, patient_name, doctor_name, appointment_time, appointment_date, condition_notes], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.json({ error: "Failed to add appointment" });
    }
    res.json({ message: "Appointment added successfully!" });
  });
};

// Update appointment status (Mark as Done or Cancel)
export const updateAppointmentStatus = (req, res) => {
  const appointmentId = req.params.id;
  const { status } = req.body;
  
  // Validate status
  if (!['scheduled', 'done', 'cancelled'].includes(status)) {
    return res.json({ error: "Invalid status. Use: scheduled, done, or cancelled" });
  }
  
  const sql = "UPDATE appointments SET status = ? WHERE id = ?";
  
  db.query(sql, [status, appointmentId], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.json({ error: "Failed to update appointment status" });
    }
    
    if (result.affectedRows === 0) {
      return res.json({ error: "Appointment not found" });
    }
    
    res.json({ message: `Appointment marked as ${status} successfully!` });
  });
};

// Delete appointment (if needed later)
export const deleteAppointment = (req, res) => {
  const appointmentId = req.params.id;
  
  const sql = "DELETE FROM appointments WHERE id = ?";
  
  db.query(sql, [appointmentId], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.json({ error: "Failed to delete appointment" });
    }
    res.json({ message: "Appointment deleted successfully!" });
  });
};