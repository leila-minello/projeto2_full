const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Artist = require("../models/Artist");
const connectDB = require("./db");

const artists = [
  {
    name: "NewJeans",
    favSong: "Hurt",
    genre: "K-pop",
    popularity: 9,
  },
  {
    name: "Blackpink",
    favSong: "Lovesick Girls",
    genre: "K-Pop",
    popularity: 7,
  },
  {
    name: "Beatles",
    favSong: "Hey Jude",
    genre: "Rock",
    popularity: 7,
  },
];

const seedArtists = async () => {
  try {
    await connectDB();
    console.log("🔹 Conectado ao MongoDB");

    await Artist.deleteMany();
    console.log("🔄 Artistas antigos removidos");

    await Artist.insertMany(artists);
    console.log("✅ Artistas predefinidos criados com sucesso");
  } catch (error) {
    console.error("❌ Erro ao criar artistas:", error);
    mongoose.connection.close();
  }
};

module.exports = seedArtists;
