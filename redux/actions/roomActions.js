import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
} from '../constants/roomConstants';

// GET ALL ROOMS
export const getRooms =
  (req, currentPage = 1, location = '') =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req);

      const { data } = await axios.get(
        `${origin}/api/rooms/?page=${currentPage}&location=${location}`
      );

      dispatch({ type: ALL_ROOMS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_ROOMS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// GET  ROOM DETAILS
export const getRoomDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/rooms/${id}`);

    dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data.room });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
