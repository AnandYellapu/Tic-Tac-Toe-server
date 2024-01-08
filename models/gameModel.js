// models/gameModel.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  board: {
    type: [[String]],
    default: [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ],
  },
  currentPlayer: {
    type: String,
    default: 'X',
  },
  winner: {
    type: String,
    default: '',
  },
  isDraw: {
    type: Boolean,
    default: false,
  },
  madeBy: {
    type: String,
    default: 'human', // 'human' or 'AI'
  },
});

module.exports = mongoose.model('gameModel', gameSchema);
