const express = require('express');
const path = require('path');
const app = express();
const port = 16511; // your port

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Always return index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`PWA running at http://103.165.119.119:${port}`);
});
