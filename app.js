import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cron from 'node-cron';

import connectDB from "./config/db.js"; 

import userRoutes from "./routes/userRoutes.js";
import houseRoutes from "./routes/houseRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import errorHandler from "./utils/errorHandler.js";
import { generateMonthlyBills } from './controllers/billController.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/bills', billRoutes);

app.use(errorHandler);

// Schedule monthly bill generation (runs on the 1st day of every month at midnight)
cron.schedule('0 0 1 * *', () => {
  console.log('Generating monthly bills...');
  generateMonthlyBills();
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
