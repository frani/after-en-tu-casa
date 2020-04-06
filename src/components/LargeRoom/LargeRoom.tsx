import React from 'react';
import styled from 'styled-components';

import LRParticipantStrip from './LRParticipantStrip/LRParticipantStrip';
import LRMainParticipant from './LRMainParticipant/LRMainParticipant';
import Hidden from '@material-ui/core/Hidden';
import ToggleFullScreenButton from '../ToggleFullScreenButton/ToggleFullScreenButton';
import Chat from '../Chat/Chat';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 960px) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`;

export default function Room() {
  return (
    <Container>
      <Hidden smDown>
        <ToggleFullScreenButton gridSize={0} />
      </Hidden>
      <LRParticipantStrip />
      <LRMainParticipant />
      <Chat />
    </Container>
  );
}
