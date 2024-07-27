import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// load environment variables from .env file
dotenv.config();

// create express app
const app: Express = express();
// create entry port
const PORT = process.env.PORT || 3000;


// use express.json() to parse the request body
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  // if there is an error, log it and exit the process
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});