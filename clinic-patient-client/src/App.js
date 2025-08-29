import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Patients from "./components/Patient";
import Doctors from "./components/Doctors";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Appointments from "./components/dashboard/Appointments"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/patients"
          element={
            <DashboardLayout>
              <Patients />
            </DashboardLayout>
          }
        />
        <Route
          path="/doctors"
          element={
            <DashboardLayout>
              <Doctors />
            </DashboardLayout>
          }
        />
        
        <Route
          path="/appointments"
          element={
            <DashboardLayout>
              <Appointments />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
