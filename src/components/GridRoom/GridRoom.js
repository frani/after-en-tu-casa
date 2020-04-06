import React, { useMemo } from 'react';
import styled from 'styled-components';

import Chat from '../Chat/Chat';
import Hidden from '@material-ui/core/Hidden';
import ToggleFullScreenButton from '../ToggleFullScreenButton/ToggleFullScreenButton';
import EmptyRoomInfo from '../EmptyRoomInfo';
import GridParticipant from './GridParticipant/GridParticipant';
import useParticipants from '../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${props => (props.gridSize > 2 ? 'row' : 'column')};
  flex-wrap: ${props => (props.gridSize > 2 ? 'wrap' : 'nowrap')};
  padding: 0;
  margin: 0;
  height: calc(var(--vh) * 100);
`;

export default function GridRoom() {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();

  const gridSize = useMemo(() => {
    return participants.length + 1;
  }, [participants]);

  return (
    <Container gridSize={gridSize}>
      <Hidden smDown>
        <ToggleFullScreenButton gridSize={gridSize} />
      </Hidden>
      {[localParticipant, ...participants].map((participant, index) => (
        <GridParticipant
          key={participant.sid}
          participant={participant}
          gridPosition={index}
          gridSize={gridSize}
        />
      ))}
      <EmptyRoomInfo show={gridSize === 1} />
      <Chat />
    </Container>
  );
}
