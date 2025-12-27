import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Remove trailing slash from API URL
const BASE_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
const LOGIN_URL = `${BASE_URL}/loginmahi`;

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = new URLSearchParams({
      rMobileNo: mobile,
      rPassword: password,
      pAppName: "RealSchool",
      pAppType: "R",
    });

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      if (data?.a?.length > 0) {
        localStorage.setItem("user", JSON.stringify(data.a[0]));
        alert("Login successful ✅");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials ❌");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server / Network error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2 style={styles.title}>Login to RealSchool</h2>

        <input
          placeholder="Mobile No"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #1e1e1e 0%, #3a3a3a 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#262626",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "600",
  },
  input: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "#1e1e1e",
    color: "#fff",
  },
  button: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    background: "#0d6efd",
    color: "#fff",
    cursor: "pointer",
  },
};
