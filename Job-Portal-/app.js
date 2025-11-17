const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));




app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/application',applicationRoutes);
app.get('/get',(req,res)=>{
    res.send('API is running....');
});

module.exports = app;
