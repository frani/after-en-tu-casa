import React from 'react';
import styled from 'styled-components';

import BandwidthWarning from '../../BandwidthWarning/BandwidthWarning';
import MicOff from '@material-ui/icons/MicOff';
import NetworkQualityLevel from '../../NewtorkQualityLevel/NetworkQualityLevel';
import ParticipantConnectionIndicator from './ParticipantConnectionIndicator/ParticipantConnectionIndicator';
import VideocamOff from '@material-ui/icons/VideocamOff';

import useParticipantNetworkQualityLevel from '../../../hooks/useParticipantNetworkQualityLevel/useParticipantNetworkQualityLevel';
import usePublications from '../../../hooks/usePublications/usePublications';
import useIsTrackSwitchedOff from '../../../hooks/useIsTrackSwitchedOff/useIsTrackSwitchedOff';
import usePublicationIsTrackEnabled from '../../../hooks/usePublicationIsTrackEnabled/usePublicationIsTrackEnabled';
import useTrack from '../../../hooks/useTrack/useTrack';

const Container = styled.div`
  position: relative;
  height: calc(var(--vh) * 50);
  background: ${props => (props.isVideoEnabled ? 'transparent' : 'black')};
  width: ${props => (props.fullWidth ? '100%' : '50%')};
  @media (min-width: 600px) {
    width: ${props => (props.fullWidth ? '425px' : '50%')};
  }
  @media (min-width: 1280px) {
    width: 425px;
  }
  & video {
    height: calc(var(--vh) * 50);
    width: 100%;
    object-fit: cover;
    filter: ${props =>
      props.isVideoSwitchedOff ? 'blur(4px) grayscale(1) brightness(0.5)' : 'none'};
  }
`;

const OtherInfo = styled.div`
  position: absolute;
  bottom: 0;
  right: 5px;
  color: white;
  z-index: 1;
`;

const NetworkInfo = styled.div`
  bottom: 0;
  left: 5px;
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: start;
`;

const DisplayName = styled.h2`
  margin: 0 15px 0 0;
  color: white;
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

export default function ParticipantInfo({ participant, children, gridPosition, fullWidth }) {
  const publications = usePublications(participant);

  const audioPublication = publications.find(p => p.kind === 'audio');
  const videoPublication = publications.find(p => p.trackName === 'camera');

  const networkQualityLevel = useParticipantNetworkQualityLevel(participant);
  const isAudioEnabled = usePublicationIsTrackEnabled(audioPublication);
  const isVideoEnabled = Boolean(videoPublication);

  const videoTrack = useTrack(videoPublication);
  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

  return (
    <Container
      gridPosition={gridPosition}
      fullWidth={fullWidth}
      isVideoSwitchedOff={isVideoSwitchedOff}
      isVideoEnabled={isVideoEnabled}
    >
      <div>
        <NetworkInfo>
          <DisplayName>
            <ParticipantConnectionIndicator participant={participant} />
            {participant.identity}
          </DisplayName>
          <NetworkQualityLevel qualityLevel={networkQualityLevel} />
        </NetworkInfo>
        <OtherInfo>
          {!isAudioEnabled && <StyledMicOff data-cy-audio-mute-icon fontSize="large" />}
          {!isVideoEnabled && <StyledVideocamOff fontSize="large" />}
        </OtherInfo>
      </div>
      {isVideoSwitchedOff && <BandwidthWarning />}
      {children}
    </Container>
  );
}
