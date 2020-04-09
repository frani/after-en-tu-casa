import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Tooltip from '@material-ui/core/Tooltip';

import useLocalAudioToggle from '../../../hooks/useLocalAudioToggle/useLocalAudioToggle';
import useAnalytics from '../../../hooks/useAnalytics/useAnalytics';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

export default function ToggleAudioButton(props: { disabled?: boolean }) {
  const classes = useStyles();
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
  const { logEvent } = useAnalytics();

  const handleClick = () => {
    isAudioEnabled ? logEvent('AUDIO_DISABLE') : logEvent('AUDIO_ENABLE');

    toggleAudioEnabled();
  };

  return (
    <Tooltip
      title={isAudioEnabled ? 'Silenciar Audio' : 'Habilitar Audio'}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab
        className={classes.fab}
        onClick={handleClick}
        disabled={props.disabled}
        data-cy-audio-toggle
      >
        {isAudioEnabled ? <Mic /> : <MicOff />}
      </Fab>
    </Tooltip>
  );
}
