import Room from '../models/room';

const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, rooms });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// CREATE NEW ROOM => /api/rooms
const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export { allRooms, newRoom };
