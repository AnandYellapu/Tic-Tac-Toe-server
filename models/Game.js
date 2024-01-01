// // // models/gameModel.js
// // const mongoose = require('mongoose');

// // const gameSchema = new mongoose.Schema({
// //   board: {
// //     type: [[String]],
// //     default: [['', '', ''], ['', '', ''], ['', '', '']]
// //   },
// //   currentPlayer: {
// //     type: String,
// //     default: 'X'
// //   },
// //   winner: {
// //     type: String,
// //     default: ''
// //   },
// //   isDraw: {
// //     type: Boolean,
// //     default: false
// //   }
// // });

// // module.exports = mongoose.model('Game', gameSchema);





// // models/gameModel.js
// const mongoose = require('mongoose');

// const gameSchema = new mongoose.Schema({
//   board: {
//     type: [[String]],
//     default: [['', '', ''], ['', '', ''], ['', '', '']],
//   },
//   currentPlayer: {
//     type: String,
//     default: 'X',
//   },
//   winner: {
//     type: String,
//     default: '',
//   },
//   isDraw: {
//     type: Boolean,
//     default: false,
//   },
//   playerNames: {
//     playerX: {
//       type: String,
//       default: '',
//     },
//     playerO: {
//       type: String,
//       default: 'AI', // Default AI opponent's name
//     },
//   },
//   difficulty: {
//     type: String,
//     default: 'medium', // Default difficulty level for the AI opponent
//     enum: ['easy', 'medium', 'hard'], // Possible difficulty levels
//   },
// });

// module.exports = mongoose.model('Game', gameSchema);





// models/gameModel.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  board: {
    type: [[String]],
    default: [['', '', ''], ['', '', ''], ['', '', '']],
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

module.exports = mongoose.model('Game', gameSchema);

