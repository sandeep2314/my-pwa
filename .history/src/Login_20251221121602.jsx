import { useState } from "react";

// Use relative URL for Vite proxy
const LOGIN_URL = "/loginmahi";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Paste the corrected handleLogin function HERE
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("rMobileNo", mobile);
    formData.append("rPassword", password);
    formData.append("pAppName", "RealSchool");
    formData.append("pAppType", "R");

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        alert("Invalid server response ❌");
        return;
      }

      // ✅ Check if 'a' array exists and has at least one item
     if (data.a && data.a.length > 0) {
  localStorage.setItem("user", JSON.stringify(data.a[0]));
  alert("Login successful ✅");
  window.location.reload(); // ← triggers App.jsx to show Dashboard
}


    } catch (err) {
      console.error(err);
      alert("Network error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        placeholder="Mobile No"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
