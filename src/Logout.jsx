import React, { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Redirect to login page after logout
    window.location.href = "/";
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging out...</h2>
    </div>
  );
}
