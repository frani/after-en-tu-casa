import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import CallEnd from '@material-ui/icons/CallEnd';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import useAnalytics from '../../../hooks/useAnalytics/useAnalytics';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

export default function EndCallButton() {
  const classes = useStyles();
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
      <Fab className={classes.fab} color="primary">
        <CallEnd />
      </Fab>
    </Tooltip>
  );
}
