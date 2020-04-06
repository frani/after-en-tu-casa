import React from 'react';

import RoomListItem from '../RoomListItem/RoomListItem';

import { List } from './styles';

const RoomList = ({ rooms, onRoomClick, activeRoom, canJoinRoom }) => (
  <List headerText="Open Rooms">
    {rooms &&
      rooms.map(room => (
        <RoomListItem
          key={room.sid}
          room={room}
          onRoomClick={onRoomClick}
          selected={activeRoom === room.uniqueName}
          disabled={!canJoinRoom}
        />
      ))}
  </List>
);

export default RoomList;
