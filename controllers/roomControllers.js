import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';

import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import APIFeatures from '../utils/apiFeatures';

/*--------------------------------------------------------------------------------------*/
// @desc    Get All Rooms
// @route   GET https://localhost:3000/api/rooms
// @access  Public
const allRooms = catchAsyncErrors(async (req, res) => {
  const resPerPage = 4;
  const roomsCount = await Room.countDocuments();

  const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

  let rooms = await apiFeatures.query;
  let filteredRoomsCount = rooms.length;

  apiFeatures.pagination(resPerPage);

  rooms = await apiFeatures.query.clone();

  res
    .status(200)
    .json({ success: true, roomsCount, resPerPage, filteredRoomsCount, rooms });
});

/*--------------------------------------------------------------------------------------*/
// @desc    Add New Room.
// @route   POST https://localhost:3000/api/rooms
// @access  Public
const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(200).json({ success: true, room });
});

/*--------------------------------------------------------------------------------------*/
// @desc    Get Single Room.
// @route   GET https://localhost:3000/api/rooms/:id
// @access  Public
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room does not exist!!', 404));
  }
  res.status(200).json({ success: true, room });
});

/*--------------------------------------------------------------------------------------*/
// @desc    Update Room.
// @route   PUT https://localhost:3000/api/rooms/:id
// @access  Public
const updateRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room does not exist!!', 404));
  }

  const updatedRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, room: updatedRoom });
});

/*--------------------------------------------------------------------------------------*/
// @desc    Delete Room.
// @route   DELETE https://localhost:3000/api/rooms/:id
// @access  Public
export const deleteRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler('Room does not exist!!', 404));
  }

  await room.remove();
  res.status(200).json({ success: true, message: 'Room deleted successfully' });
});

export { allRooms, newRoom, getSingleRoom, updateRoom };
