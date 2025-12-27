import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 16511;

// Enable CORS for your Vercel frontend
app.use(cors({
  origin: "https://my-pwa-mu.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Example login route
app.post('/loginmahi', (req, res) => {
  const { username, password } = req.body;
  if(username === "test" && password === "1234"){
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Serve frontend SPA
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`PWA running at http://0.0.0.0:${PORT}`);
});
