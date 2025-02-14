const Artist = require('../models/Artist');
exports.getArtistByName = async (req, res) => {
  const { name } = req.query;

  try {
    const artist = await Artist.findOne({ name });

    if (!artist) {
      return res.status(404).json({ message: 'Artista não encontrado.' });
    }

    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar artista.' });
  }
};

exports.createArtist = async (req, res) => {
  const { name, genre, popularity } = req.body;

  try {
    const newArtist = new Artist({
      name,
      genre,
      popularity,
    });
    await newArtist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao inserir artista.' });
  }
};
