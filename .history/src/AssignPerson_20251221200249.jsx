import React, { useEffect, useState } from "react";

export default function AssignPerson() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [locations, setLocations] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedManager, setSelectedManager] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      // Load locations (form-encoded)
      const resLocations = await fetch("/getlocation", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ pCompanyId: "1" })
      });

      if (!resLocations.ok) {
        console.error("Server error:", resLocations.status);
        alert("Failed to load locations. Server error.");
        setLoading(false);
        return;
      }

      const dataLocations = await resLocations.json();
      setLocations(dataLocations.a || []);

      // Load staff (form-encoded)
      const resStaff = await fetch("/getstaff", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ pCompanyId: "1" })
      });

      if (!resStaff.ok) {
        console.error("Server error:", resStaff.status);
        alert("Failed to load staff. Server error.");
        setLoading(false);
        return;
      }

      const dataStaff = await resStaff.json();
      setStaff(dataStaff.a || []);
      
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function submitAssign() {
    if (!selectedLocation || !selectedManager || !selectedWorker) {
      alert("Please select all fields");
      return;
    }

    const manager = staff.find(s => s.StaffId === selectedManager);
    const worker = staff.find(s => s.StaffId === selectedWorker);

    if (!manager || !worker) {
      alert("Invalid selection");
      return;
    }

    if (parseInt(manager.HNo) < parseInt(worker.HNo)) {
      alert("Invalid designation hierarchy");
      return;
    }

    setLoading(true);
    try {
      const body = new URLSearchParams({
        pLocationId: selectedLocation,
        pManagerId: selectedManager,
        pWorkerId: selectedWorker,
        pCompanyId: user.CompanyId
      });

      const res = await fetch("/addStaffLocation", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });

      const data = await res.json();

      if (data.a && data.a.length > 0) {
        alert("Staff Location added successfully ✅");
      } else {
        alert("Invalid details ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={containerStyle}>
      <h3>Assign Staff to Location</h3>
      {loading && <p>Loading...</p>}

      {/* LOCATION */}
      <select
        value={selectedLocation}
        onChange={e => setSelectedLocation(e.target.value)}
        style={selectStyle}
      >
        <option value="">Select Location</option>
        {locations.map(loc => (
          <option key={loc.StaffId} value={loc.StaffId}>
            {loc.StaffName}
          </option>
        ))}
      </select>

      {/* WORKER */}
      <select
        value={selectedWorker}
        onChange={e => setSelectedWorker(e.target.value)}
        style={selectStyle}
      >
        <option value="">Select Worker</option>
        {staff.map(s => (
          <option key={s.StaffId} value={s.StaffId}>
            {s.StaffName} ({s.DName}-{s.HNo})
          </option>
        ))}
      </select>

      {/* MANAGER */}
      <select
        value={selectedManager}
        onChange={e => setSelectedManager(e.target.value)}
        style={selectStyle}
      >
        <option value="">Select Manager</option>
        {staff.map(s => (
          <option key={s.StaffId} value={s.StaffId}>
            {s.StaffName} ({s.DName}-{s.HNo})
          </option>
        ))}
      </select>

      <button onClick={submitAssign} style={btnStyle}>
        Assign
      </button>
    </div>
  );
}

const containerStyle = {
  maxWidth: 420,
  width: "100%",
  margin: "0 auto",
  padding: "20px",
  background: "#262626",
  color: "#fff",
  borderRadius: "12px"
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px"
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#0d6efd",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px"
};
