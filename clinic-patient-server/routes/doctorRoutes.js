import express from "express";
import { 
  getAllDoctors, 
  getDoctorById, 
  getDoctorsBySpecialty, 
  getAllSpecialties 
} from "../controllers/doctorcontroller.js";
import { verifyToken } from "../controllers/authController.js";


const router = express.Router();
router.use(verifyToken);
// Routes
router.get("/", getAllDoctors);                    // GET /doctors - Get all doctors
router.get("/specialties", getAllSpecialties);    // GET /doctors/specialties  Get all specialties
router.get("/specialty/:specialty", getDoctorsBySpecialty); // GET /doctors/specialty/Cardiologist
router.get("/:id", getDoctorById);                 // GET /doctors/1 - Get doctor by ID

export default router;