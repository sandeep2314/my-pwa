import React, { useEffect, useState } from "react";
import Select from "react-select";

// Remove trailing slash automatically
const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");

export default function AssignPerson() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [locations, setLocations] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    try {
      const resLocations = await fetch(`${BASE_URL}/getlocation`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ pCompanyId: user.CompanyId || "1" }),
      });
      const dataLocations = await resLocations.json();
      setLocations(dataLocations.a || []);

      const resStaff = await fetch(`${BASE_URL}/getstaff`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ pStaffId: "", pCompanyId: user.CompanyId || "1" }),
      });
      const dataStaff = await resStaff.json();
      setStaff(dataStaff.a || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    } finally { setLoading(false); }
  }

  async function submitAssign() {
    if (!selectedLocation || !selectedManager || !selectedWorker) { alert("Please select all fields"); return; }

    const body = new URLSearchParams({
      pLocationId: selectedLocation.value,
      pManagerId: selectedManager.value,
      pWorkerId: selectedWorker.value,
      pCompanyId: user.CompanyId,
    });

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/getStaffLocation`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      const data = await res.json();
      if (data.a && data.a.length > 0) alert("Staff Location added successfully ✅");
      else alert("Invalid details ❌");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally { setLoading(false); }
  }

  const locationOptions = locations.map((loc) => ({ value: loc.LocationID, label: loc.LocationName }));
  const staffOptions = staff.map((s) => ({ value: s.staffID, label: `${s.StaffName} (${s.DName || ""}-${s.HNo || ""})` }));

  return (
    <div style={containerStyle}>
      <h3>Assign Staff to Location</h3>
      {loading && <p>Loading...</p>}
      <Select options={locationOptions} value={selectedLocation} onChange={setSelectedLocation} placeholder="Select Location" isSearchable styles={customStyles} />
      <Select options={staffOptions} value={selectedWorker} onChange={setSelectedWorker} placeholder="Select Worker" isSearchable styles={customStyles} />
      <Select options={staffOptions} value={selectedManager} onChange={setSelectedManager} placeholder="Select Manager" isSearchable styles={customStyles} />
      <button onClick={submitAssign} style={btnStyle}>Assign</button>
    </div>
  );
}

const containerStyle = { maxWidth: 420, width: "100%", margin: "0 auto", padding: "20px", background: "#262626", color: "#fff", borderRadius: "12px" };
const btnStyle = { width: "100%", padding: "12px", background: "#0d6efd", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "10px" };
const customStyles = { control: (p) => ({ ...p, backgroundColor: "#262626", color: "#fff", borderRadius: "6px", borderColor: "#555" }), menu: (p) => ({ ...p, backgroundColor: "#262626", color: "#fff" }), option: (p, s) => ({ ...p, backgroundColor: s.isSelected ? "#0d6efd" : s.isFocused ? "#333" : "#262626", color: "#fff", cursor: "pointer" }), singleValue: (p) => ({ ...p, color: "#fff" }), placeholder: (p) => ({ ...p, color: "#aaa" }), input: (p) => ({ ...p, color: "#fff" }) };
