import React from 'react';
import styled from 'styled-components';

import BandwidthWarning from '../../BandwidthWarning/BandwidthWarning';
import useIsTrackSwitchedOff from '../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import usePublications from '../../../hooks/usePublications/usePublications';
import useTrack from '../../../hooks/useTrack/useTrack';
import VideocamOff from '@material-ui/icons/VideocamOff';

const Container = styled.div`
  position: relative;
  height: calc(var(--vh) * 67);
  width: calc((var(--vh) * 67) * 1.78);
  max-width: 100%;
  background: ${props => (props.isVideoEnabled ? 'transparent' : 'black')};
  & video {
    object-fit: cover;
    height: 100%;
    width: 100%;
    filter: ${props =>
      props.isVideoSwitchedOff ? 'blur(4px) grayscale(1) brightness(0.5)' : 'none'};
  }
  @media (min-width: 960px) {
    & video {
      object-fit: contain;
    }
  }
`;

const MainInfo = styled.div`
  bottom: 0;
  left: auto;
  color: white;
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: start;
`;

const StyledVideocamOff = styled(VideocamOff)`
  background-color: ${props => props.theme.palette.error.light};
  padding: 3px;
  border-radius: 5px;
  margin-left: 5px;
`;

const DisplayName = styled.h3`
  margin: 0 15px 0 0;
  color: white;
`;

export default function MainParticipantInfo({ participant, children }) {
  const publications = usePublications(participant);
  const videoPublication = publications.find(p => p.trackName === 'camera');
  const screenSharePublication = publications.find(p => p.trackName === 'screen');
  const isVideoEnabled = Boolean(videoPublication);

  const videoTrack = useTrack(screenSharePublication || videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

  return (
    <Container isVideoEnabled={isVideoEnabled} isVideoSwitchedOff={isVideoSwitchedOff}>
      <MainInfo>
        <DisplayName>
          {participant.identity}
          {!isVideoEnabled && <StyledVideocamOff />}
        </DisplayName>
      </MainInfo>
      {isVideoSwitchedOff && <BandwidthWarning />}
      {children}
    </Container>
  );
}
