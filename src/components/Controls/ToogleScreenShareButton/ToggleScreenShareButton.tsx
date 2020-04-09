import React from 'react';
import styled from 'styled-components';

import MUIFab from '@material-ui/core/Fab';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';

import useScreenShareToggle from '../../../hooks/useScreenShareToggle/useScreenShareToggle';
import useScreenShareParticipant from '../../../hooks/useScreenShareParticipant/useScreenShareParticipant';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export const SCREEN_SHARE_TEXT = 'Compartir Pantalla';
export const STOP_SCREEN_SHARE_TEXT = 'No Compartir Pantalla';
export const SHARE_IN_PROGRESS_TEXT =
  'No se puede compartir pantalla cuando otro usuario ya lo hace.';
export const SHARE_NOT_SUPPORTED_TEXT = 'No se puede compartir pantalla en este browser.';

export const Fab = styled(MUIFab)`
  margin: ${props => props.theme.spacing(0.5)}px;
  &[disabled] {
    color: rgba(225, 225, 225, 0.8);
    backgroundcolor: rgba(175, 175, 175, 0.6);
  }
  @media (min-width: 600px) {
    margin: ${props => props.theme.spacing(1)}px;
  }
`;

export default function ToggleScreenShareButton(props: { disabled?: boolean }) {
  const [isScreenShared, toggleScreenShare] = useScreenShareToggle();
  const screenShareParticipant = useScreenShareParticipant();
  const { room } = useVideoContext();
  const disableScreenShareButton =
    screenShareParticipant && screenShareParticipant !== room.localParticipant;
  const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  const isDisabled = props.disabled || disableScreenShareButton || !isScreenShareSupported;

  let tooltipMessage = SCREEN_SHARE_TEXT;

  if (isScreenShared) {
    tooltipMessage = STOP_SCREEN_SHARE_TEXT;
  }

  if (disableScreenShareButton) {
    tooltipMessage = SHARE_IN_PROGRESS_TEXT;
  }

  if (!isScreenShareSupported) {
    tooltipMessage = SHARE_NOT_SUPPORTED_TEXT;
  }

  return (
    <Tooltip
      title={tooltipMessage}
      placement="top"
      PopperProps={{ disablePortal: true }}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
    >
      <div>
        {/* The div element is needed because a disabled button will not emit hover events and we want to display
          a tooltip when screen sharing is disabled */}
        <Fab onClick={toggleScreenShare} disabled={isDisabled}>
          {isScreenShared ? <StopScreenShare /> : <ScreenShare />}
        </Fab>
      </div>
    </Tooltip>
  );
}
