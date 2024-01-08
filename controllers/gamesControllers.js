// controllers/gameController.js
const Game = require('../models/gamesModel');

// Create a new game
const createGame = async (req, res) => {
  try {
    const newGame = new Game({
      board: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      currentPlayer: 'X',
      winner: null,
      isDraw: false,
    });

    const savedGame = await newGame.save();
    res.json(savedGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const makeMove = async (req, res) => {
    try {
      const { gameId, row, col } = req.body;
  
      // Check if the gameId is provided
      if (!gameId) {
        console.error('Invalid request: gameId is missing');
        return res.status(400).json({ message: 'Invalid request: gameId is missing' });
      }
  
      const game = await Game.findById(gameId);
  
      // Check if the game is found
      if (!game) {
        console.error(`Game not found with gameId: ${gameId}`);
        return res.status(404).json({ message: 'Game not found' });
      }
  
      // Check if the move is valid
      if (game.board[row][col] === '' && !game.winner && !game.isDraw) {
        game.board[row][col] = game.currentPlayer;
  
        // Check for a winner or a draw
        const winner = checkWinner(game.board);
        if (winner) {
          game.winner = winner;
        } else if (isBoardFull(game.board)) {
          game.isDraw = true;
        }
  
        // Switch the current player
        game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
  
        const updatedGame = await game.save();
        res.json(updatedGame);
      } else {
        console.error('Invalid move:', game);
        res.status(400).json({ message: 'Invalid move' });
      }
    } catch (error) {
      console.error('Error making a move:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  // Get game information by ID
const getGameById = async (req, res) => {
    try {
      const { gameId } = req.params;
      const game = await Game.findById(gameId);
  
      if (!game) {
        res.status(404).json({ message: 'Game not found' });
      } else {
        res.json(game);
      }
    } catch (error) {
      console.error('Error getting game information:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Helper function to check for a winner
const checkWinner = (board) => {
    // Check rows
    for (let i = 0; i < 4; i++) {
      if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] === board[i][3]) {
        return board[i][0];
      }
    }
  
    // Check columns
    for (let i = 0; i < 4; i++) {
      if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] === board[3][i]) {
        return board[0][i];
      }
    }
  
    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === board[3][3]) {
      return board[0][0];
    }
  
    if (board[0][3] !== '' && board[0][3] === board[1][2] && board[0][3] === board[2][1] && board[0][3] === board[3][0]) {
      return board[0][3];
    }
  
    return null;
  };
  
  // Helper function to check if the board is full (draw)
  const isBoardFull = (board) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === '') {
          return false;
        }
      }
    }
    return true;
  };
  

module.exports ={
    createGame,
    makeMove,
    getGameById,
}