import React from 'react';
import styled from 'styled-components';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import IconButton from '@material-ui/core/IconButton';

import useFullScreenToggle from '../../hooks/useFullScreenToggle/useFullScreenToggle';
import useAnalytics from '../../hooks/useAnalytics/useAnalytics';

const FullscreenButton = styled(({ gridSize, children, ...rest }) => (
  <IconButton {...rest}>{children}</IconButton>
))`
  background-color: ${props => props.gridSize > 2 && props.theme.palette.primary.main};
  color: ${props => (props.gridSize > 2 ? 'white' : 'black')};
  border-radius: 5px;
  padding: 0;
  margin: 5px;
  position: fixed;
  top: 5px;
  right: 5px;
  z-index: 1;
  @media (min-width: 1280px) {
    background-color: transparent;
    color: black;
  }
`;

declare type Props = {
  gridSize?: number;
};

export default function ToggleFullscreenButton({ gridSize }: Props) {
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle();
  const { logEvent } = useAnalytics();

  const handleClick = () => {
    const date = new Date();
    const timestamp = date.getTime();
    isFullScreen
      ? logEvent('FULL_SCREEN_CLOSE', timestamp)
      : logEvent('FULL_SCREEN_OPEN', timestamp);
    toggleFullScreen();
  };

  return (
    <FullscreenButton aria-label={`full screen`} onClick={handleClick} gridSize={gridSize}>
      {isFullScreen ? <FullscreenExitIcon fontSize="large" /> : <FullscreenIcon fontSize="large" />}
    </FullscreenButton>
  );
}
