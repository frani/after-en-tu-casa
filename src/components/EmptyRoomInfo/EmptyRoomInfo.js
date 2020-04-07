import React from 'react';

import { Container, Title, Subtitle, Description } from './styles';

const EmptyRoomInfo = ({ show }) => (
  <>
    {show && (
      <Container>
        <Title>Parece estar vacio...</Title>
        <Subtitle>Esperate un toque que entre alguien</Subtitle>
        <Description>O busca una sala diferente.</Description>
      </Container>
    )}
  </>
);

export default EmptyRoomInfo;
