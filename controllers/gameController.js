// controllers/gameController.js
const Game = require('../models/Game');

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
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
      return board[i][0];
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== '') {
      return board[0][j];
    }
  }

  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
    return board[0][0];
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
    return board[0][2];
  }

  // No winner
  return null;
};

// Function to check for a draw
const checkDraw = (board) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        // If any square is empty, the game is not a draw
        return false;
      }
    }
  }
  // All squares are filled, and no winner, so it's a draw
  return true;
};


module.exports ={
  createGame,
  getGameById,
  makeMove,
}




