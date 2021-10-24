// const colors = require('colors');
// const mongoose = require('mongoose');

// const Room = require('../models/room');
// const rooms = require('../data/rooms');

// mongoose.connect('mongodb://localhost:27017/bookit', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const seedRooms = async () => {
//   try {
//     await Room.deleteMany();
//     console.log('Rooms are deleted'.brightMagenta.bold.italic.underline);

//     await Room.insertMany(rooms);
//     console.log('All rooms are added'.brightMagenta.bold.italic.underline);

//     process.exit();
//   } catch (err) {
//     console.error(`Error: ${err.message}`.bgRed.white.bold.italic.underline);
//     process.exit();
//   }
// };

// seedRooms();
