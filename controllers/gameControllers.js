// controllers/gameController.js
const Game = require('../models/gameModel');

// Create a new game
const createGame = async (req, res) => {
  try {
    const newGame = new Game();
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get game by ID
const getGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Make a move in the game
const makeMove = async (req, res) => {
  try {
    const gameId = req.params.id;
    const { row, col, player } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if the move is valid
    if (
      game.board[row][col] === '' &&
      (player === 'X' || player === 'O') &&
      !game.winner &&
      !game.isDraw
    ) {
      // Update the board and check for a winner
      game.board[row][col] = player;
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
      game.winner = checkWinner(game.board);
      game.isDraw = checkDraw(game.board);

      await game.save();
      res.json(game);
    } else {
      res.status(400).json({ message: 'Invalid move' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to check for a winner
const checkWinner = (board) => {
  // Check rows and columns
  for (let i = 0; i < 4; i++) {
    if (
      (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][2] === board[i][3] && board[i][0] !== '') ||
      (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[2][i] === board[3][i] && board[0][i] !== '')
    ) {
      return board[i][0];
    }
  }

  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] === board[3][3] && board[0][0] !== '') {
    return board[0][0];
  }

  if (board[0][3] === board[1][2] && board[1][2] === board[2][1] && board[2][1] === board[3][0] && board[0][3] !== '') {
    return board[0][3];
  }

  // No winner
  return null;
};

// Function to check for a draw
const checkDraw = (board) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === '') {
        // If any square is empty, the game is not a draw
        return false;
      }
    }
  }
  // All squares are filled, and no winner, so it's a draw
  return true;
};

module.exports = {
  createGame,
  getGameById,
  makeMove,
};
