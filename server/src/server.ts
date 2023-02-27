import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRouter from "./routes/authRouter";
import { AppDataSource } from "./data-source";
import subsRouter from "./routes/subsRouter";
import cookieParser from "cookie-parser";

const app = express();
const origin = "http://localhost:3000";

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin, credentials: true }));
app.use(cookieParser());
app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRouter);
app.use("/api/subs", subsRouter);
app.use((req, res, next) => {
  console.log("hello");
  next();
});

app.listen(process.env.PORT, async () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
  AppDataSource.initialize()
    .then(async () => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
