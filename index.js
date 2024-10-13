const express = require('express');
const mongoose = require('./db'); // Assuming you have `db.js` for Mongoose connection
const userRoutes = require('./routes/userRoutes.js');
const jobRoutes = require("./routes/jobRoutes.js");
const resultRoutes = require("./routes/resultRoutes.js");
const admitCardRoutes = require("./routes/admitCardRoutes.js");
require("dotenv").config();
const cors = require('cors');

const frontendUrl = process.env.FRONTEND;

const app = express();


app.use(cors({
    origin: `${frontendUrl}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.options('*', cors()); // Handle preflight requests
app.use(express.json());

// Route Handling
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/admit-card', admitCardRoutes);

// Welcome Route
app.get("/", (req, res) => res.send("Welcome to job route"));

// Server Port Configuration
const port = process.env.PORT || 13935;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running`);
});
