// routes/gameRoutes.js
const express = require('express');
const gameController = require('../controllers/gamesControllers'); // Adjust the path based on your project structure
const router = express.Router();

// Create a new game
router.post('/create', gameController.createGame);

// Make a move in the game
router.post('/make-move', gameController.makeMove);

// Get game information by ID
router.get('/:gameId', gameController.getGameById);

// Additional routes, if needed

module.exports = router;
