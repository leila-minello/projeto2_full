const express = require('express');
const artistController = require('../controllers/ArtistController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, artistController.getArtists);
router.post('/', authMiddleware, artistController.createArtist);
router.get('/:artistId/tracks', authMiddleware, artistController.getTracksByArtist);
router.post('/:artistId/tracks', authMiddleware, artistController.createTrack);

module.exports = router;
