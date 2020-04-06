import React from 'react';
import { LocalVideoTrack } from 'twilio-video';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

import { Container, Title, Subtitle, StyledVideoTrack, Description, NoVideo } from './styles';

export default function LocalVideoPreview() {
  const { localTracks } = useVideoContext();

  const videoTrack = localTracks.find(track => track.name === 'camera') as LocalVideoTrack;

  return (
    <Container>
      <Title>Video Preview</Title>
      <Subtitle>Only you can see this video</Subtitle>
      {videoTrack ? <StyledVideoTrack track={videoTrack} isLocal /> : <NoVideo />}
      <Description>
        Make sure everything is working and when you're ready join any of the rooms in the sidebar,
        or feel free to create your own.
      </Description>
    </Container>
  );
}
