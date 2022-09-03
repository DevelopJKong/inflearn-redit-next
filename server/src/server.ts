import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.get("/", (_, res) => res.send("running"));

let port = 5050;

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  AppDataSource.initialize()
    .then(async () => {

      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
