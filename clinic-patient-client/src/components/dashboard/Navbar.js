
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="dt-navbar">
      <div className="dt-left">
        <div className="brand">MediTrack</div>
      </div>
      
      <div className="dt-right">
        <div className="user">
          <div className="user-name">Admin</div>
          <div className="user-dropdown-container">
            <div className="user-dot" onClick={() => setOpen(!open)} />
            
            {open && 
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => navigate('/')}>
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;