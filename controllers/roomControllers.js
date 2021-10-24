import Room from '../models/room';

/*--------------------------------------------------------------------------------------*/
// @desc    Get All Rooms
// @route   GET https://localhost:3000/api/rooms
// @access  Public
const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.setHeader('Content-Security-Policy', "default-src 'self'");
    res.status(200).json({ success: true, rooms });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

/*--------------------------------------------------------------------------------------*/
// @desc    Add New Room.
// @route   POST https://localhost:3000/api/rooms
// @access  Public
const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

/*--------------------------------------------------------------------------------------*/
// @desc    Get Single Room.
// @route   GET https://localhost:3000/api/rooms/:id
// @access  Public
const getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, error: 'Room does not exist!!' });
    }
    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
    process.exit(1);
  }
};

/*--------------------------------------------------------------------------------------*/
// @desc    Update Room.
// @route   PUT https://localhost:3000/api/rooms/:id
// @access  Public
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, error: 'Room does not exist!!' });
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({ success: true, room: updatedRoom });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
    process.exit(1);
  }
};

export { allRooms, newRoom, getSingleRoom, updateRoom };
