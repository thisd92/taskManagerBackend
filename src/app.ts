import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app: Application = express();
const port: number = 8090;

import routes from "./routes/routes";

async function main(): Promise<void> {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userdb");

    console.log("Conexão com MongoDB realizada com sucesso!");
  } catch (error) {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
  }
}

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Listening app on port ${port}`);
});

main().catch((err) => {
  console.log(err);
});
