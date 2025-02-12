const Artist = require('../models/Artist');

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
