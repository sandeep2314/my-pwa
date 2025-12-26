import React, { useState, useEffect } from "react";
import AssignPerson from "./AssignPerson";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [staff, setStaff] = useState([]);

  if (!user) {
    window.location.reload();
    return null;
  }

  // Fetch staff data when page is "assign"
  useEffect(() => {
    if (page !== "assign") return;

    const data = new URLSearchParams({
      key1: "value1",
      key2: "value2",
    }).toString();

    fetch("https://my-pwa-mu.vercel.app/api/getstaff", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then(res => res.text())
      .then(text => {
        console.log("Staff data:", text);
        try {
          setStaff(JSON.parse(text));
        } catch {
          setStaff([]);
          console.error("Failed to parse staff data");
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, [page]);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.brand}>RealSchool</div>
        <h2 style={styles.title}>
          {page === "assign" ? "Assign Person to Location" : "Dashboard"}
        </h2>
        <button style={styles.menuBtn} onClick={() => setOpen(true)}>☰</button>
      </header>

      {/* MAIN AREA */}
      <main style={styles.main}>
        {page === "home" && (
          <div style={styles.card}>
            <h2>Welcome, {user.StaffName}</h2>
            <p><strong>Company:</strong> {user.CompanyName}</p>
            <p><strong>Designation:</strong> {user.Dname}</p>
            <p><strong>Mobile:</strong> {user.MobileNo}</p>

            <button
              style={styles.logoutBtn}
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        )}

        {page === "assign" && (
          <div style={{ width: "100%" }}>
            <AssignPerson staff={staff} />
          </div>
        )}
      </main>

      {/* OVERLAY */}
      {open && <div style={styles.overlay} onClick={() => setOpen(false)} />}

      {/* RIGHT MENU */}
      <aside
        style={{
          ...styles.menu,
          transform: open ? "translateX(0)" : "translateX(100%)"
        }}
      >
        <button style={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
        <h3>Menu</h3>

        <div style={styles.menuItem} onClick={() => { setPage("home"); setOpen(false); }}>Dashboard</div>
        <div style={styles.menuItem} onClick={() => { setPage("assign"); setOpen(false); }}>Assign Person to Location</div>
        <div style={styles.menuItem}>Profile</div>
        <div style={styles.menuItem}>Settings</div>
        <div style={{ ...styles.menuItem, color: "red" }} onClick={() => { localStorage.removeItem("user"); window.location.reload(); }}>Logout</div>
      </aside>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  /* keep your existing styles here */
};
