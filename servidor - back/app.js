const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const winston = require("winston");
const authRoutes = require("./routes/AuthRoutes");
const artistRoutes = require("./routes/ArtistRoutes");

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const app = express();
const PORT = process.env.PORT || 5000;

console.log("MongoDB URI:", process.env.MONGO_URI);

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(compression());

mongoose
  .connect(process.env.MONGO_URI, {
    maxPoolSize: 10,
  })
  .then(() => logger.info("Conectado ao MongoDB"))
  .catch((err) => logger.error("Erro ao conectar ao MongoDB:", err));

app.use("/api/auth", authRoutes);
app.use("/api/artists", artistRoutes);

app.get("/", (req, res) => {
  res.send("Backend está funcionando!");
});

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
