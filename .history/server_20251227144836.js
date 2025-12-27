import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 8082; // your backend port

// Allow Vercel frontend to fetch
const allowedOrigins = [
  "http://localhost:5173",               // dev
  "https://my-pwa-mu.vercel.app"        // production
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ["GET","POST"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login route
app.post('/loginmahi', (req, res) => {
  const { rMobileNo, rPassword } = req.body;
  if (rMobileNo === "9999999999" && rPassword === "1234") {
    res.json({ a:[{ id:1, name:"Test User", mobile:rMobileNo }]});
  } else {
    res.status(401).json({ message:"Invalid credentials" });
  }
});

// Location route
app.get('/getlocation', (req, res) => {
  res.json({ a:[{ LocationID:32, LocationName:"Surabhi Hospital", latitude:"1", longitude:"1" }] });
});

// Staff route
app.get('/getstaff', (req, res) => {
  res.json({ a:[
    { staffID:13406, StaffName:"Geetanjali-17750", MobileNo:"2000013368", StaffPassword:"133", createdAT:"26-09-2025", imageURL:null },
    { staffID:13407, StaffName:"Champa", MobileNo:"2000013369", StaffPassword:"123", createdAT:"26-09-2025", imageURL:null },
    // … add all staff entries
  ]});
});

app.listen(PORT, () => console.log(`Backend running at http://103.165.119.119:${PORT}`));
