// src/components/Menu.jsx
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div style={{
      width: "200px",
      background: "#1e1e1e",
      color: "#fff",
      height: "100vh",
      padding: "20px"
    }}>
      <h3>Dashboard</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/dashboard" style={linkStyle}>Home</Link></li>
        <li><Link to="/profile" style={linkStyle}>Profile</Link></li>
         <li><Link to="/assign" style={linkStyle}>Assign Person to Location</Link></li>
        <li><Link to="/settings" style={linkStyle}>Settings</Link></li>
        <li><Link to="/logout" style={linkStyle}>Logout</Link></li>
      </ul>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  padding: "10px 0"
};
