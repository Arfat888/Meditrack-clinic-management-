import express from "express";
import { getAllAppointments, addAppointment, updateAppointmentStatus, deleteAppointment } from "../controllers/appointmentcontrollers.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();
router.use(verifyToken)
// GET /appointments - Get all appointments
router.get("/", getAllAppointments);

// POST /appointments - Add new appointment
router.post("/", addAppointment);

// PUT /appointments/:id/status - Update appointment status
router.put("/:id/status", updateAppointmentStatus);

// DELETE /appointments/:id - Delete appointment (optional)
router.delete("/:id", deleteAppointment);

export default router;