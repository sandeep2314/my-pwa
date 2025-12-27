import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use dynamic port for deployment
const PORT = process.env.PORT || 16511;

// --- Enable CORS for your Netlify frontend
app.use(cors({
  origin: "https://storied-licorice-461514.netlify.app", // replace with your actual Netlify URL
  methods: ["GET", "POST"],
  credentials: true
}));

// --- Parse JSON body (for POST requests)
app.use(express.json());

// --- Example backend route for login
app.post('/loginmahi', (req, res) => {
  const { username, password } = req.body;

  // Dummy logic for testing
  if(username === "test" && password === "1234"){
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// --- Serve frontend (Vite dist)
app.use(express.static(path.join(__dirname, 'dist')));

// --- Catch-all route for SPA
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
