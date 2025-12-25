import React, { useEffect, useState } from "react";
import Select from "react-select"; // ✅ import react-select

export default function AssignPerson() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [locations, setLocations] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  // ✅ Load locations and staff
  async function loadData() {
    setLoading(true);
    try {
      // Fetch locations
      const resLocations = await fetch("/getlocation", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ pCompanyId: user.CompanyId || "1" }),
      });

      const textLocations = await resLocations.text();
      console.log("Raw /getlocation response:", textLocations);

      if (!resLocations.ok) {
        alert(`Failed to load locations. Server error: ${resLocations.status}`);
        setLoading(false);
        return;
      }

      let dataLocations;
      try {
        dataLocations = JSON.parse(textLocations);
      } catch (err) {
        console.error("JSON parse error:", err, textLocations);
        alert("Failed to parse locations response");
        setLoading(false);
        return;
      }

      setLocations(dataLocations.a || []);

      // ✅ Fetch staff with pStaffId
      const formData = new URLSearchParams();
      formData.append("pStaffId", ""); // send empty if no staff selected
      formData.append("pCompanyId", user.CompanyId || "1");

      const resStaff = await fetch("/getstaff", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      const textStaff = await resStaff.text();
      console.log("Raw /getstaff response:", textStaff);

      let dataStaff;
      try {
        dataStaff = JSON.parse(textStaff);
      } catch (err) {
        console.error("JSON parse error:", err, textStaff);
        alert("Failed to parse staff response");
        setLoading(false);
        return;
      }

      setStaff(dataStaff.a || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Submit assignment
  async function submitAssign() {
    if (!selectedLocation || !selectedManager || !selectedWorker) {
      alert("Please select all fields");
      return;
    }

    const manager = staff.find((s) => s.StaffId === selectedManager.value);
    const worker = staff.find((s) => s.StaffId === selectedWorker.value);

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
        pLocationId: selectedLocation.value,
        pManagerId: selectedManager.value,
        pWorkerId: selectedWorker.value,
        pCompanyId: user.CompanyId,
      });

      const res = await fetch("/addStaffLocation", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
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

  // Convert for react-select
  const locationOptions = locations.map((loc) => ({
    value: loc.LocationID,
    label: loc.LocationName,
  }));

  const staffOptions = staff.map((s) => ({
  value: s.StaffId,
  label: `${s.StaffName} (${s.DName || ""}-${s.HNo || ""})`,
}));

  return (
    <div style={containerStyle}>
  <h3>Assign Staff to Location</h3>
  {loading && <p>Loading...</p>}

  {/* LOCATION */}
  <Select
    options={locationOptions}
    value={selectedLocation}
    onChange={setSelectedLocation}
    placeholder="Select Location"
    isSearchable
    styles={customStyles}  // ✅ fixed
  />

  {/* WORKER */}
  <Select
    options={staffOptions}
    value={selectedWorker}
    onChange={setSelectedWorker}
    placeholder="Select Worker"
    isSearchable
    styles={customStyles}  // ✅ fixed
  />

  {/* MANAGER */}
  <Select
    options={staffOptions}
    value={selectedManager}
    onChange={setSelectedManager}
    placeholder="Select Manager"
    isSearchable
    styles={customStyles}  // ✅ fixed
  />

  <button onClick={submitAssign} style={btnStyle}>
    Assign
  </button>
</div>
  )
  }

// Styles
const containerStyle = {
  maxWidth: 420,
  width: "100%",
  margin: "0 auto",
  padding: "20px",
  background: "#262626",
  color: "#fff",
  borderRadius: "12px",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#0d6efd",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px",
};

// Custom styles for react-select
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#262626",
    color: "#fff",
    borderRadius: "6px",
    borderColor: "#555",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#262626",
    color: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#0d6efd"
      : state.isFocused
      ? "#333"
      : "#262626",
    color: "#fff",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#aaa",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff", // ✅ this makes typed text visible
  }),
};
