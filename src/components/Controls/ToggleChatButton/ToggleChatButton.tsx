import React from 'react';
import styled from 'styled-components';

import ChatIcon from '@material-ui/icons/Chat';
import Tooltip from '@material-ui/core/Tooltip';
import MUIFab from '@material-ui/core/Fab';

import useAnalytics from '../../../hooks/useAnalytics/useAnalytics';
import useUIState from '../../UIStateProvider/useUIState/useUIState';

export const Fab = styled(MUIFab)`
  margin: ${props => props.theme.spacing(0.5)}px;
  @media (min-width: 600px) {
    margin: ${props => props.theme.spacing(1)}px;
  }
`;

export default function ToggleAudioButton(props: { disabled?: boolean }) {
  const { showChatModal, toggleChatModal } = useUIState();
  const { logEvent } = useAnalytics();

  const handleClick = () => {
    !showChatModal && logEvent('CHAT_OPEN');
    toggleChatModal();
  };

  return (
    <Tooltip title={'Chat'} placement="top" PopperProps={{ disablePortal: true }}>
      <Fab onClick={handleClick} disabled={props.disabled}>
        <ChatIcon />
      </Fab>
    </Tooltip>
  );
}
