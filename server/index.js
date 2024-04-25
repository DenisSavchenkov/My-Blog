import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoute.js';

const app = express();
dotenv.config();

// Constants
const URL = process.env.URL;
const PORT = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);

// Start server
const startServer = async () => {
  try {
    await mongoose.connect(URL);
    app.listen(PORT, () => console.log('Server started '));
  } catch (error) {
    console.log(error.message);
  }
};
startServer();
