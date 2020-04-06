import React, { useMemo } from 'react';

import ParticipantNumber from '../../ParticipantNumber/ParticipantNumber';

import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { RoomTitleText } from './styles';

const RoomTitle = ({
  roomName,
  disabled,
  selected,
  onRoomClick,
  maxParticipants,
  currentParticipants,
}) => {
  const isJoinable = useMemo(() => !selected && currentParticipants < maxParticipants, [
    selected,
    currentParticipants,
    maxParticipants,
  ]);

  const roomType = useMemo(() => (maxParticipants > 4 ? 'collaboration' : 'grid'), [
    maxParticipants,
  ]);

  return (
    <ListItem
      button={isJoinable}
      onClick={() => isJoinable && onRoomClick(roomName, roomType)}
      disabled={disabled}
      selected={selected}
    >
      <RoomTitleText disableTypography>
        <Typography color="primary">{roomName}</Typography>
        <ParticipantNumber max={maxParticipants} current={currentParticipants} />
      </RoomTitleText>
    </ListItem>
  );
};

export default RoomTitle;
