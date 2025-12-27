import express from 'express';
import cors from 'cors';       // ✅ import cors
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 16511;

// ✅ CORS middleware — put this BEFORE any routes
app.use(cors({
  origin: [
    "http://localhost:5173",           // for local dev
    "https://my-pwa-mu.vercel.app"    // for Vercel production
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.post('/loginmahi', (req, res) => {
  // your login logic
});

app.get('/getlocation', (req, res) => {
  // your location logic
});

app.get('/getstaff', (req, res) => {
  // your staff logic
});

// Catch-all route for SPA
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`PWA running at http://103.165.119.119:${port}`);
});
