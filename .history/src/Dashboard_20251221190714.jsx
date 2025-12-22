import React, { useState } from "react";
import AssignPerson from "./AssignPerson";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("home");

  if (!user) {
    window.location.reload();
    return null;
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.brand}>RealSchool</div>
        <h2 style={styles.title}>
          {page === "assign" ? "Assign Person to Location" : "Dashboard"}
        </h2>
        <button style={styles.menuBtn} onClick={() => setOpen(true)}>
          ☰
        </button>
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

        {page === "assign" && <AssignPerson />}
      </main>

      {/* OVERLAY */}
      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)} />
      )}

      {/* RIGHT MENU */}
      <aside
        style={{
          ...styles.menu,
          transform: open ? "translateX(0)" : "translateX(100%)"
        }}
      >
        <button style={styles.closeBtn} onClick={() => setOpen(false)}>
          ✕
        </button>

        <h3>Menu</h3>

        <div
          style={styles.menuItem}
          onClick={() => {
            setPage("home");
            setOpen(false);
          }}
        >
          Home
        </div>

        <div
          style={styles.menuItem}
          onClick={() => {
            setPage("assign");
            setOpen(false);
          }}
        >
          Assign Person to Location
        </div>

        <div style={styles.menuItem}>Profile</div>
        <div style={styles.menuItem}>Settings</div>

        <div
          style={{ ...styles.menuItem, color: "red" }}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          Logout
        </div>
      </aside>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "#1e1e1e",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },

  header: {
    height: "60px",
    padding: "0 24px",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    borderBottom: "1px solid #333"
  },

  brand: {
    fontWeight: "600",
    fontSize: "18px"
  },

  title: {
    margin: 0,
    fontSize: "20px",
    justifySelf: "center"
  },

  menuBtn: {
    fontSize: "22px",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    justifySelf: "end"
  },

  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    overflow: "auto"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#262626",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  },

  logoutBtn: {
    width: "100%",
    marginTop: "25px",
    padding: "12px",
    background: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 999
  },

  menu: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "260px",
    height: "100%",
    background: "#fff",
    color: "#000",
    padding: "20px",
    transition: "0.3s ease",
    zIndex: 1000,
    boxShadow: "-5px 0 20px rgba(0,0,0,0.4)",
    overflowY: "auto"
  },

  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    marginBottom: "20px"
  },

  menuItem: {
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    cursor: "pointer"
  }
};
