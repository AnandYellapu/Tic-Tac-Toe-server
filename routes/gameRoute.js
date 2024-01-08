// // routes/gameRoutes.js
// const express = require('express');
// const router = express.Router();
// const gameController = require('../controllers/gameController');

// // Create a new game
// router.post('/new-game', gameController.createGame);

// // Get game by ID
// router.get('/:id', gameController.getGameById);

// // Make a move in the game
// router.post('/:id/move', gameController.makeMove);

// module.exports = router;






// gameRoutes.js
const express = require('express');
const router = express.Router();
const gameControllers = require('../controllers/gameControllers');

// Create a new game
router.post('/new-game', gameControllers.createGame);  // <-- Ensure createGame is properly imported

// Get game by ID
router.get('/:id', gameControllers.getGameById);

// Make a move in the game
router.post('/:id/move', gameControllers.makeMove);

module.exports = router;

