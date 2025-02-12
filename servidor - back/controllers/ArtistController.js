const Artist = require('../models/Artist');
const Track = require('../models/Track');

exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ createdBy: req.userId });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar artistas.' });
  }
};

exports.createArtist = async (req, res) => {
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
};

exports.getTracksByArtist = async (req, res) => {
  try {
    const tracks = await Track.find({ artist: req.params.artistId, createdBy: req.userId });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar músicas.' });
  }
};

exports.createTrack = async (req, res) => {
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
};
