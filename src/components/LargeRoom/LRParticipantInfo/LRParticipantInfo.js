import React from 'react';
import styled from 'styled-components';

import BandwidthWarning from '../../BandwidthWarning/BandwidthWarning';
import MicOff from '@material-ui/icons/MicOff';
import ParticipantConnectionIndicator from './ParticipantConnectionIndicator/ParticipantConnectionIndicator';
import PinIcon from './PinIcon/PinIcon';
import ScreenShare from '@material-ui/icons/ScreenShare';
import VideocamOff from '@material-ui/icons/VideocamOff';

import usePublications from '../../../hooks/usePublications/usePublications';
import useIsTrackSwitchedOff from '../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import usePublicationIsTrackEnabled from '../../../hooks/usePublicationIsTrackEnabled/usePublicationIsTrackEnabled';
import useTrack from '../../../hooks/useTrack/useTrack';

const Container = styled.div`
  position: relative;
  height: calc(var(--vh) * 33);
  background: ${props => (props.isVideoEnabled ? 'transparent' : 'black')};
  width: 30vw;
  & video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: ${props =>
      props.isVideoSwitchedOff ? 'blur(4px) grayscale(1) brightness(0.5)' : 'none'};
  }
  @media (min-width: 600px) {
    width: 25vw;
  }
  @media (min-width: 1280px) {
    width: 20vw;
  }
`;

const MainInfo = styled.div`
  top: 0;
  left: 5px;
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: start;
`;

const DisplayName = styled.h4`
  margin: 0 15px 0 0;
  color: white;
`;

const MediaInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 5px;
  color: white;
  z-index: 1;
`;

const OtherInfo = styled.div`
  position: absolute;
  bottom: top;
  right: -8px;
  color: white;
  z-index: 1;
`;

const StyledMicOff = styled(MicOff)`
  background-color: ${props => props.theme.palette.error.light};
  padding: 3px;
  border-radius: 5px;
`;

const StyledVideocamOff = styled(VideocamOff)`
  background-color: ${props => props.theme.palette.error.light};
  padding: 3px;
  border-radius: 5px;
  margin-left: 5px;
`;

export default function ParticipantInfo({ participant, onClick, isSelected, children }) {
  const publications = usePublications(participant);

  const audioPublication = publications.find(p => p.kind === 'audio');
  const videoPublication = publications.find(p => p.trackName === 'camera');

  const isAudioEnabled = usePublicationIsTrackEnabled(audioPublication);
  const isVideoEnabled = Boolean(videoPublication);
  const isScreenShareEnabled = publications.find(p => p.trackName === 'screen');

  const videoTrack = useTrack(videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

  return (
    <Container
      onClick={onClick}
      isVideoEnabled={isVideoEnabled}
      isVideoSwitchedOff={isVideoSwitchedOff}
    >
      <div>
        <MainInfo>
          <DisplayName>
            <ParticipantConnectionIndicator participant={participant} />
            {participant.identity}
          </DisplayName>
        </MainInfo>
        <MediaInfo>
          {!isAudioEnabled && <StyledMicOff data-cy-audio-mute-icon />}
          {!isVideoEnabled && <StyledVideocamOff />}
          {isScreenShareEnabled && <ScreenShare />}
        </MediaInfo>
        <OtherInfo>{isSelected && <PinIcon />}</OtherInfo>
      </div>
      {isVideoSwitchedOff && <BandwidthWarning />}
      {children}
    </Container>
  );
}
