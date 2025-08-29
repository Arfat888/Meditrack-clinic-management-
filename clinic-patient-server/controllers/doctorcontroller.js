import db from "../config/database.js";

// Get all doctors
export const getAllDoctors = (req, res) => {
  const sql = "SELECT * FROM doctors ORDER BY name";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching doctors:", err);
      return res.status(500).json({ error: "Failed to get doctors" });
    }
    res.json(results);
  });
};

// Get doctor by ID
export const getDoctorById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM doctors WHERE id = ?";
  
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching doctor:", err);
      return res.status(500).json({ error: "Failed to get doctor" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    
    res.json(results[0]);
  });
};

// Get doctors by specialty
export const getDoctorsBySpecialty = (req, res) => {
  const { specialty } = req.params;
  const sql = "SELECT * FROM doctors WHERE specialty = ? ORDER BY name";
  
  db.query(sql, [specialty], (err, results) => {
    if (err) {
      console.error("Error fetching doctors by specialty:", err);
      return res.status(500).json({ error: "Failed to get doctors by specialty" });
    }
    res.json(results);
  });
};

// Get all specialties (for filters)
export const getAllSpecialties = (req, res) => {
  const sql = "SELECT DISTINCT specialty FROM doctors ORDER BY specialty";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching specialties:", err);
      return res.status(500).json({ error: "Failed to get specialties" });
    }
    
    // Convert to simple array of strings
    const specialties = results.map(row => row.specialty);
    res.json(specialties);
  });
};