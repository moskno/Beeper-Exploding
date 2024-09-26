import express, { Application } from "express";
import dotenv from "dotenv";
import beeperRouter from "./routes/beeperRouter.js";

dotenv.config();
const PORT: number | string = process.env.PORT || 3500;
const app: Application = express();

app.use(express.json());

app.use("/", beeperRouter);

app.listen(PORT, () => {
    console.log("server is on");
  });