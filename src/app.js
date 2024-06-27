import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { updateUserBalance } from "./controllers/balanceController.js";

const app = express();

app.use(express.json());

app.post("/update-balance", updateUserBalance);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
