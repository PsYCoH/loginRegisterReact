const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connestDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connestDB();

const app = express();

app.use(express.json());
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` .yellow.bold));