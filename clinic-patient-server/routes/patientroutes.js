import express from "express";
import { getAllPatients, addPatient, deletePatient } from "../controllers/patientcont.js";
import { verifyToken } from "../controllers/authController.js";
const router = express.Router();
router.use(verifyToken);
// GET /patients - Get all patients
router.get("/", getAllPatients);

// POST /patients - Add new patient
router.post("/", addPatient);

// DELETE /patients/:id - Delete patient
router.delete("/:id", deletePatient);

export default router;