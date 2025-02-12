const express = require('express');
const artistController = require('../controllers/artistController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', artistController.getArtists);
router.post('/', artistController.createArtist);
router.get('/:artistId/tracks', artistController.getTracksByArtist);
router.post('/:artistId/tracks', artistController.createTrack);

module.exports = router;
