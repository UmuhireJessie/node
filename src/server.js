import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/connection.js";
import router from "./routes/userroute.js";

dotenv.config();

const app = express();
connectDB;
app.use(cors());
app.use(express.json());

app.use("/api/v1", router)

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my API");
});

app.get("*", (req, res) => {
  res.status(404).send("Page is not found");
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
