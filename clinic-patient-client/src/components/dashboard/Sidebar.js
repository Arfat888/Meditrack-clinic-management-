
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="dt-sidebar">
      <ul>
        <li onClick={() => navigate("/Dashboard")}>Home</li>
        <li onClick={() => navigate("/patients")}>Patients</li>
        <li onClick={() => navigate("/Appointments")}>Appointments</li>
        <li onClick={() => navigate("/Doctors")}>Doctors</li>
      </ul>
    </div>
  );
}
