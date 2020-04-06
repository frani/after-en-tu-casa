import React, { createContext, useReducer, useEffect } from 'react';

import roomsReducer, {
  roomsInitialState,
  SET_ROOMS_BEGIN,
  SET_ROOMS_SUCCESS,
  SET_ROOMS_ERROR,
  ADD_ROOM,
  REMOVE_ROOM,
  ADD_ROOM_PARTICIPANT,
  REMOVE_ROOM_PARTICIPANT,
} from './roomsReducer';

export const RoomsContext = createContext(null);

const RoomsProvider = ({ children }) => {
  const [roomsState, roomsDispatch] = useReducer(roomsReducer, roomsInitialState);

  useEffect(() => {
    const fetchRooms = async () => {
      roomsDispatch({ type: SET_ROOMS_BEGIN });

      try {
        const rooms = await fetch('/api/rooms').then(res => res.json());

        roomsDispatch({ type: SET_ROOMS_SUCCESS, payload: { rooms: rooms } });
      } catch (error) {
        roomsDispatch({ type: SET_ROOMS_ERROR });
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    let url = 'ws://localhost:8081';
    if (process.env.NODE_ENV === 'production') {
      url = `wss://${window.location.host}`;
    }

    const ws = new WebSocket(url);

    ws.onmessage = event => {
      const data = JSON.parse(event.data);

      switch (data.event) {
        case 'room-created':
          roomsDispatch({
            type: ADD_ROOM,
            payload: { room: data },
          });
          break;
        case 'room-ended':
          roomsDispatch({ type: REMOVE_ROOM, payload: { sid: data.sid } });
          break;
        case 'participant-connected':
          roomsDispatch({
            type: ADD_ROOM_PARTICIPANT,
            payload: {
              roomName: data.roomName,
              participant: data,
            },
          });
          break;
        case 'participant-disconnected':
          roomsDispatch({
            type: REMOVE_ROOM_PARTICIPANT,
            payload: {
              roomName: data.roomName,
              participant: data,
            },
          });
          break;
        default:
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <RoomsContext.Provider value={{ roomsState, roomsDispatch }}>{children}</RoomsContext.Provider>
  );
};

export default RoomsProvider;
