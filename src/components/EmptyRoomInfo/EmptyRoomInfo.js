import React from 'react';

import { Container, Title, Subtitle, Description } from './styles';

const EmptyRoomInfo = ({ show }) => (
  <>
    {show && (
      <Container>
        <Title>Seems to be empty...</Title>
        <Subtitle>Wait for a bit for someone to join</Subtitle>
        <Description>Or look for a different room.</Description>
      </Container>
    )}
  </>
);

export default EmptyRoomInfo;
