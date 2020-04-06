import React from 'react';

import ParticipantList from '../ParticipantList/ParticipantList';
import RoomTitle from './RoomTitle/RoomTitle';

import ListItem from '@material-ui/core/ListItem';

const RoomListItem = ({ room, onRoomClick, selected, disabled }) => {
  return (
    <>
      <RoomTitle
        roomName={room.uniqueName}
        onRoomClick={onRoomClick}
        disabled={disabled}
        selected={selected}
        maxParticipants={room.maxParticipants}
        currentParticipants={room.participants.length}
      />
      {room.participants.length !== 0 && (
        <ListItem>
          <ParticipantList participants={room.participants} />
        </ListItem>
      )}
    </>
  );
};

export default RoomListItem;
