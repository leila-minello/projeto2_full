const express = require('express');
const artistController = require('../controllers/artistController');
const authMiddleware = require('../middleware/AuthMiddleware'); 

const router = express.Router();

router.get('/', authMiddleware, artistController.getArtists);
router.post('/', authMiddleware, artistController.createArtist);

module.exports = router;
