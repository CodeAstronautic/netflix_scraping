require('dotenv').config();
const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri).then(() => console.log('Database connected')).catch((err) => console.log('Database connection error:', err));