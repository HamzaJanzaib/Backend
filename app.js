const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectDB = require('./DB/DB');
connectDB();
const userRoutes = require('./Routes/user.routes');
const riderRoutes = require('./Routes/Riders.Routes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/users', userRoutes);
app.use('/riders', riderRoutes);



module.exports = app;