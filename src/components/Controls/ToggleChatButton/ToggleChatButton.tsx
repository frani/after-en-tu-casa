import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import Tooltip from '@material-ui/core/Tooltip';

import useAnalytics from '../../../hooks/useAnalytics/useAnalytics';
import useUIState from '../../UIStateProvider/useUIState/useUIState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

export default function ToggleAudioButton(props: { disabled?: boolean }) {
  const classes = useStyles();
  const { showChatModal, toggleChatModal } = useUIState();
  const { amplitude } = useAnalytics();

  const handleClick = () => {
    !showChatModal && amplitude.logEvent('CHAT_OPEN');
    toggleChatModal();
  };

  return (
    <Tooltip title={'Chat'} placement="top" PopperProps={{ disablePortal: true }}>
      <Fab className={classes.fab} onClick={handleClick} disabled={props.disabled}>
        <ChatIcon />
      </Fab>
    </Tooltip>
  );
}
