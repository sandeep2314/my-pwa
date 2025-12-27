import React from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  const user = localStorage.getItem("user");

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}
