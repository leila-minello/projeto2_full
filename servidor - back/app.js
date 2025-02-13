const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const winston = require("winston");
const authRoutes = require("./routes/AuthRoutes");
const artistRoutes = require("./routes/ArtistRoutes");
const seedUsers = require("./config/seedUsers");

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
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    maxPoolSize: 10,
  })
  .then(() => {
    logger.info("Conectado ao MongoDB");

    seedUsers()
      .then(() => logger.info("✅ Usuários predefinidos criados com sucesso"))
      .catch((err) => logger.error("❌ Erro ao criar usuários:", err));
  })
  .catch((err) => logger.error("Erro ao conectar ao MongoDB:", err));

app.use(
  cors({
    origin: "http://192.168.1.2:5000", // Ou "*", mas isso pode ser menos seguro
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);

console.log("MongoDB URI:", process.env.MONGO_URI);

app.use(cookieParser());

app.use(express.json());
app.use(compression());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://192.168.1.2:5000"); // Ou "*"
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/artists", artistRoutes);

app.get("/", (req, res) => {
  res.send("Backend está funcionando!");
});

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
