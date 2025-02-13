const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  favSong: { type: String, required: true},
  genre: { type: String, required: true },
  popularity: { type: Number, default: 0 },
});

module.exports = mongoose.model('Artist', artistSchema);