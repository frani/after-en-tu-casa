import { useContext } from 'react';

import { RoomsContext } from '../RoomsProvider';

export default function useRooms() {
  const { roomsState, roomsDispatch } = useContext(RoomsContext);
  return { roomsState, roomsDispatch };
}
