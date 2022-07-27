import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

import authRoute from "./routes/auth/auth.js";

import profileRoute from "./routes/profile/profile.js";
// router system here

app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);

dotenv.config();
// mongodb connect
// when you changed the database, you need to restart the server
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connect to Mangodb Successfully");
  }
);

app.listen(8800, () => {
  console.log("Back end server 8800 is running!");
});
