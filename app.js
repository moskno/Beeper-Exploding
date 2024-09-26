import express from "express";
import dotenv from "dotenv";
import beeperRouter from "./routes/beeperRouter.js";
dotenv.config();
const PORT = process.env.PORT || 3500;
const app = express();
app.use(express.json());
app.use("/", beeperRouter);
app.listen(PORT, () => {
    console.log("server is on");
});
