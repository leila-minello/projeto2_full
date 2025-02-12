const express = require('express');
const artistController = require('../controllers/artistController');
const authMiddleware = require('../middleware/AuthMiddleware'); 

const router = express.Router();

router.get('/', authMiddleware, artistController.getArtists);
router.post('/', authMiddleware, artistController.createArtist);
router.get('/:artistId/tracks', authMiddleware, artistController.getTracksByArtist);
router.post('/:artistId/tracks', authMiddleware, artistController.createTrack);

module.exports = router;
