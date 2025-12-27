import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 16511;

// ✅ Enable CORS for your Vercel frontend
app.use(cors({
  origin: "https://my-pwa-mu.vercel.app", // your frontend URL
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ Parse JSON and x-www-form-urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ LOGIN ROUTE — matches your Login.jsx frontend
app.post('/loginmahi', (req, res) => {
  const { rMobileNo, rPassword, pAppName, pAppType } = req.body;

  // Example test credentials
  if (rMobileNo === "9999999999" && rPassword === "1234") {
    // respond with object matching frontend expectation (data.a[0])
    res.json({ a: [{ id: 1, name: "Test User", mobile: rMobileNo }] });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ✅ Serve frontend SPA
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ✅ Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`PWA backend running at http://0.0.0.0:${PORT}`);
});
