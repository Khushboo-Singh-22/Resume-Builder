const express = require('express');
const cors = require('cors');
require('dotenv').config();
const aiRoutes = require('./aiRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ✅ FIX: Mount routes at /api prefix
app.use('/api', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ATS Backend Server running on 5001' });
});

app.listen(5001, () => console.log("✅ ATS Backend Server running on http://localhost:5001"));