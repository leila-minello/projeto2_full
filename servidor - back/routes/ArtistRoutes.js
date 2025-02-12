const express = require('express');
const Artist = require('../models/Artist');
const Track = require('../models/Track');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/artists', authMiddleware, async (req, res) => {
  try {
    const artists = await Artist.find({ createdBy: req.userId });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar artistas.' });
  }
});

router.post('/artists', authMiddleware, async (req, res) => {
  const { name, genre, popularity } = req.body;

  try {
    const newArtist = new Artist({
      name,
      genre,
      popularity,
      createdBy: req.userId,
    });
    await newArtist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao inserir artista.' });
  }
});

router.get('/artists/:artistId/tracks', authMiddleware, async (req, res) => {
  try {
    const tracks = await Track.find({ artist: req.params.artistId, createdBy: req.userId });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar músicas.' });
  }
});

router.post('/artists/:artistId/tracks', authMiddleware, async (req, res) => {
  const { title, album } = req.body;

  try {
    const newTrack = new Track({
      title,
      artist: req.params.artistId,
      album,
      createdBy: req.userId,
    });
    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao inserir música.' });
  }
});

module.exports = router;