import React from 'react';
import styled from 'styled-components';

import LRParticipant from '../LRParticipant/LRParticipant';
import useParticipants from '../../../hooks/useParticipants/useParticipants';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useSelectedParticipant from '../../VideoProvider/useSelectedParticipant/useSelectedParticipant';

const Container = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: calc(var(--vh) * 67);
`;

const FlexHack = styled.div`
  display: flex;
  min-height: min-content;
`;

export default function ParticipantStrip() {
  const {
    room: { localParticipant },
  } = useVideoContext();
  const participants = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();

  return (
    <Container>
      <FlexHack>
        <LRParticipant
          participant={localParticipant}
          isSelected={selectedParticipant === localParticipant}
          onClick={() => setSelectedParticipant(localParticipant)}
        />
        {participants.map(participant => (
          <LRParticipant
            key={participant.sid}
            participant={participant}
            isSelected={selectedParticipant === participant}
            onClick={() => setSelectedParticipant(participant)}
          />
        ))}
      </FlexHack>
    </Container>
  );
}
