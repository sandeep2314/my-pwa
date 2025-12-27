import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80; // Use PORT from environment (Render/Vercel) or fallback to 80

// ✅ CORS middleware
app.use(cors({
  origin: [
    "http://localhost:5173",          // local dev
    "https://my-pwa-mu.vercel.app"   // frontend production
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ✅ API routes
app.post('/loginmahi', (req, res) => {
  // your login logic here
  // e.g., check req.body.rMobileNo and req.body.rPassword
});

app.post('/getlocation', (req, res) => {
  // your get location logic
});

app.post('/getstaff', (req, res) => {
  // your get staff logic
});

app.post('/getStaffLocation', (req, res) => {
  // your assign staff logic
});

// ✅ Catch-all route to serve index.html for SPA
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// ✅ Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
