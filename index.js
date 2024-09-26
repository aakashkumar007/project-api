const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js');
const jobRoutes = require("./routes/jobRoutes.js")
const resultRoutes = require("./routes/resultRoutes.js");
const admitCardRoutes = require("./routes/admitCardRoutes.js");
require("dotenv").config();

const cors = require('cors');
//want to check it the git commit

const frontendUrl=process.env.FRONTEND;

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: `${frontendUrl}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true,
  }));

app.options('*', cors()); // Handle preflight requests


app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/admit-card', admitCardRoutes);


const port = process.env.PORT || 13935;

app.get("/",(req,res)=>res.send("Welcome to job route"))

app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running`); 
});