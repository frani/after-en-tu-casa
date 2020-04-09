import React from 'react';
import styled from 'styled-components';

import CallEnd from '@material-ui/icons/CallEnd';
import Tooltip from '@material-ui/core/Tooltip';
import MUIFab from '@material-ui/core/Fab';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useAnalytics from '../../../hooks/useAnalytics/useAnalytics';

export const Fab = styled(MUIFab)`
  margin: ${props => props.theme.spacing(0.5)}px;
  @media (min-width: 600px) {
    margin: ${props => props.theme.spacing(1)}px;
  }
`;

export default function EndCallButton() {
  const { room } = useVideoContext();
  const { logEvent } = useAnalytics();

  const handleClick = () => {
    room.disconnect();

    logEvent('ROOM_LEAVE');
  };

  return (
    <Tooltip
      title={'Abandonar Sala'}
      onClick={handleClick}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab color="primary">
        <CallEnd />
      </Fab>
    </Tooltip>
  );
}
