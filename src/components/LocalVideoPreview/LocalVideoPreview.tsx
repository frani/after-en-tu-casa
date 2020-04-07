import React from 'react';
import { LocalVideoTrack } from 'twilio-video';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

import { Container, Title, Subtitle, StyledVideoTrack, Description, NoVideo } from './styles';

export default function LocalVideoPreview() {
  const { localTracks } = useVideoContext();

  const videoTrack = localTracks.find(track => track.name === 'camera') as LocalVideoTrack;

  return (
    <Container>
      <Title>Preview del Video</Title>
      <Subtitle>Solo vos podes ver esto</Subtitle>
      {videoTrack ? <StyledVideoTrack track={videoTrack} isLocal /> : <NoVideo />}
      <Description>
        Cuando todo este listo, entra en cualquiera de las charlas del costado. Sino podes crear una
        nueva con los botones arriba en el menu.
      </Description>
    </Container>
  );
}
