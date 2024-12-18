import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/routes";

const app: Application = express();
const port: number = Number(process.env.PORT);
const db_url: string = String(process.env.DB_URL);
const cors_url: string = String(process.env.CORS_URL);

async function main(): Promise<void> {
  try {
    await mongoose.connect(db_url);

    console.log("Conexão com MongoDB realizada com sucesso!");
  } catch (error) {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
  }
}

app.use(express.json());

app.use(
  cors({
    origin: cors_url,
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
