require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8090;

const mongoose = require("mongoose");

const routes = require("./routes/routes");
const authRoute = require("./routes/authRoute");
const companyRoute = require("./routes/companyRoute");
const profileRoute = require("./routes/profileRoute");
const projectRoute = require("./routes/projectRoute");
const squadRoute = require("./routes/squadRoute");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");

main().catch((err) => {
  console.log(err);
});

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

app.use("/api", routes);
app.use("/auth", authRoute);
app.use("/api", companyRoute);
app.use("/api", profileRoute);
app.use("/api", projectRoute);
app.use("/api", squadRoute);
app.use("/api", taskRoute);
app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`Listening app on port ${port}`);
});

async function main() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/userdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conexão com MongoDB realizada com sucesso!");
    })
    .catch(() => {
      console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
    });
}
